---
title: Label
---

## Label

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

### Props

| Name             | Type                                                             | Description                                                                                                                        |
| ---------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `letterSpacing`  | `number`                                                         | Gets or sets letterSpace style property.                                                                                           |
| `lineHeight`     | `number`                                                         | Gets or sets lineHeight style property.                                                                                            |
| `text`           | `string`                                                         | Gets or sets the Label text.                                                                                                       |
| `textAlignment`  | `initial`, `left`, `center`, `right`, `justify`                  | Gets or sets text-alignment style property.                                                                                        |
| `textDecoration` | `none`, `underline`, `line-through`, `underline`, `line-through` | Gets or sets text swcoration style property.                                                                                       |
| `textTransform`  | `initial`, `none`, `capitalize`, `uppercase`, `lowercase`        | Gets or sets text transform style property.                                                                                        |
| `textWrap`       | `boolean`                                                        | Gets or sets whether the Label wraps text or not.                                                                                  |
| `whiteSpace`     | `initial`, `normal`, `nowrap`                                    | Gets or sets the white space style.                                                                                                |
| `...Inherited`   | `Inherited`                                                      | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/label) |

<!-- TODO: fix links -->

### Events

| Name         | Description                             |
| ------------ | --------------------------------------- |
| `textChange` | Emitted when the label text is changed. |

### Native component

| Android                                                                                           | iOS                                                                  |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UILabel`](https://developer.apple.com/documentation/uikit/uilabel) |

<!-- TODO: reference link: https://github.com/nativescript-vue/nativescript-vue.org/tree/master/content/docs/en/elements/components -->
