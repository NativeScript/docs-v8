---
title: UI & Styling
---

## Layouts

- [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/ui/layouts/layout.md

### User Interface Layout Process

NativeScript provides a recursive layout system that sizes and positions views on the screen. Layout is the process of measuring and positioning of Layout containers and their child views. Layout is an intensive process whose speed and performance depend on the count of the children and the complexity of the layout container. For example, a simple layout container such as `AbsoluteLayout` might perform better than a more complex layout container, such as `GridLayout`.

Layout completes in two passes&mdash;a measure pass and a layout pass. To this end, each `View` provides a `measure` and `layout` methods. Additionally, each layout container provides its own `onMeasure` and `onLayout` to achieve its own specific layout.

> Looking for a fun and easy way to learn about NativeScript layout containers? Try the interactive tutorials available at [nslayouts.com](https://www.nslayouts.com/)!

#### Measure Pass

During the measure pass, each `View` is measured to retrieve its desired size. The measure pass evaluates the following properties:

- width
- height
- minWidth
- minHeight
- visibility
- marginTop
- marginRight
- marginBottom
- marginLeft

#### Layout Pass

During the layout pass, each `View` is placed in a specific layout slot. This slot is determined by the desired size of the view (retrieved from the measure pass) and the following properties:

- marginTop
- marginRight
- marginBottom
- marginLeft
- horizontalAlignment
- verticalAlignment

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

### LayoutBase

`LayoutBase` is the base class for all views that provide positioning of child elements.

You can use the various layout containers to position elements. They evaluate the base properties of `View` such as `width`, `height`, `minWidth` and alignments, and expose additional specific properties for positioning child views.

#### Predefined Layouts

The following table shows predefined layouts that NativeScript provides.

| Layouts                          | Description                                                                                                                                                     | Screenshot                                                                                                |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [FlexboxLayout][flexboxlayout]   | This layout is a non-conforming implementation of the [CSS Flexible Box Layout](https://www.w3.org/TR/css-flexbox-1/)                                           | ![FlexboxLayout android](/assets/images/gallery/android/flexboxLayoutPage.png 'FlexboxLayout android')    |
| [AbsoluteLayout][absolutelayout] | This layout lets you set exact locations (left/top coordinates) for its children.                                                                               | ![AbsoluteLayout android](/assets/images/gallery/android/absoluteLayoutPage.png 'AbsoluteLayout android') |
| [DockLayout][docklayout]         | This layout arranges its children at its outer edges and allows its last child to take up the remaining space.                                                  | ![DockLayout android](/assets/images/gallery/android/dockLayoutPage.png 'DockLayout android')             |
| [GridLayout][gridlayout]         | This layout defines a rectangular layout area that consists of columns and rows.                                                                                | ![GridLayout android](/assets/images/gallery/android/gridLayoutPage.png 'GridLayout android')             |
| [StackLayout][stacklayout]       | This layout arranges its children horizontally or vertically. The direction is set with the orientation property.                                               | ![StackLayout android](/assets/images/gallery/android/stackLayoutPage.png 'StackLayout android')          |
| [WrapLayout][wraplayout]         | This layout positions its children in rows or columns, based on the orientation property, until the space is filled and then wraps them on a new row or column. | ![WrapLayout android](/assets/images/gallery/android/wrapLayoutPage.png 'WrapLayout android')             |

## Layout Containers

### AbsoluteLayout

The `<AbsoluteLayout>` container is the simplest layout container in NativeScript.

`<AbsoluteLayout>` has the following behavior:

- Uses a pair of absolute left/top coordinates to position its children.
- Doesn't enforce any layout constraints on its children.
- Doesn't resize its children at runtime when its size changes.

#### A grid-like layout

The following example creates a simple grid. For more information about creating grid layouts, see [GridLayout](/en/docs/elements/layouts/grid-layout).

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

#### Overlapping elements

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

None.

#### Additional children props

When an element is a direct child of `<AbsoluteLayout>`, you can work with the following additional properties.

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

#### Dock to every side without stretching the last child

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

#### Dock to every side and stretch the last child

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

#### Dock to every side and the center

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

#### Dock multiple children to the same side

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

| Name               | Type      | Description                                                               |
| ------------------ | --------- | ------------------------------------------------------------------------- |
| `stretchLastChild` | `Boolean` | Enables or disables stretching the last child to fit the remaining space. |

#### Additional children props

When an element is a direct child of `<DockLayout>`, you can work with the following additional properties.

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

See [Props](#props) for more information.

#### Grid layout with fixed sizing

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

#### Grid layout with star sizing

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

#### Grid layout with fixed and auto sizing

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

#### Grid layout with mixed sizing and merged cells

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

| Name      | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns` | `String` | A string value representing column widths delimited with commas.<br/>Valid values: an absolute number, `auto`, or `*`.<br/>A number indicates an absolute column width. `auto` makes the column as wide as its widest child. `*` makes the column occupy all available horizontal space. The space is proportionally divided over all star-sized columns. You can set values such as `3*` and `5*` to indicate a ratio of 3:5 in sizes. |
| `rows`    | `String` | A string value representing row heights delimited with commas.<br/>Valid values: an absolute number, `auto`, or `*`.<br/>A number indicates an absolute row height. `auto` makes the row as tall as its tallest child. `*` makes the row occupy all available vertical space. The space is proportionally divided over all star-sized rows. You can set values such as `3*` and `5*` to indicate a ratio of 3:5 in sizes.               |

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

#### Default stacking

The following example creates a vertical stack of 3 equally-sized elements. Items are stretched to cover the entire width of the screen. Items are placed in the order they were declared in.

::: danger Important
Try not to nest too many `<StackLayout/>` in your markup. If you find yourself nesting a lot of `<StackLayout/>`
you will likely get better performance by switching to a `<GridLayout/>` or `<FlexboxLayout/>`.
See [Layout Nesting](/common-pitfalls.html#layout-nesting) for more information.
:::

```html
<StackLayout backgroundColor="#3c495e">
  <label text="first" height="70" backgroundColor="#43b883" />
  <label text="second" height="70" backgroundColor="#289062" />
  <label text="third" height="70" backgroundColor="#1c6b48" />
</StackLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/stack_layout_vertical.svg" />

#### Horizontal stacking

The following example creates a horizontal stack of 3 equally-sized elements. Items are stretched to cover the entire height of the screen. Items are placed in the order they were declared in.

```html
<StackLayout orientation="horizontal" backgroundColor="#3c495e">
  <label text="first" width="70" backgroundColor="#43b883" />
  <label text="second" width="70" backgroundColor="#289062" />
  <label text="third" width="70" backgroundColor="#1c6b48" />
</StackLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/stack_layout_horizontal.svg" />

#### Stack layout with horizontally aligned children

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

#### Horizontal stack layout with vertically aligned children

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

| Name          | Type     | Description                                                                                                     |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `orientation` | `String` | Specifies the stacking direction.<br/>Valid values: `vertical` and `horizontal`.<br/>Default value: `vertical`. |

#### Additional children props

None.

### WrapLayout

`<WrapLayout>` is a layout container that lets you position items in rows or columns, based on the `orientation` property. When the space is filled, the container automatically wraps items onto a new row or column.

#### Default wrap layout

The following example creates a row of equally-sized items. When the row runs out of space, the container wraps the last item on a new row.

```html
<WrapLayout backgroundColor="#3c495e">
  <label text="first" width="30%" height="30%" backgroundColor="#43b883" />
  <label text="second" width="30%" height="30%" backgroundColor="#1c6b48" />
  <label text="third" width="30%" height="30%" backgroundColor="#289062" />
  <label text="fourth" width="30%" height="30%" backgroundColor="#289062" />
</WrapLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/wrap_layout_horizontal.svg" />

#### Vertical wrap layout

The following example creates a column of equally-sized items. When the row runs out of space, the container wraps the last item on a new column.

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

| Name          | Type     | Description                                                                                                                                                            |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `orientation` | `String` | Specifies the stacking direction.<br/>Valid values: `horizontal` (arranges items in rows) and `vertical` (arranges items in columns).<br/>Default value: `horizontal`. |
| `itemWidth`   | `Number` | Sets the width used to measure and layout each child.<br/>Default value: `Number.NaN`, which does not restrict children.                                               |
| `itemHeight`  | `Number` | Sets the height used to measure and layout each child.<br/>Default value is `Number.NaN`, which does not restrict children.                                            |

#### Additional children props

None.

### FlexboxLayout

`<FlexboxLayout>` is a layout container that provides a non-exact implementation of the [CSS Flexbox layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). This layout lets you arrange child components both horizontally and vertically.

#### Default flex layout

The following example creates a row of three equally-sized elements that span across the entire height of the screen.

```html
<FlexboxLayout backgroundColor="#3c495e">
  <label text="first" width="70" backgroundColor="#43b883" />
  <label text="second" width="70" backgroundColor="#1c6b48" />
  <label text="third" width="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_row_stretch.svg" />

#### Column flex layout

The following example creates a column of three equally-sized elements that span across the entire width of the screen.

```html
<FlexboxLayout flexDirection="column" backgroundColor="#3c495e">
  <label text="first" height="70" backgroundColor="#43b883" />
  <label text="second" height="70" backgroundColor="#1c6b48" />
  <label text="third" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_column_stretch.svg" />

#### Row flex layout with items aligned to `flex-start`

The following example creates a row of three items placed at the top of the screen. Items are placed in the order they were declared in.

```html
<FlexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
  <label text="first" width="70" height="70" backgroundColor="#43b883" />
  <label text="second" width="70" height="70" backgroundColor="#1c6b48" />
  <label text="third" width="70" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_row_flex-start.svg" />

#### Row flex layout with custom order

The following example creates a row of three items placed at the top of the screen. Items are placed in a customized order.

```html
<FlexboxLayout alignItems="flex-start" backgroundColor="#3c495e">
  <label text="first" order="2" width="70" height="70" backgroundColor="#43b883" />
  <label text="second" order="3" width="70" height="70" backgroundColor="#1c6b48" />
  <label text="third" order="1" width="70" height="70" backgroundColor="#289062" />
</FlexboxLayout>
```

<img class="md:w-1/2 lg:w-1/3" src="https://art.nativescript-vue.org/layouts/flexbox_layout_row_custom_order.svg" />

#### Row flex layout with wrapping

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

#### Column flex layout with reverse order and items with a different `alignSelf`

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

| Name             | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `flexDirection`  | `String` | Sets the direction for placing child elements in the flexbox container.<br/>Valid values:<br/>`row` (horizontal, left to right),<br/>`row-reverse` (horizontal, right to left),<br/>`column` (vertical, top to bottom), and<br/>`column-reverse` (vertical, bottom to top).<br/>Default value: `row`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `flexWrap`       | `String` | Sets whether child elements are forced in a single line or can flow into multiple lines. If set to multiple lines, also defines the cross axis which determines the direction new lines are stacked in.<br/>Valid values:<br/>`nowrap` (single line which may cause the container to overflow),<br/>`wrap` (multiple lines, direction is defined by `flexDirection`),and<br/>`wrap-reverse` (multiple lines, opposite to the direction defined by `flexDirection`).<br/>Default value: `nowrap`.                                                                                                                                                                                                                                                                               |
| `justifyContent` | `String` | Sets the alignment of child elements along the main axis. You can use it to distribute leftover space when all the child elements on a line are inflexible or are flexible but have reached their maximum size. You can also use it to control the alignment of items when they overflow the line.<br/>Valid values:<br/>`flex-start` (items are packed toward the start line),<br/>`flex-end` (items are packed toward the end line),<br/>`center` (items are centered along the line),<br/>`space-between` (items are evenly distributed on the line; first item is on the start line, last item on the end line), and<br/>`space-around` (items are evenly distributed on the line with equal space around them).<br/>Default value: `flex-start`.                          |
| `alignItems`     | `String` | (Android-only) Sets the alignment of child elements along the cross axis on the current line. Acts as `justifyContent` for the cross axis.<br/>Valid values:<br/>`flex-start` (cross-start margin edge of the items is placed on the cross-start line),<br/>`flex-end` (cross-end margin edge of the items is placed on the cross-end line),<br/>`center` (items are centered оn the cross axis),<br/>`baseline` (the item baselines are aligned), and<br/>`stretch` (items are stretched to fill the container but respect `min-width` and `max-width`).<br/>Default value: `stretch`.                                                                                                                                                                                        |
| `alignContent`   | `String` | Sets how lines are aligned in the flex container on the cross axis, similar to how `justifyContent` aligns individual items within the main axis.<br/> This property has no effect when the flex container has only one line.<br/>Valid values:<br/>`flex-start` (lines are packed to the start of the container),<br/>`flex-end` (lines are packed to the end of the container),<br/>`center` (lines are packed to the center of the container),<br/>`space-between` (lines are evenly distributed; the first line is at the start of the container while the last one is at the end),<br/>`space-around` (lines are evenly distributed with equal space between them), and<br/>`stretch` (lines are stretched to take up the remaining space).<br/>Default value: `stretch`. |

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

### Activity-Indicator

`<ActivityIndicator>` is a UI component that shows a progress indicator signaling to the user of an operation running in the background.

---

```html
<ActivityIndicator busy="true" @busyChange="onBusyChanged" />
```

#### Props

| Name   | Type      | Description                                                                         |
| ------ | --------- | ----------------------------------------------------------------------------------- |
| `busy` | `Boolean` | Gets or sets whether the indicator is active. When `true`, the indicator is active. |

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

For more information about the available gestures, see [Gestures in the official NativeScript documentation](https://docs.nativescript.org/ui/gestures).

---

```html
<button text="Button" @tap="onButtonTap" />
```

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

#### Props

| Name         | Type      | Description                                                                                                      |
| ------------ | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `text`       | `String`  | Sets the label of the button.                                                                                    |
| `textWrap`   | `Boolean` | Gets or sets whether the widget wraps the text of the label. Useful for longer labels. Default value is `false`. |
| `isEnabled ` | `Boolean` | Make the button disabled or enabled. A disabled button is unusable and un-clickable. Default value is `true`.    |

#### Events

| Name  | Description                        |
| ----- | ---------------------------------- |
| `tap` | Emitted when the button is tapped. |

#### Native component

| Android                                                                                       | iOS                                                                    |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`android.widget.Button`](https://developer.android.com/reference/android/widget/Button.html) | [`UIButton`](https://developer.apple.com/documentation/uikit/uibutton) |

### Date Picker

`<DatePicker>` is a UI component that lets users select a date from a pre-configured range.

> See also: [TimePicker](/en/docs/elements/components/time-picker).

---

```html
<DatePicker :date="someDate" />
```

`<DatePicker>` provides two-way data binding using `v-model`.

```html
<DatePicker v-model="selectedDate" />
```

#### Props

| Name      | Type     | Description                                        |
| --------- | -------- | -------------------------------------------------- |
| `date`    | `Date`   | Gets or sets the complete date.                    |
| `minDate` | `Date`   | Gets or sets the earliest possible date to select. |
| `maxDate` | `Date`   | Gets or sets the latest possible date to select.   |
| `day`     | `Number` | Gets or sets the day.                              |
| `month`   | `Number` | Gets or sets the month.                            |
| `year`    | `Number` | Gets or sets the year.                             |

#### Events

| Name         | Description                             |
| ------------ | --------------------------------------- |
| `dateChange` | Emitted when the selected date changes. |

#### Native component

| Android                                                                                               | iOS                                                                            |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.widget.DatePicker`](https://developer.android.com/reference/android/widget/DatePicker.html) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker) |

### Frame

`<Frame>` is a UI component used to display [`<Page>`](/en/docs/elements/components/page) elements. Every app needs at least a single `<Frame>` element, usually set as the root element.

---

#### A single root Frame

If you are migrating from nativescript 3.x and want to preserve the old behavior, the following snippet in your entry file will create a root frame and render your default page.

```javascript
new Vue({
  render: h => h('Frame', [h(HomePageComponent)])
})
```

#### Multiple Frames

If you need to create multiple frames, you can do so by wrapping them in a Layout, for example if you want to have 2 frames side-by-side

```html
<GridLayout columns="*, *">
  <frame col="0" />
  <frame col="1" />
</GridLayout>
```

#### A frame with a default page

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

#### A frame with a default page from an external component

```html
<frame>
  <Page>
    <Home />
  </Page>
</frame>
```

```javascript
import Home from './Home'

export default {
  components: {
    Home
  }
}
```

#### Native component

| Android                                                                                                                                                                                    | iOS                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| [`org.nativescript.widgets.ContentLayout`](https://github.com/NativeScript/tns-core-modules-widgets/blob/master/android/widgets/src/main/java/org/nativescript/widgets/ContentLayout.java) | [`UINavigationController`](https://developer.apple.com/documentation/uikit/uinavigationcontroller) |

### HtmlView

`<HtmlView>` is a UI component that lets you show static HTML content.

See also: [WebView](/en/docs/elements/components/web-view).

---

```html
<HtmlView html="<div><h1>HtmlView</h1></div>" />
```

#### Props

| Name   | Type     | Description                   |
| ------ | -------- | ----------------------------- |
| `html` | `String` | The HTML content to be shown. |

#### Native component

| Android                                                                                           | iOS                                                                        |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview) |

### Image

`<Image>` is a UI component that shows an image from an [ImageSource](https://docs.nativescript.org/api-reference/modules/_image_source_) or from a URL.

---

#### Displaying an image relative to the `app` directory

```html
<image src="~/logo.png" stretch="none" />
```

#### Displaying an image from a URL

```html
<image
  src="https://art.nativescript-vue.org/NativeScript-Vue-White-Green.png"
  stretch="none"
/>
```

#### Displaying an image from `App_Resources`

```html
<image src="res://icon" stretch="none" />
```

#### Displaying a `base64`-encoded image

```html
<image src="data:Image/png;base64,iVBORw..." stretch="none" />
```

#### Displaying an image with a font icon in {N} 6.2+

In NativeScript-Vue, `.decode` is required for parsing properties that have HTML entities in them.

```html
<image src.decode="font://&#xf004;" class="fas" />
```

#### Props

| Name          | Type                                                                                            | Description                                                                                                                                                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src`         | `String` or [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_) | Gets or sets the source of the image as a URL or an image source. If you use the new font:// icon protocol in {N} 6.2, make sure you add .decode to the name of the property - e.g. `src.decode="font://&#xf004;"`                                                       |
| `imageSource` | [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_)             | Gets or sets the image source of the image.                                                                                                                                                                                                                              |
| `tintColor`   | `Color`                                                                                         | (Style property) Sets a color to tint template images.                                                                                                                                                                                                                   |
| `stretch`     | `Stretch`                                                                                       | (Style property) Gets or sets the way the image is resized to fill its allocated space.<br/>Valid values: `none`, `aspectFill`, `aspectFit`, or `fill`.<br/>For more information, see [Stretch](https://docs.nativescript.org/api-reference/modules/_ui_enums_.stretch). |
| `loadMode`    |                                                                                                 | Gets or sets the loading strategy for the images on the local file system.<br/>Valid values: `sync` or `async`.<br/>Default value: `async`.<br/>For more information, see [loadMode](https://docs.nativescript.org/api-reference/classes/_ui_image_.image#loadmode).     |

#### Native component

| Android                                                                                             | iOS                                                                          |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.ImageView`](https://developer.android.com/reference/android/widget/ImageView.html) | [`UIImageView`](https://developer.apple.com/documentation/uikit/uiimageview) |

### Label

`<Label>` is a UI component that displays read-only text.

**IMPORTANT**: This `<Label>` is **not** the same as the HTML `<label>`.

---

```html
<label text="Label" />
```

#### Styling the label

If you need to style parts of the text, you can use a combination of a [`FormattedString`](https://docs.nativescript.org/angular/ui/ng-ui-widgets/formatted-string) and [`Span`](https://docs.nativescript.org/api-reference/classes/_text_span_.span) elements.

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

#### Props

| Name       | Type      | Description                                                            |
| ---------- | --------- | ---------------------------------------------------------------------- |
| `text`     | `String`  | Gets or sets the text of the label.                                    |
| `textWrap` | `Boolean` | Gets or sets whether the label wraps text.<br/>Default value: `false`. |

#### Native component

| Android                                                                                           | iOS                                                                  |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UILabel`](https://developer.apple.com/documentation/uikit/uilabel) |

https://github.com/nativescript-vue/nativescript-vue.org/tree/master/content/docs/en/elements/components

- ng specific:
  - [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/cookbook/formatted-string-ng.md
  - [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/cookbook/tab-view-ng.md
- https://github.com/NativeScript/docs/tree/master/docs/ui

### List Picker

`<ListPicker>` is a UI component that lets the user select a value from a pre-configured list.

---

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

#### Props

| Name            | Type            | Description                                                     |
| --------------- | --------------- | --------------------------------------------------------------- |
| `items`         | `Array<String>` | Gets or sets the items displayed as options in the list picker. |
| `selectedIndex` | `Number`        | Gets or sets the index of the currently selected item.          |

#### Events

| Name                  | Description                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------- |
| `selectedIndexChange` | Emitted when the currently selected option (index) changes. The new index can be retrieved via `$event.value`. |

#### Native component

| Android                                                                                                   | iOS                                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.widget.NumberPicker`](https://developer.android.com/reference/android/widget/NumberPicker.html) | [`UIPickerView`](https://developer.apple.com/documentation/uikit/uipickerview) |

### ListView

`<ListView>` is a UI component that shows items in a vertically scrolling list. To set how the list shows individual items, you can use the `<v-template>` component.

```html
<ListView for="item in listOfItems" @itemTap="onItemTap">
  <v-template>
    <!-- Shows the list item label in the default color and style. -->
    <label :text="item.text" />
  </v-template>
</ListView>
```

---

#### Using `<ListView>` with multiple `<v-template>` blocks

The [`v-template` component](/en/docs/utilities/v-template) is used to define how each list item is shown on the screen.

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

```javascript
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

#### Events

| Name      | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| `itemTap` | Emitted when an item in the `<ListView>` is tapped. To access the tapped item, use `event.item`. |

#### Methods

| Name        | Description                                      |
| ----------- | ------------------------------------------------ |
| `refresh()` | Forces the `<ListView>` to reload all its items. |

#### Native component

| Android                                                                                           | iOS                                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.ListView`](https://developer.android.com/reference/android/widget/ListView.html) | [`UITableView`](https://developer.apple.com/documentation/uikit/uitableview) |

### Page

`<Page>` is a UI component that represents an application screen. NativeScript apps typically consist of one or more `<Page>` that wrap content such as an [`<ActionBar>`](/en/docs/elements/action-bar/action-bar) and other UI widgets.

---

#### A single page

```html
<Page>
  <ActionBar title="My App" />
  <GridLayout>
    <label text="My Content" />
  </GridLayout>
</Page>
```

#### Using the `loaded` event for triggering UI changes

A typical scenario is performing UI changes after the page is loaded. The recommended way to do it is by using the `loaded` event, triggered by NativeScript when the page is fully loaded:

```html
<Page @loaded="greet">
  <ActionBar title="My App" />
  <GridLayout>
    <label text="My Content" />
  </GridLayout>
</Page>
```

```javascript
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
Developers coming from a web background would usually reach for the `mounted` lifecycle hook Vue provides, however in NativeScript the application, and certain elements might not yet be loaded when the `mounted` hook is executed, thus certain actions such as alerts, dialogs, navigation etc. are not possible inside the `mounted` hook. To work around this limitation, the `loaded` event may be used, which only fires after the application is ready. In this case, we are using the `loaded` event of the [`<Page>`](/en/docs/elements/components/page) element, but this event is available for all NativeScript elements.
:::

#### Props

| Name                           | Type      | Description                                                                                             |
| ------------------------------ | --------- | ------------------------------------------------------------------------------------------------------- |
| `actionBarHidden`              | `Boolean` | Shows or hides the `<ActionBar>` for the page.<br/>Default value: `false`.                              |
| `backgroundSpanUnderStatusBar` | `Boolean` | Gets or sets whether the background of the page spans under the status bar.<br/>Default value: `false`. |
| `androidStatusBarBackground`   | `Color`   | (Android-only) Gets or sets the color of the status bar on Android devices.                             |
| `enableSwipeBackNavigation`    | `Boolean` | (iOS-only) Gets or sets whether the page can be swiped back on iOS.<br/>Default value: `true`.          |
| `statusBarStyle`               | `String`  | Gets or sets the style of the status bar.<br/>Valid values:<br/>`light`,<br/>`dark`.                    |

#### Events

| Name             | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `loaded`         | Emitted after the page has been loaded.                          |
| `navigatedFrom`  | Emitted after the app has navigated away from the current page.  |
| `navigatedTo`    | Emitted after the app has navigated to the current page.         |
| `navigatingFrom` | Emitted before the app has navigated away from the current page. |
| `navigatingTo`   | Emitted before the app has navigated to the current page.        |

#### Native component

| Android                                                                                                                                                                              | iOS                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [`org.nativescript.widgets.GridLayout`](https://github.com/NativeScript/tns-core-modules-widgets/blob/master/android/widgets/src/main/java/org/nativescript/widgets/GridLayout.java) | [`UIViewController`](https://developer.apple.com/documentation/uikit/uiviewcontroller) |

### Placeholder

`<Placeholder>` allows you to add any native widget to your application. To do that, you need to put a Placeholder somewhere in the UI hierarchy and then create and configure the native widget that you want to appear there. Finally, pass your native widget to the event arguments of the creatingView event.

---

```html
<Placeholder @creatingView="creatingView" />
```

#### Example with TextView in Android

```javascript
methods: {
  creatingView: function(args) {
      const nativeView = new android.widget.TextView(args.context);
      nativeView.setSingleLine(true);
      nativeView.setEllipsize(android.text.TextUtils.TruncateAt.END);
      nativeView.setText("Native View - Android");
      args.view = nativeView;
  }
}
```

#### Example with UILabel in iOS

```javascript
methods: {
  creatingView: function(args) {
      const nativeView = new UILabel();
      nativeView.text = "Native View - iOS";
      args.view = nativeView;
  }
}
```

### Progress

`<Progress>` is a UI component that shows a bar to indicate the progress of a task.

See also: [ActivityIndicator](/en/docs/elements/components/activity-indicator).

---

```html
<progress :value="currentProgress" />
```

#### Props

| Name       | Type     | Description                                                                                      |
| ---------- | -------- | ------------------------------------------------------------------------------------------------ |
| `value`    | `Number` | Gets or sets the current value of the progress bar. Must be within the range of 0 to `maxValue`. |
| `maxValue` | `Number` | Gets or sets the maximum value of the progress bar.<br/>Default value: `100`.                    |

#### Events

| Name          | Description                                |
| ------------- | ------------------------------------------ |
| `valueChange` | Emitted when the `value` property changes. |

#### Native Component

| Android                                                                                                                         | iOS                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`android.widget.ProgressBar` (indeterminate = false)](https://developer.android.com/reference/android/widget/ProgressBar.html) | [`UIProgressView`](https://developer.apple.com/documentation/uikit/uiprogressview) |

### ScrollView

`<ScrollView>` is a UI component that shows a scrollable content area. Content can be scrolled vertically or horizontally.

It's important to note that `<ScrollView>` extends [`ContentView`](https://docs.nativescript.org/api-reference/classes/_ui_content_view_.contentview), so it can only have a single child element.

---

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

#### Props

| name                        | type      | description                                                                                                                 |
| --------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `orientation`               | `String`  | Gets or sets the direction in which the content can be scrolled: `horizontal` or `vertical`.<br/>Default value: `vertical`. |
| `scrollBarIndicatorVisible` | `Boolean` | Specifies if the scrollbar is visible.<br/>Default value: `true`.                                                           |

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

#### Props

| Name                       | Type     | Description                                          |
| -------------------------- | -------- | ---------------------------------------------------- |
| `hint`                     | `String` | Gets or sets placeholder text for the input area.    |
| `text`                     | `String` | Gets or sets the value of the search query.          |
| `textFieldBackgroundColor` | `Color`  | Gets or sets the background color of the input area. |
| `textFieldHintColor`       | `Color`  | Gets or sets the color of the placeholder text.      |

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

As opposed to `<TabView>`:

- The position of `<SegmentedBar>` is not fixed.
- You can place and style it as needed on the page or inside additional app elements such as hamburger menus.
- You need to handle the content shown after selection separately.

---

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

#### Props

| Name                      | Type                      | Description                                                                                                                                                   |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                   | `Array<SegmentedBarItem>` | An array of items to be displayed in the segmented bar. Represents the button labels or icons of the segmented bar.<br/>The array must be created in advance. |
| `selectedIndex`           | `Number`                  | Gets or sets the index of the selected item.                                                                                                                  |
| `selectedBackgroundColor` | `Color`                   | (Style property) Gets or sets the background color of the selected item. To set the background color of the entire bar, use `backgroundColor`.                |

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

```html
<Slider value="80" @valueChange="onValueChanged" />
```

`<Slider>` provides two-way data binding using `v-model`:

```html
<Slider v-model="value" />
```

#### Props

| Name       | Type     | Description                                                                      |
| ---------- | -------- | -------------------------------------------------------------------------------- |
| `value`    | `Number` | Gets or sets the currently selected value of the slider.<br/>Default value: `0`. |
| `minValue` | `Number` | Gets or sets the minimum value of the slider.<br/>Default value: `0`.            |
| `maxValue` | `Number` | Gets or sets the maximum value of the slider.<br/>Default value: `100`.          |

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

```html
<Switch checked="true" />
```

`<Switch>`provides two-way data binding using `v-model`.

```html
<Switch v-model="itemEnabled" />
```

#### Props

| Name      | Type      | Description                                                                 |
| --------- | --------- | --------------------------------------------------------------------------- |
| `checked` | `Boolean` | Gets or sets the value of the switch selection.<br/>Default value: `false`. |

#### Events

| Name            | Description                                |
| --------------- | ------------------------------------------ |
| `checkedChange` | Emitted when the switch selection changes. |

#### Native component

| Android                                                                                       | iOS                                                                    |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`android.widget.Switch`](https://developer.android.com/reference/android/widget/Switch.html) | [`UISwitch`](https://developer.apple.com/documentation/uikit/uiswitch) |

### TabView

::: warning Note
NativeScript 6 introduced two new tab navigation components, `<BottomNavigation>` and `<Tabs>`. These are meant to be new and better alternatives to the existing `<TabView>` component. Read [the announcement blog post here](https://www.nativescript.org/blog/tabs-and-bottomnavigation-nativescripts-two-new-components).
:::

`<TabView>` is a navigation component that shows content grouped into tabs and lets users switch between tabs.

---

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

```javascript
methods: {
  indexChange: function(args) {
      let newIndex = args.value
      console.log('Current tab index: ' + newIndex)
  }
}
```

::: warning Note
Currently, `TabViewItem` expects a single child element. In most cases, you might want to wrap your content in a layout.
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

#### Props

| Name                   | Type     | Description                                                                               |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `selectedIndex`        | `Number` | Gets or sets the currently selected tab. Default is `0`.                                  |
| `tabTextColor`         | `Color`  | (Style property) Gets or sets the text color of the tabs titles.                          |
| `tabBackgroundColor`   | `Color`  | (Style property) Gets or sets the background color of the tabs.                           |
| `selectedTabTextColor` | `Color`  | (Style property) Gets or sets the text color of the selected tab title.                   |
| `androidTabsPosition`  | `String` | Sets the position of the TabView in Android platform<br/>Valid values: `top` or `bottom`. |

#### Events

| Name                  | Description                                                                                                                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectedIndexChange` | Emits [an event object](https://docs.nativescript.org/api-reference/interfaces/_ui_tab_view_.selectedindexchangedeventdata) containing an `newIndex` property with the index of the tapped `<TabViewItem>` (and an `oldIndex` property with the index of the previous tab). |

#### Native component

| Android                                                                                                               | iOS                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`android.support.v4.view.ViewPager`](https://developer.android.com/reference/android/support/v4/view/ViewPager.html) | [`UITabBarController`](https://developer.apple.com/documentation/uikit/uitabbarcontroller) |

### TextField

`<TextField>` is an input component that creates an editable single-line box.

`<TextField>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/_ui_text_base_.textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/_ui_editor_text_base_.editabletextbase) which provide additional properties and events.

---

```html
<TextField :text="textFieldValue" hint="Enter text..." />
```

`<TextField>` provides two-way data binding using `v-model`.

```html
<TextField v-model="textFieldValue" />
```

#### Props

| Name            | Type            | Description                                                                                                        |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| `text`          | `String`        | Gets or sets the value of the field.                                                                               |
| `hint`          | `String`        | Gets or sets the placeholder text.                                                                                 |
| `isEnabled`     | `Boolean`       | Make the field disabled or enabled. Default value is `true`.                                                       |
| `editable`      | `Boolean`       | When `true`, indicates that the user can edit the value of the field.                                              |
| `maxLength`     | `Number`        | Limits input to the specified number of characters.                                                                |
| `secure`        | `Boolean`       | Hides the entered text when `true`. Use this property to create password input fields.<br/>Default value: `false`. |
| `keyboardType`  | `KeyboardType`  | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`. |
| `returnKeyType` | `ReturnKeyType` | Gets or sets the label of the return key.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`.             |
| `autocorrect`   | `Boolean`       | Enables or disables autocorrect.                                                                                   |

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

---

```html
<TextView text="Multi\nLine\nText" />
```

`<TextView>` provides two-way data binding using `v-model`.

```html
<TextView v-model="textViewValue" />
```

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

| Name            | Type                                                                                                                                    | Description                                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `text`          | `String`                                                                                                                                | Gets or sets the value of the component.                                                                           |
| `hint`          | `String`                                                                                                                                | Gets or sets the placeholder text when the component is editable.                                                  |
| `editable`      | `Boolean`                                                                                                                               | When `true`, indicates that the user can edit the contents of the container.                                       |
| `maxLength`     | `Number`                                                                                                                                | Sets the maximum number of characters that can be entered in the container.                                        |
| `keyboardType`  | `KeyboardType`                                                                                                                          | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`. |
| `returnKeyType` | Gets or sets the label of the return key. Currently supported only on iOS.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`. |
| `autocorrect`   | `Boolean`                                                                                                                               | Enables or disables autocorrect.                                                                                   |

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

> See also: [DatePicker](/en/docs/elements/components/date-picker).

---

```html
<TimePicker :hour="selectedHour" :minute="selectedMinute" />
```

`<TimePicker>` provides two-way data binding using `v-model`.

```html
<TimePicker v-model="selectedTime" />
```

#### Props

| Name             | Type     | Description                                                                                        |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `hour`           | `Number` | Gets or sets the selected hour.                                                                    |
| `minute`         | `Number` | Gets or sets the selected minute.                                                                  |
| `time`           | `Date`   | Gets or sets the selected time.                                                                    |
| `minHour`        | `Number` | Gets or sets the minimum selectable hour.                                                          |
| `maxHour`        | `Number` | Gets or sets the maximum selectable hour.                                                          |
| `minMinute`      | `Number` | Gets or sets the minimum selectable minute.                                                        |
| `maxMinute`      | `Number` | Gets or sets the maximum selectable minute.                                                        |
| `minuteInterval` | `Number` | Gets or sets the selectable minute interval. For example: 5 or 15 minutes.<br/>Default value: `1`. |

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

See also: [HtmlView](/en/docs/elements/components/html-view).

---

```html
<WebView src="http://nativescript-vue.org/" />

<WebView src="~/html/index.html" />

<WebView src="<div><h1>Some static HTML</h1></div>" />
```

#### Props

| Name  | Type     | Description                                                                                                               |
| ----- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `src` | `String` | Gets or sets the displayed web content.<br/>Valid values: an absolute URL, the path to a local HTML file, or static HTML. |

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
