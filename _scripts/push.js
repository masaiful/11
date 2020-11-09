const fs = require("fs");
const chalk = require("chalk");
const { exec } = require("child_process");

const config = require("./eleventy/config");

let compressed;
try {
  if (fs.existsSync(`${config.SITE.dir.output}/.compressed`)) {
    compressed = true;
  }
} catch (e) {
  compressed = false;
}

const syncCommand = `
aws s3 sync ${config.SITE.dir.output}/ "s3://${config.BUCKET_NAME}/" \
    --exclude "${config.MISC_PATH}/*" \
    --delete \
    ${compressed ? "--content-encoding gzip" : ""}
`;

console.log(chalk.yellow(`Publishing site to s3://${config.BUCKET_NAME}`));
if (compressed) {
  console.log(chalk.yellow("(Site was compressed)"));
}

const sync = exec(syncCommand);
sync.stdout.on("data", (data) => console.log(chalk.green(data)));
sync.stderr.on("data", (data) => console.log(chalk.red(data)));
