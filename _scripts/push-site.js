/**
 * Note: Sync flags here should match those in .circleci/config.yml
 */

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

/**
 * Note: Learned this rather late but adding a `--size-only` flag to S3
 * sync will prevent it from syncing things with different modification
 * timestamps 🤦‍♀️
 */
const excludeLocalMisc = `--exclude "${config.MISC_PATH}/*"`;

const syncCommand = `
aws s3 sync ${config.SITE.dir.output}/ "s3://${config.BUCKET_NAME}/" \
    ${config.MISC_REMOTE_PREFIX ? excludeLocalMisc : ""} \
    --delete \
    --exclude "*.DS_Store*" \
    --size-only \
    ${compressed ? "--content-encoding gzip" : ""}
`;

console.log(chalk.yellow(`Publishing site to s3://${config.BUCKET_NAME}`));
if (compressed) {
  console.log(chalk.yellow("(Site was compressed)"));
}

const sync = exec(syncCommand);
sync.stdout.on("data", (data) => console.log(chalk.green(data)));
sync.stderr.on("data", (data) => {
  console.log(chalk.red(data));
  process.exit(1);
});
