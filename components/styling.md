## CSS

By default, NativeScript provides you with a theme(@nativescript/theme) that allows to change the looks and appearance of views (elements) in a NativeScript application similarly to how you do it in a web application using Cascading Style Sheets (CSS). However, only a subset of the CSS language is supported. For a full CSS support, you can use [@nativescript/tailwind](/plugins/tailwindcss.md). In addition to CSS, you can also style the elements by changing their style object in JavaScript.

Similarly to the DOM Style Object, each View instance exposes a style property, which holds all the style properties for the view. When the view is displayed, all its style properties are applied to the underlying native widget.

---

### Supported CSS Properties

This list of properties can be set in CSS or through the style property of each view:

<!-- TODO: fix links -->

| CSS Property          | JavaScript Property   | Description                                                                                                                                                                                                                               |
| :-------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`               | `color`               | Sets a solid-color value to the matched view’s foreground.                                                                                                                                                                                |
| `background`          | `background`          | Sets a solid-color value or [a linear gradient](https://docs.nativescript.org/cookbook/ui/styling) to the matched view’s background.                                                                                                      |
| `background-color`    | `backgroundColor`     | Sets a solid-color value to the matched view’s background.                                                                                                                                                                                |
| `placeholder-color`   | `placeholderColor`    | Sets the placeholder (hint) font color to matched views.                                                                                                                                                                                  |
| `background-image`    | `backgroundImage`     | Sets a image url to the matched view’s background image.                                                                                                                                                                                  |
| `background-repeat`   | `backgroundRepeat`    | Sets if/how the background image should be repeated. Possible values: `repeat`, `repeat-x`, `repeat-y`, `no-repeat`                                                                                                                       |
| `background-position` | `backgroundPosition`  | Sets the starting position of the background image. You can set the position with absolute, percent or alignment values. More info [here](http://www.w3schools.com/cssref/pr_background-position.asp).                                    |
| `background-size`     | `backgroundSize`      | Sets the size of the background image. Possible values: `length length`, `percent% percent%`, `cover` or `contain`.                                                                                                                       |
| `border-color`        | `borderColor`         | Sets border colors to the matched view’s.                                                                                                                                                                                                 |
| `border-top-color`    | `borderTopColor`      | Sets a top border color to the matched view’s.                                                                                                                                                                                            |
| `border-right-color`  | `borderRightColor`    | Sets a right border color to the matched view’s.                                                                                                                                                                                          |
| `border-bottom-color` | `borderBottomColor`   | Sets a bottom border color to the matched view’s.                                                                                                                                                                                         |
| `border-left-color`   | `borderLeftColor`     | Sets a left border color to the matched view’s.                                                                                                                                                                                           |
| `border-width`        | `borderWidth`         | Sets border widths to the matched view’s.                                                                                                                                                                                                 |
| `border-top-width`    | `borderTopWidth`      | Sets a top border width to the matched view’s.                                                                                                                                                                                            |
| `border-right-width`  | `borderRightWidth`    | Sets a right border width to the matched view’s.                                                                                                                                                                                          |
| `border-bottom-width` | `borderBottomWidth`   | Sets a bottom border width to the matched view’s.                                                                                                                                                                                         |
| `border-left-width`   | `borderLeftWidth`     | Sets a left border width to the matched view’s.                                                                                                                                                                                           |
| `border-radius`       | `borderRadius`        | Sets a border radius to the matched view’s.                                                                                                                                                                                               |
| `box-shadow`          | `boxShadow`           | Sets a box shadow to the matched view's.                                                                                                                                                                                                  |
| `font`                | `font`                | Sets the font properties (this includes `font-family`, `font-size`, `font-style` and `font-weight`) of the matched view.                                                                                                                  |
| `font-family`         | `fontFamily`          | Sets the font family of the matched view.                                                                                                                                                                                                 |
| `font-size`           | `fontSize`            | Sets the font size of the matched view (only supports device-independent units).                                                                                                                                                          |
| `font-style`          | `fontStyle`           | Sets the font style of the matched view. Possible values: `italic`, `normal`.                                                                                                                                                             |
| `font-weight`         | `fontWeight`          | Sets the font weight of the matched view Possible values: `bold`, `normal` OR `100`,`200`,`300`,`400`,`500`,`600`,`700`,`800`,`900`, where `400` is `normal` and `700` is `bold` (NOTE: Some fonts do not support all available variants) |
| `text-align`          | `textAlignment`       | Sets text alignment in the matched view. Possible values: `left` , `center`, `right`, `justify`.                                                                                                                                          |
| `text-decoration`     | `textDecoration`      | Sets the text formatting. Possible values: `none`, `line-through`, `underline`.                                                                                                                                                           |
| `text-transform`      | `textTransform`       | Sets the text transform. Possible values: `none`, `capitalize`, `uppercase`, `lowercase`.                                                                                                                                                 |
| `letter-spacing`      | `letterSpacing`       | Sets the text letter spacing. (On Android API Level 21 and above.)                                                                                                                                                                        |
| `line-height`         | `lineHeight`          | Sets the text line height                                                                                                                                                                                                                 |
| `z-index`             | `zIndex`              | Sets the z-index. (On Android API Level 21 and above.)                                                                                                                                                                                    |
| `clip-path`           | `clip-path`           | Sets the clip-path. Supported shapes are circle, ellipse, rect and polygon. You can define your own shape using [clippy](http://bennettfeely.com/clippy/)                                                                                 |
| `vertical-align`      | `verticalAlignment`   | Sets the vertical alignment of the current view within its parent. Possible values: `top`, `center`, `bottom`, `stretch`.                                                                                                                 |
| `horizontal-align`    | `horizontalAlignment` | Sets the horizontal alignment of the current view within its parent. Possible values: `left`, `center`, `right`, `stretch`.                                                                                                               |
| `margin`              | `margin`              | Sets the margin of the view within its parent.                                                                                                                                                                                            |
| `margin-top`          | `marginTop`           | Sets the top margin of the view within its parent.                                                                                                                                                                                        |
| `margin-right`        | `marginRight`         | Sets the right margin of the view within its parent.                                                                                                                                                                                      |
| `margin-bottom`       | `marginBottom`        | Sets the bottom margin of the view within its parent.                                                                                                                                                                                     |
| `margin-left`         | `marginLeft`          | Sets the left margin of the view within its parent.                                                                                                                                                                                       |
| `width`               | `width`               | Sets the view width.                                                                                                                                                                                                                      |
| `height`              | `height`              | Sets the view height.                                                                                                                                                                                                                     |
| `min-width`           | `minWidth`            | Sets the minimal view width.                                                                                                                                                                                                              |
| `min-height`          | `minHeight`           | Sets the minimal view height.                                                                                                                                                                                                             |
| `padding`             | `padding`             | Sets the distance between the boundaries of the layout container and its children.                                                                                                                                                        |
| `padding-top`         | `paddingTop`          | Sets the top padding of a layout container.                                                                                                                                                                                               |
| `padding-right`       | `paddingRight`        | Sets the right padding of a layout container.                                                                                                                                                                                             |
| `padding-bottom`      | `paddingBottom`       | Sets the bottom padding of a layout container.                                                                                                                                                                                            |
| `padding-left`        | `paddingLeft`         | Sets the left padding of a layout container.                                                                                                                                                                                              |
| `text-shadow`         | `textShadow`          | Sets a text shadow on a label.                                                                                                                                                                                                            |
| `visibility`          | `visibility`          | Sets the view visibility. Possible values: `visible`, `collapse` (or `collapsed`).                                                                                                                                                        |
| `opacity`             | `opacity`             | Sets the view opacity. The value is in the [0, 1] range.                                                                                                                                                                                  |

### NativeScript Specific CSS Properties

In the context of mobile development, there are a number of properties that are mobile specific (and sometimes even platform specific e.g Android or iOS). In NativeScript, these featured properties are still accessible through both the code (inline, JavaScript, and TypeScript) but are also exposed as CSS properties. Apart from the API references, the below list is providing most of the non-common CSS properties in NativeScript.

| CSS Property                           | JavaScript Property                | Platform    | Compatibility | Description                                                                                                                      |
| :------------------------------------- | :--------------------------------- | :---------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| `tab-text-color`                       | `tabTextColor`                     | Both        | `TabView`     | Sets the text color of the tabs titles.                                                                                          |
| `selected-tab-text-color`              | `selectedTabTextColor`             | Both        | `TabView`     | Sets the color of the text, while selecting some of the tabs.                                                                    |
| `tab-background-color`                 | `tabBackgroundColor`               | Both        | `TabView`     | Sets the background color of the tabs.                                                                                           |
| `tab-text-font-size`                   | `tabTextFontSize`                  | Both        | `TabView`     | Sets the tab titles font size, without changing the font size of all contents of the tab.                                        |
| `text-transform`                       | `textTransform`                    | Both        | `TabViewItem` | Sets the text transform individually for every `TabViewItem`. Value options: `capitalize`, `lowercase`, `none`, and `uppercase`. |
| `android-selected-tab-highlight-color` | `androidSelectedTabHighlightColor` | **Android** | `TabView`     | Sets the underline color of the tabs in Android.                                                                                 |
| `android-elevation`                    | `androidElevation`                 | **Android** | `View`        | Sets the elevation of the View in Android.                                                                                       |
| `android-dynamic-elevation-offset `    | `androidDynamicElevationOffset`    | **Android** | `View`        | Sets the elevation of the View in Android, which will be shown when an action was performed(e.g. `tap`, `touch`).                |
| `off-background-color`                 | `offBackgroundColor`               | Both        | `Switch`      | Sets the background color of the Switch when it is turned off.                                                                   |
| `highlight-color`                      | `highlightColor`                   | Both        | `TabStrip`    | Gets or sets the underline color of the selected `TabStripItem`.                                                                 |

::: warning Note
Currently, we can set only the `backgroundColor`, `color`, `fontFamily`, `fontSize`, `fontStyle`, `fontWeight` and `textTransform` styling properties to the `Label` and `Image` components inside the TabStripItem. More about the usage of those properties can be found in the [Supported CSS Properties](#supported-css-properties) section.
:::

::: warning Note
On iOS, the TabStripItems can not be stylied individually.
:::

#### Using the `androidElevation` property on Android

Since {N} 5.4, a new Android-specific property, called androidElevation, is introduced. View's elevation is represented by Zproperty and determines the visual appearance of its shadow. With higher elevation value larger, softer shadows will be set to the View and smaller shadow while using lower elevation.

```html
<StackLayout class="home-panel">
  <TextView
    class="tvElevation"
    editable="false"
    textWrap="true"
    text="TextView"
  ></TextView>
  <label androidElevation="5" class="sampleLabel" textWrap="true" text="Label"></label>
  <button androidElevation="7" class="sampleButton" text="Button"></button>
