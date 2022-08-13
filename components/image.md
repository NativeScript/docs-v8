---
title: Image
---

## Image

`<Image>` is a UI component that shows an image from an [ImageSource](https://docs.nativescript.org/api-reference/classes/imagesource) or from a URL.

<!-- TODO: fix links -->

::: tip Tip
When working with images following [the best practices](/performance.html#image-optimizations) is a must.
:::

---

#### Example: Displaying an image from `App_Resources`

/// flavor plain

```xml
<Image src="res://icon" stretch="aspectFill" />
```

///

/// flavor angular

```html
<image src="res://icon" stretch="aspectFill"> </image>
```

///

/// flavor react

```tsx
<image src="res://icon" stretch="aspectFill" />
```

///

/// flavor vue

```html
<image src="res://icon" stretch="aspectFill" />
```

///

/// flavor svelte

```html
<image src="res://icon" stretch="aspectFill" />
```

///

#### Example: Displaying an image relative to the `app` directory

/// flavor plain

```xml
<Image src="~/logo.png" stretch="aspectFill" />
```

///

/// flavor angular

```html
<image src="~/logo.png" stretch="aspectFill"></image>
```

///

/// flavor react

```tsx
<image src="~/logo.png" stretch="aspectFill" />
```

///

/// flavor vue

```html
<image src="~/logo.png" stretch="aspectFill" />
```

///

/// flavor svelte

```html
<image src="~/logo.png" stretch="aspectFill" />
```

///

#### Example: Displaying an image from a URL

:::tip Note

Setting `loadMode` to `async` will prevent freezing the UI on Android when loading photos async (e.g. from online API)

:::

/// flavor plain

```xml
<Image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.png"
  stretch="aspectFill"
/>
```

///

/// flavor angular

```html
<image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.png"
  stretch="aspectFill"
>
</image>
```

///

/// flavor react

```tsx
<image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.png"
  stretch="aspectFill"
/>
```

///

/// flavor vue

```html
<image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.png"
  stretch="aspectFill"
/>
```

///

/// flavor svelte

```html
<image
  src="https://art.nativescript.org/logo/export/NativeScript_Logo_Blue_White.png"
  stretch="aspectFill"
/>
```

///

#### Example: Displaying a `base64`-encoded image

/// flavor plain

```xml
<Image src="data:Image/png;base64,iVBORw..." stretch="aspectFill" />
```

///

/// flavor angular

```html
<image src="data:Image/png;base64,iVBORw..." stretch="aspectFill"></image>
```

///

/// flavor react

```tsx
<image src="data:Image/png;base64,iVBORw..." stretch="aspectFill" />
```

///

/// flavor vue

```html
<image src="data:Image/png;base64,iVBORw..." stretch="aspectFill" />
```

///

/// flavor svelte

```html
<image src="data:Image/png;base64,iVBORw..." stretch="aspectFill" />
```

///

#### Example: Image with CSS and an icon fonts

/// flavor plain

```xml
<Image src="font://&#xf004;" class="fas" />
```

///

/// flavor angular

```html
<image src="font://&#xf004;" class="fas"></image>
```

///

/// flavor react

```tsx
<image src="font://&#xf004;" class="fas" />
```

///

/// flavor vue

```html
<image src.decode="font://&#xf004;" class="fas" />
```

:::warning Note

In NativeScript-Vue, `.decode` is required for parsing properties that have HTML entities in them.

:::

///

/// flavor svelte

```html
<image src="font://&#xf004;" class="fas" />
```

///

### Props

| Name           | Type                                                                                         | Description                                                                                                                                                                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`          | `String` or [`ImageSource`](https://docs.nativescript.org/api-reference/classes/imagesource) | Gets or sets the source of the image as a URL or an image source. If you use the new font:// icon protocol in {N} 6.2, make sure you add .decode to the name of the property - e.g. `src.decode="font://&#xf004;"`                                                                |
| `imageSource`  | [`ImageSource`](https://docs.nativescript.org/api-reference/classes/imagesource)             | Gets or sets the image source of the image.                                                                                                                                                                                                                                       |
| `tintColor`    | `Color`                                                                                      | (Style property) Sets a color to tint template images.                                                                                                                                                                                                                            |
| `stretch`      | `ImageStretch`                                                                               | (Style property) Gets or sets the way the image is resized to fill its allocated space.<br/>Valid values: `none`, `aspectFill`, `aspectFit`, or `fill`.<br/>For more information, see [ImageStretch](https://docs.nativescript.org/api-reference/modules/coretypes.imagestretch). |
| `loadMode`     |                                                                                              | Gets or sets the loading strategy for the images on the local file system.<br/>Valid values: `sync` or `async`.<br/>Default value: `async`.<br/>For more information, see [loadMode](https://docs.nativescript.org/api-reference/classes/image#loadmode).                         |
| `...Inherited` | `Inherited`                                                                                  | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/image)                                                                                                                                                |

<!-- TODO: fix links -->

### Native component

| Android                                                                                        | iOS                                                                          |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.ImageView`](https://developer.android.com/reference/android/widget/ImageView) | [`UIImageView`](https://developer.apple.com/documentation/uikit/uiimageview) |
