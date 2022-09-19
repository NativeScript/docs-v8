---
title: Platform
---

## Platform

Use this module to access information about the current device such as screen resolution,operating system, model, manufacturer,etc.

## Usage

The code in the following Stackblitz Editor is an example of how to use the `Platform` module. To try it out, download the `Nativescript Preview` app from Google Play or App Store. Once you have the app, scan the QR with your phone Camera and the app resulting from the code in the IDE will appear in the `Nativescript Preview` app.

<iframe width="100%" height="640px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-hvxmgc?embed=1&file=app/main-view-model.ts&hideExplorer=0"></iframe>

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
| [Screen](https://docs.nativescript.org/api-reference/classes/screen) | `Class` |
