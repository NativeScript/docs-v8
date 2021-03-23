---
title: Best Practices with Timers and Intervals
---

Oh! You just missed the bus! The dreaded aspect of dealing with time.

Using `setTimeout` and `setInterval` can sometimes be the most dreaded unchecked item in an app's lifecycle.

One single timeout left unprotected or otherwise kept in check can lead to devastating app crashes. For example, imagine a timeout around starting an animation on a view instance when a user navigates to a view...but the user navigates out of that view early. With a timeout not stopped, an invalid access to a view instance already cleaned up and destroyed can and will crash your app.

It's always recommended to track your timeouts and intervals and clean them up properly when no longer needed:

```
this.myTimeout = setTimeout(() => {
  // something
}, 2000);

cleanup() {
  if (typeof this.myTimeout === 'number') {
    clearTimeout(this.myTimeout);
  }
}

```

Intervals are the worst case as they can go on forever eating up valuable device resources your app wants to provide a good user experience. In the most offending cases, they double up and continue to eat away at the UX of an app.

```
this.myInterval = setInterval(() => {
  // something
}, 2000);

cleanup() {
  if (typeof this.myInterval === 'number') {
    clearInterval(this.myInterval);
  }
}
```
