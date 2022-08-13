---
title: SegmentedBar
---

## SegmentedBar

`<SegmentedBar>` is a UI bar component that displays a set of buttons for discrete selection. Can show text or images.

As opposed to [`<TabView>`](#tabview):

- The position of `<SegmentedBar>` is not fixed.
- You can place and style it as needed on the page or inside additional app elements such as hamburger menus.
- You need to handle the content shown after selection separately.

---

### Example: SegmentedBar with `SegmentedBarItem`

/// flavor plain

```xml
<SegmentedBar>
  <SegmentedBarItem title="First" />
  <SegmentedBarItem title="Second" />
  <SegmentedBarItem title="Third" />
</SegmentedBar>
```

///

/// flavor angular

```html
<SegmentedBar>
  <SegmentedBarItem title="First"></SegmentedBarItem>
  <SegmentedBarItem title="Second"></SegmentedBarItem>
  <SegmentedBarItem title="Third"></SegmentedBarItem>
</SegmentedBar>
```

///

/// flavor svelte

```html
<segmentedBar>
  <segmentedBarItem title="First" />
  <segmentedBarItem title="Second" />
  <segmentedBarItem title="Third" />
</segmentedBar>
```

///

/// flavor react

```tsx
<segmentedBar>
  <segmentedBarItem title="First" />
  <segmentedBarItem title="Second" />
  <segmentedBarItem title="Third" />
</segmentedBar>
```

///

/// flavor vue

```html
<SegmentedBar>
  <SegmentedBarItem title="First" />
  <SegmentedBarItem title="Second" />
  <SegmentedBarItem title="Third" />
</SegmentedBar>
```

///

### Example: SegmentedBar with `selectedIndex`

/// flavor plain

```xml
<SegmentedBar row="0" class="m-5" selectedIndex="{{ sbSelectedIndex }}">
  <SegmentedBar.items>
    <SegmentedBarItem title="Item 1" />
    <SegmentedBarItem title="Item 2" />
    <SegmentedBarItem title="Item 3" />
  </SegmentedBar.items>
</SegmentedBar>
```

```ts
import { Observable, Page, PropertyChangeData } from '@nativescript/core'

export function onNavigatingTo(args) {
  const page = args.object as Page
  // set up the SegmentedBar selected index
  const vm = new Observable()
  vm.set('prop', 0)
  vm.set('sbSelectedIndex', 0)
  // handle selected index change
  vm.on(Observable.propertyChangeEvent, (data: PropertyChangeData) => {
    if (data.propertyName === 'sbSelectedIndex') {
      vm.set('prop', data.value)
    }
  })
  page.bindingContext = vm
}
```

///

/// flavor angular

```html
<SegmentedBar
  [items]="mySegmentedBarItems"
  selectedIndex="0"
  (selectedIndexChanged)="onSelectedIndexChanged($event)"
>
</SegmentedBar>
```

```ts
import { Component, ChangeDetectionStrategy } from '@angular/core'
import {
  SegmentedBar,
  SegmentedBarItem,
  SelectedIndexChangedEventData
} from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicSegmentedBarComponent {
  mySegmentedBarItems: Array<SegmentedBarItem> = []

  constructor() {
    for (let i = 1; i < 5; i++) {
      const item = new SegmentedBarItem()
      item.title = 'Item ' + i
      this.mySegmentedBarItems.push(item)
    }
  }

  public onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    const segmentedBar = args.object as SegmentedBar
    const oldIndex = args.oldIndex
    const newIndex = args.newIndex
  }
}
```

///

/// flavor vue

```html
<SegmentedBar
  :items="listOfItems"
  selectedIndex="0"
  @selectedIndexChanged="onSelectedIndexChange"
/>
```

`<SegmentedBar>` provides two-way data binding using `v-model`.

```html
<SegmentedBar :items="listOfItems" v-model="selectedItem" />
```

///

/// flavor svelte

```html
<segmentedBar selectedIndex="0" on:selectedIndexChanged="{onSelectedIndexChange}" />
```

`<segmentedBar>` can be populated with `{each}` block.

```html
<segmentedBar>
  {#each listOfItems as item}
  <segmentedBarItem title="{item}" />
  {/each}
</segmentedBar>
```

```js
let listOfItems = ['First', 'Second', 'Third']
```

`<segmentedBar>` provides two-way data binding of `selectedIndex`.

```tsx
<segmentedBar bind:selectedIndex="{selectedItem}" >
```

///

/// flavor react

```tsx
<segmentedBar
  items={listOfItems}
  selectedIndex={0}
  selectedIndexChanged={onSelectedIndexChange}
/>
```

///

### Props

| Name                      | Type                      | Description                                                                                                                                                   |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                   | `Array<SegmentedBarItem>` | An array of items to be displayed in the segmented bar. Represents the button labels or icons of the segmented bar.<br/>The array must be created in advance. |
| `selectedIndex`           | `Number`                  | Gets or sets the index of the selected item.                                                                                                                  |
| `selectedBackgroundColor` | `Color`                   | (Style property) Gets or sets the background color of the selected item. To set the background color of the entire bar, use `backgroundColor`.                |
| `...Inherited`            | `Inherited`               | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/segmentedbar)                     |

### Events

| Name                   | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `selectedIndexChanged` | Emitted when the an item on the segmented bar is tapped. |

### Native component

| Android                                                                                         | iOS                                                                                        |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`android.widget.TabHost`](https://developer.android.com/reference/android/widget/TabHost.html) | [`UISegmentedControl`](https://developer.apple.com/documentation/uikit/uisegmentedcontrol) |
