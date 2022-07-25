---
title: Best Practices around hidden, visibility, v-if, ngIf and all those "if" things
---

There are various ways to hide and show view elements on the screen at any given time either dynamically or just per page.

## From @nativescript/core

- `visibility: 'hidden' | 'collapse' | 'visible'`
- `hidden: boolean` (new in 8.x+)

Both are very similar but have subtle differences that are worth noting.

## From various frontend framework flavors

- `ngIf`: Angular
- `v-if`: Vue

Most frontend framework integrations add their own sugar in the form of `v-if` (Vue) and `ngIf` (Angular) to name a few which are also very useful but have unique characteristics that are important to understand.

## Most expensive view operation

Direct visual tree manipulation is the most expensive operation you can do generally speaking. More specifically creating new visual nodes, inserting into the tree and removing nodes is expensive. When done on a single render pass (showing a page) or when a user taps a button to see a visual changes is not a big deal. But when done repeatedly in the moment of what a user would expect to be smooth (like scrolling) it can be devastatingly bad. This is because doing so often forces the rendering engine to have to remeasure and adjust the layout which is often visibly janky and not desirable. This is not NativeScript related but rather pure rendering engine on each platform related. It's also a topic that has been talked about at depth with regards to Web DOM performance. Even though NativeScript views are not using the DOM, the same practices apply with regards to achieving optimal view rendering performance.

## What occurs with `v-if`, `ngIf`, etc.?

These types of bindings completely destroy a view node when hiding and recreate it when showing. This is perfect for many uses cases but should be avoided on anything that involves scrolling which would cause those bindings to change mid-flight during scroll behavior. Or really any other highly interactive user experience which causes binding changes.

On the other hand, `hidden` and `visibility` both **do not destroy** the view node. They simply modify it's properties to hide it or show it. The key differences between the two are illustrated here in this sample:

<img src="/assets/images/hidden-v-vis.gif">

The difference in their usage is very subtle:

- `visibility: 'hidden' | 'collapse' | 'visible'`;
- `hidden: boolean`;

We can see `visibility` supports 3 modes where `hidden` is a boolean which acts just like `visibility: 'collapse'` would. So why would you ever use `hidden`? It's much simpler binding `[hidden]="condition"` vs. `[visibility]="condition ? 'visible' : 'collapse'"` so purely syntactical sugar. But it's important to note that `hidden: false` and `visibility: 'collapse'` both affect the layout whereas `visibility: 'hidden'` does not!

Therefore `visibility: 'hidden'` can be superb for various performance dialing cases on recycled rows which you don't want to cause a layout change (bad performance) while a user is scrolling.

Typically where `ngIf`, `v-if` and the variants don't fit the performance case you are working with, `hidden` or `visibility` will and they can often be the key to unlocking the performance you are after in those situations.
