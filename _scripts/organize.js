/**
 * Just a stupid little script to shove things into folders 🤷‍♂️
 */
const chalk = require("chalk");
const fs = require("fs");
const glob = require("glob");

const config = require("./config");

glob(
  "*",
  {
    ignore: config.IGNORED_PATHS_WITH_ASSET_FOLDERS,
    nocase: true,
  },
  (_, matches) => {
    if (matches.length === 0) {
      console.log(chalk.cyan("Nothing to do..."));
      return;
    }

    matches.map((filePath) => {
      let destination = filePath.split("")[0].toLowerCase();
      let destinationPath = `${destination}/${filePath}`;

      console.log(
        chalk.cyan("Moving"),
        chalk.green(filePath),
        chalk.cyan("to"),
        chalk.cyan(`${destination}/`),
      );

      fs.renameSync(filePath, destinationPath);
    });
  },
);
