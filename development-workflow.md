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

### `clean`

This command will clean your NativeScript project. It will delete the `node_modules`, `hooks`, and `platforms` directories from your project. These directories sometime need a clean slate during development of native applications. It is similar to running "Clean Build Folder" in XCode or other IDE environments.

```shell
ns clean
```

If you're having trouble running your application or you have added new dependencies, it's usually a good practice to start with `ns clean` before running to be sure you avoid any type of dependency issues or native project build issues.

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

Runs your project on all connected devices or in native emulators for the selected platform. The command will prepare, build and deploy the app when necessary. By default listens for changes in your code, synchronizes those changes and refreshes all selected devices.

```shell
ns run android
```

Launches the app on a connected Android device or Android emulator.

::: warning Note
If you get an error at this point you might not have completed the full NativeScript CLI setup.

You must have at least one AVD (Android Virtual Device) configured on your development machine for this command to run your app up on an Android emulator.
Or a connected Android device with debugging enabled.
:::

```shell
ns run ios
```

Launches the app on a connected iOS device or iOS simulator.

::: tip Note
NativeScript uses Xcode to build and run iOS apps, and Xcode is only available on macOS; therefore, you can only run iOS apps on macOS. There are VM and/or cloud services that allow you to build on a Mac from a PC.
:::

The `run` command will take a few seconds to complete, as the CLI will be building and deploying a native Android application. When the command finishes the native emulator will open, and launch your app on the local emulator (or connected device).

You can customize the `ns run` command using any of the following options:

- `--no-hmr` - Disables the webpack HMR option, so changes made during a session will restart the application.
- `--emulator` - Specifies that you want to debug the app in an emulator.
- `--timeout` - Sets the number of seconds that the NativeScript CLI will wait for the debugger to boot. If not set, the default timeout is 90 seconds.
- `--clean` - If set forces rebuilding the native application.

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

### `help`

Executing the following command in your terminal will open the CLI's documentation in your web browser.

```shell
ns help
```

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

### End to End Testing

