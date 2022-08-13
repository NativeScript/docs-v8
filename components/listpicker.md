---
title: ListPicker
---

## ListPicker

`<ListPicker>` is a UI component that lets the user select a value from a pre-configured list.

---

#### Example: Simple List Picker

/// flavor plain

```xml
<ListPicker items="{{ years }}" selectedIndex="0" loaded="onListPickerLoaded" />
```

```ts
import { EventData, fromObject, ListPicker, Page } from '@nativescript/core'

const years = [1980, 1990, 2000, 2010, 2020]

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object
  const vm = fromObject({
    years: years
  })
  page.bindingContext = vm
}

export function onListPickerLoaded(args) {
  const listPickerComponent = args.object
  listPickerComponent.on('selectedIndexChange', (data: EventData) => {
    const picker = data.object as ListPicker
    console.log(`index: ${picker.selectedIndex}; item" ${years[picker.selectedIndex]}`)
  })
}
```

///

/// flavor angular

```html
<ListPicker [items]="items" class="picker"> </ListPicker>
```

///

/// flavor vue

```html
<ListPicker
  :items="listOfItems"
  selectedIndex="0"
  @selectedIndexChange="selectedIndexChanged"
/>
```

`<ListPicker>` provides two-way data binding using `v-model`.

```html
<ListPicker :items="listOfItems" v-model="selectedItem" />
```

///

/// flavor svelte

```tsx
<listPicker
  items="{listOfItems}"
  selectedIndex="0"
  on:selectedIndexChange="{selectedIndexChanged}"
/>
```

```js
let listOfItems = ['one', 'two', 'three']
const selectedIndexChanged = e => console.log(e.index)
```

`<ListPicker>` provides two-way data binding for `selectedIndex`.

```tsx
<listPicker items="{listOfItems}" bind:selectedIndex="{selectedItem}" />
```

///

/// flavor react

```tsx
import { EventData, ListPicker } from '@nativescript/core'
;<listPicker
  items={listOfItems}
  selectedIndex={0}
  onSelectedIndexChange={(args: EventData) => {
    const listPicker: ListPicker = args.object as ListPicker
    const index: number = listPicker.selectedIndex
    const item = listPicker.items[index]
  }}
/>
```

///

### Props

| Name            | Type            | Description                                                                                                                             |
| --------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `items`         | `Array<String>` | Gets or sets the items displayed as options in the list picker.                                                                         |
| `selectedIndex` | `Number`        | Gets or sets the index of the currently selected item.                                                                                  |
| `...Inherited`  | `Inherited`     | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/listpicker) |

### Events

| Name                  | Description                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------- |
| `selectedIndexChange` | Emitted when the currently selected option (index) changes. The new index can be retrieved via `$event.value`. |

### Native component

| Android                                                                                                   | iOS                                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.widget.NumberPicker`](https://developer.android.com/reference/android/widget/NumberPicker.html) | [`UIPickerView`](https://developer.apple.com/documentation/uikit/uipickerview) |
