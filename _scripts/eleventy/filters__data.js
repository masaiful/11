const PUNCTUATION_REGEX = /['’!"“”#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g;

// https://github.com/fergiemcdowall/stopword/blob/master/lib/stopwords_en.js
const STOP_WORDS_1 = [
  "about",
  "after",
  "all",
  "also",
  "am",
  "an",
  "and",
  "another",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "between",
  "both",
  "but",
  "by",
  "came",
  "can",
  "come",
  "could",
  "did",
  "do",
  "each",
  "for",
  "from",
  "get",
  "got",
  "has",
  "had",
  "he",
  "have",
  "her",
  "here",
  "him",
  "himself",
  "his",
  "how",
  "if",
  "in",
  "into",
  "is",
  "it",
  "like",
  "make",
  "many",
  "me",
  "might",
  "more",
  "most",
  "much",
  "must",
  "my",
  "never",
  "now",
  "of",
  "on",
  "only",
  "or",
  "other",
  "our",
  "out",
  "over",
  "said",
  "same",
  "see",
  "should",
  "since",
  "some",
  "still",
  "such",
  "take",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "up",
  "very",
  "was",
  "way",
  "we",
  "well",
  "were",
  "what",
  "where",
  "which",
  "while",
  "who",
  "with",
  "would",
  "you",
  "your",
  "a",
  "i",
];

// https://github.com/Yoast/YoastSEO.js/blob/develop/src/config/stopwords.js
const STOP_WORDS_2 = [
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "could",
  "did",
  "do",
  "does",
  "doing",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "has",
  "have",
  "having",
  "he",
  "he'd",
  "he'll",
  "he's",
  "her",
  "here",
  "here's",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "how's",
  "i",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "if",
  "in",
  "into",
  "is",
  "it",
  "it's",
  "its",
  "itself",
  "let's",
  "me",
  "more",
  "most",
  "my",
  "myself",
  "nor",
  "of",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "she",
  "she'd",
  "she'll",
  "she's",
  "should",
  "so",
  "some",
  "such",
  "than",
  "that",
  "that's",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "there's",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "we",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "were",
  "what",
  "what's",
  "when",
  "when's",
  "where",
  "where's",
  "which",
  "while",
  "who",
  "who's",
  "whom",
  "why",
  "why's",
  "with",
  "would",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "your",
  "yours",
  "yourself",
  "yourselves",
];

// https://gist.github.com/sebleier/554280#gistcomment-2838826
const STOP_WORDS_3 = [
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "ain",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "aren",
  "aren't",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can",
  "couldn",
  "couldn't",
  "d",
  "did",
  "didn",
  "didn't",
  "do",
  "does",
  "doesn",
  "doesn't",
  "doing",
  "don",
  "don't",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "hadn",
  "hadn't",
  "has",
  "hasn",
  "hasn't",
  "have",
  "haven",
  "haven't",
  "having",
  "he",
  "her",
  "here",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "i",
  "if",
  "in",
  "into",
  "is",
  "isn",
  "isn't",
  "it",
  "it's",
  "its",
  "itself",
  "just",
  "ll",
  "m",
  "ma",
  "me",
  "mightn",
  "mightn't",
  "more",
  "most",
  "mustn",
  "mustn't",
  "my",
  "myself",
  "needn",
  "needn't",
  "no",
  "nor",
  "not",
  "now",
  "o",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "re",
  "s",
  "same",
  "shan",
  "shan't",
  "she",
  "she's",
  "should",
  "should've",
  "shouldn",
  "shouldn't",
  "so",
  "some",
  "such",
  "t",
  "than",
  "that",
  "that'll",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "these",
  "they",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "ve",
  "very",
  "was",
  "wasn",
  "wasn't",
  "we",
  "were",
  "weren",
  "weren't",
  "what",
  "when",
  "where",
  "which",
  "while",
  "who",
  "whom",
  "why",
  "will",
  "with",
  "won",
  "won't",
  "wouldn",
  "wouldn't",
  "y",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "could",
  "he'd",
  "he'll",
  "he's",
  "here's",
  "how's",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "let's",
  "ought",
  "she'd",
  "she'll",
  "that's",
  "there's",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "what's",
  "when's",
  "where's",
  "who's",
  "why's",
  "would",
];

const STOP_WORDS = [
  ...STOP_WORDS_1,
  ...STOP_WORDS_2,
  ...STOP_WORDS_3,
].map((_) => _.replace(PUNCTUATION_REGEX, ""));

// Not de-duping... whatever. Also remove all punctuation.
const STOP_WORDS_REGEX = new RegExp(STOP_WORDS.join("|"), "gi");

module.exports = {
  STOP_WORDS,
  STOP_WORDS_REGEX,
  PUNCTUATION_REGEX,
};