const chalk = require("chalk");
const { exec } = require("child_process");

const config = require("./eleventy/config");

/* --- */

const compressFlag = "--content-encoding gzip";
const compressCommand = `
    find ${config.SITE.dir.output}/ \
        -type f \
        -not -iname "search-data.json" \
        -exec gzip -9 \'{}\' \\; -exec mv \'{}.gz\' \'{}\' \\;
`;

if (process.env.CI) {
  console.log(chalk.yellow("Compressing output"));

  const compress = exec(compressCommand);
  compress.stdout.on("data", (data) => console.log(chalk.green(data)));
  compress.stderr.on("data", (data) => console.log(chalk.red(data)));
}

/* --- */

const syncCommand = `
aws s3 sync ${config.SITE.dir.output}/ "s3://${config.BUCKET_NAME}/" \
    --exclude "${config.MISC_PATH}/*" \
    --delete \
    ${process.env.CI ? compressFlag : ""}
`;

console.log(chalk.yellow(`Publishing site to s3://${config.BUCKET_NAME}`));

const sync = exec(syncCommand);
sync.stdout.on("data", (data) => console.log(chalk.green(data)));
sync.stderr.on("data", (data) => console.log(chalk.red(data)));
