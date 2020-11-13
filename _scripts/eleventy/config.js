/**
 * Where we store all the JS, CSS, Images, and other things (i.e. not Nunjucks
 * templates) required to render this site.
 */
const ASSET_PATH = "_assets";

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
const OPTIMIZED_MISC_FOLDER = "_optimized";

/**
 * Remote URI that serves pictures and videos. No trailing slashes. If
 * this is `null`, just look locally. 
 *
 * Note: `/MISC_PATH/` is removed when making a production build if this
 * is set to `null`!
 */
const REMOTE_MISC_PREFIX = "https://static-log.nikhil.io";

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

module.exports = {
  ASSET_PATH,
  BUCKET_NAME,
  MISC_PATH,
  OPTIMIZED_MISC_FOLDER,
  REMOTE_MISC_PREFIX,
  MISC_FOLDER_LIST,

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
   * These are used for the <kbd> tag.
   */
  KBD_MAPPING: {
    cmd: "&#8984;",
    option: "&#8997;",
    shift: "&#8679;",
    caps: "&#8682;",
    eject: "&#9167;",
    return: "&#9166;",
    delete: "&#9003;",
    esc: "&#9099;",
    right: "&rarr;",
    left: "&larr;",
    up: "&uarr;",
    down: "&darr;",
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
   * Send these straight through to the built site
   */
  PASSTHROUGH: ["robots.txt", ASSET_PATH, MISC_PATH],

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
