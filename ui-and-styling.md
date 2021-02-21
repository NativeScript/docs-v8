---
title: UI & Styling
---

## Layouts

- [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/ui/layouts/layouts.md

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

| Layouts                                                                                                    | Description                                                                                                                                                     | Screenshot                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [FlexboxLayout](https://v6.docs.nativescript.org/api-reference/modules/_ui_layouts_flexbox_layout_.html)   | This layout is a non-conforming implementation of the [CSS Flexible Box Layout](https://www.w3.org/TR/css-flexbox-1/)                                           | ![FlexboxLayout android](/assets/images/gallery/android/flexboxLayoutPage.png 'FlexboxLayout android')    |
| [AbsoluteLayout](https://v6.docs.nativescript.org/api-reference/modules/_ui_layouts_absolute_layout_.html) | This layout lets you set exact locations (left/top coordinates) for its children.                                                                               | ![AbsoluteLayout android](/assets/images/gallery/android/absoluteLayoutPage.png 'AbsoluteLayout android') |
| [DockLayout](https://v6.docs.nativescript.org/api-reference/modules/_ui_layouts_dock_layout_.html)         | This layout arranges its children at its outer edges and allows its last child to take up the remaining space.                                                  | ![DockLayout android](/assets/images/gallery/android/dockLayoutPage.png 'DockLayout android')             |
| [GridLayout](https://v6.docs.nativescript.org/api-reference/modules/_ui_layouts_grid_layout_.html)         | This layout defines a rectangular layout area that consists of columns and rows.                                                                                | ![GridLayout android](/assets/images/gallery/android/gridLayoutPage.png 'GridLayout android')             |
| [StackLayout](https://v6.docs.nativescript.org/api-reference/modules/_ui_layouts_stack_layout_.html)       | This layout arranges its children horizontally or vertically. The direction is set with the orientation property.                                               | ![StackLayout android](/assets/images/gallery/android/stackLayoutPage.png 'StackLayout android')          |
| [WrapLayout](https://v6.docs.nativescript.org/api-reference/modules/_ui_layouts_wrap_layout_.html)         | This layout positions its children in rows or columns, based on the orientation property, until the space is filled and then wraps them on a new row or column. | ![WrapLayout android](/assets/images/gallery/android/wrapLayoutPage.png 'WrapLayout android')             |

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

#### API Reference

| Name                                                                                                    | Type     |
| :------------------------------------------------------------------------------------------------------ | :------- |
| [AbsoluteLayout](https://docs.nativescript.org/api-reference/modules/_ui_layouts_absolute_layout_.html) | `Module` |

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

#### API Reference

| Name                                                                                            | Type     |
| :---------------------------------------------------------------------------------------------- | :------- |
| [DockLayout](https://docs.nativescript.org/api-reference/modules/_ui_layouts_dock_layout_.html) | `Module` |

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

#### API Reference

| Name                                                                                            | Type     |
| :---------------------------------------------------------------------------------------------- | :------- |
| [GridLayout](https://docs.nativescript.org/api-reference/modules/_ui_layouts_grid_layout_.html) | `Module` |

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

#### API Reference

| Name                                                                                              | Type     |
| :------------------------------------------------------------------------------------------------ | :------- |
| [StackLayout](https://docs.nativescript.org/api-reference/modules/_ui_layouts_stack_layout_.html) | `Module` |

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

#### API Reference

| Name                                                                                            | Type     |
| :---------------------------------------------------------------------------------------------- | :------- |
| [WrapLayout](https://docs.nativescript.org/api-reference/modules/_ui_layouts_wrap_layout_.html) | `Module` |

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

#### API Reference

| Name                                                                                                  | Type     |
| :---------------------------------------------------------------------------------------------------- | :------- |
| [FlexboxLayout](https://docs.nativescript.org/api-reference/modules/_ui_layouts_flexbox_layout_.html) | `Module` |

## Components

### ActionBar

The ActionBar is NativeScript’s abstraction over the Android ActionBar and iOS NavigationBar. It represents a toolbar at the top of the activity window, and can have a title, application-level navigation, as well as other custom interactive items.

---

/// flavor plain

The ActionBar provides a title property and can be extended by using one or more ActionItem components and a single NavigationButton.

```xml

<ActionBar title="ActionBar Title">
    <NavigationButton icon="res://ic_arrow_back_black_24dp" (tap)="goBack()"></NavigationButton>
    <ActionItem icon="font://&#xf013;" class="fas" ios.position="right" (tap)="openSettings()"></ActionItem>
</ActionBar>
```

The ActionItem components are supporting the platform-specific position and systemIcon for iOS and Android.

```xml
<ActionBar title="Action Items">
    <ActionItem (tap)="onShare()" ios.systemIcon="9" ios.position="left"
                android.systemIcon="ic_menu_share" android.position="actionBar">
    </ActionItem>
    <ActionItem text="delete" (tap)="onDelete()"
                ios.systemIcon="16" ios.position="right" android.position="popup">
    </ActionItem>
</ActionBar>
```

///

/// flavor angular

```html
<ActionBar title="ActionBar Title">
  <NavigationButton
    icon="res://ic_arrow_back_black_24dp"
    (tap)="goBack()"
  ></NavigationButton>
  <ActionItem
    icon="font://&#xf013;"
    class="fas"
    ios.position="right"
    (tap)="openSettings()"
  ></ActionItem>
</ActionBar>
```

```ts
import { Component } from '@angular/core'
import { RouterExtensions } from 'nativescript/angular'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class ActionBarUsageComponent {
  constructor(private routerExtensions: RouterExtensions) {}

  goBack() {
    this.routerExtensions.backToPreviousPage()
  }

  openSettings() {
    // implement the cusotm logic
  }
}
```

#### Styling

To style the ActionBar, you can use only background-color and color properties. Alternatively, you can use @nativescript/theme and use the default styles for each different theme. The icon property of ActionItem can use Icon Fonts with the font:// prefix. By setting up this prefix, a new image will be generated, which will be set as an ActionItem's icon resource. While using this functionality, we need to specify the font-size, which will calculate the size of the generated image base on the device's dpi.

```html
<!-- The default background-color and color of ActionBar & ActionItem are set through nativescript-theme (if used)-->
<ActionBar title="Styling">
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

/// flavor vue

```html
<ActionBar>
  <StackLayout orientation="horizontal">
    <image src="res://icon" width="40" height="40" verticalAlignment="center" />
    <label text="NativeScript" fontSize="24" verticalAlignment="center" />
  </StackLayout>
</ActionBar>
```

#### Setting an app icon for Android

```html
<ActionBar title="My App" android.icon="res://icon" android.iconVisibility="always" />
```

```html
<ActionBar title="My App" flat="true" />
```

///

::: tip Tip
iOS Specifics: The default text of the navigation button is the title of the previous page. In iOS, the back button is used explicitly for navigation. It navigates to the previous page and you can't handle the tap event to override this behavior. If you want to place a button on the left side of the ActionBar and handle the tap event (e.g., show slide-out), you can use ActionItem with ios.position="left".

Android Specifics: In Android, you can't set text inside the navigation button. You can use the icon property to set an image (e.g., ~\images\nav-image.png or res:\\ic_nav). You can use android.systemIcon to set one of the system icons available in Android. In this case, there is no default behaviour for NavigationButton tap event, and we should set the callback function, which will be executed.
:::

::: warning Note
In iOS, the color property affects the color of the title and the action items. In Android, the color property affects only the title text. However, you can set the default color of the text in the action items by adding an actionMenuTextColor item in the Android theme (inside App_Resources\Android\values\styles.xml).
:::

#### Properties

#### ActionBar Properties

| Name        | Type                                                                            | Description                                                                          |
| :---------- | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| `title`     | `string`                                                                        | Gets or sets the action bar title.                                                   |
| `titleView` | [View](https://docs.nativescript.org/api-reference/classes/_ui_core_view_.view) | Gets or sets the title view. When set - replaces the title with a custom view.       |
| `flat`      | `boolean`                                                                       | Removes the border on Android and the translucency on iOS. Default value is `false`. |

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

#### Native Component

| Android                                                                                       | iOS                                                                                           |
| :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| [android.widget.Toolbar](https://developer.android.com/reference/android/widget/Toolbar.html) | [UIView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/) |

#### See Also

[Detailed documentation article about `ActionBar` functionalities.](https://docs.nativescript.org/angular/ui/action-bar)

### Activity-Indicator

`<ActivityIndicator>` is a UI component that shows a progress indicator signaling to the user of an operation running in the background.

---

/// flavor plain

```xml
<ActivityIndicator busy="{{ isBusy }}" busyChange="{{ onBusyChanged }} loaded="indicatorLoaded" />
```

```ts
import { ActivityIndicator } from '@nativescript/core'

onBusyChanged(args: EventData) {
  const indicator: ActivityIndicator = args.object
  console.log('indicator.busy changed to: ' + indicator.busy)
}

```

///

/// flavor angular

```html
<ActivityIndicator
  [busy]="isBusy"
  (busyChange)="onBusyChanged($event)"
></ActivityIndicator>
```

```typescript
import { ActivityIndicator } from '@nativescript/core'

  onBusyChanged(args: EventData) {
    const indicator: ActivityIndicator = args.object
    console.log('indicator.busy changed to: ' + indicator.busy)
  }

```

///

/// flavor vue

```html
<ActivityIndicator busy="true" @busyChange="onBusyChanged" />
```

///

#### Props

| Name   | Type      | Description                                                                         |
| ------ | --------- | ----------------------------------------------------------------------------------- |
| `busy` | `Boolean` | Gets or sets whether the indicator is active. When `true`, the indicator is active. |

#### Events

| Name         | Description                                  |
| ------------ | -------------------------------------------- |
| `busyChange` | Emitted when the `busy` property is changed. |

#### API References

| Name                                                                                                               | Type     |
| :----------------------------------------------------------------------------------------------------------------- | :------- |
| [ActivityIndicator](http://docs.nativescript.org/api-reference/modules/_ui_activity_indicator_)                    | `Module` |
| [ActivityIndicator](https://docs.nativescript.org/api-reference/classes/_ui_activity_indicator_.activityindicator) | `Class`  |

#### Native component

| Android                                                                                                                        | iOS                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| [`android.widget.ProgressBar` (indeterminate = true)](https://developer.android.com/reference/android/widget/ProgressBar.html) | [`UIActivityIndicatorView`](https://developer.apple.com/documentation/uikit/uiactivityindicatorview) |

### Button

`<Button>` is a UI component that displays a button which reacts to a user gesture.

For more information about the available gestures, see [Gestures in the official NativeScript documentation](https://docs.nativescript.org/ui/gestures).

---

/// flavor plain

```xml
<Button text="Tap me!" tap="onTap"></Button>
```

```ts
import { Button } from '@nativescript/core'

export function onTap(args) {
  const button = args.object as Button
  console.log('Tapped button')
}
```

///

/// flavor angular

```html
<button text="Tap me!" (tap)="onTap($event)"></button>
```

```ts
import { Button } from '@nativescript/core'

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

#### API References

| Name                                                                                            | Type     |
| ----------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/button](https://docs.nativescript.org/api-reference/modules/_ui_button_) | `Module` |
| [Button](http://docs.nativescript.org/api-reference/classes/_ui_button_.button.html)            | `Class`  |

#### Native component

| Android                                                                                       | iOS                                                                    |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`android.widget.Button`](https://developer.android.com/reference/android/widget/Button.html) | [`UIButton`](https://developer.apple.com/documentation/uikit/uibutton) |

### Date Picker

`<DatePicker>` is a UI component that lets users select a date from a pre-configured range.

> See also: [TimePicker](/en/docs/elements/components/time-picker).

---

/// flavor plain

```xml
<DatePicker year="1980" month="4" day="20" loaded="onDatePickerLoaded"
date="{{ date }}" minDate="{{ minDate }}" maxDate="{{ maxDate }}"></DatePicker>
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

#### API References

| Name                                                                                                      | Type     |
| --------------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/date-picker](https://docs.nativescript.org/api-reference/modules/_ui_date_picker_) | `Module` |
| [DatePicker](https://docs.nativescript.org/api-reference/classes/_ui_date_picker_.datepicker)             | `Class`  |

#### Native component

| Android                                                                                               | iOS                                                                            |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.widget.DatePicker`](https://developer.android.com/reference/android/widget/DatePicker.html) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker) |

### Frame

`<Frame>` is a UI component used to display [`<Page>`](/en/docs/elements/components/page) elements. Every app needs at least a single `<Frame>` element, usually set as the root element.

---

#### A single root Frame

```js
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

```js
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

/// flavor plain

```xml
<HtmlView loaded="onHtmlLoaded"></HtmlView>
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

#### Props

| Name   | Type     | Description                   |
| ------ | -------- | ----------------------------- |
| `html` | `String` | The HTML content to be shown. |

#### API References

| Name                                                                                    | Type     | API Reference Link |
| --------------------------------------------------------------------------------------- | -------- | ------------------ |
| [HtmlView](https://docs.nativescript.org/api-reference/modules/_ui_html_view_)          | `Module` |
| [HtmlView](https://docs.nativescript.org/api-reference/classes/_ui_html_view_.htmlview) | `Class`  |

#### Native component

| Android                                                                                           | iOS                                                                        |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview) |

### Image

`<Image>` is a UI component that shows an image from an [ImageSource](https://docs.nativescript.org/api-reference/modules/_image_source_) or from a URL.

::: tip Tip
When working with images following [the best practices](/performance.html#image-optimizations) is a must.
:::

---

/// flavor plain

```xml
<!-- Displaying an image from `App_Resources` -->
<Image src="res://icon" stretch="aspectFill" />

<!-- Displaying an image relative to the `app` directory -->
<Image src="~/images/logo.png" stretch="aspectFill" />

<!-- Displaying an image from a URL -->
<Image src="https://www.nativescript.org/images/default-source/Blogs/ns-logo_share_600x315.png" stretch="aspectFill" />

<!-- Displaying an image from a URL - Setting loadMode to async will prevent freezing the UI on Android when loading photos async (e.g. from online API) -->
<Image src="https://nativescript.org/images/default-source/Blogs/ns-logo_share_600x315.png" loadMode="async" width="100" height="100" stretch="aspectFill" />
```

///

/// flavor angular

```html
<!-- Displaying an image from `App_Resources` -->
<image src="res://logo_white_bg" stretch="aspectFill"></image>

<!-- Displaying an image relative to the `app` directory -->
<image src="~/images/logo.png" stretch="aspectFit"></image>

<!-- Displaying an image from a URL - Setting loadMode to async will prevent freezing the UI on Android when loading photos async (e.g. from online API) -->
<image
  src="https://nativescript.org/images/default-source/Blogs/ns-logo_share_600x315.png"
  loadMode="async"
  stretch="aspectFit"
></image>

<!-- Image with CSS and an icon fonts -->
<image src="font://&#xF2b9;" class="fas t-36"></image>
```

///

/// flavor vue

```html
<!-- Displaying an image from `App_Resources` -->
<image src="res://icon" stretch="none" />

<!-- Displaying an image relative to the `app` directory -->
<image src="~/logo.png" stretch="none" />

<!-- Displaying an image from a URL - Setting loadMode to async will prevent freezing the UI on Android when loading photos async (e.g. from online API) -->
<image
  src="https://art.nativescript-vue.org/NativeScript-Vue-White-Green.png"
  stretch="none"
  loadMode="async"
/>

<!-- Displaying a `base64`-encoded image -->
<image src="data:Image/png;base64,iVBORw..." stretch="none" />

<!-- Displaying an image with a font icon in {N} 6.2+ -->
<!-- In NativeScript-Vue, `.decode` is required for parsing properties that have HTML entities in them. -->
<image src.decode="font://&#xf004;" class="fas" />
```

///

#### Props

| Name          | Type                                                                                            | Description                                                                                                                                                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src`         | `String` or [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_) | Gets or sets the source of the image as a URL or an image source. If you use the new font:// icon protocol in {N} 6.2, make sure you add .decode to the name of the property - e.g. `src.decode="font://&#xf004;"`                                                       |
| `imageSource` | [`ImageSource`](https://docs.nativescript.org/api-reference/modules/_image_source_)             | Gets or sets the image source of the image.                                                                                                                                                                                                                              |
| `tintColor`   | `Color`                                                                                         | (Style property) Sets a color to tint template images.                                                                                                                                                                                                                   |
| `stretch`     | `Stretch`                                                                                       | (Style property) Gets or sets the way the image is resized to fill its allocated space.<br/>Valid values: `none`, `aspectFill`, `aspectFit`, or `fill`.<br/>For more information, see [Stretch](https://docs.nativescript.org/api-reference/modules/_ui_enums_.stretch). |
| `loadMode`    |                                                                                                 | Gets or sets the loading strategy for the images on the local file system.<br/>Valid values: `sync` or `async`.<br/>Default value: `async`.<br/>For more information, see [loadMode](https://docs.nativescript.org/api-reference/classes/_ui_image_.image#loadmode).     |

#### API References

| Name                                                                                              | Type     |
| ------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/image](http://docs.nativescript.org/api-reference/modules/_ui_image_.html) | `Module` |
| [Image](https://docs.nativescript.org/api-reference/classes/_ui_image_.image)                     | `Class`  |

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

/// flavor plain

```xml
<Label text="Lores Ipsum..."
  textWrap="true"
  textAlignment="center"
  textDecoration="underline"
  textTransform="capitalize"
  whiteSpace="normal"/>
```

///

/// flavor angular

```html
<label
  text="Lores Ipsum..."
  textWrap="true"
  textAlignment="center"
  textDecoration="underline"
  textTransform="capitalize"
  whiteSpace="normal"
></label>
```

///

/// flavor vue

```html
<label
  text="Label"
  textWrap="true"
  textAlignment="center"
  textDecoration="underline"
  textTransform="capitalize"
  whiteSpace="normal"
/>
```

///

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

| Name             | Type                                                                                           | Description                                       |
| ---------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `letterSpacing`  | `number`                                                                                       | Gets or sets letterSpace style property.          |
| `lineHeight`     | `number`                                                                                       | Gets or sets lineHeight style property.           |
| `text`           | `string`                                                                                       | Gets or sets the Label text.                      |
| `textAlignment`  | **_"initial"_**, **_"left"_**, **_"center"_**, **_"right"_**                                   | Gets or sets text-alignment style property.       |
| `textDecoration` | **_"none"_**, **_"underline"_**, **_"line-through"_**, **_"underline"_**, **_"line-through"_** | Gets or sets text swcoration style property.      |
| `textTransform`  | **_"initial"_**, **_"none"_**, **_"capitalize"_**, **_"uppercase"_**, **_"lowercase"_**        | Gets or sets text transform style property.       |
| `textWrap`       | `boolean`                                                                                      | Gets or sets whether the Label wraps text or not. |
| `whiteSpace`     | **_"initial"_**, **_"normal"_**, **_"nowrap"_**                                                | Gets or sets the white space style.               |

#### Events

| Name         | Description                             |
| ------------ | --------------------------------------- |
| `textChange` | Emitted when the label text is changed. |

#### API References

| Name                                                                                              | Type     |
| ------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/label](http://docs.nativescript.org/api-reference/modules/_ui_label_.html) | `Module` |
| [Label](https://docs.nativescript.org/api-reference/classes/_ui_label_.label)                     | `Class`  |

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
<ListPicker [items]="items" class="picker"></ListPicker>
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

#### Props

| Name            | Type            | Description                                                     |
| --------------- | --------------- | --------------------------------------------------------------- |
| `items`         | `Array<String>` | Gets or sets the items displayed as options in the list picker. |
| `selectedIndex` | `Number`        | Gets or sets the index of the currently selected item.          |

#### Events

| Name                  | Description                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------- |
| `selectedIndexChange` | Emitted when the currently selected option (index) changes. The new index can be retrieved via `$event.value`. |

#### API References

| Name                                                                                                          | Type     |
| ------------------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/list-picker](http://docs.nativescript.org/api-reference/modules/_ui_list_picker_.html) | `Module` |
| [ListPicker](https://docs.nativescript.org/api-reference/classes/_ui_list_picker_.listpicker)                 | `Class`  |

#### Native component

| Android                                                                                                   | iOS                                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.widget.NumberPicker`](https://developer.android.com/reference/android/widget/NumberPicker.html) | [`UIPickerView`](https://developer.apple.com/documentation/uikit/uipickerview) |

### ListView

`<ListView>` is a UI component that shows items in a vertically scrolling list. To set how the list shows individual items, you can use the `<v-template>` component. Using a ListView requires some special attention due to the complexity of the native implementations, with custom item templates, bindings and so on.

The NativeScript modules provides a custom component which simplifies the way native ListView is used.

---

::: warning Note
The ListView's item template can contain only a single root view container.
:::

/// flavor plain

```xml
<ListView items="{{ titlesArray }}"
          loaded="{{ onListViewLoaded }}"
          itemTap="onItemTap"
          loadMoreItems="onLoadMoreItems"
          separatorColor="orangered"
          rowHeight="50"
          class="list-group" id="listView">
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
import { ItemEventData } from 'tns-core-modules/ui/list-view'

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

#### API References

| Name                                                                                                 | Type        |
| ---------------------------------------------------------------------------------------------------- | ----------- |
| [@nativescript/core/ui/list-view](http://docs.nativescript.org/api-reference/modules/_ui_list_view_) | `Module`    |
| [ListView](https://docs.nativescript.org/api-reference/classes/_ui_list_view_.listview)              | `Class`     |
| [ItemEventData](https://docs.nativescript.org/api-reference/interfaces/_ui_list_view_.itemeventdata) | `Interface` |
| [ItemsSource](https://docs.nativescript.org/api-reference/interfaces/_ui_list_view_.itemssource)     | `Interface` |
| [KeyedTemplate](https://docs.nativescript.org/api-reference/interfaces/_ui_core_view_.keyedtemplate) | `Interface` |

#### Native component

| Android                                                                                           | iOS                                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.ListView`](https://developer.android.com/reference/android/widget/ListView.html) | [`UITableView`](https://developer.apple.com/documentation/uikit/uitableview) |

### Page

`<Page>` is a UI component that represents an application screen. NativeScript apps typically consist of one or more `<Page>` that wrap content such as an [`<ActionBar>`](/en/docs/elements/action-bar/action-bar) and other UI widgets.

---

/// flavor plain

```xml
<Page loaded="onPageLoaded"
      navigatedFrom="onNavigatedFrom"
      navigatedTo="onNavigatedTo"
      navigatingFrom="onNavigatingFrom"
      navigatingTo="onNavigatingTo"
      unloaded="onUnloaded"
      layoutChanged="onLayoutChanged">
    <Page.actionBar>
        <ActionBar title="Page Creation"/>
    </Page.actionBar>
    <!-- Each page can have only a single root view -->
    <StackLayout>
        <!-- content here -->
        <Label text="Hello, world!"/>
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

/// flavor angular
??? Page in Angular ??? Not a thing.
///

/// flavor vue

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
Developers coming from a web background would usually reach for the `mounted` lifecycle hook Vue provides, however in NativeScript the application, and certain elements might not yet be loaded when the `mounted` hook is executed, thus certain actions such as alerts, dialogs, navigation etc. are not possible inside the `mounted` hook. To work around this limitation, the `loaded` event may be used, which only fires after the application is ready. In this case, we are using the `loaded` event of the [`<Page>`](/en/docs/elements/components/page) element, but this event is available for all NativeScript elements.
:::
///

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

::: warning Note
The events loaded, unloaded and layoutChanged are UI component lifecycles events and are universal for all classes that extend the View class (including Page). They can be used with all NativeScript elements (e.g. layouts, buttons, UI plugins, etc.).
:::

#### API References

| Name                                                                       | Type     |
| -------------------------------------------------------------------------- | -------- |
| [Page](http://docs.nativescript.org/api-reference/modules/_ui_page_.html)  | `Module` |
| [Page](https://docs.nativescript.org/api-reference/classes/_ui_page_.page) | `Class`  |

#### Native component

| Android                                                                                                                                                                              | iOS                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| [`org.nativescript.widgets.GridLayout`](https://github.com/NativeScript/tns-core-modules-widgets/blob/master/android/widgets/src/main/java/org/nativescript/widgets/GridLayout.java) | [`UIViewController`](https://developer.apple.com/documentation/uikit/uiviewcontroller) |

### Placeholder

`<Placeholder>` allows you to add any native widget to your application. To do that, you need to put a Placeholder somewhere in the UI hierarchy and then create and configure the native widget that you want to appear there. Finally, pass your native widget to the event arguments of the creatingView event.

---

/// flavor plain

```xml
    <Placeholder creatingView="creatingView" />
```

```ts
import { Utils } from '@nativescript/core'

export function creatingView(args) {
  let nativeView
  if (global.isIOS) {
    nativeView = UITextView.new()
    nativeView.text = 'Native View (iOS)'
  } else if (global.isAndroid) {
    nativeView = new android.widget.TextView(Utils.android.getApplicationContext())
    nativeView.setText('Native View (Android)')
  }

  args.view = nativeView
}
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
    nativeView = UITextView.new()
    nativeView.text = 'Native View (iOS)'
  } else if (global.isAndroid) {
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

#### Example with TextView in Android

```js
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

```js
methods: {
  creatingView: function(args) {
      const nativeView = new UILabel();
      nativeView.text = "Native View - iOS";
      args.view = nativeView;
  }
}
```

#### API References

| Name                                                                                            | Type     |
| ----------------------------------------------------------------------------------------------- | -------- |
| [Placeholder](http://docs.nativescript.org/api-reference/modules/_ui_placeholder_.html)         | `Module` |
| [Placeholder](https://docs.nativescript.org/api-reference/classes/_ui_placeholder_.placeholder) | `Class`  |

///

### Progress

`<Progress>` is a UI component that shows a bar to indicate the progress of a task.

See also: [ActivityIndicator](/en/docs/elements/components/activity-indicator).

---

/// flavor plain

```xml
    <Progress width="100%" value="{{ progressValue }}"  maxValue="{{ progressMaxValue }}" loaded="onProgressLoaded" />
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

/// flavor vue

```html
<progress :value="currentProgress" />
```

///

#### Props

| Name       | Type     | Description                                                                                      |
| ---------- | -------- | ------------------------------------------------------------------------------------------------ |
| `value`    | `Number` | Gets or sets the current value of the progress bar. Must be within the range of 0 to `maxValue`. |
| `maxValue` | `Number` | Gets or sets the maximum value of the progress bar.<br/>Default value: `100`.                    |

#### Events

| Name          | Description                                |
| ------------- | ------------------------------------------ |
| `valueChange` | Emitted when the `value` property changes. |

#### API References

| Name                                                                                   | Type     |
| -------------------------------------------------------------------------------------- | -------- |
| [Progress](http://docs.nativescript.org/api-reference/modules/_ui_progress_.html)      | `Module` |
| [Progress](https://docs.nativescript.org/api-reference/classes/_ui_progress_.progress) | `Class`  |

#### Native Component

| Android                                                                                                                         | iOS                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [`android.widget.ProgressBar` (indeterminate = false)](https://developer.android.com/reference/android/widget/ProgressBar.html) | [`UIProgressView`](https://developer.apple.com/documentation/uikit/uiprogressview) |

/// flavor plain

### Repeater

The Repeater widget allows you to display a collection of data, which is present in an array.

---

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

::: tip Note
Changing the array after the repeater is shown will not update the UI. You can force-update the UI using the refresh() method.

When using ObservableArray the repeater will be automatically updated when items are added or removed form the array.
:::

#### API References

| Name                                                                                   | Type     |
| -------------------------------------------------------------------------------------- | -------- |
| [Repeater](http://docs.nativescript.org/api-reference/modules/_ui_repeater_.html)      | `Module` |
| [Repeater](https://docs.nativescript.org/api-reference/classes/_ui_repeater_.repeater) | `Class`  |

///

### ScrollView

`<ScrollView>` is a UI component that shows a scrollable content area. Content can be scrolled vertically or horizontally.

It's important to note that `<ScrollView>` extends [`ContentView`](https://docs.nativescript.org/api-reference/classes/_ui_content_view_.contentview), so it can only have a single child element.

---

/// flavor plain

```xml
<!--
    The default value of the orientation property is 'vertical'.
    The ScrollView also supports 'horizontal' as orientation value
-->
<ScrollView scroll="onScroll">
    <GridLayout rows="200 200 200 200 200 200 200 200 200 200">
        <Label row="0" text="Some row content goes here..."/>
        <Label row="1" text="Some row content goes here..."/>
        <Label row="2" text="Some row content goes here..."/>
        <Label row="3" text="Some row content goes here..."/>
        <Label row="4" text="Some row content goes here..."/>
        <Label row="5" text="Some row content goes here..."/>
        <Label row="6" text="Some row content goes here..."/>
        <Label row="7" text="Some row content goes here..."/>
        <Label row="8" text="Some row content goes here..."/>
        <Label row="9" text="Some row content goes here..."/>
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

#### Props

| name                        | type      | description                                                                                                                 |
| --------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------- |
| `orientation`               | `String`  | Gets or sets the direction in which the content can be scrolled: `horizontal` or `vertical`.<br/>Default value: `vertical`. |
| `scrollBarIndicatorVisible` | `Boolean` | Specifies if the scrollbar is visible.<br/>Default value: `true`.                                                           |

#### Events

| Name     | Description                         |
| -------- | ----------------------------------- |
| `scroll` | Emitted when a scroll event occurs. |

#### API References

| Name                                                                                                          | Type        |
| ------------------------------------------------------------------------------------------------------------- | ----------- |
| [@nativescript/core/ui/scroll-view](http://docs.nativescript.org/api-reference/modules/_ui_scroll_view_.html) | `Module`    |
| [ScrollView](https://docs.nativescript.org/api-reference/classes/_ui_scroll_view_.scrollview)                 | `Class`     |
| [orientation](https://docs.nativescript.org/api-reference/classes/_ui_scroll_view_.scrollview#orientation)    | `Property`  |
| [ScrollEventData](https://docs.nativescript.org/api-reference/interfaces/_ui_scroll_view_.scrolleventdata)    | `Interface` |

#### Native component

| Android                                                                          | iOS                                                                            |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`android.view`](https://developer.android.com/reference/android/view/View.html) | [`UIScrollView`](https://developer.apple.com/documentation/uikit/uiscrollview) |

### SearchBar

`<SearchBar>` is a UI component that provides a user interface for entering search queries and submitting requests to the search provider.

---

/// flavor plain

```xml
  <SearchBar id="searchBar" hint="Enter search term here ..." text="{{sbText}}" clear="onClear" submit="onSubmit" />
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

#### API References

| Name                                                                                                    | Type     |
| ------------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/search-bar](https://docs.nativescript.org/api-reference/modules/_ui_search_bar_) | `Module` |
| [SearchBar](https://docs.nativescript.org/api-reference/classes/_ui_search_bar_.searchbar)              | `Class`  |

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

/// flavor plain

```xml
<SegmentedBar row="0"  class="m-5" selectedIndex="{{ sbSelectedIndex }}">
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

#### Events

| Name                  | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `selectedIndexChange` | Emitted when the an item on the segmented bar is tapped. |

####

API Reference
[SegmentedBar](http://docs.nativescript.org/api-reference/modules/_ui_segmented_bar_.html)

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

| Name       | Type     | Description                                                                      |
| ---------- | -------- | -------------------------------------------------------------------------------- |
| `value`    | `Number` | Gets or sets the currently selected value of the slider.<br/>Default value: `0`. |
| `minValue` | `Number` | Gets or sets the minimum value of the slider.<br/>Default value: `0`.            |
| `maxValue` | `Number` | Gets or sets the maximum value of the slider.<br/>Default value: `100`.          |

#### Events

| Name          | Description                                   |
| ------------- | --------------------------------------------- |
| `valueChange` | Emitted when the value of the slider changes. |

#### API References

| Name                                                                                                | Type     |
| --------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/slider](http://docs.nativescript.org/api-reference/modules/_ui_slider_.html) | `Module` |
| [Slider](https://docs.nativescript.org/api-reference/classes/_ui_slider_.slider)                    | `Class`  |

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
<Switch checked="true" loaded="onSwitchLoaded"/>
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

| Name      | Type      | Description                                                                 |
| --------- | --------- | --------------------------------------------------------------------------- |
| `checked` | `Boolean` | Gets or sets the value of the switch selection.<br/>Default value: `false`. |

#### Events

| Name            | Description                                |
| --------------- | ------------------------------------------ |
| `checkedChange` | Emitted when the switch selection changes. |

#### API References

| Name                                                                                                | Type     |
| --------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/switch](http://docs.nativescript.org/api-reference/modules/_ui_switch_.html) | `Module` |
| [Switch](https://docs.nativescript.org/api-reference/classes/_ui_switch_.switch)                    | `Class`  |

#### Native component

| Android                                                                                       | iOS                                                                    |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`android.widget.Switch`](https://developer.android.com/reference/android/widget/Switch.html) | [`UISwitch`](https://developer.apple.com/documentation/uikit/uiswitch) |

### TabView

`<TabView>` is a navigation component that shows content grouped into tabs and lets users switch between tabs.

---

/// flavor plain

```xml
<TabView loaded="onLoaded" selectedIndex="{{tabSelectedIndex}}" selectedIndexChanged="onSelectedIndexChanged"
androidTabsPosition="bottom" androidOffscreenTabLimit="0">
    <TabViewItem title="Profile">
        <StackLayout>
            <Label text="{{ tabSelectedIndexResult }}" class="h2 m-t-16 text-center" textWrap="true" />
            <Button text="Change Tab" tap="changeTab" class="btn btn-primary btn-active" />
        </StackLayout>
    </TabViewItem>
    <TabViewItem title="Stats">
        <StackLayout>
            <Label text="{{ tabSelectedIndexResult }}" class="h2 m-t-16 text-center" textWrap="true" />
            <Button text="Change Tab" tap="changeTab" class="btn btn-primary btn-active" />
        </StackLayout>
    </TabViewItem>
    <TabViewItem title="Settings">
        <StackLayout>
            <Label text="{{ tabSelectedIndexResult }}" class="h2 m-t-16 text-center" textWrap="true" />
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

#### Styling

The `TabView` component has the following unique styling properties:

- `tabTextColor` (corresponding CSS property `tab-text-color` ) - Changes the text color for the tabs.

- `selectedTabTextColor` (corresponding CSS property `selected-tab-text-color` ) - Changes the color of the text for the selected tab.

- `tabBackgroundColor` (corresponding CSS property `tab-background-color`) - Sets the background color of the tabs.

- `tabTextFontSize` (corresponding CSS property `tab-text-font-size`) - Sets the font size of the tabs.

- `textTransform` (corresponding CSS property `text-transform`) - Sets the text transform individually for every `TabViewItem`. Value options: `capitalize`, `lowercase`, `none`, and `uppercase`.

- `androidSelectedTabHighlightColor`<sup>android specific property</sup> (corresponding CSS property `android-selected-tab-highlight-color`) - Sets the underline color of the tabs in Android.

#### Props

| Name                               | Type                                                  | Description                                                                                                                       |
| ---------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `selectedIndex`                    | `Number`                                              | Gets or sets the currently selected tab. Default is `0`.                                                                          |
| `tabTextColor`                     | `Color`                                               | (Style property) Gets or sets the text color of the tabs titles.                                                                  |
| `tabTextFontSize`                  | `Color`                                               | Gets or sets the font size of the tabs titles.                                                                                    |
| `tabBackgroundColor`               | `Color`                                               | (Style property) Gets or sets the background color of the tabs.                                                                   |
| `selectedTabTextColor`             | `Color`                                               | (Style property) Gets or sets the text color of the selected tab title.                                                           |
| `androidTabsPosition`              | `String`                                              | Sets the position of the TabView in Android platform<br/>Valid values: `top` or `bottom`.                                         |
| `androidOffscreenTabLimit`         | `number`                                              | Gets or sets the number of tabs that should be retained to either side of the current tab in the view hierarchy in an idle state. |
| `androidSelectedTabHighlightColor` | `Color`                                               | Gets or sets the color of the horizontal line drawn below the currently selected tab on Android.                                  |
| `iosIconRenderingMode`             | _"automatic"_, _"alwaysOriginal"_, _"alwaysTemplate"_ | Gets or sets the icon rendering mode on iOS.                                                                                      |

#### TabViewItem Properties

| Name         | Type     | Description                                                                                                                                  |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`      | `string` | Gets or sets the title of the tab strip entry.                                                                                               |
| `iconSource` | `string` | Gets or sets the icon source of the tab strip entry. Supports local image paths (`~`), resource images (`res://`) and icon fonts (`font://`) |

#### Events

| Name                  | Description                                                                                                                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectedIndexChange` | Emits [an event object](https://docs.nativescript.org/api-reference/interfaces/_ui_tab_view_.selectedindexchangedeventdata) containing an `newIndex` property with the index of the tapped `<TabViewItem>` (and an `oldIndex` property with the index of the previous tab). |

#### API References

| Name                                                                                                                                | Type        |
| ----------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [@nativescript/core/ui/tab-view](http://docs.nativescript.org/api-reference/modules/_ui_tab_view_.html)                             | `Module`    |
| [TabView](https://docs.nativescript.org/api-reference/classes/_ui_tab_view_.tabview)                                                | `Class`     |
| [TabViewItem](https://docs.nativescript.org/api-reference/classes/_ui_tab_view_.tabviewitem)                                        | `Class`     |
| [SelectedIndexChangedEventData](https://docs.nativescript.org/api-reference/interfaces/_ui_tab_view_.selectedindexchangedeventdata) | `Interface` |

#### Native component

| Android                                                                                                               | iOS                                                                                        |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`android.support.v4.view.ViewPager`](https://developer.android.com/reference/android/support/v4/view/ViewPager.html) | [`UITabBarController`](https://developer.apple.com/documentation/uikit/uitabbarcontroller) |

### TextField

`<TextField>` is an input component that creates an editable single-line box.

`<TextField>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/_ui_text_base_.textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/_ui_editor_text_base_.editabletextbase) which provide additional properties and events.

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

| Name                     | Type                                                                                                                         | Description                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `text`                   | `String`                                                                                                                     | Gets or sets the value of the field.                                                                               |
| `hint`                   | `String`                                                                                                                     | Gets or sets the placeholder text.                                                                                 |
| `isEnabled`              | `Boolean`                                                                                                                    | Make the field disabled or enabled. Default value is `true`.                                                       |
| `editable`               | `Boolean`                                                                                                                    | When `true`, indicates that the user can edit the value of the field.                                              |
| `maxLength`              | `Number`                                                                                                                     | Limits input to the specified number of characters.                                                                |
| `secure`                 | `Boolean`                                                                                                                    | Hides the entered text when `true`. Use this property to create password input fields.<br/>Default value: `false`. |
| `keyboardType`           | `KeyboardType`                                                                                                               | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`. |
| `returnKeyType`          | `ReturnKeyType`                                                                                                              | Gets or sets the label of the return key.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`.             |
| `autocorrect`            | `Boolean`                                                                                                                    | Enables or disables autocorrect.                                                                                   |
| `autocapitalizationType` | [`AutocapitalizationType`](https://docs.nativescript.org/api-reference/modules/_ui_editor_text_base_#autocapitalizationtype) | Gets or sets the autocapitalization type.                                                                          |
| `letterSpacing`          | `number`                                                                                                                     | Gets or sets letter space style property.                                                                          |
| `lineHeight`             | `number`                                                                                                                     | Gets or sets line height style property.                                                                           |
| `textAlignment`          | `TextAlignment`                                                                                                              | Gets or sets the text alignment.                                                                                   |
| `textDecoration`         | `TextDecoration`                                                                                                             | Gets or sets the text decoration.                                                                                  |
| `textTransform`          | `TextTransform`                                                                                                              | Gets or sets the text transform.                                                                                   |
| `whiteSpace`             | `WhiteSpace`                                                                                                                 | Gets or sets white space style property.                                                                           |

#### Events

| Name          | Description                             |
| ------------- | --------------------------------------- |
| `textChange`  | Emitted when the text changes.          |
| `returnPress` | Emitted when the return key is pressed. |
| `focus`       | Emitted when the field is in focus.     |
| `blur`        | Emitted when the field loses focus.     |

#### API References

| Name                                                                                                        | Type     |
| ----------------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/text-field](http://docs.nativescript.org/api-reference/modules/_ui_text_field_.html) | `Module` |
| [TextField](https://docs.nativescript.org/api-reference/classes/_ui_text_field_.textfield)                  | `Class`  |

#### Native component

| Android                                                                                           | iOS                                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.EditText`](https://developer.android.com/reference/android/widget/EditText.html) | [`UITextField`](https://developer.apple.com/documentation/uikit/uitextfield) |

### TextView

`<TextView>` is a UI component that shows an editable or a read-only multi-line text container. You can use it to let users type large text in your app or to show longer, multi-line text on the screen.

`<TextView>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/_ui_text_base_.textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/_ui_editor_text_base_.editabletextbase) which provide additional properties and events.

---

/// flavor plain

```xml
<TextView loaded="onTextViewLoaded" hint="Enter Date" text="{{ viewDate }}" secure="false" keyboardType="datetime" returnKeyType="done" autocorrect="false" maxLength="10">
</TextView>
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

#### API References

| Name                                                                                                      | Type     |
| --------------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/text-view](http://docs.nativescript.org/api-reference/modules/_ui_text_view_.html) | `Module` |
| [TextView](https://docs.nativescript.org/api-reference/classes/_ui_text_view_.textview)                   | `Class`  |

#### Native component

| Android                                                                                           | iOS                                                                        |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`android.widget.EditText`](https://developer.android.com/reference/android/widget/EditText.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview) |

### TimePicker

`<TimePicker>` is a UI component that lets users select time.

> See also: [DatePicker](/en/docs/elements/components/date-picker).

---

/// flavor plain

```xml
<TimePicker hour="10" minute="25"
            loaded="onPickerLoaded"
            row="2" col="0" colSpan="2"
            class="m-15" verticalAlignment="center">
</TimePicker>
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

#### API References

| Name                                                                                                           | Type     |
| -------------------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/ui/time-picker](http://docs.nativescript.org/api-reference/modules/_ui_time_picker_.html)) | `Module` |
| [TimePicker](https://docs.nativescript.org/api-reference/classes/_ui_time_picker_.timepicker)                  | `Class`  |

#### Native component

| Android                                                                                          | iOS                                                                            |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [`android.widget.TimePicker`](https://developer.android.com/reference/android/widget/TimePicker) | [`UIDatePicker`](https://developer.apple.com/documentation/uikit/uidatepicker) |

### WebView

`<WebView>` is a UI component that lets you show web content in your app. You can pull and show content from a URL or a local HTML file, or you can render static HTML content.

See also: [HtmlView](/en/docs/elements/components/html-view).

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

| Name  | Type     | Description                                                                                                               |
| ----- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `src` | `String` | Gets or sets the displayed web content.<br/>Valid values: an absolute URL, the path to a local HTML file, or static HTML. |

#### Events

| Name           | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `loadStarted`  | Emitted when the page has started loading in the `<WebView>`.  |
| `loadFinished` | Emitted when the page has finished loading in the `<WebView>`. |

#### API References

| Name                                                                                                     | Type         |
| -------------------------------------------------------------------------------------------------------- | ------------ |
| [@nativescript/core/ui/web-view](http://docs.nativescript.org/api-reference/modules/_ui_web_view_.html)) | `Module`     |
| [WebView](https://docs.nativescript.org/api-reference/classes/_ui_web_view_.webview)                     | `Class`      |
| [LoadEventData](https://docs.nativescript.org/api-reference/interfaces/_ui_web_view_.loadeventdata)      | `Interface`  |
| [NavigationType](https://docs.nativescript.org/api-reference/modules/_ui_web_view_#navigationtype)       | type aliases |

#### Native component

| Android                                                                                    | iOS                                                                       |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [`android.webkit.WebView`](https://developer.android.com/reference/android/webkit/WebView) | [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) |

## CSS
