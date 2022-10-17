---
title: Updating
---

## Updating

To upgrade a NativeScript application you need to upgrade several things: NativeScript CLI Tooling, the iOS and Android runtimes and the `@nativescript/core` module. In the steps below you will see how to do this.

```cli
npm install -g nativescript
```

#### Upgrading the application

You should execute the **update** command in the root folder of your project to upgrade it with the latest versions of iOS/Android runtimes and cross-platform modules.

:::tip Note

The **update** command is introduced in version 2.4 of NativeScript CLI. You should update NativeScript CLI before using this command.

:::

```cli
ns update
```

In order to get the latest development release instead, pass **next** as argument:

```cli
ns update next
```

You can also switch to specific version by passing it to the command:

```cli
ns update 8.0.0
```

::: tip Note
The command `ns update` is updating the `@nativescript/core`, `@nativescript/webpack`, and the runtimes (`@nativescript/android`and`@nativescript/ios`). The command is combining the next three commands in this article (`ns platform add`, `npm i --save @nativescript/core`and`npm i @nativescript/webpack --save-dev`).

:::

::: warning Important
When using the `--configs` flag, any previous configuration will be overwritten and lost. Consider saving any custom code that you have introduced in your `webpack.config.js` and reapplying the code after using the `--configs` flag.
:::

#### Upgrading platforms

Follow those steps in order to get the latest versions of Android and/or iOS runtimes. Navigate to the root level folder where your project is, and then if you are working on a Android project, type:

```cli
ns platform remove android
ns platform add android
```

and/or (if you are working on a iOS version on a Mac):

```cli
ns platform remove ios
ns platform add ios
```

#### Upgrading @nativescript/core

