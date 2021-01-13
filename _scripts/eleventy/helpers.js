const toDate = require("date-fns/toDate");
const isAfter = require("date-fns/isAfter");

/**
 * Helps us establish if a post is a draft or a future post. In either case, we
 * exclude it from the build IF we are building to deploy.
 */
const postIsFromTheFuture = (p) => isAfter(toDate(p.data.date), new Date());
const postIsADraft = (p) => p.data.draft === true;
const postIsPinned = (p) => p.data.pinned === true;

/**
 * Simple helper that takes a `collection` object and filters it by draft or
 * future post status.
 */
const filterCollectionForProduction = (collection) =>
  collection
    .filter((_) => (process.env.CI ? !postIsFromTheFuture(_) : _))
    .filter((_) => (process.env.CI ? !postIsADraft(_) : _));

module.exports = {
  postIsADraft,
  postIsFromTheFuture,
  postIsPinned,
  filterCollectionForProduction,
};
