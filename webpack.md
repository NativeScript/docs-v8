---
title: Webpack
---

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

- `--env.verbose` - prints verbose logs and the internal config before building
- `--env.replace=from:to` - add file replacement rules. For source files (`.js` and `.ts`) this will add a new alias to the config, for everything else, this will add a new copy rule. Example: `--env.replace=./src/environments/environment.ts:./src/environments/environment.prod.ts` would add an alias so when you `import { environment } from './environments/environment.ts'` it will resolve & import from `./environments/environment.prod.ts`.
- `--env.appComponents` - allows passing additional App Components for android. For example if you have a custom activity in `myCustomActivity.ts` you can pass `--env.appComponents=myCustomActivity.ts`.
- `--env.production` - enable production mode (will minify the code)
- `--env.report` - generate a report with the BundleAnalyzerPlugin

More env flags that are usually passed by the CLI automatically:

- `--env.appPath` - path to the app source (same as `appPath` in the `nativescript.config.ts`)
- `--env.appResourcesPath` - path to App_Resources (same as `appResourcesPath` in the `nativescript.config.ts`)
- `--env.nativescriptLibPath` - path to the currently running CLI's library.
- `--env.android` - `true` if running on android
- `--env.ios` - `true` if running on ios
- `--env.platform=<platform>` - for specifying the platform to use. Can be `android` or `ios`, or a custom platform in the future.
- `--env.hmr` - `true` if building with HMR enabled

### CLI flags

When running a NativeScript app the following flags have an effect on the webpack config:

- `--no-hmr` - disable HMR (enabled by default)

## Examples of configurations

Here are some common examples of things you may want to do in your `webpack.config.js`.

Note that the config is built using [webpack-chain](https://github.com/neutrinojs/webpack-chain), so the `config` variable in all the examples below are instances of a chainable config. You can find more examples in webpack-chain's documentation as well as read the [source of the base configs](https://github.com/NativeScript/NativeScript/tree/fb2c29106378f21583d890174f1c5a6bca6e6b8a/packages/webpack5/src/configuration) to see how we implemented them.

### Adding a copy rule

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  // Example: copy all markdown files to the build directory
  webpack.Utils.addCopyRule('**/*.md')

  // Example: copy all files from a dependency
  webpack.Utils.addCopyRule({
    from: '@nativescript/webpack/stubs',
    to: 'custom/location',
    // the context of the "from" rule, in this case node_modules
    // we used the getProjectFilePath util here, but this could have been
    // a path.resolve(__dirname, 'node_modules') too.
    context: webpack.Utils.project.getProjectFilePath('node_modules')
  })

  return webpack.resolveConfig()
}
```

For all the valid options you can pass, refer to the [CopyWebpackPlugin Documentation](https://webpack.js.org/plugins/copy-webpack-plugin/#patterns)

### Adding a plugin

```js
const webpack = require('@nativescript/webpack')

// import the plugin first
const { BannerPlugin } = require('webpack')

module.exports = env => {
  webpack.init(env)

  // first we add our callback to the internal chain
  webpack.chainWebpack(config => {
    // we add the plugin
    config.plugin('BannerPlugin').use(BannerPlugin, [
      {
        banner: 'hello world'
      }
    ])
  })

  return webpack.resolveConfig()
}
```

The second argument of the `.use` call is an array of arguments you would pass to the plugin. For example, the above example is converted from the official BannerPlugin docs that stated the following:

```js
new webpack.BannerPlugin({
  banner: 'hello world'
})
```

### Adding a loader

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    // add a new rule for *.something files
    config.module
      .rule('something')
      .test(/\.something$/)
      .use('something-loader')
      .loader('something-loader')
      .options({
        example: true
      })
  })

  return webpack.resolveConfig()
}
```

### Adding Externals

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    config.externals(
      // make sure to keep pre-defined externals
      config.get('externals').concat([
        // add your own externals
        'some-external-dependency'
      ])
    )
  })

  return webpack.resolveConfig()
}
```

### Changing an existing rule

To change an existing rule, it's useful to know how it has been set up first:

```cli
ns prepare android|ios --env.verbose
# Note: we plan to add a separate command to just print the internal config
```

Will print the resolved internal config with helpful comments above each rule that you can grab and use. For example:

```js
// ...
/* config.module.rule('js') */
{
  test: /\.js$/,
  exclude: [
    /node_modules/
  ],
  use: [
    /* config.module.rule('js').use('babel-loader') */
    {
      loader: 'babel-loader',
      options: {
        generatorOpts: {
          compact: false
        }
      }
    }
  ]
},
// ...
```

To add a new loader, we can use the same syntax we used above for adding new loaders:

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    config.module.rule('js').use('something-loader').loader('something-loader').options({
      example: true
    })
  })

  return webpack.resolveConfig()
}
```

### Changing an existing plugin configuration

Let's change the BannerPlugin we added above:

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    config.plugin('BannerPlugin').tap(args => {
      // args is and Array of all the arguments passed to the BannerPlugin constructor

      // args[0] is the first argument, which we set above.
      // be careful when accessing an array index
      // and do proper checks before writing to
      // avoid errors
      args[0].banner = 'changed banner.'

      // should always return all the arguments that should be passed to the plugin constructor
      // in some cases you may want to remove an argument - you can do that by returning an array
      // with that argument removed from it.
      return args
    })
  })

  return webpack.resolveConfig()
}
```

### Explicitly set base config

In some cases, you may want to explicitly set which base config should be used.

For example in the NativeScript-Vue repo, the `sample` app doesn't have `nativescript-vue` listed as a dependency, so we have to specify the base config we want to use.

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  // set the base config
  // can be false to opt out from using a base config (used mostly in tests)
  // or can be one of the base configs: base, angular, javascript, react, svelte,	typescript, vue
  webpack.useConfig('vue')

  return webpack.resolveConfig()
}
```

### Suppressing warnings

If your build produces warnings that you want to hide, you can do that with the following:

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    config.set(
      'ignoreWarnings',
      (config.get('ignoreWarnings') || []).concat([
        /a regex that matches the warning to suppress/
      ])
    )
  })

  return webpack.resolveConfig()
}
```

### Merging options into the config

For simple things, you can merge objects into the final config instead of using `chainWebpack`

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  // merge a simple object
  webpack.mergeWebpack({ mode: 'production' })

  // using a function
  webpack.mergeWebpack(env => {
    // return the object to be merged
    return {
      mode: 'production'
    }
  })

  return webpack.resolveConfig()
}
```

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

## API

### webpack.init(env: IWebpackEnv)

**Required**: initialize the internal `env` object that's used throughout the config building process.

The passed env should be an object containing key-value pairs. This is generally handled by webpack.

### webpack.useConfig(config: string | false)

_Optional_: specify base config - defaults to auto-discovery.

Passing `false` will opt-out from using a base config, however this is generally never recommended.

### webpack.chainWebpack(chainFn, options?)

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

### webpack.mergeWebpack(mergeFnOrObject)

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

### webpack.resolveChainableConfig()

Resolve a new instance of the internal chain config with all chain functions applied.

### webpack.resolveConfig()

Resolve a "final" configuration that has all chain functions and merges applied.

This returns a config that webpack can process.