The cross-platform modules are available as a npm package named [@nativescript/core](https://www.npmjs.com/package/@nativescript/core).

In order to use them in your project, you will have to explicitly install the package, for example (assuming you are still in your main app project folder from the steps above):

```cli
npm install @nativescript/core@latest --save
```

This installs the **@nativescript/core** package to the node_modules folder and adds it as a dependency to the package.json of the project.

::: warning Important
The `ns create` command will create a new project, add the **@nativescript/core** package as a dependency to its package.json and install it. So each new project you create will have the **@nativescript/core** package installed and you do not have to install it explicitly.
:::

Another place to find **@nativescript/core** package is [NativeScript Releases](https://github.com/NativeScript/NativeScript/releases/), where you can find a collection of the available @nativescript/core-\*.tgz packages for every release. You can download a selected release and install it by running: `npm install <path to @nativescript/core-*.tgz> --save`.

#### Upgrading Angular dependencies

The Angular plugin is available as an npm package named [@nativescript/angular](https://www.npmjs.com/package/@nativescript/angular). To update the version of the plugin and the related dependency, the package should be explicitly installed, and the related Angular dependencies should be updated accordingly. To ease the update process, the plugin comes with an automated script `update-app-ng-deps` located in `<project-folder/node_modules/.bin>` folder.

```cli
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

```cli
npm uninstall -g nativescript
```

- Install the latest development version of NativeScript CLI:

```cli
npm install -g nativescript@next
```

- Edit the package.json file in your project and replace @nativescript/core, @nativescript/android and @nativescript/ios versions with `next`:

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

```cli
ns platform add ios@next
ns platform add android@next
ns plugin add @nativescript/core@next
```

- Run the `npm install` command to update the node modules:

```cli
cd <your-project-folder>
npm install
```

You are now ready to use the latest development version of NativeScript.

#### Building the source code

##### Reasoning

<!-- TODO: fix links -->

Building the source code is essential when one wants to contribute to an open source project. The statement is applicable for NativeScript as well. According to the [Contribution Guidelines](https://github.com/NativeScript/NativeScript/blob/master/tools/notes/CONTRIBUTING.md), suggesting a fix involves testing the latest code.

#### Behind the curtains of running a NativeScript application

1. `npm install nativescript -g` : Node Package Manager (npm) downloads and installs the [NativeScript CLI](https://www.npmjs.com/package/nativescript).
2. `ns create [AppName]` : The NativeScript CLI downloads the [Hello-World template](https://www.npmjs.com/package/@nativescript/template-hello-world) and unpacks it to a folder named after the app name you choose. At the same time, the CLI installs the [NativeScript cross-platform modules](https://www.npmjs.com/package/@nativescript/core). As a result, your application folder now contains an `app` folder, holding the files of your application ([source code](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-hello-world)) and a `node_modules` folder, having the cross-platform modules ([source code](https://github.com/NativeScript/NativeScript)).
3. `ns platform add android/ios` : The NativeScript CLI downloads the latest SemVer-compatible version of the specified runtime, unpacks it and applies transformations to the native (Android Studio or xCode) project (e.g., changes the project name).
4. `ns run android/ios` : The NativeScript CLI copies the files under the `app` folder to the `platforms/[android/ios]/.../app` folder following a specific logic so that these get used later by a native build tool (_gradle_/_xcode-build_). As a next step, the NativeScript CLI executes compilation, deployment and run commands of _gradle_ or _xcode-build_.
5. Any JavaScript code gets executed in a V8 or JavaScriptCore engine and embedded in the NativeScript runtimes. Each call to an actual native object gets marshalled via the runtimes to the underlying platform and vice-versa. The runtimes provide JavaScript handles to the native objects.

#### Contents of the NativeScript repo

The [NativeScript framework](https://github.com/NativeScript/NativeScript) is built using TypeScript. For that, one of the build steps is TypeScript compilation, which uses TypeScript declarations of the underlying native objects. These are really large files ([android17.d.ts](https://github.com/NativeScript/NativeScript/blob/master/packages/types-android/src/lib/android-17.d.ts) and [ios.d.ts](https://github.com/NativeScript/NativeScript/blob/master/packages/types-ios/src/lib/ios/ios.d.ts)). The TypeScript compilation with these two files loaded in memory takes a lot of time. To save development time and have as quick and stable feature output, the NativeScript team decided to keep several important applications inside the same repository so that all of them get compiled in a single pass.

Having said that, each subfolder of the [apps](https://github.com/NativeScript/NativeScript/tree/master/apps) subfolder of the repo represents a single application.

#### Building the repo

When the repo gets built, it outputs a bunch of packages (stripping the version- and extension- part of the filename for clarity):

- @nativescript/core : the package, containing the core modules. It gets distributed via [npm](https://www.npmjs.com/package/@nativescript/core).
- tns-sample-\* : contains some test/demo applications the team uses internally for testing.
- tns-template-\* : has templates that will get used once we have the [template-selection functionality](https://github.com/NativeScript/nativescript-cli/issues/374) implemented in the command-line interface.

The repo gets built via the commands:

```cli
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
`ns platform update android/ios --frameworkPath=[Path-to-Runtime-Package]`

#### Building the runtimes

As the NativeScript framework gets distributed via npm, the runtimes are also packed as npm packages. For consistency reasons, the native builds (gradle/xcode-build) are wrapped by grunt builds that do the job.

#### Building the Android runtime

The [android runtime](https://github.com/NativeScript/android-runtime) depends on the [android-metadata-generator](https://github.com/NativeScript/android-metadata-generator).

Provided you have all the dependencies set, the easiest way to have the Android runtime built is to clone the two repos to a single folder so that the two are sibling folders, `cd` into the `android-runtime` folder and run:

```cli
gradle packar -PwidgetsPath=./widgets.jar
```

The resulting @nativescript/android-x.x.x.tgz package will get created in the `dist` folder.

#### Building the iOS runtime

Follow the instructions on setting up the dependencies for building the [ios runtime](https://github.com/NativeScript/ns-v8ios-runtime) in the repository README and then run `grunt package`.

The build @nativescript/ios-x.x.x.tgx package will get created in the `dist` folder.
