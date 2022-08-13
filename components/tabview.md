---
title: TabView
---

## TabView

`<TabView>` is a navigation component that shows content grouped into tabs and lets users switch between tabs.

---

### Example: Simple TabView

/// flavor plain

```xml
<TabView
  loaded="onLoaded"
  selectedIndex="{{tabSelectedIndex}}"
  selectedIndexChanged="onSelectedIndexChanged"
  androidTabsPosition="bottom"
  androidOffscreenTabLimit="0"
>
  <TabViewItem title="Profile">
    <StackLayout>
      <Label
        text="{{ tabSelectedIndexResult }}"
        class="h2 m-t-16 text-center"
        textWrap="true"
      />
      <Button text="Change Tab" tap="changeTab" class="btn btn-primary btn-active" />
    </StackLayout>
  </TabViewItem>
  <TabViewItem title="Stats">
    <StackLayout>
      <Label
        text="{{ tabSelectedIndexResult }}"
        class="h2 m-t-16 text-center"
        textWrap="true"
      />
      <Button text="Change Tab" tap="changeTab" class="btn btn-primary btn-active" />
    </StackLayout>
  </TabViewItem>
  <TabViewItem title="Settings">
    <StackLayout>
      <Label
        text="{{ tabSelectedIndexResult }}"
        class="h2 m-t-16 text-center"
        textWrap="true"
      />
      <Button text="Change Tab" tap="changeTab" class="btn btn-primary btn-active" />
    </StackLayout>
  </TabViewItem>
</TabView>
```

```ts
import {
  Dialogs,
  Observable,
  TabView,
  SelectedIndexChangedEventData
} from '@nativescript/core'

export function onLoaded(args) {
  const tabView = args.object as TabView
  const vm = new Observable()
  vm.set('tabSelectedIndex', 0)
  vm.set('tabSelectedIndexResult', 'Profile Tab (tabSelectedIndex = 0 )')

  tabView.bindingContext = vm
}

export function changeTab(args) {
  const vm = args.object.bindingContext
  const tabSelectedIndex = vm.get('tabSelectedIndex')
  if (tabSelectedIndex === 0) {
    vm.set('tabSelectedIndex', 1)
  } else if (tabSelectedIndex === 1) {
    vm.set('tabSelectedIndex', 2)
  } else if (tabSelectedIndex === 2) {
    vm.set('tabSelectedIndex', 0)
  }
}
// displaying the old and new TabView selectedIndex
export function onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
  if (args.oldIndex !== -1) {
    const newIndex = args.newIndex
    const vm = (args.object as TabView).bindingContext
    if (newIndex === 0) {
      vm.set('tabSelectedIndexResult', 'Profile Tab (tabSelectedIndex = 0 )')
    } else if (newIndex === 1) {
      vm.set('tabSelectedIndexResult', 'Stats Tab (tabSelectedIndex = 1 )')
    } else if (newIndex === 2) {
      vm.set('tabSelectedIndexResult', 'Settings Tab (tabSelectedIndex = 2 )')
    }
    Dialogs.alert(
      `Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`
    ).then(() => {
      console.log('Dialog closed!')
    })
  }
}
```

///

/// flavor angular

Using a `<TabView>` inside an `Angular` app requires some special attention about how to provide title, iconSource and content (view) of the `TabViewItem`. In a pure NativeScript application TabView has an items property which could be set via XML to an array of `<TabViewItem>`s (basically, an array of objects with title, view and iconSource properties). However, NativeScript-Angular does not support nested properties in its HTML template, so adding `<TabViewItem>` to `<TabView`> is a little bit different. NativeScript-Angular provides a custom Angular directive that simplifies the way native `<TabView>` should be used. The following example shows how to add a `<TabView>` to your page (with some clarifications later):

```html
<TabView selectedIndex="0" (selectedIndexChanged)="onSelectedIndexchanged($event)">
  <StackLayout *tabItem="{title: 'First Tab', iconSource: 'res://icon'}">
    <StackLayout>
      <label
        text="First Tab"
        textWrap="true"
        class="m-15 h2 text-left"
        color="blue"
      ></label>
    </StackLayout>
  </StackLayout>
  <StackLayout *tabItem="{title: 'Second Tab', iconSource: 'res://icon'}">
    <StackLayout>
      <label
        text="Second Tab"
        textWrap="true"
        class="m-15 h2 text-left"
        color="blue"
      ></label>
    </StackLayout>
  </StackLayout>
</TabView>
```

::: warning Note
If you have set the iconSource property on a `<TabViewItem>`, but are not seeing any icons next to the title, this might be because the icon is not present in your `App_Resources` folder. See the Working with Images article for information on how to add and reference your resource images.
:::

///

/// flavor svelte

```tsx
<tabView selectedIndex="{selectedIndex}" on:selectedIndexChange="{indexChange}">
  <tabViewItem title="Tab 1">
    <label text="Content for Tab 1" />
  </tabViewItem>

  <tabViewItem title="Tab 2">
    <label text="Content for Tab 2" />
  </tabViewItem>
</tabView>
```

```js
function indexChange(event) {
  let newIndex = event.value
  console.log('Current tab index: ' + newIndex)
}
```

///

/// flavor vue

```html
<TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
  <TabViewItem title="Tab 1">
    <label text="Content for Tab 1" />
  </TabViewItem>
  <TabViewItem title="Tab 2">
    <label text="Content for Tab 2" />
  </TabViewItem>
</TabView>
```

```js
methods: {
  indexChange: function(args) {
      let newIndex = args.value
      console.log('Current tab index: ' + newIndex)
  }
}
```

///

/// flavor react

