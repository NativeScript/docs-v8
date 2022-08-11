---
title: ActivityIndicator
---

## ActivityIndicator

### Activity-Indicator

`<ActivityIndicator>` is a UI component that shows a progress indicator signaling to the user of an operation running in the background.

---

/// flavor plain

```xml
<ActivityIndicator
  busy="{{ isBusy }}"
  busyChange="{{ onBusyChanged }}"
  loaded="indicatorLoaded"
/>
```

```ts
import { ActivityIndicator } from '@nativescript/core'

onBusyChanged(args: EventData) {
  const indicator: ActivityIndicator = args.object
  console.log(`indicator.busy changed to: ${indicator.busy}`)
}
```

///

/// flavor angular

```html
<ActivityIndicator [busy]="isBusy" (busyChange)="onBusyChanged($event)">
</ActivityIndicator>
```

```ts
import { ActivityIndicator } from '@nativescript/core'

onBusyChanged(args: EventData) {
  const indicator: ActivityIndicator = args.object
  console.log(`indicator.busy changed to: ${indicator.busy}`)
}
```

///

/// flavor vue

```html
<ActivityIndicator busy="true" @busyChange="onBusyChanged" />
```

```js
export default {
  methods: {
    onBusyChanged(args) {
      const indicator = args.object // ActivityIndicator
      console.log(`indicator.busy changed to: ${indicator.busy}`)
    }
  }
}
```

///

/// flavor react

```tsx
<activityIndicator busy={true} />
```

///

/// flavor svelte

```html
<activityIndicator busy="{true}" on:busyChange="{onBusyChanged}" />
```

```js
export default {
  methods: {
    onBusyChanged(args) {
      const indicator = args.object // ActivityIndicator
      console.log(`indicator.busy changed to: ${indicator.busy}`)
    }
  }
}
```

///

### Properties

| Name      | Type                         | Description                                                                                                                                                                                                                                          |
| --------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `busy`    | `Boolean`                    | Gets or sets whether the indicator is active. When `true`, the indicator is active.                                                                                                                                                                  |
| `android` | `android.widget.ProgressBar` | Gets the native [android widget](http://developer.android.com/reference/android/widget/ProgressBar.html) that represents the user interface for this component. Valid only when running on Android OS.                                               |
| `ios`     | `UIActivityIndicatorView`    | Gets the native iOS [UIActivityIndicatorView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIActivityIndicatorView_Class/index.html) that represents the user interface for this component. Valid only when running on iOS. |

| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/activityindicator) |

#### Events

| Name         | Description                                  |
| ------------ | -------------------------------------------- |
| `busyChange` | Emitted when the `busy` property is changed. |

### Native component

| Android                                                                                                                        | iOS                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| [`android.widget.ProgressBar` (indeterminate = true)](https://developer.android.com/reference/android/widget/ProgressBar.html) | [`UIActivityIndicatorView`](https://developer.apple.com/documentation/uikit/uiactivityindicatorview) |
