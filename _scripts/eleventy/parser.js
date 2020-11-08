const markdownParser = require("markdown-it")({
  breaks: true,
  html: true,
  linkify: true,
  typographer: true,
})
  /**
   * @link https://github.com/jGleitz/markdown-it-prism
   */
  .use(require("./picture"))
  .use(require("./footnotes"))
  .use(require("markdown-it-prism"))
  .use(require("markdown-it-kbd"))
  .use(require("markdown-it-sup"))
  .use(require("markdown-it-sub"));

module.exports = markdownParser;
