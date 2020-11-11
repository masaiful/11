/**
 * S3 bucket that hosts these files. Enable versioning on this bucket in case
 * something awful happens.
 */
const MISC_BUCKET_NAME = "static-log.nikhil.io";

/**
 * Prefix for JPEG and PNG files that are optimized via Sharp and converted to
 * WebP. GIFs, Video, and other files are served directly from the parent root.
 */
const OPTIMIZED_FILES_PREFIX = "_optimized";

/**
 * Just a simple way of organizing assets without this folder getting too
 * hairy. Drop some some stuff here and run `yarn borg` so it's filed away
 * properly.
 */
const FOLDER_LIST = [
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

const IGNORED_PATHS = [
  "_misc/**",
  "_scripts/**",
  ".DS_Store",
  ".editorconfig",
  ".git",
  ".gitignore",
  "*.gitattributes*",
  "*.circleci*",
  "*.lock",
  "error.html",
  "index.html",
  "*node_modules*",
  "package*.json",
  "README.md",
  "s3-bucket-listing*",
  `${OPTIMIZED_FILES_PREFIX}/**`,
];

/**
 * TODO: This is for the `--exclude` flag in `aws s3 sync`. Can we just use
 * `IGNORED_PATHS` above for this?
 */
const SYNC_EXCLUDE_PATHS = [
  "*.DS_Store*",
  "*.gitattributes*",
  "*.circleci*",
  "*.editorconfig*",
  "*.git*",
  "*_scripts*",
  "*node_modules*",
  "*package*.json*",
  "*README.md*",
  "*yarn.lock*",
];

module.exports = {
  FOLDER_LIST,
  IGNORED_PATHS_WITH_ASSET_FOLDERS: [...IGNORED_PATHS, ...FOLDER_LIST],
  IGNORED_PATHS,
  MISC_BUCKET_NAME,
  OPTIMIZED_FILES_PREFIX,
  SYNC_EXCLUDE_PATHS,
};
