const fs = require("fs");
const algoliasearch = require("algoliasearch");
const chalk = require("chalk");
require("dotenv").config();

const SEARCH_DATA_FILE = "_site/search-data.json";

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

  // Parse the search data
  const searchObjects = JSON.parse(data)["data"];
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
    console.log(chalk.red("Error updating search index"), e);
  }
});
