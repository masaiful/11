/**
 * Simple script to create posts per post type using Nunjucks templates.
 */

// Imports
const chalk = require("chalk");
const format = require("date-fns/format");
const formatISO9075 = require("date-fns/formatISO9075");
const fs = require("fs");
const inquirer = require("inquirer");
const mkdirp = require("mkdirp");
const nunjucks = require("nunjucks");
const slugify = require("@sindresorhus/slugify");

const config = require("./config");
const helpers = require("./helpers");
const questions = require("./questions");
require("dotenv").config();

// Let Eleventy figure out how to escape this stuff
nunjucks.configure({ autoescape: false });

// We query OMDb for movie metadata
const { OMDB_API_KEY } = process.env;
if (!OMDB_API_KEY) {
  console.log(chalk.red("Could not find OMDB_API_KEY. Quitting :/"));
  process.exit(1);
}

/**
 * Date stuff. Not doing anything crazy like
 *
 *    2018-04-28-some-post.md
 *
 * That's from old Jekyll land. Just slugifying the post title and organizing
 * posts by {type}/{year}. It will 'scale'.
 */
const date = new Date();
const timestamp = formatISO9075(date);
const year = format(date, "yyyy");
console.log(chalk.gray(`Post will be timestamped "${timestamp}"`));

const askQuestions = async () => {
  // Ask the basic questions
  const answers = await inquirer.prompt(questions.basic);
  const postTags = answers.tags
    .split(",")
    .map((_) => _.trim())
    .filter((_) => _ !== "");

  // Prepare paths
  const relativePostFolder = `${config.THING_PATHS[answers.type]}/${year}`;
  let postFolder = `${__dirname}/${relativePostFolder}`;
  let postFile = `${slugify(answers.title)}.md`;
  const templatePath = `${__dirname}/${config.TEMPLATES_PATH}/${answers.type}.njk`;

  // Read the appropriate template
  const template = fs.readFileSync(templatePath, {
    encoding: "utf8",
    flag: "r",
  });

  // Set up the data to write to the template.
  let frontmatter = {
    timestamp,
    title: answers.title,
    isDraft: false,
    tags: postTags,
  };

  if (answers.type === "movie") {
    const metadata = await helpers.getMovieMetadata(
      answers.title,
      OMDB_API_KEY,
    );
    const movieAnswers = await inquirer.prompt(questions.movie);

    frontmatter = {
      ...frontmatter,
      rating: movieAnswers.rating,
      imdb: metadata ? metadata.imdbID : "!tt0000000",
      year: metadata ? metadata.Year : "!0000",
    };
  }

  if (answers.type === "book") {
    const bookAnswers = await inquirer.prompt(questions.book);

    frontmatter = {
      ...frontmatter,
      author: bookAnswers.author,
      rating: bookAnswers.rating,
      year: bookAnswers.year,
    };
  }

  if (answers.type === "music") {
    const musicAnswers = await inquirer.prompt(questions.music);

    frontmatter = {
      ...frontmatter,
      artist: musicAnswers.artist,
      rating: musicAnswers.rating,
      year: musicAnswers.year,
    };
  }

  if (answers.type === "link") {
    const linkAnswers = await inquirer.prompt(questions.link);

    frontmatter = {
      ...frontmatter,
      link: linkAnswers.link,
    };
  }

  if (answers.type === "pasta") {
    const pastaAnswers = await inquirer.prompt(questions.pasta);

    frontmatter = {
      ...frontmatter,
      link: pastaAnswers.link,
      source: pastaAnswers.source,
    };
  }

  // Write out the data
  const dataToWrite = nunjucks.renderString(template, frontmatter);

  // Make a post folder if it doesn't exist
  mkdirp.sync(postFolder);

  // Check if the file exists. This is terrible and lazy code and I don't care.
  if (fs.existsSync(`${postFolder}/${postFile}`)) {
    console.log(chalk.red(`! File called ${postFile} already exists.`));

    let _newPostfile;
    for (let i = 1; i < 25; i++) {
      _newPostfile = `${slugify(answers.title)}-${i}.md`;

      if (fs.existsSync(`${postFolder}/${_newPostfile}`)) {
        console.log(
          chalk.red(
            `! Well, file called ${_newPostfile} also already exists...`,
          ),
        );
        continue;
      } else {
        console.log(chalk.yellow(`Calling the post "${_newPostfile}"`));
        break;
      }
    }

    postFile = _newPostfile;
  }

  // Write it out!
  fs.writeFileSync(`${postFolder}/${postFile}`, dataToWrite);

  return `${relativePostFolder}/${postFile}`;
};

askQuestions().then((f) =>
  /**
   * TODO: Use path.resolve? Or just leave this alone because "it works"?
   */
  console.log(chalk.green("✔ Created", chalk.bold(f.replace("../../", "")))),
);
