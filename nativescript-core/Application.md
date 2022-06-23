---
title: Application
---

# Application

The Application module provides abstraction over the platform-specific application implementations. The module lets you manage things such as handling lifecycle events of your application (cross-platform and/or native), sending Broadcasts on Android or adding a Notification observer on IOS.

### Import

/// flavor javascript

```javascript
import { Application } from '@nativescript/core'
```

///

/// flavor typescript

```typescript
import { Application } from '@nativescript/core'
```

///

## Android

For android, you can access the main activity for the application, currently active activity, a method to register a broadcast receiver and other Android-specific properties and methods, as we will see below.

## Android Properties

### android

The property gives you the Nativescript wrapper, the AndroidApplication object, around the native android native application instance.
/// flavor javascript

```javascript
const androidApp = Application.android
```

///

/// flavor typescript

```typescript
const androidApp: AndroidApplication = Application.android
```

///

### nativeApp

This a native application reference. Basically, it is the [android.app.Application](http://developer.android.com/reference/android/app/Application.html) instance keeping track of the global application state. From this object you can get methods such as `getFilesDir()`, `onLowMemory()`,etc.
|||
|----|-----|
|Type:|`android.app.Application`|
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
|Type:|`androidx.appcompat.app.AppCompatActivity`|
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
|Type:|`androidx.appcompat.app.AppCompatActivity`|
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

Gets or sets the orientation of the application.

|       |                                      |
| ----- | ------------------------------------ |
| Type: | `portrait`\| `landscape`\| `unknown` |
|       |                                      |

/// flavor javascript

```javascript
const orientation = androidApp.orientaion
```

///

/// flavor typescript

```typescript
const orientation: 'portrait' | 'landscape' | 'unknown' = androidApp.orientation
```

///

### systemAppearance

Returns whether the system appearance is dark or light.

|       |                  |
| ----- | ---------------- |
| Type: | `dark`\| `light` |
|       |                  |

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

Returns `true` if the main application activity is not running (suspended), otherwise `false` is returned.

|       |           |
| ----- | --------- |
| Type: | `boolean` |
|       |           |

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
|Type:|`boolean`|
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

## AndroidApplication Methods

### registerBroadcastReceiver(intentFilter, onReceiveCallback)

Registers a BroadcastReceiver to be run in the main activity thread. The receiver will be called with any broadcast Intent that matches filter, in the main application thread. For more information, please [visit](http://developer.android.com/reference/android/content/Context.html#registerReceiver%28android.content.BroadcastReceiver,%20android.content.IntentFilter%29).

| Parameter(s)        | Definition                                                                           |
| ------------------- | ------------------------------------------------------------------------------------ |
| `intentFilter`      | A string containing the intent filter.                                               |
| `onReceiveCallback` | A callback function that will be called each time the receiver receives a broadcast. |

Since this code is Android specific, first check if `isAndroid` is true. You the same for any Android-specific code to avoid code for Android to run on iOS and results in the app crashing.
/// flavor javascript

```javascript
import { isAndroid } from '@nativescript/core'

if (isAndroid) {
  const receiverCallback = (androidContext, intent) => {
    const level = intent.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1)
    const scale = intent.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1)
    const percent = (level / scale) * 100.0
    viewModel.set('batteryLife', percent.toString())
  }

  androidApp.registerBroadcastReceiver(
    android.content.Intent.ACTION_BATTERY_CHANGED,
    receiverCallback
  )
}
```

///

/// flavor typescript

```typescript
import { isAndroid } from '@nativescript/core'

if (isAndroid) {
  const receiverCallback = (
    androidContext: globalAndroid.content.Context,
    intent: globalAndroid.content.Intent
  ) => {
    const level = intent.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1)
    const scale = intent.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1)
    const percent = (level / scale) * 100.0
    viewModel.set('batteryLife', percent.toString())
  }

  androidApp.registerBroadcastReceiver(
    android.content.Intent.ACTION_BATTERY_CHANGED,
    receiverCallback
  )
}
```

///

### getRegisteredBroadcastReceiver(intentFilter)

Gets a registered BroadcastReceiver for the specified intent filter.
|Parameter(s)|Definition|
|-----|-----|
|`intentFilter`| A string containing the intent filter for which the BroadcastReceiver.|

/// flavor javascript

```javascript
if (isAndroid) {
  const registerReceiver = androidApp.getRegisteredBroadcastReceiver(intentFilter)
}
```

///

/// flavor typescript

```typescript
if (isAndroid) {
  const registerReceiver: android.content.BroadcastReceiver =
    androidApp.getRegisteredBroadcastReceiver(intentFilter)
}
```

///

### unregisterBroadcastReceiver(intentFilter)

Unregisters previously registered BroadcastReceiver.
|Parameter(s)|Definition|
|-----|-----|
|`intentFilter`|A string containing the intent filter with which the receiver was originally registered.
.|

/// flavor javascript

```javascript
if (isAndroid) {
  const registerReceiver = androidApp.getRegisteredBroadcastReceiver(intentFilter)
}
```

///

/// flavor typescript

```typescript
if (isAndroid) {
  const registerReceiver: android.content.BroadcastReceiver =
    androidApp.getRegisteredBroadcastReceiver(intentFilter)
}
```

///

## Android Activity lifecycles events

/// flavor javascript

```javascript
applicationModule.AndroidApplication.on('activityResumed', args => {
  //handle the event here
})
```

///

/// flavor typescript

```typescript
Application.AndroidApplication.on('activityResumed', args => {
  //handle the event here
})
```

///
Other Android Activity lifecycles events are:

- `activityCreated`
- `activityDestroyed`
- `activityStarted`
- `activityPaused`
- `activityStopped`
- `saveActivityState`
- `activityResult`
- `activityBackPressed`
- `activityNewIntent`
- `activityRequestPermissions`

## iOS

## iOS Properties

### ios

The property gives you the Nativescript wrapper, the iOSApplication object, around the native iOS application instance.

|       |                  |
| ----- | ---------------- |
| Type: | `iOSApplication` |

/// flavor javascript

```javascript
const iOSApp = Application.ios
```

///

/// flavor typescript

```typescript
const iOSApp: iOSApplication = Application.ios
```

///

### rootController

The root view controller for the iOS application.
|||
|----|-----|
|Type:|`UIViewController`|

/// flavor javascript

```javascript
const rootController = iOSApp.rootController
```

///

/// flavor typescript

```typescript
const rootController: UIViewController = iOSApp.rootController
```

///

### window

This property gives the key window, the container for your app views and one of its roles is to deliver touch events to the views. Views are the user interface items such as button, label or scrollview.
|||
|----|-----|
|Type:|`UIWindow`|

/// flavor javascript

```javascript
const rootController = iOSApp.window
```

///

/// flavor typescript

```typescript
const rootController: UIWindow = iOSApp.window
```

///

### delegate

This returns the class you set (the best place to set it is in the `app.js` or `app.ts`, right before `Application.run()`) as a delegate or undefined if you didn't set any. The iOS system monitors the different states of your application and emits an event at each state. To handle these lifecycle events, you have to write a class that extends UIResponder and implements UIApplicationDelegate classes. This class is your delegate. You overwrite the methods from UIApplicationDelegate to handle the events.
|||
|----|-----|
|Type:|`UIApplicationDelegate` \| `undefined`|

/// flavor javascript

```javascript
const MyDelegate = (function (_super) {
  __extends(MyDelegate, _super)
  function MyDelegate() {
    _super.apply(this, arguments)
  }
  MyDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (
    application,
    launchOptions
  ) {
    console.log('applicationWillFinishLaunchingWithOptions: ' + launchOptions)
    return true
  }
  MyDelegate.prototype.applicationDidBecomeActive = function (application) {
    console.log('applicationDidBecomeActive: ' + application)
  }
  MyDelegate.ObjCProtocols = [UIApplicationDelegate]
  return MyDelegate
})(UIResponder)

Application.ios.delegate = MyDelegate
```

///

/// flavor typescript

```typescript
@NativeClass()
class MyDelegate extends UIResponder implements UIApplicationDelegate {
  public static ObjCProtocols = [UIApplicationDelegate]

  applicationDidFinishLaunchingWithOptions(
    application: UIApplication,
    launchOptions: NSDictionary<string, any>
  ): boolean {
    console.log('applicationWillFinishLaunchingWithOptions: ' + launchOptions)

    return true
  }

  applicationDidBecomeActive(application: UIApplication): void {
    console.log('applicationDidBecomeActive: ' + application)
  }
}
Application.ios.delegate = MyDelegate
```

For a complete list of the lifecycle events, visit [UIApplicationDelegate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate?language=objc).

///

### orientation

Gets or sets the orientation of the application.

|       |                                      |
| ----- | ------------------------------------ |
| Type: | `portrait`\| `landscape`\| `unknown` |
|       |                                      |

/// flavor javascript

```javascript
const orientation = iOSApp.orientaion
```

///

/// flavor typescript

```typescript
const orientation: 'portrait' | 'landscape' | 'unknown' = iOSApp.orientation
```

///

### systemAppearance

Returns whether the system appearance is dark or light.

|       |                                                 |
| ----- | ----------------------------------------------- |
| Type: | `'dark'` \| `'light'` \| `null` (for iOS <= 11) |
|       |                                                 |

/// flavor javascript

```javascript
const systemAppearance = iOSApp.systemAppearance
```

///

/// flavor typescript

```typescript
const systemAppearance: 'dark' \| 'light' \| 'null' = iOSApp.systemAppearance
```

///

### nativeApp

Returns the reference to the native iOS app.

|       |                 |
| ----- | --------------- |
| Type: | `UIApplication` |
|       |                 |

/// flavor javascript

```javascript
const nativeApp = iOSApp.nativeApp
```

///

/// flavor typescript

```typescript
const nativeApp: UIApplication = iOSApp.nativeApp
```

///

## iOSApplication Methods

### addNotificationObserver(notificationName, onReceiveCallback: (notification))

Adds an observer to the default notification center for the specified notification.
For more information, please [visit](https://developer.apple.com/library/mac/documentation/Cocoa/Reference/Foundation/Classes/NSNotificationCenter_Class/#//apple_ref/occ/instm/NSNotificationCenter/addObserver:selector:name:object:).

| Parameter(s)                                               | Definition                                                                                                                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `notificationName:string`                                  | A string containing the name of the notification. Find the possible values [here](https://developer.apple.com/documentation/foundation/nsnotificationname?language=objc) |
| `onReceiveCallback:(notification: NSNotification) => void` | A callback function that will be called each time the observer receives a notification for which it was registered.                                                      |

/// flavor javascript

```javascript
const observer = iOSApp.addNotificationObserver(
  'myNotification',
  (notification: NSNotification) => {}
)
```

///

/// flavor typescript

```typescript
const observer: any = iOSApp.addNotificationObserver(
  UIDeviceOrientationDidChangeNotification, // For example
  (notification: NSNotification) => {
    //Handle the notification
  }
)
```

///

### removeNotificationObserver(observer, notificationName)

Removes the observer for the specified notification from the default notification center.
|Parameter(s)|Definition|
|-----|-----|
|`observer`| The observer that was returned from the addNotificationObserver method.|
|`notificationName`| A string containing the name of the notification. |
|`onReceiveCallback`| A callback function that will be called each time the observer receives a notification.|

/// flavor javascript

```javascript
iOSApp.removeNotificationObserver(observer, UIDeviceBatteryStateDidChangeNotification)
```

///

/// flavor typescript

```typescript
iOSApp.removeNotificationObserver(observer, UIDeviceBatteryStateDidChangeNotification)
```

///

## Cross-platform application events

These are Nativescript events for both platforms.
/// flavor javascript

```javascript
applicationModule.on('orientationChanged', args => {
  console.log(args.eventName) // orientationChanged
})
```

///

/// flavor typescript

```typescript
Application.on('orientationChanged', (args: ApplicationEventData) => {
  console.log(args.eventName) // orientationChanged
})
```

///
Other cross-platform events:

- `livesync`
- `cssChanged`
- `launch`
- `displayed`
- `suspend`
- `resume`
- `exit`
- `lowMemory`
- `uncaughtError`
- `discardedError`
- `orientationChanged`
- `systemAppearanceChanged`
- `fontScaleChanged`

#### API References

| Name                                                                                              | Type     |
| ------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/application](https://docs.nativescript.org/api-reference/modules#application) | `Module` |

#### Native Component

| Android                                                                                    | iOS                                                                                          |
| :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| [android.app.Application](https://developer.android.com/reference/android/app/Application) | [UIApplication](https://developer.apple.com/documentation/uikit/uiapplication?language=objc) |
