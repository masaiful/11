const chalk = require("chalk");
const { exec } = require("child_process");

const config = require("./config");

const command = `
aws s3 sync . "s3://${config.MISC_BUCKET_NAME}/" \
    --cache-control max-age=31536000,public \
    --metadata-directive REPLACE \
    ${config.SYNC_EXCLUDE_PATHS.map((p) => `--exclude "${p}"`).join(" ")}`;

console.log(
  chalk.cyan(`Publishing misc assets to s3://${config.MISC_BUCKET_NAME}`),
);

const push = exec(command);
push.stdout.on("data", (data) => console.log(chalk.green(data)));
push.stderr.on("data", (data) => console.log(chalk.red(data)));
