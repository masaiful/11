/**
 * Make things easy to edit on my phone.
 */
const BLOGROLL = `
# Name
# URL
# Notes
---
Monkey User
https://www.monkeyuser.com/
comics, technology, computers
---
Mr. Lovenstein
https://www.mrlovenstein.com/
comics, absurd
`;

/**
 * Parse the above. It's a parser, OK? A shitty one but one nonetheless <3
 */
const generate = (content) => {
  const ret = content
    // Remove any comments
    .replace(/#.*\n/gi, "")
    .split("---")
    .map((_) => _.split("\n"))
    .map((_) => ({
      name: _[1],
      url: _[2],
      notes: _[3],
    }))
    // The first element is for illustration only!
    .slice(1);

  return ret;
};

module.exports = generate(BLOGROLL);
