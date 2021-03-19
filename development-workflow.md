---
title: Development Workflow
---

## CLI Basics

In this article, you’re going to learn the basics of the NativeScript command-line interface, including how to create new apps, how to get those apps running on devices, and how to set up a development workflow that lets you iterate fast.

### `create`

Open your terminal and run the following command to create a new NativeScript application:

```shell
ns create
```

The NS CLI will walk you through selecting a template using interactive prompts.

You can also use the `--template` flag with the `ns create` command to target a specific template

```
ns create HelloWorld --template @nativescript/template-hello-world-ts
```

Here you’re passing two things to the `create` command: `HelloWorld` which determines the name of the app you are creating, and the `--template` option, which tells the NativeScript CLI to scaffold an app using a predefined template named “@nativescript/template-hello-world-ts” found [here](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-blank-ts)

For a full list of the templates you can use, see the [full list here](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages)

The `create` command will take a minute to complete, as the NativeScript CLI needs to download a few dependencies while setting up your new app.

### `help`

Executing the following command in your terminal will open the CLI's documentation in your web browser.

```shell
ns help
```

### `preview`

This command allows you to link the app you’re developing locally to the NativeScript Playground app for your iOS or Android device through the NativeScript Playground app. Although, this workflow is great for getting started, it does have limitations.

```
ns preview
```

You’ll see a QR code in your terminal that looks a little something like this.

![](/img/start/cli-basics/terminal-0.png)

Next, open the **NativeScript Playground** app on your iOS or Android device.

::: tip Tip
If you don’t already have the NativeScript Playground app installed on your device, go ahead and download it by searching for “NativeScript Playground” in the iOS App Store or Google Play.
:::

In the Playground app, tap the **Scan QR code** option, and scan the QR code that appears in your terminal or commands prompt.

![](/img/start/cli-basics/scan-qr-code.png)

After scanning, you should see your app on your device.

![](/img/start/cli-basics/android/1.png)
![](/img/start/cli-basics/ios/1.png)

Now that you have the app on your device, you might notice that the `ns preview` command in your terminal or command prompt never finished. That is, you cannot type in your terminal.

This happens because the `ns preview` command is now watching your project for changes. When the `ns preview` command detects a code change, the command automatically refreshes, or _livesyncs_, your app so you can see those changes immediately. Let’s make some updates to your code so you can see this in action.

### `run`

This command allows you to experience the full developer experience (building and deploying on local emulators and devices).

`ns run android` will launch the app on a connected Android device or Android emulator.

::: warning Note
If you get an error at this point you might not have completed the full NativeScript CLI setup.

You must have at least one AVD (Android Virtual Device) configured on your development machine for this command to run your app up on an Android emulator.
Or a connected Android device with debugging enabled.
:::

`ns run ios` will launch the app on a connected iOS device or iOS simulator.

::: tip Note
NativeScript uses Xcode to build and run iOS apps, and Xcode is only available on macOS; therefore, you can only run iOS apps on macOS. There are VM and/or cloud services that allow you to build on a Mac from a PC.
:::

The `run` command will take a few seconds to complete, as the CLI will be building and deploying a native Android application. When the command finishes the native emulator will open, and launch your app on the local emulator (or connected device).

### `debug`

The `debug` command builds and deploys a new package on a connected device or emulator. By default, it also starts to track for changes the `app` folder, meaning that it will automatically livesync changes in code as soon as they are saved. In order to apply the changes, the CLI will automatically restart the application after each sync.

::: tip Note
Changes inside `App_Resources` folder (e.g. `AndroidManifest.xml`, `Info.plist` or any of the resources folders) trigger a rebuild after which live syncing is resumed.
:::

For security reasons, the debugging agent **can't be started automatically** from the command-line. That's why NativeScript CLI generates a URL which is printed on the screen instead. **You need to manually copy it in Google Chrome's address bar to start debugging.**

To start the debugger for Android, run the following command:

```shell
ns debug android
```

To start the debugger for iOS, run the following command:

```shell
ns debug ios
```

You can customize the `ns debug` command using any of the following options:

- `--debug-brk` - Prepares, builds and deploys the application package on a device or in an emulator, and stops at the first JavaScript line until either the debugger frontend connects or a 30 seconds timeout elapses.
- `--start` - Attaches the debug tools to a deployed and running app.
- `--emulator` - Specifies that you want to debug the app in an emulator.
- `--timeout` - Sets the number of seconds that the NativeScript CLI will wait for the debugger to boot. If not set, the default timeout is 90 seconds.
- `--no-watch` - If set, changes in your code will not be livesynced.
- `--clean` - If set forces rebuilding the native application.

#### iOS specific options

- `--inspector` - Flag to use the embedded Webkit Web Inspector debugger (default is Chrome DevTools).

For more information about Android debugging, run any of the following commands:

`ns help debug android` or `ns debug android --help`

For more information about iOS debugging, run any the following commands:

`ns help debug ios` or `ns debug ios --help`

## Debugging

### Visual Studio Code

