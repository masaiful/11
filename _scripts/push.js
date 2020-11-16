const path = require("path");
const Git = require("nodegit");
const chalk = require("chalk");

let repository;
let index;

// git pull origin master
console.log(chalk.yellow("Fetching changes..."))
const repo = Git.Repository.open(path.resolve(__dirname, "../"))
  // First fetch all the changes
  .then((repo) => {
    repository = repo;
    return repository.fetchAll();
  })
  // Merge the local branch with the new branch
  .then(() => {
    console.log(chalk.yellow("Merging branches..."))
    repository.mergeBranches("master", "origin/master")
  })
  .catch(() => console.log(chalk.green("Finished pulling changes")));

// git add .
// git commit -m "${DATE}"
// git push origin master
