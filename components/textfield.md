---
title: TextField
---

## TextField

`<TextField>` is an input component that creates an editable single-line box.

`<TextField>` extends [`TextBase`](https://docs.nativescript.org/api-reference/classes/textbase) and [`EditableTextBase`](https://docs.nativescript.org/api-reference/classes/editabletextbase) which provide additional properties and events.

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
    // Gets or sets the secure without autofill for iOS 12+ (e.g. for passwords).
    console.log(textField.secureWithoutAutofill)
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
      textField.dismissSoftInput() // Hides the soft input method, usually a soft keyboard.
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

/// flavor svelte

```tsx
<textField text="{textFieldValue}" hint="Enter text..." />
```

`<textField>` provides two-way data binding using `bind`.

```html
<textField bind:text="{textFieldValue}" />
```

///

/// flavor react

```tsx
<textField text={textFieldValue} hint="Enter text..." />
```

///

### Props

| Name                     | Type                                                                                                             | Description                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `text`                   | `String`                                                                                                         | Gets or sets the value of the field.                                                                                                   |
| `hint`                   | `String`                                                                                                         | Gets or sets the placeholder text.                                                                                                     |
| `isEnabled`              | `Boolean`                                                                                                        | Make the field disabled or enabled. Default value is `true`.                                                                           |
| `editable`               | `Boolean`                                                                                                        | When `true`, indicates that the user can edit the value of the field.                                                                  |
| `maxLength`              | `Number`                                                                                                         | Limits input to the specified number of characters.                                                                                    |
| `secure`                 | `Boolean`                                                                                                        | Hides the entered text when `true`. Use this property to create password input fields.<br/>Default value: `false`.                     |
| `secureWithoutAutofill`  | `Boolean`                                                                                                        | Prevent iOS 12+ auto suggested strong password handling (iOS Only)                                                                     |
| `keyboardType`           | `KeyboardType`                                                                                                   | Shows a custom keyboard for easier text input.<br/>Valid values: `datetime`, `phone`, `number`, `url`, or `email`.                     |
| `returnKeyType`          | `ReturnKeyType`                                                                                                  | Gets or sets the label of the return key.<br/>Valid values: `done`, `next`, `go`, `search`, or `send`.                                 |
| `autocorrect`            | `Boolean`                                                                                                        | Enables or disables autocorrect.                                                                                                       |
| `autocapitalizationType` | [`AutocapitalizationType`](https://docs.nativescript.org/api-reference/modules/coretypes.autocapitalizationtype) | Gets or sets the autocapitalization type.                                                                                              |
| `letterSpacing`          | `number`                                                                                                         | Gets or sets letter space style property.                                                                                              |
| `lineHeight`             | `number`                                                                                                         | Gets or sets line height style property.                                                                                               |
| `textAlignment`          | `TextAlignment`                                                                                                  | Gets or sets the text alignment.                                                                                                       |
| `textDecoration`         | `TextDecoration`                                                                                                 | Gets or sets the text decoration.                                                                                                      |
| `textTransform`          | `TextTransform`                                                                                                  | Gets or sets the text transform.                                                                                                       |
| `whiteSpace`             | `WhiteSpace`                                                                                                     | Gets or sets white space style property.                                                                                               |
| `...Inherited`           | `Inherited`                                                                                                      | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/textfield) |

### Events

| Name          | Description                             |
| ------------- | --------------------------------------- |
| `textChange`  | Emitted when the text changes.          |
| `returnPress` | Emitted when the return key is pressed. |
| `focus`       | Emitted when the field is in focus.     |
| `blur`        | Emitted when the field loses focus.     |

### Native component

| Android                                                                                           | iOS                                                                          |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.EditText`](https://developer.android.com/reference/android/widget/EditText.html) | [`UITextField`](https://developer.apple.com/documentation/uikit/uitextfield) |
