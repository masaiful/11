const fs = require("fs");
const chalk = require("chalk");
const { exec } = require("child_process");

const config = require("./eleventy/config");

const compressCommand = `
    find ${config.SITE.dir.output}/ \
        -type f \
        -not -iname "search-data.json" \
        -not -path "*/${config.MISC_PATH}/*" \
        -exec gzip -9 \'{}\' \\; -exec mv \'{}.gz\' \'{}\' \\;
`;

if (process.env.CI) {
  console.log(chalk.yellow("Compressing output"));

  const compress = exec(compressCommand);
  compress.stdout.on("data", (data) => console.log(chalk.green(data)));
  compress.stderr.on("data", (data) => console.log(chalk.red(data)));
}

fs.writeFileSync(`${config.SITE.dir.output}/.compressed`, "", (e) => {
  if (e) {
    return console.log(chalk.red(`Error setting compressed flag: ${e}`));
  }
});
