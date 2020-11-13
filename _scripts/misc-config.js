

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
  `${OPTIMIZED_MISC_FOLDER}/**`,
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
  REMOTE_MISC_PREFIX,
  OPTIMIZED_MISC_FOLDER,
  SYNC_EXCLUDE_PATHS,
};
