---
title: Frame
---

## Frame

`<Frame>` is a UI component used to display [`<Page>`](/ui-and-styling.html#page) elements. Every app needs at least a single `<Frame>` element, usually set as the root element.

---

### A single root Frame

/// flavor

```js
new Vue({
  render: h => h('Frame', [h(HomePageComponent)])
})
```

///

### Multiple Frames

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

### Props

| Name           | Type                    | Description                                                            |
| -------------- | ----------------------- | ---------------------------------------------------------------------- |
| `backStack`    | `Array<BackstackEntry>` | Gets the back stack of this instance.                                  |
| `currentPage`  | `Page`                  | Gets the Page instance the Frame is currently navigated to.            |
| `currentEntry` | `NavigationEntry`       | Gets the NavigationEntry instance the Frame is currently navigated to. |
| `animated`     | `boolean`               | Gets or sets if navigation transitions should be animated.             |
| `transition`   | `NavigationTransition`  | Gets or sets the default navigation transition for this frame.         |
| `transition`   | `NavigationTransition`  | Gets or sets the default navigation transition for this frame.         |

### Static Methods

| Name                       | Type    | Description                                                                                                                                                                                                                      |
| -------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getFrameById(id: string)` | `Frame` | Gets a frame by id.                                                                                                                                                                                                              |
| `topmost()`                | `Frame` | Gets the topmost frame in the frames stack. An application will typically has one frame instance. Multiple frames handle nested (hierarchical) navigation scenarios.                                                             |
| `goBack()`                 |         | Navigates back using the navigation hierarchy (if any). Updates the Frame stack as needed. This method will start from the topmost Frame and will recursively search for an instance that has the canGoBack operation available. |

### Instance Methods

| Name                               | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `goBack(to?: BackstackEntry)`      |           | Navigates to the previous entry (if any) in the back stack.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `canGoBack()`                      | `boolean` | Checks whether the goBack operation is available.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `navigate(pageModuleName: string)` | `boolean` | Navigates to a Page instance as described by the module name. This method will require the module and will check for a Page property in the exports of the module. <br> `pageModuleName:` The name of the module to require starting from the application root. For example if you want to navigate to page called "myPage.js" in a folder called "subFolder" and your root folder is "app" you can call navigate method like this: <br>`import { Frame }"@nativescript/core"; Frame.topmost().navigate("app/subFolder/myPage");` |

### Native component

| Android                                                                                                                                                                                                | iOS                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| [`org.nativescript.widgets.ContentLayout`](https://github.com/NativeScript/NativeScript/blob/master/packages/ui-mobile-base/android/widgets/src/main/java/org/nativescript/widgets/ContentLayout.java) | [`UINavigationController`](https://developer.apple.com/documentation/uikit/uinavigationcontroller) |
