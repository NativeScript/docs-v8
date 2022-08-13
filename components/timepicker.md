---
title: TimePicker
---

## TimePicker

`<TimePicker>` is a UI component that lets users select time.

See also: [DatePicker](ui-and-styling.html#date-picker).

---

/// flavor plain

```xml
<TimePicker
  hour="10"
  minute="25"
  loaded="onPickerLoaded"
  row="2"
  col="0"
  colSpan="2"
  class="m-15"
  verticalAlignment="center"
/>
```

```ts
import { TimePicker } from '@nativescript/core'

export function onPickerLoaded(args) {
  const timePicker = args.object as TimePicker

  // Configurable properties of TimePicker
  timePicker.hour = 10
  timePicker.minute = 25
  timePicker.minuteInterval = 5
  timePicker.minHour = 7
  timePicker.maxHour = 11
  timePicker.minMinute = 10
  timePicker.maxMinute = 45
  timePicker.time = new Date()

  // handling 'timeChange' event via code behind
  timePicker.on('timeChange', (data: any) => {
    // data is of type PropertyChangeData
    console.log('Picked TIME: ', data.value)
    console.log('Previous TIME: ', data.oldValue)
  })
}
```

///

/// flavor angular

```html
<TimePicker
  hour="9"
  minute="25"
  maxHour="23"
  maxMinute="59"
  minuteInterval="5"
  (timeChange)="onTimeChanged($event)"
>
</TimePicker>
```

```ts
import { Component } from '@angular/core'
import { TimePicker } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class UsageComponent {
  todayObj: Date = new Date()

  onTimeChanged(args) {
    const tp = args.object as TimePicker

    const time = args.value
    console.log(`Chosen time: ${time}`)
  }
}
```

///

/// flavor vue

```html
<TimePicker :hour="selectedHour" :minute="selectedMinute" />
```

`<TimePicker>` provides two-way data binding using `v-model`.

```html
<TimePicker v-model="selectedTime" />
```

///

/// flavor svelte

```tsx
<timePicker hour="{selectedHour}" minute="{selectedMinute}" />
```

`<timePicker>` provides two-way data binding using `bind`.

```html
<timePicker bind:time="{selectedTime}" />
```

///

/// flavor react

```tsx
<timePicker hour={selectedHour} minute={selectedMinute} />
```

///

### Props

| Name             | Type        | Description                                                                                                                             |
| ---------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `hour`           | `Number`    | Gets or sets the selected hour.                                                                                                         |
| `minute`         | `Number`    | Gets or sets the selected minute.                                                                                                       |
| `time`           | `Date`      | Gets or sets the selected time.                                                                                                         |
| `minHour`        | `Number`    | Gets or sets the minimum selectable hour.                                                                                               |
| `maxHour`        | `Number`    | Gets or sets the maximum selectable hour.                                                                                               |
| `minMinute`      | `Number`    | Gets or sets the minimum selectable minute.                                                                                             |
| `maxMinute`      | `Number`    | Gets or sets the maximum selectable minute.                                                                                             |
| `minuteInterval` | `Number`    | Gets or sets the selectable minute interval. For example: 5 or 15 minutes.<br/>Default value: `1`.                                      |
| `...Inherited`   | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/timepicker) |

### Events

| Name         | Description                             |
| ------------ | --------------------------------------- |
| `timeChange` | Emitted when the selected time changes. |

### Native component

| Android                                                                                          | iOS                                                                            |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [`android.widget.TimePicker`](https://developer.android.com/reference/android/widget/TimePicker) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker) |
