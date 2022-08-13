---
title: Progress
---

## Progress

`<Progress>` is a UI component that shows a bar to indicate the progress of a task.

See also: [ActivityIndicator](#activity-indicator).

---

### Example: Simple Progress

/// flavor plain

```xml
<Progress
  width="100%"
  value="{{ progressValue }}"
  maxValue="{{ progressMaxValue }}"
  loaded="onProgressLoaded"
/>
```

```ts
import { Observable, Page, Progress, PropertyChangeData } from '@nativescript/core'

export function onNavigatingTo(args) {
  const page = args.object as Page
  const vm = new Observable()
  vm.set('progressValue', 10) // Initial value
  vm.set('progressMaxValue', 100) // Maximum value
  // Forcing progress value change (for demonstration)
  setInterval(() => {
    const value = vm.get('progressValue')
    vm.set('progressValue', value + 2)
  }, 300)
  page.bindingContext = vm
}
export function onProgressLoaded(args) {
  const myProgressBar = args.object as Progress
  myProgressBar.on('valueChange', (pargs: PropertyChangeData) => {
    // TIP: args (for valueChange of Progress) is extending EventData with oldValue & value parameters
    console.log(`Old Value: ${pargs.oldValue}`)
    console.log(`New Value: ${pargs.value}`)
  })
}
```

///

/// flavor angular

```html
<progress value="25" maxValue="100" (valueChanged)="onValueChanged($event)"></progress>
```

```ts
import { Component, OnInit } from '@angular/core'

@Component({
  moduleId: module.id,
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css']
})
export class StylingComponent implements OnInit {
  public progressValue: number

  ngOnInit() {
    this.progressValue = 25
  }
}
```

///

/// flavor react

```tsx
function getTaskCompletionPercent() {
  // Just a stub method to illustrate the concept.
  return 10
}

;<progress value={getTaskCompletionPercent()} maxValue={100} />
```

///

/// flavor vue

```html
<progress :value="currentProgress" />
```

///

/// flavor svelte

```html
<progress value="{currentProgress}" />
```

///

### Example: Styling Progress

Using `backgroundColor` (**CSS**: `background-color`) & color to change the Progress style.

:::tip Note
`backgroundColor` will work only on `iOS`; on `Android` the background will be the color with applied opacity.
:::

```html
<progress value="50" maxValue="100" backgroundColor="red" color="green"></progress>
<!-- Using the @nativescript/theme CSS class to change the Progress style -->
<progress value="25" maxValue="100" class="progress"></progress>
```

```css
Progress {
  color: cyan;
  background-color: green;
}
```

### Props

| Name           | Type        | Description                                                                                                                           |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `value`        | `Number`    | Gets or sets the current value of the progress bar. Must be within the range of 0 to `maxValue`.                                      |
| `maxValue`     | `Number`    | Gets or sets the maximum value of the progress bar.<br/>Default value: `100`.                                                         |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/progress) |

### Events

| Name          | Description                                |
| ------------- | ------------------------------------------ |
| `valueChange` | Emitted when the `value` property changes. |

### Native Component

| Android                                                                                                                         | iOS                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`android.widget.ProgressBar` (indeterminate = false)](https://developer.android.com/reference/android/widget/ProgressBar.html) | [`UIProgressView`](https://developer.apple.com/documentation/uikit/uiprogressview) |