To debug NativeScript applications in [Visual Studio Code](https://code.visualstudio.com/), you need the [NativeScript extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Telerik.nativescript).

### Chrome DevTools

Debugging Android and iOS applications with Chrome by executing `ns debug <android | ios>`.

<!-- ### iOS with WebKit Web Inspector

To debug iOS applications using the WebKit Web Inspector debugger use the `--inspector` flag - `ns debug ios --inspector`. -->

### console

One of the most natural things you can do to debug apps in any environment is writing to the system’s log. In NativeScript logging works a lot as it does on the web, as most of the same `console` APIs that work on the web also work in NativeScript.

The `console.log()` function is great for outputting primitive values such as strings, numbers, and booleans, but it doesn’t work so well for objects. For those situations you’ll want to use another of the `console` object’s methods intended for complex object output: `console.dir()`.

To see this in action add a `console.log()` in your app code, which uses `console.log()` to log a simple object.

```typescript
export function pageLoaded = () => {
    console.log({
      type: "Apple",
      color: "Red"
    });
};
```

If you look at your console, you’ll see the following not-very-helpful output.

```shell
JS: [object Object]
```

Now replace the `console.log` reference with `console.dir`. After the NativeScript CLI refreshes your app, you should see the full output of the object in your terminal or command prompt.

```shell
JS: === dump(): dumping members ===
JS: {
JS:     "type": "Apple",
JS:     "color": "Red"
JS: }
JS: === dump(): dumping function and properties names ===
JS: === dump(): finished ===
```

## Running on Virtual Device

### Android Emulators

Apart from using real Android devices, a viable option is to download, install and use an Android emulator.
In NativeScript, we can use all Android emulators that are connected and recognized by the `ns device` command.

Example output from `ns device`

```
$ ns device

Connected devices & emulators
Searching for devices...
┌───┬─────────────────────────┬──────────┬───────────────────┬──────────┬───────────┐
│ # │ Device Name             │ Platform │ Device Identifier │ Type     │ Status    │
│ 1 │ sdk_google_phone_x86_64 │ Android  │ emulator-5554     │ Emulator │ Connected │
│ 2 │ bullhead                │ Android  │ 00d3e1311075c66f  │ Device   │ Connected │
└───┴─────────────────────────┴──────────┴───────────────────┴──────────┴───────────┘
```

::: tip Tip
Sometimes emulators take longer to start. As a recommendation and to avoid timing issues, start the emulator before executing other CLI commands. Once the emulator is started, leave it open to avoid the initial load time the next time you need to deploy an Android application.
:::

#### Creating Android Virtual Device via Android Studio

Follow the official documentation on [Creating and Managing Virtual Devices](https://developer.android.com/studio/run/managing-avds.html), where the process of downloading, setting up, and using Android Emulators via Android Studio is covered.

#### Creating Android Virtual Device via command line tool

The `avdmanager` is a tool that allows you to create and manage Android Virtual Devices (AVDs) from the command line. The `avdmanager` is provided in the Android SDK Tools package (25.3.0 and higher) and is located in `<ANDROID_HOME_PATH_HERE>/tools/bin/`. For more information about the avdmanager and how to use it to create AVDs, see the [official avdmanager documentation](https://developer.android.com/studio/command-line/avdmanager.html).

Command syntax to create new AVD

```Shell
$ cd $ANDROID_HOME/tools/bin
$ avdmanager create avd -n name -k "sdk_id" [-c {path|size}] [-f] [-p path]
```

You must provide a name for the AVD and specify the ID of the SDK package to use for the AVD using sdk_id wrapped in quotes.
For example, the following command creates an AVD named `test` using the x86 system image for API level 25:

```Shell
avdmanager create avd -n test -k "system-images;android-25;google_apis;x86"
```

::: warning Note
The above command suggest that the system image is already downloaded. To download an image use the `sdkmanager`. For example `sdkmanager "system-images;android-25;google_apis;x86"`
:::

The following describes the usages for the other options:
-c {path|size}: The path to the SD card image for this AVD or the size of a new SD card image to create for this AVD, in KB or MB, denoted with K or M. For example, -c path/to/sdcard/ or -c 1000M.
-f: Force creation of the AVD. Use this option if you need to overwrite an existing AVD with a new AVD using the same name.
-p path: Path to the location where the directory for this AVD's files will be created. If you do not specify a path, the AVD will be created in ~/.android/avd/.

To list all the downloaded system images use the `list` command.

```Shell
avdmanager list
```

#### Using third-party emulators

An applicable option is to use third-party emulators (like **GenyMotion**).
Visit the official sites for details on how to install and use these emulators.

- [GenyMotion official site](https://www.genymotion.com)

### iOS Simulators

#### Creating iOS Simulators

The iOS simulator emulates iOS devices on Macs. The following documentation is a quick way to get the iOS simulator set up. For more information, see [Apple's documentation](https://developer.apple.com/library/archive/documentation/IDEs/Conceptual/simulator_help_topics/Chapter/Chapter.html).

#### Running on iOS Simualators

On a mac if you have XCode installed with the proper tools, executing `ns run ios` from your terminal will launch the Simulator program with a default device. Alternatively, you can open the Simulator program on your mac, select which device(s) you want to open by navigating to `File -> Open Simulator` and choosing the device to launch. Then execute `ns run ios` and the NativeScript app will launch on the open simulator(s).

## Running on Physical Device

### Android Devices

---

#### Enable Debugging over USB

Most Android devices can only install and run apps downloaded from Google Play, by default. You will need to enable USB Debugging on your device in order to install your app during development.

To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to Settings → About phone → Software information and then tapping the Build number row at the bottom seven times. You can then go back to Settings → Developer options to enable "USB debugging".

#### Plug in your device via USB

Let's now set up an Android device to run our NativeScript projects. Go ahead and plug in your device via USB to your development machine.

Now check that your device is properly connecting to ADB, the Android Debug Bridge, by running adb devices.

```shell
adb devices
```

The device should be listed. See the full [adb documentation](https://developer.android.com/studio/command-line/adb) for troubleshooting and detailed information.

#### Run your app

Type the following in your command prompt to install and launch your app on the device:

```shell
ns run android
```

### iOS Devices

---

#### Plug in your device via USB

Connect your iOS device to your Mac using a USB to Lightning cable. Navigate to the `ios` folder in your project under `platforms`, then open the `.xcodeproj` file, or if you are using CocoaPods open `.xcworkspace`, within it using Xcode.

If this is your first time running an app on your iOS device, you may need to register your device for development. Open the Product menu from Xcode's menubar, then go to Destination. Look for and select your device from the list. Xcode will then register your device for development.

#### Configure code signing

Register for an Apple developer account if you don't have one yet.

Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project). Look for the "General" tab. Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown. Do the same for the tests target (it ends with Tests, and is below your main target).

#### Run your app

If the device is now registered with your developer account you should be able to run your NativeScript app on the device. Execute the following from your terminal to run the app from the CLI:

```shell
ns run ios
```

The app should install and launch on the connected iOS device.

Alternatively, once you have the NativeScript project built, you can open open the native project inside XCode by opening the `.xcworkspace` or `.xcproject` file from XCode's menu and then running on a connected device or simulator.

## HMR

## Testing

- [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/tooling/testing/testing.md
- https://github.com/NativeScript/docs/tree/master/docs/tooling/testing/end-to-end-testing

* `ns test ios`

::: warning Note
Be sure you have prepare/built/run the app at least once before starting the unit test runner.
:::

## Using packages

## Updating

- https://github.com/NativeScript/docs/tree/master/docs/releases

## Choosing An Editor

You can develop NativeScript apps in any text editor or IDE you prefer.

#### VS Code

Most of the NativeScript team prefers to use [VS Code from Microsoft](https://code.visualstudio.com/) as their editor for NativeScript apps. Some reasons we use VS Code:

- Visual Studio Code has excellent support for [TypeScript](https://www.typescriptlang.org/).
- Visual Studio Code gives you the ability to debug JavaScript and TypeScript code directly in your editor. The NativeScript team maintains an official [NativeScript Visual Studio Code extension](https://www.nativescript.org/nativescript-for-visual-studio-code) that enables step debugging for NativeScript apps.
- Visual Studio Code is a fast, modern editor that Microsoft [updates frequently](https://code.visualstudio.com/updates/).
- Visual Studio Code is available for Windows, macOS, and Linux.
- Microsoft backs Visual Studio Code; therefore, you can feel confident that the editor will continue to be supported in the future.

If you do choose to [try Visual Studio Code](https://code.visualstudio.com/), let’s look at one tip you might find useful as you develop NativeScript apps.

- The `code` command

After you install Visual Studio Code, you can open projects using the editor’s `File` → `Open` menu option, but there’s an alternative option that works far better for command-line-based projects like NativeScript: the `code` command.

The `code` command runs in your command-line or terminal, and it works just like the `tns` command does for NativeScript apps. Visual Studio Code installs the `code` command by default on Windows on Linux, but on macOS, there’s [one manual step](https://code.visualstudio.com/docs/setup/mac) you must perform.

Once set up, you can type `code .` in your terminal to open the files in your current folder for editing. For example, you could use the following sequence of command to create a new NativeScript app and open it for editing.

```
ns create MyNewApp
cd MyNewApp
code .
```

#### WebStorm

If you’re a WebStorm user, check out this [popular community-written plugin](https://plugins.jetbrains.com/webstorm/plugin/8588-nativescript) that adds many NativeScript-related features.

#### Next steps

- [Code Samples](https://market.nativescript.org/?tab=samples&framework=all_frameworks&category=all_samples)
  - The NativeScript team provides a collection of high-quality code samples you can add to your applications. Perusing the code samples is a great way to get familiar with what NativeScript can do, as well as find the code you can use on your next app.
- [Books and Videos](https://www.nativescript.org/books-and-videos)
  - Browse our collection of NativeScript books and videos, including the free-to-download NativeScript book by Nick and Mike Brainstein.
- [NativeScripting](https://nativescripting.com/)
  - The third-party NativeScripting site has many video courses to teach you everything you need to know about NativeScript, including a collection of free courses to help you get started.
