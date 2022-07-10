---
title: Platform
---

## Platform

Use this module to access information about the current device such as screen resolution,operating system, model, manufacturer,etc.

## Usage

```typescript
import { Device, Screen, isAndroid, isIOS } from '@nativescript/core'

console.log(`Running on Android? ${isAndroid}`) // true if app is running on Android. False otherwise
console.log(`Running on iOS? ${isIOS}`) // true if app is running on iOS. False otherwise

console.log(`Device.model ${Device.model}`) // For example: "Nexus 5" or "iPhone".
console.log(`Device.deviceType ${Device.deviceType}`) // "Phone" | "Tablet"
console.log(`Device.os ${Device.os}`) // For example: "Android" or "iOS".
console.log(`Device.osVersion ${Device.osVersion}`) // For example: 4.4.4(android), 8.1(ios)
console.log(`Device.sdkVersion ${Device.sdkVersion}`) //  For example: 19(android), 8.1(ios).
console.log(`Device.language ${Device.language}`) // For example "en" or "en-US".
console.log(`Device.manufacturer ${Device.manufacturer}`) // For example: "Apple" or "HTC" or "Samsung".
console.log(`Device.uuid ${Device.uuid}`) // The unique identification number
console.log(`Device.region ${Device.region}`) //  For example "US".

console.log(`Screen.mainScreen.heightDIPs ${Screen.mainScreen.heightDIPs}`) // The absolute height of the screen in density independent pixels.
console.log(`Screen.mainScreen.heightPixels ${Screen.mainScreen.heightPixels}`) // The absolute height of the screen in pixels.
console.log(`Screen.mainScreen.scale ${Screen.mainScreen.scale}`) // The logical density of the display.
console.log(`Screen.mainScreen.widthDIPs ${Screen.mainScreen.widthDIPs}`) // The absolute width of the screen in density independent pixels.
console.log(`Screen.mainScreen.widthPixels ${Screen.mainScreen.widthPixels}`) // The absolute width of the screen in pixel
```

## Device class

Provides the current device information.

### Properties

| Name           | Type                  | Description                                                                                                                                                                                                                                                                      |
| -------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `manufacturer` | `string`              | Gets the manufacturer of the device.                                                                                                                                                                                                                                             |
| `model`        | `string`              | Gets the model of the device.                                                                                                                                                                                                                                                    |
| `os`           | `string`              | Gets the OS of the device.                                                                                                                                                                                                                                                       |
| `osVersion`    | `string`              | Gets the OS version.                                                                                                                                                                                                                                                             |
| `sdkVersion`   | `string`              | Gets the SDK version.                                                                                                                                                                                                                                                            |
| `deviceType`   | `'Phone' \| 'Tablet'` | Gets the type of the current device.                                                                                                                                                                                                                                             |
| `uuid`         | `string`              | Gets the uuid. On iOS this will return a new uuid if the application is re-installed on the device. If you need to receive the same uuid even after the application has been re-installed on the device, use this [plugin](https://www.npmjs.com/package/nativescript-ios-uuid). |
| `language`     | `string`              | Gets the device preferred language.                                                                                                                                                                                                                                              |
| `region`       | `string`              | Gets the device region.                                                                                                                                                                                                                                                          |

## Screen.mainScreen properties

Gets information about the main screen of the current device.

### Properties

| Name           | Type     | Description                                                           |
| -------------- | -------- | --------------------------------------------------------------------- |
| `widthPixels`  | `number` | Gets the absolute width of the screen in pixels.                      |
| `heightPixels` | `number` | Gets the absolute height of the screen in pixels.                     |
| `widthDIPs`    | `number` | Gets the absolute width of the screen in density independent pixels.  |
| `heightDIPs`   | `number` | Gets the absolute height of the screen in density independent pixels. |
| `scale`        | `number` | This is a scaling factor for the Density Independent Pixel unit.      |

## Other properties

| Name        | Type      | Description                                                            |
| ----------- | --------- | ---------------------------------------------------------------------- |
| `isAndroid` | `boolean` | Gets a value indicating if the app is running on the Android platform. |
| `isIOS`     | `boolean` | Gets a value indicating if the app is running on the iOS platform.     |

## API References

| Name                                                                 | Type    |
| -------------------------------------------------------------------- | ------- |
| [Device](https://docs.nativescript.org/api-reference/modules#device) | `Class` |
