module.exports = require("markdown-it")({
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
  .use(require('markdown-it-attribution'), {
    classNameContainer: 'quote',
    classNameAttribution: 'quote__source',
    marker: '--',
    removeMarker: false,
  });
