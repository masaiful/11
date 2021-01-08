---
category: posts
draft: false

title: Stop Words
date: 2021-01-08 14:03:55
tags:
    - wikipedia
    - today i learned
    - language

---

> In computing, stop words are words which are filtered out before or after processing of natural language data (text). Though "stop words" usually refers to the most common words in a language, there is no single universal list of stop words used by all natural language processing tools, and indeed not all tools even use such a list. Some tools specifically avoid removing these stop words to support phrase search.
>
> Any group of words can be chosen as the stop words for a given purpose. For some search engines, these are some of the most common, short function words, such as the, is, at, which, and on. In this case, stop words can cause problems when searching for phrases that include them, particularly in names such as "The Who", "The The", or "Take That". Other search engines remove some of the most common words—including lexical words, such as "want"—from a query in order to improve performance.
>
> -- [Wikipedia](https://en.wikipedia.org/wiki/Stop_word)

I was hitting [Algolia's search limits](https://www.algolia.com/doc/faq/basics/is-there-a-size-limit-for-my-index-records/) had to remove words I didn't care about searching like "and", "only", "there", or "I've" in an attempt to shrink the size of the posts on this site in the search index. There are quite a few lists on the internet and I [ended up using a few of them](https://github.com/afreeorange/log/blob/master/_scripts/eleventy/filters__data.js) for significant (> 65% average) size reductions in the search corpora.

