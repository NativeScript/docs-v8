---
title: UI & Styling
---

### Layout Properties

#### Margins

The four margin properties (`marginTop`, `marginRight`, `marginBottom` and `marginLeft`) describe the distance between a view and its parent.

When you set margins through XML, you can choose between the following approaches.

- **Set one value**: Provide a single value that will be applied on all sides of the view.
- **Set two values**: Provide two values. The first value is applied to the top side, the second value is applied to the right side. Next, the first value is applied to the bottom and the second value to the left side (in that order).
- **Set four values**: Provide four values for each margin. The first value is applied to the top, the second value is applied to the right, the third value is applied to the bottom and the fourth value is applied to the left side (in that order).

#### Paddings

The four padding properties (`paddingTop`, `paddingRight`, `paddingBottom` and `paddingLeft`) describe the distance between the layout container and its children.

When you set paddings through XML, you can choose between the following approaches.

- **Set one value**: Provide a single value that will be applied on all sides of the view.
- **Set two values**: Provide two values. The first value is applied to the top side, the second value is applied to the right side. Next, the first value is applied to the bottom and the second value to the left side (in that order).
- **Set four values**: Provide four values for each padding. The first value is applied to the top, the second value is applied to the right, the third value is applied to the bottom and the fourth value is applied to the left side (in that order).

#### Alignments

Layout applies horizontal and vertical alignment only when an element is allocated more size than it needs.

The following table shows the valid values of `horizontalAlignment`.

| Member  | Description                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------ |
| left    | The view is aligned to the left of the layout slot of the parent element.                              |
| center  | The view is aligned to the center of the layout slot of the parent element.                            |
| right   | The view is aligned to the right of the layout slot of the parent element.                             |
| stretch | The view is stretched to fill the layout slot of the parent element; `width` takes precedence, if set. |

The following table shows the valid values of `verticalAlignment`.

| Member  | Description                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------- |
| top     | The view is aligned to the top of the layout slot of the parent element.                                |
| center  | The view is aligned to the center of the layout slot of the parent element.                             |
| bottom  | The view is aligned to the bottom of the layout slot of the parent element.                             |
| stretch | The view is stretched to fill the layout slot of the parent element; `height` takes precedence, if set. |

### Percentage Support

NativeScript supports percentage values for `width`, `height` and `margin`. When a layout pass begins, first the percent values are calculated based on parent available size. This means that on vertical `StackLayout` if you place two `Buttons` with `height='50%'` they will get all the available height (e.g., they will fill the `StackLayout` vertically.). The same applies for margin properties. For example, if you set `marginLeft='5%'`, the element will have a margin that corresponds to 5% of the parent's available width.

### iOS Safe Area Support

The iOS `Safe Area` is a term that Apple introduced in iOS 11. It is the area of the screen that is free to use and won’t be obstructed by hardware and software parts of the system. The safe area is not a constant. It is affected by the notch, the rounded corners of the screen, the status bar and the home indicator, but also from parts of your application like the action bar and the tab bar. To get a better understanding refer to the [Apple docs](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/).

Since version 5.0 NativeScript provides a default handling mechanism for the iOS `Safe Area`. The default behavior is that certain container `View` components (these that can have children) overflow the safe area and are laid out to the edges of the screen. These container components are:

- Layouts
- ListView
- ScrollView
- WebView
- Repeater

Internally, the workflow is as follows:

1. Measure pass - all components are measured in the safe area portion of the screen.
2. Layout pass - all components are laid out in full screen, but are inset to the safe area boundaries.
3. Layout pass - if the component borders the safe area, it is adjusted and expanded to the edges of the screen.

::: tip
The above workflow can lead to containers being laid out with a bigger size than initially declared in the markup. You can prevent this behavior by setting the `iosOverflowSafeArea` property below to `false`.
:::

#### iosOverflowSafeArea Property

The above default behavior should provide good UX out of the box. Additionally, NativeScript 5.0 exposes a property `iosOverflowSafeArea` that can control how components handle the iOS `Safe Area`. Set this property value to `true` if you want the component to expand to the edges of the screen when it borders the safe area. Set it to `false` to explicitly prevent this behavior. The default value for container components is `true`. All other components are considered content that should be constrained to the safe area and default to `false`.

## Layout Containers

### AbsoluteLayout

The `<AbsoluteLayout>` container is the simplest layout container in NativeScript.

`<AbsoluteLayout>` has the following behavior:

- Uses a pair of absolute left/top coordinates to position its children.
- Doesn't enforce any layout constraints on its children.
- Doesn't resize its children at runtime when its size changes.

#### Example: a grid-like layout

The following example creates a simple grid. For more information about creating grid layouts, see [GridLayout](/ui-and-styling.html#gridlayout).

```html
<AbsoluteLayout backgroundColor="#3c495e">
  <label
    text="10,10"
    left="10"
    top="10"
    width="100"
    height="100"
    backgroundColor="#43b883"
  />
  <label
    text="120,10"
    left="120"
    top="10"
    width="100"
    height="100"
    backgroundColor="#43b883"
  />
  <label
    text="10,120"
    left="10"
    top="120"
    width="100"
    height="100"
    backgroundColor="#43b883"
  />
  <label
    text="120,120"
    left="120"
    top="120"
    width="100"
    height="100"
    backgroundColor="#43b883"
  />
</AbsoluteLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/absolute_layout_grid.svg" />

#### Example: Overlapping elements

The following example creates a group of overlapping items.

```html
<AbsoluteLayout backgroundColor="#3c495e">
  <label
    text="10,10"
    left="10"
    top="10"
    width="100"
    height="100"
    backgroundColor="#289062"
  />
  <label
    text="30,40"
    left="30"
    top="40"
    width="100"
    height="100"
    backgroundColor="#43b883"
  />
</AbsoluteLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/absolute_layout_overlap.svg" />

#### Props

| Name           | Type        | Description                                                                                                                                                    |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `N/A`          | `N/A`       | None.                                                                                                                                                          |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_layouts_absolute_layout_.html) |

<!-- TODO: fix links -->

#### Additional children props

When an element is a direct child of `<AbsoluteLayout>`, you can set the following additional properties.

| Name   | Type     | Description                                                                                               |
| ------ | -------- | --------------------------------------------------------------------------------------------------------- |
| `top`  | `Number` | Gets or sets the distance, in pixels, between the top edge of the child and the top edge of its parent.   |
| `left` | `Number` | Gets or sets the distance, in pixels, between the left edge of the child and the left edge of its parent. |

### DockLayout

`<DockLayout>` is a layout container that lets you dock child elements to the sides or the center of the layout.

`<DockLayout>` has the following behavior:

- Uses the `dock` property to dock its children to the `left`, `right`, `top`, `bottom` or center of the layout.<br/>To dock a child element to the center, it must be the **last child** of the container and you must set the `stretchLastChild` property of the parent to `true`.
- Enforces layout constraints to its children.
- Resizes its children at runtime when its size changes.

#### Example: Dock to every side without stretching the last child

The following example creates a frame-like layout consisting of 4 elements, position at the 4 edges of the screen.

```html
<DockLayout stretchLastChild="false" backgroundColor="#3c495e">
  <label text="left" dock="left" width="40" backgroundColor="#43b883" />
  <label text="top" dock="top" height="40" backgroundColor="#289062" />
  <label text="right" dock="right" width="40" backgroundColor="#43b883" />
  <label text="bottom" dock="bottom" height="40" backgroundColor="#289062" />
</DockLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/dock_layout_no_stretch.svg" />

#### Example: Dock to every side and stretch the last child

The following example shows how `stretchLastChild` affects the positioning of child elements in a `DockLayout` container. The last child (`bottom`) is stretched to take up all the remaining space after positioning the first three elements.

```html
<DockLayout stretchLastChild="true" backgroundColor="#3c495e">
  <label text="left" dock="left" width="40" backgroundColor="#43b883" />
  <label text="top" dock="top" height="40" backgroundColor="#289062" />
  <label text="right" dock="right" width="40" backgroundColor="#43b883" />
  <label text="bottom" dock="bottom" backgroundColor="#1c6b48" />
</DockLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/dock_layout_stretch.svg" />

#### Example: Dock to every side and the center

The following example creates a `<DockLayout>` of 5 elements. The first four wrap the center element in a frame.

```html
<DockLayout stretchLastChild="true" backgroundColor="#3c495e">
  <label text="left" dock="left" width="40" backgroundColor="#43b883" />
  <label text="top" dock="top" height="40" backgroundColor="#289062" />
  <label text="right" dock="right" width="40" backgroundColor="#43b883" />
  <label text="bottom" dock="bottom" height="40" backgroundColor="#289062" />
  <label text="center" backgroundColor="#1c6b48" />
</DockLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/dock_layout_all_sides_and_stretch.svg" />

#### Example: Dock multiple children to the same side

The following example creates a single line of 4 elements that stretch across the entire height and width of the screen.

```html
<DockLayout stretchLastChild="true" backgroundColor="#3c495e">
  <label text="left 1" dock="left" width="40" backgroundColor="#43b883" />
  <label text="left 2" dock="left" width="40" backgroundColor="#289062" />
  <label text="left 3" dock="left" width="40" backgroundColor="#1c6b48" />
  <label text="last child" backgroundColor="#43b883" />
</DockLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/dock_layout_multiple_on_same_side.svg" />

#### Props

| Name               | Type        | Description                                                                                                                                                |
| ------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stretchLastChild` | `Boolean`   | Enables or disables stretching the last child to fit the remaining space.                                                                                  |
| `...Inherited`     | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_layouts_dock_layout_.html) |

<!-- TODO: fix links -->

#### Additional children props

When an element is a direct child of `<DockLayout>`, you can set the following additional properties.

| Name   | Type     | Description                                                                                         |
| ------ | -------- | --------------------------------------------------------------------------------------------------- |
| `dock` | `String` | Specifies which side to dock the element to.<br/>Valid values: `top`, `right`, `bottom`, or `left`. |

### GridLayout

`<GridLayout>` is a layout container that lets you arrange its child elements in a table-like manner.

The grid consists of rows, columns, and cells. A cell can span one or more rows and one or more columns. It can contain multiple child elements which can span over multiple rows and columns, and even overlap each other.

By default, `<GridLayout>` has one column and one row. You can add columns and rows by configuring the `columns` and the `rows` properties. In these properties, you need to set the number of columns and rows and their width and height. You set the number of columns by listing their widths, separated by a comma. You set the number of rows by listing their heights, separated by a comma.

You can set a fixed size for column width and row height or you can create them in a responsive manner:

- **An absolute number:** Indicates a fixed size.
- **auto:** Makes the column as wide as its widest child or makes the row as tall as its tallest child.
- **\*:** Takes as much space as available after filling all auto and fixed size columns or rows.

See **Props** for more information.

#### Example: Grid layout with fixed sizing

The following example creates a simple 2-by-2 grid with fixed column widths and row heights.

```html
<GridLayout columns="115, 115" rows="115, 115">
  <label text="0,0" row="0" col="0" backgroundColor="#43b883" />
  <label text="0,1" row="0" col="1" backgroundColor="#1c6b48" />
  <label text="1,0" row="1" col="0" backgroundColor="#289062" />
  <label text="1,1" row="1" col="1" backgroundColor="#43b883" />
</GridLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/grid_layout.svg" />

#### Example: Grid layout with star sizing

The following example creates a grid with responsive design, where space is allotted proportionally to child elements.

```html
<GridLayout columns="*, 2*" rows="2*, 3*" backgroundColor="#3c495e">
  <label text="0,0" row="0" col="0" backgroundColor="#43b883" />
  <label text="0,1" row="0" col="1" backgroundColor="#1c6b48" />
  <label text="1,0" row="1" col="0" backgroundColor="#289062" />
  <label text="1,1" row="1" col="1" backgroundColor="#43b883" />
</GridLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/grid_layout_star_sizing.svg" />

#### Example: Grid layout with fixed and auto sizing

The following example create a grid with one auto-sized column and one column with fixed size. Rows have a fixed height.

```html
<GridLayout columns="80, auto" rows="80, 80" backgroundColor="#3c495e">
  <label text="0,0" row="0" col="0" backgroundColor="#43b883" />
  <label text="0,1" row="0" col="1" backgroundColor="#1c6b48" />
  <label text="1,0" row="1" col="0" backgroundColor="#289062" />
  <label text="1,1" row="1" col="1" backgroundColor="#43b883" />
</GridLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/grid_layout_fixed_auto.svg" />

#### Example: Grid layout with mixed sizing and merged cells

The following example creates a complex grid with responsive design, mixed width and height settings, and some merged cells.

```html
<GridLayout columns="40, auto, *" rows="40, auto, *" backgroundColor="#3c495e">
  <label text="0,0" row="0" col="0" backgroundColor="#43b883" />
  <label text="0,1" row="0" col="1" colSpan="2" backgroundColor="#1c6b48" />
  <label text="1,0" row="1" col="0" rowSpan="2" backgroundColor="#289062" />
  <label text="1,1" row="1" col="1" backgroundColor="#43b883" />
  <label text="1,2" row="1" col="2" backgroundColor="#289062" />
  <label text="2,1" row="2" col="1" backgroundColor="#1c6b48" />
  <label text="2,2" row="2" col="2" backgroundColor="#43b883" />
</GridLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/grid_layout_complex.svg" />

#### Props

| Name           | Type        | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns`      | `String`    | A string value representing column widths delimited with commas.<br/>Valid values: an absolute number, `auto`, or `*`.<br/>A number indicates an absolute column width. `auto` makes the column as wide as its widest child. `*` makes the column occupy all available horizontal space. The space is proportionally divided over all star-sized columns. You can set values such as `3*` and `5*` to indicate a ratio of 3:5 in sizes. |
| `rows`         | `String`    | A string value representing row heights delimited with commas.<br/>Valid values: an absolute number, `auto`, or `*`.<br/>A number indicates an absolute row height. `auto` makes the row as tall as its tallest child. `*` makes the row occupy all available vertical space. The space is proportionally divided over all star-sized rows. You can set values such as `3*` and `5*` to indicate a ratio of 3:5 in sizes.               |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_layouts_grid_layout_.html)                                                                                                                                                                                                                                                                              |

<!-- TODO: fix links -->

#### Additional children props

When an element is a direct child of `<GridLayout>`, you can work with the following additional properties.

| Name      | Type     | Description                                                                                                                                                    |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `row`     | `Number` | Specifies the row for this element. Combined with a `col` property, specifies the cell coordinates of the element.<br/>The first row is indicated by `0`.      |
| `col`     | `Number` | Specifies the column for the element. Combined with a `row` property, specifies the cell coordinates of the element.<br/>The first column is indicated by `0`. |
| `rowSpan` | `Number` | Specifies the number of rows which this element spans across.                                                                                                  |
| `colSpan` | `Number` | Specifies the number of columns which this element spans across.                                                                                               |

### StackLayout

`<StackLayout>` is a layout container that lets you stack the child elements vertically (default) or horizontally.

