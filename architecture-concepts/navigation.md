---
title: Navigation
---

## Navigation

Navigation refers to the act of moving around the screens of your application. Each mobile app has its own unique navigation schema based on the information it tries to present. The schema below is an example of a common mobile navigation scenario.
![schema](</assets/images/architecture_concepts/navigation-schema%20(1).png>)

Based on the schema, there are three distinct navigational directions a user can move in:

- **Forward** - refers to navigating to a screen on the next level in the hierarchy.
- **Backward** - refers to navigating back to a screen either on the previous level in the hierarchy or chronologically.
- **Lateral** - refers to navigating between screens on the same level in the hierarchy.

This article demonstrates how you can implement these in NativeScript and combine them to build the navigation architecture of your application.

## Forward Navigation

![Forward navigation schema](/assets/images/architecture_concepts/navigation-schema-forward.png)

Forward navigation can be also called **downward** navigation since you are going down in your navigation hierarchy. There are two navigation components in NativeScript that enable implementing forward navigation - [Frame](/ui/components.md#frame) and [Page](/ui/components.md#page). A Frame represents a navigation controller that navigates through Page instances.

![Forward navigation schema](/assets/images/architecture_concepts/navigation-diagram-forward.png)

### Page

The Page is NativeScript's most basic navigation component. It represents a screen that the user can navigate to. This component serves two important roles. It holds the UI components of a single screen and provides navigation lifecycle events.

By design, a Page can't be declared as a child of another component. It is used as a root component of a module, in which case the module becomes a page module. Here is an example of how you can implement the item-page module from the diagram above:

<!--tab: item-page.xml -->

```xml
<Page loaded="onPageLoaded">
  <ActionBar title="Item" class="action-bar" />

  <StackLayout>
    <Label text="Item Details" />
  </StackLayout>
</Page>
```

<!--tab: item-page.js -->

```js
export function onPageLoaded(args) {
  console.log('Page Loaded')
}
```

<!--tab: item-page.ts -->

```ts
import { EventData } from '@nativescript/core'

export function onPageLoaded(args: EventData): void {
  console.log('Page Loaded')
}
```

### Frame

To display a Page on the screen, you need to navigate to it using the Frame component. This component is the main provider of forward and backward navigation in NativeScript. The Frame component has no visible representation. It simply provides a container for transitions between pages. It also provides a navigation API which includes history manipulation and setting custom navigation transitions.

For the most basic forward navigation scenario, you need only these two features:

- `defaultPage` attribute - use this attribute to declare the initial page module that is displayed.
- `navigate()` method - use this method to force a navigation to another page module.

The following example demonstrates the implementation of the rest of the forward navigation diagram above. There is a Frame declared as root component in the app-root module. Upon load, the `Frame` will automatically navigate to the `featured-page` module. The `featured-page` module in turn has a button that navigates to the `item-page` module.

<!--tab: app-root.xml -->

```xml
<Frame id="featured" defaultPage="featured-page" />
```

<!--tab: featured-page.xml -->

```xml
<Page>
  <ActionBar title="Featured" class="action-bar" />

  <StackLayout>
    <Button text="navigate('item-page')" tap="onTap" />
  </StackLayout>
</Page>
```

<!--tab: featured-page.js -->

```js
export function onTap(args) {
  const button = args.object
  const page = button.page
  page.frame.navigate('item-page')
}
```

<!--tab: featured-page.ts -->

```ts
import { EventData, Button, Page } from '@nativescript/core'

export function onTap(args: EventData) {
  const button: Button = <Button>args.object
  const page: Page = button.page
  page.frame.navigate('item-page')
}
```

## Backward Navigation

![Backward Navigation](/assets/images/architecture_concepts/navigation-schema-backward.png)

It can also be called upward navigation since you are going up in your navigation hierarchy. This type of navigation represents the opposite direction of the forward navigation and is supported by the Frame API. To force a navigation back to the previous page module loaded in a Frame simply call its `goBack()` method.

<!--tab:  item-page.xml-->

```xml
<Page loaded="onPageLoaded">
  <ActionBar title="Item" class="action-bar" />

  <StackLayout>
    <Label text="Item Details" />
    <Button text="goBack()" tap="onTap" />
  </StackLayout>
</Page>
```

<!--tab:  item-page.js-->

```js
export function onPageLoaded(args) {
  console.log('Page Loaded')
}

export function onTap(args) {
  const button = args.object
  const page = button.page
  page.frame.goBack()
}
```

<!--tab:  item-page.ts-->

```ts
import { EventData, Button, Page } from '@nativescript/core'

export function onPageLoaded(args: EventData): void {
  console.log('Page Loaded')
}

export function onTap(args: EventData) {
  const button: Button = <Button>args.object
  const page: Page = button.page
  page.frame.goBack()
}
```

:::tip Note
Note: Both the Android hardware button and the iOS back button in the **ActionBar** execute upward navigation. These platform specific navigation controls come out of the box and there is no need for you to implement them yourself.
:::

## Lateral Navigation

![navigation-schema-lateral](/assets/images/architecture_concepts/navigation-schema-lateral.png)

Implementing lateral navigation in NativeScript usually means to incorporate several instances of the Frame component in your navigation and provide means to the user to switch between them. This is usually enabled through specific navigation components. These include **BottomNavigation**, **Tabs**, **TabView**, **SideDrawer**, **Modal View**, and even **Frame** each providing a unique mobile navigation pattern.

### Hub Navigation

The most simple and straight forward way to implement lateral navigation is the hub navigation pattern. It consists of a screen, called a hub, that holds navigation buttons leading to different features. In essence, this pattern uses the same mechanism of forward navigation for lateral navigation. In NativeScript you can implement this with a **Frame** and have one **Page** serve as the hub screen.

[Hub Navigation](/assets/images/architecture_concepts/navigation-diagram-hub.png)

<!--tab: hub-page.xml -->

```xml
<Page class="page">
  <ActionBar title="Hub" class="action-bar" />

  <StackLayout>
    <Button text="navigate('featured-page')" tap="navigateToFeatured" />
    <Button text="navigate('browse-page')" tap="navigateToBrowse" />
    <Button text="navigate('search-page')" tap="navigateToSearch" />
  </StackLayout>
</Page>
```

<!--tab:  hub-page.js -->

```js
export function navigateToFeatured(args) {
  const button = args.object
  const page = button.page
  page.frame.navigate('featured-page')
}

export function navigateToBrowse(args: EventData) {
  const button = args.object
  const page = button.page
  page.frame.navigate('browse-page')
}

export function navigateToSearch(args: EventData) {
  const button = args.object
  const page = button.page
  page.frame.navigate('search-page')
}
```

<!--tab:  hub-page.ts -->

```ts
import { EventData, Button, Page } from '@nativescript/core'

export function navigateToFeatured(args: EventData) {
  const button: Button = <Button>args.object
  const page: Page = button.page
  page.frame.navigate('featured-page')
}

export function navigateToBrowse(args: EventData) {
  const button: Button = <Button>args.object
  const page: Page = button.page
  page.frame.navigate('browse-page')
}

export function navigateToSearch(args: EventData) {
  const button: Button = <Button>args.object
  const page: Page = button.page
  page.frame.navigate('search-page')
}
```

### TabView

The [TabView](/ui/components.md#tabview) component enables the user to arbitrarily navigate between several UI containers at the same level. A key feature of these components is that they keep the state of the containers that are not visible. This means that when the user comes back to a previous tab, the data, scroll position and navigation state should be like they left them. Here is a diagram that demonstrates how the navigation schema can be implemented with a TabView:
![TabView diagram](/assets/images/architecture_concepts/navigation-diagram-tab.png)

### Modal View Navigation

Opening a new **Frame** as a full screen modal view is a very common mobile navigation pattern. In this context opening the modal view represents lateral navigation to a new feature. You can then leverage the embedded **Frame** to navigate forward and backward in this feature. Closing the modal will navigate laterally back to where the modal view was opened from. Below is a diagram that displays how the navigation schema can be implemented using modal views.

![Modal View Navigation](/assets/images/architecture_concepts/navigation-diagram-modal.png)

Each UI component in NativeScript provides two methods for managing modal views:

- `showModal()` - opens a modal view on top of the Page the UI component is part of.
- `closeModal()` - closes the modal view that the UI component is part of.
  To open a modal view you should simply call the `showModal()` method of any UI component instance with a path to the modal root module as parameter.

The following code sample demonstrates how you can implement the Search modal view and page from the diagram above.

<!--tab: app-root.xml -->

```xml
<Frame id="featured" defaultPage="featured-page" />
```

<!--tab: featured-page.xml -->

```xml
<Page>
  <ActionBar title="Featured" class="action-bar" />

  <StackLayout>
    <Button
      text="showModal('search-root', context, closeCallback, fullscreen)"
      tap="openSearchModal"
    />
  </StackLayout>
</Page>
```

<!--tab: featured-page.js -->

```js
export function openSearchModal(args) {
  const view = args.object
  const context = null
  const closeCallback = null
  const fullscreen = true
  view.showModal('search-root', context, closeCallback, fullscreen)
}
```

<!--tab: featured-page.ts -->

```ts
import { EventData, View } from '@nativescript/core'

export function openSearchModal(args: EventData) {
  const view: View = <View>args.object
  const context = null
  const closeCallback = null
  const fullscreen = true
  view.showModal('search-root', context, closeCallback, fullscreen)
}
```

<!--tab: search-root.xml -->

```xml
<Frame id="search" defaultPage="search-page" />
```

<!--tab: search-page.xml -->

```xml
<Page>
  <ActionBar title="Search" class="action-bar" />

  <StackLayout>
    <Button text="closeModal()" tap="closeModal" />
  </StackLayout>
</Page>
```

<!--tab: search-page.js -->

```js
export function closeModal(args) {
  const view = args.object
  view.closeModal()
}
```

<!--tab: search-page.ts -->

```ts
import { EventData, View } from '@nativescript/core'

export function closeModal(args: EventData) {
  const view: View = <View>args.object
  view.closeModal()
}
```

:::tip Note:
In the current scenario the Search feature has only one page and it's possible to implement it directly in the modal view without embedding a Frame in `search-root`. However, in this case there won't be a navigation controller in the modal view and therefore, no ActionBar.
:::

### SideDrawer Navigation

Sidedrawer navigation enables the user to open a hidden view, i.e. drawer, containing navigation controls, or settings from the sides of the screen. There are a lot of navigation patterns that can be implemented using a SideDrawer. You can use the RadSidedrawer or [@nativescript-community/ui-drawer](https://github.com/nativescript-community/ui-drawer) plugin for sidedrawer navigation. A typical usage would be to add UI controls and have them do one of two things:

- **Forward navigation** - get a reference to a navigation Frame and navigate in it.-
- **Lateral navigation** - open a modal view.
  The simplest navigation pattern that you can implement is again the hub navigation pattern, but this time with the `SideDrawer` serving as the hub.

![Sidedrawr](/assets/images/architecture_concepts/navigation-diagram-drawer-hub.png)

The component itself doesn't provide navigation logic automatically like the TabView. Instead, it is built with more freedom in mind and lets you customize its content. It exposes two UI containers - either the `leftDrawer`, `rightDrawer`, `topDrawer`or `bottomDrawer` container houses the UI of the hidden side view and the `mainContent` holds the UI that will be shown on the screen. To implement the diagram above, you can embed a [Frame](/ui/components.md#frame) component in the main content container. In this case the hub screen will be hidden to the side, so you will have to show one of the features initially using the `defaultPage` property, e.g. the `featured-page` module. In the hidden drawer content you can have three buttons. Each of them will navigate to one of the three features.

An alternative navigation pattern for the SideDrawer would be to have the main content hold only one feature and navigate to the other two laterally using modal views. ![Sidedrawer with Modal View](/assets/images/architecture_concepts/navigation-diagram-drawer.png)
![ios @nativescript-community/ui-drawer](/assets/images/architecture_concepts/demo-ios.gif)

## Nested Navigation

The main goal of this section is to demonstrate some good practices for creating nested navigation structure. It does not aim to be a strict guide, but will help you to understand how you could create complex navigation structures while using forward (e.g., frames or outlets) & lateral navigation (e.g., drawers, tabs, bottom navigation, etc.). In each of the sub sections, you can find visual guides.

### Simple Rule

There is one simple rule when it comes to nesting navigation widgets.

::: tip
**Important:**
When nesting a frame or a tabView, they should never have direct siblings in the markup. Instead, wrap the siblings in a layout and nest this layout.
:::

If these components have siblings, they will span over them in most scenarios. The reason for this is on iOS the navigation controllers always take all the space provided by their parent regardless of their own layout parameters.

You can check out how this is done in the examples below.

### Nesting Simple Forward Navigation

![Nesting Simple Forward Navigation](/assets/images/architecture_concepts/navigation-examples-page-1.png)

Nesting simple forward navigation: a `Frame` in a layout, for example, to show an advertisement banner on the top/bottom (static content). The root page is using a layout (e.g., a [GridLayout](/ui/components.md#gridlayout)) as a wrapper for the nested forward navigation (Frame) and for the static content (layout).

```
GridLayout
    > Frame (forward navigation)
        >> Pages
    > Static Content
```

### Nesting Forward in Forward Navigation

![navigation-examples-page-3](/assets/images/architecture_concepts/navigation-examples-page-3.png)
Nesting a Frame inside a Page/Frame, for example, a secondary navigation level.

::: tip Note
Each Frame comes with its own [ActionBar](/ui/components.md#actionbar) by default. It's typical that you want to keep one ActionBar on top of the screen when nesting navigations. Set the `actionBarVisibility` property of the Frame to never to hide the ActionBar where needed.
:::

```
Frame (root forward navigation)
    > Page (login)
    > Page (home)
        >> Frame (secondary forward navigation)
            >>> Page
```

### Nesting Simple Lateral Navigation

![Nesting Simple Lateral Navigation](/assets/images/architecture_concepts/navigation-examples-page-2.png)

### Nesting Lateral in Forward Navigation

![Nesting Lateral in Forward Navigation](/assets/images/architecture_concepts/navigation-examples-page-4.png)

### Nesting Forward in Lateral Navigation

![navigation-examples-page-5](/assets/images/architecture_concepts/navigation-examples-page-5.png)

Root TabView with multiple nested Frames.

```TabView (lateral navigation)
    > Frame (id="featured" defaultPage="featured-page")
    > Frame (id="browse" defaultPage="browse-page")
    > Frame (id="search" defaultPage="search-page")
```

### Nesting Lateral in Lateral

![Nesting Lateral in Lateral](/assets/images/architecture_concepts/navigation-examples-page-6.png)

### Combining Nested Navigation Scenarios

The following example demonstrates a scenario where we have combined several nested navigations (both lateral and forward navigations on different nested levels). For example, a RadSidedrawer + Login page leading to a page with a TabView and in one TabView there are inner forward navigations in each TabViewItem. There is also a modal page with its own forward navigation.

```
RadSideDrawer (lateral navigation)
    drawer content
        > Frame id="root-frame" (forward navigation)
            >> Page (e.g. login-page)
            >> Page (e.g. main-page) with BottomNavigation (lateral navigation)
                 TabViewItem >>> Frame (featured)
                            >>>> Page (featured-page)
                 TabViewItem >>> Frame (browse)
                            >>>> Page (browse-page)
                 TabViewItem >>> Frame (search)
                            >>>> Page (search-page)

    drawer link
        > Modal page root (Frame - forward navigation)
            >> Modal Page

    drawer link
        >> Page (e.g. info-page loaded via "root-frame")
```
