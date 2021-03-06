const fs = require("fs");
const algoliasearch = require("algoliasearch");
const chalk = require("chalk");
require("dotenv").config();

const SEARCH_DATA_FILE = "_site/search-data.json";

if (!process.env.ALGOLIA_APPLICATION_ID || !process.env.ALGOLIA_API_KEY) {
  console.log(chalk.red("Algolia configuration not found in env"));
  process.exit(1);
}

const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_KEY,
);
const algoliaIndex = algoliaClient.initIndex("log.nikhil.io");

fs.readFile(SEARCH_DATA_FILE, async (e, data) => {
  if (e) {
    console.error(chalk.red("Error opening search data:"), e);
    process.exit(1);
  }

  const searchData = JSON.parse(data);

  // Parse the search data
  const searchObjects = searchData["data"];
  console.log(
    chalk.yellow(`Going to try and post ${searchObjects.length} objects`),
  );

  // Add to the Algolia index
  try {
    const { objectIDs } = await algoliaIndex.saveObjects(searchObjects);
    console.log(
      chalk.green("Updated index with"),
      chalk.green.bold(objectIDs.length),
      chalk.green("posts"),
    );
  } catch (e) {
    console.log(chalk.red("Error updating search index"), chalk.red(e));
  }

  // Remove any drafts from the search index
  const objectIDsToDelete = searchData["dataToDelete"].map((_) => _.objectID);

  if (objectIDsToDelete.length > 0) {
    console.log(
      chalk.yellow(
        `Going to try and remove ${objectIDsToDelete.length} objects`,
      ),
    );

    try {
      const { objectIDs } = await algoliaIndex.deleteObjects(objectIDsToDelete);

      console.log(
        chalk.green("Removed"),
        chalk.green.bold(objectIDs.length),
        chalk.green("posts from index"),
      );
    } catch (e) {
      console.log(
        chalk.red("Error removing"),
        chalk.red.bold(objectIDsToDelete.length),
        chalk.red("from the index"),
        chalk.red(e),
      );
    }
  }
});
