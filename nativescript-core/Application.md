---
title: Application
---

# Application

The Application module provides abstraction over the platform-specific Application implementations. The module lets you manage things like the lifecycle of your NativeScript applications, from starting the application to handling application events, and creating platform-specific logic, such as, sending Broadcasts on Android or adding a Notification observer on IOS.

### Import

/// flavor javascript

```javascript
const applicationModule = require('@nativescript/core/application')
```

///

/// flavor typescript

```typescript
import { Application } from '@nativescript/core'
```

///

## Android

The application module provides a number of Android specific properties to access the Android app which exposes things such as the main activity for the application, the currently active activity, a method to register a broadcast receiver and other Android specific property and methods, as we will see below.

## Android Properties

### android

The property gives you the Nativescript wrapper, the AndroidApplication object, around the android application.
/// flavor javascript

```javascript
const androidApp = applicationModule.android
```

///

/// flavor typescript

```typescript
const androidApp: AndroidApplication = Application.android
```

///

### nativeApp

This a native application reference. Basically, it is the [Android Application](http://developer.android.com/reference/android/app/Application.html) object instance keeping track of the global application state. From this object you can get methods such as `getFilesDir()`, `onLowMemory()`,etc.
|||
|----|-----|
|Return type:|`android.app.Application`|
|||

/// flavor javascript

```javascript
const nativeApp = androidApp.nativeApp
```

///
/// flavor typescript

```typescript
const nativeApp: android.app.Application = androidApp.nativeApp
```

///

### foregroundActivity

The reference to the currently active (loaded) [android Activity](http://developer.android.com/reference/android/app/Activity.html). This property is automatically updated upon Activity events.
|||
|----|-----|
|Return type:|`androidx.appcompat.app.AppCompatActivity`|
|||

/// flavor javascript

```javascript
const foregroundActivity = androidApp.foregroundActivity
```

///
/// flavor typescript

```typescript
const foregroundActivity = androidApp.foregroundActivity
```

///

### startActivity

The main (start) Activity for the application.
|||
|----|-----|
|Return type:|`androidx.appcompat.app.AppCompatActivity`|
|||

/// flavor javascript

```javascript
const startActivity = androidApp.startActivity
```

///

/// flavor typescript

```typescript
const startActivity: androidx.appcompat.app.AppCompatActivity = androidApp.startActivity
```

///

### orientation

Gets the orientation of the application.

|              |                                      |
| ------------ | ------------------------------------ |
| Return type: | `portrait`\| `landscape`\| `unknown` |
|              |                                      |

/// flavor javascript

```javascript
const startActivity = androidApp.orientaion
```

///

/// flavor typescript

```typescript
const orientation: 'portrait' | 'landscape' | 'unknown' = androidApp.orientation
```

///

### systemAppearance

Returns whether the system appearance is dark or light.

|              |                  |
| ------------ | ---------------- |
| Return type: | `dark`\| `light` |
|              |                  |

/// flavor javascript

```javascript
const systemAppearance = androidApp.systemAppearance
```

///

/// flavor typescript

```typescript
const systemAppearance: 'dark' | 'light' = androidApp.systemAppearance
```

///

### paused

Returns `true` if the main application activity is not running (suspended), not even running in the background, otherwise `false` is returned.

|              |           |
| ------------ | --------- |
| Return type: | `boolean` |
|              |           |

/// flavor javascript

```javascript
const isSuspended = androidApp.paused
```

///

/// flavor typescript

```typescript
const isSuspended: boolean = androidApp.paused
```

///

### backgrounded

Returns true if the main application activity is in background, otherwise false is returned.
|||
|----|-----|
|Return type:|`boolean`|
|||

/// flavor javascript

```javascript
const isInBackground = androidApp.backgrounded
```

///

/// flavor typescript

```typescript
const isInBackground: boolean = androidApp.backgrounded
```

///

### Broadcasts

### Registering a broadcast Receiver

/// flavor javascript

```javascript
if (platformModule.isAndroid) {
  const receiverCallback = (androidContext, intent) => {
    const level = intent.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1)
    const scale = intent.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1)
    const percent = (level / scale) * 100.0
    vm.set('batteryLife', percent.toString())
  }

  applicationModule.android.registerBroadcastReceiver(
    android.content.Intent.ACTION_BATTERY_CHANGED,
    receiverCallback
  )
}
```

///

/// flavor typescript

```typescript
if (isAndroid) {
  const receiverCallback = (
    androidContext: globalAndroid.content.Context,
    intent: globalAndroid.content.Intent
  ) => {
    const level = intent.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1)
    const scale = intent.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1)
    const percent = (level / scale) * 100.0
    vm.set('batteryLife', percent.toString())
  }

  Application.android.registerBroadcastReceiver(
    android.content.Intent.ACTION_BATTERY_CHANGED,
    receiverCallback
  )
}
```

///

#### Native Component

| Android                                                                                                           | iOS                                                                                                              |
| :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| [CONNECTIVITY_SERVICE (android.content.Context)](https://developer.android.com/reference/android/content/Context) | [SCNetworkReachability](https://developer.apple.com/documentation/systemconfiguration/scnetworkreachability-g7d) |
