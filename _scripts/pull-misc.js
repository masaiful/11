const chalk = require("chalk");
const { exec } = require("child_process");

const config = require("./eleventy/config");

console.log(
  chalk.cyan(`Pulling misc assets from s3://${config.MISC_REMOTE_BUCKET}`),
);

try {
  process.chdir(config.MISC_PATH);

  const pull = exec(
    `aws s3 sync \
      "s3://${config.MISC_REMOTE_BUCKET}/" \
      . \
      --size-only
    `,
  );
  pull.stdout.on("data", (data) => console.log(chalk.green(data)));
  pull.stderr.on("data", (data) => console.log(chalk.red(data)));
} catch (error) {
  console.log(chalk.red("Could not switch to misc assets folder:", error));
}
