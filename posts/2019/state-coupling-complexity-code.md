---
date: 2020-01-12 11:40:12
title: State, Coupling, Complexity, & Code
tags:
    - quotes
    - programming
    - testing
    - twitter
    - favorite things
---

> Dependencies (coupling) is an important concern to address, but it's only 1 of 4 criteria that I consider and it's not the most important one. **I try to optimize my code around reducing state, coupling, complexity and code, in that order**.
>
> I'm willing to add increased coupling if it makes my code more stateless.
>
> I'm willing to make it more complex if it reduces coupling.
>
> And I'm willing to duplicate code if it makes the code less complex.
>
> **Only if it doesn't increase state, coupling or complexity** do I dedup code.
>
> The reason I put stateless code as the highest priority is it's the easiest to reason about. Stateless logic functions the same whether run normally, in parallel or distributed. It's the easiest to test, since it requires very little setup code. And it's the easiest to scale up, since you just run another copy of it. Once you introduce state, your life gets significantly harder.
>
> I think the reason that novice programmers optimize around code reduction is that it's the easiest of the 4 to spot. The other 3 are much more subtle and subjective and so will require greater experience to spot. But learning those priorities, in that order, has made me a significantly better developer.

-- [`crun1r` on _HackerNews_](https://news.ycombinator.com/item?id=11042400) (emphases and formatting mine.)

❣️

---

<span class="update">January 12, 2020</span> On "incidental duplication":

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

-- [`burlesona` on _HackerNews_](https://news.ycombinator.com/item?id=22022603) (emphasis and formatting mine.)

Whatever. I say we continue to abstract away and make better and better [hammer factories](https://danstroot.com/2018/10/03/hammer-factories/) and beam at our sophistication in creating unnecessary complexity #jobsecurity
