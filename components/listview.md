## ListView

`<ListView>` is a UI component that shows items in a vertically scrolling list. To set how the list shows individual items, you can use the `<v-template>` component. Using a ListView requires some special attention due to the complexity of the native implementations, with custom item templates, bindings and so on.

The NativeScript modules provides a custom component which simplifies the way native ListView is used.

---

<!-- TODO: examples in all flavors -->

::: warning Note
The ListView's item template can contain only a single root view container.
:::

/// flavor plain

```xml
<ListView
  items="{{ titlesArray }}"
  loaded="{{ onListViewLoaded }}"
  itemTap="onItemTap"
  loadMoreItems="onLoadMoreItems"
  separatorColor="orangered"
  rowHeight="50"
  class="list-group"
  id="listView"
>
  <ListView.itemTemplate>
    <!-- The item template can only have a single root view container (e.g. GriLayout, StackLayout, etc.) -->
    <StackLayout class="list-group-item">
      <Label text="{{ title || 'Downloading...' }}" textWrap="true" class="title" />
    </StackLayout>
  </ListView.itemTemplate>
</ListView>
```

```ts
import {
  EventData,
  fromObject,
  ListView,
  ObservableArray,
  ItemEventData,
  Page
} from '@nativescript/core'

export function onNavigatingTo(args: EventData) {
  const page = args.object as Page
  const titlesArray = new ObservableArray([
    { title: 'The Da Vinci Code' },
    { title: 'Harry Potter and the Chamber of Secrets' },
    { title: 'The Alchemist' },
    { title: 'The Godfather' },
    { title: 'Goodnight Moon' },
    { title: 'The Hobbit' }
  ])
  const vm = Observable()
  vm.titlesArray = titlesArray

  page.bindingContext = vm
}

export function onListViewLoaded(args: EventData) {
  const listView = args.object as ListView
}

// The event will be raise when an item inside the ListView is tapped.
export function onItemTap(args: ItemEventData) {
  const index = args.index
  console.log(`Second ListView item tap ${index}`)
}

// The event will be raised when the ListView is scrolled so that the last item is visible.
// This even is intended to be used to add additional data in the ListView.
export function onLoadMoreItems(args: ItemEventData) {
  if (loadMore) {
    console.log('ListView -> LoadMoreItemsEvent')
    setTimeout(() => {
      listArray.push(
        moreListItems.getItem(Math.floor(Math.random() * moreListItems.length))
      )
      listArray.push(
        moreListItems.getItem(Math.floor(Math.random() * moreListItems.length))
      )
      listArray.push(
        moreListItems.getItem(Math.floor(Math.random() * moreListItems.length))
      )
      listArray.push(
        moreListItems.getItem(Math.floor(Math.random() * moreListItems.length))
      )
      listArray.push(
        moreListItems.getItem(Math.floor(Math.random() * moreListItems.length))
      )
    }, 3000)

    loadMore = false
  }
}
```

### Properties

| Name                    | Type                          | Description                                                                                                                                           |
| ----------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                 | `Array<any>` \| `ItemsSource` | Gets or set the items collection of the `ListView`. The items property can be set to an array or an object defining length and getItem(index) method. |
| `itemTemplateSelector`  | `function`                    | A function that returns the appropriate ket template based on the data item.                                                                          |
| `itemTemplates`         | `Array<KeyedTemplate>`        | Gets or set the list of item templates for the item template selector.                                                                                |
| `separatorColor`        | `string` \| `Color`           | Gets or set the items separator line color of the ListView.                                                                                           |
| `rowHeight`             | `Length`                      | Gets or set row height of the ListView.                                                                                                               |
| `iosEstimatedRowHeight` | `Length`                      | Gets or set the estimated height of rows in the ListView. Default value: **44px**                                                                     |

///

/// flavor angular

```html
<ListView [items]="items" (itemTap)="onItemTap($event)" class="list-group">
  <ng-template let-item="item" let-i="index" let-odd="odd" let-even="even">
    <!-- The item template can only have a single root view container (e.g. GridLayout, StackLayout, etc.)-->
    <GridLayout>
      <label [text]="item.name" class="list-group-item"></label>
    </GridLayout>
  </ng-template>
</ListView>
```

