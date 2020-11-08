---
date: 2019-06-04 11:53:14
title: The Korn Shell
tags:
    - unix
    - computers
    - programming
    - history
---

Good talk by [Siteshwar Vashisht](http://situ.im/posts/kornshell-in-2019) at FOSDEM 2019 [on maintaining the Korn shell](https://fosdem.org/2019/schedule/event/kornshell/) and old codebases in general. I came by his work while reading up on the [`fish` shell](https://fishshell.com/docs/current/tutorial.html#tut_learning_Fish). Featured this nugget

![](/misc/k/korn_shell.png)

He talks about how they removed dead/inapplicable code and micro-optimizations, refactored a lot of legacy code, improved tests, switched to a new build and CI system, and so on.

Began with this baffling one-liner that won the International Obfuscated C Contest [in 1987](https://www.ioccc.org/years-spoiler.html#1987)

```c
main() { printf(&unix["\021%six\012\0"],(unix)["have"]+"fun"-0x60);}
```

And reminded me of [this Aaron Sorkin-esque story](http://wiki.c2.com/?KornShellStory) about [David Korn](https://en.wikipedia.org/wiki/David_Korn_(computer_scientist)) which I heard via BLN

> Greg Sullivan, a MicroSoft product manager (henceforth MPM), was holding forth on a forthcoming product that will provide Unix style scripting and shell services on NT for compatibility and to leverage UNIX expertise that moves to the NT platform. The product suite includes the MKS ([Mortise Kern Systems](https://en.wikipedia.org/wiki/MKS_Inc.)) windowing Korn shell, a windowing Perl, and lots of goodies like awk, sed and grep. It actually fills a nice niche for which other products (like the MKS suite) have either been too highly priced or not well enough integrated.
An older man, probably mid-50s, stands up in the back of the room and asserts that Microsoft could have done better with their choice of Korn shell. He asks if they had considered others that are more compatible with existing UNIX versions of KSH.
>
> The MPM said that the MKS shell was pretty compatible and should be able to run all UNIX scripts.
>
>The questioner again asserted that the MKS shell was not very compatible and didn't do a lot of things right that are defined in the KSH language spec. The MPM asserted again that the shell was pretty compatible and should work quite well.
>
> This assertion and counter assertion went back and forth for a bit, when another fellow member of the audience announced to the MPM that the questioner was, in fact David Korn of AT&T (now Lucent) Bell Labs. (DavidKorn is the author of the KornShell).
>
> Uproarious laughter burst forth from the audience, and it was one of the only times that I have seen a (by then pink cheeked) MPM lost for words or momentarily lacking the usual unflappable confidence. So, what's a body to do when Microsoft reality collides with everyone else's?