::: danger Important
Try not to nest too many `<StackLayout/>` in your markup. If you find yourself nesting a lot of `<StackLayout>`
you will likely get better performance by switching to a `<GridLayout>` or `<FlexboxLayout>`.
See [Layout Nesting](/common-pitfalls.html#layout-nesting) for more information.
:::

#### Example: Default stacking

The following example creates a vertical stack of 3 equally-sized elements. Items are stretched to cover the entire width of the screen. Items are placed in the order they were declared in.

```html
<StackLayout backgroundColor="#3c495e">
  <label text="first" height="70" backgroundColor="#43b883" />
  <label text="second" height="70" backgroundColor="#289062" />
  <label text="third" height="70" backgroundColor="#1c6b48" />
</StackLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/stack_layout_vertical.svg" />

#### Example: Horizontal stacking

The following example creates a horizontal stack of 3 equally-sized elements. Items are stretched to cover the entire height of the screen. Items are placed in the order they were declared in.

```html
<StackLayout orientation="horizontal" backgroundColor="#3c495e">
  <label text="first" width="70" backgroundColor="#43b883" />
  <label text="second" width="70" backgroundColor="#289062" />
  <label text="third" width="70" backgroundColor="#1c6b48" />
</StackLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/stack_layout_horizontal.svg" />

#### Example: Stack layout with horizontally aligned children

The following example creates a diagonal stack of items with responsive sizes. Items are vertically stacked.

```html
<StackLayout backgroundColor="#3c495e">
  <label
    text="left"
    horizontalAlignment="left"
    width="33%"
    height="70"
    backgroundColor="#43b883"
  />
  <label
    text="center"
    horizontalAlignment="center"
    width="33%"
    height="70"
    backgroundColor="#289062"
  />
  <label
    text="right"
    horizontalAlignment="right"
    width="33%"
    height="70"
    backgroundColor="#1c6b48"
  />
  <label
    text="stretch"
    horizontalAlignment="stretch"
    height="70"
    backgroundColor="#43b883"
  />
</StackLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/stack_layout_vertical_align_children.svg" />

#### Example: Horizontal stack layout with vertically aligned children

The following example creates a diagonal stack of items with responsive sizes. Items are horizontally stacked.

```html
<StackLayout orientation="horizontal" backgroundColor="#3c495e">
  <label
    text="top"
    verticalAlignment="top"
    width="70"
    height="33%"
    backgroundColor="#43b883"
  />
  <label
    text="center"
    verticalAlignment="center"
    width="70"
    height="33%"
    backgroundColor="#289062"
  />
  <label
    text="bottom"
    verticalAlignment="bottom"
    width="70"
    height="33%"
    backgroundColor="#1c6b48"
  />
  <label
    text="stretch"
    verticalAlignment="stretch"
    width="70"
    backgroundColor="#43b883"
  />
</StackLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/stack_layout_horizontal_align_children.svg" />

#### Props

| Name           | Type        | Description                                                                                                                                                 |
| -------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orientation`  | `String`    | Specifies the stacking direction.<br/>Valid values: `vertical` and `horizontal`.<br/>Default value: `vertical`.                                             |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_layouts_stack_layout_.html) |

<!-- TODO: fix links -->

#### Additional children props

None.

### RootLayout

`<RootLayout>` is a layout container designed to be used as the primary root layout container for your app with a built in api to easily control dynamic view layers. It extends a GridLayout so has all the features of a grid but enhanced with additional apis.

It's api can be observed here:

```ts
export class RootLayout extends GridLayout {
  open(view: View, options?: RootLayoutOptions): Promise<void>
  close(view: View, exitTo?: TransitionAnimation): Promise<void>
  bringToFront(view: View, animated?: boolean): Promise<void>
  closeAll(): Promise<void>
  getShadeCover(): View
}

export function getRootLayout(): RootLayout

export interface RootLayoutOptions {
  shadeCover?: ShadeCoverOptions
  animation?: {
    enterFrom?: TransitionAnimation
    exitTo?: TransitionAnimation
  }
}

export interface ShadeCoverOptions {
  opacity?: number
  color?: string
  tapToClose?: boolean
  animation?: {
    enterFrom?: TransitionAnimation // only applied if first one to be opened
    exitTo?: TransitionAnimation // only applied if last one to be closed
  }
  ignoreShadeRestore?: boolean
}

export interface TransitionAnimation {
  translateX?: number
  translateY?: number
  scaleX?: number
  scaleY?: number
  rotate?: number // in degrees
  opacity?: number
  duration?: number // in milliseconds
  curve?: any // CoreTypes.AnimationCurve (string, cubicBezier, etc.)
}
```

You can use `getRootLayout()` to get a reference to the root layout in your app from anywhere.

#### Example: RootLayout setup

Sample layout:

```html
<RootLayout height="100%" width="100%">
  <GridLayout height="100%">
    <label
      verticalAlignment="center"
      textAlignment="center"
      text="MAIN CONTENT AREA"
    ></label>
  </GridLayout>
</RootLayout>
```

Sample api usage:

```ts
// Open a dynamic popup
const view = this.getPopup('#EA5936', 110, -30)
getRootLayout()
  .open(view, {
    shadeCover: {
      color: '#000',
      opacity: 0.7,
      tapToClose: true
    },
    animation: {
      enterFrom: {
        opacity: 0,
        translateY: 500,
        duration: 500
      },
      exitTo: {
        opacity: 0,
        duration: 300
      }
    }
  })
  .catch(ex => console.error(ex))

// Close the dynamic popup
getRootLayout()
  .close(view, {
    opacity: 0,
    translate: { x: 0, y: -500 }
  })
  .catch(ex => console.error(ex))

function getPopup(color: string, size: number, offset: number): View {
  const layout = new StackLayout()
  layout.height = size
  layout.width = size
  layout.marginTop = offset
  layout.marginLeft = offset
  layout.backgroundColor = color
  layout.borderRadius = 10
  return layout
}
```

You can play with [the toolbox app here](https://github.com/NativeScript/NativeScript/tree/master/apps/toolbox/src/pages/root-layout.ts)

You can also find a more [thorough example in this sample repo](https://github.com/williamjuan027/nativescript-rootlayout-demo)

### WrapLayout

`<WrapLayout>` is a layout container that lets you position items in rows or columns, based on the `orientation` property. When the space is filled, the container automatically wraps items onto a new row or column.

#### Example: Default wrap layout

The following example creates a row of equally-sized items. When the row runs out of space, the container wraps the last item to a new row.

```html
<WrapLayout backgroundColor="#3c495e">
  <label text="first" width="30%" height="30%" backgroundColor="#43b883" />
  <label text="second" width="30%" height="30%" backgroundColor="#1c6b48" />
  <label text="third" width="30%" height="30%" backgroundColor="#289062" />
  <label text="fourth" width="30%" height="30%" backgroundColor="#289062" />
</WrapLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/wrap_layout_horizontal.svg" />

#### Example: Vertical wrap layout

The following example creates a column of equally-sized items. When the row runs out of space, the container wraps the last item to a new column.

```html
<WrapLayout orientation="vertical" backgroundColor="#3c495e">
  <label text="first" width="30%" height="30%" backgroundColor="#43b883" />
  <label text="second" width="30%" height="30%" backgroundColor="#1c6b48" />
  <label text="third" width="30%" height="30%" backgroundColor="#289062" />
  <label text="fourth" width="30%" height="30%" backgroundColor="#289062" />
</WrapLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/wrap_layout_vertical.svg" />

#### Props

| Name           | Type        | Description                                                                                                                                                            |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orientation`  | `String`    | Specifies the stacking direction.<br/>Valid values: `horizontal` (arranges items in rows) and `vertical` (arranges items in columns).<br/>Default value: `horizontal`. |
| `itemWidth`    | `Number`    | Sets the width used to measure and layout each child.<br/>Default value: `Number.NaN`, which does not restrict children.                                               |
| `itemHeight`   | `Number`    | Sets the height used to measure and layout each child.<br/>Default value is `Number.NaN`, which does not restrict children.                                            |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_layouts_wrap_layout_.html)             |

<!-- TODO: fix links -->

#### Additional children props

None.

### FlexboxLayout

`<FlexboxLayout>` is a layout container that provides a non-exact implementation of the [CSS Flexbox layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). This layout lets you arrange child components both horizontally and vertically.

#### Example: Default flex layout

The following example creates a row of three equally-sized elements that span across the entire height of the screen.

```html
<FlexboxLayout backgroundColor="#3c495e">
  <label text="first" width="70" backgroundColor="#43b883" />
  <label text="second" width="70" backgroundColor="#1c6b48" />
  <label text="third" width="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_row_stretch.svg" />

#### Example: Column flex layout

The following example creates a column of three equally-sized elements that span across the entire width of the screen.

```html
<FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
  <label text="first" height="70" backgroundColor="#43b883" />
  <label text="second" height="70" backgroundColor="#1c6b48" />
  <label text="third" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_column_stretch.svg" />

#### Example: Row flex layout with items aligned to `flex-start`

The following example creates a row of three items placed at the top of the screen. Items are placed in the order they were declared in.

```html
<FlexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
  <label text="first" width="70" height="70" backgroundColor="#43b883" />
  <label text="second" width="70" height="70" backgroundColor="#1c6b48" />
  <label text="third" width="70" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_row_flex-start.svg" />

#### Example: Row flex layout with custom order

The following example creates a row of three items placed at the top of the screen. Items are placed in a customized order.

```html
<FlexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
  <label text="first" order="2" width="70" height="70" backgroundColor="#43b883" />
  <label text="second" order="3" width="70" height="70" backgroundColor="#1c6b48" />
  <label text="third" order="1" width="70" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_row_custom_order.svg" />

#### Example: Row flex layout with wrapping

The following example creates four items with enabled line wrapping. When the row runs out of space, the container wraps the last item on a new line.

```html
<FlexboxLayout flexWrap="wrap" backgroundColor="#3c495e">
  <label text="first" width="30%" backgroundColor="#43b883" />
  <label text="second" width="30%" backgroundColor="#1c6b48" />
  <label text="third" width="30%" backgroundColor="#289062" />
  <label text="fourth" width="30%" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_wrap.svg" />

#### Example: Column flex layout with reverse order and items with a different `alignSelf`

The following example shows how to use:

- `flexDirection` to place items in a column, starting from the bottom.
- `justifyContent` to create equal spacing between the vertically placed items.
- `alignSelf` to modify the position of items across the main axis.

```html
<FlexboxLayout
  flexDirection="column-reverse"
  justifyContent="space-around"
  backgroundColor="#3c495e"
>
  <label text="first" height="70" backgroundColor="#43b883" />
  <label
    text="second"
    alignSelf="center"
    width="70"
    height="70"
    backgroundColor="#1c6b48"
  />
  <label
    text="third\nflex-end"
    alignSelf="flex-end"
    width="70"
    height="70"
    backgroundColor="#289062"
  />
  <label text="fourth" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_column_reverse_space_around_align_self.svg" />

#### Props

| Name             | Type        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `flexDirection`  | `String`    | Sets the direction for placing child elements in the flexbox container.<br/>Valid values:<br/>`row` (horizontal, left to right),<br/>`row-reverse` (horizontal, right to left),<br/>`column` (vertical, top to bottom), and<br/>`column-reverse` (vertical, bottom to top).<br/>Default value: `row`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `flexWrap`       | `String`    | Sets whether child elements are forced in a single line or can flow into multiple lines. If set to multiple lines, also defines the cross axis which determines the direction new lines are stacked in.<br/>Valid values:<br/>`nowrap` (single line which may cause the container to overflow),<br/>`wrap` (multiple lines, direction is defined by `flexDirection`),and<br/>`wrap-reverse` (multiple lines, opposite to the direction defined by `flexDirection`).<br/>Default value: `nowrap`.                                                                                                                                                                                                                                                                               |
| `justifyContent` | `String`    | Sets the alignment of child elements along the main axis. You can use it to distribute leftover space when all the child elements on a line are inflexible or are flexible but have reached their maximum size. You can also use it to control the alignment of items when they overflow the line.<br/>Valid values:<br/>`flex-start` (items are packed toward the start line),<br/>`flex-end` (items are packed toward the end line),<br/>`center` (items are centered along the line),<br/>`space-between` (items are evenly distributed on the line; first item is on the start line, last item on the end line), and<br/>`space-around` (items are evenly distributed on the line with equal space around them).<br/>Default value: `flex-start`.                          |
| `alignItems`     | `String`    | (Android-only) Sets the alignment of child elements along the cross axis on the current line. Acts as `justifyContent` for the cross axis.<br/>Valid values:<br/>`flex-start` (cross-start margin edge of the items is placed on the cross-start line),<br/>`flex-end` (cross-end margin edge of the items is placed on the cross-end line),<br/>`center` (items are centered оn the cross axis),<br/>`baseline` (the item baselines are aligned), and<br/>`stretch` (items are stretched to fill the container but respect `min-width` and `max-width`).<br/>Default value: `stretch`.                                                                                                                                                                                        |
| `alignContent`   | `String`    | Sets how lines are aligned in the flex container on the cross axis, similar to how `justifyContent` aligns individual items within the main axis.<br/> This property has no effect when the flex container has only one line.<br/>Valid values:<br/>`flex-start` (lines are packed to the start of the container),<br/>`flex-end` (lines are packed to the end of the container),<br/>`center` (lines are packed to the center of the container),<br/>`space-between` (lines are evenly distributed; the first line is at the start of the container while the last one is at the end),<br/>`space-around` (lines are evenly distributed with equal space between them), and<br/>`stretch` (lines are stretched to take up the remaining space).<br/>Default value: `stretch`. |
| `...Inherited`   | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_layouts_flexbox_layout_.html)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

<!-- TODO: fix links -->

#### Additional children props

When an element is a direct child of `<FlexboxLayout>`, you can work with the following additional properties.

| Name             | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `order`          | `Number`  | Sets the order in which child element appear in relation to one another.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `flexGrow`       | `Number`  | Indicates that the child should grow in size, if necessary. Sets how much the child will grow in proportion to the rest of the child elements in the flex container.                                                                                                                                                                                                                                                                                                                                    |
| `flexShrink`     | `Number`  | Indicates that the child should shrink when the row runs out of space. Sets how much the flex item will shrink in proportion to the rest of the child elements in the flex container. When not specified, its value is set to `1`.                                                                                                                                                                                                                                                                      |
| `alignSelf`      | `String`  | (Android-only) Overrides the `alignItems` value for the child.<br/>Valid values:<br/>`flex-start` (cross-start margin edge of the item is placed on the cross-start line),<br/>`flex-end` (cross-end margin edge of the item is placed on the cross-end line),<br/>`center` (item is centered on the cross axis),<br/>`baseline` (the item baselines are aligned), and<br/>`stretch` (items is stretched to fill the container but respects `min-width` and `max-width`).<br/>Default value: `stretch`. |
| `flexWrapBefore` | `Boolean` | When `true`, forces the item to wrap onto a new line. This property is not part of the official Flexbox specification.<br/>Default value: `false`.                                                                                                                                                                                                                                                                                                                                                      |

## Components

### ActionBar

