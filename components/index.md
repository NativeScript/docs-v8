---
title: Components
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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/absolute_layout_grid.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/absolute_layout_overlap.svg" />

#### Props

| Name           | Type        | Description                                                                                                                                 |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `N/A`          | `N/A`       | None.                                                                                                                                       |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/absolutelayout) |

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/dock_layout_no_stretch.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/dock_layout_stretch.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/dock_layout_all_sides_and_stretch.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/dock_layout_multiple_on_same_side.svg" />

#### Props

| Name               | Type        | Description                                                                                                                             |
| ------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `stretchLastChild` | `Boolean`   | Enables or disables stretching the last child to fit the remaining space.                                                               |
| `...Inherited`     | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/docklayout) |

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/grid_layout.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/grid_layout_star_sizing.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/grid_layout_fixed_auto.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/grid_layout_complex.svg" />

#### Props

| Name           | Type        | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns`      | `String`    | A string value representing column widths delimited with commas.<br/>Valid values: an absolute number, `auto`, or `*`.<br/>A number indicates an absolute column width. `auto` makes the column as wide as its widest child. `*` makes the column occupy all available horizontal space. The space is proportionally divided over all star-sized columns. You can set values such as `3*` and `5*` to indicate a ratio of 3:5 in sizes. |
| `rows`         | `String`    | A string value representing row heights delimited with commas.<br/>Valid values: an absolute number, `auto`, or `*`.<br/>A number indicates an absolute row height. `auto` makes the row as tall as its tallest child. `*` makes the row occupy all available vertical space. The space is proportionally divided over all star-sized rows. You can set values such as `3*` and `5*` to indicate a ratio of 3:5 in sizes.               |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/gridlayout)                                                                                                                                                                                                                                                                                                 |

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/stack_layout_vertical.svg" />

#### Example: Horizontal stacking

The following example creates a horizontal stack of 3 equally-sized elements. Items are stretched to cover the entire height of the screen. Items are placed in the order they were declared in.

```html
<StackLayout orientation="horizontal" backgroundColor="#3c495e">
  <label text="first" width="70" backgroundColor="#43b883" />
  <label text="second" width="70" backgroundColor="#289062" />
  <label text="third" width="70" backgroundColor="#1c6b48" />
</StackLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/stack_layout_horizontal.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/stack_layout_vertical_align_children.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/stack_layout_horizontal_align_children.svg" />

#### Props

| Name           | Type        | Description                                                                                                                              |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `orientation`  | `String`    | Specifies the stacking direction.<br/>Valid values: `vertical` and `horizontal`.<br/>Default value: `vertical`.                          |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/stacklayout) |

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/wrap_layout_horizontal.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/wrap_layout_vertical.svg" />

#### Props

| Name           | Type        | Description                                                                                                                                                            |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orientation`  | `String`    | Specifies the stacking direction.<br/>Valid values: `horizontal` (arranges items in rows) and `vertical` (arranges items in columns).<br/>Default value: `horizontal`. |
| `itemWidth`    | `Number`    | Sets the width used to measure and layout each child.<br/>Default value: `Number.NaN`, which does not restrict children.                                               |
| `itemHeight`   | `Number`    | Sets the height used to measure and layout each child.<br/>Default value is `Number.NaN`, which does not restrict children.                                            |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/wraplayout)                                |

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/flexbox_layout_row_stretch.svg" />

#### Example: Column flex layout

The following example creates a column of three equally-sized elements that span across the entire width of the screen.

```html
<FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
  <label text="first" height="70" backgroundColor="#43b883" />
  <label text="second" height="70" backgroundColor="#1c6b48" />
  <label text="third" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/flexbox_layout_column_stretch.svg" />

#### Example: Row flex layout with items aligned to `flex-start`

The following example creates a row of three items placed at the top of the screen. Items are placed in the order they were declared in.

```html
<FlexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
  <label text="first" width="70" height="70" backgroundColor="#43b883" />
  <label text="second" width="70" height="70" backgroundColor="#1c6b48" />
  <label text="third" width="70" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/flexbox_layout_row_flex-start.svg" />

#### Example: Row flex layout with custom order

The following example creates a row of three items placed at the top of the screen. Items are placed in a customized order.

```html
<FlexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
  <label text="first" order="2" width="70" height="70" backgroundColor="#43b883" />
  <label text="second" order="3" width="70" height="70" backgroundColor="#1c6b48" />
  <label text="third" order="1" width="70" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/flexbox_layout_row_custom_order.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/flexbox_layout_wrap.svg" />

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

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript.org/layouts/flexbox_layout_column_reverse_space_around_align_self.svg" />

