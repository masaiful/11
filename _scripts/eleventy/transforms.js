const HTMLBeautify = require("js-beautify").html;
const HTMLMinify = require("html-minifier");

const config = require("./config");

const staticVideoPattern = RegExp(
  String.raw`<p>(\/${config.MISC_PATH}.*\/(.*\.(mp4|mpg|ogg|webm)))<\/p>`,
  "g",
);

/**
 * TODO: This is slow af. Why wouldn't it be? Write a plugin for
 * `markdown-it`...
 */
const embedVideo = async (content, outputPath) => {
  if (outputPath && outputPath.endsWith(".html")) {
    let matches = content.match(staticVideoPattern);

    if (!matches) {
      return content;
    }

    console.log(
      `📽  Will embed ${matches.length} HTML5 video${
        matches.length > 1 ? "s" : ""
      } in ${outputPath}`,
    );

    matches.forEach(() => {
      let [nodeMatch, path, fileName, extension] = staticVideoPattern.exec(
        content,
      );

      if (config.MISC_REMOTE_PREFIX !== null && process.env.CI) {
        path = `${config.MISC_REMOTE_PREFIX}/${path.replace(
          `/${config.MISC_PATH}/`,
          "",
        )}`;
      }

      let embedCode = `
        <div class="video-container">
          <video class="lazy" controls>
            <source src="${path}" type="video/${extension}">
            <p>
              Your browser doesn't support HTML5 video. Here is a <a href="${path}">link to the video</a> instead.
            </p>
          </video>
        </div>
        `;

      content = content.replace(nodeMatch, embedCode);
    });

    return content;
  }

  return content;
};

const beautify = (content, outputPath) => {
  if (outputPath.endsWith(".html")) {
    let minified = HTMLBeautify(content, {
      indent_size: "2",
      indent_char: " ",
      max_preserve_newlines: "-1",
      preserve_newlines: false,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: "normal",
      brace_style: "collapse",
      space_before_conditional: true,
      unescape_strings: false,
      jslint_happy: false,
      end_with_newline: false,
      wrap_line_length: "0",
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
    });

    return minified;
  }

  return content;
};

const minify = (content, outputPath) => {
  if (outputPath.endsWith(".html")) {
    let minified = HTMLMinify.minify(content, {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      decodeEntities: false,
      html5: true,
      keepClosingSlash: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeComments: false,
      removeEmptyAttributes: true,
      removeEmptyElements: false, // Messes up empty search results <div>
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeTagWhitespace: false,
      sortAttributes: true,
      sortClassName: true,
      useShortDoctype: true,
    });

    return minified;
  }

  return content;
};

const noTransform = (content) => content;

module.exports = {
  embedVideo,

  /**
   * When running locally, beautify the HTML so it's easier to inspect the
   * source (even though you can do this in developer tools.) When ready for
   * production, minify.
   */
  // TODO: This doesn't work :/ Just beautify for now.
  // transformHTML: process.env.CI ? minify : beautify,
  transformHTML: beautify,
};
