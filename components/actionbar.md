---
title: ActionBar
---

### ActionBar

The ActionBar is NativeScript’s abstraction over the Android [ActionBar](https://developer.android.com/training/appbar/) and iOS [NavigationBar](https://developer.apple.com/design/human-interface-guidelines/ios/bars/navigation-bars/). It represents a toolbar at the top of the activity window, and can have a title, application-level navigation, as well as other custom interactive items.

---

#### Example: Simple ActionBar with title

/// flavor vue

```html
<ActionBar title="ActionBar Title" />
```

///

/// flavor svelte

```html
<actionBar title="ActionBar Title" />
```

///

/// flavor plain

```html
<ActionBar title="ActionBar Title" />
```

///

/// flavor angular

```html
<ActionBar title="ActionBar Title"> </ActionBar>
```

///

/// flavor react

```html
<actionBar title="ActionBar Title" />
```

///

<!-- -->

#### Example: ActionBar with custom title view

/// flavor react

```tsx
<actionBar>
  <stackLayout nodeRole="titleView" orientation="horizontal">
    <image src="res://icon" width={40} height={40} verticalAlignment="center" />
    <label text="NativeScript" fontSize={24} verticalAlignment="center" />
  </stackLayout>
</actionBar>
```

///

/// flavor vue

```html
<ActionBar>
  <StackLayout orientation="horizontal">
    <image src="res://icon" width="40" height="40" verticalAlignment="center" />
    <label text="ActionBar Title" fontSize="24" verticalAlignment="center" />
  </StackLayout>
</ActionBar>
```

///

/// flavor plain

```xml
<ActionBar>
  <StackLayout orientation="horizontal">
    <Image src="res://icon" width="40" height="40" verticalAlignment="center" />
    <Label text="ActionBar Title" fontSize="24" verticalAlignment="center" />
  </StackLayout>
</ActionBar>
```

///

/// flavor angular

```html
<ActionBar>
  <StackLayout orientation="horizontal">
    <image src="res://icon" width="40" height="40" verticalAlignment="center"></image>
    <label text="ActionBar Title" fontSize="24" verticalAlignment="center"></label>
  </StackLayout>
</ActionBar>
```

///

/// flavor svelte

```html
<actionBar>
  <stackLayout orientation="horizontal">
    <image src="res://icon" width="40" height="40" verticalAlignment="center" />
    <label text="ActionBar Title" fontSize="24" verticalAlignment="center" />
  </stackLayout>
</actionBar>
```

///

#### Example: ActionBar with ActionItem

The `<ActionItem>` components are supporting the platform-specific position and systemIcon for iOS and Android.

- Android sets position via `android.position`:

  - `actionBar`: Puts the item in the ActionBar. Action item can be rendered both as text or icon.
  - `popup`: Puts the item in the options menu. Items will be rendered as text.
  - `actionBarIfRoom`: Puts the item in the ActionBar if there is room for it. Otherwise, puts it in the options menu.

- iOS sets position via ios.position:

  - `left`: Puts the item on the left side of the ActionBar.
  - `right`: Puts the item on the right side of the ActionBar.

/// flavor svelte

```html
<actionBar title="ActionBar Title">
  <actionItem
    on:tap="{onTapShare}"
    ios.systemIcon="9"
    ios.position="left"
    android.systemIcon="ic_menu_share"
    android.position="actionBar"
  />
  <actionItem
    on:tap="{onTapDelete}"
    ios.systemIcon="16"
    ios.position="right"
    text="delete"
    android.position="popup"
  />
</actionBar>
```

///

/// flavor vue

```html
<ActionBar title="ActionBar Title">
  <ActionItem
    @tap="onTapShare"
    ios.systemIcon="9"
    ios.position="left"
    android.systemIcon="ic_menu_share"
    android.position="actionBar"
  />
  <ActionItem
    @tap="onTapDelete"
    ios.systemIcon="16"
    ios.position="right"
    text="delete"
    android.position="popup"
  />
</ActionBar>
```

///

/// flavor react

```tsx
<actionBar title="ActionBar Title">
  <actionItem
    nodeRole="actionItems"
    onTap={onTapShare}
    ios={{
      systemIcon: 9,
      position: 'left' as const
    }}
    android={{
      systemIcon: 'ic_menu_share' as const,
      position: 'actionBar' as const
    }}
  />
  <actionItem
    nodeRole="actionItems"
    onTap={onTapDelete}
    ios={{
      systemIcon: 16,
      position: 'right' as const
    }}
    android={{
      position: 'popup' as const
    }}
    text="delete"
  />
</actionBar>
```

///

/// flavor plain

```html
<ActionBar title="ActionBar Title">
  <ActionItem
    tap="onShare()"
    ios.systemIcon="9"
    ios.position="left"
    android.systemIcon="ic_menu_share"
    android.position="actionBar"
  >
  </ActionItem>
  <ActionItem
    text="delete"
    tap="onDelete()"
    ios.systemIcon="16"
    ios.position="right"
    android.position="popup"
  >
  </ActionItem>
</ActionBar>
```

///

/// flavor angular

```html
<ActionBar title="ActionBar Title">
  <ActionItem
    (tap)="onShare()"
    ios.systemIcon="9"
    ios.position="left"
    android.systemIcon="ic_menu_share"
    android.position="actionBar"
  >
  </ActionItem>
  <ActionItem
    text="delete"
    (tap)="onDelete()"
    ios.systemIcon="16"
    ios.position="right"
    android.position="popup"
  >
  </ActionItem>
</ActionBar>
```

///

#### Example: ActionBar with NavigationButton

`<NavigationButton>` is a UI component that provides an abstraction for the Android navigation button and the iOS back button.

/// flavor vue

```html
<ActionBar title="ActionBar Title">
  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
</ActionBar>
```

///

/// flavor react

```tsx
<actionBar title="ActionBar Title">
  <navigationButton
    nodeRole="navigationButton"
    text="Go back"
    android={{
      position: undefined,
      systemIcon: 'ic_menu_back'
    }}
    onTap={goBack}
  />
</actionBar>
```

///

/// flavor svelte

```html
<actionBar title="ActionBar Title">
  <navigationButton text="Go back" android.systemIcon="ic_menu_back" on:tap="{goBack}" />
</actionBar>
```

///

/// flavor plain

```html
<ActionBar title="ActionBar Title">
  <NavigationButton text="Go back" android.systemIcon="ic_menu_back" tap="goBack" />
</ActionBar>
```

///

/// flavor angular

```html
<ActionBar title="ActionBar Title">
  <NavigationButton
    text="Go back"
    android.systemIcon="ic_menu_back"
    (tap)="goBack()"
  ></NavigationButton>
</ActionBar>
```

///

:::tip Platform specific behavior

**iOS Specific**

On iOS the default text of the navigation button is the title of the previous page and the back button is used explicitly for navigation.
It navigates to the previous page and does not allow overriding this behavior.
If you need to place a custom button on the left side of the `<ActionBar>` (e.g., to show a Drawer button), you can use an `<ActionItem>` with `ios.position="left"`.

**Android Specific**

On Android, you can't add text inside the navigation button.
You can use the icon property to set an image (e.g., `~/images/nav-image.png` or `res:\\ic_nav`).
You can use `android.systemIcon` to set one of the system icons available in Android.
In this case, there is no default behaviour for NavigationButton tap event, and we should set the callback function, which will be executed.
:::

#### Example: Setting an app icon for Android in ActionBar

/// flavor vue

```html
<ActionBar
  title="ActionBar Title"
  android.icon="res://icon"
  android.iconVisibility="always"
/>
```

///

/// flavor svelte

```html
<actionBar
  title="ActionBar Title"
  android.icon="res://icon"
  android.iconVisibility="always"
/>
```

///

/// flavor react

```tsx
<actionBar
  title="ActionBar Title"
  android={{ icon: 'res://icon', iconVisibility: 'always' }}
/>
```

///

/// flavor plain

```html
<ActionBar
  title="ActionBar Title"
  android.icon="res://icon"
  android.iconVisibility="always"
/>
```

///

/// flavor angular

```html
<ActionBar
  title="ActionBar Title"
  android.icon="res://icon"
  android.iconVisibility="always"
>
</ActionBar>
```

///

#### Example: Removing the border from ActionBar

By default, a border is drawn at the bottom of the `<ActionBar>`. In addition to the border, on iOS devices a translucency filter is also applied over the `<ActionBar>`.

To remove this styling from your app, you can set the `flat` property to `true`.

/// flavor vue

```html
<ActionBar title="ActionBar Title" flat="true" />
```

///

/// flavor svelte

```html
<actionBar title="ActionBar Title" flat="true" />
```

///

/// flavor react

```tsx
<actionBar title="ActionBar Title" flat={true} />
```

///

/// flavor plain

```html
<ActionBar title="ActionBar Title" flat="true" />
```

///

/// flavor angular

```html
<ActionBar title="ActionBar Title" flat="true"> </ActionBar>
```

///

#### Example: Styling ActionBar

To style the `<ActionBar>`, you can use only `background-color` and `color` properties. Alternatively, you can use `@nativescript/theme` and use the default styles for each different theme. The icon property of `ActionItem` can use Icon Fonts with the `font://` prefix. By setting up this prefix, a new image will be generated, which will be set as an `<ActionItem>`'s icon resource. While using this functionality, we need to specify the font-size, which will calculate the size of the generated image base on the device's dpi.

/// flavor angular

```html
<!-- The default background-color and color of ActionBar & ActionItem are set through nativescript-theme (if used)-->
<ActionBar title="ActionBar Title">
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

/// flavor plain

```html
<!-- The default background-color and color of ActionBar & ActionItem are set through nativescript-theme (if used)-->
<ActionBar title="ActionBar Title">
  <!-- Explicitly hiding the NavigationBar to prevent the default one on iOS-->
  <NavigationButton visibility="collapsed" />

  <!-- Using the icon property and Icon Fonts -->
  <ActionItem position="left" icon="font://&#xf0a8;" class="fas" tap="goBack" />

  <!-- Creating custom views for ActionItem-->
  <ActionItem ios.position="right">
    <GridLayout width="100">
      <button text="Theme" class="-primary -rounded-lg" />
    </GridLayout>
  </ActionItem>
</ActionBar>
```

///

:::warning Note
In iOS, the color property affects the color of the title and the action items. In Android, the color property affects only the title text. However, you can set the default color of the text in the action items by adding an `actionMenuTextColor` item in the Android theme (inside `App_Resources\Android\values\styles.xml`).
:::

### Properties

#### ActionBar Properties

| Name                   | Type                                                             | Description                                                                                                                                                                                   |
| :--------------------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`                | `string`                                                         | Gets or sets the action bar title.                                                                                                                                                            |
| `titleView`            | [View](https://docs.nativescript.org/api-reference/classes/view) | Gets or sets the title view. When set - replaces the title with a custom view.                                                                                                                |
| `flat`                 | `boolean`                                                        | Removes the border on Android and the translucency on iOS. Default value is `false`.                                                                                                          |
| `navigationButton`     | `NavigationButton`                                               | Gets or sets the navigation button (a.k.a. the back button).                                                                                                                                  |
| `actionItems`          | `ActionItems`                                                    | Gets the collection of action items.                                                                                                                                                          |
| `android`              | `AndroidActionBarSettings`                                       | Gets the android specific options of the action bar.                                                                                                                                          |
| `ios`                  | `UINavigationBar`                                                | Gets the native iOS [UINavigationBar](https://developer.apple.com/documentation/uikit/uinavigationbar) that represents the user interface for this component. Valid only when running on iOS. |
| `iosIconRenderingMode` | `'automatic' \| 'alwaysOriginal' \| 'alwaysTemplate'`            | Gets or set the UIImageRenderingMode of the action bar icons in iOS. Defaults to "alwaysOriginal"                                                                                             |
|  |

### ActionItem Properties

| Name                 | Type                                            | Description                                                                                                                                                           |
| :------------------- | :---------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`               | `string`                                        | Gets or sets the text of the action item.                                                                                                                             |
| `icon`               | `string`                                        | Gets or sets the icon of the action item. Supports local images (`~/`), resources (`res://`) and icon fonts (`fonts://`)                                              |
| `ios.position`       | `enum`: `left`, `right`                         | Sets the position of the item (default value is `left`).                                                                                                              |
| `android.position`   | `enum`: `actionBar`, `popup`, `actionBarIfRoom` | Sets the position of the item (default value is `actionBar`).                                                                                                         |
| `ios.systemIcon`     | `number`                                        | **iOS only** Sets the icon of the action item while using [UIBarButtonSystemIcon](https://developer.apple.com/documentation/uikit/uibarbuttonsystemitem) enumeration. |
| `android.systemIcon` | `string`                                        | **Android only** Sets a path to a resource icon ( see the [list of Android system drawables](https://developer.android.com/reference/android/R.drawable))             |
| `actionBar`          | `ActionBar`                                     | Gets the action bar that contains the action item.                                                                                                                    |
| `ios`                | `IOSActionItemSettings`                         | Gets the iOS specific options of the action item.                                                                                                                     |
| `android`            | `AndroidActionItemSettings`                     | Gets the Android specific options of the action item.                                                                                                                 |

### NavigationButton Properties

| Name   | Type     | Description                               |
| :----- | :------- | :---------------------------------------- |
| `text` | `string` | Gets or sets the text of the action item. |
| `icon` | `string` | Gets or sets the icon of the action item. |

### Events

| Name            | Description                                                                |
| :-------------- | :------------------------------------------------------------------------- |
| `loaded`        | Emitted when the view is loaded.                                           |
| `unloaded`      | Emitted when the view is unloaded.                                         |
| `layoutChanged` | Emitted when the layout bounds of a view changes due to layout processing. |

### API References

| Name                                                                                     | Type    |
| :--------------------------------------------------------------------------------------- | :------ |
| [ActionBar](https://docs.nativescript.org/api-reference/classes/actionbar)               | `Class` |
| [ActionItem](https://docs.nativescript.org/api-reference/classes/actionitem)             | `Class` |
| [ActionItems](https://docs.nativescript.org/api-reference/classes/actionitems)           | `Class` |
| [NavigationButton](https://docs.nativescript.org/api-reference/classes/navigationbutton) | `Class` |

### Native Component

| Android                                                                                       | iOS                                                                                           |
| :-------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| [android.widget.Toolbar](https://developer.android.com/reference/android/widget/Toolbar.html) | [UIView](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/) |
