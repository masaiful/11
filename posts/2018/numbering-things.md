---
date: 2018-12-26 12:14:54
title: Numbering from Zero
tags:
    - math
    - computers
    - computer science
    - quotes
---

[Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra) on why [numbering should start from zero](https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD831.html).

Numbering is done with [natural numbers](https://en.wikipedia.org/wiki/Natural_number). Let's take zero to be the smallest natural number[^zero_natural]. For the sequence (2, 3, 4, ... ,12), using the convention (2 &le; _n_ &lt; 13) is appropriate because

* **For a sequence starting with zero**, like (0, 1, 2, 3), the left hand condition leaks into unnatural numbers if you use "less than": (-1 &lt; _n_).
* **For an empty sequence**, the right hand also leaks into the unnatural if you use "less than or equal to": (_n_ &le; 0)

And minorly, because these are the true of another convention (1 &lt; _n_ &le; 12)

* Difference between bounds (13 - 2 = 11) is the length of the sequence
* I know that these two sequences are adjacent: (2 &le; _n_ &lt; 13) and (13 &le; _n_ &lt; 24)

All that's prep for:

> When dealing with a sequence of length _N_, the elements of which we wish to distinguish by subscript, the next vexing question is what subscript value to assign to its starting element. Adhering to convention a) yields, when starting with subscript 1, the subscript range 1 &le; _i_ < _N_+1; starting with 0, however, gives the nicer range 0 &le; _i_ < _N_. So let us let our ordinals start at zero: an element's ordinal (subscript) equals the number of elements preceding it in the sequence. And the moral of the story is that we had better regard -- after all those centuries![^all_those_centuries] -- zero as a most natural number.

There's also this little nugget

> I think [Antony Jay](https://en.wikipedia.org/wiki/Antony_Jay) is right when he states: "In corporate religions as in others, the heretic must be cast out not because of the probability that he is wrong but because of the possibility that he is right."

[^zero_natural]: TIL that this can be so.
[^all_those_centuries]: Don't know what he means here...