```ts
import { Component, Injectable, OnInit } from '@angular/core'
import { ItemEventData } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class ListViewUsageComponent implements OnInit {
  items: Array<Item>

  constructor(private _itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this._itemService.getItems()
  }

  onItemTap(args: ItemEventData) {
    console.log(
      `Index: ${args.index}; View: ${args.view} ; Item: ${this.items[args.index]}`
    )
  }
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items = new Array<Item>(
    { id: 1, name: 'Ter Stegen', role: 'Goalkeeper' },
    { id: 3, name: 'Piqué', role: 'Defender' },
    { id: 4, name: 'I. Rakitic', role: 'Midfielder' },
    { id: 5, name: 'Sergio', role: 'Midfielder' },
    { id: 6, name: 'Denis Suárez', role: 'Midfielder' },
    { id: 7, name: 'Arda', role: 'Midfielder' },
    { id: 8, name: 'A. Iniesta', role: 'Midfielder' },
    { id: 9, name: 'Suárez', role: 'Forward' },
    { id: 10, name: 'Messi', role: 'Forward' },
    { id: 11, name: 'Neymar', role: 'Forward' },
    { id: 12, name: 'Rafinha', role: 'Midfielder' },
    { id: 13, name: 'Cillessen', role: 'Goalkeeper' },
    { id: 14, name: 'Mascherano', role: 'Defender' },
    { id: 17, name: 'Paco Alcácer', role: 'Forward' },
    { id: 18, name: 'Jordi Alba', role: 'Defender' },
    { id: 19, name: 'Digne', role: 'Defender' },
    { id: 20, name: 'Sergi Roberto', role: 'Midfielder' },
    { id: 21, name: 'André Gomes', role: 'Midfielder' },
    { id: 22, name: 'Aleix Vidal', role: 'Midfielder' },
    { id: 23, name: 'Umtiti', role: 'Defender' },
    { id: 24, name: 'Mathieu', role: 'Defender' },
    { id: 25, name: 'Masip', role: 'Goalkeeper' }
  )

  getItems(): Array<Item> {
    return this.items
  }

  getItem(id: number): Item {
    return this.items.filter(item => item.id === id)[0]
  }
}

export class Item {
  constructor(public id: number, public name: string, public role: string) {}
}
```

### Item Templates

```html
<ListView
  [items]="items"
  class="list-group"
  [itemTemplateSelector]="templateSelector"
  row="0"
>
  <ng-template nsTemplateKey="red" let-item="item" let-i="index">
    <GridLayout>
      <label [text]="item.name" backgroundColor="red" color="white"></label>
    </GridLayout>
  </ng-template>

  <ng-template nsTemplateKey="green" let-item="item" let-i="index">
    <GridLayout>
      <label [text]="item.name" backgroundColor="green" color="yellow"></label>
    </GridLayout>
  </ng-template>
</ListView>
```

```ts
import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core'
import { ItemService, Item } from '../usage/usage.service'
import { ItemEventData } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './tips-and-tricks.component.html'
})
export class ListViewTipsComponent implements OnInit {
  items: Array<Item>

  constructor(private _itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this._itemService.getItems()
  }

  onItemTap(args: ItemEventData) {
    console.log(
      `Index: ${args.index}; View: ${args.view} ; Name: ${this.items[args.index].name}`
    )
  }

  templateSelector(item: Item, index: number, items: any) {
    return index % 2 === 0 ? 'red' : 'green'
  }
}
```

### Properties

| Name                    | Type                          | Description                                                                                                                                           |
| ----------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                 | `Array<any>` \| `ItemsSource` | Gets or set the items collection of the `ListView`. The items property can be set to an array or an object defining length and getItem(index) method. |
| `itemTemplateSelector`  | `function`                    | A function that returns the appropriate key template based on the data item.                                                                          |
| `itemTemplates`         | `Array<KeyedTemplate>`        | Gets or set the list of item templates for the item template selector.                                                                                |
| `separatorColor`        | `string` \| `Color`           | Gets or set the items separator line color of the ListView.                                                                                           |
| `rowHeight`             | `Length`                      | Gets or set row height of the ListView.                                                                                                               |
| `iosEstimatedRowHeight` | `Length`                      | Gets or set the estimated height of rows in the ListView. Default value: **44px**                                                                     |

///

/// flavor vue

```html
<ListView for="item in listOfItems" @itemTap="onItemTap">
  <v-template>
    <!-- Shows the list item label in the default color and style. -->
    <label :text="item.text" />
  </v-template>
</ListView>
```

### Using `<ListView>` with multiple `<v-template>` blocks

