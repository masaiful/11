const config = require("./_scripts/eleventy/config");
const filters = require("./_scripts/eleventy/filters");
const helpers = require("./_scripts/eleventy/helpers");
const parser = require("./_scripts/eleventy/parser");
const plugins = require("./_scripts/eleventy/plugins");
const transforms = require("./_scripts/eleventy/transforms");
const utils = require("./_scripts/eleventy/utils");
const video = require("./_scripts/eleventy/video");

module.exports = (eleventyConfig) => {
  /**
   * Use a customized Markdown parser
   */
  eleventyConfig.setLibrary("md", parser);

  /**
   * Shortcodes
   * TODO: Finish this
   */
  // E.g. <kbd>shift</kbd>
  eleventyConfig.addShortcode("kbd", (shortcut) => {
    return shortcut;
  });

  Object.keys(filters).map((f) => eleventyConfig.addFilter(f, filters[f]));

  config.PASSTHROUGH.map((p) => eleventyConfig.addPassthroughCopy(p));

  config.WATCH_TARGETS.map((t) => eleventyConfig.addWatchTarget(t));

  Object.keys(config.COLLECTIONS).map((collectionName) =>
    eleventyConfig.addCollection(collectionName, (collection) =>
      helpers.filterCollection(collection, config.COLLECTIONS[collectionName]),
    ),
  );

  // Special collections outside of the usual globs...
  eleventyConfig.addCollection("tags", (collection) =>
    utils.getAllTags(collection),
  );
  eleventyConfig.addCollection("thingsByYear", (collection) =>
    utils.getAllThingsByYear(collection),
  );
  eleventyConfig.addCollection("yearAndMonthCounts", (collection) =>
    utils.getYearAndMonthFrequencies(collection),
  );

  plugins.map((p) => eleventyConfig.addPlugin(p));

  Object.keys(transforms).map((t) =>
    eleventyConfig.addTransform(t, transforms[t]),
  );

  video.configureExternalEmbeds(eleventyConfig);

  return config.SITE;
};
