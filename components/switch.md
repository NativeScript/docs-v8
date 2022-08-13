---
title: Switch
---

## Switch

`<Switch>` is a UI component that lets users toggle between two states.

The default state is `false` or OFF.

---

### Example: Simple Switch

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
<Switch checked="true" (checkedChange)="onCheckedChange($event)"> </Switch>
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

/// flavor svelte

```tsx
<switch checked="{true}" on:checkedChange="{onCheckedChange}" />
```

`<switch>`provides two-way data binding for `checked`.

```tsx
<switch bind:checked="{switchEnabled}" />
```

///

/// flavor react

```tsx
<switch checked={true} />
```

///

### Props

| Name           | Type        | Description                                                                                                                         |
| -------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `checked`      | `Boolean`   | Gets or sets the value of the switch selection.<br/>Default value: `false`.                                                         |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/switch) |

<!-- TODO: fix links -->

### Events

| Name            | Description                                |
| --------------- | ------------------------------------------ |
| `checkedChange` | Emitted when the switch selection changes. |

### Native component

| Android                                                                                       | iOS                                                                    |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [`android.widget.Switch`](https://developer.android.com/reference/android/widget/Switch.html) | [`UISwitch`](https://developer.apple.com/documentation/uikit/uiswitch) |