The [`v-template` component](https://nativescript-vue.org/en/docs/utilities/v-template/) is used to define how each list item is shown on the screen.

If you need to visualize one or more list items differently than the rest, you can enclose them in additional `<v-template>` blocks and use conditions. You can have as many `<v-template>` blocks as needed within one `<ListView>`.

```html
<ListView for="item in listOfItems" @itemTap="onItemTap">
  <v-template>
    <label :text="item.text" />
  </v-template>

  <v-template if="$odd">
    <!-- For items with an odd index, shows the label in red. -->
    <label :text="item.text" color="red" />
  </v-template>
</ListView>
```

When you create conditions for `<v-template>`, you can use a valid JavaScript expression with the following variables:

- `$index`&mdash; the index of the current item
- `$even`&mdash; `true` if the index of the current item is even
- `$odd`&mdash; `true` if the index of the current item is odd
- _`item`_&mdash; the _item_ of the list (the name corresponds to the iterator in the `for` property). E.g. `if="item.text == 'danger'"`

Only the above variables are available in this scope, and currently you do not have access to the component scope (component state, computed properties...).

::: warning Note

### An important note about `v-for`

`<ListView>` does not loop through list items as you would expect when using a [`v-for`](https://vuejs.org/v2/guide/list.html#Mapping-an-Array-to-Elements-with-v-for) loop. Instead `<ListView>` only creates the necessary views to display the currently visible items on the screen, and reuses the views that are already off-screen when scrolled. This concept is called _view recycling_ and is commonly used in mobile apps to improve performance.
:::

**This is important, because you should not use `key` properties within your v-templates, as they will force the ListView to re-create the views and prevent view recycling from working properly.**

To use multiple event listeners within a ListView, you can pass in the current item to the listener with `@tap="onTap(item, $event)"`.

[Check out this playground with multiple buttons in each ListView cell](https://play.nativescript.org/?template=play-vue&id=ZEgWFu&v=1)

If you only need to handle taps on the whole cell, you can use the `itemTap` event which contains the index of the tapped item and the actual item from the list.

```js
onItemTap(event) {
  console.log(event.index)
  console.log(event.item)
}
```

::: warning Note
If a `v-for` is used on a `<ListView>` a warning will be printed to the console, and it will be converted to the `for` property.
:::

### Props

| Name             | Type         | Description                                                                                                                                                                                                                 |
| ---------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `for`            | `String`     | Provides the expression for iterating through the items.<br/>For example: <ul><li><code>item in listOfItems</code></li><li><code>(item, index) in listOfItems</code></li><li><code>item in [1, 2, 3, 4, 5]</code></li></ul> |
| `items`          | `Array<any>` | An array of items to be shown in the `<ListView>`.<br/>**This property is only for advanced use. Use the `for` property instead.**                                                                                          |
| `separatorColor` | `Color`      | Sets the separator line color. Set to `transparent` to remove it.                                                                                                                                                           |
| `...Inherited`   | `Inherited`  | Additional inherited properties not shown. Refer to the [API Reference]()                                                                                                                                                   |

### todo: cleanup API References

| Name                                                                                  | Type        |
| ------------------------------------------------------------------------------------- | ----------- |
| [ListView](https://docs.nativescript.org/api-reference/classes/listview)              | `Class`     |
| [ItemEventData](https://docs.nativescript.org/api-reference/interfaces/itemeventdata) | `Interface` |
| [ItemsSource](https://docs.nativescript.org/api-reference/interfaces/itemssource)     | `Interface` |
| [KeyedTemplate](https://docs.nativescript.org/api-reference/interfaces/keyedtemplate) | `Interface` |

///

::: tip Tip
Instead of manually triggering the UI update with the help of ListView's refresh method, NativeScript provides the ObservableArray. Using an ObservableArray for your listview's items source will make its members an observable objects and adding/removing an array item will automatically update the UI.
:::

::: danger Important
Using the ListView component inside a ScrollView or ScrollView inside the ListView's items can lead to poor performance and can reflect the user experience. To avoid this issue, we should specify the height explicitly for the ListView in the scenario when the ListView is nested in ScrollView and the ScrollView's height - when the component is used inside the ListView.

```html
<ScrollView>
  <StackLayout>
    <ListView height="150" [items]="countries"> ... </ListView>
  </StackLayout>
</ScrollView>
```

:::

### Events

| Name      | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| `itemTap` | Emitted when an item in the `<ListView>` is tapped. To access the tapped item, use `event.item`. |

### Methods

| Name                                           | Description                                                     |
| ---------------------------------------------- | --------------------------------------------------------------- |
| `refresh()`                                    | Forces the `<ListView>` to reload all its items.                |
| `scrollToIndex(index: number)`                 | Scrolls the specified item with index into view.                |
| `scrollToIndexAnimated(index: number)`         | Scrolls the specified item with index into view with animation. |
| `isItemAtIndexVisible(index: number): boolean` | Checks if specified item with index is visible.                 |

### Native component

| Android                                                                                           | iOS                                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.ListView`](https://developer.android.com/reference/android/widget/ListView.html) | [`UITableView`](https://developer.apple.com/documentation/uikit/uitableview) |
