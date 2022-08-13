---
title: ScrollView
---

## ScrollView

`<ScrollView>` is a UI component that shows a scrollable content area. Content can be scrolled vertically or horizontally.

It's important to note that `<ScrollView>` extends [`ContentView`](https://docs.nativescript.org/api-reference/classes/contentview), so it can only have a single child element.

---

/// flavor plain

```xml
<!--
    The default value of the orientation property is 'vertical'.
    The ScrollView also supports 'horizontal' as orientation value
-->
<ScrollView scroll="onScroll">
  <GridLayout rows="200 200 200 200 200 200 200 200 200 200">
    <Label row="0" text="Some row content goes here..." />
    <Label row="1" text="Some row content goes here..." />
    <Label row="2" text="Some row content goes here..." />
    <Label row="3" text="Some row content goes here..." />
    <Label row="4" text="Some row content goes here..." />
    <Label row="5" text="Some row content goes here..." />
    <Label row="6" text="Some row content goes here..." />
    <Label row="7" text="Some row content goes here..." />
    <Label row="8" text="Some row content goes here..." />
    <Label row="9" text="Some row content goes here..." />
  </GridLayout>
</ScrollView>
```

```ts
import { Page, ScrollEventData, ScrollView } from '@nativescript/core'

export function onScroll(args: ScrollEventData) {
  const scrollView = args.object as ScrollView

  console.log('scrollX: ' + args.scrollX)
  console.log('scrollY: ' + args.scrollY)
}
```

///

/// flavor angular

```html
<ScrollView (scroll)="onScroll($event)">
  <GridLayout rows="200 200 200 200 200 200 200 200 200 200">
    <label row="0" text="Some row content goes here..."></label>
    <label row="1" text="Some row content goes here..."></label>
    <label row="2" text="Some row content goes here..."></label>
    <label row="3" text="Some row content goes here..."></label>
    <label row="4" text="Some row content goes here..."></label>
    <label row="5" text="Some row content goes here..."></label>
    <label row="6" text="Some row content goes here..."></label>
    <label row="7" text="Some row content goes here..."></label>
    <label row="8" text="Some row content goes here..."></label>
    <label row="9" text="Some row content goes here..."></label>
  </GridLayout>
</ScrollView>
```

```ts
import { Component } from '@angular/core'
import { ScrollView, ScrollEventData } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './tips-and-tricks.component.html'
})
export class TipsAndTricksComponent {
  onScroll(args: ScrollEventData) {
    const scrollView = args.object as ScrollView

    console.log('scrollX: ' + args.scrollX)
    console.log('scrollY: ' + args.scrollY)
  }
}
```

///

/// flavor vue

```html
<ScrollView orientation="horizontal">
  <StackLayout orientation="horizontal">
    <label text="this" />
    <label text="text" />
    <label text="scrolls" />
    <label text="horizontally" />
    <label text="if necessary" />
  </StackLayout>
</ScrollView>
```

///

/// flavor svelte

```html
<scrollView orientation="horizontal">
  <stackLayout orientation="horizontal">
    <label text="this" />
    <label text="text" />
    <label text="scrolls" />
    <label text="horizontally" />
    <label text="if necessary" />
  </stackLayout>
</scrollView>
```

///

/// flavor react

```html
<scrollView orientation="horizontal">
  <stackLayout orientation="horizontal">
    <label text="this" />
    <label text="text" />
    <label text="scrolls" />
    <label text="horizontally" />
    <label text="if necessary" />
  </stackLayout>
</scrollView>
```

///

### Props

| name                        | type        | description                                                                                                                             |
| --------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `orientation`               | `String`    | Gets or sets the direction in which the content can be scrolled: `horizontal` or `vertical`.<br/>Default value: `vertical`.             |
| `scrollBarIndicatorVisible` | `Boolean`   | Specifies if the scrollbar is visible.<br/>Default value: `true`.                                                                       |
| `...Inherited`              | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/scrollview) |

### Events

| Name     | Description                         |
| -------- | ----------------------------------- |
| `scroll` | Emitted when a scroll event occurs. |

### Native component

| Android                                                                          | iOS                                                                            |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.view`](https://developer.android.com/reference/android/view/View.html) | [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview) |
