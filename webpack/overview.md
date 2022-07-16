---
title: Webpack
---

## Webpack

:::warning Note
This section is only aplicable to `@nativescript/webpack` version `5.0.0` and above.
If you are using an older version, consider upgrading. This is compatible with webpack version 5.x.
:::

All NativeScript applications are bundled using webpack. To manage the required configuration, we maintain the `@nativescript/webpack` package.

All new projects come with the base `webpack.config.js` that's pre-configured to build a NativeScript app:

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  return webpack.resolveConfig()
}
```

The above config configures most things required to bundle a NativeScript application. Internally it's using [webpack-chain](https://github.com/neutrinojs/webpack-chain) to generate the final config that is passed to webpack.

In some cases you may wish to extend the configuration, which is possible using the [API](#api) for applications, and the [Plugin API](#plugin-api) for plugins. This page contains many examples of common things you might want to change in the [Examples of configurations section](#examples-of-configurations) - for anything else not mentioned here, refer to the [webpack-chain documentation](https://github.com/neutrinojs/webpack-chain).
