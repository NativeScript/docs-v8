---
title: Understanding @nativescript
---

There are a few npm packages that are fundamental to NativeScript development and good to understand.

### [@nativescript/core](https://www.npmjs.com/package/@nativescript/core)

A JavaScript library providing an easy to use api for interacting with iOS and Android platform APIs.

### [@nativescript/android](https://www.npmjs.com/package/@nativescript/android)

The v8 JavaScript engine runtime enabled for Android NativeScript development.

### [@nativescript/ios](https://www.npmjs.com/package/@nativescript/ios)

The v8 JavaScript engine runtime enabled for iOS NativeScript development.

You can also use a [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore) version of this runtime using the npm tag `JSC`. This can be useful for projects that may experience any issue with the v8 engine.

### [@nativescript/types](https://www.npmjs.com/package/@nativescript/types)

This provides TypeScript definitions for all iOS and Android APIs available to do NativeScript development with.

### [@nativescript/webpack](https://www.npmjs.com/package/@nativescript/webpack)

This provides loaders, helpers and base configs for all fundamental NativeScript development to debug, run, build and release your apps.

### [nativescript](https://www.npmjs.com/package/nativescript)

CLI (Command Line Interface) used for creating/running/building/deploying NativeScript apps. Often installed globally along with a proper [Environment Setup](environment-setup) via `npm install -g nativescript`.

## Plugins

There are also quite a number of plugins maintained and developed by the NativeScript TSC which you can find [documented here](plugins/index)

## NPM Versioning

NativeScript packages do not follow Semantic Versioning for a particular reason. Since NativeScript enables the empowerment of JavaScript with native platform APIs we strive to do major releases around platform API tooling upgrade cycles (Things like Xcode, Android Studio, etc.). Major framework releases are generally released every six months (~March and ~September which is often the timeframe platform API toolchains are also updated), while minor and patch releases may be released as often as every week. Patch releases should never contain breaking changes, however minor, and major releases can. We strive to note any breaking changes in the Changelogs, to make upgrades as easy as possible.

We always recommend using `~` (tilda) with any NativeScript package versions in your projects as that will ensure anytime you execute a `ns clean` against your project that the next run will pull down the latest patch release fixes to anything we may have released.

For example, when referencing the `@nativescript/core` package, you could use a fixed version constraint such as `8.0.0`, or alternatively `~8.0.0` to allow installing patch updates automatically after a project clean.