E2E testing allows to test your application workflows and make sure all the integration points are working as expected. You can literally test any screen and any workflow of your app. It differs from [Unit Testing](#unit-testing) by the fact that unit testing is used to test an isolated piece of code usually in a mocked environment.

If you wonder when to do unit testing and when E2E testing there is a basic rule. For isolated pieces of code prefer to do a set of unit tests that are focused on the work this code do. Unit tests usually are smaller, simpler and much faster. Use E2E testing for any application workflow where multiple components are involved and you want to ascertain they work well when integrated together. E2E tests allow to cover flows in the application which are not covered by unit and integration tests.

#### E2E Testing in NativeScript

Thanks to [Appium](https://appium.io/) and the [nativescript-dev-appium plugin](https://github.com/NativeScript/nativescript-dev-appium) E2E automation testing is made easy in NativeScript!

#### What is Appium?

Appium is an open-source test automation framework for use with any mobile app. It allows you to easily create UI automation testing for iOS, Android, Windows and hybrid mobile apps.
Read more details in the [Appium introduction](https://appium.io/docs/en/about-appium/intro/) and [Appium getting started guide](https://appium.io/docs/en/about-appium/getting-started/).

#### What is nativescript-dev-appium?

Since Appium is used internally to test the NativeScript framework itself, the core team developed a nativescript plugin that wraps Appium and allows using it easy for UI test automation of NativeScript apps. The [nativescript-dev-appium plugin](https://github.com/NativeScript/nativescript-dev-appium) is created and maintained by the core team and is constantly improving.

#### Environment Setup

#### Prerequisites

For the plugin to work correctly you need to have:

- latest version of [XCode](https://developer.apple.com/library/archive/releasenotes/DeveloperTools/RN-Xcode/Chapters/Introduction.html)
- [Android SDK Tools](https://developer.android.com/studio/releases/sdk-tools.html) with version > 25.3.0

#### Global Setup

- Install Appium globally:

```shell
$ npm install -g appium@1.18.1
```

- iOS Dependencies

Install external dependencies of [XCUITest](https://github.com/appium/appium-xcuitest-driver/blob/master/README.md#external-dependencies) driver for iOS via Homebrew or NPM as follows:

- [Homebrew](https://brew.sh):

```shell
$ brew install carthage
$ brew install libimobiledevice --HEAD
$ brew install ideviceinstaller
$ brew install ios-webkit-debug-proxy
```

- [NPM](https://www.npmjs.com/):

```shell
$ npm install -g ios-deploy
```

> For detailed information on external dependencies, please, refer to the [XCUITest](https://github.com/appium/appium-xcuitest-driver/blob/master/README.md#external-dependencies) repository.

- Android Dependencies

For correct functioning of the [mobile-devices-controller](https://github.com/NativeScript/mobile-devices-controller) for Android emulators, `telnet` is required to be available on your system.

As `telnet` is removed from _macOS High Sierra_, it could be installed as follows:

```shell
$ brew install telnet
```

#### Features

1. Cross-platform [locators](https://github.com/NativeScript/nativescript-dev-appium/blob/master/lib/locators.ts)

   Imagine that you want to select textfield on iOS and Android and provide an input. The element's native class is different on iOS and Android. For example, textfield class on both iOS is _XCUIElementTypeTextField_ and _android.widget.EditText_ on Android, so the locators define all common elements and corresponding classes per OS to ease the selection of particular element. Example:

   ```typescript
   const usernameField = await driver.findElementByClassName(
     driver.locators.getElementByName('textfield')
   )
   await usernameField.click()
   ```

1. Find [strategies](https://github.com/NativeScript/nativescript-dev-appium/blob/master/lib/appium-driver.d.ts): _findElementByText_, _findElementByClassName_, _findElementByAccessibilityId_, _findElementByXPath_, etc.

   Examples:

   ```xml
   <!-- home-page.xml -->
   ...
   <Button automationText="customLogOut" tap="{{ logout }}" text="Log out (Custom)"></Button>
   ...
   ```

   ```typescript
   import {
     AppiumDriver,
     createDriver,
     SearchOptions,
     Direction
   } from 'nativescript-dev-appium'

   const driver: AppiumDriver = await createDriver()

   // select an element by using the accessibility ID assigned by the automationText property in the .xml
   const button = await driver.findElementByAccessibilityId('customLogOut')

   // select an element using its native class
   let listView
   if (isAndroid) {
     listView = await driver.findElementByClassName('android.widget.FrameLayout')
   } else {
     listView = await driver.findElementByClassName('XCUIElementTypeCollectionView')
   }

   // select an element using XPath
   let userNameLabelElement
   if (isAndroid) {
     userNameLabelElement = "[@text='Nativescript User']"
   } else {
     userNameLabelElement = "[@name='Nativescript User']"
   }
   const userNameLabel = await driver.findElementByXPath(
     '//' + driver.locators.getElementByName('label') + userNameLabelElement
   )
   ```

1. [Actions](https://github.com/NativeScript/nativescript-dev-appium/blob/master/lib/ui-element.d.ts): _tap_, _click_, _doubleTap_, _hold_, etc. Most of them are self described.

   Examples:

   ```typescript
   const item = await driver.findElementByText('Special Item 111', SearchOptions.exact)
   await item.click()
   await item.doubleTap()
   await item.hold(2)
   ```

1. [Gestures](https://github.com/NativeScript/nativescript-dev-appium/blob/master/lib/ui-element.d.ts): _scroll_, _scrollTo_, _swipe_, _drag_, etc.

   Examples:

   ```typescript
   // Imagine that you have a listview with items that can be swiped
   const item = await driver.findElementByText('Special Item 111', SearchOptions.exact)
   await item.swipe(Direction.right)
   ```

1. [Cross-platform element abstraction](https://github.com/NativeScript/nativescript-dev-appium/blob/master/lib/ui-element.d.ts) with _exists_, _waitForExist_, _waitForExistNot_, _location_, _isDisplayed_, _size_, _text_ properties

   Examples:

   ```typescript
   const item = await driver.findElementByText('Special Item 111', SearchOptions.exact)
   const exist = await item.exists()
   const rectangle = await item.getRectangle()
   const width = rectangle.width
   ```

1. Ability to turn on/off “Don’t keep activities” setting in the Developer options for Android
1. Direct access to driver

   Examples:

   ```typescript
   if (driver.isAndroid) {
     const wd = driver.wd()
     const action = new wd.TouchAction(driver.driver)
     // Drag item on Android
     action.longPress({ x: 200, y: 200 }).wait(2000).moveTo({ x: 200, y: 400 }).release()
     await action.perform()
   } else {
     // Drag item on iOS
     await driver.driver.execute('mobile: dragFromToForDuration', {
       duration: 2.0,
       fromX: 100,
       fromY: 105,
       toX: 100,
       toY: 242
     })
   }
   ```

1. Typings - very useful when start writing test and you are not aware of nativescript-dev-appium methods' definitions and available parameters.
1. Async/Await
1. [Open source butt builds]({% slug plugin-ui-tests %}#continuous-integration) integration, i. e. [Sauce Labs](https://saucelabs.com/)
1. [Image comparison](https://github.com/NativeScript/nativescript-dev-appium/blob/master/lib/appium-driver.d.ts) of: screen, rectangle, element.

   Examples:

   ```typescript
   // Compare a specific element
   const selected = await driver.findElementByText('Item 0', SearchOptions.exact)

   // The second parameter is the name of the image.
   // The location of the image is specified by '--imagesPath "someName/iPhone X"' flag.
   // Which provides relative path to e2e/resources/images folder.
   // Actual image location e2e/resources/images/someName/iPhone X/selectedState.png
   const selection = await driver.compareElement(selected, 'selectedState')

   // Compare the current screen of the app
   const screen = await driver.compareScreen('screenImage')
   ```

#### Customization

#### Custom Appium Capabilities

When installed, the `nativescript-dev-appium` plugin creates `e2e` folder containing sample test file and configuration folder `config` where your custom capabilities reside.
The existence of such capabilities is a runner's requirement which comes from [Appium](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/caps.md). Additional locations where the runner will search for the config file are:

```
my-app
├── app
├── assets
├── package.json
.
.
.
└── appium.capabilities.json
```

If the file structure resembles plugin repo structure like for example [nativescript-plugin-seed](https://github.com/NativeScript/nativescript-plugin-seed) the suggested location is:

```
my-plugin
├── demo
├── demo-angular
├── src
└── appium.capabilities.json
```

Thus, the same configuration can be used by both apps without duplication of files.

If you wish to use another location of the capabilities file instead default ones, you can specify it with `--appiumCapsLocation` option. Remember that the path provided has to be relative to the root directory.

Notice that once custom capabilities are provided you will be able to pick any of them using the `--runType` option (e.g. `--runType android25`). See sample content of `appium.capabilities.json` file below. For more details regarding the Appium Capabilities read [Appium documentation about Desired Capabilities](https://appium.io/docs/en/writing-running-appium/caps/):

```json
{
  "android21": {
    "browserName": "",
    "platformName": "Android",
    "platformVersion": "5.0",
    "deviceName": "Android Emulator",
    "noReset": false,
    "app": ""
  },
  "android25": {
    "browserName": "",
    "platformName": "Android",
    "platformVersion": "7.0",
    "deviceName": "Android Emulator",
    "noReset": false,
    "app": ""
  },
  "sim.iPhone8.iOS110": {
    "browserName": "",
    "platformName": "iOS",
    "platformVersion": "11.0",
    "deviceName": "iPhone 8 110",
    "app": ""
  }
}
```

As you can see, the `app` property can be left an empty string which will force the plugin to search for an app package in `platforms` folder. However, this search functionality depends on `runType` option so if you think of using it add `android`, `device`, `sim` strings as part of your `runType` option which in fact is your capability key in the config file. E.g --runType android23, --runType sim.10iPhone6. Thus, the runner will manage to look in the right location in order to search for app package.

::: tip Note
It is important to build your app in advance, because the runner expects to provide app package to it or such to exists in the search location.

For faster testing when working on an app with livesync it would be better to use --devMode option or start a new session using --startSession option and run tests using --attachToDebug option and specify appium --port. Or simply start session with appium desktop application
:::

#### Options

| Option                 | Description                                                                                                                                                                                                                                                                                                       | Value                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| runType                | Select the capabilities from your config file `appium.capabilities.json`                                                                                                                                                                                                                                          | Consider using `android`, `device`, `sim` strings as part of your `runType` option if you haven't provided `app` capability. Thus, the runner will look for app package in the right location for the current run. <br/> e.g. --runType ios-device10iPhone6                                                                                                                                                                     |
| appPath                | Provide location of the app package to be tested. This will overwrite all provided capabilities for app                                                                                                                                                                                                           | Possible values are:<br/> - app build package name (in case `--sauceLab` option is set it will prepend `sauce-storage:` in front of the app name so app has to be [uploaded to Sauce Labs](https://wiki.saucelabs.com/display/DOCS/Uploading+Mobile+Applications+to+Sauce+Storage+for+Testing) before execution starts)<br/> - path e.g. `platforms/android/build/outputs/apk/demo.apk`.<br/> Example: --appPath demo-debug.apk |
| imagesPath             | Provide the relative path to e2e/resources/images folder of the images location required by the image comparison feature                                                                                                                                                                                          | --imagesPath "osPlatformName/iPhone X"                                                                                                                                                                                                                                                                                                                                                                                          |
| reuseDevice            | Reuse the device specified in the `runType` capabilities. If the emulator/simulator is not running, it will launch, execute tests and remain running. The next execution of `npm run e2e` with the `reuseDevice` option will attach to the already running emulator/simulator, execute tests and keep it running. | e.g. --reuseDevice                                                                                                                                                                                                                                                                                                                                                                                                              |
| devMode                | `devMode` capabilities. Skipping application instalation and will automatically reuse device.                                                                                                                                                                                                                     | e.g. --devMode                                                                                                                                                                                                                                                                                                                                                                                                                  |
| sauceLab               | Enable tests execution in [Sauce Labs](https://saucelabs.com/). As a prerequisite you will have to define `SAUCE_USER` and `SAUCE_KEY` as [environment variable](https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Environment+Variables+for+Authentication+Credentials)                               | e.g. --sauceLab                                                                                                                                                                                                                                                                                                                                                                                                                 |
| appiumCapsLocation     | Change the location where `appium.capabilities.json` config file can be. It should be relative to the root directory                                                                                                                                                                                              | e.g. --appiumCapsLocation /e2e-tests                                                                                                                                                                                                                                                                                                                                                                                            |
| port                   | Appium server port                                                                                                                                                                                                                                                                                                |
| storage                | Specify remote image storage                                                                                                                                                                                                                                                                                      |
| ignoreDeviceController | Setting this option you will use default appium device controller which is recommended when tests are executed on butt based solutions                                                                                                                                                                            |
| sessionId              | In order to attach to already started session                                                                                                                                                                                                                                                                     | Option --port is mandatory in this case. It will automatically set --devMode to true. Provides the ability to nativescript-dev-appium to be used with [appium desktop client](https://github.com/appium/appium-desktop/releases)                                                                                                                                                                                                |
| attachToDebug          | Same as sessionId but no need to provide session id.                                                                                                                                                                                                                                                              | Option --port is mendatory in this case. It will automatically resolve --sessionId. Provides ability nativescript-dev-appium to be used with [appium desktop client](https://github.com/appium/appium-desktop/releases)                                                                                                                                                                                                         |
| startSession           | Start new appium server and initialize appium driver.                                                                                                                                                                                                                                                             |
| cleanApp               | Remove application from device on server quit.                                                                                                                                                                                                                                                                    |

Examples:

Let say that we have a script in package.json like this

```json
 "scripts": {
    "e2e": "tsc -p e2e && mocha --opts ./config/mocha.opts --recursive e2e --appiumCapsLocation ./config/appium.capabilities.json"
 }

```

Run tests in SauceLabs. Before that you have to upload the package in test specified by _--appPath_ option to SauceLab

```node
$ npm run e2e -- --runType android25 --sauceLab --appPath demo.apk
```

Run tests locally

```node
$ npm run e2e -- --runType android25
```

Starting new session will console log appium server port and session id

```node
$ node ./node_modules/.bin/ns-appium --runType android23 --startSession --port 8300
```

Run tests with already started session. Specify session id and server port. Default value for server port is 8300

```node
$ npm run e2e -- --sessionId e72daf17-8db6-4500-a0cf-59a66effd6b9 --port 8300
```

or simply use --attachToDebug which will attached to first available session. This is not recommended when more than one session is available.

```node
$ npm run e2e -- --attachToDebug --port 8300
```

#### Troubleshooting

Use the `--verbose` option to get error details:

```node
$ npm run e2e -- --runType android25 --verbose
```

#### Common Problems

Most of them provide error/warning and suggest an action.

1. Missing installed appium. To resolve it install appium globally.

   ```
   npm i -g appium
   ```

2. Misleading appPath or capabilities location. Please make sure that the path to the app or capabilities location is correct.
3. Misleading details for device specified in appium config. If the plugin fails to find the emulator/simulator you have, check that the _avd_, _platformName_, _deviceName_ or any other related capability is properly set.

There are also nice blog posts and conference videos covering Appium and its usage in NativeScript apps which you can find in the [References section]({% slug e2e-testing-references %}) of this documentation.

### Unit Testing

When you develop new features inside your app, you can ensure that they are working properly and that past functionality has not regressed by writing and executing unit tests on a regular basis. With the NativeScript CLI, you can write and execute unit tests using [Jasmine](http://jasmine.github.io/), [Mocha](https://mochajs.org/) with [Chai](http://chaijs.com/) or [QUnit](https://qunitjs.com/).

To run your unit tests, the NativeScript CLI uses [Karma](http://karma-runner.github.io/latest/index.html).

Before writing and running unit tests, verify that you have completed the following steps.

1. Install and configure the NativeScript CLI on your system.
2. If you don't have any projects, create a new project and navigate to the directory of the newly created directory.

```shell
ns create projectName
cd projectName
```

1. If you want to create tests for an existing directory, navigate to the directory of the project.

   ```Shell
   cd existingProjectDirectory
   ```

::: tip Tip
You don't need to explicitly add the platforms for which you want to test your project. The NativeScript CLI will configure your project when you begin to run your tests.
:::

#### Configure Your Project

The NativeScript CLI lets you choose between three widely popular unit testing frameworks: [Jasmine](https://jasmine.github.io/), [Mocha](https://mochajs.org/) with [Chai](https://chaijs.com/) and [QUnit](https://qunitjs.com/). You need to configure the project for unit testing by choosing a framework. You can use only one framework at a time.

To initialize your project for unit testing, run the following command and, when prompted, use the keyboard arrows to select the framework that you want to use.

```shell
ns test init
```

This operation applies the following changes to your project.

- It creates the `app/tests` directory. You need to store all tests in this directory. This directory is excluded from release builds.
- It creates an `example.js` file in the `app/tests` directory. This sample test illustrates the basic syntax for the selected framework.
- It installs the nativescript-unit-test-runner npm module for the selected framework and its dev dependencies in `node_modules`.
- It creates `karma.conf.js` in the root of your project. This file contains the default configuration for the Karma server for the selected framework.

::: tip Note
To enable and write unit tests for TypeScript or Angular project install the TypeScript typings for the selected testing framework.
:::

```node
npm i @types/jasmine --save-dev
```

```node
npm i @types/mocha --save-dev
```

```node
npm i @types/qunit --save-dev
```

#### Write Your Tests

With the NativeScript CLI, you can extensively test **all JavaScript-related functionality**. You cannot test styling and UI which are not applied or created via JavaScript.

When creating tests for a new or existing functionality, keep in mind the following specifics.

- You need to create your tests as JavaScript files in the `app/tests` directory. The NativeScript CLI recognizes JavaScript files stored in `app/tests` as unit tests.
- You need to write tests which comply with the testing framework specification you have chosen for the project.
- You need to export the functionality that you want to test in the code of your NativeScript project.
- You need to require the module which exposes the functionality that you want to test in the code of your unit tests.

When creating tests for a new or existing functionality, keep in mind the following limitations.

- You cannot require the file or module in which `application.start()` is called.
- You cannot use more than one testing framework per project.
- You cannot test styling and UI which are not applied or created via JavaScript.

The following samples test the initial value of the counter and the message in the Hello World template. These tests show the specifics and limitations outlined above.

```javascript
var mainViewModel = require('../main-view-model') //Require the main view model to expose the functionality inside it.

describe('Hello World Sample Test:', function () {
  it('Check counter.', function () {
    expect(mainViewModel.createViewModel().counter).toEqual(42) //Check if the counter equals 42.
  })
  it('Check message.', function () {
    expect(mainViewModel.createViewModel().message).toBe('42 taps left') //Check if the message is "42 taps left".
  })
})
```

```javascript
// (Angular w/TypeScript)
// As our intention is to test an Angular component that contains annotations
// we need to include the reflect-metadata dependency.
import 'reflect-metadata'

// A sample Jasmine test
describe('A suite', function () {
  it('contains spec with an expectation', function () {
    expect(true).toBe(true)
  })
})
```

```javascript
var mainViewModel = require('../main-view-model') //Require the main view model to expose the functionality inside it.

describe('Hello World Sample Test:', function () {
  it('Counter should be 42 on start.', function () {
    assert.equal(mainViewModel.createViewModel().counter, 42) //Assert that the counter equals 42.
  })
  it('Message should be "42 taps left" on start.', function () {
    assert.equal(mainViewModel.createViewModel().message, '42 taps left') //Assert that the message is "42 taps left".
  })
})
```

```javascript
var mainViewModel = require('../main-view-model') //Require the main view model to expose the functionality inside it.

QUnit.test('Hello World Sample Test:', function (assert) {
  assert.equal(
    mainViewModel.createViewModel().counter,
    42,
    'Counter, 42; equal succeeds.'
  ) //Assert that the counter equals 42.
  assert.equal(
    mainViewModel.createViewModel().message,
    '42 taps left',
    'Message, 42 taps left; equal succeeds.'
  ) //Assert that the message is "42 taps left".
})
```

#### Angular TestBed Integration

To use TestBed you have to alter your `karma.conf.js` to:

```
    // list of files / patterns to load in the browser
    files: [
      'src/tests/setup.ts',
      'src/tests/**/*.spec.ts'
    ],

```

The file `src/tests/setup.ts` should look like this for jasmine:

```typescript
import '@nativescript/angular/zone-js/testing.jasmine'
import { nsTestBedInit } from '@nativescript/angular/testing'
nsTestBedInit()
```

or if using mocha:

```typescript
import '@nativescript/angular/zone-js/testing.mocha'
import { nsTestBedInit } from '@nativescript/angular'
nsTestBedInit()
```

Then you can use it within the spec files, e.g. `example.spec.ts`:

```typescript
import { Component, ElementRef, NgZone, Renderer2 } from '@angular/core'
import { ComponentFixture, async } from '@angular/core/testing'
import { StackLayout } from '@nativescript/core'
import {
  nsTestBedAfterEach,
  nsTestBedBeforeEach,
  nsTestBedRender
} from '@nativescript/angular'

@Component({
  template: `<StackLayout><Label text="Layout"></Label></StackLayout>`
})
export class ZonedRenderer {
  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}
}

describe('Renderer E2E', () => {
  beforeEach(nsTestBedBeforeEach([ZonedRenderer]))
  afterEach(nsTestBedAfterEach(false))
  afterAll(() => {})

  it('executes events inside NgZone when listen is called outside NgZone', async(() => {
    const eventName = 'someEvent'
    const view = new StackLayout()
    const eventArg = { eventName, object: view }
    const callback = arg => {
      expect(arg).toEqual(eventArg)
      expect(NgZone.isInAngularZone()).toBeTruthy()
    }
    nsTestBedRender(ZonedRenderer).then((fixture: ComponentFixture<ZonedRenderer>) => {
      fixture.ngZone.runOutsideAngular(() => {
        fixture.componentInstance.renderer.listen(view, eventName, callback)

        view.notify(eventArg)
      })
    })
  }))
})
```

#### Run Your Tests

After you have completed your test suite, you can run it on physical devices or in the native emulators.

#### Requirements

Before running your tests, verify that your development machine and your testing devices meet the following prerequisites.

- The Android native emulators on which you want to run your tests must be running on your development machine. To verify that your machine recognizes the devices, run the following command.

  ```shell
  ns device
  ```

- The physical devices on which you want to run your tests must be connected to your development machine. To verify that your machine recognizes the devices, run the following command.

  ```shell
  ns device
  ```

- The physical devices on which you want to run your tests must be able to resolve the IP of your development machine. To verify that the device can access the Karma server, connect the device and the development machine to the same Wi-Fi network or establish USB or Bluetooth tethering between the device and the development machine.
- Port 9876 must be allowed on your development machine. The Karma server uses this port to communicate with the testing device.

#### Execute the Tests

To execute your test suite on any connected Android devices or running Android emulators, run the following command.

```shell
ns test android
```

To execute your test suite on connected iOS devices, run the following command.

```shell
ns test ios
```

To execute your test suite in the iOS Simulator, run the following command.

```shell
ns test ios --emulator
```

To execute your test suite in CI make sure to add `--justlaunch`. This parameter will exit the simulator.

```shell
ns test ios --emulator --justlaunch
```

Each execution of `$ ns test` consists of the following steps, performed automatically.

1. The CLI starts a Karma server on the development machine.
1. The CLI prepares, builds and deploys your project, if not already deployed. If already deployed, the CLI synchronizes changes to the application package.
1. The CLI embeds the NativeScript unit test runner and your host network and Karma configuration in the deployed package.
1. The CLI launches the main module of the NativeScript unit test runner instead of launching the main module of your app.
1. The NativeScript unit test runner uses the embedded network configuration to try to connect to the Karma server on the development machine.
1. When the connection between the NativeScript unit test runner and the Karma server is established, the test runner begins the execution of the unit tests.
1. When the execution completes, the NativeScript unit test runner reports the results to the Karma server.
1. The Karma server reports the results on the command line.

#### Re-Run Tests on Code Change

The NativeScript can continuously monitor your code for changes and when such changes occur, it can deploy those changes to your testing devices and re-run your tests.

To enable this behavior, run your `$ ns test` command with the `--watch` flag. For example:

```shell
ns test android --watch
ns test ios --watch
ns test ios --emulator --watch
```

The NativeScript CLI remains active and re-runs tests on code change. To unlock the console, press `Ctrl+C` to stop the process.

#### Configure the Karma Server

When you configure your project for unit testing, the NativeScript CLI adds `karma.conf.js` to the root of your project. This file contains the default configuration of the Karma server, including default port and selected testing framework. You can edit this file to customize your Karma server.

When you modify `karma.conf.js`, make sure that your changes meet the specification of the [Karma Configuration File](http://karma-runner.github.io/1.0/intro/configuration.html).

#### Continuous Integration

To integrate the NativeScript unit test runner into a continuous integration process, you need to configure a Karma reporter, for example, the [JUnit reporter](https://github.com/karma-runner/karma-junit-reporter).

## Using packages

## Updating

To upgrade a NativeScript application you need to upgrade several things: NativeScript CLI Tooling, the iOS and Android runtimes and the `@nativescript/core` module. In the steps below you will see how to do this.

#### Upgrading the NativeScript tools

The below command demonstrates how to upgrade your NativeScript tools known also as NativeScript CLI.
You should first upgrade your `ns` (or `nativescript`) command, so go to a command prompt or bash/terminal prompt and type:

```
npm install -g nativescript
```

This will automatically download needed files and will update your computer to the latest version of the NativeScript command line.
You can type `ns --version` to verify that the new version is installed.

#### Migrate an existing project to {N} 6.0

To migrate an existing NativeScript project to 6.0, you need just to run:

```node
ns migrate
```

This command will perform all the required updates of packages and changes in the project that are required to adjust a 6.0 project with the latest requirements.

> Note: The migrate command will update {N} core packages and the below-listed plugins to their 6.0 compatible version:

```
 node-sass
 typescript
 less
 nativescript-dev-sass
 nativescript-dev-typescript
 nativescript-dev-less
 nativescript-camera
 nativescript-geolocation
 nativescript-imagepicker
 nativescript-social-share
 nativescript-ui-chart
 nativescript-ui-dataform
 nativescript-ui-gauge
 nativescript-ui-listview
 nativescript-ui-sidedrawer
 nativescript-ui-calendar
 nativescript-ui-autocomplete
 nativescript-datetimepicker
 kinvey-nativescript-sdk
 nativescript-plugin-firebase
 nativescript-vue
 nativescript-permissions
 nativescript-cardview
```

> Note: As soon as you find a problem with the core dependencies - please open an issue in the respective GitHub repository. If unsure, you can open it in the [nativescript/nativescript](https://github.com/nativescript/nativescript/issues) repository. If the problem is related to some of the external plugins, please contact the author by opening a new issue in the plugin's repository.

#### Upgrading the application

You should execute the **update** command in the root folder of your project to upgrade it with the latest versions of iOS/Android runtimes and cross-platform modules.

> The **update** command is introduced in version 2.4 of NativeScript CLI. You should update NativeScript CLI before using this command.

```node
ns update
```

In order to get the latest development release instead, pass **next** as argument:

```node
ns update next
```

You can also switch to specific version by passing it to the command:

```node
ns update 8.0.0
```

::: tip Note
The command `ns update` is updating the `@nativescript/core, `@nativescript/webpack`, and the runtimes (`@nativescript/android`and`@nativescript/ios`). The command is combining the next three commands in this article (`ns platform add`, `npm i @nativescript/core`and`npm i @nativescript/webpack --save-dev`).

After updating the `@nativescript/webpack`, we must update our `webpack.config.js` as well. To do that we can execute the `update-ns-webpack` automated script with the following line:

```node
./node_modules/.bin/update-ns-webpack --deps --configs
```

:::

::: warning Important
When using the `--configs` flag, any previous configuration will be overwritten and lost. Consider saving any custom code that you have introduced in your `webpack.config.js` and reapplying the code after using the `--configs` flag.
:::

#### Upgrading platforms

Follow those steps in order to get the latest versions of Android and/or iOS runtimes. Navigate to the root level folder where your project is, and then if you are working on a Android project, type:

```
ns platform remove android
ns platform add android
```

and/or (if you are working on a iOS version on a Mac):

```
ns platform remove ios
ns platform add ios
```

#### Upgrading @nativescript/core

The cross-platform modules are available as a npm package named [@nativescript/core](https://www.npmjs.com/package/@nativescript/core).

In order to use them in your project, you will have to explicitly install the package, for example (assuming you are still in your main app project folder from the steps above):

```
npm install @nativescript/core@latest --save
```

This installs the **@nativescript/core** package to the node_modules folder and adds it as a dependency to the package.json of the project.

::: warning Important
The `ns create` command will create a new project, add the **@nativescript/core** package as a dependency to its package.json and install it. So each new project you create will have the **@nativescript/core** package installed and you do not have to install it explicitly.
:::

Another place to find **@nativescript/core** package is [NativeScript Releases](https://github.com/NativeScript/NativeScript/releases/), where you can find a collection of the available @nativescript/core-\*.tgz packages for every release. You can download a selected release and install it by running: `npm install <path to @nativescript/core-*.tgz> --save`.

#### Upgrading Webpack

The Webpack plugin is available as a npm package named [@nativescript/webpack](https://www.npmjs.com/package/@nativescript/webpack). To use the plugin in your project, you should explicitly install the package as `devDependency`.The initial installation of the plugin will install all related development dependencies and will create the default `webpack.config.js` file. If the `webpack.config.js` file is already existing it won't be overwritten by the installation of `@nativescript/webpack`.

```node
npm i @nativescript/webpack --save-dev
```

::: tip Note
From NativeScript 6.0, all project should be webpack compatible.
:::

#### Updating Webpack version and configuration

When upgrading an existing version of the Webpack plugin, you should consider that the related development dependencies also have to be updated accordingly. To ease the process, the plugin provides an automated script for that purpose called `update-ns-webpack` located in `<project-folder>/node_modules/.bin` folder. The script comes with two flags:

- `--deps` - this flag will update all related development dependencies.
- `--configs` - this flag will update the default `webpack.config.js` file.

```node
npm i @nativescript/webpack@latest --save-dev
./node_modules/.bin/update-ns-webpack --deps --configs
```

::: tip Important
When using the `--configs` flag, any previous configuration will be overwritten and lost. Consider saving any custom code that you have introduced in your `webpack.config.js` and reapplying the code after using the `--configs` flag.
:::

#### Upgrading Angular dependencies

The Angular plugin is available as an npm package named [@nativescript/angular](https://www.npmjs.com/package/@nativescript/angular). To update the version of the plugin and the related dependency, the package should be explicitly installed, and the related Angular dependencies should be updated accordingly. To ease the update process, the plugin comes with an automated script `update-app-ng-deps` located in `<project-folder/node_modules/.bin>` folder.

```
npm i @nativescript/angular@latest --save
./node_modules/.bin/update-app-ng-deps
npm i
```

---

title: Running Latest Code
description: NativeScript Documentation - Running Latest Code
position: 40
slug: latest-code
previous_url: /running-latest

---

#### Running the Latest Code

Often when working with open-source projects, one needs functionality that has not yet passed the full release cycle, or even functionality that is not yet fully implemented. We know that many of you are experimenters and want to try the latest and greatest features of NativeScript. That is why we tried to make this process simple and easy to follow. There are two ways to get the latest development code for NativeScript:

- You can get it via npm.
- You can build the source code.

#### Getting the latest development version via npm

As an open-source project NativeScript keeps not only its source code but its build infrastructure open. That is why we choose [Travis CI](https://travis-ci.org/) for our nightly builds. Every commit in the master branch of all major NativeScript repos triggers a [Travis CI](https://travis-ci.org/) build which publishes an npm package that can be used directly. Follow those simple steps to get the latest development version of NativeScript:

- Uninstall any existing NativeScript versions:

```shell
npm uninstall -g nativescript
```

- Install the latest development version of NativeScript CLI:

```shell
npm install -g nativescript@next
```

- Edit the package.json file in your project and replace @nativescript/core, tns-android and tns-ios versions with `next`:

```json
{
  "description": "NativeScript Application",
  "dependencies": {
    "@nativescript/core": "next"
  },
  "devDependencies": {
    "@nativescript/android": "next",
    "@nativescript/ios": "next"
  }
}
```

Instead of editing the package.json file by hand, you could run the following commands:

```shell
tns platform add ios@next
tns platform add android@next
tns plugin add @nativescript/core@next
```

- Run the `npm install` command to update the node modules:

```shell
cd <your-project-folder>
npm install
```

You are now ready to use the latest development version of NativeScript.

#### Building the source code

##### Reasoning

Building the source code is essential when one wants to contribute to an open source project. The statement is applicable for NativeScript as well. According to the [Contribution Guidelines](https://github.com/NativeScript/NativeScript/blob/master/CONTRIBUTING.md), suggesting a fix involves testing the latest code.

#### Behind the curtains of running a NativeScript application

1. `npm install nativescript -g` : Node Package Manager (npm) downloads and installs the [NativeScript CLI](https://www.npmjs.com/package/nativescript).
2. `ns create [AppName]` : The NativeScript CLI downloads the [Hello-World template](https://www.npmjs.com/package/tns-template-hello-world) and unpacks it to a folder named after the app name you choose. At the same time, the CLI installs the [NativeScript cross-platform modules](https://www.npmjs.com/package/@nativescript/core). As a result, your application folder now contains an `app` folder, holding the files of your application ([source code](https://github.com/NativeScript/template-hello-world)) and a `node_modules` folder, having the cross-platform modules ([source code](https://github.com/NativeScript/NativeScript)).
3. `ns platform add android/ios` : The NativeScript CLI downloads the latest SemVer-compatible version of the specified runtime, unpacks it and applies transformations to the native (Android Studio or xCode) project (e.g., changes the project name).
4. `ns run android/ios` : The NativeScript CLI copies the files under the `app` folder to the `platforms/[android/ios]/.../app` folder following a specific logic so that these get used later by a native build tool (_gradle_/_xcode-build_). As a next step, the NativeScript CLI executes compilation, deployment and run commands of _gradle_ or _xcode-build_.
5. Any JavaScript code gets executed in a V8 or JavaScriptCore engine and embedded in the NativeScript runtimes. Each call to an actual native object gets marshalled via the runtimes to the underlying platform and vice-versa. The runtimes provide JavaScript handles to the native objects.

#### Contents of the NativeScript repo

The [NativeScript framework](https://github.com/NativeScript/NativeScript) is built using TypeScript. For that, one of the build steps is TypeScript compilation, which uses TypeScript declarations of the underlying native objects. These are really large files ([android17.d.ts](https://github.com/NativeScript/NativeScript/blob/master/android17.d.ts) and [ios.d.ts](https://github.com/NativeScript/NativeScript/blob/master/ios.d.ts)). The TypeScript compilation with these two files loaded in memory takes a lot of time. To save development time and have as quick and stable feature output, the NativeScript team decided to keep several important applications inside the same repository so that all of them get compiled in a single pass.

Having said that, each subfolder of the [apps](https://github.com/NativeScript/NativeScript/tree/master/apps) subfolder of the repo represents a single application.

#### Building the repo

When the repo gets built, it outputs a bunch of packages (stripping the version- and extension- part of the filename for clarity):

- @nativescript/core : the package, containing the core modules. It gets distributed via [npm](https://www.npmjs.com/package/@nativescript/core).
- tns-sample-\* : contains some test/demo applications the team uses internally for testing.
- tns-template-\* : has templates that will get used once we have the [template-selection functionality](https://github.com/NativeScript/nativescript-cli/issues/374) implemented in the command-line interface.

The repo gets built via the commands:

```shell
npm install -g grunt-cli
npm install
grunt
```

#### Using the latest

To use the latest:

- Build the repo.
- Navigate to your project folder.
- Delete the `@nativescript/core` folder from the `node_modules` subfolder of your project (i.e., `rm -rf node_modules/@nativescript/core` for Linux or `rd /S /Q node_modules\@nativescript/core`).
- Install the newly built package (`npm install [PATH-TO-NATIVESCRIPT-REPO/bin/dist/nativescript-core-x.x.x.tgz]`).

#### Handling internal breaking changes

It is possible that an internal breaking change gets introduced involving an update to both the runtimes and the modules. An internal breaking change would mean that the public API of the tns_modules does not get affected, but a work in progress change in the runtimes requires a change in the internal code of the tns_modules themselves.

When such a case happens, the [ios](https://github.com/NativeScript/ns-v8ios-runtime) and [android](https://github.com/NativeScript/android-runtime) runtimes must be built separately and updated via the CLI command of:
`tns platform update android/ios --frameworkPath=[Path-to-Runtime-Package]`

#### Building the runtimes

As the NativeScript framework gets distributed via npm, the runtimes are also packed as npm packages. For consistency reasons, the native builds (gradle/xcode-build) are wrapped by grunt builds that do the job.

#### Building the Android runtime

The [android runtime](https://github.com/NativeScript/android-runtime) depends on the [android-metadata-generator](https://github.com/NativeScript/android-metadata-generator).

Provided you have all the dependencies set, the easiest way to have the Android runtime built is to clone the two repos to a single folder so that the two are sibling folders, `cd` into the `android-runtime` folder and run:

```
gradle packar -PwidgetsPath=./widgets.jar
```

The resulting tns-android-x.x.x.tgz package will get created in the `dist` folder.

#### Building the iOS runtime

Follow the instructions on setting up the dependencies for building the [ios runtime](https://github.com/NativeScript/ns-v8ios-runtime) in the repository README and then run `grunt package`.

The build tns-ios-x.x.x.tgx package will get created in the `dist` folder.

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
