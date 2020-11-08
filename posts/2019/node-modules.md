---
date: 2018-12-14 15:53:47
title: Node Modules
tags:
    - programming
    - computers
    - tech hell
    - the worst
---

For a single project I made the mistake of working on in my Dropbox folder:

![](/misc/d/dropbox_node_modules.jpg)

Wonder what the downsides are to [hardlinking by default](https://pnpm.js.org/). And, fundamentally, why creating an amazing, Python-like standard library is such an intractable problem in the first place.

> [. . .] `core-js` is also utils library, quite a big one honestly! It has so many functions inside I bet a lot of other packages will be using it!
>
> Not really. Only `babel-runtime` has it in its deps. _Oopsie_.
And returning to the starting point, `cli` uses only 3 (trivial) methods from common-tags — `stripIndents`, `stripIndent`, `oneLine`. _Oopsie daisy_.
>
> **In order to use these 3 methods `node_modules` needs 1826 files. And that’s just 4 of mentioned 976 installed packages.**

-- Mateusz Morszczyzna, [_What’s really wrong with node_modules and why this is your fault_](https://hackernoon.com/whats-really-wrong-with-node-modules-and-why-this-is-your-fault-8ac9fa893823)

🤦‍♂️ The portion of the article that listed functionally similar packages and `is-*` packages was particularly dismaying. As he points out, there's a good reason why jQuery and lodash are as immensely popular as they are[^neocities].

[^neocities]: Was wondering [if we'll ever get back](https://media.giphy.com/media/F2rFD4CVSx19m/giphy.gif) to the magic of hand-crafted web pages and found [this article](https://www.nytimes.com/2017/07/17/fashion/90s-web-design.html) which led me to [this modern Geocities clone](https://neocities.org) 💖
