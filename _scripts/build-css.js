/**
 * This is to be run AFTER the site is built!
 */

const process = require("process");
const { spawn } = require("child_process");
const { yellow } = require("chalk");

const config = require("./eleventy/config");

const CSS_FILES = [
  `${config.ASSET_PATH}/css/reset.css`,
  `${config.ASSET_PATH}/css/fonts.css`,
  `${config.ASSET_PATH}/css/site.css`,
  `${config.ASSET_PATH}/css/code.css`,
];

const OUTPUT_PATH = `${config.SITE.dir.output}/${config.ASSET_PATH_IN_BUILT_SITE}/css/site.css`;

console.log(yellow(`⏳ Compressing CSS`));
const p = spawn("npx", ["clean-css-cli", "-o", OUTPUT_PATH, ...CSS_FILES], {
  shell: true,
});

p.stdout.on("data", (data) => {
  process.stdout.write(data.toString());
});

p.stderr.on("data", (data) => {
  process.stderr.write(data.toString());
});