```tsx
import { SelectedIndexChangedEventData } from '@nativescript/core'
;<tabView
  selectedIndex={selectedIndex}
  onSelectedIndexChange={(args: SelectedIndexChangedEventData) => {
    const { oldIndex, newIndex } = args
    console.log(`Changed from tab index ${oldIndex} -> ${newIndex}.`)
  }}
>
  <tabViewItem nodeRole="items" title="Tab 1">
    <label text="Content for Tab 1" />
  </tabViewItem>
  <tabViewItem nodeRole="items" title="Tab 2">
    <label text="Content for Tab 2" />
  </tabViewItem>
</tabView>
```

///

::: warning Note
Currently, `TabViewItem` expects a single child element. In most cases, you might want to wrap your content in a layout.
:::

### Example: Adding icons to tabs

/// flavor vue

```html
<TabView :selectedIndex="selectedIndex" iosIconRenderingMode="alwaysOriginal">
  <TabViewItem title="Tab 1" iconSource="~/images/icon.png">
    <label text="Content for Tab 1" />
  </TabViewItem>
  <TabViewItem title="Tab 2" iconSource="~/images/icon.png">
    <label text="Content for Tab 2" />
  </TabViewItem>
</TabView>
```

///

/// flavor svelte

```tsx
<tabView selectedIndex="{selectedIndex}" iosIconRenderingMode="alwaysOriginal">
  <tabViewItem title="Tab 1" iconSource="~/images/icon.png">
    <label text="Content for Tab 1" />
  </tabViewItem>
  <tabViewItem title="Tab 2" iconSource="~/images/icon.png">
    <label text="Content for Tab 2" />
  </tabViewItem>
</tabView>
```

///

/// flavor react

```tsx
<tabView selectedIndex={selectedIndex} iosIconRenderingMode="alwaysOriginal">
  <tabViewItem nodeRole="items" title="Tab 1" iconSource="~/images/icon.png">
    <label text="Content for Tab 1" />
  </tabViewItem>
  <tabViewItem nodeRole="items" title="Tab 2" iconSource="~/images/icon.png">
    <label text="Content for Tab 2" />
  </tabViewItem>
</tabView>
```

///

<!-- TODO: examples in all flavors -->

::: tip Tip
You can use images for tab icons instead of icon fonts. For more information about how to control the size of icons, see [Working with image from resource folders](https://docs.nativescript.org/ui/image-resources).
:::

<!-- TODO: fix links -->

### Styling

The `TabView` component has the following unique styling properties:

- `tabTextColor` (corresponding CSS property `tab-text-color` ) - Changes the text color for the tabs.

- `selectedTabTextColor` (corresponding CSS property `selected-tab-text-color` ) - Changes the color of the text for the selected tab.

- `tabBackgroundColor` (corresponding CSS property `tab-background-color`) - Sets the background color of the tabs.

- `tabTextFontSize` (corresponding CSS property `tab-text-font-size`) - Sets the font size of the tabs.

- `textTransform` (corresponding CSS property `text-transform`) - Sets the text transform individually for every `TabViewItem`. Value options: `capitalize`, `lowercase`, `none`, and `uppercase`.

- `androidSelectedTabHighlightColor`<sup>android specific property</sup> (corresponding CSS property `android-selected-tab-highlight-color`) - Sets the underline color of the tabs in Android.

### Props

| Name                               | Type                                            | Description                                                                                                                          |
| ---------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `selectedIndex`                    | `Number`                                        | Gets or sets the currently selected tab. Default is `0`.                                                                             |
| `tabTextColor`                     | `Color`                                         | (Style property) Gets or sets the text color of the tabs titles.                                                                     |
| `tabTextFontSize`                  | `Color`                                         | Gets or sets the font size of the tabs titles.                                                                                       |
| `tabBackgroundColor`               | `Color`                                         | (Style property) Gets or sets the background color of the tabs.                                                                      |
| `selectedTabTextColor`             | `Color`                                         | (Style property) Gets or sets the text color of the selected tab title.                                                              |
| `androidTabsPosition`              | `String`                                        | Sets the position of the TabView in Android platform<br/>Valid values: `top` or `bottom`.                                            |
| `androidOffscreenTabLimit`         | `number`                                        | Gets or sets the number of tabs that should be retained to either side of the current tab in the view hierarchy in an idle state.    |
| `androidSelectedTabHighlightColor` | `Color`                                         | Gets or sets the color of the horizontal line drawn below the currently selected tab on Android.                                     |
| `iosIconRenderingMode`             | `automatic`, `alwaysOriginal`, `alwaysTemplate` | Gets or sets the icon rendering mode on iOS.                                                                                         |
| `...Inherited`                     | `Inherited`                                     | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/tabview) |

### TabViewItem Properties

| Name         | Type     | Description                                                                                                                                  |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`      | `string` | Gets or sets the title of the tab strip entry.                                                                                               |
| `iconSource` | `string` | Gets or sets the icon source of the tab strip entry. Supports local image paths (`~`), resource images (`res://`) and icon fonts (`font://`) |

### Events

| Name                  | Description                                                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectedIndexChange` | Emits [an event object](https://docs.nativescript.org/api-reference/classes/tabview#selectedindexchangedevent) containing an `newIndex` property with the index of the tapped `<TabViewItem>` (and an `oldIndex` property with the index of the previous tab). |

<!-- TODO: fix links -->

### Native component

| Android                                                                                                               | iOS                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`android.support.v4.view.ViewPager`](https://developer.android.com/reference/android/support/v4/view/ViewPager.html) | [`UITabBarController`](https://developer.apple.com/documentation/uikit/uitabbarcontroller) |
