/**
 * Where we store all the JS, CSS, Images, and other things (i.e. not Nunjucks
 * templates) required to render this site.
 */
const ASSET_PATH = "_assets";
const ASSET_PATH_IN_BUILT_SITE = "assets";

/**
 * External repo of all the images and videos and miscellanea included
 * in log posts.
 *
 * - Update .eleventyignore if you change this!
 * - No preceding or trailing slashes!
 */
const MISC_PATH = "misc";

/**
 * This is the folder *within* the `MISC_PATH` that all the optimized assets
 * are written to.
 */
const MISC_OPTIMIZED_FOLDER = "_optimized";

/**
 * Remote URI that serves pictures and videos. No trailing slashes. If
 * this is `null`, just look locally.
 *
 * Note: `/MISC_PATH/` is removed when making a production build if this
 * is set to `null`!
 *
 * Note: Bucket name only! No "s3://" prefix!
 */
const MISC_REMOTE_BUCKET = "static-log.nikhil.io";
const MISC_REMOTE_PREFIX = "https://static-log.nikhil.io";

/**
 * Just a simple way of organizing misc assets without this folder
 * getting too hairy. Drop some some stuff here and run `yarn borg` so
 * it's built and filed away properly.
 */
const MISC_FOLDER_LIST = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

/**
 * S3 Bucket where this site is deployed ☁️ No prefix or trailing slash.
 */
const BUCKET_NAME = "log.nikhil.io";

/**
 * Send these straight through to the built site. If you want to rename the
 * target, specify it as a map of source:dest. Eleventy will know what to do.
 */
let PASSTHROUGH = [
  "robots.txt",
  {
    [ASSET_PATH]: ASSET_PATH_IN_BUILT_SITE,
  },
];

/**
 * If we're not in a production context OR if we're not using a separate bukcet
 * for our assets, include the misc assets folder in the built output.
 */
if (MISC_REMOTE_PREFIX === null || !process.env.CI) {
  PASSTHROUGH.push(MISC_PATH);
}

module.exports = {
  ASSET_PATH,
  ASSET_PATH_IN_BUILT_SITE,
  BUCKET_NAME,
  MISC_FOLDER_LIST,
  MISC_OPTIMIZED_FOLDER,
  MISC_PATH,
  MISC_REMOTE_BUCKET,
  MISC_REMOTE_PREFIX,
  PASSTHROUGH,

  /**
   * Used to display stars
   */
  GRADE_TO_NUMBER: {
    "A+": 5,
    A: 5,
    "A-": 4.5,
    "B+": 4,
    B: 3.5,
    "B-": 3,
    "C+": 2.5,
    C: 2,
    "C-": 1.5,
    D: 1,
    F: 0,
  },

  /**
   * Nothing more than the 11ty site config. Don't clobber with stuff not
   * documented!
   */
  SITE: {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site", // Update package.json if you change this!
    },
  },

  /**
   * Monitor these files/dirs/globs for changes
   */
  WATCH_TARGETS: [`${ASSET_PATH}/`, ".eleventy.js", "_eleventy/"],

  /**
   * We _could_ use `all` in lieu of `things` but keep it separate 🤷‍♂️
   */
  COLLECTIONS: {
    things: ["posts/**/*.md", "links/**/*.md", "media/**/*.md"],
    links: ["links/**/*.md"],
    media: ["media/**/*.md"],
    posts: ["posts/**/*.md"],
  },
};
