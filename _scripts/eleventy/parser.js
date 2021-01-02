const md = require("markdown-it")({
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
  .use(require("./kbd"))
  .use(require("markdown-it-prism"))
  .use(require("markdown-it-sup"))
  .use(require("markdown-it-sub"))
  .use(require("markdown-it-attrs"))
  .use(require("markdown-it-attribution"), {
    classNameContainer: null,
    classNameAttribution: null,
    marker: "--",
    removeMarker: true,
  });

module.exports = md;
