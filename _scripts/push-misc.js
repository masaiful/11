const chalk = require("chalk");
const { exec } = require("child_process");

const config = require("./eleventy/config");

const command = `
aws s3 sync ${config.MISC_PATH}/ "s3://${config.MISC_REMOTE_BUCKET}/" \
    --cache-control max-age=31536000,public \
    --metadata-directive REPLACE \
    --exclude "*.DS_Store*" \
    --size-only
`;

console.log(
  chalk.cyan(`Publishing misc assets to s3://${config.MISC_REMOTE_BUCKET}`),
);

const push = exec(command);
push.stdout.on("data", (data) => console.log(chalk.green(data)));
push.stderr.on("data", (data) => console.log(chalk.red(data)));
