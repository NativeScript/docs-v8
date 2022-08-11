---
title: DatePicker
---

## Date Picker

`<DatePicker>` is a UI component that lets users select a date from a pre-configured range.

See also: [TimePicker](/ui-and-styling.html#timepicker).

---

/// flavor plain

```xml
<DatePicker
  year="1980"
  month="4"
  day="20"
  loaded="onDatePickerLoaded"
  date="{{ date }}"
  minDate="{{ minDate }}"
  maxDate="{{ maxDate }}"
/>
```

```ts
import { DatePicker, EventData, Observable, Page } from '@nativescript/core'

export function onNavigatingTo(args: EventData) {
  const page = args.object as Page
  const vm = new Observable()

  // in the following example the DatePicker properties are binded via Observableproperties
  vm.set('minDate', new Date(1975, 0, 29)) // the binded minDate property accepts Date object
  vm.set('maxDate', new Date(2045, 4, 12)) // the binded maxDate property accepts Date object

  page.bindingContext = vm
}

export function onDatePickerLoaded(data: EventData) {
  const datePicker = data.object as DatePicker
  datePicker.on('dateChange', args => {
    console.dir(args)
  })
  datePicker.on('dayChange', args => {
    console.dir(args)
  })
  datePicker.on('monthChange', args => {
    console.dir(args)
  })
  datePicker.on('yearChange', args => {
    console.dir(args)
  })
}
```

///

/// flavor angular

```html
<DatePicker
  year="1980"
  month="4"
  day="20"
  [minDate]="minDate"
  [maxDate]="maxDate"
  (dateChange)="onDateChanged($event)"
  (dayChange)="onDayChanged($event)"
  (monthChange)="onMonthChanged($event)"
  (yearChange)="onYearChanged($event)"
  (loaded)="onDatePickerLoaded($event)"
  verticalAlignment="center"
>
</DatePicker>
```

```typescript
import { Component } from '@angular/core'
import { DatePicker } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class DatePickerUsageComponent {
  minDate: Date = new Date(1975, 0, 29)
  maxDate: Date = new Date(2045, 4, 12)

  onDatePickerLoaded(args) {
    // const datePicker = args.object as DatePicker;
  }

  onDateChanged(args) {
    console.log('Date New value: ' + args.value)
    console.log('Date value: ' + args.oldValue)
  }

  onDayChanged(args) {
    console.log('Day New value: ' + args.value)
    console.log('Day Old value: ' + args.oldValue)
  }

  onMonthChanged(args) {
    console.log('Month New value: ' + args.value)
    console.log('Month Old value: ' + args.oldValue)
  }

  onYearChanged(args) {
    console.log('Year New value: ' + args.value)
    console.log('Year Old value: ' + args.oldValue)
  }
}
```

///

/// flavor vue

```html
<DatePicker :date="someDate" />
```

`<DatePicker>` provides two-way data binding using `v-model`.

```html
<DatePicker v-model="selectedDate" />
```

///

/// flavor react

```tsx
import { EventData } from '@nativescript/core'
;<datePicker
  date={new Date()}
  onDateChange={(args: EventData) => {
    const datePicker = args.object
  }}
/>
```

///

/// flavor svelte

```html
<datePicker date="{someDate}" />
```

`<datePicker>` provides two-way data binding using `bind`.

```html
<datePicker bind:date="{selectedDate}" />
```

///

### Props

| Name                          | Type        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `date`                        | `Date`      | Gets or sets the complete date.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `minDate`                     | `Date`      | Gets or sets the earliest possible date to select.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `maxDate`                     | `Date`      | Gets or sets the latest possible date to select.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `day`                         | `Number`    | Gets or sets the day.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `month`                       | `Number`    | Gets or sets the month.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `year`                        | `Number`    | Gets or sets the year.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `iosPreferredDatePickerStyle` | `number`    | Gets or set the UIDatePickerStyle of the date picker in iOS 13.4+. Defaults to 0.<br> Valid values are numbers:<br><br>`0 = automatic`: system picks the concrete style based on the current platform and date picker mode<br>`1 = wheels`: the date picker displays as a wheel picker<br>`2 = compact` : the date picker displays as a label that when tapped displays a calendar-style editor<br>`3 = inline` : the date pickers displays as an inline, editable field |
| `...Inherited`                | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/datepicker)                                                                                                                                                                                                                                                                                                                                  |

### Events

| Name         | Description                             |
| ------------ | --------------------------------------- |
| `dateChange` | Emitted when the selected date changes. |

### Native component

| Android                                                                                               | iOS                                                                            |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.widget.DatePicker`](https://developer.android.com/reference/android/widget/DatePicker.html) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker) |
