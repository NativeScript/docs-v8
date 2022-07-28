---
title: Project Structure
---

## Project Structure

The default structure of a blank NativeScript Core project consists of a root folder that contains the **app**, **platforms** and **node_modules** directories, and a **package.json** configuration file.

```json
myApplication/
└── app
    ├── App_Resources
    └── ...
├── node_modules
├── platforms
└── package.json
```

There are several other directories and configuration files that can be present in your project depending on the initial template, the programming language (`JavaScript` or `TypeScript`), `Javascript` flavour(for example Vuejs) or the plugins that you are using in your application. This article covers the files and folders that are always present in a `NativeScript` project, as well as some of the more common ones that you may encounter while developing your app.

### app directory

The app directory in the root of the project is the development space for your project. Place all your common and platform-specific code in this directory. When the app is prepared for a build, the NativeScript tooling copies relevant content to the platform-specific folders for each target platform.

In the **app** directory, you can use platform-specific files to provide customized functionality and design for each target platform. To indicate that a file is platform-specific, make sure that the file name is in the following format: `name.ios.extension` or `name.android.extension`. For example: `main.ios.js` or `main.android.js`.

You can develop shared functionality or design in common files. To indicate that a file is common, make sure that the file name does not contain a `.android.` or `.ios.` string.

In the **app** folder, you will also find the **App_Resources** directory.

::: tip Note
The location of the app directory can be overridden in the nsconfig.json file.
:::

### app/package.json

This is a secondary package.json file in which you can specify the entry point file of the app and to configure the behavior of the NativeScript runtimes. Below is an example of a basic secondary `package.json` file.

```json
{
  "main": "app.js",
  "discardUncaughtJsExceptions": true,
  "android": {
    "v8Flags": "--expose_gc",
    "forceLog": true
  },
  "ios": {
    "jscFlags": "--dumpOptions=2 --validateOptions=1"
  }
}
```

### app/App_Resources

### The platforms Directory

The `platforms` directory is created when you start a build by running the `ns run`,`ns build`, or `ns debug` or add a target platform(by running `ns platform add ios` or `ns platform add android`) to your project. The NativeScript tooling creates a new subdirectory with the respective platform name. These subdirectories have the platform-specific project structure required for native development with the native SDKs of the platform. When the project is prepared for build, the NativeScript tooling copies relevant content from the [app](#app-directory) directory to the platform-specific subdirectory for each target platform.

::: tip IMPORTANT:
Avoid editing files located in the platforms subdirectories because the NativeScript CLI overrides them with the content of the app directory during the prepare process.
:::

### The root package.json

The main `package.json`, which is located in the root directory of the project, contains details about the application, its dependencies and other helpful information. You can set common npm package.json properties like author, description and version, or specify the npm packages and NativeScript plugins on which your app depends by modifying the dependencies and devDependencies attributes.

The root `package.json` also contains several NativeScript-specific properties which are placed inside the nativescript object:

- **id** - Specifies the unique application identifier (App ID) of the app. To be able to build for both Android and iOS, your App ID must be unique and contain two or more strings, separated by a dot. Each string must start with a letter and should contain only letters and numbers. The app identifier must not start with an uppercase letter. For more information about the App ID and how to specify different identifiers for iOS and Android, see What is App identifier.
- `ns-android.version` - Specifies the version of the Android runtime. If the property is missing, the latest version of the runtime will be added on the first run or build for Android.
- `ns-ios.version` - Specifies the version of the iOS runtime. If the property is missing, the latest version of the runtime will be added on the first run or build for iOS.
  Here is an example of a basic main `package.json` file:

```json
{
  "description": "My NativeScript Application",
  "license": "MIT",
  "repository": "https://github.com/myApplication",
  "dependencies": {
    "@nativescript/core": "~7.0.0",
    "@nativescript/theme": "~3.0.0"
  },
  "devDependencies": {
    "@nativescript/webpack": "~3.0.0"
  },
  "readme": "My NativeScript Application"
}
```

### The hooks Directory

The `hooks` folder exists only when the project depends on plugins that require a hook to function properly. Hooks are executable pieces of code or Node.js scripts that are used to alter or augment the behavior of an extendable NativeScript CLI command. For more information about hooks and how to use them in NativeScript, see [Extending the CLI](https://github.com/NativeScript/nativescript-cli/blob/master/extending-cli.md).

### The nsconfig.json File

The `nsconfig.json` is an optional configuration file, located at the root project directory on the same level as the main `package.json` file. This file makes it possible for users to modify the structure of their application. The available configurations are `appPath`, `appResourcesPath`, `overridePods` and `webpackConfigPath`.

The paths (`appPath`, `appResourcesPath`, `webpackConfigPath`) must be relative to the project root (where the `package.json` file and [platforms](#the-platforms-directory) directory are located) in order for everything to work as expected. If `appPath` is omitted, the CLI will assume the application files are located inside a folder called app inside the project folder. If `appResourcesPath` is omitted, the CLI will assume that they are at their default location - a folder called `App_Resources` inside the folder containing the rest of the app files. The `webpackConfigPath` option allows you to specify the location of your webpack configuration file. If the value is not set, the CLI will use `webpack.config.js` file located at the root of the application. More information for `webpackConfigPath` option is available in custom webpack configuration article. The `overridePods` option tells the CLI to use the Cocoapods defined in the project's `Podfile` (inside `App_Resources/iOS/Podfile`) as a resolution in case plugins try to use different versions of the same pod. For example, in case plugin A wants to use version 2.7 of `AFNetworking` pod and another plugin wants version 3.0 of the same pod, the build operation will fail. In this case, you can set the `overridePods` to `true` in your `nsconfig.json` and set version of the `AFNetworking` in your `App_Resources/iOS/Podfile`. CLI will use only this version of the pod and will omit the occurences from the plugins. All other pods from plugins will still be included in the application.
