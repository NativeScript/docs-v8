---
title: Flags & their usage
---

## Flags & their usage

### CLI flags

When running a NativeScript app the following flags have an effect on the webpack config:

- `--no-hmr` - disable HMR (enabled by default)

### --env flags

The following `--env` flags can be passed to the cli when running or building:

- `--env.verbose` - prints verbose logs and the internal config before building
- `--env.replace=from:to` - add file replacement rules. For source files (`.js` and `.ts`) this will add a new alias to the config, for everything else, this will add a new copy rule. Example: `--env.replace=./src/environments/environment.ts:./src/environments/environment.prod.ts` would add an alias so when you `import { environment } from './environments/environment.ts'` it will resolve & import from `./environments/environment.prod.ts`.
- `--env.appComponents` - allows passing additional App Components for android. For example if you have a custom activity in `myCustomActivity.ts` you can pass `--env.appComponents=myCustomActivity.ts`.
- `--env.production` - enable production mode (will minify the code)
- `--env.report` - generate a report with the BundleAnalyzerPlugin
- `--env.profile` - generate a `webpack.stats.json` to analyze on https://webpack.github.io/analyse/
- `--env.watchNodeModules` - enable watching `node_modules` for changes. Useful when debugging plugins and making changes directly in `node_modules`.
- `--env.e2e` - enables E2E (end-to-end) mode - this currently enables the `testID` property in `@nativescript/core`

More env flags that are usually passed by the CLI automatically:

- `--env.appPath` - path to the app source (same as `appPath` in the `nativescript.config.ts`)
- `--env.appResourcesPath` - path to App_Resources (same as `appResourcesPath` in the `nativescript.config.ts`)
- `--env.nativescriptLibPath` - path to the currently running CLI's library.
- `--env.android` - `true` if running on android
- `--env.ios` - `true` if running on ios
- `--env.platform=<platform>` - for specifying the platform to use. Can be `android` or `ios`, or a custom platform in the future.
- `--env.hmr` - `true` if building with HMR enabled
