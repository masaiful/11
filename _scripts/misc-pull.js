const chalk = require("chalk");
const { exec } = require("child_process");

const config = require("./config");

console.log(chalk.cyan(`Pulling misc assets from s3://${config.REMOTE_MISC_PREFIX}`));

const pull = exec(`aws s3 sync "s3://${config.REMOTE_MISC_PREFIX}/" .`);
pull.stdout.on("data", (data) => console.log(chalk.green(data)));
pull.stderr.on("data", (data) => console.log(chalk.red(data)));
