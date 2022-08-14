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

### Static Props

| Name                        | Type                   | Description                                                                  |
| --------------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| `defaultAnimatedNavigation` | `boolean`              | Gets or sets if navigation transitions should be animated globally.          |
| `defaultTransition`         | `NavigationTransition` | Gets or sets the default NavigationTransition for all frames across the app. |

### Props

| Name                  | Type                            | Description                                                                             |
| --------------------- | ------------------------------- | --------------------------------------------------------------------------------------- |
| `backStack`           | `Array<BackstackEntry>`         | Gets the back stack of this instance.                                                   |
| `currentPage`         | `Page`                          | Gets the Page instance the Frame is currently navigated to.                             |
| `currentEntry`        | `NavigationEntry`               | Gets the NavigationEntry instance the Frame is currently navigated to.                  |
| `animated`            | `boolean`                       | Gets or sets if navigation transitions should be animated.                              |
| `transition`          | `NavigationTransition`          | Gets or sets the default navigation transition for this frame.                          |
| `actionBarVisibility` | `'auto' \| 'never' \| 'always'` | Used to control the visibility the Navigation Bar in iOS and the Action Bar in Android. |

### Static Methods

| Name                       | Return Type | Description                                                                                                                                                                                                                      |
| -------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getFrameById(id: string)` | `Frame`     | Gets a frame by id.                                                                                                                                                                                                              |
| `topmost()`                | `Frame`     | Gets the topmost frame in the frames stack. An application will typically has one frame instance. Multiple frames handle nested (hierarchical) navigation scenarios.                                                             |
| `goBack()`                 |             | Navigates back using the navigation hierarchy (if any). Updates the Frame stack as needed. This method will start from the topmost Frame and will recursively search for an instance that has the canGoBack operation available. |

### Instance Methods

| Name                               | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `goBack(to?: BackstackEntry)`      |           | Navigates to the previous entry (if any) in the back stack.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `canGoBack()`                      | `boolean` | Checks whether the goBack operation is available.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `navigate(pageModuleName: string)` |           | Navigates to a Page instance as described by the module name. This method will require the module and will check for a Page property in the exports of the module. <br> `pageModuleName:` The name of the module to require starting from the application root. For example if you want to navigate to page called "myPage.js" in a folder called "subFolder" and your root folder is "app" you can call navigate method like this: <br>`import { Frame }"@nativescript/core"; Frame.topmost().navigate("app/subFolder/myPage");` |
| `navigate(create: () => Page)`     |           | Creates a new Page instance using the provided callback and navigates to that Page. <br> `create:` The function to be used to create the new Page instance.                                                                                                                                                                                                                                                                                                                                                                       |
| `navigate(entry: NavigationEntry)` |           | Creates a new Page instance using the provided callback and navigates to that Page. <br> Since there are a couple of ways to specify a Page instance through an entry, there is a resolution priority:<br> `1.` entry.moduleName <br> `2.` entry.create() <br>`entry`: The NavigationEntry instance.                                                                                                                                                                                                                              |

### Other function(s)

| Name                           | Return Type | Description                                                                                                                                                                                                                                            |
| ------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `setFragmentClass(class: any)` | `void`      | Sets the extended `androidx.fragment.app.Fragment` class to the Frame and navigation routine. An instance of this class will be created to represent the Page currently visible on the srceen. This method is available only for the Android platform. |

|

### NavigationEntry interface

| Name                | Return Type            | Description                                                                                                                                                                                            |
| ------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `moduleName`        | `string`               | The name of the module containing the View instance to load.                                                                                                                                           |
| `create()`          | `View`                 | A function used to create the View instance.                                                                                                                                                           |
| `context`           | `any`                  | An object passed to the onNavigatedTo callback of the Page. Typically this is used to pass some data among pages.                                                                                      |
| `bindingContext`    | `any`                  | An object to become the binding context of the page navigating to. Optional.                                                                                                                           |
| `animated`          | `boolean`              | True to navigate to the new Page using animated transitions, false otherwise.                                                                                                                          |
| `transition`        | `NavigationTransition` | Specifies an optional navigation transition for all platforms. If not specified, the default platform transition will be used.                                                                         |
| `transitionAndroid` | `NavigationTransition` | Specifies an optional navigation transition for Android. If not specified, the default platform transition will be used.                                                                               |
| `transitioniOS`     | `NavigationTransition` | Specifies an optional navigation transition for iOS. If not specified, the default platform transition will be used.                                                                                   |
| `backstackVisible`  | `boolean`              | True to record the navigation in the backstack, false otherwise. If the parameter is set to false then the Page will be displayed but once navigated from it will not be able to be navigated back to. |
| `clearHistory`      | `boolean`              | True to clear the navigation history, false otherwise. Very useful when navigating away from login pages.                                                                                              |

|

### Native component

| Android                                                                                                                                                                                                | iOS                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| [`org.nativescript.widgets.ContentLayout`](https://github.com/NativeScript/NativeScript/blob/master/packages/ui-mobile-base/android/widgets/src/main/java/org/nativescript/widgets/ContentLayout.java) | [`UINavigationController`](https://developer.apple.com/documentation/uikit/uinavigationcontroller) |