The ActionBar is NativeScript’s abstraction over the Android [ActionBar](https://developer.android.com/training/appbar/) and iOS [NavigationBar](https://developer.apple.com/design/human-interface-guidelines/ios/bars/navigation-bars/). It represents a toolbar at the top of the activity window, and can have a title, application-level navigation, as well as other custom interactive items.

---

#### Example: Simple ActionBar with title

/// flavor vue

```html
<ActionBar title="ActionBar Title" />
```

///

/// flavor svelte

```html
<actionBar title="ActionBar Title" />
```

///

/// flavor plain

```html
<ActionBar title="ActionBar Title" />
```

///

/// flavor angular

```html
<ActionBar title="ActionBar Title"> </ActionBar>
```

///

/// flavor react

```html
<actionBar title="ActionBar Title" />
```

///

<!-- -->

#### Example: ActionBar with custom title view

/// flavor react

```tsx
<actionBar>
  <stackLayout nodeRole="titleView" orientation="horizontal">
    <image src="res://icon" width={40} height={40} verticalAlignment="center" />
    <label text="NativeScript" fontSize={24} verticalAlignment="center" />
  </stackLayout>
</actionBar>
```

///

/// flavor vue

```html
<ActionBar>
  <StackLayout orientation="horizontal">
    <image src="res://icon" width="40" height="40" verticalAlignment="center" />
    <label text="ActionBar Title" fontSize="24" verticalAlignment="center" />
  </StackLayout>
</ActionBar>
```

///

/// flavor plain

```xml
<ActionBar>
  <StackLayout orientation="horizontal">
    <Image src="res://icon" width="40" height="40" verticalAlignment="center" />
    <Label text="ActionBar Title" fontSize="24" verticalAlignment="center" />
  </StackLayout>
</ActionBar>
```

///

/// flavor angular

```html
<ActionBar>
  <StackLayout orientation="horizontal">
    <image src="res://icon" width="40" height="40" verticalAlignment="center"></image>
    <label text="ActionBar Title" fontSize="24" verticalAlignment="center"></label>
  </StackLayout>
</ActionBar>
```

///

/// flavor svelte

```html
<actionBar>
  <stackLayout orientation="horizontal">
    <image src="res://icon" width="40" height="40" verticalAlignment="center" />
    <label text="ActionBar Title" fontSize="24" verticalAlignment="center" />
  </stackLayout>
</actionBar>
```

///

#### Example: ActionBar with ActionItem

The `<ActionItem>` components are supporting the platform-specific position and systemIcon for iOS and Android.

- Android sets position via `android.position`:

  - `actionBar`: Puts the item in the ActionBar. Action item can be rendered both as text or icon.
  - `popup`: Puts the item in the options menu. Items will be rendered as text.
  - `actionBarIfRoom`: Puts the item in the ActionBar if there is room for it. Otherwise, puts it in the options menu.

- iOS sets position via ios.position:

  - `left`: Puts the item on the left side of the ActionBar.
  - `right`: Puts the item on the right side of the ActionBar.

/// flavor svelte

```html
<actionBar title="ActionBar Title">
  <actionItem
    on:tap="{onTapShare}"
    ios.systemIcon="9"
    ios.position="left"
    android.systemIcon="ic_menu_share"
    android.position="actionBar"
  />
  <actionItem
    on:tap="{onTapDelete}"
    ios.systemIcon="16"
    ios.position="right"
    text="delete"
    android.position="popup"
  />
</actionBar>
```

///

/// flavor vue

```html
<ActionBar title="ActionBar Title">
  <ActionItem
    @tap="onTapShare"
    ios.systemIcon="9"
    ios.position="left"
    android.systemIcon="ic_menu_share"
    android.position="actionBar"
  />
  <ActionItem
    @tap="onTapDelete"
    ios.systemIcon="16"
    ios.position="right"
    text="delete"
    android.position="popup"
  />
</ActionBar>
```

///

/// flavor react

```tsx
<actionBar title="ActionBar Title">
  <actionItem
    nodeRole="actionItems"
    onTap={onTapShare}
    ios={{
      systemIcon: 9,
      position: 'left' as const
    }}
    android={{
      systemIcon: 'ic_menu_share' as const,
      position: 'actionBar' as const
    }}
  />
  <actionItem
    nodeRole="actionItems"
    onTap={onTapDelete}
    ios={{
      systemIcon: 16,
      position: 'right' as const
    }}
    android={{
      position: 'popup' as const
    }}
    text="delete"
  />
</actionBar>
```

///

/// flavor plain

```html
<ActionBar title="ActionBar Title">
  <ActionItem
    tap="onShare()"
    ios.systemIcon="9"
    ios.position="left"
    android.systemIcon="ic_menu_share"
    android.position="actionBar"
  >
  </ActionItem>
  <ActionItem
    text="delete"
    tap="onDelete()"
    ios.systemIcon="16"
    ios.position="right"
    android.position="popup"
  >
  </ActionItem>
</ActionBar>
```

///

/// flavor angular

```html
<ActionBar title="ActionBar Title">
  <ActionItem
    (tap)="onShare()"
    ios.systemIcon="9"
    ios.position="left"
    android.systemIcon="ic_menu_share"
    android.position="actionBar"
  >
  </ActionItem>
  <ActionItem
    text="delete"
    (tap)="onDelete()"
    ios.systemIcon="16"
    ios.position="right"
    android.position="popup"
  >
  </ActionItem>
</ActionBar>
```

///

#### Example: ActionBar with NavigationButton

`<NavigationButton>` is a UI component that provides an abstraction for the Android navigation button and the iOS back button.

/// flavor vue

```html
<ActionBar title="ActionBar Title">
  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
</ActionBar>
```

///

/// flavor react

```tsx
<actionBar title="ActionBar Title">
  <navigationButton
    nodeRole="navigationButton"
    text="Go back"
    android={{
      position: undefined,
      systemIcon: 'ic_menu_back'
    }}
    onTap={goBack}
  />
</actionBar>
```

///

/// flavor svelte

```html
<actionBar title="ActionBar Title">
  <navigationButton text="Go back" android.systemIcon="ic_menu_back" on:tap="{goBack}" />
</actionBar>
```

///

/// flavor plain

```html
<ActionBar title="ActionBar Title">
  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" tap="goBack" />
</ActionBar>
```

///

/// flavor angular

```html
<ActionBar title="ActionBar Title">
  <NavigationButton
    text="Go back"
    android.systemIcon="ic_menu_back"
    (tap)="goBack()"
  ></NavigationButton>
</ActionBar>
```

///

:::tip Platform specific behavior

**iOS Specific**

On iOS the default text of the navigation button is the title of the previous page and the back button is used explicitly for navigation.
It navigates to the previous page and does not allow overriding this behavior.
If you need to place a custom button on the left side of the `<ActionBar>` (e.g., to show a Drawer button), you can use an `<ActionItem>` with `ios.position="left"`.

**Android Specific**

On Android, you can't add text inside the navigation button.
You can use the icon property to set an image (e.g., `~/images/nav-image.png` or `res:\\ic_nav`).
You can use `android.systemIcon` to set one of the system icons available in Android.
In this case, there is no default behaviour for NavigationButton tap event, and we should set the callback function, which will be executed.
:::

#### Example: Setting an app icon for Android in ActionBar

/// flavor vue

```html
<ActionBar
  title="ActionBar Title"
  android.icon="res://icon"
  android.iconVisibility="always"
/>
```

///

/// flavor svelte

```html
<actionBar
  title="ActionBar Title"
  android.icon="res://icon"
  android.iconVisibility="always"
/>
```

///

/// flavor react

```tsx
<actionBar
  title="ActionBar Title"
  android={{ icon: 'res://icon', iconVisibility: 'always' }}
/>
```

///

/// flavor plain

```html
<ActionBar
  title="ActionBar Title"
  android.icon="res://icon"
  android.iconVisibility="always"
/>
```

///

/// flavor angular

```html
<ActionBar
  title="ActionBar Title"
  android.icon="res://icon"
  android.iconVisibility="always"
>
</ActionBar>
```

///

#### Example: Removing the border from ActionBar

By default, a border is drawn at the bottom of the `<ActionBar>`. In addition to the border, on iOS devices a translucency filter is also applied over the `<ActionBar>`.

To remove this styling from your app, you can set the `flat` property to `true`.

/// flavor vue

```html
<ActionBar title="ActionBar Title" flat="true" />
```

///

/// flavor svelte

```html
<actionBar title="ActionBar Title" flat="true" />
```

///

/// flavor react

```tsx
<actionBar title="ActionBar Title" flat={true} />
```

///

/// flavor plain

```html
<ActionBar title="ActionBar Title" flat="true" />
```

///

/// flavor angular

```html
<ActionBar title="ActionBar Title" flat="true"> </ActionBar>
```

///

#### Example: Styling ActionBar

To style the `<ActionBar>`, you can use only `background-color` and `color` properties. Alternatively, you can use `@nativescript/theme` and use the default styles for each different theme. The icon property of `ActionItem` can use Icon Fonts with the `font://` prefix. By setting up this prefix, a new image will be generated, which will be set as an `<ActionItem>`'s icon resource. While using this functionality, we need to specify the font-size, which will calculate the size of the generated image base on the device's dpi.

/// flavor angular

```html
<!-- The default background-color and color of ActionBar & ActionItem are set through nativescript-theme (if used)-->
<ActionBar title="ActionBar Title">
  <!-- Explicitly hiding the NavigationBar to prevent the default one on iOS-->
  <NavigationButton visibility="collapsed"></NavigationButton>

  <!-- Using the icon property and Icon Fonts -->
  <ActionItem
    position="left"
    icon="font://&#xf0a8;"
    class="fas"
    (tap)="goBack()"
  ></ActionItem>

  <!-- Creating custom views for ActionItem-->
  <ActionItem ios.position="right">
    <GridLayout width="100">
      <button text="Theme" class="-primary -rounded-lg"></button>
    </GridLayout>
  </ActionItem>
</ActionBar>
```

///

/// flavor plain

```html
<!-- The default background-color and color of ActionBar & ActionItem are set through nativescript-theme (if used)-->
<ActionBar title="ActionBar Title">
  <!-- Explicitly hiding the NavigationBar to prevent the default one on iOS-->
  <NavigationButton visibility="collapsed" />

  <!-- Using the icon property and Icon Fonts -->
  <ActionItem position="left" icon="font://&#xf0a8;" class="fas" tap="goBack" />

  <!-- Creating custom views for ActionItem-->
  <ActionItem ios.position="right">
    <GridLayout width="100">
      <button text="Theme" class="-primary -rounded-lg" />
    </GridLayout>
  </ActionItem>
</ActionBar>
```

///

:::warning Note
In iOS, the color property affects the color of the title and the action items. In Android, the color property affects only the title text. However, you can set the default color of the text in the action items by adding an `actionMenuTextColor` item in the Android theme (inside `App_Resources\Android\values\styles.xml`).
:::

#### Properties

#### ActionBar Properties

| Name        | Type                                                                            | Description                                                                          |
| :---------- | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| `title`     | `string`                                                                        | Gets or sets the action bar title.                                                   |
| `titleView` | [View](https://docs.nativescript.org/api-reference/classes/_ui_core_view_.view) | Gets or sets the title view. When set - replaces the title with a custom view.       |
| `flat`      | `boolean`                                                                       | Removes the border on Android and the translucency on iOS. Default value is `false`. |

<!-- TODO: fix links -->

#### ActionItem Properties

| Name                 | Type                                                  | Description                                                                                                                                                           |
| :------------------- | :---------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`               | `string`                                              | Gets or sets the text of the action item.                                                                                                                             |
| `icon`               | `string`                                              | Gets or sets the icon of the action item. Supports local images (`~/`), resources (`res://`) and icon fonts (`fonts://`)                                              |
| `ios.position`       | `enum`: _"left"_, _"right"_                           | Sets the position of the item (default value is `left`).                                                                                                              |
| `android.position`   | `enum`: _"actionBar"_, _"popup"_, _"actionBarIfRoom"_ | Sets the position of the item (default value is `actionBar`).                                                                                                         |
| `ios.systemIcon`     | `number`                                              | **iOS only** Sets the icon of the action item while using [UIBarButtonSystemIcon](https://developer.apple.com/documentation/uikit/uibarbuttonsystemitem) enumeration. |
| `android.systemIcon` | `string`                                              | **Android only** Sets a path to a resource icon ( see the [list of Android system drawables](https://developer.android.com/reference/android/R.drawable))             |

#### NavigationButton Properties

| Name   | Type     | Description                               |
| :----- | :------- | :---------------------------------------- |
| `text` | `string` | Gets or sets the text of the action item. |
| `icon` | `string` | Gets or sets the icon of the action item. |

#### Events

| Name            | Description                                                                |
| :-------------- | :------------------------------------------------------------------------- |
| `loaded`        | Emitted when the view is loaded.                                           |
| `unloaded`      | Emitted when the view is unloaded.                                         |
| `layoutChanged` | Emitted when the layout bounds of a view changes due to layout processing. |

#### API References

| Name                                                                                                     | Type     |
| :------------------------------------------------------------------------------------------------------- | :------- |
| [ActionBar](https://docs.nativescript.org/api-reference/modules/_ui_action_bar_)                         | `Module` |
| [ActionBar](https://docs.nativescript.org/api-reference/classes/_ui_action_bar_.actionbar)               | `Class`  |
| [ActionItem](https://docs.nativescript.org/api-reference/classes/_ui_action_bar_.actionitem)             | `Class`  |
| [ActionItems](https://docs.nativescript.org/api-reference/classes/_ui_action_bar_.actionitems)           | `Class`  |
| [NavigationButton](https://docs.nativescript.org/api-reference/classes/_ui_action_bar_.navigationbutton) | `Class`  |

<!-- TODO: fix links -->

#### Native Component

| Android                                                                                       | iOS                                                                                           |
| :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| [android.widget.Toolbar](https://developer.android.com/reference/android/widget/Toolbar.html) | [UIView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/) |

#### See Also

[Detailed documentation article about `ActionBar` functionalities.](https://docs.nativescript.org/angular/ui/action-bar)

<!-- TODO: fix links -->

### Activity-Indicator

`<ActivityIndicator>` is a UI component that shows a progress indicator signaling to the user of an operation running in the background.

---

/// flavor plain

```xml
<ActivityIndicator
  busy="{{ isBusy }}"
  busyChange="{{ onBusyChanged }}"
  loaded="indicatorLoaded"
/>
```

```ts
import { ActivityIndicator } from '@nativescript/core'

onBusyChanged(args: EventData) {
  const indicator: ActivityIndicator = args.object
  console.log(`indicator.busy changed to: ${indicator.busy}`)
}
```

///

/// flavor angular

```html
<ActivityIndicator [busy]="isBusy" (busyChange)="onBusyChanged($event)">
</ActivityIndicator>
```

```ts
import { ActivityIndicator } from '@nativescript/core'

onBusyChanged(args: EventData) {
  const indicator: ActivityIndicator = args.object
  console.log(`indicator.busy changed to: ${indicator.busy}`)
}
```

///

/// flavor vue

```html
<ActivityIndicator busy="true" @busyChange="onBusyChanged" />
```

```js
export default {
  methods: {
    onBusyChanged(args) {
      const indicator = args.object // ActivityIndicator
      console.log(`indicator.busy changed to: ${indicator.busy}`)
    }
  }
}
```

///

/// flavor react

```tsx
<activityIndicator busy={true} />
```

///

/// flavor svelte

```html
<activityIndicator busy="{true}" on:busyChange="{onBusyChanged}" />
```

```js
export default {
  methods: {
    onBusyChanged(args) {
      const indicator = args.object // ActivityIndicator
      console.log(`indicator.busy changed to: ${indicator.busy}`)
    }
  }
}
```

///

#### Props

| Name           | Type        | Description                                                                                                                                         |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `busy`         | `Boolean`   | Gets or sets whether the indicator is active. When `true`, the indicator is active.                                                                 |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_activity_indicator_) |

#### Events

| Name         | Description                                  |
| ------------ | -------------------------------------------- |
| `busyChange` | Emitted when the `busy` property is changed. |

#### Native component

| Android                                                                                                                        | iOS                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| [`android.widget.ProgressBar` (indeterminate = true)](https://developer.android.com/reference/android/widget/ProgressBar.html) | [`UIActivityIndicatorView`](https://developer.apple.com/documentation/uikit/uiactivityindicatorview) |

### Button

`<Button>` is a UI component that displays a button which reacts to a user gesture.

For more information about the available gestures, see [Gestures in the documentation](/interaction.html#gestures).

---

/// flavor plain

```xml
<Button text="Tap me!" tap="onTap" />
```

```ts
import { Button } from '@nativescript/core'

export function onTap(args) {
  const button = args.object as Button
  // execute your custom logic here...
}
```

///

/// flavor angular

```html
<button text="Tap me!" (tap)="onTap($event)"></button>
```

```ts
import { Button, EventData } from '@nativescript/core'

onTap(args: EventData) {
    const button = args.object as Button
    // execute your custom logic here...
}
```

///

/// flavor vue

```html
<button text="Button" @tap="onButtonTap" />
```

///

/// flavor svelte

```html
<button text="Button" on:tap="{onButtonTap}" />
```

///

/// flavor react

```tsx
import { EventData } from '@nativescript/core'
;<button
  text="Button"
  onTap={(args: EventData) => {
    const button = args.object
  }}
/>
```

///

#### Props

| Name           | Type        | Description                                                                                                                              |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `text`         | `String`    | Sets the label of the button.                                                                                                            |
| `textWrap`     | `Boolean`   | Gets or sets whether the widget wraps the text of the label. Useful for longer labels. Default value is `false`.                         |
| `isEnabled `   | `Boolean`   | Make the button disabled or enabled. A disabled button is unusable and un-clickable. Default value is `true`.                            |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_button_) |

<!-- TODO: fix links -->

#### Events

| Name  | Description                        |
| ----- | ---------------------------------- |
| `tap` | Emitted when the button is tapped. |

#### Styling the button

If you need to style parts of the text, you can use a combination of a `FormattedString` and `Span` elements.

```html
<button>
  <FormattedString>
    <span text="This text has a " />
    <span text="red " style="color: red" />
    <span text="piece of text. " />
    <span text="Also, this bit is italic, " fontStyle="italic" />
    <span text="and this bit is bold." fontWeight="bold" />
  </FormattedString>
</button>
```

#### Native component

| Android                                                                                       | iOS                                                                    |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`android.widget.Button`](https://developer.android.com/reference/android/widget/Button.html) | [`UIButton`](https://developer.apple.com/documentation/uikit/uibutton) |

### Date Picker

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

`<DatePicker>` provides two-way data binding using `bind`.

```html
<datePicker bind:date="{selectedDate}" />
```

///

#### Props

| Name           | Type        | Description                                                                                                                                   |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `date`         | `Date`      | Gets or sets the complete date.                                                                                                               |
| `minDate`      | `Date`      | Gets or sets the earliest possible date to select.                                                                                            |
| `maxDate`      | `Date`      | Gets or sets the latest possible date to select.                                                                                              |
| `day`          | `Number`    | Gets or sets the day.                                                                                                                         |
| `month`        | `Number`    | Gets or sets the month.                                                                                                                       |
| `year`         | `Number`    | Gets or sets the year.                                                                                                                        |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_date_picker_) |

<!-- TODO: fix links -->

#### Events

| Name         | Description                             |
| ------------ | --------------------------------------- |
| `dateChange` | Emitted when the selected date changes. |

#### Native component

| Android                                                                                               | iOS                                                                            |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.widget.DatePicker`](https://developer.android.com/reference/android/widget/DatePicker.html) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker) |

### Frame

`<Frame>` is a UI component used to display [`<Page>`](/ui-and-styling.html#page) elements. Every app needs at least a single `<Frame>` element, usually set as the root element.

---

#### A single root Frame

/// flavor

```js
new Vue({
  render: h => h('Frame', [h(HomePageComponent)])
})
```

///

#### Multiple Frames

If you need to create multiple frames, you can do so by wrapping them in a Layout, for example if you want to have 2 frames side-by-side

/// flavor vue

```html
<GridLayout columns="*, *">
  <frame col="0" />
  <frame col="1" />
</GridLayout>
```

///

/// flavor react

```tsx
<gridLayout columns={'* *'} rows={[]}>
  <frame col={0} />
  <frame col={1} />
</gridLayout>
```

///

/// flavor svelte

```html
<gridLayout columns="*, *">
  <frame col="0" />
  <frame col="1" />
</gridLayout>
```

///

#### Example: A frame with a default page

/// flavor vue

```html
<frame>
  <Page>
    <ActionBar title="Default Page Title" />
    <GridLayout>
      <label text="Default Page Content" />
    </GridLayout>
  </Page>
</frame>
```

///

/// flavor react

```tsx
<frame>
  <page>
    <actionBar title="Default Page Title" />
    <gridLayout>
      <label text="Default Page Content" />
    </gridLayout>
  </page>
</frame>
```

///

/// flavor svelte

```html
<frame>
  <page>
    <actionBar title="Default Page Title" />
    <gridLayout>
      <label text="Default Page Content" />
    </gridLayout>
  </page>
</frame>
```

///

#### Example: A frame with a default page from an external component

/// flavor vue

```html
<frame>
  <Page>
    <Home />
  </Page>
</frame>
```

```js
import Home from './Home'

export default {
  components: {
    Home
  }
}
```

///

/// flavor svelte

```html
<frame>
  <Home />
</frame>
```

```js
import Home from './Home.svelte'
```

///

/// flavor react

```tsx
import HomePage from './HomePage'

function AppContainer() {
  return (
    <frame>
      <HomePage />
    </frame>
  )
}
```

///

#### Native component

| Android                                                                                                                                                                                                | iOS                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| [`org.nativescript.widgets.ContentLayout`](https://github.com/NativeScript/NativeScript/blob/master/packages/ui-mobile-base/android/widgets/src/main/java/org/nativescript/widgets/ContentLayout.java) | [`UINavigationController`](https://developer.apple.com/documentation/uikit/uinavigationcontroller) |

### HtmlView

`<HtmlView>` is a UI component that lets you show static HTML content.

See also: [WebView](#webview).

---

/// flavor plain

```xml
<HtmlView loaded="onHtmlLoaded" />
```

```ts
import { HtmlView } from '@nativescript/core'

export function onHtmlLoaded(args) {
  const myHtmlView = args.object as HtmlView
  myHtmlView.html = `<span>
        <h1><font color=\"blue\">NativeScript HtmlView</font></h1></br>
        <h3>This component accept simple HTML strings</h3></span>`
}
```

///

/// flavor angular

```html
<HtmlView [html]="htmlString"></HtmlView>
```

```ts
import { Component } from '@angular/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class HtmlViewUsageComponent {
  htmlString: string

  constructor() {
    this.htmlString = `<span>
                          <h1>HtmlView demo in <font color="blue">NativeScript</font> App</h1>
                        </span>`
  }
}
```

///

/// flavor vue

```html
<HtmlView html="<div><h1>HtmlView</h1></div>" />
```

///

/// flavor react

```tsx
<htmlView html="<div><h1>HtmlView</h1></div>" />
```

///

/// flavor svelte

```html
<htmlView html="<div><h1>HtmlView</h1></div>" />
```

///

#### Props

| Name           | Type        | Description                                                                                                                                 |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `html`         | `String`    | The HTML content to be shown.                                                                                                               |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_html_view_) |

<!-- TODO: fix links -->

#### Native component

| Android                                                                                           | iOS                                                                        |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview) |

### Image

`<Image>` is a UI component that shows an image from an [ImageSource](https://docs.nativescript.org/api-reference/modules/_image_source_) or from a URL.

<!-- TODO: fix links -->

::: tip Tip
When working with images following [the best practices](/performance.html#image-optimizations) is a must.
:::

---

#### Example: Displaying an image from `App_Resources`

/// flavor plain

```xml
<Image src="res://icon" stretch="aspectFill" />
```

///

/// flavor angular

```html
<image src="res://icon" stretch="aspectFill"> </image>
```

///

/// flavor react

```tsx
<image src="res://icon" stretch="aspectFill" />
```

///

/// flavor vue

```html
<image src="res://icon" stretch="aspectFill" />
```

///

/// flavor svelte

```html
<image src="res://icon" stretch="aspectFill" />
```

///

#### Example: Displaying an image relative to the `app` directory

/// flavor plain

```xml
<Image src="~/logo.png" stretch="aspectFill" />
```

///

/// flavor angular

```html
<image src="~/logo.png" stretch="aspectFill"></image>
```

///

/// flavor react

```tsx
<image src="~/logo.png" stretch="aspectFill" />
```

///

/// flavor vue

```html
<image src="~/logo.png" stretch="aspectFill" />
```

///

/// flavor svelte

```html
<image src="~/logo.png" stretch="aspectFill" />
```

///

#### Example: Displaying an image from a URL

:::tip Note

Setting `loadMode` to `async` will prevent freezing the UI on Android when loading photos async (e.g. from online API)

:::

/// flavor plain

```xml
<Image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.svg"
  stretch="aspectFill"
/>
```

///

/// flavor angular

```html
<image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.svg"
  stretch="aspectFill"
>
</image>
```

///

/// flavor react

```tsx
<image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.svg"
  stretch="aspectFill"
/>
```

///

/// flavor vue

```html
<image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.svg"
  stretch="aspectFill"
/>
```

///

/// flavor svelte

```html
<image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.svg"
  stretch="aspectFill"
/>
```

///

#### Example: Displaying a `base64`-encoded image

/// flavor plain

```xml
<Image src="data:Image/png;base64,iVBORw..." stretch="aspectFill" />
```

///

/// flavor angular

```html
<image src="data:Image/png;base64,iVBORw..." stretch="aspectFill"></image>
```

///

/// flavor react

```tsx
<image src="data:Image/png;base64,iVBORw..." stretch="aspectFill" />
```

///

/// flavor vue

```html
<image src="data:Image/png;base64,iVBORw..." stretch="aspectFill" />
```

///

/// flavor svelte

```html
<image src="data:Image/png;base64,iVBORw..." stretch="aspectFill" />
```

///

#### Example: Image with CSS and an icon fonts

/// flavor plain

```xml
<Image src="font://&#xf004;" class="fas" />
```

///

/// flavor angular

```html
<image src="font://&#xf004;" class="fas"></image>
```

///

/// flavor react

```tsx
<image src="font://&#xf004;" class="fas" />
```

///

/// flavor vue

```html
<!-- Displaying an image with a font icon in {N} 6.2+ -->
<!-- In NativeScript-Vue, `.decode` is required for parsing properties that have HTML entities in them. -->
<image src.decode="font://&#xf004;" class="fas" />
```

///

/// flavor svelte

```html
<image src="font://&#xf004;" class="fas" />
```

///

#### Props

| Name           | Type                                                                                            | Description                                                                                                                                                                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src`          | `String` or [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_) | Gets or sets the source of the image as a URL or an image source. If you use the new font:// icon protocol in {N} 6.2, make sure you add .decode to the name of the property - e.g. `src.decode="font://&#xf004;"`                                                       |
| `imageSource`  | [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_)             | Gets or sets the image source of the image.                                                                                                                                                                                                                              |
| `tintColor`    | `Color`                                                                                         | (Style property) Sets a color to tint template images.                                                                                                                                                                                                                   |
| `stretch`      | `Stretch`                                                                                       | (Style property) Gets or sets the way the image is resized to fill its allocated space.<br/>Valid values: `none`, `aspectFill`, `aspectFit`, or `fill`.<br/>For more information, see [Stretch](https://docs.nativescript.org/api-reference/modules/_ui_enums_.stretch). |
| `loadMode`     |                                                                                                 | Gets or sets the loading strategy for the images on the local file system.<br/>Valid values: `sync` or `async`.<br/>Default value: `async`.<br/>For more information, see [loadMode](https://docs.nativescript.org/api-reference/classes/_ui_image_.image#loadmode).     |
| `...Inherited` | `Inherited`                                                                                     | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_image_.html)                                                                                                                              |

<!-- TODO: fix links -->

#### Native component

| Android                                                                                             | iOS                                                                          |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.ImageView`](https://developer.android.com/reference/android/widget/ImageView.html) | [`UIImageView`](https://developer.apple.com/documentation/uikit/uiimageview) |

### Label

`<Label>` is a UI component that displays read-only text.

::: warning Note
This `<Label>` is **not** the same as the HTML `<label>`.
:::

---

#### Example: Simple label

/// flavor plain

```xml
<Label text="Label" />
```

///

/// flavor angular

```html
<label text="Label"></label>
```

///

/// flavor react

```tsx
<label>Label</label>
```

///

/// flavor vue

```html
<label text="Label" />
```

///

/// flavor svelte

```html
<label text="Label" />
```

///

#### Example: Styling the label

If you need to style parts of the text, you can use a combination of a `FormattedString` and `Span` elements.

/// flavor plain

```xml
<Label textWrap="true">
  <FormattedString>
    <Span text="This text has a " />
    <Span text="red " style="color: red" />
    <Span text="piece of text. " />
    <Span text="Also, this bit is italic, " fontStyle="italic" />
    <Span text="and this bit is bold." fontWeight="bold" />
  </FormattedString>
</Label>
```

///

/// flavor angular

```html
<label textWrap="true">
  <FormattedString>
    <span text="This text has a "></span>
    <span text="red " style="color: red"></span>
    <span text="piece of text. "></span>
    <span text="Also, this bit is italic, " fontStyle="italic"></span>
    <span text="and this bit is bold." fontWeight="bold"></span>
  </FormattedString>
</label>
```

///

/// flavor react

```tsx
import { Color } from '@nativescript/core'
;<label textWrap={true}>
  <formattedString>
    <span>This text has a </span>
    <span color={new Color('red')}>red </span>
    <span>piece of text. </span>
    <span fontStyle="italic">Also, this bit is italic, </span>
    <span fontWeight="bold">and this bit is bold.</span>
  </formattedString>
</label>
```

///

/// flavor vue

```html
<label textWrap="true">
  <FormattedString>
    <span text="This text has a " />
    <span text="red " style="color: red" />
    <span text="piece of text. " />
    <span text="Also, this bit is italic, " fontStyle="italic" />
    <span text="and this bit is bold." fontWeight="bold" />
  </FormattedString>
</label>
```

///

/// flavor svelte

```html
<label textWrap="{true}">
  <formattedString>
    <span text="This text has a " />
    <span text="red " style="color: red" />
    <span text="piece of text. " />
    <span text="Also, this bit is italic, " fontStyle="italic" />
    <span text="and this bit is bold." fontWeight="bold" />
  </formattedString>
</label>
```

///

#### Props

| Name             | Type                                                             | Description                                                                                                                                 |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `letterSpacing`  | `number`                                                         | Gets or sets letterSpace style property.                                                                                                    |
| `lineHeight`     | `number`                                                         | Gets or sets lineHeight style property.                                                                                                     |
| `text`           | `string`                                                         | Gets or sets the Label text.                                                                                                                |
| `textAlignment`  | `initial`, `left`, `center`, `right`                             | Gets or sets text-alignment style property.                                                                                                 |
| `textDecoration` | `none`, `underline`, `line-through`, `underline`, `line-through` | Gets or sets text swcoration style property.                                                                                                |
| `textTransform`  | `initial`, `none`, `capitalize`, `uppercase`, `lowercase`        | Gets or sets text transform style property.                                                                                                 |
| `textWrap`       | `boolean`                                                        | Gets or sets whether the Label wraps text or not.                                                                                           |
| `whiteSpace`     | `initial`, `normal`, `nowrap`                                    | Gets or sets the white space style.                                                                                                         |
| `...Inherited`   | `Inherited`                                                      | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_label_.html) |

<!-- TODO: fix links -->

#### Events

| Name         | Description                             |
| ------------ | --------------------------------------- |
| `textChange` | Emitted when the label text is changed. |

#### Native component

| Android                                                                                           | iOS                                                                  |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UILabel`](https://developer.apple.com/documentation/uikit/uilabel) |

<!-- TODO: reference link: https://github.com/nativescript-vue/nativescript-vue.org/tree/master/content/docs/en/elements/components -->

### List Picker

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
<listPicker
  items="{listOfItems}"
  bind:selectedIndex="{selectedItem}"
/>
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

#### Props

| Name            | Type            | Description                                                                                                                                      |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `items`         | `Array<String>` | Gets or sets the items displayed as options in the list picker.                                                                                  |
| `selectedIndex` | `Number`        | Gets or sets the index of the currently selected item.                                                                                           |
| `...Inherited`  | `Inherited`     | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_list_picker_.htm) |

<!-- TODO: fix links -->

#### Events

| Name                  | Description                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------- |
| `selectedIndexChange` | Emitted when the currently selected option (index) changes. The new index can be retrieved via `$event.value`. |

#### Native component

| Android                                                                                                   | iOS                                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.widget.NumberPicker`](https://developer.android.com/reference/android/widget/NumberPicker.html) | [`UIPickerView`](https://developer.apple.com/documentation/uikit/uipickerview) |

### ListView

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

#### Properties

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

#### Item Templates

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

#### Properties

| Name                    | Type                   | Description                                                                       |
| ----------------------- | ---------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                 | `Array<any>`           | `ItemsSource`                                                                     | Gets or set the items collection of the `ListView`. The items property can be set to an array or an object defining length and getItem(index) method. |
| `itemTemplateSelector`  | `function`             | A function that returns the appropriate key template based on the data item.      |
| `itemTemplates`         | `Array<KeyedTemplate>` | Gets or set the list of item templates for the item template selector.            |
| `separatorColor`        | `string`               | `Color`                                                                           | Gets or set the items separator line color of the ListView.                                                                                           |
| `rowHeight`             | `Length`               | Gets or set row height of the ListView.                                           |
| `iosEstimatedRowHeight` | `Length`               | Gets or set the estimated height of rows in the ListView. Default value: **44px** |

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

#### Using `<ListView>` with multiple `<v-template>` blocks

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

#### An important note about `v-for`

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

#### Props

| Name             | Type         | Description                                                                                                                                                                                                                 |
| ---------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `for`            | `String`     | Provides the expression for iterating through the items.<br/>For example: <ul><li><code>item in listOfItems</code></li><li><code>(item, index) in listOfItems</code></li><li><code>item in [1, 2, 3, 4, 5]</code></li></ul> |
| `items`          | `Array<any>` | An array of items to be shown in the `<ListView>`.<br/>**This property is only for advanced use. Use the `for` property instead.**                                                                                          |
| `separatorColor` | `Color`      | Sets the separator line color. Set to `transparent` to remove it.                                                                                                                                                           |
| `...Inherited`   | `Inherited`  | Additional inherited properties not shown. Refer to the [API Reference]()                                                                                                                                                   |

#### todo: cleanup API References

<!-- TODO: fix links -->

| Name                                                                                                 | Type        |
| ---------------------------------------------------------------------------------------------------- | ----------- |
| [@nativescript/core/ui/list-view](http://docs.nativescript.org/api-reference/modules/_ui_list_view_) | `Module`    |
| [ListView](https://docs.nativescript.org/api-reference/classes/_ui_list_view_.listview)              | `Class`     |
| [ItemEventData](https://docs.nativescript.org/api-reference/interfaces/_ui_list_view_.itemeventdata) | `Interface` |
| [ItemsSource](https://docs.nativescript.org/api-reference/interfaces/_ui_list_view_.itemssource)     | `Interface` |
| [KeyedTemplate](https://docs.nativescript.org/api-reference/interfaces/_ui_core_view_.keyedtemplate) | `Interface` |

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

#### Events

| Name      | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| `itemTap` | Emitted when an item in the `<ListView>` is tapped. To access the tapped item, use `event.item`. |

#### Methods

| Name                                           | Description                                                     |
| ---------------------------------------------- | --------------------------------------------------------------- |
| `refresh()`                                    | Forces the `<ListView>` to reload all its items.                |
| `scrollToIndex(index: number)`                 | Scrolls the specified item with index into view.                |
| `scrollToIndexAnimated(index: number)`         | Scrolls the specified item with index into view with animation. |
| `isItemAtIndexVisible(index: number): boolean` | Checks if specified item with index is visible.                 |

#### Native component

| Android                                                                                           | iOS                                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.ListView`](https://developer.android.com/reference/android/widget/ListView.html) | [`UITableView`](https://developer.apple.com/documentation/uikit/uitableview) |

### Page

`<Page>` is a UI component that represents an application screen. NativeScript apps typically consist of one or more `<Page>` that wrap content such as an [`<ActionBar>`](#actionbar) and other UI widgets.

---

#### Example: Simple Page

/// flavor svelte

```html
<page>
  <actionBar title="My App" />
  <gridLayout>
    <label text="My Content" />
  </gridLayout>
</page>
```

///

/// flavor vue

```html
<Page>
  <ActionBar title="My App" />
  <GridLayout>
    <label text="My Content" />
  </GridLayout>
</Page>
```

///

/// flavor react

```tsx
<page>
  <actionBar title="My App" />
  <gridLayout>
    <label>My Content</label>
  </gridLayout>
</page>
```

#### The special case of the ActionBar child

It doesn't matter whether the `<actionBar>` is a first child, last child, or middle child of `<page>`.
React NativeScript will automatically detect it using an `child instanceof Page` check, and set it as the `ActionBar` for the Page.

:::tip Note
You can skip this check by explicitly setting `<actionBar nodeRole="actionBar">`, but it's not a major performance concern.
:::
Any non-ActionBar child will be handled as the content view. Page only supports a single child, so if you want to insert multiple children on the Page (which is normally the case!), you should use a LayoutBase such as GridLayout to enscapsulate them.

:::tip Out of interest
You'd expect to be able to set ActionBar as the content view by specifying `<actionBar nodeRole="content">`, but it's not supported in NativeScript Core, so React NativeScript doesn't support it either!
:::

///

/// flavor plain

```html
<Page>
  <ActionBar title="My App" />
  <GridLayout>
    <label text="My Content" />
  </GridLayout>
</Page>
```

///

#### Example: Using the `loaded` event for triggering UI changes

A typical scenario is performing UI changes after the page is loaded. The recommended way to do it is by using the `loaded` event, triggered by NativeScript when the page is fully loaded:

/// flavor plain

```xml
<Page
  loaded="onPageLoaded"
  navigatedFrom="onNavigatedFrom"
  navigatedTo="onNavigatedTo"
  navigatingFrom="onNavigatingFrom"
  navigatingTo="onNavigatingTo"
  unloaded="onUnloaded"
  layoutChanged="onLayoutChanged"
>
  <Page.actionBar>
    <ActionBar title="Page Creation" />
  </Page.actionBar>
  <!-- Each page can have only a single root view -->
  <StackLayout>
    <!-- content here -->
    <Label text="Hello, world!" />
  </StackLayout>
</Page>
```

```ts
import { EventData, Page } from '@nativescript/core'

export function onPageLoaded(args: EventData): void {
  console.log('Page Loaded')
  const page = args.object as Page
}
export function onLayoutChanged(args: EventData) {
  console.log(args.eventName)
  console.log(args.object)
}

export function onNavigatedTo(args: NavigatedData) {
  console.log(args.eventName)
  console.log(args.object)
  console.log(args.context)
  console.log(args.isBackNavigation)
}

export function onNavigatingFrom(args: NavigatedData) {
  console.log(args.eventName)
  console.log(args.object)
  console.log(args.context)
  console.log(args.isBackNavigation)
}

export function onUnloaded(args: EventData) {
  console.log(args.eventName)
  console.log(args.object)
}

export function onNavigatedFrom(args: NavigatedData) {
  console.log(args.eventName)
  console.log(args.object)
  console.log(args.context)
  console.log(args.isBackNavigation)
}
```

///

/// flavor vue

```html
<Page @loaded="greet">
  <ActionBar title="My App" />
  <GridLayout>
    <label text="My Content" />
  </GridLayout>
</Page>
```

```js
export default {
  methods: {
    greet() {
      alert('Hello!').then(() => {
        console.log('Dialog closed')
      })
    }
  }
}
```

::: warning Note
Developers coming from a web background would usually reach for the `mounted` lifecycle hook Vue provides, however in NativeScript the application, and certain elements might not yet be loaded when the `mounted` hook is executed, thus certain actions such as alerts, dialogs, navigation etc. are not possible inside the `mounted` hook. To work around this limitation, the `loaded` event may be used, which only fires after the application is ready. In this case, we are using the `loaded` event of the [`<Page>`](#page) element, but this event is available for all NativeScript elements.
:::

///

<!-- TODO: examples in all flavors -->

#### Props

| Name                           | Type        | Description                                                                                                                                |
| ------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `actionBarHidden`              | `Boolean`   | Shows or hides the `<ActionBar>` for the page.<br/>Default value: `false`.                                                                 |
| `backgroundSpanUnderStatusBar` | `Boolean`   | Gets or sets whether the background of the page spans under the status bar.<br/>Default value: `false`.                                    |
| `androidStatusBarBackground`   | `Color`     | (Android-only) Gets or sets the color of the status bar on Android devices.                                                                |
| `enableSwipeBackNavigation`    | `Boolean`   | (iOS-only) Gets or sets whether the page can be swiped back on iOS.<br/>Default value: `true`.                                             |
| `statusBarStyle`               | `String`    | Gets or sets the style of the status bar.<br/>Valid values:<br/>`light`,<br/>`dark`.                                                       |
| `...Inherited`                 | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_page_.html) |

<!-- TODO: fix links -->

#### Events

| Name             | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `loaded`         | Emitted after the page has been loaded.                          |
| `navigatedFrom`  | Emitted after the app has navigated away from the current page.  |
| `navigatedTo`    | Emitted after the app has navigated to the current page.         |
| `navigatingFrom` | Emitted before the app has navigated away from the current page. |
| `navigatingTo`   | Emitted before the app has navigated to the current page.        |

::: warning Note
The events loaded, unloaded and layoutChanged are UI component lifecycles events and are universal for all classes that extend the View class (including Page). They can be used with all NativeScript elements (e.g. layouts, buttons, UI plugins, etc.).
:::

#### Native component

| Android                                                                                                                                                                                          | iOS                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [`org.nativescript.widgets.GridLayout`](https://github.com/NativeScript/NativeScript/blob/master/packages/ui-mobile-base/android/widgets/src/main/java/org/nativescript/widgets/GridLayout.java) | [`UIViewController`](https://developer.apple.com/documentation/uikit/uiviewcontroller) |

### Placeholder

`<Placeholder>` allows you to add any native widget to your application. To do that, you need to put a Placeholder somewhere in the UI hierarchy and then create and configure the native widget that you want to appear there. Finally, pass your native widget to the event arguments of the creatingView event.

---

#### Example: Simple Placeholder

/// flavor plain

```xml
<Placeholder creatingView="creatingView" />
```

```ts
import { Utils } from '@nativescript/core'

export function creatingView(args) {
  let nativeView
  if (global.isIOS) {
    // Example with UITextView in iOS
    nativeView = UITextView.new()
    nativeView.text = 'Native View (iOS)'
  } else if (global.isAndroid) {
    // Example with TextView in Android
    nativeView = new android.widget.TextView(Utils.android.getApplicationContext())
    nativeView.setText('Native View (Android)')
  }

  args.view = nativeView
}
```

///

/// flavor react

```tsx
import { isIOS, isAndroid } from '@nativescript/core'
;<placeholder
  onCreatingView={() => {
    if (isIOS) {
      // Example with UILabel in iOS
      const nativeView = new UILabel()
      nativeView.text = 'Native View - iOS'
      args.view = nativeView
    } else if (isAndroid) {
      // Example with TextView in Android
      const nativeView = new android.widget.TextView(args.context)
      nativeView.setSingleLine(true)
      nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END)
      nativeView.setText('Native View - Android')
      args.view = nativeView
    } else {
      console.warn(
        'Unsupported platform! Did they finally make NativeScript for desktop?'
      )
    }
  }}
/>
```

///

/// flavor angular

```html
<Placeholder (creatingView)="creatingView($event)" />
```

```ts
import { Utils, Placeholder } from '@nativescript/core'

function creatingView(args) {
  const placeholder = args.object as Placeholder

  let nativeView
  if (global.isIOS) {
    // Example with UITextView in iOS
    nativeView = UITextView.new()
    nativeView.text = 'Native View (iOS)'
  } else if (global.isAndroid) {
    // Example with TextView in Android
    nativeView = new android.widget.TextView(Utils.android.getApplicationContext())
    nativeView.setText('Native View (Android)')
  }

  placeholder.view = nativeView
}
```

///

/// flavor vue

```html
<Placeholder @creatingView="creatingView" />
```

```js
// Example with TextView in Android
methods: {
  creatingView: function(args) {
      const nativeView = new android.widget.TextView(args.context);
      nativeView.setSingleLine(true);
      nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END);
      nativeView.setText("Native View - Android");
      args.view = nativeView;
  }
}
// Example with UILabel in iOS
methods: {
  creatingView: function(args) {
      const nativeView = new UILabel();
      nativeView.text = "Native View - iOS";
      args.view = nativeView;
  }
}
```

///

#### Props

| Name           | Type        | Description                                                                                                                                       |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `N/A`          | `N/A`       | None.                                                                                                                                             |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_placeholder_.html) |

### Progress

`<Progress>` is a UI component that shows a bar to indicate the progress of a task.

See also: [ActivityIndicator](#activity-indicator).

---

#### Example: Simple Progress

/// flavor plain

```xml
<Progress
  width="100%"
  value="{{ progressValue }}"
  maxValue="{{ progressMaxValue }}"
  loaded="onProgressLoaded"
/>
```

```ts
import { Observable, Page, Progress, PropertyChangeData } from '@nativescript/core'

export function onNavigatingTo(args) {
  const page = args.object as Page
  const vm = new Observable()
  vm.set('progressValue', 10) // Initial value
  vm.set('progressMaxValue', 100) // Maximum value
  // Forcing progress value change (for demonstration)
  setInterval(() => {
    const value = vm.get('progressValue')
    vm.set('progressValue', value + 2)
  }, 300)
  page.bindingContext = vm
}
export function onProgressLoaded(args) {
  const myProgressBar = args.object as Progress
  myProgressBar.on('valueChange', (pargs: PropertyChangeData) => {
    // TIP: args (for valueChange of Progress) is extending EventData with oldValue & value parameters
    console.log(`Old Value: ${pargs.oldValue}`)
    console.log(`New Value: ${pargs.value}`)
  })
}
```

///

/// flavor angular

```html
<progress value="25" maxValue="100" (valueChanged)="onValueChanged($event)"></progress>
```

```ts
import { Component, OnInit } from '@angular/core'

@Component({
  moduleId: module.id,
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css']
})
export class StylingComponent implements OnInit {
  public progressValue: number

  ngOnInit() {
    this.progressValue = 25
  }
}
```

///

/// flavor react

```tsx
function getTaskCompletionPercent() {
  // Just a stub method to illustrate the concept.
  return 10
}

;<progress value={getTaskCompletionPercent()} maxValue={100} />
```

///

/// flavor vue

```html
<progress :value="currentProgress" />
```

///

/// flavor svelte

```html
<progress value="{currentProgress}" />
```

///

#### Example: Styling Progress

Using `backgroundColor` (**CSS**: `background-color`) & color to change the Progress style.

:::tip Note
`backgroundColor` will work only on `iOS`; on `Android` the background will be the color with applied opacity.
:::

```html
<progress value="50" maxValue="100" backgroundColor="red" color="green"></progress>
<!-- Using the @nativescript/theme CSS class to change the Progress style -->
<progress value="25" maxValue="100" class="progress"></progress>
```

```css
Progress {
  color: cyan;
  background-color: green;
}
```

#### Props

| Name           | Type        | Description                                                                                                                                    |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`        | `Number`    | Gets or sets the current value of the progress bar. Must be within the range of 0 to `maxValue`.                                               |
| `maxValue`     | `Number`    | Gets or sets the maximum value of the progress bar.<br/>Default value: `100`.                                                                  |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_progress_.html) |

<!-- TODO: fix links -->

#### Events

| Name          | Description                                |
| ------------- | ------------------------------------------ |
| `valueChange` | Emitted when the `value` property changes. |

#### Native Component

| Android                                                                                                                         | iOS                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`android.widget.ProgressBar` (indeterminate = false)](https://developer.android.com/reference/android/widget/ProgressBar.html) | [`UIProgressView`](https://developer.apple.com/documentation/uikit/uiprogressview) |

### Repeater

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

#### API References

| Name                                                                                   | Type     |
| -------------------------------------------------------------------------------------- | -------- |
| [Repeater](http://docs.nativescript.org/api-reference/modules/_ui_repeater_.html)      | `Module` |
| [Repeater](https://docs.nativescript.org/api-reference/classes/_ui_repeater_.repeater) | `Class`  |

<!-- TODO: fix links -->

### ScrollView

`<ScrollView>` is a UI component that shows a scrollable content area. Content can be scrolled vertically or horizontally.

It's important to note that `<ScrollView>` extends [`ContentView`](https://docs.nativescript.org/api-reference/classes/_ui_content_view_.contentview), so it can only have a single child element.

<!-- TODO: fix links -->

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

#### Props

| name                        | type        | description                                                                                                                                      |
| --------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `orientation`               | `String`    | Gets or sets the direction in which the content can be scrolled: `horizontal` or `vertical`.<br/>Default value: `vertical`.                      |
| `scrollBarIndicatorVisible` | `Boolean`   | Specifies if the scrollbar is visible.<br/>Default value: `true`.                                                                                |
| `...Inherited`              | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_scroll_view_.htm) |

<!-- TODO: fix links -->

#### Events

| Name     | Description                         |
| -------- | ----------------------------------- |
| `scroll` | Emitted when a scroll event occurs. |

#### Native component

| Android                                                                          | iOS                                                                            |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.view`](https://developer.android.com/reference/android/view/View.html) | [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview) |

### SearchBar

`<SearchBar>` is a UI component that provides a user interface for entering search queries and submitting requests to the search provider.

---

/// flavor plain

```xml
<SearchBar
  id="searchBar"
  hint="Enter search term here ..."
  text="{{sbText}}"
  clear="onClear"
  submit="onSubmit"
/>
```

```ts
import { Observable, Page, PropertyChangeData, SearchBar } from '@nativescript/core'

export function onNavigatingTo(args) {
  const page = args.object as Page
  const vm = new Observable()
  vm.set('sbText', '')
  vm.on(Observable.propertyChangeEvent, (propertyChangeData: PropertyChangeData) => {
    if (propertyChangeData.propertyName === 'sbText') {
      const searchBar = propertyChangeData.object as SearchBar
      console.log(`Input changed! New value: ${propertyChangeData.value}`)
    }
  })
  page.bindingContext = vm
}

export function onSubmit(args) {
  const searchBar = args.object as SearchBar
  console.log(`Searching for ${searchBar.text}`)
}

export function onClear(args) {
  const searchBar = args.object as SearchBar
  console.log(`Clear event raised`)
}
```

///

/// flavor angular

```html
<SearchBar
  hint="Enter search term here ..."
  [text]="searchPhrase"
  (textChange)="onTextChanged($event)"
  (clear)="onClear($event)"
  (submit)="onSubmit($event)"
>
</SearchBar>
```

```ts
import { Component } from '@angular/core'
import { SearchBar } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class UsageComponent {
  searchPhrase: string

  onSubmit(args) {
    const searchBar = args.object as SearchBar
    console.log(`Searching for ${searchBar.text}`)
  }

  onTextChanged(args) {
    const searchBar = args.object as SearchBar
    console.log(`Input changed! New value: ${searchBar.text}`)
  }

  onClear(args) {
    const searchBar = args.object as SearchBar
    console.log(`Clear event raised`)
  }
}
```

///

/// flavor vue

```html
<SearchBar
  hint="Search hint"
  :text="searchPhrase"
  @textChange="onTextChanged"
  @submit="onSubmit"
/>
```

`<SearchBar>` provides two-way data binding using `v-model`.

```html
<SearchBar v-model="searchQuery" />
```

///

#### Props

| Name                       | Type        | Description                                                                                                                                  |
| -------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `hint`                     | `String`    | Gets or sets placeholder text for the input area.                                                                                            |
| `text`                     | `String`    | Gets or sets the value of the search query.                                                                                                  |
| `textFieldBackgroundColor` | `Color`     | Gets or sets the background color of the input area.                                                                                         |
| `textFieldHintColor`       | `Color`     | Gets or sets the color of the placeholder text.                                                                                              |
| `...Inherited`             | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/modules/_ui_search_bar_) |

<!-- TODO: fix links -->

#### Events

| name         | description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| `textChange` | Emitted when the text is changed.                                                            |
| `submit`     | Emitted when the search input is submitted.                                                  |
| `clear`      | Emitted when the current search input is cleared through the **X** button in the input area. |

#### Native Component

| Android                                                                                               | iOS                                                                          |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.SearchView`](https://developer.android.com/reference/android/widget/SearchView.html) | [`UISearchBar`](https://developer.apple.com/documentation/uikit/uisearchbar) |

### SegmentedBar

`<SegmentedBar>` is a UI bar component that displays a set of buttons for discrete selection. Can show text or images.

As opposed to [`<TabView>`](#tabview):

- The position of `<SegmentedBar>` is not fixed.
- You can place and style it as needed on the page or inside additional app elements such as hamburger menus.
- You need to handle the content shown after selection separately.

---

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
  (selectedIndexChange)="onSelectedIndexChange($event)"
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

  public onSelectedIndexChange(args: SelectedIndexChangedEventData) {
    const segmentedBar = args.object as SegmentedBar
    const oldIndex = args.oldIndex
    const newIndex = args.newIndex
  }
}
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

```html
<SegmentedBar
  :items="listOfItems"
  selectedIndex="0"
  @selectedIndexChange="onSelectedIndexChange"
/>
```

`<SegmentedBar>` provides two-way data binding using `v-model`.

```html
<SegmentedBar :items="listOfItems" v-model="selectedItem" />
```

///

#### Props

| Name                      | Type                      | Description                                                                                                                                                   |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                   | `Array<SegmentedBarItem>` | An array of items to be displayed in the segmented bar. Represents the button labels or icons of the segmented bar.<br/>The array must be created in advance. |
| `selectedIndex`           | `Number`                  | Gets or sets the index of the selected item.                                                                                                                  |
| `selectedBackgroundColor` | `Color`                   | (Style property) Gets or sets the background color of the selected item. To set the background color of the entire bar, use `backgroundColor`.                |
| `...Inherited`            | `Inherited`               | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_segmented_bar_.html)           |

<!-- TODO: fix links -->

#### Events

| Name                  | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `selectedIndexChange` | Emitted when the an item on the segmented bar is tapped. |

#### Native component

| Android                                                                                         | iOS                                                                                        |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`android.widget.TabHost`](https://developer.android.com/reference/android/widget/TabHost.html) | [`UISegmentedControl`](https://developer.apple.com/documentation/uikit/uisegmentedcontrol) |

### Slider

`<Slider>` is a UI component that provides a slider control for picking values within a specified numeric range.

---

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

#### Props

| Name           | Type        | Description                                                                                                                                  |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`        | `Number`    | Gets or sets the currently selected value of the slider.<br/>Default value: `0`.                                                             |
| `minValue`     | `Number`    | Gets or sets the minimum value of the slider.<br/>Default value: `0`.                                                                        |
| `maxValue`     | `Number`    | Gets or sets the maximum value of the slider.<br/>Default value: `100`.                                                                      |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_slider_.html) |

<!-- TODO: fix links -->

#### Events

| Name          | Description                                   |
| ------------- | --------------------------------------------- |
| `valueChange` | Emitted when the value of the slider changes. |

#### Native component

| Android                                                                                         | iOS                                                                    |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`android.widget.SeekBar`](https://developer.android.com/reference/android/widget/SeekBar.html) | [`UISlider`](https://developer.apple.com/documentation/uikit/uislider) |

### Switch

`<Switch>` is a UI component that lets users toggle between two states.

The default state is `false` or OFF.

---

/// flavor plain

```xml
<Switch checked="true" loaded="onSwitchLoaded" />
```

```ts
import { Switch } from '@nativescript/core'

export function onSwitchLoaded(argsloaded) {
  const mySwitch = argsloaded.object as Switch
  mySwitch.on('checkedChange', args => {
    const sw = args.object as Switch
    const isChecked = sw.checked
    console.log(`Switch new value ${isChecked}`)
  })
}
```

///

/// flavor angular

```html
<Switch checked="true" (checkedChange)="onCheckedChange($event)"></Switch>
```

```ts
import { Component } from '@angular/core'
import { EventData, Switch } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class BasicSwitchComponent {
  onCheckedChange(args: EventData) {
    const sw = args.object as Switch
    const isChecked = sw.checked // boolean
  }
}
```

///

/// flavor vue

```html
<Switch checked="true" />
```

`<Switch>`provides two-way data binding using `v-model`.

```html
<Switch v-model="itemEnabled" />
```

///

#### Props

| Name           | Type        | Description                                                                                                                                  |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `checked`      | `Boolean`   | Gets or sets the value of the switch selection.<br/>Default value: `false`.                                                                  |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_switch_.html) |

<!-- TODO: fix links -->

#### Events

| Name            | Description                                |
| --------------- | ------------------------------------------ |
| `checkedChange` | Emitted when the switch selection changes. |

#### Native component

| Android                                                                                       | iOS                                                                    |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`android.widget.Switch`](https://developer.android.com/reference/android/widget/Switch.html) | [`UISwitch`](https://developer.apple.com/documentation/uikit/uiswitch) |

### TabView

`<TabView>` is a navigation component that shows content grouped into tabs and lets users switch between tabs.

---

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

Using a TabView inside an Angular app requires some special attention about how to provide title, iconSource and content (view) of the TabViewItem. In a pure NativeScript application TabView has an items property which could be set via XML to an array of TabViewItems (basically, an array of objects with title, view and iconSource properties). However, NativeScript-Angular does not support nested properties in its HTML template, so adding TabViewItem to TabView is a little bit different. NativeScript-Angular provides a custom Angular directive that simplifies the way native TabView should be used. The following example shows how to add a TabView to your page (with some clarifications later):

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
If you have set the iconSource property on a TabViewItem, but are not seeing any icons next to the title, this might be because the icon is not present in your App_Resources folder. See the Working with Images article for information on how to add and reference your resource images.
:::

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

::: warning Note
Currently, `TabViewItem` expects a single child element. In most cases, you might want to wrap your content in a layout.
:::

::: tip Tip
Consider using BottomNavigation component to create the same UI for both iOS and Android while having greater control over the funcionalities.
:::

#### Adding icons to tabs

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

::: tip Tip
You can use images for tab icons instead of icon fonts. For more information about how to control the size of icons, see [Working with image from resource folders](https://docs.nativescript.org/ui/image-resources).
:::

<!-- TODO: fix links -->

#### Styling

The `TabView` component has the following unique styling properties:

- `tabTextColor` (corresponding CSS property `tab-text-color` ) - Changes the text color for the tabs.

- `selectedTabTextColor` (corresponding CSS property `selected-tab-text-color` ) - Changes the color of the text for the selected tab.

- `tabBackgroundColor` (corresponding CSS property `tab-background-color`) - Sets the background color of the tabs.

- `tabTextFontSize` (corresponding CSS property `tab-text-font-size`) - Sets the font size of the tabs.

- `textTransform` (corresponding CSS property `text-transform`) - Sets the text transform individually for every `TabViewItem`. Value options: `capitalize`, `lowercase`, `none`, and `uppercase`.

- `androidSelectedTabHighlightColor`<sup>android specific property</sup> (corresponding CSS property `android-selected-tab-highlight-color`) - Sets the underline color of the tabs in Android.

#### Props

| Name                               | Type                                                  | Description                                                                                                                                    |
| ---------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectedIndex`                    | `Number`                                              | Gets or sets the currently selected tab. Default is `0`.                                                                                       |
| `tabTextColor`                     | `Color`                                               | (Style property) Gets or sets the text color of the tabs titles.                                                                               |
| `tabTextFontSize`                  | `Color`                                               | Gets or sets the font size of the tabs titles.                                                                                                 |
| `tabBackgroundColor`               | `Color`                                               | (Style property) Gets or sets the background color of the tabs.                                                                                |
| `selectedTabTextColor`             | `Color`                                               | (Style property) Gets or sets the text color of the selected tab title.                                                                        |
| `androidTabsPosition`              | `String`                                              | Sets the position of the TabView in Android platform<br/>Valid values: `top` or `bottom`.                                                      |
| `androidOffscreenTabLimit`         | `number`                                              | Gets or sets the number of tabs that should be retained to either side of the current tab in the view hierarchy in an idle state.              |
| `androidSelectedTabHighlightColor` | `Color`                                               | Gets or sets the color of the horizontal line drawn below the currently selected tab on Android.                                               |
| `iosIconRenderingMode`             | _"automatic"_, _"alwaysOriginal"_, _"alwaysTemplate"_ | Gets or sets the icon rendering mode on iOS.                                                                                                   |
| `...Inherited`                     | `Inherited`                                           | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_tab_view_.html) |

<!-- TODO: fix links -->

#### TabViewItem Properties

| Name         | Type     | Description                                                                                                                                  |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`      | `string` | Gets or sets the title of the tab strip entry.                                                                                               |
| `iconSource` | `string` | Gets or sets the icon source of the tab strip entry. Supports local image paths (`~`), resource images (`res://`) and icon fonts (`font://`) |

#### Events

| Name                  | Description                                                                                                                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectedIndexChange` | Emits [an event object](https://docs.nativescript.org/api-reference/interfaces/_ui_tab_view_.selectedindexchangedeventdata) containing an `newIndex` property with the index of the tapped `<TabViewItem>` (and an `oldIndex` property with the index of the previous tab). |

<!-- TODO: fix links -->

#### Native component

| Android                                                                                                               | iOS                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`android.support.v4.view.ViewPager`](https://developer.android.com/reference/android/support/v4/view/ViewPager.html) | [`UITabBarController`](https://developer.apple.com/documentation/uikit/uitabbarcontroller) |

### TextField

`<TextField>` is an input component that creates an editable single-line box.

`<TextField>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/_ui_text_base_.textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/_ui_editor_text_base_.editabletextbase) which provide additional properties and events.

<!-- TODO: fix links -->

---

/// flavor plain

```html
<TextField hint="Enter text" color="orangered" backgroundColor="lightyellow" />
```

///

/// flavor angular

```html
<TextField
  hint="Enter Date"
  secure="false"
  keyboardType="datetime"
  returnKeyType="done"
  autocorrect="false"
  maxLength="10"
  [text]="name"
  (returnPress)="onReturnPress($event)"
  (focus)="onFocus($event)"
  (blur)="onBlur($event)"
>
</TextField>
```

```ts
import { Component } from '@angular/core'
import { TextField, Utils } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class UsageComponent {
  name = ''

  onReturnPress(args) {
    // returnPress event will be triggered when user submits a value
    const textField = args.object as TextField

    // Gets or sets the placeholder text.
    console.log(textField.hint)
    // Gets or sets the input text.
    console.log(textField.text)
    // Gets or sets the secure option (e.g. for passwords).
    console.log(textField.secure)

    // Gets or sets the soft keyboard type. Options: "datetime" | "phone" | "number" | "url" | "email"
    console.log(textField.keyboardType)
    // Gets or sets the soft keyboard return key flavor. Options: "done" | "next" | "go" | "search" | "send"
    console.log(textField.returnKeyType)
    // Gets or sets the autocapitalization type. Options: "none" | "words" | "sentences" | "allcharacters"
    console.log(textField.autocapitalizationType)

    // Gets or sets a value indicating when the text property will be updated.
    console.log(textField.updateTextTrigger)
    // Gets or sets whether the instance is editable.
    console.log(textField.editable)
    // Enables or disables autocorrection.
    console.log(textField.autocorrect)
    // Limits input to a certain number of characters.
    console.log(textField.maxLength)

    Utils.setTimeout(() => {
      textField.dismissSoftInput() // Hides the soft input method, ususally a soft keyboard.
    }, 100)
  }

  onFocus(args) {
    // focus event will be triggered when the users enters the TextField
    const textField = args.object as TextField
  }

  onBlur(args) {
    // blur event will be triggered when the user leaves the TextField
    const textField = args.object as TextField
  }
}
```

///

/// flavor vue

```html
<TextField :text="textFieldValue" hint="Enter text..." />
```

`<TextField>` provides two-way data binding using `v-model`.

```html
<TextField v-model="textFieldValue" />
```

///

#### Props

| Name                     | Type                                                                                                                         | Description                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `text`                   | `String`                                                                                                                     | Gets or sets the value of the field.                                                                                                             |
| `hint`                   | `String`                                                                                                                     | Gets or sets the placeholder text.                                                                                                               |
| `isEnabled`              | `Boolean`                                                                                                                    | Make the field disabled or enabled. Default value is `true`.                                                                                     |
| `editable`               | `Boolean`                                                                                                                    | When `true`, indicates that the user can edit the value of the field.                                                                            |
| `maxLength`              | `Number`                                                                                                                     | Limits input to the specified number of characters.                                                                                              |
| `secure`                 | `Boolean`                                                                                                                    | Hides the entered text when `true`. Use this property to create password input fields.<br/>Default value: `false`.                               |
| `keyboardType`           | `KeyboardType`                                                                                                               | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`.                               |
| `returnKeyType`          | `ReturnKeyType`                                                                                                              | Gets or sets the label of the return key.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`.                                           |
| `autocorrect`            | `Boolean`                                                                                                                    | Enables or disables autocorrect.                                                                                                                 |
| `autocapitalizationType` | [`AutocapitalizationType`](https://docs.nativescript.org/api-reference/modules/_ui_editor_text_base_#autocapitalizationtype) | Gets or sets the autocapitalization type.                                                                                                        |
| `letterSpacing`          | `number`                                                                                                                     | Gets or sets letter space style property.                                                                                                        |
| `lineHeight`             | `number`                                                                                                                     | Gets or sets line height style property.                                                                                                         |
| `textAlignment`          | `TextAlignment`                                                                                                              | Gets or sets the text alignment.                                                                                                                 |
| `textDecoration`         | `TextDecoration`                                                                                                             | Gets or sets the text decoration.                                                                                                                |
| `textTransform`          | `TextTransform`                                                                                                              | Gets or sets the text transform.                                                                                                                 |
| `whiteSpace`             | `WhiteSpace`                                                                                                                 | Gets or sets white space style property.                                                                                                         |
| `...Inherited`           | `Inherited`                                                                                                                  | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_text_field_.html) |

<!-- TODO: fix links -->

#### Events

| Name          | Description                             |
| ------------- | --------------------------------------- |
| `textChange`  | Emitted when the text changes.          |
| `returnPress` | Emitted when the return key is pressed. |
| `focus`       | Emitted when the field is in focus.     |
| `blur`        | Emitted when the field loses focus.     |

#### Native component

| Android                                                                                           | iOS                                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.EditText`](https://developer.android.com/reference/android/widget/EditText.html) | [`UITextField`](https://developer.apple.com/documentation/uikit/uitextfield) |

### TextView

`<TextView>` is a UI component that shows an editable or a read-only multi-line text container. You can use it to let users type large text in your app or to show longer, multi-line text on the screen.

`<TextView>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/_ui_text_base_.textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/_ui_editor_text_base_.editabletextbase) which provide additional properties and events.

<!-- TODO: fix links -->

---

/// flavor plain

```xml
<TextView
  loaded="onTextViewLoaded"
  hint="Enter Date"
  text="{{ viewDate }}"
  secure="false"
  keyboardType="datetime"
  returnKeyType="done"
  autocorrect="false"
  maxLength="10"
/>
```

```ts
import { Observable, Page, TextView } from '@nativescript/core'

export function onNavigatingTo(args) {
  const page = args.object as Page
  const vm = new Observable()
  vm.set('viewDate', '')
  page.bindingContext = vm
}
export function onTextViewLoaded(argsloaded) {
  const textView = argsloaded.object as TextView
  textView.on('focus', args => {
    const view = args.object as TextView
    console.log('On TextView focus')
  })
  textView.on('blur', args => {
    const view = args.object as TextView
    console.log('On TextView blur')
  })
}
```

///

/// flavor angular

```html
<TextView hint="Enter some text..." [text]="tvtext" (textChange)="onTextChange($event)">
</TextView>
```

```ts
import { Component } from '@angular/core'
import { EventData, TextView } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class UsageComponent {
  tvtext = ''

  onTextChange(args: EventData) {
    const tv = args.object as TextView
    console.log(tv.text)
  }
}
```

///

/// flavor vue

```html
<TextView text="Multi\nLine\nText" />
```

`<TextView>` provides two-way data binding using `v-model`.

```html
<TextView v-model="textViewValue" />
```

///

#### Displaying multi-style text

To apply multiple styles to the text in your `<TextView>`, you can use `<FormattedString>`

```html
<TextView editable="false">
  <FormattedString>
    <span text="You can use text attributes such as " />
    <span text="bold, " fontWeight="Bold" />
    <span text="italic " fontStyle="Italic" />
    <span text="and " />
    <span text="underline." textDecoration="Underline" />
  </FormattedString>
</TextView>
```

#### Props

| Name            | Type                                                                                                                                    | Description                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`          | `String`                                                                                                                                | Gets or sets the value of the component.                                                                                                        |
| `hint`          | `String`                                                                                                                                | Gets or sets the placeholder text when the component is editable.                                                                               |
| `editable`      | `Boolean`                                                                                                                               | When `true`, indicates that the user can edit the contents of the container.                                                                    |
| `maxLength`     | `Number`                                                                                                                                | Sets the maximum number of characters that can be entered in the container.                                                                     |
| `keyboardType`  | `KeyboardType`                                                                                                                          | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`.                              |
| `returnKeyType` | Gets or sets the label of the return key. Currently supported only on iOS.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`. |
| `autocorrect`   | `Boolean`                                                                                                                               | Enables or disables autocorrect.                                                                                                                |
| `...Inherited`  | `Inherited`                                                                                                                             | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_text_view_.html) |

<!-- TODO: fix links -->

#### Events

| Name          | Description                             |
| ------------- | --------------------------------------- |
| `textChange`  | Emitted when the text changes.          |
| `returnPress` | Emitted when the return key is pressed. |
| `focus`       | Emitted when the container is in focus. |
| `blur`        | Emitted when the container loses focus. |

#### Native component

| Android                                                                                           | iOS                                                                        |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`android.widget.EditText`](https://developer.android.com/reference/android/widget/EditText.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview) |

### TimePicker

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

#### Props

| Name             | Type        | Description                                                                                                                                       |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hour`           | `Number`    | Gets or sets the selected hour.                                                                                                                   |
| `minute`         | `Number`    | Gets or sets the selected minute.                                                                                                                 |
| `time`           | `Date`      | Gets or sets the selected time.                                                                                                                   |
| `minHour`        | `Number`    | Gets or sets the minimum selectable hour.                                                                                                         |
| `maxHour`        | `Number`    | Gets or sets the maximum selectable hour.                                                                                                         |
| `minMinute`      | `Number`    | Gets or sets the minimum selectable minute.                                                                                                       |
| `maxMinute`      | `Number`    | Gets or sets the maximum selectable minute.                                                                                                       |
| `minuteInterval` | `Number`    | Gets or sets the selectable minute interval. For example: 5 or 15 minutes.<br/>Default value: `1`.                                                |
| `...Inherited`   | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_time_picker_.html) |

<!-- TODO: fix links -->

#### Events

| Name         | Description                             |
| ------------ | --------------------------------------- |
| `timeChange` | Emitted when the selected time changes. |

#### Native component

| Android                                                                                          | iOS                                                                            |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [`android.widget.TimePicker`](https://developer.android.com/reference/android/widget/TimePicker) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker) |

### WebView

`<WebView>` is a UI component that lets you show web content in your app. You can pull and show content from a URL or a local HTML file, or you can render static HTML content.

See also: [HtmlView](#htmlview).

---

/// flavor plain

```xml
<WebView row="1" loaded="onWebViewLoaded" id="myWebView" src="{{ webViewSrc }}" />
```

///

/// flavor angular

```html
<WebView
  [src]="webViewSrc"
  (loadStarted)="onLoadStarted($event)"
  (loadFinished)="onLoadFinished($event)"
>
</WebView>
```

///

/// flavor vue

```html
<WebView src="http://nativescript-vue.org/" />

<WebView src="~/html/index.html" />

<WebView src="<div><h1>Some static HTML</h1></div>" />
```

///

::: tip Tip
To be able to use gestures in WebView component on Android, we should first disabled the zoom control. To do that we could access the android property and with the help of setDisplayZoomControls to set this control to false.
:::

#### Props

| Name           | Type        | Description                                                                                                                                    |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`          | `String`    | Gets or sets the displayed web content.<br/>Valid values: an absolute URL, the path to a local HTML file, or static HTML.                      |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](http://docs.nativescript.org/api-reference/modules/_ui_web_view_.html) |

<!-- TODO: fix links -->

#### Events

| Name           | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `loadStarted`  | Emitted when the page has started loading in the `<WebView>`.  |
| `loadFinished` | Emitted when the page has finished loading in the `<WebView>`. |

#### Native component

| Android                                                                                    | iOS                                                                       |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [`android.webkit.WebView`](https://developer.android.com/reference/android/webkit/WebView) | [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) |

## CSS

You change the looks and appearance of views (elements) in a NativeScript application similarly to how you do it in a web application using Cascading Style Sheets (CSS) or changing the style object of the elements in JavaScript. Only a subset of the CSS language is supported.

Similarly to the DOM Style Object, each View instance exposes a style property, which holds all the style properties for the view. When the view is displayed, all its style properties are applied to the underlying native widget.

---

### Supported CSS Properties

This list of properties can be set in CSS or through the style property of each view:

<!-- TODO: fix links -->

| CSS Property          | JavaScript Property   | Description                                                                                                                                                                                                                               |
| :-------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`               | `color`               | Sets a solid-color value to the matched view’s foreground.                                                                                                                                                                                |
| `background`          | `background`          | Sets a solid-color value or [a linear gradient](https://docs.nativescript.org/cookbook/ui/styling) to the matched view’s background.                                                                                                      |
| `background-color`    | `backgroundColor`     | Sets a solid-color value to the matched view’s background.                                                                                                                                                                                |
| `placeholder-color`   | `placeholderColor`    | Sets the placeholder (hint) font color to matched views.                                                                                                                                                                                  |
| `background-image`    | `backgroundImage`     | Sets a image url to the matched view’s background image.                                                                                                                                                                                  |
| `background-repeat`   | `backgroundRepeat`    | Sets if/how the background image should be repeated. Possible values: `repeat`, `repeat-x`, `repeat-y`, `no-repeat`                                                                                                                       |
| `background-position` | `backgroundPosition`  | Sets the starting position of the background image. You can set the position with absolute, percent or alignment values. More info [here](http://www.w3schools.com/cssref/pr_background-position.asp).                                    |
| `background-size`     | `backgroundSize`      | Sets the size of the background image. Possible values: "_length length_", "_percent% percent%_", "cover" or "contain".                                                                                                                   |
| `border-color`        | `borderColor`         | Sets border colors to the matched view’s.                                                                                                                                                                                                 |
| `border-top-color`    | `borderTopColor`      | Sets a top border color to the matched view’s.                                                                                                                                                                                            |
| `border-right-color`  | `borderRightColor`    | Sets a right border color to the matched view’s.                                                                                                                                                                                          |
| `border-bottom-color` | `borderBottomColor`   | Sets a bottom border color to the matched view’s.                                                                                                                                                                                         |
| `border-left-color`   | `borderLeftColor`     | Sets a left border color to the matched view’s.                                                                                                                                                                                           |
| `border-width`        | `borderWidth`         | Sets border widths to the matched view’s.                                                                                                                                                                                                 |
| `border-top-width`    | `borderTopWidth`      | Sets a top border width to the matched view’s.                                                                                                                                                                                            |
| `border-right-width`  | `borderRightWidth`    | Sets a right border width to the matched view’s.                                                                                                                                                                                          |
| `border-bottom-width` | `borderBottomWidth`   | Sets a bottom border width to the matched view’s.                                                                                                                                                                                         |
| `border-left-width`   | `borderLeftWidth`     | Sets a left border width to the matched view’s.                                                                                                                                                                                           |
| `border-radius`       | `borderRadius`        | Sets a border radius to the matched view’s.                                                                                                                                                                                               |
| `box-shadow`          | `boxShadow`           | Sets a box shadow to the matched view's.                                                                                                                                                                                                  |
| `font`                | `font`                | Sets the font properties (this includes `font-family`, `font-size`, `font-style` and `font-weight`) of the matched view.                                                                                                                  |
| `font-family`         | `fontFamily`          | Sets the font family of the matched view.                                                                                                                                                                                                 |
| `font-size`           | `fontSize`            | Sets the font size of the matched view (only supports device-independent units).                                                                                                                                                          |
| `font-style`          | `fontStyle`           | Sets the font style of the matched view. Possible values: `italic`, `normal`.                                                                                                                                                             |
| `font-weight`         | `fontWeight`          | Sets the font weight of the matched view Possible values: `bold`, `normal` OR `100`,`200`,`300`,`400`,`500`,`600`,`700`,`800`,`900`, where `400` is `normal` and `700` is `bold` (NOTE: Some fonts do not support all available variants) |
| `text-align`          | `textAlignment`       | Sets text alignment in the matched view. Possible values: `left` , `center`, `right`.                                                                                                                                                     |
| `text-decoration`     | `textDecoration`      | Sets the text formatting. Possible values: `none`, `line-through`, `underline`.                                                                                                                                                           |
| `text-transform`      | `textTransform`       | Sets the text transform. Possible values: `none`, `capitalize`, `uppercase`, `lowercase`.                                                                                                                                                 |
| `letter-spacing`      | `letterSpacing`       | Sets the text letter spacing. (On Android API Level 21 and above.)                                                                                                                                                                        |
| `line-height`         | `lineHeight`          | Sets the text line height                                                                                                                                                                                                                 |
| `z-index`             | `zIndex`              | Sets the z-index. (On Android API Level 21 and above.)                                                                                                                                                                                    |
| `clip-path`           | `clip-path`           | Sets the clip-path. Supported shapes are circle, ellipse, rect and polygon. You can define your own shape using [clippy](http://bennettfeely.com/clippy/)                                                                                 |
| `vertical-align`      | `verticalAlignment`   | Sets the vertical alignment of the current view within its parent. Possible values: `top`, `center`, `bottom`, `stretch`.                                                                                                                 |
| `horizontal-align`    | `horizontalAlignment` | Sets the horizontal alignment of the current view within its parent. Possible values: `left`, `center`, `right`, `stretch`.                                                                                                               |
| `margin`              | `margin`              | Sets the margin of the view within its parent.                                                                                                                                                                                            |
| `margin-top`          | `marginTop`           | Sets the top margin of the view within its parent.                                                                                                                                                                                        |
| `margin-right`        | `marginRight`         | Sets the right margin of the view within its parent.                                                                                                                                                                                      |
| `margin-bottom`       | `marginBottom`        | Sets the bottom margin of the view within its parent.                                                                                                                                                                                     |
| `margin-left`         | `marginLeft`          | Sets the left margin of the view within its parent.                                                                                                                                                                                       |
| `width`               | `width`               | Sets the view width.                                                                                                                                                                                                                      |
| `height`              | `height`              | Sets the view height.                                                                                                                                                                                                                     |
| `min-width`           | `minWidth`            | Sets the minimal view width.                                                                                                                                                                                                              |
| `min-height`          | `minHeight`           | Sets the minimal view height.                                                                                                                                                                                                             |
| `padding`             | `padding`             | Sets the distance between the boundaries of the layout container and its children.                                                                                                                                                        |
| `padding-top`         | `paddingTop`          | Sets the top padding of a layout container.                                                                                                                                                                                               |
| `padding-right`       | `paddingRight`        | Sets the right padding of a layout container.                                                                                                                                                                                             |
| `padding-bottom`      | `paddingBottom`       | Sets the bottom padding of a layout container.                                                                                                                                                                                            |
| `padding-left`        | `paddingLeft`         | Sets the left padding of a layout container.                                                                                                                                                                                              |
| `text-shadow`         | `textShadow`          | Sets a text shadow on a label.                                                                                                                                                                                                            |
| `visibility`          | `visibility`          | Sets the view visibility. Possible values: `visible`, `collapse` (or `collapsed`).                                                                                                                                                        |
| `opacity`             | `opacity`             | Sets the view opacity. The value is in the [0, 1] range.                                                                                                                                                                                  |

### NativeScript Specific CSS Properties

In the context of mobile development, there are a number of properties that are mobile specific (and sometimes even platform specific e.g Android or iOS). In NativeScript, these featured properties are still accessible through both the code (inline, JavaScript, and TypeScript) but are also exposed as CSS properties. Apart from the API references, the below list is providing most of the non-common CSS properties in NativeScript.

| CSS Property                           | JavaScript Property                | Platform    | Compatibility | Description                                                                                                                      |
| :------------------------------------- | :--------------------------------- | :---------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| `tab-text-color`                       | `tabTextColor`                     | Both        | `TabView`     | Sets the text color of the tabs titles.                                                                                          |
| `selected-tab-text-color`              | `selectedTabTextColor`             | Both        | `TabView`     | Sets the color of the text, while selecting some of the tabs.                                                                    |
| `tab-background-color`                 | `tabBackgroundColor`               | Both        | `TabView`     | Sets the background color of the tabs.                                                                                           |
| `tab-text-font-size`                   | `tabTextFontSize`                  | Both        | `TabView`     | Sets the tab titles font size, without changing the font size of all contents of the tab.                                        |
| `text-transform`                       | `textTransform`                    | Both        | `TabViewItem` | Sets the text transform individually for every `TabViewItem`. Value options: `capitalize`, `lowercase`, `none`, and `uppercase`. |
| `android-selected-tab-highlight-color` | `androidSelectedTabHighlightColor` | **Android** | `TabView`     | Sets the underline color of the tabs in Android.                                                                                 |
| `android-elevation`                    | `androidElevation`                 | **Android** | `View`        | Sets the elevation of the View in Android.                                                                                       |
| `android-dynamic-elevation-offset `    | `androidDynamicElevationOffset`    | **Android** | `View`        | Sets the elevation of the View in Android, which will be shown when an action was performed(e.g. `tap`, `touch`).                |
| `off-background-color`                 | `offBackgroundColor`               | Both        | `Switch`      | Sets the background color of the Switch when it is turned off.                                                                   |
| `highlight-color`                      | `highlightColor`                   | Both        | `TabStrip`    | Gets or sets the underline color of the selected `TabStripItem`.                                                                 |

::: warning Note
Currently, we can set only the `backgroundColor`, `color`, `fontFamily`, `fontSize`, `fontStyle`, `fontWeight` and `textTransform` styling properties to the `Label` and `Image` components inside the TabStripItem. More about the usage of those properties can be found in the [Supported CSS Properties](#supported-css-properties) section.
:::

::: warning Note
On iOS, the TabStripItems can not be stylied individually.
:::

#### Using the `androidElevation` property on Android

Since {N} 5.4, a new Android-specific property, called androidElevation, is introduced. View's elevation is represented by Zproperty and determines the visual appearance of its shadow. With higher elevation value larger, softer shadows will be set to the View and smaller shadow while using lower elevation.

```html
<StackLayout class="home-panel">
  <TextView
    class="tvElevation"
    editable="false"
    textWrap="true"
    text="TextView"
  ></TextView>
  <label androidElevation="5" class="sampleLabel" textWrap="true" text="Label"></label>
  <button androidElevation="7" class="sampleButton" text="Button"></button>
</StackLayout>
```

```css
.tvElevation {
  android-elevation: 5;
}
```

::: warning Note
Since NativeScript 5.4, the buttons on Android have default elevation (shadow) of 2, to provide Material Design elevation support. Removing the shadow will allow you to create a transparent button. To explicitly remove the elevation, set the android-elevation property to `0` as shown below:

```css
.btn-no-elevation {
  android-elevation: 0;
}
```

:::

#### Using the `androidDynamicElevationOffset` property on Android

Another property introduced with {N} 5.4 is androidDynamicElevationOffset. This property allows setting an elevation, which will be shown when an action was performed. Those actions can be, for example, tap, touch etc.

Example:

```html
<StackLayout class="home-panel">
  <button
    androidElevation="7"
    androidDynamicElevationOffset="8"
    class="sampleButton"
    text="Button"
  ></button>
  <button class="sampleButton2" text="Button"></button>
</StackLayout>
```

```css
.sampleButton2 {
  background-color: lightcyan;
  android-elevation: 7;
  android-dynamic-elevation-offset: 7;
}
```

### Supported Selectors

::: warning Note
Currently the CSS support is limited only to the selectors and properties listed in the current documentation.
:::

NativeScript supports a subset of the [CSS selector syntax](http://www.w3schools.com/cssref/css_selectors.asp). Here is how to use the supported selectors:

- [Type selector](#type-selector)
- [Class selector](#class-selector)
- [ID selector](#id-selector)
- [Hierarchical selector](#hierarchical-selector-css-combinators)
- [Attribute selector](#attribute-selector)
- [Pseudo selector](#pseudo-selector)

#### Type Selector

Like [CSS element selectors](http://www.w3schools.com/cssref/sel_element.asp), type selectors in NativeScript select all views of a given type. Type selectors are case insensitive, so you can use both `button` and `Button`.

```CSS
button { background-color: gray }
```

#### Class Selector

[Class selectors](http://www.w3schools.com/cssref/sel_class.asp) select all views with a given class.
The class is set using the `className` property of the view.

::: warning Note
To use `className` in JS/TS to add a class to an element, the class rule must be in a CSS file that is higher up the component tree than the element, such as `app.css`.
:::

```html
<label className="title"></label>
```

```css
.title {
  font-size: 32;
}
```

```ts
import { Label } from '@nativescript/core'
const label = new Label()
label.className = 'title'
```

#### ID Selector

[Id selectors](http://www.w3schools.com/cssref/sel_id.asp) select all views with a given id. The `id` is set using the `id` property of the view.

```html
<button id="login-button"></button>
```

```css
#login-button {
  background-color: blue;
}
```

```ts
import { Button } from '@nativescript/core'
const btn = new Button()
btn.id = 'login-button'
```

#### Attribute Selector

```html
<button testAttr="flower"></button>
```

```css
button[testAttr] {
  background-color: blue;
}
```

This selector will select all buttons that have the attribute `testAttr` with some value.

Also, some more advanced scenarios are supported:

- button[testAttr='flower'] {...} - Will apply CSS on every button that has the `testAttr` property set exactly to the value `flower`.
- button[testAttr~='flower'] {...} - Selects all buttons with a `testAttr` property that contains a space-separated list of words, one of which is "flower".
- button[testAttr|='flower'] {...} - Selects all buttons with a `testAttr` property value that begins with "flower". The value has to be a whole word, either alone like `btn['testAttr'] = 'flower'`, or followed by hyphen (-), like `btn['testAttr'] = 'flower-house'`.
- button[testAttr^='flower'] {...} - Selects all buttons with a `testAttr` property value that begins with "flower". The value does not have to be a whole word.
- button[testAttr$='flower'] {...} - Selects all buttons with a `testAttr` property value that ends with "flower". The value does not have to be a whole word.
- button[testAttr*='flo'] {...} - Selects all buttons with a `testAttr` property value that contains "flo". The value does not have to be a whole word.

Attribute selectors could be used alone or could be combined with all type of CSS selectors.

```html
<button id="login-button" testAttr="flower"></button>
<label testAttr="some value"></label>
```

```css
#login-button[testAttr='flower'] {
  background-color: blue;
}
[testAttr] {
  color: white;
}
```

#### Pseudo Selector

A pseudo-selector or also pseudo-class is used to define a special state of an element. Currently, NativeScript supports only :highlighted pseudo-selector.

```html
<button testAttr="flower"></button>
```

```css
button:highlighted {
  background-color: red;
  color: gray;
}
```

#### Hierarchical Selector (CSS Combinators)

A CSS selector could contain more than one simple selector, and between selectors a combinator symbol could be included.

- (space) - Descendant selector. For example, the following code will select all buttons inside StackLayouts (no matter) at which level.

```css
StackLayout Button {
  background-color: blue;
}
```

- (>) - A direct child selector. Using the previous example, if the CSS is changed to:

```css
StackLayout > Button {
  background-color: blue;
}
```

The background-color rule will not be applied. In order to apply the selector, the WrapLayout element would need to be removed so that the Button is a direct child of the StackLayout.

- (+) - An adjacent sibling selector, allows to select all elements, which are siblings of a specified element.

##### Direct Sibling Test by Class

```html
<StackLayout class="layout-class">
  <label text="Direct sibling test by id"></label>
  <button class="test-child" text="First Button"></button>
  <button class="test-child-2" text="Second Button"></button>
</StackLayout>
```

```css
.layout-class .test-child + .test-child-2 {
  background-color: green;
}
```

##### Direct Sibling Test by ID

```html
<StackLayout class="layout-class">
  <label text="Direct sibling test by id"></label>
  <button id="test-child" text="First Button"></button>
  <button id="test-child-2" text="Second Button"></button>
</StackLayout>
```

```css
.layout-class #test-child + #test-child-2 {
  background-color: green;
}
```

##### Direct Sibling by Type

```html
<StackLayout class="direct-sibling--type">
  <label text="Direct sibling by type"></label>
  <button text="Test Button"></button>
  <label text="Test Label"></label>
  <button text="Test Button"></button>
  <label text="Test Label"></label>
  <button text="Test Button"></button>
  <label text="Test Label"></label>
</StackLayout>
```

```css
StackLayout Button + Label {
  background-color: green;
  color: white;
}
```

### CSS Overview

---

#### Applying CSS Styles

The CSS styles can be set on 3 different levels:

- [Application-wide CSS](#application-wide-css): Applies to every application page
- [Page-specific CSS](#page-specific-css): Applies to the page's UI views
- [Component-specific CSS](#component-specific-css): Applies for component only
- [Inline CSS](#inline-css): Applies directly to a UI view

If there is CSS declared on different levels&mdash;all will be applied. The inline CSS will have the highest priority and the application CSS will have the lowest priority.

It is also possible to apply [platform-specific CSS](#platform-specific-css).

#### Application Wide CSS

When the application starts, NativeScript checks if the file app.css exists. If it does, any CSS styles that it contains are loaded and used across all application pages. This file is a convenient place to store styles that will be used on multiple pages.

You can change the name of the file from which the application-wide CSS is loaded. You need to do the change before the application is started, usually in the app.js or app.ts file as shown below:

/// flavor plain

```ts
import { Application } from '@nativescript/core'
Application.setCssFileName('style.css')

Application.run({ moduleName: 'main-page' })
```

///

/// flavor angular

```ts
platformNativeScriptDynamic({ bootInExistingPage: false, cssFile: 'style.css' })
```

///

::: tip Note
The path to the CSS file is relative to the application root folder.
:::

You could also check the name of the application-wide CSS file by using getCssFileName() method as shown below:

```ts
import { Application } from '@nativescript/core'
const fileName = Application.getCssFileName()
console.log(`fileName ${fileName}`)
```

/// flavor plain

#### Page Specific CSS

When the page's XML declaration file is loaded, NativeScript looks for a CSS file with the same name (if such exists), reads any CSS styles that it finds, and automatically loads and applies them to the page. For example, a page named mypage.xml will automatically load any CSS in mypage.css. The CSS file must exist in the same folder as the XML file to be automatically applied.

If you import any custom components on your page, the CSS from those components will be applied to the page, too. As a best practice, scope the CSS of custom components so that component styles do not "leak" on to pages.

```xml
<StackLayout class="mywidget">
  <Label text="Custom component layout" class="label" />
</StackLayout>
```

```css
/* GOOD: This will ONLY apply to the custom component */
.mywidget .label {
  color: blue;
}

/* BAD: This will apply to the custom component AND potentially to the page where the component is used */
.label {
  color: blue;
}
```

You can also override CSS styles specified in the file by using the page's css property:

```ts
page.css = 'button { color: red }'
```

///

/// flavor angular

#### Component Specific CSS

In an Angular application everything is a component, therefore, it is a very common task to add some CSS code that should only apply to one component. Adding component-specific CSS in a NativeScript-Angular app involves using a component’s styles or styleUrls property.

```ts
@Component({
    selector: 'list-test',
    styleUrls: ['style.css'],
    template: ...

// Or

@Component({
    selector: 'list-test',
    styles: ['.third { background-color: lime; }'],
    template: ...
```

///

#### Adding CSS String

This snippet adds a new style to the current set of styles. This is quite useful when you need to add a small CSS chunk to an element (for example, for testing purposes):

```ts
page.addCss('button {background-color: blue}')
```

#### Adding CSS File

This snippet adds new CSS styles to the current set. However, this method reads them from a file. It is useful for organizing styles in files and reusing them across multiple pages.

```ts
page.addCssFile(cssFileName)
```

#### Inline CSS

Similarly to HTML, CSS can be defined inline for a UI view in the XML markup:

```html
<button text="inline style" style="background-color: green;"></button>
```

#### Platform-specific CSS

NativeScript conventions make it easy to apply platform-specific CSS, either via separate stylesheets or via in-line declarations. For an overview of NativeScript's convention-based file name rules for targeting files at specific platforms and screen sizes, refer to this article in the docs.

There are 4 primary ways to target styles at iOS or Android:

/// flavor plain

1. Platform-specific stylesheets (`styles.ios.css`, `styles.android.css`)
2. Platform-specific markup blocks (`<ios> ... </ios>`, `<android> ... </android>`)
3. Platform-specific attributes (`<Label ios:style="..." android:style="..."`)
4. Platform-specific CSS rules (`.ns-ios .mystyle { ... }`, `.ns-android .mystyle { ... }`)

///

/// flavor angular

1. Platform-specific stylesheets (`styles.component.ios.css`, `styles.component.android.css`)
2. Platform-specific markup blocks (`<ios> ... </ios>`, `<android> ... </android>`)
3. Platform-specific attributes (`<Label ios:style="..." android:style="..."`)
4. Platform-specific CSS rules (`:host-content(.ns-ios) .mystyle { ... }`, `:host-context(.ns-android) .mystyle { ... }`)

///

The most common and maintainable pattern for managing platform-agnostic and platform-specific styles in NativeScript is with multiple stylesheets and CSS imports.

/// flavor plain
With this pattern, a page has 3 separate stylesheets: common, iOS and Android. For example, for page `myPage.xml` you would have 3 stylesheets:

1. `myPage-common.css`
2. `myPage.ios.css`
3. `myPage.android.css`

In both `myPage.ios.css` and `myPage.android.css` you then import the shared common styles from `myPage-common.css`:

```CSS
/* Import shared style rules */
@import './myPage-common.css';

/* Add iOS/Android specific rules (if any) */
.mystyle { ... }
```

///

/// flavor angular
With this pattern, a page (or component) has 3 separate stylesheets: common, iOS and Android. For example, for page `home.component.html` you would have 3 stylesheets:

1. `home-common.css`
2. `home.component.ios.css`
3. `home.component.android.css`

In both `home.component.ios.css` and `home.component.android.css` you then import the shared common styles from `home-common.css`:

```CSS
/* Import shared style rules */
@import './home-common.css';

/* Add iOS/Android specific rules (if any) */
.mystyle { ... }
```

///

At build time, NativeScript will automatically import the common styles and choose the correct iOS or Android stylesheet depending on the target build platform.

#### Root Views CSS Classes

To allow flexible styling and theming, NativeScript adds a CSS class to the root views in the application for specific states.

The deafult CSS classes are are:

- `.ns-root` - a class assigned to the application root view
- `.ns-modal` - a class assigned to the modal root view

The CSS classes for each application and modal root view are:

- `.ns-android`, `.ns-ios` - classes that specify the application platform
- `.ns-phone`, `.ns-tablet` - classes that specify the device type
- `.ns-portrait`, `.ns-landscape`, `.ns-unknown` - classes that specify the application orientation
- `.ns-light`, `.ns-dark` - classes that specify the system appearance.

For additional information on the Dark Mode support, refer to [this](https://docs.nativescript.org/ui/dark-mode) documentation article.

<!-- TODO: fix links -->

#### Supported Measurement Units

NativeScript supports DIPs (Device Independent Pixels), pixels (via postfix px) and percentages (partial support for width, height and margin) as measurement units.

NativeScript's recommended measurement unit is DIP. All measurable properties like width, height, margin, paddings, border-width, etc.) support device independent pixels. The font sizes are always measured in DIPs.

```css
.myLabel {
  font-size: 28;
  width: 200;
  height: 30;
}
```

The device independent pixels (DIPs) are equal to the device screen's pixels divided by the device screen scale (density).

```ts
import { Screen } from '@nativescript/core'

// mainScreen is of type ScreenMetrics interface /api-reference/interfaces/_platform_.screenmetrics
const scale = Screen.mainScreen.scale
const widthPixels = Screen.mainScreen.widthPixels
const heightPixels = Screen.mainScreen.heightPixels
const widthDIPs = Screen.mainScreen.widthDIPs // DIPs === pixels/scale (e.g. 1024 pixels / 2x scale = 512 DIPs)
const heightDIPs = Screen.mainScreen.heightDIPs
```

NativeScript supports percentage values for width, height and margins. When a layout pass begins, first the percent values are calculated based on parent available size. This means that on vertical StackLayout if you place two Buttons with height='50%' they will get all the available height (e.g., they will fill the StackLayout vertically.). The same applies for margin properties. For example, if you set marginLeft = '5%', the element will have a margin that corresponds to 5% of the parent's available width.

#### Using CSS variables

NativeScript supports CSS variables (also known as custom properties or cascading variables) for reusable values through the CSS used in the app.

CSS variables cascades from parent to child views.

Declaring variables:

```css
/* Define --my-custom-color as a global value */
.ns-root {
  --my-custom-color: black;
}

/* In landscape mode change the value to blue */
.ns-landscape {
  --my-custom-color: blue;
}
```

Overriding a variable from a child-element:

```css
/* Change --my-custom-color to green for elements below */
.ns-root .override-color {
  --my-custom-color: green;
}
```

Using a variable:

```css
.using-variable {
  color: var(--my-custom-color);
}
```

The default value of --my-undefined-value will be black. In landscape mode it will be blue. If a parent element have the class override-color the value will be green.

Using a fallback value:

```css
.using-variable {
  color: var(--my-undefined-value, yellow);
}
```

The color of --my-undefined-value will fallback to yellow, because --my-undefined-value is not defined.

Using a nested fallback value:

```css
.using-variable {
  color: var(--my-undefined-value, var(--my-custom-color, yellow));
}
```

#### Using CSS calc()

NativeScript supports CSS calc() functions for performing simple calculations on CSS values.

Syntax:

```css
element {
  width: calc(100% * 1.25); /* width: 125% */
}
```

Used with CSS variables:

```css
element {
    --my-variable: 10:
    width: calc(100% * var(--my-variable)); /* width: 125% */
}
```

#### Accessing NativeScript component properties with CSS

You can set NativeScript component properties value that are not part of the CSS specification. For example:

```CSS
StackLayout {
   orientation: horizontal;
}
```

This feature is limited to properties with simple types like string, number and boolean, and will set a local property value similar to component markup declaration in your template markup via XML or HTML. CSS inheritance is not supported.

#### Using Fonts

The `font-family` property can hold several values. The first supported font in the list will be used. There is also support for the following generic font-families:

- serif (ex. Times New Roman)
- sans-serif (ex. Helvetica)
- monospace (ex. Courier New)

Platform specifics:

- Android: The supported fonts depend very much on the system, thus using the generic font-families or [custom-fonts](#custom-fonts) is recommended.
- iOS: There are more than 30 default fonts available on iOS. You can check the [supported fonts for specific iOS versions and devices](http://iosfonts.com). To use a built-in font, simply specify the font name in the `font-family` property, such as `font-family: "American Typewriter";`. Adjust the font variant using the [`font-weight`](#supported-css-properties) property.

##### Custom fonts

You can use custom fonts in your app (in .TTF or .OTF format).
The NativeScript runtime will look for the font files under the `app/fonts/` (or `src/fonts/` if you use Angular) directory and load them automatically.

<!-- ![Custom fonts setup"](/assests/ui-and-styling/custom-fonts.png) -->

::: tip Tip
Since NativeScript 7.1, the CLI has the `ns fonts` command. Executing this command will print out the css styles you need for any custom fonts found in your application.
:::

::: warning Note
On iOS your font file should be named **exactly** as the font name.
If you have any doubt about the original font name, use the [Font Book](https://support.apple.com/en-us/HT201749) app to get the original font name, or try using `ns fonts` from your terminal using NS 7.1 or newer.
:::

#### Using Icon Fonts in NativeScript

While bitmap images are great, they present challenges in designing mobile applications. Images increase the size of the application if they are embedded in it. If not, they require additional http requests to be fetched. Images consume memory. Furthermore, bitmap images do not scale well. If scaled up, they lose quality. If scaled down, they waste space. On the other hand, fonts scale well, do not require additional http requests for each glyph and do not increase memory usage significantly. Icon fonts contain icons instead of alphabet characters and can be used instead of images in mobile applications.

1. Choose or generate an icon font that best matches your needs. Two popular icon fonts are [IcoMoon](https://icomoon.io/) and [Font Awesome](https://fontawesome.com/how-to-use/on-the-web/setup/hosting-font-awesome-yourself).
2. Once you have downloaded the icon font to your machine, locate the [TrueType](https://en.wikipedia.org/wiki/TrueType) font file with extension **.ttf**.
3. In your root application folder (This is the **app** folder for NativeScript Core, and the **src** folder for Angular 6+), create a folder called **fonts** and place the **.ttf** there.
4. Follow the instructions on the icon font webpage to determine the hex codes of each font glyph, i.e., icon. Add a **Label** component to your NativeScript app and bind the Label's **text** property to a one-letter string generated from the character code of the icon you want to show, i.e., `\ue903`. Prefix the character (in this example: e903) with a `\u`

:::tip Note

While this documentation article is focused on icon fonts, the above workflow is a hundred percent applicable for both **text fonts** and **icon fonts** (except that with text fonts step 4 as they don't include icons but only plain text).

:::

#### Platform Specific Font Recognition

There is a conceptual difference in how **.ttf** fonts are recognized on iOS and Android. On Android, the font is recognized by its **file name** while on iOS it is recognized by its **font name**. This means that fonts that are created with a font name which is different from the file name has to be registered with both names in your CSS rule.

```CSS
.fa-brands {
    font-family: "Font Awesome 5 Brands", "fa-brands-400";
}
```

In the above example, the `fa-brands-400.ttf` (as downloaded from the FontAwesome site) has a font name `Font Awesome 5 Brands`. With the above CSS, the font is recognized on both iOS (by the font name `Font Awesome 5 Brands`) and Android (by the file name `fa-brands-400`).

:::tip Note

There are specific scenarios where the creators of the fonts might have released two differently named `ttf` files but with the same **font** name (see the example below).

:::

| file name              | font name           |
| ---------------------- | ------------------- |
| **fa-solid-900.ttf**   | Font Awesome 5 Free |
| **fa-regular-400.ttf** | Font Awesome 5 Free |

Notice that in the above example the **file** names are different, but the registered **font** name is the same (use the **Font Book** application on Mac or the **Control Panel Fonts** section on Windows to see the actual font name). While this is no issue on Android, it renders the second font unusable on iOS. To handle similar cases additional CSS font properties, such as for example `font-weight`, must be added.

```CSS
/*
    File name: fa-regular-400.ttf
    Font name: Font Awesome 5 Free
*/
.far {
    font-family: "Font Awesome 5 Free", "fa-regular-400";
    font-weight: 400;
}

/*
    File name: fa-solid-900.ttf
    Font name: Font Awesome 5 Free
*/
.fas {
    font-family: "Font Awesome 5 Free", "fa-solid-900";
    font-weight: 900;
}
```

#### Import CSS

The @import CSS rule allows you to import CSS from a local file. This rule must precede all other types of rules.

```CSS
@import url('~/your-style.css');
```

#### Using SASS

With NativeScript, it is possible to manage your app styles using the SASS CSS pre-compiler instead of plain CSS files. Just as with web projects, SASS gives your stylesheets extra capabilities like shared variables, mixins and nested style tags.

To use SASS with NativeScript, a SASS compiler like [`sass`](https://www.npmjs.com/package/sass) is required. This compiler will hook-in to the NativeScript build process and automatically convert `.scss/.sass` files to `.css` during `build` and `livesync` operations. Since SASS is compiled to CSS at build time, it does **not** require any changes to your stylesheet naming conventions for NativeScript's normal convention-based patterns to work. SASS files with the same name as a NativeScript page will still be automatically linked.

You can use SASS with either enabling it manually:

```cli
npm i sass --save-dev
```

Or by using a template that has SASS already enabled. For example:

```cli
ns create  mySassApp --template @nativescript/template-drawer-navigation-ts
```

For projects created with NativeScript 5.x and below (which are using the legacy `nativescript-dev-webpack`), you can run the `migrate` command to update the SASS compiler (and remove the legacy plugin). Note that the `migrate` command is available in NativeScript CLI 6 and above.

```cli
ns migrate
```
