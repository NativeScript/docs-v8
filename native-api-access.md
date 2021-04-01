---
title: Accessing Native Platform APIs
---

## Introduction

The most important feature of NativeScript is the ability to access native platform APIs directly from javascript. NativeScript was built with this as the single goal and it is still the driving force of NativeScript.

::: tip Note
When trying to figure out how to execute some native Android or iOS code in your NativeScript app, you can search the Android & iOS documentation, StackOverflow or other resources.

The key is knowing how to call those APIs from javascript instead of writing the code in Java, Objective-C, Kotlin, or Swift.

The core of NativeScript is all written in TypeScript and you can view the [source on Github](https://github.com/NativeScript/NativeScript/tree/master/packages/core) to see many examples of calling native APIs.
:::

## Android Walk-Through

The Java code below will get the Android device battery level. This example is only for Android API 21+. To get the battery level prior to Android 21 a different approach was necessary. The purpose of this example is to explain walking through an approach of converting Java to javascript.

```java
BatteryManager bm = (BatteryManager) context.getSystemService(BATTERY_SERVICE);
int batLevel = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY);
```

Now we need to take this and write javascript (typescript in this example) calling the same methods the java sample calls. Below is the working code to achieve the same end result that Java code would provide.

```ts
import { Utils, Device } from '@nativescript/core'

if (global.isAndroid && Device.sdkVersion >= '21') {
  const bm = Utils.android
    .getApplicationContext()
    .getSystemService(android.content.Context.BATTERY_SERVICE)
  const batLevel = bm.getIntProperty(android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY)
}
```

::: warning Note
The code block is wrapped with `global.isAndroid` so that it is only executed on Android. Otherwise, the app will crash on iOS when it tries to access APIs that are not part of the iOS platform.

Since this code is only for Android API 21+ we have also included a sdk version check so that you can copy and paste this code in your application.
:::

Now for a short walk through of one way to go about translating Java to javascript.

1. JavaScript uses `const, let, var` to declare variables. So we can not use the types to declare what variable in this way. Using TypeScript you can assign a variable a native type using the `@nativescript/types` developer dependency.
2. Next we see the method `getSystemService(BATTERY_SERVICE)` is being executed. We can search the Android docs for this method. The [getSystemService method is documented here](https://developer.android.com/reference/android/content/Context#getSystemService).

   The method is a public abstract of the `android.content.Context`. In the Java code you typically see `context` which will be an instance of the application context. In NativeScript you can get the Android context a couple ways, the `Utils` of `@nativescript/core` provides a method to get the Android context: `Utils.android.getApplicationContext()`.

3. The `getSystemService(java.lang.String)` method accepts a String. When programming in Android you can use `BATTERY_SERVICE` if the `import android.content.Context` is declared in the .java file. The compiler will know that `BATTERY_SERVICE` is the [static final string declared here](https://developer.android.com/reference/android/content/Context#BATTERY_SERVICE).

   You could also write the `getSystemService("batterymanager")` using the statics constant value: "batterymanager". In your NativeScript code, you could do the same, but if you prefer to use the full namespace path to the static value, you can write it like the example does with `android.content. Context.BATTERY_SERVICE`.

4. Now we have an instance of the [Android BatteryManager](https://developer.android.com/reference/android/os/BatteryManager) which is what the [docs state as the return value](https://developer.android.com/reference/android/content/Context#BATTERY_SERVICE) for this system service.

5. The next line we see [`getIntProperty()`](https://developer.android.com/reference/android/os/BatteryManager#getIntProperty method called on the BatteryManager instance we have from the first line.

   We see that the method expects an `int id` as the argument and returns an `int`. Now we need to determine what the `BatteryManager.BATTERY_PROPERTY_CAPACITY` value is. You can see that `BatteryManager` is the class and what looks like a static value. Searching the Android BatteryManager docs for `BATTERY_PROPERTY_CAPACITY` you will find the constant value of the static final: `Constant Value: 4 (0x00000004)`.

   You could execute the `getIntProperty(int id)` method passing in `4` as the argument in Java and it would work, same as you could in NativeScript. In order to use the full namespace in NativeScript you would use the fully qualified namespace path to the static int `android.os.BatteryManager.BATTERY_PROPERTY_CAPACITY`. Again, you typically do not use the full namespace path to values in Java because you can import the class. So `import android.os.BatteryManager` would be in the example java file allowing you to use the static value and the compiler know what you are trying to do and compile correctly at build time.

## iOS Walk-Through

Here is the ObjectiveC code to get the current battery level of the iOS device.

```objc
float batteryLevel = [[UIDevice currentDevice] batteryLevel];
```

Now we convert this to javascript to execute in NativeScript to read the iOS device battery level.

```ts
if (global.isIOS) {
  UIDevice.currentDevice.batteryLevel
}
```

::: warning Note
The code block is wrapped with `global.isIOS` so that it is only executed on Android. Otherwise, the app will crash on Android when it tries to access APIs that are not part of the Android platform.
:::

Now for a short walk through of one way to go about translating Objective-C to javascript.

1. In the Objective-C code we see `UIDevice`, so you can search for `UIDevice` on the [iOS Documentation](https://developer.apple.com/documentation/uikit/uidevice).

2. Next we see `currentDevice` property being accessed. In the iOS documentation for `UIDevice` you will find the [`currentDevice property`](https://developer.apple.com/documentation/uikit/uidevice/1620014-currentdevice?language=objc) of the `UIDevice` class.

::: tip Note
In NativeScript iOS code, the translating of Objective-C to javascript is not always 1:1, this is where using intellisense and the `@nativescript/types` package during development will help complete the native API calls where they may slightly differ.
:::

3. Last, the Objective-C code is accessing [`batteryLevel`](https://developer.apple.com/documentation/uikit/uidevice/1620042-batterylevel?language=objc) to get the value. So we can do the same direct call in our javascript code to read the battery level of the iOS device.

<!-- ## Android Examples

## iOS Examples -->