</StackLayout>
```

```css
.tvElevation {
  android-elevation: 5;
}
```

::: warning Note
Since NativeScript 5.4, the buttons on Android have default elevation (shadow) of 2, to provide Material Design elevation support. Removing the shadow will allow you to create a transparent button. To explicitly remove the elevation, set the android-elevation property to `0` as shown below:

```css
.btn-no-elevation {
  android-elevation: 0;
}
```

:::

#### Using the `androidDynamicElevationOffset` property on Android

Another property introduced with {N} 5.4 is androidDynamicElevationOffset. This property allows setting an elevation, which will be shown when an action was performed. Those actions can be, for example, tap, touch etc.

Example:

```html
<StackLayout class="home-panel">
  <button
    androidElevation="7"
    androidDynamicElevationOffset="8"
    class="sampleButton"
    text="Button"
  ></button>
  <button class="sampleButton2" text="Button"></button>
</StackLayout>
```

```css
.sampleButton2 {
  background-color: lightcyan;
  android-elevation: 7;
  android-dynamic-elevation-offset: 7;
}
```

### Supported Selectors

::: warning Note
Currently the CSS support is limited only to the selectors and properties listed in the current documentation.
:::

NativeScript supports a subset of the [CSS selector syntax](http://www.w3schools.com/cssref/css_selectors.asp). Here is how to use the supported selectors:

- [Type selector](#type-selector)
- [Class selector](#class-selector)
- [ID selector](#id-selector)
- [Hierarchical selector](#hierarchical-selector-css-combinators)
- [Attribute selector](#attribute-selector)
- [Pseudo selector](#pseudo-selector)

#### Type Selector

Like [CSS element selectors](http://www.w3schools.com/cssref/sel_element.asp), type selectors in NativeScript select all views of a given type. Type selectors are case insensitive, so you can use both `button` and `Button`.

```CSS
button { background-color: gray }
```

#### Class Selector

[Class selectors](http://www.w3schools.com/cssref/sel_class.asp) select all views with a given class.
The class is set using the `className` property of the view.

::: warning Note
To use `className` in JS/TS to add a class to an element, the class rule must be in a CSS file that is higher up the component tree than the element, such as `app.css`.
:::

```html
<label className="title"></label>
```

```css
.title {
  font-size: 32;
}
```

```ts
import { Label } from '@nativescript/core'
const label = new Label()
label.className = 'title'
```

#### ID Selector

[Id selectors](http://www.w3schools.com/cssref/sel_id.asp) select all views with a given id. The `id` is set using the `id` property of the view.

```html
<button id="login-button"></button>
```

```css
#login-button {
  background-color: blue;
}
```

```ts
import { Button } from '@nativescript/core'
const btn = new Button()
btn.id = 'login-button'
```

#### Attribute Selector

```html
<button testAttr="flower"></button>
```

```css
button[testAttr] {
  background-color: blue;
}
```

This selector will select all buttons that have the attribute `testAttr` with some value.

Also, some more advanced scenarios are supported:

- button[testAttr='flower'] {...} - Will apply CSS on every button that has the `testAttr` property set exactly to the value `flower`.
- button[testAttr~='flower'] {...} - Selects all buttons with a `testAttr` property that contains a space-separated list of words, one of which is "flower".
- button[testAttr|='flower'] {...} - Selects all buttons with a `testAttr` property value that begins with "flower". The value has to be a whole word, either alone like `btn['testAttr'] = 'flower'`, or followed by hyphen (-), like `btn['testAttr'] = 'flower-house'`.
- button[testAttr^='flower'] {...} - Selects all buttons with a `testAttr` property value that begins with "flower". The value does not have to be a whole word.
- button[testAttr$='flower'] {...} - Selects all buttons with a `testAttr` property value that ends with "flower". The value does not have to be a whole word.
- button[testAttr*='flo'] {...} - Selects all buttons with a `testAttr` property value that contains "flo". The value does not have to be a whole word.

Attribute selectors could be used alone or could be combined with all type of CSS selectors.

```html
<button id="login-button" testAttr="flower"></button>
<label testAttr="some value"></label>
```

```css
#login-button[testAttr='flower'] {
  background-color: blue;
}
[testAttr] {
  color: white;
}
```

#### Pseudo Selector

A pseudo-selector or also pseudo-class is used to define a special state of an element. Currently, NativeScript supports only :highlighted pseudo-selector.

```html
<button testAttr="flower"></button>
```

```css
button:highlighted {
  background-color: red;
  color: gray;
}
```

#### Hierarchical Selector (CSS Combinators)

A CSS selector could contain more than one simple selector, and between selectors a combinator symbol could be included.

- (space) - Descendant selector. For example, the following code will select all buttons inside StackLayouts (no matter) at which level.

```css
StackLayout Button {
  background-color: blue;
}
```

- (>) - A direct child selector. Using the previous example, if the CSS is changed to:

```css
StackLayout > Button {
  background-color: blue;
}
```

The background-color rule will not be applied. In order to apply the selector, the WrapLayout element would need to be removed so that the Button is a direct child of the StackLayout.

- (+) - An adjacent sibling selector, allows to select all elements, which are siblings of a specified element.

##### Direct Sibling Test by Class

```html
<StackLayout class="layout-class">
  <label text="Direct sibling test by id"></label>
  <button class="test-child" text="First Button"></button>
  <button class="test-child-2" text="Second Button"></button>
