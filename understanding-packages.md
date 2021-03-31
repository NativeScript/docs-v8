---
title: Understanding @nativescript
---

There are a few npm packages that are fundamental to NativeScript development and are good to understand.

- `@nativescript/core`

A JavaScript library providing an easy to use api for interacting with iOS and Android platform APIs.

- `@nativescript/android`

The v8 JavaScript engine runtime enabled for Android NativeScript development.

- `@nativescript/ios`

The v8 JavaScript engine runtime enabled for iOS NativeScript development.

You can also use a [JavaScriptCore](https://developer.apple.com/documentation/javascriptcore) version of this runtime using the npm tag `JSC`. This can be useful for projects that may experience any issue with the v8 engine.

- `@nativescript/types`

This provides TypeScript definitions for all iOS and Android APIs available to do NativeScript development with.

- `@nativescript/webpack`

This provides loaders, helpers and base configs for all fundamental NativeScript development to debug, run, build and release your apps.

## Plugins

There are also quite a number of plugins maitained and developed by the NativeScript TSC which you can find [documented here](plugins/index)
