---
title: Global "magic" variables
---

## Global "magic" variables

We define a few useful globally available variables:

- `__DEV__` - true when webpack is building in development mode
  ```ts
  if (__DEV__) {
    // we are running a dev build
  }
  ```
- `global.isAndroid`, `__ANDROID__` - true when the platform is Android
  ```ts
  if (global.isAndroid) {
    // we are running on android
  }
  ```
- `global.isIOS`, `__IOS__` - true when the platform is iOS
  ```ts
  if (global.isIOS) {
    // we are running on iOS
  }
  ```

<details>

<summary>
The following variables are also defined, but are primarily intended to be used by NativeScript Core internally, or plugins that wish to use these.
</summary>

- `__NS_WEBPACK__` - always `true` when building with webpack
- `__NS_ENV_VERBOSE__` - `true` when `--env.verbose` is set
- `__NS_DEV_HOST_IPS__` - an array of IP addresses of the host machine (the machine running the build) when in `development` mode, and an empty array in production mode.
- `__CSS_PARSER__` - the css parser used by NativeScript Core. The value is set based on the `cssParser` value in the `nativescript.config.ts` and defaults to `css-tree`
- `__UI_USE_XML_PARSER__` - a flag used by NativeScript Core to disable the XML parser when it's not used
- `__UI_USE_EXTERNAL_RENDERER__` - a flag used by NativeScript Core to disable registering global modules when an external renderer is used.

</details>