</StackLayout>
```

```css
.layout-class .test-child + .test-child-2 {
  background-color: green;
}
```

##### Direct Sibling Test by ID

```html
<StackLayout class="layout-class">
  <label text="Direct sibling test by id"></label>
  <button id="test-child" text="First Button"></button>
  <button id="test-child-2" text="Second Button"></button>
</StackLayout>
```

```css
.layout-class #test-child + #test-child-2 {
  background-color: green;
}
```

##### Direct Sibling by Type

```html
<StackLayout class="direct-sibling--type">
  <label text="Direct sibling by type"></label>
  <button text="Test Button"></button>
  <label text="Test Label"></label>
  <button text="Test Button"></button>
  <label text="Test Label"></label>
  <button text="Test Button"></button>
  <label text="Test Label"></label>
</StackLayout>
```

```css
StackLayout Button + Label {
  background-color: green;
  color: white;
}
```

### CSS Overview

---

#### Applying CSS Styles

The CSS styles can be set on 3 different levels:

- [Application-wide CSS](#application-wide-css): Applies to every application page
- [Page-specific CSS](#page-specific-css): Applies to the page's UI views
- [Component-specific CSS](#component-specific-css): Applies for component only
- [Inline CSS](#inline-css): Applies directly to a UI view

If there is CSS declared on different levels&mdash;all will be applied. The inline CSS will have the highest priority and the application CSS will have the lowest priority.

It is also possible to apply [platform-specific CSS](#platform-specific-css).

#### Application Wide CSS

When the application starts, NativeScript checks if the file app.css exists. If it does, any CSS styles that it contains are loaded and used across all application pages. This file is a convenient place to store styles that will be used on multiple pages.

You can change the name of the file from which the application-wide CSS is loaded. You need to do the change before the application is started, usually in the app.js or app.ts file as shown below:

/// flavor plain

```ts
import { Application } from '@nativescript/core'
Application.setCssFileName('style.css')

