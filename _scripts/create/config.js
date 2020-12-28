const config = require("../eleventy/config");
const VALID_RATINGS = Object.keys(config.GRADE_TO_NUMBER);

// Post templates are kept here
const TEMPLATES_PATH = "../../_templates";

// Folders for each post type. Ordered by the most frequent type.
const THING_PATHS = {
  post: "../../posts",
  link: "../../links",
  movie: "../../media",
  // quote: "../../quotes",
  // music: "../../music",
  // book: "../../books",
};

module.exports = {
  TEMPLATES_PATH,
  THING_PATHS,
  VALID_RATINGS,
};
