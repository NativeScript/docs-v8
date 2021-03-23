---
title: Best Practices with View Bindings
---

You want fast view rendering and responsible view bindings are the first step to getting there.

## Always prepare data for view binding and avoid method bindings

### Bad:

```
<Label text="{{getMyText}} />

function getMyText() {
  return 'label text';
}
```

This leads to developers doing logic in methods and can cause unnecessary view binding execution further slowing down your view rendering performance.

### Good:

```
<Label text="{{myText}} />

const myText = 'label text';
```

This is direct 1-1 data projection to view binding resulting in no further JavaScript event loop cycles to process your view rendering.
