const chalk = require("chalk");
const { exec } = require("child_process");

const config = require("./eleventy/config");

const command = `
aws s3 sync ${config.SITE.dir.output}/ "s3://${config.BUCKET_NAME}/" \
    --exclude "${config.MISC_PATH}/*" \
    --delete
`;

console.log(chalk.yellow(`Publishing site to s3://${config.BUCKET_NAME}`));

const push = exec(command);
push.stdout.on("data", (data) => console.log(chalk.green(data)));
push.stderr.on("data", (data) => console.log(chalk.red(data)));
