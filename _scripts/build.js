const fs = require("fs");
const process = require("process");
const { spawn } = require("child_process");
const { yellow, italic, red } = require("chalk");

console.log(yellow(`⏳ Preparing`, italic("production"), "ignore list"));
fs.copyFileSync("./.eleventyignore.production", "./.eleventyignore");

console.log(yellow(`⏳ Building site`));
const p = spawn(
  "npx",
  ["npm-run-all", "clean", "organize:misc", "build:misc", "build:site"],
  { shell: true },
);

p.stdout.on("data", (data) => {
  process.stdout.write(data.toString());
});

p.stderr.on("data", (data) => {
  process.stderr.write(data.toString());
});

p.on("exit", (code) => {
  if (code !== 0) {
    console.log(red(`Process exited with code ${code}`));
  } else {
    fs.unlinkSync("./.eleventyignore");
  }
});
