---
date: 2019-02-13 11:14:25
title: Hugo Migration
tags:
    - technology
    - computers
    - apps
---

Gave [Hugo](https://gohugo.io/) a try and was quite impressed by the ease and speed. The official documentation kinda sucks at introducing key ideas (like taxonomies) in a gradual way that's helpful to newcomers, but is great for [variable](https://gohugo.io/variables/) and [function](https://gohugo.io/functions/) references. Found [these](https://www.jakewiesler.com/blog/hugo-directory-structure/) [two](https://www.sarasoueidan.com/blog/jekyll-ghpages-to-hugo-netlify/) posts very helpful. [Here's another](https://regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/) that explains template variable scope well. [And another](https://www.zeolearn.com/magazine/develop-a-theme-for-hugo) that goes over theme development step-by-step.

Sticking to Jekyll for now since

* I don't post that often and can wait a minute for recompilation if/when I have _that_ many posts
* Hugo does not compile SASS like Jekyll; don't want to make an asset pipeline or turn to [readymade solutions like this](https://github.com/netlify-templates/victor-hugo)
* It doesn't do archives like Jekyll. [Approaches like these](https://discourse.gohugo.io/t/pagination-and-group-by-date/1441/5) might be creative but... 🤷‍♂️

Hugo _is_ as insanely fast as advertized. I love the section and taxonomy abstractions, myriad content types, and I18n support. I'd use it to build any static website that's not a blog. For now, Viva Jekyll. 
