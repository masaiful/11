/**
 * Simple script to create things per thing type using Nunjucks templates ♥️
 */

// Imports
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const mkdirp = require("mkdirp");
const nunjucks = require("nunjucks");
const inquirer = require("inquirer");
const got = require("got");
const format = require("date-fns/format");
const formatISO9075 = require("date-fns/formatISO9075");
const slugify = require("@sindresorhus/slugify");

// Folders for each post type. Ordered by the most frequent type.
const THING_PATHS = {
  post: "../posts",
  link: "../links",
};

// Paths to templates
const TEMPLATE_PATH = "../_templates";

// Let Eleventy figure out how to escape this stuff
nunjucks.configure({ autoescape: false });

/**
 * Date stuff. Not doing anything crazy like
 *
 *    2018-04-28-some-post.md
 *
 * That's from old Jekyll land. Just slugifying the post title and organizing
 * posts by {type}/{year}. It will 'scale' 🙄 And will allow you to change the
 * post publish dates (in case you have an update to the post.)
 */
const date = new Date();
const timestamp = formatISO9075(date);
const year = format(date, "yyyy");
console.log(chalk.yellow(`Post will be timestamped "${timestamp}"`));

// Questions!
const makeBasicQuestion = (message, name, yellWith) => ({
  type: "input",
  name,
  message,
  validate: (value) => {
    if (!value) {
      return yellWith;
    }
    return true;
  },
});

const questions = [
  {
    type: "list",
    name: "type",
    message: "Thing type:",

    // Title Case for a single word... make it pretty
    choices: Object.keys(THING_PATHS).map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    ),

    // Turn it back to lowercase so we can look it up.
    filter: (val) => val.toLowerCase(),
  },
  {
    type: "confirm",
    name: "isDraft",
    message: "Is this a draft?",
    default: false,
  },
  makeBasicQuestion("Title:", "title", "Enter a post title!"),
];

const linkQuestions = [makeBasicQuestion("Link:", "link", "Enter a link, yo!")];

const askQuestions = async () => {
  // Gather answers
  const answers = await inquirer.prompt(questions);

  // Prepare paths
  const relativePostFolder = `${THING_PATHS[answers.type]}/${year}`;
  const postFolder = `${__dirname}/${relativePostFolder}`;
  let postFile = `${slugify(answers.title)}.md`;
  const templatePath = `${__dirname}/${TEMPLATE_PATH}/${answers.type}.njk`;

  // Read the appropriate template
  const template = fs.readFileSync(templatePath, {
    encoding: "utf8",
    flag: "r",
  });

  /**
   * Set up the data to write to the template.
   */
  let frontmatter = {
    timestamp,
    title: answers.title,
    isDraft: answers.isDraft,
  };

  if (answers.type === "link") {
    const linkAnswers = await inquirer.prompt(linkQuestions);

    frontmatter = {
      ...frontmatter,
      link: linkAnswers.link,
    };
  }

  // Write out the data
  const dataToWrite = nunjucks.renderString(template, frontmatter);

  // Make a post folder if it doesn't exist
  mkdirp.sync(postFolder);

  // Check if the file exists. This is terrible and lazy code and I
  // don't care.
  if (fs.existsSync(`${postFolder}/${postFile}`)) {
    console.log(chalk.red(`! File called ${postFile} already exists.`));

    let _newPostfile;
    for (let i = 1; i < 25; i++) {
      _newPostfile = `${slugify(answers.title)}-${i}.md`;

      if (fs.existsSync(`${postFolder}/${_newPostfile}`)) {
        console.log(
          chalk.redBright(
            `! Well, file called ${_newPostfile} also already exists...`,
          ),
        );
        continue;
      } else {
        console.log(chalk.yellow(`> Calling the post "${_newPostfile}"`));
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
  console.log(chalk.green("✔ Created", chalk.bold(f.replace("../", "./")))),
);