Application.run({ moduleName: 'main-page' })
```

///

/// flavor angular

```ts
platformNativeScriptDynamic({ bootInExistingPage: false, cssFile: 'style.css' })
```

///

::: tip Note
The path to the CSS file is relative to the application root folder.
:::

You could also check the name of the application-wide CSS file by using getCssFileName() method as shown below:

```ts
import { Application } from '@nativescript/core'
const fileName = Application.getCssFileName()
console.log(`fileName ${fileName}`)
```

/// flavor plain

#### Page Specific CSS

When the page's XML declaration file is loaded, NativeScript looks for a CSS file with the same name (if such exists), reads any CSS styles that it finds, and automatically loads and applies them to the page. For example, a page named mypage.xml will automatically load any CSS in mypage.css. The CSS file must exist in the same folder as the XML file to be automatically applied.

If you import any custom components on your page, the CSS from those components will be applied to the page, too. As a best practice, scope the CSS of custom components so that component styles do not "leak" on to pages.

```xml
<StackLayout class="mywidget">
  <Label text="Custom component layout" class="label" />
</StackLayout>
```

```css
/* GOOD: This will ONLY apply to the custom component */
.mywidget .label {
  color: blue;
}

/* BAD: This will apply to the custom component AND potentially to the page where the component is used */
.label {
  color: blue;
}
```

You can also override CSS styles specified in the file by using the page's css property:

```ts
page.css = 'button { color: red }'
```

///

/// flavor angular

#### Component Specific CSS

In an Angular application everything is a component, therefore, it is a very common task to add some CSS code that should only apply to one component. Adding component-specific CSS in a NativeScript-Angular app involves using a component’s styles or styleUrls property.

```ts
@Component({
    selector: 'list-test',
    styleUrls: ['style.css'],
    template: ...

// Or

@Component({
    selector: 'list-test',
    styles: ['.third { background-color: lime; }'],
    template: ...
```

///

#### Adding CSS String

This snippet adds a new style to the current set of styles. This is quite useful when you need to add a small CSS chunk to an element (for example, for testing purposes):

```ts
page.addCss('button {background-color: blue}')
```

#### Adding CSS File

This snippet adds new CSS styles to the current set. However, this method reads them from a file. It is useful for organizing styles in files and reusing them across multiple pages.

```ts
page.addCssFile(cssFileName)
```

#### Inline CSS

Similarly to HTML, CSS can be defined inline for a UI view in the XML markup:

```html
<button text="inline style" style="background-color: green;"></button>
```

#### Platform-specific CSS

NativeScript conventions make it easy to apply platform-specific CSS, either via separate stylesheets or via in-line declarations. For an overview of NativeScript's convention-based file name rules for targeting files at specific platforms and screen sizes, refer to this article in the docs.

There are 4 primary ways to target styles at iOS or Android:

/// flavor plain

1. Platform-specific stylesheets (`styles.ios.css`, `styles.android.css`)
2. Platform-specific markup blocks (`<ios> ... </ios>`, `<android> ... </android>`)
3. Platform-specific attributes (`<Label ios:style="..." android:style="..."`)
4. Platform-specific CSS rules (`.ns-ios .mystyle { ... }`, `.ns-android .mystyle { ... }`)

///

/// flavor angular

1. Platform-specific stylesheets (`styles.component.ios.css`, `styles.component.android.css`)
2. Platform-specific markup blocks (`<ios> ... </ios>`, `<android> ... </android>`)
3. Platform-specific attributes (`<Label ios:style="..." android:style="..."`)
4. Platform-specific CSS rules (`:host-content(.ns-ios) .mystyle { ... }`, `:host-context(.ns-android) .mystyle { ... }`)

///

The most common and maintainable pattern for managing platform-agnostic and platform-specific styles in NativeScript is with multiple stylesheets and CSS imports.

/// flavor plain
With this pattern, a page has 3 separate stylesheets: common, iOS and Android. For example, for page `myPage.xml` you would have 3 stylesheets:

1. `myPage-common.css`
2. `myPage.ios.css`
3. `myPage.android.css`

In both `myPage.ios.css` and `myPage.android.css` you then import the shared common styles from `myPage-common.css`:

```CSS
/* Import shared style rules */
@import './myPage-common.css';

/* Add iOS/Android specific rules (if any) */
.mystyle { ... }
```

///

/// flavor angular
With this pattern, a page (or component) has 3 separate stylesheets: common, iOS and Android. For example, for page `home.component.html` you would have 3 stylesheets:

1. `home-common.css`
2. `home.component.ios.css`
3. `home.component.android.css`

In both `home.component.ios.css` and `home.component.android.css` you then import the shared common styles from `home-common.css`:

```CSS
/* Import shared style rules */
@import './home-common.css';

/* Add iOS/Android specific rules (if any) */
.mystyle { ... }
```

///

At build time, NativeScript will automatically import the common styles and choose the correct iOS or Android stylesheet depending on the target build platform.

#### Root Views CSS Classes

To allow flexible styling and theming, NativeScript adds a CSS class to the root views in the application for specific states.

The default CSS classes are are:

- `.ns-root` - a class assigned to the application root view
- `.ns-modal` - a class assigned to the modal root view

The CSS classes for each application and modal root view are:

- `.ns-android`, `.ns-ios` - classes that specify the application platform
- `.ns-phone`, `.ns-tablet` - classes that specify the device type
- `.ns-portrait`, `.ns-landscape`, `.ns-unknown` - classes that specify the application orientation
- `.ns-light`, `.ns-dark` - classes that specify the system appearance.

::: tip Note
In native modals in Angular, the classes are applied to the first layout view in your modal component's HTML. If you are targeting a class that is applied to the root layout in your modal, you would target it with `.ns-dark.your-class`.
:::

For additional information on the Dark Mode support, refer to [this](https://docs.nativescript.org/ui/dark-mode) documentation article.

<!-- TODO: fix links -->

#### Supported Measurement Units

NativeScript supports DIPs (Device Independent Pixels), pixels (via postfix px) and percentages (partial support for width, height and margin) as measurement units.

NativeScript's recommended measurement unit is DIP. All measurable properties like width, height, margin, paddings, border-width, etc.) support device independent pixels. The font sizes are always measured in DIPs.

```css
.myLabel {
  font-size: 28;
  width: 200;
  height: 30;
}
```

The device independent pixels (DIPs) are equal to the device screen's pixels divided by the device screen scale (density).

```ts
import { Screen } from '@nativescript/core'

// mainScreen is of type ScreenMetrics interface /api-reference/interfaces/_platform_.screenmetrics
const scale = Screen.mainScreen.scale
const widthPixels = Screen.mainScreen.widthPixels
const heightPixels = Screen.mainScreen.heightPixels
const widthDIPs = Screen.mainScreen.widthDIPs // DIPs === pixels/scale (e.g. 1024 pixels / 2x scale = 512 DIPs)
const heightDIPs = Screen.mainScreen.heightDIPs
```

NativeScript supports percentage values for width, height and margins. When a layout pass begins, first the percent values are calculated based on parent available size. This means that on vertical StackLayout if you place two Buttons with height='50%' they will get all the available height (e.g., they will fill the StackLayout vertically.). The same applies for margin properties. For example, if you set marginLeft = '5%', the element will have a margin that corresponds to 5% of the parent's available width.

#### Using CSS variables

NativeScript supports CSS variables (also known as custom properties or cascading variables) for reusable values through the CSS used in the app.

CSS variables cascades from parent to child views.

Declaring variables:

```css
/* Define --my-custom-color as a global value */
.ns-root {
  --my-custom-color: black;
}

/* In landscape mode change the value to blue */
.ns-landscape {
  --my-custom-color: blue;
}
```

Overriding a variable from a child-element:

```css
/* Change --my-custom-color to green for elements below */
.ns-root .override-color {
  --my-custom-color: green;
}
```

Using a variable:

```css
.using-variable {
  color: var(--my-custom-color);
}
```

The default value of --my-undefined-value will be black. In landscape mode it will be blue. If a parent element have the class override-color the value will be green.

Using a fallback value:

```css
.using-variable {
  color: var(--my-undefined-value, yellow);
}
```

The color of --my-undefined-value will fallback to yellow, because --my-undefined-value is not defined.

Using a nested fallback value:

```css
.using-variable {
  color: var(--my-undefined-value, var(--my-custom-color, yellow));
}
```

#### Using CSS calc()

NativeScript supports CSS calc() functions for performing simple calculations on CSS values.

Syntax:

```css
element {
  width: calc(100% * 1.25); /* width: 125% */
}
```

Used with CSS variables:

```css
element {
    --my-variable: 10:
    width: calc(100% * var(--my-variable)); /* width: 125% */
}
```

#### Accessing NativeScript component properties with CSS

You can set NativeScript component properties value that are not part of the CSS specification. For example:

```CSS
StackLayout {
   orientation: horizontal;
}
```

This feature is limited to properties with simple types like string, number and boolean, and will set a local property value similar to component markup declaration in your template markup via XML or HTML. CSS inheritance is not supported.

#### Using Fonts

The `font-family` property can hold several values. The first supported font in the list will be used. There is also support for the following generic font-families:

- serif (ex. Times New Roman)
- sans-serif (ex. Helvetica)
- monospace (ex. Courier New)

Platform specifics:

- Android: The supported fonts depend very much on the system, thus using the generic font-families or [custom-fonts](#custom-fonts) is recommended.
- iOS: There are more than 30 default fonts available on iOS. You can check the [supported fonts for specific iOS versions and devices](http://iosfonts.com). To use a built-in font, simply specify the font name in the `font-family` property, such as `font-family: "American Typewriter";`. Adjust the font variant using the [`font-weight`](#supported-css-properties) property.

##### Custom fonts

You can use custom fonts in your app (in .TTF or .OTF format).
The NativeScript runtime will look for the font files under the `app/fonts/` (or `src/fonts/` if you use Angular) directory and load them automatically.

<!-- ![Custom fonts setup"](/assests/ui-and-styling/custom-fonts.png) -->

::: tip Tip
Since NativeScript 7.1, the CLI has the `ns fonts` command. Executing this command will print out the css styles you need for any custom fonts found in your application.
:::

::: warning Note
On iOS your font file should be named **exactly** as the font name.
If you have any doubt about the original font name, use the [Font Book](https://support.apple.com/en-us/HT201749) app to get the original font name, or try using `ns fonts` from your terminal using NS 7.1 or newer.
:::

#### Using Icon Fonts in NativeScript

While bitmap images are great, they present challenges in designing mobile applications. Images increase the size of the application if they are embedded in it. If not, they require additional http requests to be fetched. Images consume memory. Furthermore, bitmap images do not scale well. If scaled up, they lose quality. If scaled down, they waste space. On the other hand, fonts scale well, do not require additional http requests for each glyph and do not increase memory usage significantly. Icon fonts contain icons instead of alphabet characters and can be used instead of images in mobile applications.

1. Choose or generate an icon font that best matches your needs. Two popular icon fonts are [IcoMoon](https://icomoon.io/) and [Font Awesome](https://fontawesome.com/how-to-use/on-the-web/setup/hosting-font-awesome-yourself).
2. Once you have downloaded the icon font to your machine, locate the [TrueType](https://en.wikipedia.org/wiki/TrueType) font file with extension **.ttf**.
3. In your root application folder (This is the **app** folder for NativeScript Core, and the **src** folder for Angular 6+), create a folder called **fonts** and place the **.ttf** there.
4. Follow the instructions on the icon font webpage to determine the hex codes of each font glyph, i.e., icon. Add a **Label** component to your NativeScript app and bind the Label's **text** property to a one-letter string generated from the character code of the icon you want to show, i.e., `\ue903`. Prefix the character (in this example: e903) with a `\u`

:::tip Note

While this documentation article is focused on icon fonts, the above workflow is a hundred percent applicable for both **text fonts** and **icon fonts** (except that with text fonts step 4 as they don't include icons but only plain text).

:::

#### Platform Specific Font Recognition

There is a conceptual difference in how **.ttf** fonts are recognized on iOS and Android. On Android, the font is recognized by its **file name** while on iOS it is recognized by its **font name**. This means that fonts that are created with a font name which is different from the file name has to be registered with both names in your CSS rule.

```CSS
.fa-brands {
    font-family: "Font Awesome 5 Brands", "fa-brands-400";
}
```

In the above example, the `fa-brands-400.ttf` (as downloaded from the FontAwesome site) has a font name `Font Awesome 5 Brands`. With the above CSS, the font is recognized on both iOS (by the font name `Font Awesome 5 Brands`) and Android (by the file name `fa-brands-400`).

:::tip Note

There are specific scenarios where the creators of the fonts might have released two differently named `ttf` files but with the same **font** name (see the example below).

:::

| file name              | font name           |
| ---------------------- | ------------------- |
| **fa-solid-900.ttf**   | Font Awesome 5 Free |
| **fa-regular-400.ttf** | Font Awesome 5 Free |

Notice that in the above example the **file** names are different, but the registered **font** name is the same (use the **Font Book** application on Mac or the **Control Panel Fonts** section on Windows to see the actual font name). While this is no issue on Android, it renders the second font unusable on iOS. To handle similar cases additional CSS font properties, such as for example `font-weight`, must be added.

```CSS
/*
    File name: fa-regular-400.ttf
    Font name: Font Awesome 5 Free
*/
.far {
    font-family: "Font Awesome 5 Free", "fa-regular-400";
    font-weight: 400;
}

/*
    File name: fa-solid-900.ttf
    Font name: Font Awesome 5 Free
*/
.fas {
    font-family: "Font Awesome 5 Free", "fa-solid-900";
    font-weight: 900;
}
```

#### Import CSS

The @import CSS rule allows you to import CSS from a local file. This rule must precede all other types of rules.

```CSS
@import url('~/your-style.css');
```

#### Using SASS

With NativeScript, it is possible to manage your app styles using the SASS CSS pre-compiler instead of plain CSS files. Just as with web projects, SASS gives your stylesheets extra capabilities like shared variables, mixins and nested style tags.

To use SASS with NativeScript, a SASS compiler like [`sass`](https://www.npmjs.com/package/sass) is required. This compiler will hook-in to the NativeScript build process and automatically convert `.scss/.sass` files to `.css` during `build` and `livesync` operations. Since SASS is compiled to CSS at build time, it does **not** require any changes to your stylesheet naming conventions for NativeScript's normal convention-based patterns to work. SASS files with the same name as a NativeScript page will still be automatically linked.

You can use SASS with either enabling it manually:

```cli
npm i sass --save-dev
```

Or by using a template that has SASS already enabled. For example:

```cli
ns create  mySassApp --template @nativescript/template-drawer-navigation-ts
```

For projects created with NativeScript 5.x and below (which are using the legacy `nativescript-dev-webpack`), you can run the `migrate` command to update the SASS compiler (and remove the legacy plugin). Note that the `migrate` command is available in NativeScript CLI 6 and above.

```cli
ns migrate
```

## App_Resources

For native styling see [App_Resources](/app-resources.html).
