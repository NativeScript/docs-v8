---
title: Performance
---

## Webpack/Bundle Optimizations

### Using Webpack to Bundle Your Code

JavaScript code and general asset bundling have been a member of the web developer toolbox for a long time. Tools like [Webpack](https://webpack.js.org) have been providing support for an enjoyable development experience that lets you assemble client-side code from various module sources and formats and then package it together. Most importantly, they allow for page load time optimizations that reduce or parallelize the number of requests a browser makes to the server.

Why bundle scripts in a mobile app though? Aren't all files stored on the local device, so requesting them should be faster than an HTTP request? Yes, that is the case, but bundling still has an essential place in mobile app optimizations:

- Fewer filesystem operations on app startup since all code is loaded from a single bundle file. Mobile file storage is not known for being very performant.
- Smaller code size. Bundlers traverse the module import graph and do not bundle unused modules. Not using that obscure feature in module X? Don't make your users pay for it then.
- Tree-shaking. With the advent of ECMAScript 2015 modules, we have new tools that allow stripping unused parts of big modules and further reduce our application size.

With NativeScript 6 and above, Webpack is the primary developer workflow and can't be disabled.

### Introducing Webpack

Webpack works by traversing your source tree starting from some "entry" modules and navigating through module imports. This makes it possible to collect just modules that are used in your program. Webpack is very extensible - you can customize every step of the bundling process and add support for all sorts of asset generation and manipulation procedures.

### Installation and Configuration

With NativeScript 6 and above, the framework is automatically adding `@nativescript/webpack` (as a `devDependency`) and creating a default `webpack.config.js` configuration file. The Webpack application bundling and developer workflow are enabled by default, and no further setup steps are required.

> **Note:** For projects created with an older version of NativeScript (version 5.x.x and prior), you can run the `ns migrate` command to add the Webpack dependencies and configuration files. Detailed instructions for installing, configuring and using Webpack with NativeScript CLI 5.x and below can be found [here](https://github.com/NativeScript/docs/blob/5.4/docs/performance-optimizations/bundling-with-webpack.md)

### How @nativescript/webpack Works

Installing the plugin adds a `webpack.config.js` file which contains sensible defaults, but it is designed to be as readable and easy to modify as possible.

> **Note**: In case you need to update your project dependencies or regenerate the configuration file, you can do that by running the `update-ns-webpack` script that comes with the plugin:

```cli
./node_modules/.bin/update-ns-webpack --configs --deps
```

The **--configs** flag will update the `webpack.config.js` and the **--deps** flag will update the related Webpack dependencies.

### Webpack Resources

Bundling JavaScript code can get complex quickly, and encountering Webpack for the first time can be daunting. A full introduction to webpack and related technologies is beyond the scope of this article, and we recommend the following resources:

- [Introduction](https://webpack.js.org/guides/getting-started/)
- [Tutorial](https://webpack.js.org/concepts/)
- [Webpack CLI Reference](https://webpack.js.org/api/cli/#components/sidebar/sidebar.jsx)
- [Using Webpack with older NativeScript versions (5 and below)](https://github.com/NativeScript/docs/blob/5.4/docs/performance-optimizations/bundling-with-webpack.md)

### Usage

#### NativeScript CLI commands

- **Run with Webpack and HMR**

The Webpack bundling and Hot Module Replacement are enabled by default. That means that the known CLI commands like `run` and `build` won't need any additional flags.

```cli
ns run <platform>
```

or

```cli
ns build <platform>
```

Both commands will execute your project with Webpack and HMR enabled.

> **Note**: If you need to disable the HMR experience, you can achieve that by adding the `--no-hmr` flag. With NativeScript 6.0.0 and above, Webpack is the primary developer workflow and can't be disabled.

- **Pass Environment Variables**

You can also provide environmental variables to the Webpack build:

```cli
ns build android --env.development --env.property=value
```

They can be accessed through the `env` object in the Webpack configuration:

```JavaScript
// webpack.config.js
module.exports = env => {
    console.dir(env); // { development: true, property: 'value' }
}
```

### Publishing Application

Create a bundled version of the application for Android in release with the known release command - no additional flags are needed:

```cli
ns build android --release \
    --keyStorePath ~/path/to/keystore \
    --keyStorePassword your-pass \
    --keyStoreAlias your-alias \
    --keyStoreAliasPassword your-alias-pass
```

Once this is finished, proceed with uploading the output .apk file in the `<project>/platforms/android/app/build/outputs/apk` directory on Google Play store.

You can build a bundled version of the application for iOS in release with this script:

```cli
ns build ios --release --forDevice --teamId TEAM_ID
```

Note that if `--teamId` flag is emitted, the NativeScript CLI will prompt for team ID during the build process.

Once the release build is ready, you have two options:

- Open `<project/platforms/ios/<project>.xcodeproj>` (or `<project/platforms/ios/<project>.xcworkspace>` if present) in Xcode to configure project signing and upload the archive to App Store. This is the recommended option.
- Specify your development team in `<project>/app/App_Resources/iOS/build.xcconfig` from the command line and execute

```cli
ns publish ios --ipa ipa-file-path-here
```

More options for publishing an iOS application can be found in the ["Publishing for iOS article"](https://docs.nativescript.org/publishing/publishing-ios-apps) article.

> If there are multiple mobile provisioning profiles for the selected development team available on the machine, it is not guaranteed that Xcode will choose the desired one and publishing using the command line will be successful. Therefore, in such cases, we recommend manually configuring and uploading the project from Xcode.

## Optimizations

### Uglify.js

The Webpack configuration includes the [`uglifyjs-webpack-plugin`](https://github.com/webpack-contrib/uglifyjs-webpack-plugin). The plugin performs code minification and improves the size of the bundle.
It is disabled by default because it slows down the building process during development. You can enable it by providing the `--env.uglify` flag:

```cli
ns build android|ios --env.uglify
```

### Code Cache

Code Cache is a feature of [Google's V8 engine](https://v8.dev/). Since NativeScript uses V8 for the JS engine on Android and on iOS we can leverage the [code caching feature](https://v8.dev/blog/code-caching).

Your NativeScript application should contain a `nativescript.config.ts` file for project configuration. To enable code caching, add the following to your default configuration:

```typescript
import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'com.company.app',
  main: 'app.js',
  appResourcesPath: 'App_Resources',
  webpackConfigPath: 'webpack.config.js',
  ios: {
    discardUncaughtJsExceptions: true
  },
  android: {
    discardUncaughtJsExceptions: true,
    codeCache: true,
    v8Flags: '--nolazy --expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig
```

## Inspecting Bundles

Bundles are generated in the platform output folders. Look for the `bundle.js` and `vendor.js` files in your `platforms/android/...` and `platforms/ios/...` "app" folders. You could change the destination directory by editing your configuration.

## Generating Webpack Report

The default webpack configuration includes the [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) plugin. To generate a report provide the `--env.report` flag:

```cli
ns build android|ios --env.report
```

The report is generated inside `your-project/report`.
The `report/report.html` page shows the application chunks.

![Android report](https://github.com/NativeScript/docs/raw/master/docs/img/webpack/android-report.png)

For analyzing the dependency graph between the modules, use [webpack.github.ui/analyze](http://webpack.github.io/analyse/) and open the `stats.json` file.

## Recommendations for Plugin Authors

Most third-party packages are problem-free and get picked up by Webpack without any issues. Some libraries though require a bit of tweaking. When you encounter a library that does not get recognized by your Webpack configuration, please open up an issue on that library's GitHub repository.

### Referencing Platform-specific modules from "package.json"

This is the most common problem with third-party plugins. Most plugins provide two platform-specific implementations stored in modules named like `my-plugin.android.js` and `my-plugin.ios.js`. The `package.json` file for the plugin looks like this:

```JSON
{
    "main": "my-plugin.js"
}
```

Webpack reads the `package.json` file and try to find a `my-plugin.js` module and fails. The correct way to reference a platform-specific module would be to remove the `.js` extension:

```JSON
{
    "main": "my-plugin"
}
```

That allows Webpack to reference `my-plugin.android.js` or `my-plugin.ios.js` correctly.

## Emitting Helper Functions in TypeScript Plugins

The TypeScript compiler implements class inheritance, decorators and other features using a set of helper functions that get emitted at compile time. NativeScript ships with its implementations of those helpers to allow features like extending platform native classes. That is why you need to configure the TypeScript compiler **NOT** to emit helpers. The easiest way is to edit the `tsconfig.json` file and set the `noEmitHelpers` option to `true`:

```JSON
{
    "compilerOptions": {
        ...
        "noEmitHelpers": true,
        ...
    },
    ...
}
```

## Bundling Background Workers

When the application is implementing workers, some additional steps are required to make the project Webpack compatible.
Check out the [`nativescript-worker-loader`](https://github.com/nativescript/worker-loader) and the [detailed documentation article about using workers](../core-concepts/multithreading-model).

## Lazy Loading

### What is Lazy Loading (and why you should use it)?

Lazy loading is an Angular technique that allows you to load feature components asynchronously when a specific route is activated. This can add some initial performance during application bootstrap, especially if you have many components with heavy UI and complex routing.

Use lazy loading to decrease the startup time of your NativeScript application.

### How does Lazy Loading work?

With lazy loading, the application is split into multiple modules. There is the main module which in the context of NativeScript application will hold the root components (usually called `app.module.ts` located in the `app` folder) and the featured modules which will be loaded "on demand" after user interaction. Each module can define multiple components, services, and routes.

<!-- TODO: make nicer images -->
<img src="https://github.com/NativeScript/docs/raw/master/docs/img/performance/lazy.png">

### Implementing Lazy Loading in NativeScript

In the following sections, we will create a simple Angular application using the [Hello World template](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-hello-world-ng) which by default has no lazy loaded modules. Then, we will add the featured lazy loaded **HomeModule**.

- Create the Hello World Angular template

  ```cli
  ns create my-app --ng
  cd my-app
  ```

- Add a new folder to hold your `FeatureModule` along with all the components, services, routing tables of the module.

  A good practice is to use the name of the module as the name of the containing folder. For example, create a `feature` folder and add `feature.module.ts` and the needed components that will be part of the module (in our case `feature.component.ts` with the respective HTML and CSS files).

  ```
  my-app
  --app
  ----feature
  ------feature.component.css
  ------feature.component.html
  ------feature.component.ts
  ------feature.module.ts
  ------feature.routing.ts
  ------feature.service.ts
  ```

- Create the routing table and the lazily loaded module

  _app/feature/feature.routing.ts_

  ```TypeScript
  // app/feature/feature.routing
  import { NgModule } from "@angular/core";
  import { Routes } from "@angular/router";
  import { NativeScriptRouterModule } from "nativescript-angular/router";
  import { FeatureComponent } from "./feature.component";

  export const routes: Routes = [
      {
          path: "",
          component: FeatureComponent
      }
  ];

  @NgModule({
      imports: [NativeScriptRouterModule.forChild(routes)],  // set the lazy loaded routes using forChild
      exports: [NativeScriptRouterModule]
  })
  export class FeatureRoutingModule { }
  ```

  _app/feature/feature.module.ts_

  ```TypeScript
  // app/feature/feature.module.ts
  import { NativeScriptCommonModule } from "nativescript-angular/common";
  import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
  import { FeatureComponent } from "./feature.component"; // Import all components that will be used in the lazy loaded module
  import { FeatureService } from "./feature.service"; // Import all services that will be used in the lazy loaded module
  import { FeatureRoutingModule } from "./feature.routing"; // import the routing module

  @NgModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
          NativeScriptCommonModule,
          FeatureRoutingModule
      ],
      declarations: [FeatureComponent], // declare all components that will be used within the module
      providers: [ FeatureService ] // provide all services that will be used within the module
  })
  export class FeatureModule { }
  ```

- Add the lazily loaded module to the application routing table

  _app/app.routing.ts_

  ```TypeScript
  // app/app.routing.ts
  import { NgModule } from "@angular/core";
  import { NativeScriptRouterModule } from '@nativescript/angular';
  import { Routes } from "@angular/router";

  import { ItemsComponent } from "./item/items.component";
  import { ItemDetailComponent } from "./item/item-detail.component";

  const routes: Routes = [
      { path: "", redirectTo: "/items", pathMatch: "full" },
      { path: "items", component: ItemsComponent },
      { path: "item/:id", component: ItemDetailComponent },
      { path: "feature", loadChildren: () => import("./feature/feature.module").then(m => m.FeatureModule) }, // lazy loaded module
  ];

  @NgModule({
      imports: [NativeScriptRouterModule.forRoot(routes)],
      exports: [NativeScriptRouterModule]
  })
  export class AppRoutingModule { }
  ```

- Navigating to lazily loaded module

  With all of the above steps implemented, you can start navigating to the default path of the lazily loaded module.

  _app/item/items.component.html_

  ```HTML
  <!-- app/item/items.component.html -->
  <StackLayout class="page">
      <!-- navigate to the default path in the lazy loaded module -->
      <Label text="Go to my Feature" [nsRouterLink]="['/feature']" class="h2 m-10"></Label>

      <ListView [items]="items" class="list-group">
          <ng-template let-item="item">
              <Label [nsRouterLink]="['/item', item.id]" [text]="item.name"
                  class="list-group-item"></Label>
          </ng-template>
      </ListView>
  </StackLayout>
  ```

### Benefits from using Lazy Loading

A real-life NativeScript application (like the [Angular SDK Examples](https://github.com/NativeScript/nativescript-sdk-examples-ng)) can have hundreds of different components. Each component may have its route, services, and multiple featured components. Using lazy loading modules improves the startup time dramatically (in the case of SDK Examples app with up-to 5x better startup timings). Instead of having to load the hundreds of components at the application bootstrap, you can load just the landing module and load all other submodules lazily.

# How to Build NativeScript Apps That Start Up Fast

NativeScript allows you to write native iOS and Android applications using JavaScript. Although there are many advantages to taking this approach—using one language to write multiple apps, faster development times from using an interpreted language, and so forth—there is one fact NativeScript developers can’t avoid: NativeScript apps can take longer to start up than applications written with native development languages such as Objective-C and Java.

Don’t worry though—with a few optimizations, NativeScript apps can startup fast enough for the overwhelming majority of app use cases. This article is a straight-to-the-point list of steps you can take to make sure your NativeScript apps start up as fast as possible.

> **NOTE**: Jump to the [summary](#summary) if you want an explanation-free list of commands to run.

- [Step 1: Add uglification](#step-1)
- [Step 2: Perform heap snapshots](#step-2)
- [Summary](#summary)

<h2 id="step-1">Step 1: Add uglification</h2>

Webpack has a number of plugins that extend its capabilities, but perhaps the most useful plugin is built right into webpack itself—[UglifyJS](https://github.com/mishoo/UglifyJS2). As its name implies, UglifyJS compresses and minifies your JavaScript code to reduce files sizes.

For NativeScript apps there are two advantages to using UglifyJS. First, because UglifyJS reduces the file size of JavaScript files, it’ll also reduce the file size of your app as a whole. Second, because UglifyJS removes dead code as it minifies your code, your app will start up faster because there will be fewer JavaScript instructions for NativeScript to parse.

Using UglifyJS is easy too. To use UglifyJS as part of your NativeScript builds, all you need to do is add a `--env.uglify` flag to the scripts you ran earlier. That is, run one of the following commands.

```cli
ns run android --env.uglify
```

Or

```cli
ns run ios --env.uglify
```

If you open your `vendor.js` and `bundle.js` files, you should now see compressed code that looks something like this.

![](compressed-code.png)

The more code you have, the more of a difference the UglifyJS optimization will make. Here’s what the NativeScript Groceries sample looks like with Uglify added to the webpack build process.

<div style="display: flex; max-width: 100%;">
  <img src="https://github.com/NativeScript/docs/raw/master/docs/img/best-practices/ios-start-up-2.gif" style="height: 450px;">
  <img src="https://github.com/NativeScript/docs/raw/master/docs/img/best-practices/android-start-up-2.gif" style="height: 450px;">
</div>

To recap our steps so far, you enabled UglifyJS, which reduced the size of your app by removing dead code. Fewer lines of code meant less JavaScript for NativeScript to parse when your app started up, so your startup times improved again.

As a next step you’re going to take things one step further, and register your JavaScript with the JavaScript virtual machine itself.

<h2 id="step-2">Step 2: Perform heap snapshots</h2>

NativeScript runs the JavaScript code you write through a [JavaScript virtual machine](http://developer.telerik.com/featured/a-guide-to-javascript-engines-for-idiots/), which is essentially a piece of software that’s specifically designed to interpret and execute JavaScript code.

NativeScript Android apps run on top of Google’s V8 engine, and NativeScript iOS apps run on top of Apple’s JavaScriptCore engine. V8 has a [neat feature called heap snapshots](https://v8project.blogspot.bg/2015/09/custom-startup-snapshots.html), which NativeScript leverages to give a powerful boost to Android startup times.

Here’s the basics of how heap snapshots work: when you start up your app, normally, the JavaScript VM has to fetch and parse every JavaScript file you use intend to use in your app. There is a cost to doing this, and that cost is one thing that can slow down the startup of your NativeScript apps.

What V8 lets you do, however, is provide a so-called heap snapshot, or a previously prepared JavaScript context. In other words, instead of NativeScript fetching, parsing, and executing scripts on every startup, the NativeScript Android runtime can instead look for a previously prepared binary file that is the result of those tasks, and just use that instead—greatly reducing the amount of time it takes for your app to get up and running.

In NativeScript we’re integrated this process directly within our webpack build process; therefore, running a build with V8 heap snapshots enabled is as simple as adding a `--env.snapshot` flag to the previous step.

```cli
ns run android --env.uglify --env.snapshot
```

> **Note:** Heap snapshots are a feature of V8 and you can only use this feature as part of your NativeScript Android builds. A similar feature is not available for NativeScript iOS builds.

Because heap snapshots completely avoid the need to parse and execute the vast majority of your JavaScript on startup, they tend to speed up the startup times of NativeScript apps substantially. Here’s how the NativeScript Groceries app starts up on Android with heap snapshots enabled.

<img src="https://github.com/NativeScript/docs/raw/master/docs/img/best-practices/android-start-up-3.gif" style="height: 450px;">

> **NOTE**: For a far more technical explanation of how V8 heap snapshots work in NativeScript, and how you can configure and optimize the snapshots, check out [this article on the NativeScript blog](https://www.nativescript.org/blog/improving-app-startup-time-on-android-with-webpack-v8-heap-snapshot).

<h2 id="summary">Summary</h2>

By enabling webpack, using UglifyJS, and performing V8 heap snapshot builds, you have the ability to greatly improve the startup times of your NativeScript applications. As a reference, here is a brief summary of the commands you need to run to enable all optimizations.

1. Run on iOS with, UglifyJS, and Angular Ahead-of-Time enabled.

```cli
ns run ios --env.uglify --env.aot
```

2. Run on Android with, UglifyJS, Angular Ahead-of-Time (if using Angular), and V8 heap snapshot builds enabled.

```cli
ns run android --env.uglify --env.aot --env.snapshot
```

## Image Optimizations

### Android Image Optimization

One of the most common scenarios for modern mobile applications is to work with multiple images often in high definition formats. It is essential for the mobile developer to handle memory related issues and optimize an application so it can process large data (for example, a web request that downloads hundreds of photos and alike).

In this article, we will take a look at how the `Image` module works in NativeScript and cover the techniques that will improve Android application performance.

### Handling large images and avoiding Out Of Memory exception

In some cases when working with multiple large images on devices with low memory, an `Out Of Memory` (OOM) exception can occur. To prevent that scenario, in NativeScript 2.5.x and above using the `src` property in Android will internally load the Bitmap in Java. Bitmap memory stays in Java world and it is reclaimed once the Bitmap is no longer in use (e.g., there is no need for the Javascript object to be collected). This way Bitmap memory management is not an issue.

In contrast, when using `ImageSource` or Base64 encoded string, the Bitmap is transferred to Javascript, so it will be released when Javascript object reclaims. Javascript garbage collection happens less frequently than Java garbage collection which might lead to Out Of Memory.

> **Tip**: To avoid Out of Memory related issues, use the `src` property of your `Image` to set your images.

### Using `decodeHeight` and `decodeWidth` properties

As an additional feature for Android, NativeScript supports `decodeWidth` and `decodeHeight`. These properties will **downsample** your image so that it will take less memory. The goal is to avoid as much as possible out of memory exceptions caused by images being loaded into memory and at the same time display crispy images.

::: warning Note
Use `decodeWidth` and `decodeHeight` only when working with large photos and there are `Out of Memory` exceptions issues. With NativeScript 3.x.x and above, image optimizations were implemented and in the common scenarios, you should not worry about hitting OOM.
:::

When working with the decode properties, the following considerations should be taken:

- The `decodeWidth` and `decodeHeight` properties accept **DIP** (device independent pixels) as measurement units. This means that image decoding will happen based on the device DPI. Devices with higher pixel density displays will decode their images larger out of the box so that they appear crispy. You can still set the properties in px if you so choose.

- The `decodeWidth` and `decodeHeight` properties will now respect the `stretch` property value. If you set `stretch` to `aspectFill` or `aspectFit`, NativeScript will keep the aspect ratio while shrinking the image.

- When `decodeWidth` and `decodeHeight` values are **not** set, the images will be decoded with the size of the device screen. This is an optimization as in most cases you probably want to see the whole of the image on your device screen. Note that if you still want the image to be decoded in full size (if you want to be able to zoom it for example), you can manually set `decodeWidth` and `decodeHeight`.

- Image caching now takes into account the `decodeWidth` and `decodeHeight` values. Identical images with different decode property values will now be retrieved and saved separately in the cache. This results in better quality images. If you have a small version of the image in a master list and want to decode it with 100 x 100 DP, and then want to display it in 1000 x 1000 DP on the detail page, the detailed image will now not be blurry. This also means you can now control caching - using the same image with the same decode parameter values will still get the image from the cache.

> **Important**: The `decodeWidth` and `decodeHeight` properties will work only for Android. Setting them for our iOS images will not change the application behavior in any way.

### Using `loadMode` property

With [loadMode](/api-reference/modules/_ui_image_.html#loadmode) set to `async`, the image will load asynchronously which means the UI won't block by the decoding and preloading operations. The developers can use `loadMode` on both iOS and Android.

> **Tip**: Use `loadMode="async"` to prevent blocking of the UI while the image is loading.

```xml
<StackLayout>
  <Image
    src="{{ someExtremelyLargeImage }}"
    decodeWidth="400"
    decodeHeight="400"
    loadMode="async"
  />
  <Label text="With loadMode set to async the UI won't be blocked" textWrap="true" />
</StackLayout>
```

::: warning Note
When the `src` value starts with `http` it will be loaded asynchronously no matter what value is set to `loadMode`.
:::

### Using `useCache` property

The `Image` module will use internal memory and disk cache, so when loaded the module stores the images in the memory cache, and when they are not needed anymore, the `Image` module saves the images in the disk cache. This way the next time the application needs the same image NativeScript will load it from memory or the disk cache. Setting property `useCache` to `false` could be used to bypass image cache and load the image as it is on the first request to the specified URL.

::: tip Tip
The property `useCache` will work only for Android. Setting it for our iOS images will not change the application behavior in any way.
:::

**API Reference for** [Image Module](/api-reference/modules/_ui_image_.html)

**NativeScript Core Examples** [Cookbook](http://docs.nativescript.org/cookbook/ui/image)

**NativeScript Angular Examples** [Code Samples](http://docs.nativescript.org/angular/code-samples/ui/image.html)

## Profiling

## Scroll Performance

## Navigation Performance
