---
title: Best Practices with View Bindings
---

You want fast view rendering and responsible view bindings are the first step to getting there.

## Always prepare data for view binding and avoid method bindings

### Bad:

```xml
// view markup
<Label text="{{getMyText}} />
```

<!--  -->

```ts
// view binding class
export class ViewBinding extends Observable {
  getMyText() {
    return 'label text'
  }
}
```

This leads to developers doing logic in methods and can cause unnecessary view binding execution further slowing down your view rendering performance.

### Good:

```xml
// view markup
<Label text="{{myText}} />
```

<!--  -->

```ts
// view binding class
export class ViewBinding extends Observable {
  myText = 'label text'
}
```

This provides for **direct 1-1 data projection to view binding** resulting in no further JavaScript event loop cycles to process your view rendering.