#### Props

| Name             | Type        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `flexDirection`  | `String`    | Sets the direction for placing child elements in the flexbox container.<br/>Valid values:<br/>`row` (horizontal, left to right),<br/>`row-reverse` (horizontal, right to left),<br/>`column` (vertical, top to bottom), and<br/>`column-reverse` (vertical, bottom to top).<br/>Default value: `row`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `flexWrap`       | `String`    | Sets whether child elements are forced in a single line or can flow into multiple lines. If set to multiple lines, also defines the cross axis which determines the direction new lines are stacked in.<br/>Valid values:<br/>`nowrap` (single line which may cause the container to overflow),<br/>`wrap` (multiple lines, direction is defined by `flexDirection`),and<br/>`wrap-reverse` (multiple lines, opposite to the direction defined by `flexDirection`).<br/>Default value: `nowrap`.                                                                                                                                                                                                                                                                               |
| `justifyContent` | `String`    | Sets the alignment of child elements along the main axis. You can use it to distribute leftover space when all the child elements on a line are inflexible or are flexible but have reached their maximum size. You can also use it to control the alignment of items when they overflow the line.<br/>Valid values:<br/>`flex-start` (items are packed toward the start line),<br/>`flex-end` (items are packed toward the end line),<br/>`center` (items are centered along the line),<br/>`space-between` (items are evenly distributed on the line; first item is on the start line, last item on the end line), and<br/>`space-around` (items are evenly distributed on the line with equal space around them).<br/>Default value: `flex-start`.                          |
| `alignItems`     | `String`    | (Android-only) Sets the alignment of child elements along the cross axis on the current line. Acts as `justifyContent` for the cross axis.<br/>Valid values:<br/>`flex-start` (cross-start margin edge of the items is placed on the cross-start line),<br/>`flex-end` (cross-end margin edge of the items is placed on the cross-end line),<br/>`center` (items are centered оn the cross axis),<br/>`baseline` (the item baselines are aligned), and<br/>`stretch` (items are stretched to fill the container but respect `min-width` and `max-width`).<br/>Default value: `stretch`.                                                                                                                                                                                        |
| `alignContent`   | `String`    | Sets how lines are aligned in the flex container on the cross axis, similar to how `justifyContent` aligns individual items within the main axis.<br/> This property has no effect when the flex container has only one line.<br/>Valid values:<br/>`flex-start` (lines are packed to the start of the container),<br/>`flex-end` (lines are packed to the end of the container),<br/>`center` (lines are packed to the center of the container),<br/>`space-between` (lines are evenly distributed; the first line is at the start of the container while the last one is at the end),<br/>`space-around` (lines are evenly distributed with equal space between them), and<br/>`stretch` (lines are stretched to take up the remaining space).<br/>Default value: `stretch`. |
| `...Inherited`   | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/flexboxlayout)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

#### Additional children props

When an element is a direct child of `<FlexboxLayout>`, you can work with the following additional properties.

| Name             | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `order`          | `Number`  | Sets the order in which child element appear in relation to one another.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `flexGrow`       | `Number`  | Indicates that the child should grow in size, if necessary. Sets how much the child will grow in proportion to the rest of the child elements in the flex container.                                                                                                                                                                                                                                                                                                                                    |
| `flexShrink`     | `Number`  | Indicates that the child should shrink when the row runs out of space. Sets how much the flex item will shrink in proportion to the rest of the child elements in the flex container. When not specified, its value is set to `1`.                                                                                                                                                                                                                                                                      |
| `alignSelf`      | `String`  | (Android-only) Overrides the `alignItems` value for the child.<br/>Valid values:<br/>`flex-start` (cross-start margin edge of the item is placed on the cross-start line),<br/>`flex-end` (cross-end margin edge of the item is placed on the cross-end line),<br/>`center` (item is centered on the cross axis),<br/>`baseline` (the item baselines are aligned), and<br/>`stretch` (items is stretched to fill the container but respects `min-width` and `max-width`).<br/>Default value: `stretch`. |
| `flexWrapBefore` | `Boolean` | When `true`, forces the item to wrap onto a new line. This property is not part of the official Flexbox specification.<br/>Default value: `false`.                                                                                                                                                                                                                                                                                                                                                      |
