const got = require("got");
const chalk = require("chalk");

const makeBasicQuestion = (message, name, yellWith, transformer = null) => ({
  type: "input",
  name,
  message,
  validate: (value) => (value ? true : yellWith),
  transformer: transformer,
});

const getMovieMetadata = async (movieTitle, OMDBKey) => {
  try {
    const response = await got(
      `https://www.omdbapi.com?apiKey=${OMDBKey}&t=${movieTitle}`,
    );

    const responseData = JSON.parse(response.body);

    if (responseData.Response === "False") {
      console.log(chalk.red("! Could not find movie in OMDb"));
      return null;
    }

    console.log(
      chalk.yellow(
        `Found ${responseData.Title} (${responseData.Year}) @ ${responseData.imdbID}`,
      ),
    );

    return responseData;
  } catch (error) {
    console.log(chalk.red("! Could not reach OMDb API"), error);
  }
};

module.exports = {
  makeBasicQuestion,
  getMovieMetadata,
};
