---
title: Examples of configurations
---

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

### Adding a resolver plugin

```js
const webpack = require('@nativescript/webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    config.resolve.plugin('TsconfigPathsPlugin').use(TsconfigPathsPlugin)
  })

  return webpack.resolveConfig()
}
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

### Adding path aliases

You can define `import`-aliases for specific source directories.

```js
const webpack = require('@nativescript/webpack')
const { resolve } = require('path')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    // change the "@" alias to "app/libs"
    config.resolve.alias.set('@', resolve(__dirname, 'app/libs'))
  })

  return webpack.resolveConfig()
}
```

### Extending the DefinePlugin options

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    config.plugin('DefinePlugin').tap(args => {
      Object.assign(args[0], {
        'global.isProduction': !!env.production,
        'global.someNumber': 42,
        'global.someString': JSON.stringify('some string value')
      })

      return args
    })
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

### Changing an existing loader options

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    config.module
      .rule('scss')
      .use('sass-loader')
      .options({ sassOptions: { indentedSyntax: true } })
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
  // or can be one of the base configs: base, angular, javascript, react, svelte, typescript, vue
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
