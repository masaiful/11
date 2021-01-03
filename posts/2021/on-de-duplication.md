---
category: posts
draft: false

title: On De-Duplication
date: 2020-01-20 14:42:42
tags:
    - quotes
    - programming
    - tech hell
    
---

> I’ve usually heard this phenomenon called "incidental duplication", and it’s something I find myself teaching junior engineers about quite often.
>
> There are a lot of situations where 3-5 lines of many methods follow basically the same pattern, and it can be aggravating to look at. "Don’t repeat yourself!" Right?
>
> So you try to extract that boilerplate into a method, and it’s fine until the very next change. Then you need to start passing options and configuration into your helper method... and before long your helper method is extremely difficult to reason about, because it’s actually handling a dozen cases that are superficially similar but full of important differences in the details.
>
> I encourage my devs to follow a rule of thumb: **don’t extract repetitive code right away, try and build the feature you’re working on with the duplication in place first**. Let the code go through a few evolutions and waves of change. Then one of two things are likely to happen:
>
> 1. you find that the code doesn’t look so repetitive anymore, or,
> 2. you hit a bug where you needed to make the same change to the boilerplate in six places and you missed one.
>
> In scenario 1, you can sigh and say "yeah it turned out to be incidental duplication, it’s not bothering me anymore." In scenario 2, it’s probably time for a careful refactoring to pull out the bits that have proven to be identical (and, importantly, must be identical across all of the instances of the code).
> 
> -- [@burlesona on _HackerNews_](https://news.ycombinator.com/item?id=22022603) (emphasis and formatting mine.)

Whatever. I say we continue to abstract away and make better and better [hammer factories](https://danstroot.com/2018/10/03/hammer-factories/) and beam at our sophistication in creating unnecessary complexity #jobsecurity
