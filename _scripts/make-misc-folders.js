const chalk = require("chalk");
const mkdirp = require("mkdirp");

const config = require("./config");

config.FOLDER_LIST.map((f) => {
  console.log(chalk.cyan("Making"), chalk.green(f));
  mkdirp.sync(`./${f}`);
});
