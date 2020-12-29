/**
 * Make things easy to edit on my phone.
 */
const SONGS = `
# Track
# Artist
# Link
# Notes
---
First Sleep
Clint Mansell
https://www.youtube.com/watch?v=3NOzIqV_XLg

---
A Tune for Jack
Lemon Jelly
https://www.youtube.com/watch?v=T9pd_Al9mxw

---
All Night
Romare
https://www.youtube.com/watch?v=eSkt_mDw0Ws
Via Catherine <3
---
Last Night The Moon Came
John Hassell
https://www.youtube.com/watch?v=-7IRnin9gF0
Via Catherine <3
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
      track: _[1],
      artist: _[2],
      link: _[3],
      notes: _[4],
    }))
    // The first element is for illustration only!
    .slice(1);

  return ret;
};

module.exports = generate(SONGS);
