---
title: Slider
---

## Slider

`<Slider>` is a UI component that provides a slider control for picking values within a specified numeric range.

---

### Example: Simple Slider

/// flavor plain

```xml
<Slider value="10" minValue="0" maxValue="100" loaded="onSliderLoaded" />
```

```ts
import { Slider } from '@nativescript/core'

export function onSliderLoaded(args) {
  const sliderComponent = args.object as Slider
  sliderComponent.on('valueChange', data => {
    console.log(`Slider new value ${data.value}`)
  })
}
```

///

/// flavor angular

```html
<Slider
  value="10"
  minValue="0"
  maxValue="100"
  (valueChange)="onSliderValueChange($event)"
>
</Slider>
```

```ts
import { Component } from '@angular/core'
import { Slider } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class UsageComponent {
  onSliderValueChange(args) {
    const slider = args.object as Slider
    console.log(`Slider new value ${args.value}`)
  }
}
```

///

/// flavor vue

```html
<Slider value="80" @valueChange="onValueChanged" />
```

`<Slider>` provides two-way data binding using `v-model`:

```html
<Slider v-model="value" />
```

///

/// flavor svelte

```tsx
<slider value="80" on:valueChange="{onValueChanged}" />
```

`<slider>` provides two-way data binding of `value`:

```html
<slider bind:value="{value}" />
```

///

/// flavor react

```tsx
<slider value={0} onValueChange={onValueChange} />
```

///

### Props

| Name           | Type        | Description                                                                                                                         |
| -------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `value`        | `Number`    | Gets or sets the currently selected value of the slider.<br/>Default value: `0`.                                                    |
| `minValue`     | `Number`    | Gets or sets the minimum value of the slider.<br/>Default value: `0`.                                                               |
| `maxValue`     | `Number`    | Gets or sets the maximum value of the slider.<br/>Default value: `100`.                                                             |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/slider) |

<!-- TODO: fix links -->

### Events

| Name          | Description                                   |
| ------------- | --------------------------------------------- |
| `valueChange` | Emitted when the value of the slider changes. |

### Native component

| Android                                                                                         | iOS                                                                    |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`android.widget.SeekBar`](https://developer.android.com/reference/android/widget/SeekBar.html) | [`UISlider`](https://developer.apple.com/documentation/uikit/uislider) |
