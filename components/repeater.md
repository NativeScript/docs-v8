---
title: Repeater
---

## Repeater

The Repeater widget allows you to display a collection of data, which is present in an array.

:::tip Note
`<Repeater>` is only applicable to plain NativeScript apps, most flavors provide directives to loop through arrays like `ngFor` and `v-for`.
:::

---

/// flavor plain

```xml
<Label row="0" text="Binding the Repeater items property to collection" textWrap="true" />
<Button row="1" text="Add new item" tap="onTap" />
<ScrollView row="2">
    <Repeater  id="firstRepeater" items="{{ myItems }}" />
</ScrollView>
<Label row="3" text="Define the Repeater itemTemplate property" textWrap="true" />
<Button row="4" text="Add new item (Second Repeater)" tap="onSecondTap" />
<ScrollView row="5" orientation="horizontal">
    <Repeater items="{{ mySecondItems }}">
        <Repeater.itemsLayout>
            <StackLayout orientation="horizontal" />
        </Repeater.itemsLayout>
        <Repeater.itemTemplate>
            <Label text="{{ $value }}" margin="10" />
        </Repeater.itemTemplate>
    </Repeater>
</ScrollView>
```

```ts
import { Observable, ObservableArray, Page } from '@nativescript/core'

const colors = ['red', 'green', 'blue']
const secondColorsArray = new ObservableArray(['red', 'green', 'blue'])

export function onNavigatingTo(args) {
  const page = args.object as Page
  const vm = new Observable()

  vm.set('myItems', colors)
  vm.set('mySecondItems', secondColorsArray)
  page.bindingContext = vm
}
```

///

::: tip Note
Changing the array after the repeater is shown will not update the UI. You can force-update the UI using the `refresh()` method.

When using `ObservableArray` the repeater will be automatically updated when items are added or removed form the array.
:::

### API References

| Name                                                                     | Type    |
| ------------------------------------------------------------------------ | ------- |
| [Repeater](https://docs.nativescript.org/api-reference/classes/repeater) | `Class` |
