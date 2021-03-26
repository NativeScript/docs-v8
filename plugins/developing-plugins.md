---
title: Developing Plugins
---

Plugin development deserves it's own section as well!

- [REFERENCE] https://github.com/NativeScript/docs/tree/master/docs/plugins

## Plugin Reference

### What Are NativeScript Plugins

A NativeScript plugin is any npm package, published or not, that exposes a native API via JavaScript and consists of the following elements.

- A `package.json` file which contains the following metadata: name, version, supported runtime versions, dependencies and others.
- One or more CommonJS modules that expose a native API via a unified JavaScript API. For more information about Common JS modules, see the [CommonJS Wiki](http://wiki.commonjs.org/wiki/CommonJS).
- (Optional) Descriptions of permissions, features or other configurations required or used by your plugin inside a pre-compiled Android native library containing an `AndroidManifest.xml` or an `Info.plist` file for Android and iOS, respectively.
- (Optional) Native Android libraries and the native Android `include.gradle` configuration file which describes the native dependencies.
- (Optional) Native iOS libraries and the native `build.xcconfig` configuration file which describes the native dependencies.

The plugin must have the directory structure, described in the [Directory Structure](#directory-structure) section.

### Create a Plugin

If the NativeScript framework does not expose a native API that you need, you can develop a plugin which exposes the required functionality. When you develop a NativeScript plugin, keep in mind the following requirements.

- The plugin must be a valid npm package.
- The plugin must expose a built-in native API or a native API available via custom native libraries.
- The plugin must be written in JavaScript and must comply with the CommonJS specification. If you are using a transpiler (e.g. from TypeScript), make sure to include the transpiled JavaScript files in your plugin.
- The plugin directory structure must comply with the specification described below.
- The plugin must contain a valid `package.json` which complies with the specification described below.
- If the plugin requires any permissions, features or other configuration specifics, it must contain an `Info.plist` for iOS or a compiled library with an `AndroidManifest.xml` file for Android which describe them. For more information about Android native libraries, see the [Android permissions and resources](#android-permissions-and-resources) section.
- If the plugin depends on other native libraries, it must contain a valid `include.gradle` or `build.xcconfig` file, which describes the dependencies.

#### Directory Structure

NativeScript plugins which consist of one CommonJS module might have the following directory structure.

```text
nativescript-my-plugin/
└── src
    ├── index.js
    ├── package.json
    └── platforms/
        ├── android/
        │   └── nativescript-my-plugin.aar (containing custom resources or permissions)
        └── ios/
            └── Info.plist
```

NativeScript plugins which consist of multiple CommonJS modules might have the following directory structure.

```text
nativescript-my-plugin/
└── src
    ├── index.js
    ├── package.json
    ├── MyModule1/
    │   ├── index1.js
    │   └── package.json
    ├── MyModule2/
    │   ├── index2.js
    │   └── package.json
    └── platforms/
        ├── android/
        │   └── nativescript-my-plugin.aar (containing custom resources or permissions)
        └── ios/
            └── Info.plist
```

- `src`: Putting your source in sub-folder is required for local LiveSync debugging. Older plugins should be updated to move their source code in to a subfolder.
- `index.js`: This file is the CommonJS module which exposes the native API. You can use platform-specific `*.[platform].js` files. For example: `index.ios.js` and `index.android.js`. During the plugin installation, the NativeScript CLI will copy the platform resources to the `tns_modules` subdirectory in the correct platform destination in the `platforms` directory of your project.<br/>Alternatively, you can give any name to this CommonJS module. In this case, however, you need to point to this file by setting the `main` key in the `package.json` for the plugin. For more information, see [Folders as Modules](https://nodejs.org/api/modules.html#modules_folders_as_modules).
- `package.json`: This file contains the metadata for your plugin. It sets the supported runtimes, the plugin name and version and any dependencies. The `package.json` specification is described in detail below.
- `platforms/android/native-library.aar` Compiled native libraries (`*.aar` files) contain resources, code and any specific configuration changes, like permissions, required for your plugin to work. For more information about Android native libraries, see the [Android permissions and resources](#android-permissions-and-resources) section.
- `platforms\ios\Info.plist`: This file describes any specific configuration changes required for your plugin to work. For example, required permissions. To your convenience, all configurations that are applicable via XCode Info tab and are saved in application's Info.plist file can also be applied manually for plugins directly in the Info.plist. For more information about the format of `Info.plist`, see [About Information Property List Files](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html).<br/>During the plugin installation, the NativeScript CLI will merge the plugin `Info.plist` with the `Info.plist` for your project. The NativeScript CLI will not resolve any contradicting or duplicate entries during the merge. After the plugin is installed, you need to manually resolve such issues.

NativeScript plugins which contain both native Android and iOS libraries might have the following directory structure.

```text
nativescript-my-plugin/
└── src
    ├── ...
    └── platforms/
        ├── android/
        │   ├── MyLibraryOne.jar
        │   ├── MyLibraryTwo.aar
        │   ├── include.gradle
        └── ios/
            ├── MyiOSFramework.framework
            ├── build.xcconfig
            ├── Podfile
            ├── Info.plist
            ├── MyStaticiOSLibrary.a
            └── include/
                └── MyStaticiOSLibrary/
                    └── ...
```

- `platforms\android`: This directory contains any native Android libraries packaged as `*.jar` and `*.aar` packages. These native libraries can reside in the root of this directory or in a user-created sub-directory. During the plugin installation, the NativeScript CLI will configure the Android project in `platforms\android` to work with the plugin.
- `platforms\android\include.gradle`: This file modifies the native Android configuration of your NativeScript project such as native dependencies, build types and configurations.
- `platforms\ios`: This directory contains native dynamic iOS Cocoa Touch Frameworks (`.framework`) and Cocoa Touch Static Libraries (`.a`). During the plugin installation, the NativeScript CLI will copy these files to `lib\iOS` in your project and will configure the iOS project in `platforms\ios` to work with the libraries. If the library is written in Swift, only APIs exposed to Objective-C are exposed to NativeScript. In case the plugin contains a Cocoa Touch Static Library (`.a`), you must place all public headers (`.h`) under `include\<Static Library Name>\`. Make sure that the static libraries are built at least for the following processor architectures - armv7, arm64, i386.
- `platforms\ios\build.xcconfig`: This file modifies the native iOS configuration of your NativeScript project such as native dependencies and configurations.
- `platforms\ios\Podfile`: This file describes the dependency to the library that you want to use. For more information, see [the CocoaPods article](#cocoapods).

#### Package.json Specification

Every NativeScript plugin should contain a valid `package.json` file in its root. This `package.json` file must meet the following requirements.

- It must comply with the [npm specification](https://docs.npmjs.com/files/package.json).<br/>The `package.json` must contain at least `name` and `version` pairs. You will later use the plugin in your code by requiring it by its `name`.
- It must contain a `nativescript` section which describes the supported NativeScript runtimes and their versions. This section can be empty. If you want to define supported platforms and runtimes, you can nest a `platforms` section. In this `platforms` section, you can nest `ios` and `android` key-value pairs. The values in these pairs must be valid runtime versions or ranges of values specified by a valid semver(7) syntax.
- If the plugin depends on other npm modules, it must contain a `dependencies` section as described [here](https://docs.npmjs.com/files/package.json#dependencies).<br/>The NativeScript CLI will resolve the dependencies during the plugin installation.

The following is an example of a `package.json` file for a NativeScript plugin which supports the 1.0.0 version or above of the iOS runtime and the 1.1.0 version or above of the Android runtime.

```JSON
{
  "name": "nativescript-my-plugin",
  "version": "0.0.1",
  "nativescript": {
    "platforms": {
      "ios": "4.0.0",
      "android": "4.1.0"
    }
  }
}
```

The above configuration states that the plugin requires iOS runtime version 4.0.0 and up or Android runtime version 4.1.0 and up.

> **Note** In case your plugin supports only iOS or Android, make sure to remove the platform which is not supported.

#### Include.gradle Specification

Every NativeScript plugin, which contains native Android dependencies, should also contain a valid `include.gradle` file in the root of its `platforms\android` directory. This `include.gradle` file must meet the following requirements.

- It must contain its own [configuration](http://developer.android.com/tools/building/configuring-gradle.html).
- It might contain native dependencies required to build the plugin properly.
- Any native dependencies should be available in [jcenter](https://bintray.com/bintray/jcenter) or from the Android SDK installed on your machine.

> **IMPORTANT:** If you don't have an `include.gradle` file, at build time, gradle will create a default one containing all default elements.

_Include.gradle Example_

```gradle
//default elements
android {
  productFlavors {
    "nativescript-my-plugin" {
      dimension "nativescript-my-plugin"
    }
  }
}

//optional elements
dependencies {
    implementation "groupName:pluginName:ver"
}
```

#### Android permissions and resources

There are two ways to add permissions and resources for your plugin.

##### Using a native Android project

If you want your plugin to use special permissions, have custom resources or just want to write some native Java code to be accessed later from the JavaScript/Typescript implementation, you should create a native Android project for your plugin, compile it to an `.aar` file and put it in the `src/platforms/android` directory of the plugin package. The easiest way to do this is using Android Studio. The project can contain the following files:

- project/src/main/`AndroidManifest.xml`: This file describes any specific configuration changes required for your plugin to work. For example: required permissions. For more information about the format of `AndroidManifest.xml`, see [App Manifest](http://developer.android.com/guide/topics/manifest/manifest-intro.html).
- project/src/main/`res`: (Optional) This directory contains resources declared by the `AndroidManifest.xml` file. You can look at its structure [here](http://developer.android.com/guide/topics/resources/providing-resources.html#ResourceTypes).
- project/src/main/`java`: (Optional) This directory contains Java code sources.

For a more complete Android library project overview visit the [Android Documentation](https://developer.android.com/studio/projects/#ProjectView).

##### Using the NativeScript CLI plugin complier

In previous versions of the the NativeScript CLI it was possible to add permissions and resources for Android without a separate native library (`.aar` file). If you have an older plugin and your `AndroidManifest.xml` file and `res` directory are located in `platforms/android`, then you can compile them with a CLI command. Open a terminal, go to the `src` directory of the plugin and execute:

```bash
ns plugin build
```

This will create an `.aar` file in the `platforms/android` directory, which will contain the compiled manifest and resources and should be included in the plugin package instead of them. If you keep `AndroidManifest.xml` and `res` resources in your package, the NativeScript will internally run the `tns plugin build` command when it builds the native application, which will slow down the process for all users of your plugin. This is why the recommended approach is to have an `.aar` library in the `platforms/android` directory of the plugin package instead of plain manifest xml and resource files.

#### Build.xcconfig Specification

Every NativeScript plugin, which contains native iOS dependencies, can also contain a [valid](https://pewpewthespells.com/blog/xcconfig_guide.html) `build.xcconfig` file in the root of its `platforms\ios` directory. This `build.xcconfig` file might contain native dependencies required to build the plugin properly.

_Build.xcconfig Example_

```xcconfig
OTHER_LDFLAGS = $(inherited) -framework "QuartzCore" -l"sqlite3"
```

#### Metadata filtering usage specifications

Application author can opt-in for native metadata filtering. Plugins should supply their metadata filtering rules in `platforms/android/native-api-usage.json` and `platforms/ios/native-api-usage.json` files respectively. For more detailed description of this feature read [this article]({% slug metadata%})

### Install a Plugin

To install a plugin for your project, inside your project, run the following command.

```Shell
ns plugin add <Plugin>
```

#### Valid Plugin Sources

You can specify a plugin by name in the npm registry, local path or URL. The following are valid values for the `<Plugin>` attribute.

- A `<Name>` or `<Name>@<Version>` for plugins published in the npm registry.
- A `<Local Path>` to the directory which contains the plugin source files and its `package.json` file.
- A `<Local Path>` to a `.tar.gz` archive containing a directory with the plugin and its `package.json` file.
- A `<URL>` which resolves to a `.tar.gz` archive containing a directory with the plugin and its `package.json` file.
- A `<git Remote URL>` which resolves to a `.tar.gz` archive containing a directory with the plugin and its `package.json` file.

#### Installation Specifics

The installation of a NativeScript plugin mimics the installation of an npm module.

The NativeScript CLI takes the plugin and installs it to the `node_modules` directory in the root of your project. During this process, the NativeScript CLI resolves any dependencies described in the plugin `package.json` file and adds the plugin to the project `package.json` file in the project root.

If the NativeScript CLI detects any native iOS libraries in the plugin, it copies the library files to the `lib\ios` folder in your project and configures the iOS-specific projects in `platforms\ios` to work with the library.

Next, the NativeScript CLI runs a partial `prepare` operation for the plugin for all platforms configured for the project. During this operation, the CLI copies only the plugin to the `tns_modules` subdirectories in the `platforms\android` and `platforms\ios` directories in your project. If your plugin contains platform-specific `JS` files, the CLI copies them to the respective platform subdirectory and renames them by removing the platform modifier.

> **TIP:** If you have not configured any platforms, when you run `$ ns platform add`, the NativeScript CLI will automatically prepare all installed plugins for the newly added platform.

Finally, the CLI merges the plugin `Info.plist` file with `platforms\ios\Info.plist` in your project. The plugin `AndroidManifest.xml` will be merged with `platforms\android\AndroidManifest.xml` later, at build time.

> **IMPORTANT:** Currently, the merging of the platform configuration files does not resolve any contradicting or duplicate entries.

### Use a Plugin

To use a plugin inside your project, you need to add a `require` in your app.

```JavaScript
var myPlugin = require("nativescript-my-plugin");
```

This will look for a `nativescript-my-plugin` module with a valid `package.json` file in the `tns_modules` directory. Note that you must require the plugin with the value for the `name` key in the plugin `package.json` file.

### Remove a Plugin

To remove a plugin from your project, inside your project, run the following command.

```Shell
ns plugin remove <Plugin>
```

You must specify the plugin by the value for the `name` key in the plugin `package.json` file.

#### Removal Specifics

The removal of a NativeScript plugin mimics the removal of an npm module.

The NativeScript CLI removes any plugin files from the `node_modules` directory in the root of your project. During this process, the NativeScript CLI removes any dependencies described in the plugin `package.json` file and removes the plugin from the project `package.json` file in the project root.

> **IMPORTANT:** For iOS, this operation does not remove files from the `platforms\ios` directories and native iOS libraries, and does not unmerge the `Info.plist` file. For Android, this operation takes care of removing any plugin files located in `platforms\android`.

#### Manual Steps After Removal

After the plugin removal is complete, make sure to remove any leftover native iOS library files from the `lib\ios` directory in the root of the project. Update the iOS-specific projects in `platforms\ios` to remove any dependencies on the removed native libraries.

Next, you need to run the following command.

```Shell
ns prepare <Platform>
```

Make sure to run the command for all platforms configured for the project. During this operation, the NativeScript CLI will remove any leftover plugin files from your `platforms\ios` directory.

> **TIP:** Instead of `$ ns prepare` you can run `$ ns build`, `$ ns run`, `$ ns deploy` or `$ ns emulate`. All these commands run `$ ns prepare`.

Next, open your `platforms\ios\Info.plist` file and remove any leftover entries from the plugin `Info.plist` file.

Finally, make sure to update your code not to use the uninstalled plugin.

## Building Plugins

Building NativeScript plugins is a great way to learn more about how NativeScript works, to create functionality that you can share across applications, and to leverage some really powerful functionality - such as the ability to use native iOS and Android frameworks.

Let's start by looking at the basics of how to structure a NativeScript plugin, and then move on to look at how you can generate that structure using the NativeScript plugin seed.

### Plugin Basics

At their basic level NativeScript plugins are simple JavaScript modules that use well established npm conventions. For example, here's what the world's simplest NativeScript plugin looks like.

```text
nativescript-hello-world/
└── src
    ├── index.js
    └── package.json
```

> IMPORTANT: Putting your source in a sub-folder is required for local LiveSync debugging.  
> Older plugins should be updated to move their source code in to a sub-folder.

And here is the simplest possible implementation of that plugin.

```JavaScript
// index.js
module.exports = {
  helloWorld: function() {
    console.log("Hello World");
  }
}
```

```JSON
/* package.json */
{
  "name": "nativescript-hello-world",
  "version": "1.0.0",
  "nativescript": {
    "platforms": {
      "ios": "3.0.0",
      "android": "3.0.0"
    }
  }
}
```

There are a few things to note in this implementation.

- NativeScript uses the [CommonJS format](http://wiki.commonjs.org/wiki/CommonJS) for defining JavaScript modules. In practical terms that just means you need to know the syntax for importing and exporting functionality (`require`, `export`, and `module.exports`). It's pretty straightforward, and you'll see several examples throughout this guide.
- NativeScript plugins must have a "nativescript" key in their `package.json` file that specifies the minimum version of the iOS and Android runtimes that the plugin supports. Don't worry about this at the moment, other than to note that it's there.

> **TIP**: Other than the `"nativescript"` key, everything about your plugin's `package.json` file will be identical to any other npm package. Therefore, [the npm docs about the `package.json` file](https://docs.npmjs.com/files/package.json) are a great reference when tinkering with your NativeScript plugin's metadata during development.

To use the above plugin all you need to do is install it in one of your apps.

```bash
ns plugin add /path/to/nativescript-hello-world/src
```

> **TIP**: The `ns plugin add` command lets you install plugins from non-npm locations, such as GitHub repos, local folders, or .tgz archives. For details, run `ns plugin add --help` from your command line.

With the plugin installed, you can use the CommonJS `require()` method to import your plugin and use its `helloWorld()` method.

```JavaScript
var helloWorldModule = require("nativescript-hello-world");
helloWorldModule.helloWorld();
```

And with that you have a functional, albeit extremely basic, NativeScript plugin.

Most plugins need to do much more than log a simple string. To build a robust plugin you need some conventions for building, testing, and distributing the plugin you're building. And that's where the official NativeScript plugin seed comes in.

### The NativeScript Plugin Seed

The [NativeScript plugin seed](https://github.com/NativeScript/nativescript-plugin-seed) is a cloneable GitHub repository that makes starting, building, and maintaining NativeScript plugins easy.

Let's look at how the plugin seed works, and in the process build a simple plugin that can retrieve an app's version number on both Android and iOS.

> **NOTE**: Although we recommend using the NativeScript plugin seed, you do have the ability to build your NativeScript plugin from scratch. If you're interested in creating your own plugin development workflow, refer to the [NativeScript plugin reference](/plugins/plugin-reference) for details on exactly how NativeScript plugins are structured.

#### Start Your Plugin

Because the NativeScript plugin seed is a public and open source repository, you'll start your plugin by running `git clone`. The command below clones the seed into a new folder called "nativescript-version-number".

```bash
git clone https://github.com/NativeScript/nativescript-plugin-seed nativescript-version-number
```

> **TIP**:
>
> - The `git clone` command takes an [optional `<directory>` argument](https://git-scm.com/docs/git-clone#git-clone-ltdirectorygt), and you can use it to change the folder name of any repository that you clone. The above command uses this to clone a repository named "nativescript-plugin-seed" into a folder named "nativescript-version-number".
> - By convention, NativeScript plugins use a naming convention of nativescript-name-of-plugin, which is why this plugin uses the name "nativescript-version-number" instead of something like "nativescript-VersionNumber" or "NativeScriptVersionNumber". Sticking to this naming convention allows developers to find your plugin easily.

You'll learn about the file structure of your plugin momentarily, but first there's one last setup script you need to run. After your `git clone` command finishes, `cd` into your new plugin's `src` folder, and then run the npm `postclone` script.

```bash
cd nativescript-version-number/src
npm run postclone
```

The `postclone` script will ask you a few questions, such as your GitHub username, your plugin's name, and whether you'd like to set up a new git repository for your plugin (You probably want to, as otherwise your repo will start with the source control history of the NativeScript plugin seed itself).

After the `postclone` script completes, your plugin should have a folder structure that looks looks this.

```text
nativescript-version-number/
├── demo
├── publish
└── src
```

Here are what these folders do.

- `demo`: Contains a pre-built NativeScript demo app that you'll use to test your plugin in action.
- `publish`: Contains shell scripts that will help you publish your plugin to npm. We'll come back to this later on.
- `src`: Contains your plugin's source code.

During development, the NativeScript plugin seed allows you to work on your plugin's source code in your `src` folder, and have the plugin update live in a demo app that lives in your `demo` folder. Let's look at how to set up that workflow.

#### Set Up a Development Workflow

In short, the process can be summarized with the following steps:

1. Run the demo app (which references the plugin), e.g. using `npm run demo ios|android`.
2. Update the plugin code and see the result in the refreshed app.

Let's run your plugin in the demo app so you can see your plugin in action. Start by opening a new terminal window or command prompt on your development machine. Next, run either `npm run demo.ios` or `npm run demo.android`, to start up the demo app on iOS or Android.

```bash
# Pick one of these commands and run it while still in the src folder.
npm run demo.ios
npm run demo.android
```

If all went well, you should see the demo app start up and show one of the following screens.

![Your plugin is working on iOS.](/assets/plugins/developing-plugins/working-ios.png)

To show how the development process works, next, open your plugin's `src/version-number.common.ts` file, find the line of code that contains the "Your plugin is working" string, and make a small change. For example you could change the entire line of code that sets the `msg` variable to the following.

```TypeScript
let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}!`;
```

After you save this change a few things are going to happen. Next, your `demo` command (`ns run`) will detect the change and automatically refresh your demo app to show your string update.

![Your plugin is working on iOS!](/assets/plugins/developing-plugins/working-ios-2.png)

> **NOTE**: Wondering how this works? The demo application's `package.json` file is set to reference the plugin's source code in the `src` folder directly. This link allows you to edit files in `src`, and see those changes in your demo immediately.

Pretty cool, huh? With this workflow you have the ability to develop NativeScript plugins just like they're any other files in your NativeScript apps.

Now that you have a workflow in place, let's take a step back and look at the files in `src` in detail, and discuss how you can alter the plugin's default structure to meet your needs.

#### Write Your Plugin

Your plugin's `src` folder is where you'll work on writing your plugin. There are a number of files in this folder, but let's start with the `.ts` files as they're where you'll spend the majority of your time.

```text
.
├── version-number.android.ts
├── version-number.common.ts
└── version-number.ios.ts
```

> **NOTE**:
>
> - Each `.ts` file will have have a generated `.js` file with the same name, but you can safely ignore those. If you're using Visual Studio Code you can add a [bit of configuration](https://code.visualstudio.com/Docs/languages/typescript#_hiding-derived-javascript-files) to hide generated `.js` files in your editor.
> - Each `.ts` file also has a generated `.d.ts` file. Don't worry about these files as the NativeScript CLI takes care of creating these files for you. The only `.d.ts` file you need to worry about is `src/index.d.ts`, and you'll learn about that file momentarily.

The `.android.ts` file is where you put the Android implementation of your plugin; the `.ios.ts` file is where you put the iOS implementation of your plugin; and the `.common.ts` file is an optional file where you can put any code you intend to share on both platforms. The shared code in the `.common.ts` file must be referenced in your platform specific `.android.ts` and `.ios.ts` files. For example in `version-number.ios.ts` you will see:

```TypeScript
import { Common } from './version-number.common';
```

To get an idea of what all this looks like in action let's implement a basic version of the version number plugin. Start by opening your `src/version-number.common.ts` file deleting all of the starting code, as you'll start with a simple plugin that doesn't share logic across iOS or Android.

Next, open your `version-number.ios.ts` file and paste in the following code.

```TypeScript
export class VersionNumber {
  get() {
    var version = NSBundle.mainBundle.objectForInfoDictionaryKey("CFBundleShortVersionString");
    return version;
  }
}
```

The NativeScript plugin seed automatically sets up the necessary TypeScript configuration for working with native iOS and Android APIs, so as you develop your plugins you'll get a little help working with these native APIs in TypeScript-friendly editors like Visual Studio Code. For example, if you start to type out `NSBundle`, Visual Studio Code helps you find the native iOS APIs that are available.

![VS Code IntelliSense](/assets/plugins/developing-plugins/vs-code-intellisense.png)

> **TIP**: If you're new to working with native APIs in NativeScript, check out our documentation on [accessing native APIs in JavaScript and TypeScript](https://docs.nativescript.org/core-concepts/accessing-native-apis-with-javascript). You might also want to dive into a few existing plugins' source code just to see how they work. Almost every plugin on the [NativeScript marketplace](http://market.nativescript.org) is open source.

There are still a few more changes you need to make before your plugin is ready to test. Next, open your `src/version-number.android.ts` file and paste in the following code:

```TypeScript
import { Application } from "@nativescript/core";

export class VersionNumber {
  get() {
    var PackageManager = android.content.pm.PackageManager;
    var pkg = application.android.context.getPackageManager().getPackageInfo(application.android.context.getPackageName(),
      PackageManager.GET_META_DATA);
    return pkg.versionName;
  }
}
```

With this you have a functional plugin implementation for both iOS and Android, but you still have one minor configuration change to make.

Open your `src/index.d.ts` file and paste in the following code.

```TypeScript
export declare class VersionNumber {
  get(): string;
}
```

The `index.d.ts` file serves two purposes: first, it serves as a contract for any application that uses this plugin (you'll see this in a minute when you switch your demo to use this new API). Second, the `.d.ts` file is what enables intellisense or code completion features in TypeScript-friendly editors.

The NativeScript CLI does not generate your `index.d.ts` file, but in most situations you can copy the contents of your `.android.d.ts` file or your `.ios.d.ts` file into your `index.d.ts` file. (The only time you wouldn't want to do that is if your plugin had Android- or iOS-specific APIs that you wanted to expose.)

> **TIP** For more detailed information on writing declaration files refer to [TypeScript's documentation on the topic](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

With that, your plugin is completely functional and can retrieve your app's version number on both iOS and Android. To test this out, head back to your demo app, open your `demo/app/main-view-model.ts` file, find the line of code that sets `this.message`, and change it to use the following line of code.

```TypeScript
this.message = this.versionNumber.get();
```

If you still have `npm run demo.ios|android` running, you should see your demo app update to show your app's version number on the screen. (If not, refer back to step 2 and refamiliarize yourself with the plugin development workflow.)

![1.0](/assets/plugins/developing-plugins/ios-version-number.png)

Now that you have a complete plugin, you're ready to use your plugin in your apps, and to do that you'll need to publish it.

#### Publish Your Plugin

> **WARNING** The publish script of the NativeScript plugin seed requires that you use a bash-enabled terminal or command prompt. If you're on Windows, you can install [GIT SCM](https://git-for-windows.github.io/) and use Git Bash to run these scripts.

Your NativeScript plugin is currently a collection of TypeScript files in a `src` folder. The NativeScript plugin seed provides a series of scripts that can build those files into a distributable npm package.

There are two different scripts that you can run depending on whether you just want to build a plugin package, or whether you want to additionally register that plugin on the npm registry.

Both scripts are in the `publish` folder in your plugin's root folder, so start by using the `cd` command to navigate into that folder:

```bash
cd ../publish
```

Next, if you just want to create a package, execute the `pack.sh` script using the following command:

```bash
./pack.sh
```

The pack command will build your plugin, and place the built archive in your plugin's `publish/package` folder, for example `publish/package/nativescript-version-number-1.0.0.tgz`. You can then take that plugin package and install it in other NativeScript apps using the `ns plugin add` command:

```bash
ns plugin add nativescript-version-number-1.0.0.tgz
```

If you want to publish your new plugin in npm, there are a few additional steps you need to take. First, open your plugin's `src/package.json` file.

Your plugin's `package.json` contains the metadata npm will display about your plugin, so you'll want to make sure that the information listed in this file is correct. Specifically, make sure the `"description"` and `"author"` fields have appropriate values, and also that your `"version"` contains the version number you want npm to use. (You'll need to increment that `"version"` with each subsequent release of your plugin.)

Next, open the `README.md` file in the root of your plugin. The NativeScript plugin seed generates a basic README with a simple outline, but you'll want to replace this file with more complete documentation before you publish your plugin for the world to see. If you're not sure what to put here take a look at what other plugins do. The [version number plugin](https://github.com/tjvantoll/nativescript-version-number) has a dead-simple README you can refer to, and plugins like the [fingerprint auth plugin](https://github.com/EddyVerbruggen/nativescript-fingerprint-auth/) or [MapBox plugin](https://github.com/eddyverbruggen/nativescript-mapbox) provide more complex README patterns you may want to copy from.

Once you're all set with your `package.json` configuration, as well as your `README.md` documentation, return to the `publish` folder or your plugin and run the `publish.sh` script.

```bash
./publish.sh
```

The publish command runs through the same build process as the pack command, but after the build completes the command will additionally push your plugin to the npm registry.

> **NOTE**: For the publish command to work you need to be logged into the `npm` CLI using `npm adduser` or `npm login`. For details on how to use these commands see the [npm documentation on the topic](https://docs.npmjs.com/getting-started/publishing-npm-packages).

And that's it! You have now built a simple plugin, set up a robust development workflow, and got everything ready to share your plugin with the world.

And these are just the basics. The plugin seed supports more advanced workflows for your plugin development. You may be interested in trying out:

- [Adding unit tests]({% slug plugin-unit-tests %})
- [Setting up Travis CI](https://github.com/NativeScript/nativescript-plugin-seed#travisci)

If you run into any problems during your plugin development, reach out on [Stack Overflow](https://stackoverflow.com/questions/tagged/nativescript). And if you'd like to chat with other NativeScript plugin authors, sign up for the [NativeScript slack](https://www.nativescript.org/slack-invitation-form) and join us in the #plugins channel.

### Composite Components

When writing a plugin that shows some UI, you can take different paths. One of the easiest of them is to use existing {N} components as building blocks for a more complex UI component (composite), i.e. no explicit calls to native APIs. Thus you can even sometimes avoid using platform-specific files (like \*.ios.ts, \*.android.ts ...).

#### Bootstrap Your Plugin

First things first - you start off from a regular plugin. You can check the [Building Plugins article]({%slug building-plugins%}) for reference.

#### Add UI bits

Let's say you want to build a simple meme generator component with three properties, which you can use like:

```XML
    <ui:Meme imageSource="~/images/nativescript.png" topText="ROCK" bottomText="ROLL" />
```

...and when used in an app it looks like:

![](/assets/plugins/developing-plugins/ui-plugin-ns-preview.png)

You can implement this by creating two files:

- **meme.ts**: Contains properties, the implementation logic, and loads the UI.
- **meme.xml**: Contains the UI and data bindings.

In **meme.ts**, you need to declare a class with the name of the UI element that will be used in the app:

```TypeScript
export class Meme extends GridLayout {
    constructor() {
        super();

        let innerComponent = builder.load(__dirname + '/meme.xml') as View;
        innerComponent.bindingContext = this;

        this.addChild(innerComponent);
    }
}
```

As you see, in the constructor, we load the UI from the **meme.xml** and set its **bindingContext** to **this**, so that we can bind the XML to the properties:

```xml
<GridLayout rows="auto,*, auto">
  <Label
    row="0"
    text="{{ topText }}"
    fontSize="64"
    textWrap="true"
    horizontalAlignment="center"
    verticalAlignment="top"
  />

  <Image rowSpan="3" src="{{ imageSource }}" verticalAlignment="stretch" />

  <Label
    row="2"
    text="{{ bottomText }}"
    fontSize="64"
    textWrap="true"
    horizontalAlignment="center"
    verticalAlignment="bottom"
  />
</GridLayout>
```

The properties themselves are declared and registered in the .ts like:

```TypeScript
export const topTextProperty = new Property<Meme, string>({ name: "topText", defaultValue: undefined });
export const bottomTextProperty = new Property<Meme, string>({ name: "bottomText", defaultValue: undefined });
export const imageSourceProperty = new Property<Meme, string>({ name: "imageSource", defaultValue: undefined });

...

imageSourceProperty.register(Meme);
topTextProperty.register(Meme);
bottomTextProperty.register(Meme);
```

For more details and the full source code of the described meme sample, check the [NativeScript ui-plugin sample repo](https://github.com/NativeScript/nativescript-ui-plugin).

#### Make Your Plugin Angular-Compatible

Having your UI plugin developed successfully you could easily make it Angular-compatible following the steps described in [Supporting Angular in UI Plugins article]({%slug supporting-angular-in-ui-plugins%}).

### Custom Components

Whenever needed UI can be shown by a plugin just by exposing a custom component, e.g. some platform-specific functionality that renders UI itself. To demonstrate that, this article explains how to create a simple button plugin.

#### Prerequisites

The article contains information applicable to apps built with NativeScript 3.x.x or newer version

#### Bootstrap Your Plugin

First things first - you start off from a regular plugin. You can check the [Building Plugins article]({%slug building-plugins%}) for reference.

#### Common Code

Let's say you want to build a simple button which you can use like:

```XML
    <ui:MyButton text="MyButton1" tap="onTap" />
```

This can be accomplished by wrapping the platform-specific buttons (iOS's UIButton and Android's android.widget.Button) and expose it from a common MyButton class.

You can implement this by creating four files:

- **my-button.d.ts** - holds the declarations of MyButton class, its properties "text" and "myOpacity", enables auto-complete in some IDEs.
- **my-button.common.ts** - contains the logic accessible from the apps.
- **my-button.ios.ts** - holds the iOS-specific logic for creation of the native view (UIButton)
- **my-button.android.ts** - holds the Android-specific logic for creation of the native view (android.widget.Button)

This file holds type definitions for the common logic that will be imported in the app that is using the plugin.
_my-button.d.ts_

```TypeScript
import { View, Style, Property, CssProperty, EventData } from "@nativescript/core";

export class MyButton extends View {
    // static field used from component-builder module to find events on controls.
    static tapEvent: string;

    // Defines the text property.
    text: string;

    // Overload 'on' method so that it provides intellisense for 'tap' event.
    on(event: "tap", callback: (args: EventData) => void, thisArg?: any);

    // Needed when 'on' method is overriden.
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
}

export const textProperty: Property<MyButton, string>;
export const myOpacityProperty: CssProperty<Style, number>;
```

In the following way you create the common logic:
_my-button.common.ts_

```TypeScript
import { MyButton as ButtonDefinition } from "./my-button";
import { View, Style, Property, CssProperty, isIOS } from "@nativescript/core";

export const textProperty = new Property<MyButtonBase, string>({ name: "text", defaultValue: "", affectsLayout: isIOS });

// using myOpacity instead of opacity as it will override the one defined in `@nativescript/core`
export const myOpacityProperty = new CssProperty<Style, number>({
    name: "myOpacity", cssName: "my-opacity", defaultValue: 1, valueConverter: (v) => {
        const x = parseFloat(v);
        if (x < 0 || x > 1) {
            throw new Error(`opacity accepts values in the range [0, 1]. Value: ${v}`);
        }

        return x;
    }
});
export abstract class MyButtonBase extends View implements ButtonDefinition {
    public static tapEvent = "tap";
    text: string;

    // Exposing myOpacity style property through MyButton.
    // This is all optional. If not exposed users will have to set it
    // through style: <control:MyButton style.myOpacity='0.4' />.
    get myOpacity(): number {
        return this.style.myOpacity;
    }
    set myOpacity(value: number) {
        this.style.myOpacity = value;
    }
}

// Augmenting Style definition so it includes our myOpacity property
declare module "@nativescript/core/ui/styling/style" {
    interface Style {
        myOpacity: number;
    }
}

// Defines 'text' property on MyButtonBase class.
textProperty.register(MyButtonBase);

// Defines 'myOpacity' property on Style class.
myOpacityProperty.register(Style);

// If set to true - nativeView will be kept in memory and reused when some other instance
// of type MyButtonBase needs nativeView. Set to true only if you are sure that you can reset the
// nativeView to its initial state. When true will improve application performance.
MyButtonBase.prototype.recycleNativeView = false;
```

You see "text" and "myOpacity" properties are defined in this file and also recycleNativeView is set to "false". To read more how these declarations work refer the [Properties article]({%slug properties%}).

#### Platform-specific Code

Writing the platform-specific implementations, the following overrides need to be considered:

- `createNativeView` - you override this method, create and return your nativeView
- `initNativeView` - in this method you setup listeners/handlers to the nativeView
- `disposeNativeView` - in this method you clear the reference between nativeView and javascript object to avoid memory leaks as well as reset the native view to its initial state if you want to reuse that native view later.

_my-button.android.ts_

```TypeScript
import { MyButtonBase, textProperty, myOpacityProperty } from "./my-button.common";

let clickListener: android.view.View.OnClickListener;

// NOTE: ClickListenerImpl is in function instead of directly in the module because we
// want this file to be compatible with V8 snapshot. When V8 snapshot is created
// JS is loaded into memory, compiled & saved as binary file which is later loaded by
// Android runtime. Thus when snapshot is created we don't have Android runtime and
// we don't have access to native types.
function initializeClickListener(): void {
    // Define ClickListener class only once.
    if (clickListener) {
        return;
    }

    // Interfaces decorator with implemented interfaces on this class
    @Interfaces([android.view.View.OnClickListener])
    class ClickListener extends java.lang.Object implements android.view.View.OnClickListener {
        public owner: MyButton;

        constructor() {
            super();
            // Required by Android runtime when native class is extended through TypeScript.
            return global.__native(this);
        }

        public onClick(v: android.view.View): void {
            // When native button is clicked we raise 'tap' event.
            const owner = (<any>v).owner;
            if (owner) {
                owner.notify({ eventName: MyButtonBase.tapEvent, object: owner });
            }
        }
    }

    clickListener = new ClickListener();
}

export class MyButton extends MyButtonBase {

    // added for TypeScript intellisense.
    nativeView: android.widget.Button;

    /**
     * Creates new native button.
     */
    public createNativeView(): Object {
        // Initialize ClickListener.
        initializeClickListener();

        // Create new instance of android.widget.Button.
        const button = new android.widget.Button(this._context);

        // set onClickListener on the nativeView.
        button.setOnClickListener(clickListener);

        return button;
    }

    /**
     * Initializes properties/listeners of the native view.
     */
    initNativeView(): void {
        // Attach the owner to nativeView.
        // When nativeView is tapped we get the owning JS object through this field.
        (<any>this.nativeView).owner = this;
        super.initNativeView();
    }

    /**
     * Clean up references to the native view and resets nativeView to its original state.
     * If you have changed nativeView in some other way except through setNative callbacks
     * you have a chance here to revert it back to its original state
     * so that it could be reused later.
     */
    disposeNativeView(): void {
        // Remove reference from native view to this instance.
        (<any>this.nativeView).owner = null;

        // If you want to recycle nativeView and have modified the nativeView
        // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
        // you have to reset it to its initial state here.
        super.disposeNativeView();
    }

    // transfer JS text value to nativeView.
    [textProperty.setNative](value: string) {
        this.nativeView.setText(value);
    }

    // gets the default native value for opacity property.
    // Alpha could be controlled from Android theme.
    // Thus we take the default native value from the nativeView.
    // If view is recycled the value returned from this method
    // will be passed to [myOpacityProperty.setNative]
    [myOpacityProperty.getDefault](): number {
        return this.nativeView.getAlpha()
    }

    // set opacity to the native view.
    [myOpacityProperty.setNative](value: number) {
        return this.nativeView.setAlpha(value);
    }
}
```

> **NOTE**: In Android, avoid access to native types in the root of the module (note that ClickListener is declared and implemented in a function which is called at runtime). This is specific for the [V8 snapshot feature](https://www.nativescript.org/blog/improving-app-startup-time-on-android-with-webpack-v8-heap-snapshot) which is generated on a host machine where android runtime is not running. What is important is that if you access native types, methods, fields, namespaces, etc. at the root of your module (e.g. not in a function) your code won't be compatible with V8 snapshot feature. The easiest workaround is to wrap it in a function like in the above `initializeClickListener` function.

_my-button.ios.ts_

```TypeScript
import { MyButtonBase, textProperty, myOpacityProperty } from "./my-button.common";

// class that handles all native 'tap' callbacks
@NativeClass()
class TapHandler extends NSObject {

    public tap(nativeButton: UIButton, nativeEvent: _UIEvent) {
        // Gets the owner from the nativeView.
        const owner: MyButton = (<any>nativeButton).owner;
        if (owner) {
            owner.notify({ eventName: MyButtonBase.tapEvent, object: owner });
        }
    }

    public static ObjCExposedMethods = {
        "tap": { returns: interop.types.void, params: [interop.types.id, interop.types.id] }
    };
}

const handler = TapHandler.new();

export class MyButton extends MyButtonBase {

    // added for TypeScript intellisense.
    nativeView: UIButton;

    /**
     * Creates new native button.
     */
    public createNativeView(): Object {
        // Create new instance
        const button = UIButton.buttonWithType(UIButtonType.System);

        // Set the handler as callback function.
        button.addTargetActionForControlEvents(handler, "tap", UIControlEvents.TouchUpInside);

        return button;
    }

    /**
     * Initializes properties/listeners of the native view.
     */
    initNativeView(): void {
        // Attach the owner to nativeView.
        // When nativeView is tapped we get the owning JS object through this field.
        (<any>this.nativeView).owner = this;
        super.initNativeView();
    }

    /**
     * Clean up references to the native view and resets nativeView to its original state.
     * If you have changed nativeView in some other way except through setNative callbacks
     * you have a chance here to revert it back to its original state
     * so that it could be reused later.
     */
    disposeNativeView(): void {
        // Remove reference from native listener to this instance.
        (<any>this.nativeView).owner = null;

        // If you want to recycle nativeView and have modified the nativeView
        // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
        // you have to reset it to its initial state here.
        super.disposeNativeView();
    }

    // transfer JS text value to nativeView.
    [textProperty.setNative](value: string) {
        this.nativeView.setTitleForState(value, UIControlState.Normal);
    }

    // gets the default native value for opacity property.
    // If view is recycled the value returned from this method
    // will be passed to [myOpacityProperty.setNative]
    [myOpacityProperty.getDefault](): number {
        return this.nativeView.alpha;
    }

    // set opacity to the native view.
    [myOpacityProperty.setNative](value: number) {
        return this.nativeView.alpha = value;
    }
}
```

In the above mentioned implementations we use singleton listener (for Android - `clickListener`) and handler (for iOS - `handler`) in order to reduce the need to instantiate native classes and to reduce memory usage. If possible it is recommended to use such techniques to reduce native calls.

For more details and the full source code of the described MyButton sample, check the [NativeScript UI Plugin (Custom button component) repo](https://github.com/NativeScript/nativescript-ui-plugin-custom).

#### Make Your Plugin Angular-Compatible

Having your UI plugin developed successfully you could easily make it Angular-compatible following the steps described in [Supporting Angular in UI Plugins article]({%slug supporting-angular-in-ui-plugins%}).

### CocoaPods

When you develop for iOS, you can quickly add third-party libraries to your NativeScript projects via the [CocoaPods](https://cocoapods.org/) dependency manager.

To work with such libraries, you need to wrap them as a custom NativeScript plugin and add them to your project.

#### Install CocoaPods

You need to install CocoaPods. If you haven't yet, you can do so by running:

```bash
$ sudo gem install cocoapods
```

> **NOTE:** The minimum required version of CocoaPods is 1.0.0.

To check your current version, run the following command.

```bash
$ pod --version
```

To update CocoaPods, just run the installation command again.

```
sudo gem install cocoapods
```

#### Create CLI Project

To start, create a project and add the iOS platform.

```bash
$ ns create MYCocoaPodsApp
$ cd MYCocoaPodsApp
$ ns platform add ios
```

#### Wrap the Library as NativeScript Plugin

For more information about working with NativeScript plugins, click [here](plugins-reference.md).

```Bash
cd ..
mkdir my-plugin
cd my-plugin
```

Create a `package.json` file with the following content:

```JSON
{
  "name": "my-plugin",
  "version": "0.0.1",
  "nativescript": {
    "platforms": {
      "ios": "1.3.0"
    }
  }
}
```

Create a [Podfile](https://guides.cocoapods.org/syntax/podfile.html) which describes the dependency to the library that you want to use. Move it to the `platforms/ios` folder.

```
my-plugin/
├── package.json
└── platforms/
    └── ios/
        └── Podfile
```

Podfile:

```
pod 'GoogleMaps'
```

#### Install the Plugin

Next, install the plugin:

```bash
ns plugin add ../my-plugin
```

> **NOTE:** Installing CocoaPods sets the deployment target of your app to iOS 8, if not already set to iOS 8 or later. This change is required because CocoaPods are installed as shared frameworks to ensure that all symbols are available at runtime.

#### Build the Project

```bash
ns build ios
```

This modifies the `MYCocoaPodsApp.xcodeproj` and creates a workspace with the same name.

> **IMPORTANT:** You will no longer be able to run the `xcodeproj` alone. NativeScript CLI will build the newly created workspace and produce the correct package.

#### Troubleshooting

In case of post-build linker errors, you might need to resolve missing dependencies to native frameworks required by the installed CocoaPod. For more information about how to create the required links, see the [build.xcconfig specification](./plugin-reference#buildxcconfig-specification).

## Debugging Plugins

Live sync debugging updates your demo/test app automatically in the simulator/device whenever you make a change in the plugin source code. Debugging a plugin is not much different than debugging a NativeScript app but needs some preparation to ease the plugin development. Before you continue, make sure you have covered the topics about [Debugging]({% slug debugging %}) and [NativeScript extension for Visual Studo Code]({% slug nativescript-extension-for-visual-studio-code %}).

### Setup

Live sync debugging requires your plugin's source code to not be in the root of its home folder.

Bad:

```
nativescript-my-plugin/
├── index.js
└── package.json
```

Good:

```
nativescript-my-plugin/
├── demo
└── src
    ├── index.js
    └── package.json
```

> For the technically curious, this is because the build process will copy your plugin's source code folder, including **all** of its files, to their respective android/ios platform folder(s) prior to transpiling. If that process copied your project's root folder then it would also be copying your hidden/system (ex: .git) folders their respective android/ios platform folder(s); that would be bad.

If you created your plugin using the [NativeScript plugin seed](https://github.com/NativeScript/nativescript-plugin-seed) then you are already set up!

If you did not create your plugin using the [NativeScript plugin seed](https://github.com/NativeScript/nativescript-plugin-seed) then just make sure that, per the example above, your plugin's source code is not in your project's root folder.

> If you are debugging an existing or third party plugin, many of them may not be updated and properly structured to support live sync debugging. If a plugin's source code is in the project's root folder and not in a subfolder then you will need to move its source code out of the root folder and in to a subfolder. We encourage you to fork the plugin's original repo and create a Pull Request of your changes back to the plugin's original repo.

### Enabling

To enable local live sync debugging of your plugin in a demo/test app:

1. `cd /your-demo-or-test-folder`
2. `ns plugin add ../relative-path-to/your-plugin/src`

If you are using npm 5 then this will automatically `npm link` your demo/test app's node_modules folder to point to your plugin's source code.

If you are using npm 4 then this will have copied your plugin's files instead of linking directly to them. You will need to manually perform the following additional step(s):

3. `npm link ../relative-path-to/your-plugin/src`

Now the files under `/your-demo-or-test-folder/node_modules/your-plugin` are physically the same files that are located under `your-plugin/src`. This means that you can edit either `/your-demo-or-test-folder/node_modules/your-plugin` or `your-plugin/src` and the changes will automatically update in the demo/test app.

### Debugging

Having the `npm link` set up, you can start debugging your demo project along with your plugin code in `node_modules` folder. Read more about [Debugging using `ns debug`]({% slug debugging %}) and [debugging using NativeScript extension for Visual Studo Code]({% slug nativescript-extension-for-visual-studio-code %}).

### Disabling

You may want to disable debugging your local code if you are done developing or have published your plugin and want to test what the rest of the world will experience when they install your public plugin.

To disable local live sync debugging of your plugin and install your public plugin in a demo/test app:

1. `cd /your-demo-or-test-folder`
2. `ns plugin remove your-plugin`

If you are using npm 5 then this will automatically call `npm unlink`.

If you are using npm 4 then you will need to perform the following additional step(s):

3. `npm unlink your-plugin`

Now, add back the dependency to your public plugin:

4. `ns plugin add your-plugin`

### Limitations

Using `npm link` eases the development of your plugin when you do any kind of code changes to your page templates, typescript/javascript, css files. What it won't do for you is to apply plugin changes to your demo related to:

- plugin's platform specific files (i.e Info.plist, AndroidManifest.xml)
- plugin's native libraries

This means that if during development you need to change Info.plist or add a native library to your plugin, then you need to run `ns plugin remove/add <your-plugin-name>`. This will apply the plugin platform specifics to your demo. After that you can continue debugging and developing using `npm link`.

## Implementing the NativeScript Theme in Plugins

For plugins that use UI components, we highly recommend implementing the NativeScript core theme. It's up to you to decide if light and dark skins are enough or you want to implement more. Before continue reading make sure you read the basics about [NativeScript theme]({ % theme % }) and review the [NativeScript Theme repository](https://github.com/NativeScript/theme)

To review the working example, you can refer to [this branch](https://github.com/NativeScript/nativescript-ui-plugin-custom/tree/implement-core-themes/) of the [NativeScript Custom UI Plugin repository](https://github.com/NativeScript/nativescript-ui-plugin-custom).

### Prerequisites

This article is built on top of a [custom UI plugin](https://github.com/NativeScript/nativescript-ui-plugin-custom) which is an example for another article about [Building UI Plugin using Custom Components ]({ % building-ui-plugins-custom-components % }) in this documentation.

We are using `.scss` files to define our plugin styles. So make sure you run the following commands in your plugin source folder:

- `npm install node-sass —save-dev` to install the `node-sass` library to compile `.scss` files into `.css` files.
- `npm install nativescript-theme-core —save-dev` to install the NativeScript core theme

### Plugin Code Changes

As we mentioned above, the starting point for this article is the repository showing how to [build UI plugin](<(https://github.com/NativeScript/nativescript-ui-plugin-custom)>). Before you start defining style definitions to the custom button created in the example, open `my-button.common.ts` and add the following constructor to `MyButtonBase` class:

```JavaScripts
function MyButtonBase() {
    var _this = _super.call(this) || this;
    _this.className = "mybtn";
    return _this;
}
```

```TypeScript
constructor() {
    super();
    this.className = "mybtn";
}
```

This will add a `mybtn` class name to our custom button element.

> **NOTE**: If you want to customize font styles and color, make sure your custom component inherits from `TextBase` instead of `View`.

### Implementation

In this example we will implement two main skins of the NativeScript core theme - dark and light. Any other skin can be implemented in a similar way.

Review [NativeScript Core Theme supported skins] ({ % https://github.com/NativeScript/theme/tree/master/app/scss/skins % }).

#### Files Structure and Contents

Add folder `scss` to your plugin source folder having the following structure:

```
scss
├── _mybutton.scss
├── _variables.scss
├── mybutton.dark.android.scss
├── mybutton.dark.ios.scss
├── mybutton.light.android.scss
├── mybutton.light.ios.scss
├── platforms
│   ├── _mybutton.android.scss
│   └── _mybutton.ios.scss
└── skins
    ├── _variables.dark.scss
    └── _variables.light.scss
```

`_variables.scss` describes your plugin scss variables that will be used to specify different styles for the different theme skins or platforms. In our example it contains the following definitions:

```
$mybtn-color: $primary;
$mybtn-background-color: $secondary;
$mybtn-border-color: $btn-color;
$mybtn-border-width: 10;
$mybtn-border-radius: 10;
$mybtn-opacity: 1;

```

You can see that variables `$primary`, `#secondary` and `$btn-color` are used. They are defined in the NativeScript core theme.

`_mybutton.scss` describes the base style definition of the component class. In our case this is `mybtn`:

```
.mybtn {
  padding: 20;
  background-color: $mybtn-background-color;
  color: $mybtn-color;
  font-size: 20;
  font-weight: bold;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  text-transform: lowercase;
  margin: 20;
  border-color: $mybtn-border-color;
  border-width: $mybtn-border-width;
  border-radius: $mybtn-border-radius;
  width: 200;
  opacity: $mybtn-opacity;
}

```

For full list of css properties that you can use, you can refer to (Styling)[{ % styling % }].

`skins/_variables.light.scss` and `skins/_variables.dark.scss` override some of the variables depending on the theme skin - dark or light. More skin overrides can be added to this folder (i.e. sky, lime, etc...).

skins/\_variables.light.scss:

```
@import '../../node_modules/nativescript-theme-core/scss/light';
@import '../variables';

$mybtn-opacity: 0.3;
$mybtn-border-color: $forest;
$mybtn-background-color: $forest;
$mybtn-color: $white;
```

skins/\_variables.dark.scss:

```
@import '../../node_modules/nativescript-theme-core/scss/dark';
@import '../variables';

$mybtn-opacity: 0.8;
$mybtn-border-color: $lime;
$mybtn-background-color: $lime;
$mybtn-color: $black;
```

`platforms\_mybutton.android.scss` and `platforms\_mybutton.ios.scss` override some of the variables depending on the platform - iOS or Android.

platforms_mybutton.android.scss:

```
// Variables overrides for Android

$mybtn-border-width: 5;
$mybtn-border-radius: 5;

// Import common styles
@import '../mybutton';

// Describe Android specific styles
```

platforms_mybutton.ios.scss:

```
// Variables overrides for ios

$mybtn-border-width: 5;
$mybtn-border-radius: 15;

// Import common styles
@import '../mybutton';

// Describe iOS specific styles
```

The other files are the entry point for each combination of skin and platform:

- mybutton.dark.android.scss
- mybutton.dark.ios.scss
- mybutton.light.android.scss
- mybutton.light.ios.scss

What you need to do in each of them is just import the corresponding skin and platform specific scss files. For example `mybutton.dark.android.scss` has the following content:

```
@import 'skins/variables.dark';
@import 'platforms/mybutton.android';

```

#### SCSS compilation

Once you have all your styles defined per skin and platform, you're ready to compile the `scss` files to `css`. To do so, open your command prompt or terminal and run the following command from your plugin source folder:

`node_modules/node-sass/bin/node-sass scss --output css`

This will do the compilation and save the result css files in a `css` folder. There you can find one file for each combination of skin and platform. In our example there will be four files:

```
css
├── mybutton.dark.android.css
├── mybutton.dark.ios.css
├── mybutton.light.android.css
└── mybutton.light.ios.css
```

### Usage

Now, the plugin from the example has 2 skins and is ready to be used along with NativeScript theme and dark and light skins. To use the dark skin of NativeScript theme in your app and apply it to your plugin, all you need to is add the following to `app.css`:

```
@import 'nativescript-theme-core/css/core.dark.css';
@import 'nativescript-ui-plugin-custom/css/mybutton.dark.css';
```

For light skin, just import the corresponding `light` files to `app.css`.

#### Screenshots

_Dark skin on Android_
![](/assets/plugins/developing-plugins/dark-android.png)
_Dark skin on iOS_
![](/assets/plugins/developing-plugins/dark-ios.png)
_Light skin on Android_
![](/assets/plugins/developing-plugins/light-android.png)
_Light skin on iOS_
![](/assets/plugins/developing-plugins/light-ios.png)

## Angular

### Supporting Angular in UI Plugins

In order to make your UI plugin Angular compatible you need to create a simple Angular wrapper. Before you continue, make sure you have covered the topic about [Building UI Plugins using Custom Components]({% slug building-ui-plugins-custom-components %}) or the one for [Building UI Plugins using Composite Components]({% slug building-ui-plugins-composite-components %}).

#### Angular Wrapper

Once your UI plugin is ready, you can easily make it Angular compatible following the steps below:

1. Add the **nativescript-angular** and **@angular/core** NPM modules in your plugin **dev dependencies**.

2. **Create a new folder called angular** in the root folder of your plugin containing the following files:

- **index.ts** - an entry file allowing the TypeScript imports.
- **\<your-plugin-name\>.module.ts** - a sample Angular module with one directive defining the Angular selector - NativeScript component binding.
- **\<your-plugin-name\>.directives.ts** - a sample Angular directive with your plugin selector.
- **package.json** - the most basic package.json allowing us to require the angular wrapper.

3. **Edit the newly created files** following the templates below:

---

> **package.json**

    {
        "name": "<your-plugin-name>",
        "main": "index.js"
    }

---

> **\<your-plugin-name\>.module.ts**

    import { NgModule } from "@angular/core";
    import { registerElement } from "nativescript-angular/element-registry";

    import { DIRECTIVES } from "./<your-plugin-name>.directives";

    @NgModule({
        declarations: [DIRECTIVES],
        exports: [DIRECTIVES],
    })
    export class <YourPluginComponent>Module { }

    registerElement("<YourPluginAngularSelector>", () => require("<PathToYourPlugin>").<YourPluginComponent>);

---

> **\<your-plugin-name\>.directives.ts**

    import { Directive } from "@angular/core";

    @Directive({
        selector: "<YourPluginAngularSelector>"
    })
    export class <YourPluginComponent>Directive { }

    export const DIRECTIVES = <YourPluginComponent>Directive;

---

> **Index.ts**

    export * from "./<your-plugin-name>.module";

4.  **Register the Angular wrapper** in the main module of your demo app.

    > **the app.module.ts of your demo app**

        ...
        import { <YourPluginComponent>Module } from "<your-plugin-name>/angular";
        ...
        @NgModule({
            imports: [
                ...
                <YourPluginComponent>Module,
                ...
            ]
            ...
        })
        export class AppModule { }

Take a closer look at Angular wrappers implementation in the [nativescript-facebook plugin](https://github.com/NativeScript/nativescript-facebook/tree/master/src/angular) or get a detailed explanation what stays behind the code and why it is needed in the [Supporting Angular Explained]({% slug supporting-angular-explained %}) article.

### Integrating UI Components With Angular

The standard NativeScript abstraction for a visual component is the `View` class in the "ui/core/view" package. It can be used to integrate with:

- Native Android and iOS UI components. Plugins for those typically create a `View` facade for JavaScript code.
- UI widgets written in JavaScript. Those too are exposed as `View` instances.

Angular applications do not typically use NativeScript `View` objects directly since visual tree manipulations are best left to the "renderer" abstraction. The renderer provides great flexibility in building platform-independent UIs, but that comes with a price; using advanced NativeScript components may require some glue code.

#### Simple Elements

Angular templates look a lot like HTML. To extend the browser analogy, we can think of visual components as DOM elements that get parsed into a visual tree. Each element name is mapped to a `View` class. The renderer uses that mapping to create component instances and set their properties according to attribute values.

Most visual components have a simple markup interface: just a tag with zero or more attribute values. NativeScript already provides mappings for frameworks classes shipped with the `@nativescript/core` package, and lets you register additional mappings for other components.

Now, suppose you have a NativeScript UI plugin named `SimpleTag`:

```TypeScript
export class SimpleTag extends ContentView {
    // ...
}
```

This is a fully-functional "vanilla" NativeScript component. To register it as a valid tag for Angular templates, you need to use the element registry API:

```TypeScript
import {registerElement} from "nativescript-angular/element-registry";
registerElement("third-party-view", () => require("./third-party-view").SimpleTag);
```

That maps the `SimpleTag` class to the "third-party-view" tag name. You can now use it in templates:

```TypeScript
@Component({
    selector: "simple-view-container",
    template: `
        <third-party-view prop1="value1"></third-party-view>
    `
})
export class SimpleViewContainer {
}
```

#### Views and Templates

Some advanced NativeScript components do not fit the HTML DOM metaphor. Usually those are components that allow you to customize their appearance or structure by passing preconfigured `View` instances or templates that get instantiated multiple times. The canonical example for that is a rich list view component that allows you to customize item templates.

The problem with accepting `View` instances as a means of configuration is that it makes client code platform-bound. Angular apps usually limit direct manipulations to the underlying visual tree, and the recommended approach is to keep any modifications to that tree in templates (using bindings) and custom directives. Customization using template properties has a similar issue: both the NativeScript UI foundation and Angular provide templating services, and those two are incompatible. That requires translating from one templating service to another. That is why the best approach when integrating such components is to provide a wrapper component or directive that creates an **Angular** "view" from an **Angular** template, and then passes it to the underlying component.

To illustrate this approach, we'll assume that we have a `<document-form>` component that displays a document with a form-like UI. It allows you to customize its title by setting a preconfigured title `View` instance.

```TypeScript
@Component({
    selector: "document-form",
    template: ""
})
export class DocumentFormComponent {

    constructor() {
    }

    public setTitleView(view: View) {
        // pass view parameter to native element...
    }
}
```

To support that on the Angular side, we need an Angular template nested inside the `document-form` tag. To make template discovery and manipulation easier, we associate it with a directive named `DocumentTitleDirective`. Here is what the client code looks like:

```TypeScript
@Component({
    selector: "document-form-container",
    template: `
    <document-form src="document1.pdf">
        <Label *documentTitle text="Document1"></Label>
    </document-form>
    `
})
export class DocumentFormContainer {
}
```

Note the standard Angular asterisk syntax, which is just shorthand for creating a template.

The actual integration code is hosted in the directive implementation. It works with the Angular `TemplateRef` instance and uses the `ViewContainer` API to create and attach a view:

```TypeScript
@Directive({
    selector: "[documentTitle]"
})
export class DocumentTitleDirective {
    public static titleLabel: Label;
    constructor(
        private ownerForm: DocumentFormComponent,
        private viewContainer: ViewContainerRef,
        private template: TemplateRef<any>
    ) {
    }

    ngOnInit() {
        const viewRef = this.viewContainer.createEmbeddedView(this.template);
        // filter out whitespace nodes
        const titleViews = viewRef.rootNodes.filter((node) =>
                            node && node.nodeName !== "#text");

        if (titleViews.length > 0) {
            const titleView = titleViews[0];
            this.ownerForm.setTitleView(titleView);
        }
    }
}
```

Two things in the code above need mentioning:

1. Instantiated Angular views have a collection of root nodes that usually contain whitespace "text" nodes. We ignore those and get the first "real" element.
2. Since our parent component is higher in the component tree, we can use the DI system and inject a reference to it in the directive constructor.

#### Tips and Tricks

While the following two approaches are not usually the best solutions, they can help while debugging application issues and/or speed up prototyping.

#### Register a Wrapper Tag

You can register any class for a given tag, and that gives you a valuable injection mechanism. You can wrap certain components in your own View instance and pass that to the `registerElement` API. (Hint: for easy wrapping, just inherit from the real view.) Here is what people have used that for:

- Quickly prototype complex integrations by doing all configuration in plain JavaScript code.
- Stub missing or not-yet-implemented components.
- Debug or mock component initialization by passing a recording object.

#### Attach a Directive

This approach is similar to the wrapper tag one since it is aimed at doing all component customization in code. Any directive can get a reference to its host tag by declaring an `ElementRef` constructor parameter and get the NativeScript `View` from that via the `ElementRef.nativeElement` property.

The directive approach is especially useful when trying to build a cross-platform solution that shares code with a web application since you can provide a different directive implementation in the web app. Directives compose really well too &mdash; you can split different parts of the integration code in different directives and apply more than one directive per component.

#### Summary

NativeScript UI plugins are not automatically integrated in Angular applications, but doing that is a straightforward task. Most libraries need a couple of `registerElement` calls and some of them conveniently ship a module that client code can `require` and have the registration happen automatically. Follow the steps in [this article]({% slug supporting-angular-in-ui-plugins %}) to provide Angular support for your UI plugin.

## Ensure Plugins Quality

NativeScript plugins are the main building blocks for NativeScript applications. These building blocks should work properly installed into applications:

- built for Android
- built for iOS

Ignoring any of these non-functional requirements could lead to an app that doesn’t work as expected. Throughout this article we'll be referring to the verification of those requirements as 'sanity checks' without writing a single line of test.

### Prerequisites

In order to ensure that your plugin runs reliably in any NativeScript application, there are certain prerequisites you may need to complete.

All plugins should have a demo folder that contains a demo application showing how the plugin works. If your plugin is a user interface plugin, and you need to test the plugin in both Angular and non-Angular apps, you should have an additional demo-angular folder containing an Angular app you can test your plugin in. Refer to the article ["Supporting Angular in UI Plugins"]({% slug supporting-angular-in-ui-plugins %}) for more details.

```
my-plugin
├── demo
├── demo-angular
└── src
     └── package.json
```

> **NOTE**: It is very handy to have the plugin and demo application(s) in the same repository. The [NativeScript official plugin seed](https://github.com/NativeScript/nativescript-plugin-seed#plugin-folder-structure) defines this structure so if the plugin is based on it, the plugin’s source and the demo app are nicely organized.

In order to ease the process add the following scripts in your `package.json` file under `src` folder (the plugins source folder).

```
"ngc": "node --max-old-space-size=8192 ./node_modules/.bin/ngc"
```

> **NOTE** In case the ngc command is not found, you need to install it: `npm install @angular/compiler-cli --save-dev`

This script will initiate Ahead of Time (AOT) compilation. The parameter `max-old-space-size` is a workaround to fix heap out of memory errors when running node binaries. It's a common issue when using TypeScript 2.1+ and the Angular compiler (ngc). Check out this issue for more information - https://github.com/angular/angular-cli/issues/5618.

> **NOTE** The script above is needed only if the plugin implements some specific Angular wrappers for Angular support.

```
"build": "npm i && tsc && npm run ngc"
```

This script will install all NativeScript plugin’s dependencies, compile TypeScript files and initiate Ahead of Time (AOT) compilation.

> **NOTE** The command `npm run ngc` is needed only if the plugin implements some specific Angular wrappers for Angular support. If this is not the case, it can be removed.

```
"prepublishOnly": "npm run build"
```

In the `package.json` under your `demo` and `demo-angular` folders add the following script:

```
"build.plugin": "cd ../src && npm run build"
```

This script will be executed before the package is prepared and packed, only on npm publish. More details can be found in the [npm-script documentation](https://docs.npmjs.com/misc/scripts). This approach is important because it ensures the plugin’s TypeScript is compiled and the plugin’s required metadata is generated every time before publishing.

Refer to the [package.json](https://github.com/NativeScript/nativescript-facebook/blob/doc/src/package.json#L12-L15) file of the [nativescript-facebook](https://github.com/NativeScript/nativescript-facebook) plugin where these scripts are also added.

### Checking for Readability, Maintainability, and Functionality Errors

[TSLint](https://palantir.github.io/tslint/) is a great tool for static analysis of your plugin’s code. It will test the plugin for readability and maintainability as well as functionality errors based on customizable rules. A complete list with the available TSLint rules can be found in the [tslint repository](https://palantir.github.io/tslint/rules/).

The official [NativeScript plugin seed](https://github.com/NativeScript/nativescript-plugin-seed) recommends TSLint rules defined in this [tslint.json](https://github.com/NativeScript/nativescript-plugin-seed/blob/master/tslint.json) file.

```
my-plugin
├── demo
├── demo-angular
├── src
|    └── package.json
└── tslint.json
```

TSLint could be easily incorporated into any NativeScript plugin by following these steps:

1.  Add [tslint.json](https://github.com/NativeScript/nativescript-plugin-seed/blob/master/tslint.json) file on root level.
2.  Add the following script in your plugin’s `src/package.json` file.

```
"ci.tslint": "npm i && tslint '**/*.ts' --config '../tslint.json' --exclude '**/node_modules/**'"
```

This script executes the `tslint` command passing the tslint rules defined in `tslint.json` file. The installed `node_modules` will be excluded from the static analysis.
Having `tslint.json` on root level allows using the same TSLint rules for both demo apps by adding the same script.

Now the command `npm run ci.tslint` will start a static analysis.

### Checking in Application Built for Android and iOS

Perhaps the most important sanity checks is whether the demo application consuming the plugin can actually be built. NativeScript supports Android and iOS so both platforms should be covered. The recommendation is to build with latest SDK for Android and iOS.

The NativeScript command for building Android and iOS apps is:

`ns build android` and `ns build ios`

Read more details regarding [building project with NativeScript CLI](https://github.com/NativeScript/nativescript-cli#build-your-project).

### Automate All Checks with Travis CI

Travis CI is a great way to automate plugin’s sanity checks. It is free for open-source projects. More details can be found in [Travis CI documentation](https://docs.travis-ci.com/). Travis CI will boot a virtual machine and execute commands based on the provided configuration in your `.travis.yml` file.

First things first! Add an empty `.travis.yml` file on the root level of your plugin.

```
my-plugin
├── demo
├── demo-angular
├── src
|    └── package.json
├── tslint.json
└── .travis.yml
```

> **NOTE**: If you use the [NativeScript plugin seed](https://github.com/NativeScript/nativescript-plugin-seed), you have an initial `.travis.yml` file setup.

This sample uses [Build Matrix](https://docs.travis-ci.com/user/customizing-the-build#Build-Matrix) to initiate several runs as a result of one and [Build Stages](https://docs.travis-ci.com/user/build-stages) to separate the execution into stages. The flow will be as follows:

1.  Test for Readability, Maintainability and Functionality Errors
2.  Build Demo Apps with Your Plugin Installed

Each step starts after successful completion of the previous one. In this way, if there is a functional error, for example, the entire run will be terminated after the fall of the first step and the rest of the steps will not be executed. This behavior is controlled by [Build Stages](https://docs.travis-ci.com/user/build-stages).

According to the [Build Lifecycle](https://docs.travis-ci.com/user/customizing-the-build#The-Build-Lifecycle) of each Travis CI build, `install` is the right phase to install any required dependencies.

Add following commands in the `install` phase in `.travis.yml` file:

Install nativescript as a global node module.

```
- npm install -g nativescript
```

Configures anonymous usage reporting for the NativeScript CLI. Read more about [CLI usage reporting](https://github.com/NativeScript/nativescript-cli/blob/master/docs/man_pages/general/usage-reporting.md).

```
- ns usage-reporting disable
```

Configures anonymous error reporting for the NativeScript CLI. Read more about [CLI error reporting](https://github.com/NativeScript/nativescript-cli/blob/master/docs/man_pages/general/error-reporting.md).

```
- ns error-reporting disable
```

As a result the `install` phase should be:

```
install:
    - npm install -g nativescript
    - ns usage-reporting disable
    - ns error-reporting disable
```

Refer to nativescript-facebook [.travis.yml file](https://github.com/NativeScript/nativescript-facebook/blob/doc/.travis.yml#L60-L62) to see this in reality.

As we mentioned earlier, the plugin should be sanity checked on Android as well as on iOS. The Android specific requirements can be defined in `.travis.yml` file in `android` section:

```
android:
  components:
    - tools
    - platform-tools
    - build-tools-26.0.1
    - android-26
    - android-23
    - extra-android-m2repository
```

`tools` and `platform-tools` components define that the latest revision of Android SDK Tools will be installed. Read more about [Travis CI Environment for Android Project](https://docs.travis-ci.com/user/languages/android/#Overview).

`build-tools-26.0.1` component defines the BuildTools version that will be used.

`android-26` component defines the SDK version used to compile the project.

`extra-android-m2repository` component defines the support library repositories.

Let's add the required stages using the [Build Matrix](https://docs.travis-ci.com/user/customizing-the-build#Build-Matrix).

Add the following snippet at the beginning of `.travis.yml` file:

```
matrix:
  include:
```

Then add the required stages:

#### 1. Test for Readability, Maintainability and Functionality Errors

```
- stage: "Lint"
  language: node_js
  os: linux
  node_js: "10"
  script: cd src && npm run ci.tslint && cd ../demo && npm run ci.tslint && cd ../demo-angular && npm run ci.tslint
```

The machine that is going to be provisioned will be Linux with nodejs v10 installed on it as well as OpenJDK v8. Finally the `ci.tslint` script will be executed for the plugin's code and for the demo apps.

#### 2. Build Demo Apps with Your Plugin Installed

```
- stage: "Build"
  env:
    - BuildAndroid="26"
  language: android
  os: linux
  jdk: openjdk8
  before_install: nvm install 6.10.3
  script: cd demo && npm run ci.android.build && cd ../demo-angular && npm run ci.android.build
- os: osx
  env:
    - BuildiOS="11"
    - Xcode="9.1"
  osx_image: xcode9.1
  language: node_js
  node_js: "10"
  jdk: openjdk8
  script: cd demo && npm run ci.ios.build && cd ../demo-angular && npm run ci.ios.build
```

The scripts (`ci.android.build` and `ci.ios.build`) that are executed to build for iOS and Android are located in [package.json](https://github.com/NativeScript/nativescript-facebook/blob/master/demo/package.json#L49) file of any of the demo apps.

If everything is configured properly, the sanity checks will execute on every code change. The result, and whether the checks pass or not, will look like this:

![](/assets/plugins/developing-plugins/travis-ci.png)

The main benefit of having sanity checks in place for your NativeScript plugins is that you can develop without spending additional time to ensure your changes don't break existing applications depending on your plugin.

Do not forget to [add a Travis CI badge](https://docs.travis-ci.com/user/status-images/) in your NativeScript plugin's project! It reports live status of your CI build and makes your plugin look more reliable.

#### See Also

- [Unit Tests]({% slug plugin-unit-tests %})

## Unit Tests

Writing unit tests for a plugin that is developed using the [nativescript-plugin-seed](https://github.com/NativeScript/nativescript-plugin-seed) is as simple as building the plugin itself. Before we continue, take a look at [Building Plugins]({% slug building-plugins %}) topic if you have missed that.

### Test Implementation

You have completed your plugin and it works great, but how you can be sure that every other change applied to the code base will not break some functionality and how to easily check a plugin's state. Here, unit tests come to assistance with their best feature - 'fast execution'.

The starting point of writing unit tests is the `tests` folder in your demo app directory. There you will find `tests.js` file containing sample [Jasmine](https://jasmine.github.io/) tests.

```
my-plugin
├── demo
|   └── app
|       └── tests
└── src

```

The [NativeScript plugin seed](https://github.com/NativeScript/nativescript-plugin-seed) builds this structure automatically when you initialize your plugin, so don’t worry about creating these files and folders manually.

Let’s add a few additional tests to the `tests.js` file. We will continue from the point where [Building UI Plugins Using Composite Components]({% slug building-ui-plugins-composite-components %}) article left us so be sure you are aware of it. In order to test the three properties defined there we will write a test for each of them. Each test will be in a separate suite.

```JavaScript
describe("topText property", function() {
    it("value is applied to top label", function() {
        uiPlugin.topText = "pain";
        expect(uiPlugin.getChildAt(0).getChildAt(0).text).toEqual("pain");
    });
});

describe("imageSource property", function() {
    it("value is applied to image element", function() {
        uiPlugin.imageSource = "/some/path/to/image.png";
        expect(uiPlugin.getChildAt(0).getChildAt(1).src).toEqual("/some/path/to/image.png");
    });
});

describe("bottomText property", function() {
    it("value is applied to bottom label", function() {
        uiPlugin.bottomText = "gain";
        expect(uiPlugin.getChildAt(0).getChildAt(2).text).toEqual("gain");
    });
});
```

Every test assigns a value to the property in testing and verifies that the same value is applied to the element in the visual tree that uses it. The visual tree of the [nativescript-ui-plugin](https://github.com/NativeScript/nativescript-ui-plugin) in our example is pretty simple. It has a grid layout containing three elements which makes it easy to orientate in the structure. In case of more complicated plugin I would suggest that you use some of the [LayoutBase](/api-reference/classes/_ui_layouts_layout_base_.layoutbase.html) class methods to explore the visual three. For example:

```JavaScript
const UiPlugin = require("nativescript-ui-plugin").Meme;
let uiPlugin = new UiPlugin();

let uiElement = uiPlugin.getChildAt(0);
uiElement.eachChildView((view)=>{
    console.log("======START======");
    console.log("Index: " + uiElement.getChildIndex(view));
    console.log("Element: " + view);
    console.log("======END======");
    console.log(" ");
});
```

In this example, we use [getChildAt()](/api-reference/classes/_ui_layouts_layout_base_.layoutbase.html#getchildat) function to select the one and only layout in our plugin at index zero. This function returns the `View` class - the base class for all UI components. Then we traverse all elements in the layout using [eachChildView()](/api-reference/classes/_ui_layouts_layout_base_.layoutbase.html#eachchildview), get their index with [getChildIndex()](/api-reference/classes/_ui_layouts_layout_base_.layoutbase.html#getchildindex) and print all that information.

You can find the complete `tests.js` file [here](https://github.com/NativeScript/nativescript-ui-plugin/blob/master/demo/app/tests/tests.js).

### Test Execution

We have our tests ready and it is time to get them in action. Fortunately, [nativescript-plugin-seed](https://github.com/NativeScript/nativescript-plugin-seed) has already provided the commands we need in the form of npm scripts. Just navigate to your `src` folder and run:

```
npm run test.android
npm run test.ios
```

Be sure that you have available android/ios device or simulator.

> **NOTE**: Using the npm scripts to run your tests is the best option, but in case of debugging purposes, where you want to output some console logs, you will have to navigate to your `demo` folder and run `ns test android` or `ns test ios`.

### Continuous Integration

By starting from the [nativescript-plugin-seed](https://github.com/NativeScript/nativescript-plugin-seed) you get out-of-the-box fully-functional `.travis.yml` file ready to run your unit tests on Android and iOS in [Travis CI](https://travis-ci.org/). All you have to do is to log in to Travis CI, activate your repository, and make sure `Build pushes` and `Build pull requests` are [enabled](https://docs.travis-ci.com/images/settings-env-vars.png).

#### See Also

- [Ensure Plugins Quality]({% slug ensure-plugins-quality %})

## UI Tests

User interface testing exercises your app's UI likewise your users do without any knowledge about the code base behind. It helps you see the app the same way your users will, showing any UI issues that users run into. UI testing verifies that the whole application is functioning correctly, including its UI.

### Prerequisites

The main characteristics that distinguish UI tests we will talk about in this article are two. The first is that the tests are [Appium](http://appium.io/) based and the second is that we will use [TypeScript](https://www.typescriptlang.org/) to write them. Considering these two distinguishing marks we have to install:

- [nativescript-dev-appium](https://github.com/NativeScript/nativescript-dev-appium) plugin in your demo app
  ```
  npm install --save-dev nativescript-dev-appium
  ```
- [Appium](http://appium.io/) globally
  ```
  npm install -g appium
  ```

More about `nativescript-dev-appium` plugin you can find in its [repository](https://github.com/NativeScript/nativescript-dev-appium) documentation, but in short it depends on Appium to communicate with device/emulator, uses [Appium JavaScript client library](https://www.npmjs.com/package/wd) and [Mocha](https://mochajs.org/) testing framework. Before we continue, take a moment and familiarize yourself with fore-mentioned tools unknown to you.

### Implementation

By installing [nativescript-dev-appium](https://github.com/NativeScript/nativescript-dev-appium) plugin in your demo app it creates `e2e` folder where our starting point is.

```
my-plugin
├── demo
|   └── app
|   └── e2e
└── src
```

There you will find a sample testing file using [Mocha "BDD" interface](https://mochajs.org/#bdd) which is nice to begin with, but let's see some real example that we will be able to run later on. We will use [NativeScript Facebook plugin's](https://github.com/NativeScript/nativescript-facebook) UI tests for that purpose. The location of the tests stays the same so let's take a look at [them](https://github.com/NativeScript/nativescript-facebook/blob/master/demo/e2e/test.e2e.ts).
Let's review most notable lines of code and explain them.

```javascript
import { AppiumDriver, createDriver, SearchOptions } from 'nativescript-dev-appium'
```

We start by loading our plugin's modules that will be further used to initialize our driver and provide us some helpful functions.

```javascript
describe("Facebook tests", async function () { // define test suite
    ...

    before(async () => {
        driver = await createDriver();
        driver.defaultWaitTime = 15000; //custom timeout when search an element
    });

    after(async () => {
        if (isSauceRun) {
            driver.sessionId().then(function (sessionId) {
                console.log("Report: https://saucelabs.com/beta/tests/" + sessionId);
            });
        }
        await driver.quit();
        console.log("Driver successfully quit");
    });
    ...
```

Here, we define our suite and set a custom [timeout](https://mochajs.org/#timeouts) for each element to be found. The timeout setting for the whole execution is located in the [mocha.opts](https://github.com/NativeScript/nativescript-facebook/blob/master/demo/e2e/config/mocha.opts) configuration file so if needed it can be adjusted there. We use some bigger value as we run the tests in [Sauce Labs](https://saucelabs.com/) and it takes a bit more time than a local execution.

[Sauce Labs](https://saucelabs.com/) is a cloud-based platform for automated testing of web and mobile applications. It provides us an access to mobile emulators and simulators needed for our test execution. This way we don't have to take care of a testing environment which is great. Additionally, our testing results are public and that increases the transparency of plugin's state and how it has been tested.

Going further, two types of [Mocha hooks](https://mochajs.org/#hooks) are noticeable in the suite. The `before` one initialize our driver which communicates with the server and `after` quits it.

It is time for our tests implementation. Let's review the first test.

```javascript
it('should log in via original button', async function () {
  if (isAndroid) {
    var userNameLabelElement = "[@text='Nativescript User']"
  } else {
    var loginButtonElement = "[@name='Log In']"
    var continueButtonAttribute = "[@name='Continue']"
    var userNameLabelElement = "[@name='Nativescript User']"
  }

  const facebookButton = await driver.findElementByAccessibilityId(FACEBOOK_BUTTON)
  await facebookButton.click()

  if (isAndroid) {
    const allFields = await driver.driver.waitForElementsByClassName(
      driver.locators.getElementByName('textfield'),
      10000
    )
    await allFields[1].click().sendKeys(PASSWORD)
    await allFields[0].click().sendKeys(USERNAME)
  } else {
    const passField = await driver.driver.waitForElementByClassName(
      driver.locators.getElementByName('securetextfield'),
      10000
    )
    await passField.click().sendKeys(PASSWORD)
    const usernameField = await driver.driver.waitForElementByClassName(
      driver.locators.getElementByName('textfield'),
      10000
    )
    await usernameField.click().sendKeys(USERNAME)
  }
  await driver.driver.hideDeviceKeyboard('Done')
  if (isAndroid) {
    const logInButton = await driver.findElementByClassName(driver.locators.button)
    await logInButton.click()
    const okButton = await driver.findElementByClassName(driver.locators.button)
    await okButton.click()
  } else {
    const logInButton = await driver.findElementByXPath(
      '//' + driver.locators.button + loginButtonElement
    )
    await logInButton.click()
    const continueButton = await driver.findElementByXPath(
      '//' + driver.locators.button + continueButtonAttribute
    )
    await continueButton.click()
  }
  const userNameLabel = await driver.findElementByXPath(
    '//' + driver.locators.getElementByName('label') + userNameLabelElement
  )
  const userName = await userNameLabel.text()
  expect(userName).to.equal(USER_NAME, 'Not logged with the same user')
})
```

To be able to execute our tests both on Android and iOS platforms we have to use different xpath selectors. Here comes in handy `driver.locators.getElementByName("textfield")` function from the plugin. It returns the native class of the element depending on the platform and platform's version by accepting as parameter the name of the element of type string. The list of all elements can be find in [locators.ts](https://github.com/NativeScript/nativescript-dev-appium/blob/master/lib/locators.ts) file of the plugin. The last part needed to assemble our xpath selector is some distinguishing property so we are sure using the right UI element. This can be obtained by using [Appium desktop app](http://appium.io/downloads.html) to inspect the visual tree of our app and pick a proper one.

Once we have our UI elements selectors ready it is time for the driver to find them in the visual tree so we can further manipulate and assert them. It is worth mentioning that we should use accessibility ID as a preferable selector where possible `driver.findElementByAccessibilityId(FACEBOOK_BUTTON)`, but in most cases this is not an option and we use text `driver.findElementByText(pickSingleButtonText, SearchOptions.contains);`, xpath `driver.findElementByXPath("//" + driver.locators.button + loginButtonElement)` or class name `driver.findElementByClassName(driver.locators.button)`.

In some scenarios we might need to use any of the [wd](https://www.npmjs.com/package/wd) functions, for example `hideDeviceKeyboard()`. Then the `driver` property come to help which gives us that ability `await driver.driver.hideDeviceKeyboard("Done");`.

### Execution

It is time for the fun part - test execution. Before we get to the command that will run our tests we will have to add the desired configuration to our capabilities [appium.capabilities.json](https://github.com/NativeScript/nativescript-facebook/blob/master/appium.capabilities.json). By installing the plugin a default capabilities file will be provided which can be further enriched and repositioned but more about this in [nativescript-dev-appium's README](https://github.com/NativeScript/nativescript-dev-appium#custom-appium-capabilities). In our NativeScript Facebook plugin we will use two of the defined capabilities - for Android 6.0 and iOS 10.0 emulator/simulator. These capabilities are a set of keys and values sent to the Appium server to tell the server what kind of automation session we are interested in starting up. For example, if we set `platformName` to `Android` Appium will initiate Android session. The full list can be find [Appium's documentation](https://appium.io/slate/en/master/?javascript#appium-server-capabilities).

In order to execute the tests for those environments we will use the command for local execution. Before that we have to navigate to `demo` folder.

> **NOTE**: Before running the tests we have to build our app for each platform `ns build android` and `ns build ios`. Additionally, we have to be sure that the same emulator and simulator described in the capabilities we use are available and running on our system.

```
npm run e2e -- --runType android23
```

```
npm run e2e -- --runType sim103iPhone6
```

As you can see, we execute a npm script `npm run e2e` that comes out-of-the-box when we install [nativescript-dev-appium](https://github.com/NativeScript/nativescript-dev-appium) plugin. The rest of the command is just [options configuration](https://github.com/NativeScript/nativescript-dev-appium#options).

### Continuous Integration

NativeScript Facebook plugin is based on [nativescript-plugin-seed](https://github.com/NativeScript/nativescript-plugin-seed). Therefore, it already has `.travis.yml` file which eases our CI in [Travis CI](https://travis-ci.org/). We will only have to add a new stage for our UI tests and tweak it a little. In this section we will discuss only the changes that remain to be done, but you can find more information about the rest of the [.travis.yml file](https://github.com/NativeScript/nativescript-facebook/blob/master/.travis.yml) in [Ensure Plugins Quality]({% slug ensure-plugins-quality %}) article.

We use [Sauce Labs](https://saucelabs.com/) cloud based platform to run our UI tests at. It is free for open source projects.

There are two basic changes we have to do before the integration becomes a reality. The first is to upload our application package to Sauce Labs storage as our tests require it. This is done using a `curl` request in the `Build` stage respectively for iOS and Android.

> **NOTE**: Requests depend on `SAUCE_USER` and `SAUCE_KEY` environment variables that have to be [added in Travis CI](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings) in advance. You can obtain them as described in [Sauce Labs documentation](https://wiki.saucelabs.com/display/DOCS/The+Sauce+Labs+Account+Profile+User+Interface).

```yml
- stage: "Build"
...
script:
        ...
    - "curl -u $SAUCE_USER:$SAUCE_KEY -X POST -H 'Content-Type: application/octet-stream' $ANDROID_SAUCE_STORAGE --data-binary @$ANDROID_PACKAGE_FOLDER/$ANDROID_PACKAGE"
- os: osx
     ...
      script:
        ...
        - cd $IOS_PACKAGE_FOLDER && zip -r $IOS_PACKAGE demo.app
        - "curl -u $SAUCE_USER:$SAUCE_KEY -X POST -H 'Content-Type: application/octet-stream' $IOS_SAUCE_STORAGE --data-binary @$IOS_PACKAGE_FOLDER/$IOS_PACKAGE"

```

For iOS, we have to zip any `*.app` package before uploading it to Sauce Labs storage `cd $IOS_PACKAGE_FOLDER && zip -r $IOS_PACKAGE demo.app`.

The second change is adding our UI tests stage.

```yml
- stage: "UI Tests"
      env:
      - Android="23"
      language: node_js
      os: linux
      node_js: "8"
      script:
        - npm i -g appium
        - cd demo && npm i
        - travis_retry npm run e2e -- --runType android23 --sauceLab --reuseDevice --appPath $ANDROID_PACKAGE
    - os: linux
      env:
        - iOS="10"
      language: node_js
      node_js: "8"
      script:
        - npm i -g appium
        - cd demo && npm i
        - travis_wait travis_retry npm run e2e -- --runType sim103iPhone6 --sauceLab --reuseDevice --appPath $IOS_PACKAGE
```

It takes care to setup two Linux machines and executes the tests in Sauce Labs using the proper [command](https://github.com/NativeScript/nativescript-dev-appium#options) for each platform:

```
npm run e2e -- --runType android23 --sauceLab --reuseDevice --appPath $ANDROID_PACKAGE
```

and

```
npm run e2e -- --runType sim103iPhone6 --sauceLab --reuseDevice --appPath $IOS_PACKAGE
```

#### See Also

- [Unit Tests]({% slug plugin-unit-tests %})
- [Ensure Plugins Quality]({% slug ensure-plugins-quality %})

## Android Plugins Infrastructure

> **IMPORTANT:** The CLI command `ns library add` is no longer supported. Use plugins to work with external libs.

A NativeScript plugin is any npm package, published or not, that exposes a native API via JavaScript and consists of the following elements. The plugin must have the directory structure, described in the [Directory Structure](#directory-structure) section.

### Create a Plugin

If the NativeScript framework does not expose a native API that you need, you can develop a plugin which exposes the required functionality. When you develop a plugin, keep in mind the following requirements.

- The plugin must be a valid npm package.
- The plugin must expose a built-in native API or a native API available via custom native libraries.
- The plugin must be written in JavaScript or TypeScript and must comply with the CommonJS specification. If written in TypeScript, make sure to include the compiled `JavaScript` file in your plugin.
- The plugin directory structure must comply with the specification described below.
- The plugin must contain a valid `package.json` which complies with the specification described below.
- If the plugin requires any permissions, features or other configuration specifics, they must be added in the `app/App_Resources/Android/AndroidManifest.xml`.
- If the plugin depends on native libraries, it must contain a valid `include.gradle file`, which describes the dependencies.

#### Directory Structure

This is what an Android NativeScript plugin may include.

```
my-plugin/
├── package.json
├── MyModule1/
│   ├── index1.js
│   └── package.json
├── MyModule2/
│   ├── index2.js
│   └── package.json
└── platforms/
    ├── android/
		└── include.gradle
		└── MyLibrary.aar
		└── MyLibrary.jar
```

#### Android plugin elements

You can find more information on the common parts of the NativeScript plugins like the `package.json` and js modules [here]({% slug plugins-infrastructure %}).

- `platforms\android`: This directory contains any native Android libraries packaged as `*.jar` and `*.aar` packages. These native libraries can reside in the root of this directory or in a user-created sub-directory.
- `platforms\android\include.gradle`: This file modifies the native Android configuration of your NativeScript project such as native dependencies, build types and configurations. For more information about the format of `include.gradle`, see [include.gradle file]({% slug gradle-hooks%}#plugins-includegradle).
- `platforms\android\MyLibrary.aar` is an Android library. You can read more about the `.aar` format [here](http://tools.android.com/tech-docs/new-build-system/aar-format).
- `platforms\android\MyLibrary.jar` is a library. You can read more about the `.jar` format [here](<https://en.wikipedia.org/wiki/JAR_(file_format)>)

#### Native Android plugin using V8 API

If for any reason you want to use V8 API in your plugin, you will need to specify that explicitly in the plugin's `package.json`, so that the respective symbols be exposed for use when the plugin is installed inside a NativeScript application.

```JSON
{
    "name": "plugin-name",
    "version": "0.1.0",
    ...
    "nativescript": {
        "platforms": {
            ...
        },
        "useV8symbols": true /* exposes V8 API for plugin */
    },
    ...
    // omitted for brevity
}
```

### Rules of thumb

We are concentrating on the "_native_" part of the plugin. When we talk about "_native_" part of the plugin we mean the `platforms/android` folder and its content.

#### What do I use?

When you want to create an Android NativeScript plugin and you want to add some "_native_" functionality there are two main options. Use a `.jar` file, or use a `.aar` file. Keep in mind that `.aar` files are the recommended library form for NativeScript plugins. When we use a library in the form of a `.jar` file we want some functionality that doesn’t need any resources, just native implementation of some logic we need. For example, if we need to make some complicated calculation and there is an SDK in the form of a `.jar` file and requires **no** UI elements, we could use that library. This would only provide a couple of classes with some logic in them and **should not** declare activities or any other types of application components (http://www.tutorialspoint.com/android/android_application_components.htm).

- In what cases should we prefer `.jar` files?

  - when we don’t have any need for using android application components
  - when we want to add classes with logic in them, we can use from our js user code.
  - when we don’t need resources connected to the `.jar` file like drawables, layouts, etc.

- In what cases should we prefer `.aar` files:
  - when we want to use some kind of an interactive SDK like Facebook, Dropbox, YouTube, etc.
  - when we need to use application components like activities, services, resources, etc.

> **IMPORTANT:** The recommended way of using AAR files inside a NativeScript plugin is to add it as a dependency in the `include.gradle` file inside the `platforms/android` folder of the plugin.

#### Plugin migration.

Let's say you have a plugin with the following structure:
**Case 1:**

```
my-plugin/
├── package.json
├── MyModule1/
│   ├── index1.js
│   └── package.json
├── MyModule2/
│   ├── index2.js
│   └── package.json
└── platforms/
    ├── android/
		└── AndroidManifest.xml
		└── MyLibrary.aar
```

**What to do to migrate this plugin?**
Take all the plugin related info from the `AndroidManifest.xml` and put it in the MyLibrary.aar's `AndroidManifest.xml`. You can do that one of two ways:

- Unpack MyLibrary.aar file and update its `AndroidManifest.xml`.
- Open `.aar` source project and update its `AndroidManifest.xml`, then rebuild `.aar` file.

**Case 2:**

```
my-plugin/
├── package.json
├── MyModule1/
│   ├── index1.js
│   └── package.json
├── MyModule2/
│   ├── index2.js
│   └── package.json
└── platforms/
    ├── android/
		└── AndroidManifest.xml
		└── MyLibrary.jar
```

**What to do to migrate this plugin?**
Take all the plugin related info from the `AndroidManifest.xml` and put it in `app\App_Resources\Android\AndroidManifest.xml`.

**Case 3:**

```
my-plugin/
├── package.json
├── MyModule1/
│   ├── index1.js
│   └── package.json
├── MyModule2/
│   ├── index2.js
│   └── package.json
└── platforms/
    ├── android/
		└── AndroidManifest.xml
		└──	res/
		└── MyLibrary.jar
```

**What to do to migrate this plugin?**
Create a new Android Studio project and migrate the code to an `.aar` file. The `.aar` file is a self contained project by itself so it contains `res/` folder, `AndroidManifest.xml` and source files.

## Using Native Libraries in iOS

NativeScript for iOS lets you include native libraries and consume their APIs from JavaScript.

For iOS, three types of library packages are available:

1. Shared framework (`MyFramework.framework`): An ordinary shared library wrapped in a framework. Typically, contains the required `module.modulemap` file.
2. Static framework (`MyFramework.framework`): An ordinary static library wrapped in a framework. Typically, doesn't contain the required `module.modulemap` file and you need to add it manually.
3. Static library (`libMyLib.a`): Contains a headers folder (usually called `include`) with `.h` files.

You can use any of the following approaches to add and use a native library in your project:

1. (Recommended) [Create a plugin containing a CocoaPod `Podfile`.](./cocoapods.md)
2. [Create a plugin containing the already built binary and headers.](./plugin-reference.md)
3. (Not recommended) Don't create a plugin and manually change the Xcode project located in `{your-app}/platforms/ios/`.

To consume a native library the iOS Runtime has to know about the following resources:

1.  Binary file (e.g `libMyLib.a`, `MyLib`).
2.  Header files and `module.modulemap` file describing a clang module and specifying which headers are part of the module.

The only reason the runtime needs header files is to generate metadata. The metadata generator knows which headers have to be parsed because of the supplied `module.modulemap` file. Both the headers and `module.modulemap` file must reside in a folder which is part of the header search paths of the Xcode project (`{your-app}/platforms/ios/{your-app}.xcodeproj`). You can find a sample `module.modulemap` file [here](https://github.com/NativeScript/ios-runtime/blob/master/tests/TestFixtures/module.modulemap). You can find more information about CLANG modules, module maps and their synthax here: https://clang.llvm.org/docs/Modules.html

### Shared Frameworks

Shared frameworks are the best option because only they have a well-known structure and a `module.modulemap` file which eliminates the need for manual work. [NativeScript plugins](./plugin-reference.md) support shared frameworks and you can add them with CocoaPods.

With CocoaPods, you can remove the framework (with all the binary and header files in it) from your plugin repository and keep only a single `Podfile`. You also get all the benefits of using a package manager.

If there is no CocoaPod for the current library you can still use a plugin, but the framework must be dropped in the plugin folder (`{your-plugin}/platforms/ios/{MyFramework}.framework`) and you lose all the benefits of using a package manager.

- Pros

1. Can be included by NativeScript plugin.
2. Can be included in the plugin by a `Podfile` (if a `pod` for the library exists).
3. There is no need to manually edit the library before adding it.
4. There is no need to manually edit the app after adding the library.

- Cons

* Shared frameworks can be used only in iOS 8 and above. This limitation is valid for pure native applications, too. If you are targeting iOS versions lower than 8.0 you must use static frameworks.

### Static Frameworks

Most of the static frameworks don't contain `module.modulemap` file, so you have to add the file manually. To include a static framework in a plugin grab a prebuilt version of the framework, add a `module.modulemap` file in it and drop it in your `{plugin-path}/platforms/ios/` folder.

> In case you cannot modify the native framework (for example when it comes from a Pod) and must define its `module.modulemap` somewhere else in your plugin, take a look at the following sample for guidance: https://github.com/NativeScript/plugin-ios-modulemap-sample

#### Pros

1. Can be included by NativeScript plugin.
2. There is no need to manually edit the app after adding the library (but you have to manually edit the framework in order to add `module.modulemap` file).

#### Cons

1. Manual changes of the framework are required (add `module.modulemap` file).
2. Only Objective-C APIs are exposed (no C functions and C constants) from static frameworks. To work around this limitation, you can manually edit the Xcode project file. However, this workaround is not recommended.

### Static Libraries

The NativeScript CLI supports static libraries coming from plugins but the binary and headers must be ordered in a specific folder structure described in details [here](./plugin-reference.md). This is required because the NativeScript CLI generates a `module.modulemap` file for the library which works most of the time. However, in some cases you might need to wrap the library in a static framework with a `module.modulemap` file.

> If you cannot wrap your static library in a static framework with a `module.modulemap`, in cases such as when using Cocoapods, take a look at the following sample for guidance: https://github.com/NativeScript/plugin-ios-modulemap-sample

- Pros

1. Can be included by NativeScript plugin.
2. It works without manual changes but not in all cases.
3. It is trivial to wrap a static library in a static framework. Just put all the headers and binary files in the proper folder structure, add a `module.modulemap` and you have a static framework which works in all cases.

- Cons

1. Can't be included by a `Podfile`.
2. In some cases, you must add a `module.modulemap` file manually.
3. You must wrap the library in a static framework if the automatic `module.modulemap` file generation does not succeed.
4. Only Objective-C APIs are exposed (no C functions and C constants) from static libraries. To work around this limitation, you can manually edit the Xcode project file. However, this workaround is not recommended.

NativeScript plugins also support merging of `.plist` files. If a library requires changes in `Info.plist`, the plugin can handle that without you touching the `/platforms/ios/` folder. However, there are libraries which require more complex manipulations of the Xcode project file, which can't be achieved with plugins. In these cases, the only solution is to do it manually. Keep in mind that after updating the iOS platform, your manual changes might be lost.

### APIs written in Swift

CocoaPod libraries written in Swift can be called from NativeScript only if they are exposed to Objective-C. This means that the following conditions have to be met:

1. The methods and types must have `public` or `open` access. For more information on Access Control read [this article](https://docs.swift.org/swift-book/LanguageGuide/AccessControl.html)
2. Classes need to inherit from `NSObject` or some other Objective-C class in order to be exposed. Refs [Swift Migration Guide](https://developer.apple.com/documentation/swift/migrating_your_objective-c_code_to_swift)
3. Starting from Swift 4.0, types and methods have to be explicitly marked with `@objc` or `@objcMembers` attributes. You can read more about them [here](https://docs.swift.org/swift-book/ReferenceManual/Attributes.html).

> **NOTE:** To be able to override a Swift method in its JavaScript inheritor it _**MUST**_ use the message dispatch calling mechanism. This is enforced by marking the method with the [`dynamic` keyword](https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID381).

> **NOTE:** You can avoid adding `@objc` attribute for every member you'd like to expose by setting `SWIFT_SWIFT3_OBJC_INFERENCE` to `On`. This has the drawback that it will cause deprecation warnings during build and deprecation logs at runtime. Sample `Podfile`:

```Ruby
....
post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['SWIFT_SWIFT3_OBJC_INFERENCE'] = 'On'
    end
  end
end
```

### Conclusion

As a rule of thumb, avoid manual changes to the Xcode project file in the `/platforms/ios` folder. Always try to use CocoaPods with NativeScript plugins and shared frameworks. The second best option is a prebuilt static framework with manually added `module.modulemap` file, wrapped in a NativeScript plugin. Use the other options only as a last resort after making sure there is no better solution.

### Troubleshooting

#### Metadata in human readable format

Starting with version 1.4 of NativeScript for iOS, you are able to generate [debug metadata](../core-concepts/ios-runtime/Overview#metadata) and [TypeScript declarations](https://typescript.codeplex.com/wikipage?title=Writing%20Definition%20%28.d.ts%29%20Files) for third-party libraries. This way you are able to see exactly what APIs are exposed to JavaScript.

Executing the following command from the root of your NativeScript app produces a `metadata` folder with a `.yaml` file for each Clang module:

```shell
$ TNS_DEBUG_METADATA_PATH="$(pwd)/metadata" ns build ios [--for-device] [--release]
```

#### Generating TypeScript typings

Executing the following command from the root of your NativeScript app produces a `typings` folder with a `.d.ts` file for each Clang module:

```shell
$ TNS_TYPESCRIPT_DECLARATIONS_PATH="$(pwd)/typings" ns build ios [--for-device] [--release]
```

If you have downloaded the [documentation set for iOS](https://developer.apple.com/library/ios/recipes/xcode_help-documentation_preferences/DownloadingandInstallingXcodeComponents/DownloadingandInstallingXcodeComponents.html), the command above will also include brief description in the form of a comment above every symbol in the generated `typings` (currently not supported for Xcode 8+). Most IDEs which support typescript IntelliSense will make use of these comments. Furthermore, you can generate structured documentation from these comments with tools like [TypeDoc](http://typedoc.io).

#### Metadata generator's parsing errors and warnings

The `stderr` output of the metadata generator (including all errors and warnings emitted by the Objective-C parser) is redirected
to a separate log file. It is located in **`platforms/ios/build/<configuration>-<target>/metadata-generation-stderr-<arch>.txt`**
under the main project dir.

The reason behind this decision is that sometimes projects or plugins may have dependencies which are not
designed to be fed to an Objective-C compiler. When attempting to generate the metadata for such projects, the metadata
generator's error output would pollute Xcode's build output with lines which would look like compilation errors/warnings and
would confuse both users and IDE parsers that the compiler emitted them. One example for such library is the [LevelDB CocoaPod](https://cocoapods.org/pods/leveldb-library)
which is meant to be used in C++ context only. It is included in all projects using the [NativeScript Firebase plugin](https://www.npmjs.com/package/nativescript-plugin-firebase)
because it's a dependency of the [FirebaseDatabase CocoaPod](https://cocoapods.org/pods/FirebaseDatabase). Generating metadata
from this CocoaPod is expected to fail as the iOS Runtime doesn't parse and expose C++ entities to JS. So it's preferable to
keep all these errors away from the actual application build output.

> **IMPORTANT:** In cases where the metadata for some native entities is missing, this log file can turn out to be invaluable
> in tracking down the reasons. It should be the first place to start looking for clues about what might have gone wrong.
>
> Sometimes the reason may be an incorrect `#include` statement. In such cases, in order to see the real error you will
> also have to run the metadata generator in [strict includes mode](#enabling-strict-includes-mode)

#### Enabling strict includes mode

Starting with version 5.4 of {N} you can set the `TNS_DEBUG_METADATA_STRICT_INCLUDES` environment variable to diagnose the reasons for missing
metadata entities when no errors related to their respective source files can be found in [metadata generator's *stderr* log]
(#metadata-generators-parsing-errors-and-warnings).

When this setting is enabled, `#include` errors will be caught and logged in the _stderr_ output **_but some Pod libraries might cause significantly less metadata
being parsed and generated, so it really should be used only when debugging issues with missing metadata_**.

```shell
$ TNS_DEBUG_METADATA_STRICT_INCLUDES="true" ns build ios [--for-device] [--release]
```
