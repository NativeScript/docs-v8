---
title: WebView
---

## WebView

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

/// flavor svelte

```html
<webView src="http://nativescript.org/" />

<webView src="~/html/index.html" />

<webView src="<div><h1>Some static HTML</h1></div>" />
```

///

/// flavor react

```tsx
<webView src="http://nativescript.org/" />

<webView src="~/html/index.html" />

<webView src="<div><h1>Some static HTML</h1></div>" />
```

///

::: tip Tip
To be able to use gestures in WebView component on Android, we should first disabled the zoom control. To do that we could access the android property and with the help of setDisplayZoomControls to set this control to false.
:::

### Props

| Name           | Type        | Description                                                                                                                          |
| -------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `src`          | `String`    | Gets or sets the displayed web content.<br/>Valid values: an absolute URL, the path to a local HTML file, or static HTML.            |
| `...Inherited` | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/webview) |

### Events

| Name           | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `loadStarted`  | Emitted when the page has started loading in the `<WebView>`.  |
| `loadFinished` | Emitted when the page has finished loading in the `<WebView>`. |

### Native component

| Android                                                                                    | iOS                                                                       |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [`android.webkit.WebView`](https://developer.android.com/reference/android/webkit/WebView) | [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) |
