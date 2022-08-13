---
title: TextView
---

## TextView

`<TextView>` is a UI component that shows an editable or a read-only multi-line text container. You can use it to let users type large text in your app or to show longer, multi-line text on the screen.

`<TextView>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/editabletextbase) which provide additional properties and events.

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

/// flavor svelte

```html
<textView text="Multi\nLine\nText" />
```

`<textView>` provides two-way data binding using `bind`.

```html
<textView bind:text="{textViewValue}" />
```

///

/// flavor react

```tsx
<textView text={'Multi\nLine\nText'} />
```

///

### Displaying multi-style text

To apply multiple styles to the text in your `<TextView>`, you can use `<FormattedString>`

/// flavor vue

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

///

/// flavor svelte

```tsx
<textView editable="{false}">
  <formattedString>
    <span text="You can use text attributes such as " />
    <span text="bold, " fontWeight="Bold" />
    <span text="italic " fontStyle="Italic" />
    <span text="and " />
    <span text="underline." textDecoration="Underline" />
  </formattedString>
</textView>
```

///

/// flavor plain

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

///

/// flavor angular

```html
<TextView editable="false">
  <FormattedString>
    <span text="You can use text attributes such as "></span>
    <span text="bold, " fontWeight="Bold"></span>
    <span text="italic " fontStyle="Italic"></span>
    <span text="and "></span>
    <span text="underline." textDecoration="Underline"></span>
  </FormattedString>
</TextView>
```

///

/// flavor react

```tsx
<textView editable={false}>
  <formattedString>
    <span text="You can use text attributes such as " />
    <span text="bold, " fontWeight="bold" />
    <span text="italic " fontStyle="italic" />
    <span text="and " />
    <span text="underline." textDecoration="underline" />
    <!-- To set text on the <span> element, please do use the `text` prop; it can't safely take text nodes as children! -->
  </formattedString>
</textView>
```

///

### Props

| Name            | Type                                                                                                                                    | Description                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `text`          | `String`                                                                                                                                | Gets or sets the value of the component.                                                                                              |
| `hint`          | `String`                                                                                                                                | Gets or sets the placeholder text when the component is editable.                                                                     |
| `editable`      | `Boolean`                                                                                                                               | When `true`, indicates that the user can edit the contents of the container.                                                          |
| `maxLength`     | `Number`                                                                                                                                | Sets the maximum number of characters that can be entered in the container.                                                           |
| `keyboardType`  | `KeyboardType`                                                                                                                          | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`.                    |
| `returnKeyType` | Gets or sets the label of the return key. Currently supported only on iOS.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`. |
| `autocorrect`   | `Boolean`                                                                                                                               | Enables or disables autocorrect.                                                                                                      |
| `...Inherited`  | `Inherited`                                                                                                                             | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/textview) |

### Events

| Name          | Description                             |
| ------------- | --------------------------------------- |
| `textChange`  | Emitted when the text changes.          |
| `returnPress` | Emitted when the return key is pressed. |
| `focus`       | Emitted when the container is in focus. |
| `blur`        | Emitted when the container loses focus. |

### Native component

| Android                                                                                           | iOS                                                                        |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`android.widget.EditText`](https://developer.android.com/reference/android/widget/EditText.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview) |
