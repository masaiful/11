const embedEverything = require("eleventy-plugin-embed-everything");

const config = require("./config");

const configureExternalEmbeds = (eleventyConfigObj) =>
  eleventyConfigObj.addPlugin(embedEverything, {
    use: ["youtube", "vimeo"],
    vimeo: {
      options: {
        embedClass: "video-container",
      },
    },
    youtube: {
      options: {
        embedClass: "video-container",
        lite: {
          css: {
            path: `/${config.ASSET_PATH_IN_BUILT_SITE}/css/yt.css`,
          },
          js: {
            path: `/${config.ASSET_PATH_IN_BUILT_SITE}/js/yt.js`,
          },
        },
        lazy: true,
      },
    },
  });

module.exports = {
  configureExternalEmbeds,
};
