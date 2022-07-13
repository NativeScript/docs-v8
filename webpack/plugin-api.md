---
title: Plugin API
---

## Plugin API

NativeScript plugins can provide a `nativescript.webpack.js` file in their root folder (next to `package.json`), and `@nativescript/webpack` will include these configs when resolving the final config.

For example, a plugin could register a new loader it requires:

```js
/**
 * This optionally provides typehints
 * this requires "@nativescript/webpack" to be a dependency (dev)
 *
 * @param {typeof import("@nativescript/webpack")} webpack
 */
module.exports = webpack => {
  // same API as the user configs
  // for example make changes to the internal config with webpack-chain
  webpack.chainWebpack(
    (config, env) => {
      // as an example - add a new rule for svg files
      config.module
        .rule('something')
        .test(/\.something$/)
        .use('something-loader')
        .loader('something-loader')
    } /*, options */
  )
}
```
