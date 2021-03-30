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

  return webpack.resolveConfig()
}
```

With version `5.0.0` of `@nativescript/webpack` our goal was to simplify maintenance, upgradability and ease of use. Compared to prior versions, the above is all that's required to successfully bundle apps.

## Flags & their usage

### env flags

// todo

### CLI flags

// todo

## Examples of configurations

### Adding a copy rule

// todo

### Adding a plugin

// todo

### Adding a loader

// todo

### Changing an existing rule

// todo

### Changing an existing plugin configuration

// todo

### Explicitly set base config

// todo

### Suppressing warnings

// todo

### Merging options into the config

// todo

## Plugin API

Document how plugins can make changes to the webpack config!

// todo

## API

### `webpack.init(env: IWebpackEnv)`

**Required**: initialize the internal `env` object that's used throughout the config building process.

The passed env should be an object containing key-value pairs. This is generally handled by webpack.

### `webpack.useConfig(config: string | false)`

_Optional_: specify base config - defaults to auto-discovery.

Passing `false` will opt-out from using a base config, however this is generally never recommended.

### `webpack.chainWebpack(chainFn, options?)`

_Optional_: add a new `chainFn` to the internal chain that will be called while resolving the final config.

The `chainFn` should be a function that accepts 2 parameters &mdash; `config` and `env`.

The `options` is an optional object with the following optional properties:

- `order: number`: controls the order in which the `chainFn` should be applied.

  Useful when related plugins rely on changes made in the right order. For example, `plugin1` can specify `order: 1` and `plugin2` can specify `order: 2` - this will guarantee that `plugin1`'s `chainFn` is called first, and that `plugin2` can rely on values set by `plugin1`.

**Example: Force production mode**

```js
webpack.chainWebpack((config, env) => {
  config.mode('production')
})
```

**Example: Run a config "last"**

Setting `order: 10` doesn't necessarily guarantee the `chainFn` will be applied last, since other calls to `chainWebpack` could specify a higher number. We recommend against setting higher values, and using `10` as a conventional "last".

```js
webpack.chainWebpack(
  (config, env) => {
    config.set('somethingThatShouldBeSetLast', true)
  },
  { order: 10 }
)
```

### `webpack.mergeWebpack(mergeFnOrObject)`

_Optional_: merges an object (or an object returned by a function) into the resolved chain config.

**Example**

```js
// merge an object into the internal config
webpack.mergeWebpack({
  something: true
})
// or pass a function that returns an object
webpack.mergeWebpack(env => {
  return {
    something: true
  }
})
```

### `webpack.resolveChainableConfig()`

Resolve a new instance of the internal chain config with all chain functions applied.

### `webpack.resolveConfig()`

Resolve a "final" configuration that has all chain functions and merges applied.

This returns a config that webpack can process.
