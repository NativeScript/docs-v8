---
title: Color
---

## Color

The Color class allows you to create custom colors that you can use to style the UI. You can create a color object from different types of inputs types, as shown below, that stores all color components (alpha (opacity), red, green, blue) in a [0..255] range:

- `Color(knownColor: string)`
- `Color(hex: string)`
- `Color(argb: number)`
- `Color(alpha: number, red: number, green:number, blue: number, type?: 'rgb' \| 'hsl' \| 'hsv')`

## Usage

The following StackBlitz editor + Preview shows several use cases of the `Color` class. To try it out, download the `Nativescript Preview` app on your phone from Google Play or App Store. Once you have downloaded the app, scan the QR with your phone Camera and the app resulting from the code in the IDE will appear in the `Nativescript Preview` app.

<iframe width="100%" height="640px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-x2y7k6?embed=1&file=app/main-view-model.ts&hideExplorer=0"></iframe>

You can use the Stackblitz + Preview to experiment with the rest of the `Color` class properties and methods.

### Properties

| Name      | Type      | Description                                                                                                                                       |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a`       | `string`  | Gets the Alpha component (in the [0, 255] range) of thecolor. This is a read-only property.                                                       |
| `r`       | `string`  | Gets the Red component z(in the [0, 255] range) of the color. This is a read-only property.                                                       |
| `g`       | `string`  | Gets the Green component (in the [0, 255] range) of the color. This is a read-only property.                                                      |
| `b`       | `string`  | Gets the Blue component (in the [0, 255] range) of the color. This is a read-only property.                                                       |
| `argb`    | `number`  | Gets the Argb Number representation of this color where each 8 bits represent a single color component. This is a read-only property.             |
| `hex`     | `string`  | Gets the Hexadecimal string representation of the color. This is a read-only property                                                             |
| `name`    | `string`  | Gets the known name of this instance. Defined only if it has been constructed from a known color name - e.g. "red". This is a read-only property. |
| `android` | `number`  | Gets the android-specific integer value representation. Same as the Argb one. This is a read-only property.                                       |
| `ios`     | `UIColor` | Gets the iOS-specific UIColor value representation. This is a read-only property.                                                                 |

### Static Methods

| Name                                                | Return Type | Description                                                  |
| --------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `equals(value1: Color, value2: Color)`              | `boolean`   | Compares two `Color` instances                               |
| `isValid(value: any)`                               | `boolean`   | Validates if a value can be converted to a color.            |
| `fromIosColor(value: UIColor)`                      | `Color`     | Creates color from iOS-specific UIColor value representation |
| `mix(color1: Color, color2: Color, amount: number)` | `Color`     | Mixes                                                        |
| `fromHSL(a, h, s, l)`                               | `Color`     | Returns a new `Color` from HSL.                              |
| `fromHSV(a, h, s, l)`                               | `Color`     | Returns a new `Color` from HSV.                              |

### Instance Methods

| Name                                                        | Return Type                                      | Description                                                                                                                                                |
| ----------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `equals(value: Color)`                                      | `boolean`                                        | Specifies whether the created Color is equal to the Color parameter.                                                                                       |
| `isDark()`                                                  | `boolean`                                        | Returns true if `brightenss < 128`                                                                                                                         |
| `isLight()`                                                 | `boolean`                                        | Returns true if `brightenss >= 128`                                                                                                                        |
| `getBrightness()`                                           | `number`                                         | Returns the [brightness](http://www.w3.org/TR/AERT#color-contrast).                                                                                        |
| `getLuminance()`                                            | `number`                                         | Returns the [luminance](http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef).                                                              |
| `setAlpha(a: number)`. `a` is a value between `0` and `255` | `Color`                                          | Return the created color (as a new Color instance) with the provided alpha                                                                                 |
| `toHsl()`                                                   | `{ h: number; s: number; l: number; a: number }` | Return the hsl representation of the color.                                                                                                                |
| `toHslString()`                                             | `string`                                         | Returns the [CSS hsv](https://www.w3schools.com/Css/css_colors_hsl.asp) representation of the color                                                        |
| `toHsv()`                                                   | `{ h: number; s: number; v: number; a: number }` | Returns the hsv representation of the color.                                                                                                               |
| `toHsvString()`                                             | `string`                                         | Returns the [CSS rgb](https://www.w3schools.com/Css/css_colors_rgb.asp) representation of the color                                                        |
| `desaturate(amount: number)`                                | `Color`                                          | Desaturates the color a given amount, from `0` to `100`. Providing `100` is the same as calling greyscale.                                                 |
| `saturate(amount: number)`                                  | `Color`                                          | Saturates the color a given amount, from `0` to `100`.                                                                                                     |
| `greyscale()`                                               | `Color`                                          | Completely desaturates a color into greyscale. Same as calling `desaturate(100)`                                                                           |
| `lighten()`                                                 | `Color`                                          | Lightens the color a given amount, from `0` to `100`. Providing `100` will always return white.                                                            |
| `brighten(amount: number)`                                  | `Color`                                          | Brightens the color a given amount, from `0` to `100`.                                                                                                     |
| `darken(amount:number)`                                     | `Color`                                          | Darkens the color a given amount, from `0` to `100`. Providing `100` will always return `black`.                                                           |
| `spin(amount: number)`                                      | `Color`                                          | Spins the hue a given amount, from `-360` to `360`. Calling with `0`, `360`, or `-360` will do nothing (since it sets the hue back to what it was before). |
| `complement()`                                              | `Color`                                          | Returns the color complement                                                                                                                               |

## Native Component

| Android                                                                                  | iOS                                                                              |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| [android.graphics.Color](https://developer.android.com/reference/android/graphics/Color) | [UICOlor](https://developer.apple.com/documentation/uikit/uicolor?language=objc) |
