---
title: Placeholder
---

## Placeholder

`<Placeholder>` allows you to add any native widget to your application. To do that, you need to put a Placeholder somewhere in the UI hierarchy and then create and configure the native widget that you want to appear there. Finally, pass your native widget to the event arguments of the creatingView event.

---

### Example: Simple Placeholder

/// flavor plain

```xml
<Placeholder creatingView="creatingView" />
```

```ts
import { Utils } from '@nativescript/core'

export function creatingView(args) {
  let nativeView
  if (global.isIOS) {
    // Example with UITextView in iOS
    nativeView = UITextView.new()
    nativeView.text = 'Native View (iOS)'
  } else if (global.isAndroid) {
    // Example with TextView in Android
    nativeView = new android.widget.TextView(Utils.android.getApplicationContext())
    nativeView.setText('Native View (Android)')
  }

  args.view = nativeView
}
```

///

/// flavor react

```tsx
import { isIOS, isAndroid } from '@nativescript/core'
;<placeholder
  onCreatingView={() => {
    if (isIOS) {
      // Example with UILabel in iOS
      const nativeView = new UILabel()
      nativeView.text = 'Native View - iOS'
      args.view = nativeView
    } else if (isAndroid) {
      // Example with TextView in Android
      const nativeView = new android.widget.TextView(args.context)
      nativeView.setSingleLine(true)
      nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END)
      nativeView.setText('Native View - Android')
      args.view = nativeView
    } else {
      console.warn(
        'Unsupported platform! Did they finally make NativeScript for desktop?'
      )
    }
  }}
/>
```

///

/// flavor angular

```html
<Placeholder (creatingView)="creatingView($event)" />
```

```ts
import { Utils, Placeholder } from '@nativescript/core'

function creatingView(args) {
  const placeholder = args.object as Placeholder

  let nativeView
  if (global.isIOS) {
    // Example with UITextView in iOS
    nativeView = UITextView.new()
    nativeView.text = 'Native View (iOS)'
  } else if (global.isAndroid) {
    // Example with TextView in Android
    nativeView = new android.widget.TextView(Utils.android.getApplicationContext())
    nativeView.setText('Native View (Android)')
  }

  placeholder.view = nativeView
}
```

///

/// flavor vue

```html
<Placeholder @creatingView="creatingView" />
```

```js
// Example with TextView in Android
methods: {
  creatingView: function(args) {
      const nativeView = new android.widget.TextView(args.context);
      nativeView.setSingleLine(true);
      nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END);
      nativeView.setText("Native View - Android");
      args.view = nativeView;
  }
}
// Example with UILabel in iOS
methods: {
  creatingView: function(args) {
      const nativeView = new UILabel();
      nativeView.text = "Native View - iOS";
      args.view = nativeView;
  }
}
```

///

### Props

| Name           | Type        | Description                                                                                                                              |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `N/A`          | `N/A`       | None.                                                                                                                                    |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/placeholder) |
