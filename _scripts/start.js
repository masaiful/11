const fs = require("fs");
const process = require("process");
const { spawn } = require("child_process");
const { yellow, italic } = require("chalk");

process.env.ELEVENTY_ENV = "development";

console.log(yellow(`⏳ Preparing`, italic("development"), "ignore list"));
fs.copyFileSync("./.eleventyignore.development", "./.eleventyignore");

console.log(yellow(`⏳ Starting development server`));
const p = spawn("npx", ["npm-run-all", "clean", "serve"], { shell: true });

process.on("SIGINT", () => {
  console.log("");
  console.log(yellow(`🧹 Cleaning up ignore file`));
  fs.unlinkSync("./.eleventyignore");
});

p.stdout.on("data", (data) => {
  process.stdout.write(data.toString());
});

p.stderr.on("data", (data) => {
  process.stderr.write(data.toString());
});
