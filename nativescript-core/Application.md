---
title: Application
---

## Application

The Application module provides abstraction over the platform-specific Application implementations. The module lets you manage the lifecycle of your NativeScript applications from starting the application to handling application events and creating platform-specific logic, such as, sending Broadcasts on Android or adding a Notification observer on IOS.

#### Usage

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

The application module provides a number of Android specific properties to access the Android app, context and activities.

/// flavor javascript

```javascript
const androidApp = applicationModule.android
const isPaused = androidApp.paused // e.g. false
const packageName = androidApp.packageName // The package ID e.g. org.nativescript.nativescriptsdkexamplesng
const nativeApp = androidApp.nativeApp // The native APplication reference
const foregroundActivity = androidApp.foregroundActivity // The current Activity reference
const context = androidApp.context // The current Android context
```

///

/// flavor typescript

```typescript

```

///

#### Registering a Broadcast Receiver

/// flavor javascript

```javascript
if (applicationModule.isAndroid) {
  // use tns-platform-declarations to acces native APIs (e.g. android.content.Intent)
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

```

///

#### Methods

| Name                                                       | Type     | Description                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getConnectionType`                                        | `number` | Gets the type of connection. Returns a value from the `connectivityModule.connectionType` enumeration. To use this method on Android you need to have the **android.permission.ACCESS_NETWORK_STATE** permission added to the **AndroidManifest.xml** file. |
| `startMonitoring(connectionTypeChangedCallback: function)` | `void`   | Starts monitoring the connection type.                                                                                                                                                                                                                      |
| `stopMonitoring`                                           | `void`   | Stops monitoring the connection type.                                                                                                                                                                                                                       |

#### Connection Types

- `none = 0`,
- `wifi = 1`,
- `mobile = 2`,
- `ethernet = 3`,
- `bluetooth = 4`,
- `vpn = 5`

#### Native Component

| Android                                                                                                           | iOS                                                                                                              |
| :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| [CONNECTIVITY_SERVICE (android.content.Context)](https://developer.android.com/reference/android/content/Context) | [SCNetworkReachability](https://developer.apple.com/documentation/systemconfiguration/scnetworkreachability-g7d) |
