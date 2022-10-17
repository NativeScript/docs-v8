---
title: CLI Basics
---

## CLI Basics

The development workflow starts with the [NativeScript CLI](https://www.npmjs.com/package/nativescript).

In this article, you’re going to learn the basics of the NativeScript command-line interface, including how to create new apps, how to get those apps running on devices, and how to set up a development workflow that lets you iterate fast.

### `create`

Open your terminal and run the following command to create a new NativeScript application:

```cli
ns create
```

The NS CLI will walk you through selecting a template using interactive prompts.

You can also use the `--template` flag with the `ns create` command to target a specific template

```cli
ns create HelloWorld --template @nativescript/template-hello-world-ts
```

Here you’re passing two things to the `create` command: `HelloWorld` which determines the name of the app you are creating, and the `--template` option, which tells the NativeScript CLI to scaffold an app using a predefined template named “@nativescript/template-hello-world-ts” found [here](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-hello-world-ts)

For a full list of the templates you can use, see the [full list here](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages)

The `create` command will take a minute to complete, as the NativeScript CLI needs to download a few dependencies while setting up your new app.

### `clean`

This command will clean your NativeScript project. It will delete the `node_modules`, `hooks`, and `platforms` directories from your project. These directories sometime need a clean slate during development of native applications. It is similar to running "Clean Build Folder" in XCode or other IDE environments.

```cli
ns clean
```

If you're having trouble running your application or you have added new dependencies, it's usually a good practice to start with `ns clean` before running to be sure you avoid any type of dependency issues or native project build issues.

### `run`

Runs your project on all connected devices or in native emulators for the selected platform. The command will prepare, build and deploy the app when necessary. By default listens for changes in your code, synchronizes those changes and refreshes all selected devices.

```cli
ns run android
```

Launches the app on a connected Android device or Android emulator.

::: warning Note
If you get an error at this point you might not have completed the full NativeScript CLI setup.

You must have at least one AVD (Android Virtual Device) configured on your development machine for this command to run your app up on an Android emulator.
Or a connected Android device with debugging enabled.

Check the `devDependencies` of your `package.json` file. `@nativescript/android` must be installed to avoid the "[Unable to apply changes on device: emulator-5554. Error is: Invalid Version: null.](https://github.com/NativeScript/nativescript-cli/issues/4451)" error.
:::

```cli
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

::: tip Note
If you see this output in the terminal:

```
Webpack compilation complete. Watching for file changes.
Watchpack Error (watcher): Error: EMFILE: too many open files 'FILE_PATH'
Watchpack Error (watcher): Error: EMFILE: too many open files 'FILE_PATH'
Watchpack Error (watcher): Error: EMFILE: too many open files 'FILE_PATH' <-- This repeats many times
```

This is related to node configuration options on your machine.

**Solution**:

Try adding this to your `~/.bash_profile` if you have one or `~/.zshenv` if using Zsh:

```
export NODE_OPTIONS="--max-old-space-size=6096"
```

Then open a new terminal window and run your app.
:::

### `debug`

The `debug` command builds and deploys a new package on a connected device or emulator. By default, it also starts to track for changes the `app` folder, meaning that it will automatically livesync changes in code as soon as they are saved. In order to apply the changes, the CLI will automatically restart the application after each sync.

::: tip Note
Changes inside `App_Resources` folder (e.g. `AndroidManifest.xml`, `Info.plist` or any of the resources folders) trigger a rebuild after which live syncing is resumed.
:::

For security reasons, the debugging agent **can't be started automatically** from the command-line. That's why NativeScript CLI generates a URL which is printed on the screen instead. **You need to manually copy it in Google Chrome's address bar to start debugging.**

To start the debugger for Android, run the following command:

```cli
ns debug android
```

To start the debugger for iOS, run the following command:

```cli
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

```cli
ns help
```
