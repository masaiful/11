---
date: 2018-08-03 07:30:58
category: posts
title: Linux and Switching
tags:
    - linux
    - computers
    - networking
    - quotes
---

> The problem isn't CPU power. The CPU on any modern PC is going to blow away the processing power of any sort of network switch you'd care to buy except the really high-end ones. (_Really_ high end. So high end that unless you already know them by name you are not going to want to buy them)
>
> Offloading to the GPU would make things worse, not better.
>
> The problem is _latency_. It takes time for the PC to take the buffer from the NIC, copy it to the to the main memory, process it on the CPU, copy it back down into a buffer, and then push it out to the network. All this copying around takes time. You could have a 30000 GHZ processor and it's not going to help you out any.
>
> No amount of programming or GPU offloading is going to make your I/O faster or have less latency. This needs to be done in the hardware. PCs are not designed to handle this. They are designed to have huge cache's were you take a huge amount of data and process it through loops. This is exactly the sort of thing you do NOT want on a switch.
>
> With a switch you want _small_ buffers. You want small buffers optimized to the speed of the networks they are connected to and have the ability to shuffle information from one port to another. You want to get the information in and out as quickly as possible.
>
> That being said I have no doubt that a Linux switch based on commodity hardware would have no problem keeping up with a 1Gb/s or even 10Gb/s network and having performance similar to any typical corporate switch.
>
> The problem then is one of cost, energy, and space. A network switch takes up almost no room on a rack. It uses little electricity and creates little heat compared to a PC-style corporate Linux server. It has lots and lots of ports.
>
> To create a Linux commodity-based switch with 20 or 40 ports the thing is going to be huge, expensive, and hot.
>
> So yes while it can be done it's not practical.

On [using a Linux box as a switch](https://www.reddit.com/r/linux/comments/1f2ss7/can_linux_replace_a_switch/ca6eqie/). 
