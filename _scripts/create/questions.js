const chalk = require("chalk");

const config = require("./config");
const helpers = require("./helpers");

const basic = [
  {
    type: "list",
    name: "type",
    message: "Post type:",

    // Title Case for a single word... make it pretty
    choices: Object.keys(config.THING_PATHS).map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    ),

    // Turn it back to lowercase so we can look it up.
    filter: (val) => val.toLowerCase(),
  },
  // {
  //   type: "confirm",
  //   name: "isDraft",
  //   message: "Is this a draft?",
  //   default: false,
  // },
  helpers.makeBasicQuestion(
    "Title (like Movie Name or Link Title):",
    "title",
    "Enter a post title!",
  ),
  helpers.makeBasicQuestion(
    "Tags (comma-separated):",
    "tags",
    "Enter some tags, yo!",
  ),
];

const rating = {
  type: "input",
  name: "rating",
  message: "Rating:",
  validate: (value) => {
    if (!value) {
      return chalk.red("Enter a rating!");
    } else if (!config.VALID_RATINGS.find((r) => r === value)) {
      return chalk.red(
        `Invalid rating. Pick from ${config.VALID_RATINGS.join(", ")}`,
      );
    }
    return true;
  },
};

const year = helpers.makeBasicQuestion(
  "Year:",
  "year",
  "Which year did it come out?",
);

const movie = [rating];

const book = [
  helpers.makeBasicQuestion("Author:", "author", "Who's the author yo?"),
  year,
  rating,
];

const music = [
  helpers.makeBasicQuestion("Artist:", "artist", "Who's the artist yo?"),
  rating,
];

const link = [helpers.makeBasicQuestion("Link:", "link", "Enter a link, yo!")];

module.exports = {
  basic,
  book,
  link,
  movie,
  music,
  rating,
  year,
};
