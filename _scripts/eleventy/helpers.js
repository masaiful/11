/**
 * Helps us establish if a post is a draft or a future post. In either case, we
 * exclude it from the build IF we are building to deploy.
 */
const postIsFromTheFuture = (p) => p.data <= new Date();
const postIsADraft = (p) => p.data.draft;

/**
 * Simple helper that takes a `collection` object and filters it by `glob`, and
 * then by draft or future post status.
 */
const filterCollection = (collection, glob) =>
  collection
    .getFilteredByGlob(glob)
    .filter((_) => (process.env.CI ? !postIsFromTheFuture(_) : _))
    .filter((_) => (process.env.CI ? !postIsADraft(_) : _));

module.exports = {
  postIsADraft,
  postIsFromTheFuture,
  filterCollection,
};
