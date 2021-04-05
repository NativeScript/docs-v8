# NativeScript UI ListView

::: tip Note
This documentation is a current WIP item being migrated from previous documentation.
You can access the [documentation being migrated here](https://github.com/NativeScript/docs/tree/master/docs/ui/components/RadListView).
:::

## Overview

The **NativeScript UI ListView** plugin is a virtualizing list component that provides the most popular features associated with scenarios where a list of items is used. All these features are embedded in one control with the idea to save developer time and provide better experience. The main features include:

- Item animations
- Different layouts and orientations
- Smart defaults for many gestures - select on long press, execution of special action on swipe, reorder of items on long press and drag, refreshing the list on swipe or loading more items only when needed.

<img src="/assets/images/ns_ui/list-view-overview_1.png">
<img src="/assets/images/ns_ui/list-view-overview_2.png">

## Installation

In Command prompt / Terminal navigate to your application root folder and run:

```cli
ns plugin add nativescript-ui-listview
```

## Features

Different Layouts
RadListView supports three different item layout strategies that are commonly used on mobile apps:

list - items are stacked - either horizontally or vertically, depending on the scrolling orientation.

grid - items are arranged in columns or rows - depending on the scrolling orientation.

staggered grid - items are ordered in a staggered grid formation - either in rows or columns, depending on the scrolling orientation.

<img src="/assets/images/ns_ui/list-view-overview_3.png">

All layouts are virtualized and optimized for mobile devices.

### Selection

RadListView for NativeScript exposes API allowing you to enable item selection and track selection changes.

When using the selection mechanism, two selection modes are available:

- Single selection
- Multiple selection

RadListView also exposes convenient API for programmatically selecting or deselecting items and acquiring the currently selected items. The following methods are exposed by RadListView to manage selection:

- `selectAll()` - selects all available items in the data source
- `deselectAll()` - deselects all currently selected items from the data source
- `selectItemAt(index)` - selects the item at the specified index
- `deselectItemAt(index)` - deselects the item at the specified index if selected
- `isItemSelected(item)` - determines whether the provided item is selected
- `getSelectedItems()` - returns an array of the items currently selected

#### Enabling Selection in RadListView

The value of the `selectionBehavior` property determines how the item selection works. It accepts the values from the `ListViewSelectionBehavior` enumeration:

- ListViewSelectionBehavior.None - items cannot be selected
- ListViewSelectionBehavior.Press - items are selected by tapping on them
- ListViewSelectionBehavior.LongPress - items are selected by holding them

Additionally, the value of the `multipleSelection` property determines which selection mode will be used. The available options are:

- _multiple selection mode_ - allows for selecting multiple items. `RadListView` keeps track of which items are selected and exposes them through a `getSelectedItems()` method. Multiple selection is enabled by setting the `multipleSelection` property to `true`.
- _single selection mode_ - only one item can be selected at a time. This mode is enabled by setting the `multipleSelection` property to `false`.

#### Enabling multiple selection on RadListView in XML

<!-- <snippet id='listview-multiple-selection-xml'/> -->

#### Handling Selection Events

To notify you when the selection state of an item is changed, RadListView exposes the following events:

- `itemSelecting` - fired before an item is selected. Can be used to cancel the operation.
- `itemSelected` - fired after an item is successfully selected. At this point the item is already in the selected items array returned by the `getSelectedItems()` method.
- `itemDeselecting` - fired before an item is deselected. Can be used to cancel the operation.
- `itemDeselected` - fired after an item has been successfully deselected. At this point the item is not part of the selected items array returned by the `getSelectedItems()` method.

#### Examples

#### Single Selection

/// flavor plain

```xml
<GridLayout orientation="vertical" rows="auto, *, auto">
  <lv:RadListView
    id="listView"
    items="{{ dataItems }}"
    row="1"
    selectionBehavior="Press"
    itemSelected="onItemSelected"
    itemDeselected="onItemDeselected"
  >
    <lv:RadListView.itemTemplate>
      <StackLayout orientation="vertical" paddingLeft="16">
        <Label fontSize="20" text="{{ itemName }}" />
        <Label fontSize="13" text="{{ itemEmail }}" />
      </StackLayout>
    </lv:RadListView.itemTemplate>
  </lv:RadListView>
  <Label id="txtSelection" textWrap="true" row="2" />
</GridLayout>
```

```ts
export function onItemSelected(args) {
  const selectedItems = listView.getSelectedItems()
  let selectedTitles = 'Selected items: '
  for (let i = 0; i < selectedItems.length; i++) {
    selectedTitles += selectedItems[i].itemName

    if (i < selectedItems.length - 1) {
      selectedTitles += ', '
    }
  }

  lblSelection.text = selectedTitles
}

export function onItemDeselected(args) {
  const selectedItems = listView.getSelectedItems()
  let selectedTitles = 'Selected items: '
  for (let i = 0; i < selectedItems.length; i++) {
    selectedTitles += selectedItems[i].itemName

    if (i < selectedItems.length - 1) {
      selectedTitles += ', '
    }
  }

  lblSelection.text = selectedTitles
}
```

///

#### Multiple Selection

/// flavor plain

```xml
<Page
  loaded="onPageLoaded"
  xmlns:lv="nativescript-ui-listview"
  xmlns="http://www.nativescript.org/tns.xsd"
>
  <lv:RadListView
    id="listView"
    items="{{ dataItems }}"
    row="1"
    selectionBehavior="Press"
    multipleSelection="true"
  >
    <lv:RadListView.itemTemplate>
      <StackLayout orientation="vertical" android:paddingLeft="16" ios:paddingLeft="50">
        <Label fontSize="20" text="{{ name }}" />
      </StackLayout>
    </lv:RadListView.itemTemplate>
  </lv:RadListView>
</Page>
```

///

#### Programmatic Selection

/// flavor plain

```xml
<Page
  loaded="onPageLoaded"
  xmlns:lv="nativescript-ui-listview"
  xmlns="http://www.nativescript.org/tns.xsd"
>
  <GridLayout orientation="vertical" rows="auto, *">
    <lv:RadListView
      items="{{ dataItems }}"
      row="1"
      id="listView"
      multipleSelection="true"
      selectionBehavior="Press"
    >
      <lv:RadListView.itemTemplate>
        <StackLayout orientation="vertical" ios:paddingLeft="50" android:paddingLeft="16">
          <Label fontSize="20" text="{{ itemName }}" />
          <Label fontSize="14" text="{{ itemEmail }}" />
        </StackLayout>
      </lv:RadListView.itemTemplate>
    </lv:RadListView>
  </GridLayout>
</Page>
```

```ts
export function onPageLoaded(args) {
  const page = args.object
  listView = page.getViewById('listView')
}

export function onSelectItemAtTap(args) {
  listView.selectItemAt(Number(txtSelectItemIndex.text))
}

export function onDeselectItemAtTap(args) {
  listView.deselectItemAt(Number(txtDeselectItemIndex.text))
}

export function onSelectAllTap(args) {
  listView.selectAll()
}

export function onDeselectAllTap(args) {
  listView.deselectAll()
}
```

///

### First Visible Index

`getFirstVisiblePosition()` returns the first visible position the listview.

/// flavor plain

```ts
import { RadListView } from 'nativescript-ui-listview'

let myList: RadListView

export function onPageLoaded(args) {
  const page = args.object as Page
  myList = page.getViewById('myList') as RadListView
}

export function getTheFirstVisiblePositionOfTheList() {
  const firstVisibleIndex = myList.getFirstVisiblePosition()
  console.log('First visible index:', firstVisibleIndex)
}
```

///

### Horizontal Layout

/// flavor plain

```xml
<lv:RadListView items="{{ dataItems }}" horizontalAlignement="center">
  <lv:RadListView.itemTemplate>
    <StackLayout orientation="vertical">
      <Label fontSize="20" text="{{ itemName }}" />
      <Label fontSize="14" text="{{ itemDescription }}" textWrap="true" />
    </StackLayout>
  </lv:RadListView.itemTemplate>
  <lv:RadListView.listViewLayout>
    <lv:ListViewLinearLayout scrollDirection="Horizontal" />
  </lv:RadListView.listViewLayout>
</lv:RadListView>
```

///

### Pull to Refresh

`pullToRefresh` - set to `true` to enable pull to refresh functionality.

`pullToRefreshInitiated` - event to initiate your data processing for updating the listview items.

/// flavor plain

```xml
<lv:RadListView
  items="{{ dataItems }}"
  pullToRefresh="true"
  pullToRefreshInitiated="{{ onPullToRefreshInitiated }}"
>
  <lv:RadListView.itemTemplate>
    <StackLayout
      orientation="vertical"
      padding="5 10 5 10"
      style="background-color: #7fff7f;"
    >
      <StackLayout
        orientation="horizontal"
        padding="10"
        style="background-color: #65a565;"
      >
        <img:Img height="100" width="80" src="{{ image }}" />
        <StackLayout orientation="vertical" marginLeft="15">
          <Label fontSize="20" text="{{ name }}" marginBottom="8" />
          <Label
            fontSize="14"
            text="{{ title }}"
            style="font-weight: bold;"
            textWrap="true"
          />
          <Label fontSize="12" text="{{ text }}" color="White" textWrap="true" />
        </StackLayout>
      </StackLayout>
    </StackLayout>
  </lv:RadListView.itemTemplate>
</lv:RadListView>
```

```ts
import { ListViewEventData } from 'nativescript-ui-listview'

async onPullToRefreshInitiated(args: ListViewEventData) {
    // some operation to fetch more data items from a backend service/API
    const data = await someHttpCall()
    if (data) {
        // add the data to your existing observable array bound to the RLV Items
        const listView = args.object;
        listView.notifyPullToRefreshFinished();
    }
}
```

///

## Documentation

<!-- More information is available in the Guides for: -->

<!-- - [NativeScript Core](https://docs.nativescript.org/ui/professional-ui-components/ListView/overview)
- [NativeScript with Angular](https://docs.nativescript.org/angular/ui/ng-components/ng-RadListView/overview)
- [NativeScript with Vue.js](https://docs.nativescript.org/vuejs/ns-ui/ListView/overview) -->

## API Reference

[Here](https://docs.nativescript.org/ns-ui-api-reference/classes/radlistview) is the API Reference section.
