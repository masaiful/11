const chalk = require("chalk");
const fs = require("fs");
const glob = require("glob");
const mkdirp = require("mkdirp");
const path = require("path");
const process = require("process");
const sharp = require("sharp");

const config = require("./eleventy/config");

let forceProcessing = false;
if (process.argv.length > 2 && process.argv[2] === "--force") {
  forceProcessing = true;
}

const optimizeFile = async (filePath) => {
  // console.info(chalk.yellow("⠶ Checking", filePath));
  const fileBuffer = fs.readFileSync(filePath);

  const optimizedFilePath = `${config.MISC_OPTIMIZED_FOLDER}/${filePath}`;
  const { dir, name } = path.parse(optimizedFilePath);
  const optimizedFilePath_WebP = `${dir}/${name}.webp`;

  try {
    await mkdirp(path.dirname(optimizedFilePath));

    fs.access(optimizedFilePath, async (e) => {
      if (e || forceProcessing) {
        await sharp(fileBuffer).toFile(optimizedFilePath);
        console.log(chalk.cyan(`✔ Wrote ${optimizedFilePath}`));
      }
    });

    fs.access(optimizedFilePath_WebP, async (e) => {
      if (e || forceProcessing) {
        await sharp(fileBuffer).toFile(optimizedFilePath_WebP);
        console.log(chalk.cyan(`✔ Wrote ${optimizedFilePath_WebP}`));
      }
    });
  } catch (error) {
    console.error(chalk.error("𐄂 Shit:", filePath, error));
  }
};

try {
  process.chdir(config.MISC_PATH);

  glob(
    "**/*.*(jpg|jpeg|png)",
    {
      ignore: [`${config.MISC_OPTIMIZED_FOLDER}/**`],
      nocase: true,
    },
    (_, files) => files.map((filePath) => optimizeFile(filePath)),
  );
} catch (error) {
  console.log(chalk.red("Could not switch to misc assets folder:", error));
}
