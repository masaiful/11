---
category: posts
draft: false

title: '[PostgreSQL] B-Tree Deduplication With A Catch'
date: 2021-02-13T07:47:34+00:00
tags:
  - postgres
  - deduplication
---

By now everyone would know that PostgreSQL 13 is the best version available
for anyone.

One of the new features that worth mentioning is the way b-tree index is stored
for duplicate values. If you have columns with low-cardinality and have
duplicate values in them, Postgres will now store them only once. This means
saving space and easier on the I/O for searching the values.

Because the performance gain during read is very real and so b-tree
deduplication is very recommended. Deduplication is not applicable to some
cases because of equal datums. But that's practically nothing.

But, there is this part in the documentation[1]:

> Write-heavy workloads that don't benefit from deduplication due to having
> few or no duplicate values in indexes will incur a small,
> fixed performance penalty ..

The problem is not about heavy-write workloads, but this is about MVCC.

Since deduplication is enabled by default, some users might be
experiencing this.

The good thing is, Postgres has a method to disable deduplication for
the specific index by setting deduplicate_items to off. You will not be
benefiting from anything, but better than degraded performance.

[1] https://www.postgresql.org/docs/13/btree-implementation.html#BTREE-DEDUPLICATION
