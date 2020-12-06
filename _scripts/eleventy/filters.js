const { v5: uuidv5 } = require("uuid");
const format = require("date-fns/format");
const formatISO = require("date-fns/formatISO");
const numberConverter = require("number-to-words");
const smartquotes = require("smartquotes");
const stringify = require("javascript-stringify").stringify;
const toDate = require("date-fns/toDate");

const config = require("./config");

module.exports = {
  // https://github.com/11ty/eleventy/issues/266#issuecomment-505359994
  console: (value) => {
    const output = stringify(value, null, "\t", { maxDepth: 3 });
    console.log(output);
    return "";
  },
  date: (dateString, formatString) => format(toDate(dateString), formatString),
  gradeToNumber: (grade) => config.GRADE_TO_NUMBER[grade],
  numberToWords: (n) => numberConverter.toWords(n),
  postYear: (dateString) => format(toDate(dateString), "yyyy"),
  smarty: (s) => smartquotes(s),
  superSafeString: (s) => s.replace(/[^a-z0-9 ]/gi, ""),
  timestamp: () => new Date(),
  toISODateString: (dateString) => formatISO(toDate(dateString)),
  uuid: (s) => uuidv5(s, uuidv5.URL),
  uuidWithNoSpaces: (s) => uuidv5(s, uuidv5.URL).replace(/-/g, ""),
  where: (listOfObjects, keyName, valueToSearch) =>
    listOfObjects.filter((_) => _[keyName] === valueToSearch)[0] || null,
};
