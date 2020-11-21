/**
 * Just an assorted bag of useful stuff...
 */

const config = require("./config");
const helpers = require("./helpers");

/**
 * TODO: Implement later.
 */
getPinnedPosts = (collection) => {
  const pinnedPosts = [];

  collection.getFilteredByGlob(config.COLLECTIONS.things).map((item) => {
    if (helpers.postIsPinned(item)) {
      pinnedPosts.push(item);
    }
  });

  return pinnedPosts;
};

getAllTags = (collection) => {
  let tagList = [];
  let tagMap = {};

  collection.getAll().forEach((item) => {
    if ("tags" in item.data) {
      let tags = item.data.tags;

      tags = tags.filter((item) => {
        switch (item) {
          // this list should match the `filter` list in tags.njk
          case "all":
          case "nav":
          case "post":
          case "posts":
            return false;
        }

        return true;
      });

      for (const tag of tags) {
        if (Object.keys(tagMap).indexOf(tag) === -1) {
          tagMap[tag.toLowerCase()] = 1;
        } else {
          tagMap[tag.toLowerCase()] += 1;
        }
      }
    }
  });

  for (t in tagMap) {
    tagList.push({
      name: t,
      count: tagMap[t],
    });
  }

  return tagList;
};

getAllThingsByYear = (collection) => {
  let postsByYear = {};

  collection.getFilteredByGlob(config.COLLECTIONS.things).map((item) => {
    let year = item.date.getFullYear();

    if (!postsByYear.hasOwnProperty(year)) {
      postsByYear[year] = [];
    } else {
      postsByYear[year].push(item);
    }
  });

  return postsByYear;
};

getYearAndMonthFrequencies = (collection) => {
  let yearAndMonthMap = {};
  let months = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
  };

  collection.getFilteredByGlob(config.COLLECTIONS.things).map((item) => {
    const year = item.date.getFullYear();
    const month = item.date.getMonth();

    // TODO: Weird conditional?
    if (item.data.title) {
      if (!yearAndMonthMap.hasOwnProperty(year)) {
        yearAndMonthMap[year] = {
          months: Object.assign({}, months),
          total: 0,
        };
      } else {
        yearAndMonthMap[year]["total"] += 1;
        yearAndMonthMap[year]["months"][month] += 1;
      }
    }
  });

  return yearAndMonthMap;
};

module.exports = {
  getAllTags,
  getAllThingsByYear,
  getYearAndMonthFrequencies,
};
