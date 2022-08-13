---
title: HtmlView
---

## HtmlView

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

### Props

| Name           | Type        | Description                                                                                                                           |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `html`         | `String`    | The HTML content to be shown.                                                                                                         |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/htmlview) |

### Native component

| Android                                                                                           | iOS                                                                        |
| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`android.widget.TextView`](https://developer.android.com/reference/android/widget/TextView.html) | [`UITextView`](https://developer.apple.com/documentation/uikit/uitextview) |
