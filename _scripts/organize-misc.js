const chalk = require("chalk");
const fs = require("fs");
const glob = require("glob");

const config = require("./eleventy/config");

const IGNORED_PATHS = [
  ...config.MISC_FOLDER_LIST,
  config.MISC_OPTIMIZED_FOLDER,
  config.MISC_THUMBNAIL_FOLDER,
  "index.html",
  "error.html",
  "s3-bucket*",
];

try {
  process.chdir(config.MISC_PATH);

  glob(
    "*",
    {
      ignore: IGNORED_PATHS,
      nocase: true,
    },
    (_, matches) => {
      if (matches.length === 0) {
        console.log(chalk.yellow("Nothing to do..."));
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
} catch (error) {
  console.log(chalk.red("Could not organize misc assets:", error));
}
