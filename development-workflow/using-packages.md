---
title: Using packages
---

## Using packages

### Plugins

NativeScript plugins are npm packages with some added native functionality. Therefore, finding, installing, and removing NativeScript plugins works a lot like working with npm packages you might use in your Node.js or front-end web development.

#### Finding plugins

The NativeScript team maintains an [official marketplace](https://market.nativescript.org/), which displays a filtered list of NativeScript-related plugins from npm. All plugins listed in the marketplace are accompanied by a metadata describing their quality. A search for “accelerometer” on the plugins marketplace will point you at the plugin you need.

Alternatively, since NativeScript plugins are npm packages, you can find NativeScript plugins on [npm’s site](https://www.npmjs.com/) by searching for “nativescript-plugin-name”. For example, a search of “nativescript accelerometer” would point you right at the [NativeScript accelerometer plugin](https://www.npmjs.com/package/nativescript-accelerometer).

If you can't find a plugin, try asking for help on [Stack Overflow](https://stackoverflow.com/questions/tagged/nativescript). The NativeScript team and community may be able to help find what you’re looking for.

<!-- TODO: fix links -->

Also, make sure to look through the [NativeScript core modules](https://docs.nativescript.org/core-concepts/modules), which ship as a dependency of every NativeScript app. There’s a chance that the functionality you need is built in. If you’re still not finding what you need, you can request the plugin as an idea on the [NativeScript community forum](https://discourse.nativescript.org/c/plugins), or you can take a stab at [building the plugin yourself](https://v7.docs.nativescript.org/plugins/building-plugins).

#### Installing Plugins

Once you’ve found the plugin you need, install the plugin into your app using the `ns plugin add` command.

```cli
ns plugin add <plugin-name>
```

For example, the following command installs the [NativeScript camera plugin](plugins/camera).

```cli
ns plugin add @nativescript/camera
```

Instead of using `plugin add`, you can use your package manager as well (npm, yarn, pnpm...):

```cli
npm install --save @nativescript/camera
```

The installation of a NativeScript plugin mimics the installation of an npm package. The NativeScript CLI downloads the plugin from npm and adds the plugin to the `node_modules` folder in the root of your project. During this process, the NativeScript CLI adds the plugin to your project’s root `package.json` file and also resolves the plugin’s dependencies (if any).

#### Installing Plugins as Developer Dependencies

As shown above the command `ns plugin add @nativescript/camera` is actually doing `npm i @nativescript/camera --save` behind the scenes. If you need to install a **developer dependency** in your project (e.g., like **@nativescript/types** or **@nativescript/webpack**) then you will need to explicitly save it as a **devDependency**. To achieve that, use the `npm install` command with `--save-dev` flag. For example:

```cli
npm i @nativescript/types --save-dev
```

::: tip Note
The difference between dependencies and developer dependencies is that **dependencies** are required to run, while **devDependencies** are needed only during development. Example for dependency is the **@nativescript/camera** plugin which is required at runtime so you could use the hardware camera. On the other hand, the **@nativescript/types** is a developer dependency required only for intelliSense during the development process. The `devDependencies` should not be installed as `dependencies` to avoid large output build files (large application size). Example `package.json` file using both `dependencies` and `devDependencies` can be found [here](https://github.com/NativeScript/nativescript-sdk-examples-js/blob/master/package.json#L31-L44).
:::

#### Importing and Using Plugins

Once the plugin you need is installed, you can start using it in your project. Note that each plugin might have its configuration that needs to be satisfied so always check carefully the plugin's documentation and the README file. The below code snippet demonstrated the basic usage of **@nativescript/camera** plugin.

```javascript
import { requestPermissions } from '@nativescript/camera'
requestPermissions()
```

```typescript
import { requestPermissions } from '@nativescript/camera'
requestPermissions()
```

#### Removing Plugins

To remove a NativeScript plugin from your project, run the following command from your command line.

```cli
ns plugin remove <plugin-name>
```

For example, the following command removes the NativeScript camera plugin.

```cli
ns plugin remove @nativescript/camera
```

As with installation, the removal of a NativeScript plugin mimics the removal of an npm package.

The NativeScript CLI removes any plugin files from your app’s `node_modules` folder in the root of your project. The CLI also removes any of the plugin’s dependencies and also removes the plugin from your project’s root `package.json` file.

### Package Managers

A package manager is a piece of software that lets you manage the external code, written by you or someone else, that your project needs to work correctly. By default, NativeScript CLI uses Node Package Manager (`npm`) for managing the dependencies of the application. When new application is created, CLI automatically calls `npm install` to install all of its dependencies.

#### Supported package managers

NativeScript CLI allows you to configure the package manager used when working with dependencies. When you change the defaultly used `npm` package manager, CLI will use the newly set package manager for all operations it executes related to project dependencies, for example, project creation, managing dependencies, etc.

NativeScript CLI supports three package managers:

- `npm` - this is the default option
- `yarn` - you can set it by calling `ns package-manager set yarn`. More information about `yarn` is available [here](https://yarnpkg.com/)
- `pnpm` - from version 6.4, you can use `pnpm` to manage the dependencies of your application. You can use `pnpm` by calling `ns package-manager set pnpm`. NOTE: You will have to use `--shamefully-hoist` flag if you call `pnpm` on your own. CLI passes this flag when installing dependencies with `pnpm` and probably your application will not work if you omit it. More information about `pnpm` is available [here](https://pnpm.js.org/).

In case you want to check what is the currently used package manager, you can use:

```cli
ns package-manager get
```
