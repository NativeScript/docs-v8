---
title: Plugin Workspace Guide
---

NativeScript plugin development is made efficient by our [plugin workspace seed](https://github.com/NativeScript/plugin-seed) which is powered by [Nx](https://nx.dev).

Workspaces are intended to manage a suite of plugins bound to an npm scope, for example `@org/plugin`.

- You can have just one, or dozens, or hundreds of plugins in one workspace all while being efficient and highly maintainable.
- Simplifies setup, config, update and publishing maintenance.
- Demoing your plugin functionality can be written once and shared across multiple NativeScript app flavors to confirm frontend framework integration compliance with ease and comfort.
- It's clear what npm scope these plugins belong to from a management perspective but also from a consumer perspective.
- It's neatly organized structurally.
- You can automate build/publishing tasks in a sweeping fashion.

If you manage multiple npm scopes you can have a workspace for each scope for simplicity.

## Create a workspace

<img src="https://nativescript.org/images/create-view-component-images/create-workspace1.png" width="600" alt="create-workspace1" />

You can choose `Use this template` right from the repo to create a copy into an organization of your choice and give it a name you prefer:

<img src="https://nativescript.org/images/create-view-component-images/create-workspace2.png" width="600" alt="create-workspace2" />

With our new workspace now in GitHub we can now clone it to begin developing plugins.

<img src="https://nativescript.org/images/create-view-component-images/create-workspace3.png" width="600" alt="create-workspace3" />

```cli
git clone https://github.com/nstudio/nativescript-ui-kit.git
Cloning into 'nativescript-ui-kit'...

cd nativescript-ui-kit
```

### Setup and configure the workspace

1. This first step will ensure all the dependencies are installed properly and only really needs to be run once after cloning the workspace. You can also use it anytime you simply want to clean/reset the workspace dependencies.

```cli
npm run setup
```

2. Now let's configure it to use the settings we prefer like which organization we want these plugins associated with.

This will also give us a chance to configure the default package.json repository url and author details we want each package to use.

```cli
npm run config

? What npm scope would you like to use for this workspace?
› nstudio

? What is the git repository address?
› https://github.com/nstudio/nativescript-ui-kit

? What is the author display name?
› nstudio

? What is the author email?
> oss@nstudio.io
```

**Your workspace is now configured and ready to go!**

## Add a package

Let's add a package to develop a plugin, for example: `@nstudio/nativescript-label-marquee`

```cli
npm run add

? What should the new package be named?
› nativescript-label-marquee

? Should it use the npm scope of the workspace?
› true

"@nstudio/nativescript-label-marquee" created and added to all demo apps.
Ready to develop!
```

This created a `packages/nativescript-label-marquee` folder containing a plugin harness in `packages` with the necessary boilerplate to just start developing in addition to:

- Updating all demo app flavors to support demoing the new package
- Added shared code in `tools/demo` where you can write demo code **once** and share across all demo flavors
- Updating build tooling to support the new package
- Updating the `npm start` interactive display
- Updating the README here to list the new package

## Add Angular compatibility to a package

```bash
npm run add-angular
```

At the prompt, enter the name of the package to add an `angular` folder to it with the necessary boilerplate to provide Angular support to the package.

## How to focus on just 1 package to develop in isolation

```bash
npm start
```

- Choose the **focus** commands for the package you wish to focus on and hit enter. (You can type `focus.{package-name}` to drill down the list)
- All the demo app's will be updated to isolate that 1 package and for supported IDE's (currently VS Code), the source code will also become isolated in the workspace.

Note: _good to always clean the demo you plan to run after focusing. (You can clean any demo from `npm start` as well)_

You can reset anytime with `npm start` > `focus.reset` ENTER

## How to publish packages?

```bash
npm run publish-packages
```

- You will be prompted for the package names to publish. Leaving blank and hitting enter will publish them all.
- You will then be prompted for the version to use. Leaving blank will auto bump the patch version (it also handles prerelease types like alpha, beta, rc, etc. - It even auto tags the corresponding prelease type on npm).
- You will then be given a brief sanity check 🧠😊

## Migrating your plugin workspace

One of the additional nice benefits of using plugin workspaces is updating them is a made simple and efficient through Nx tooling. The TSC maintains the plugin workspace migrations so whenever one is available you can update your plugin workspace (which will often contain auto version bumps of supporting packages to latest NativeScript versions, configuration improvements and other welcome additions to help you create and maintain great NativeScript plugins):

```
nx migrate @nativescript/plugin-tools
```

That will fetch `latest` version of `plugin-tools`, analyze the package to see if any migrations are available and then print a message if there are migrations to run.

Sometimes `@nativescript/plugin-tools` updates will not contain any migrations so you won't always see migrations available but if it states they are available you can run them as the message states:

```
// install latest updates
npm install

// now run the migrations
nx migrate --run-migrations=migrations.json
```

Your plugin workspace will now be up to date regarding various configurations, settings and core dependencies. Depending on other customizations you made there may be other subtle things to adjust on your own.

After running migrations you can always _delete_ the `migrations.json` folder as it will no longer be used. A `migrations.json` file is always generated if migrations are available to run and after applied you no longer need that file.

### Migration 3.0.0 (Released March 8, 2022)

After migrating:

- If using angular integrations you may run into issues like the following:

```
✖ Compiling with Angular sources in Ivy partial compilation mode.
Error: packages/picker/angular/picker.accessors.ts:30:14 - error NG3001: Unsupported private class PickerValueAccessor. This class is visible to consumers via NativeScriptPickerModule -> PickerValueAccessor, but is not exported from the top-level library entrypoint.

30 export class PickerValueAccessor extends BaseValueAccessor<PickerField> {
                ~~~~~~~~~~~~~~~~~~~~
packages/picker/angular/picker.directive.ts:58:14 - error NG3001: Unsupported private class PickerFieldComponent. This class is visible to consumers via NativeScriptPickerModule -> PickerFieldComponent, but is not exported from the top-level library entrypoint.

58 export class PickerFieldComponent extends ListViewComponent implements AfterContentInit {
                ~~~~~~~~~~~~~~~~~~~~~

    at compileSourceFiles (/Users/nstudio/Documents/github/NativeScript/plugins/node_modules/ng-packagr/lib/ngc/compile-source-files.js:141:15)
    at async /Users/nstudio/Documents/github/NativeScript/plugins/node_modules/ng-packagr/lib/ng-package/entry-point/compile-ngc.transform.js:59:13
    at async /Users/nstudio/Documents/github/NativeScript/plugins/node_modules/ng-packagr/lib/graph/transform.js:7:29
ERROR: Something went wrong in @nrwl/run-commands - Command failed: node tools/scripts/build-finish.ts picker
```

This is related to ng-packgr updates and you can resolve by ensuring that the symbols complained about are exported from `packages/picker/angular/index.ts`, for example:

- `packages/picker/angular/index/ts`:

```
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { PickerField } from '@nativescript/picker';
import { DIRECTIVES } from './picker.directive';

// Adding these exports fixes the error
export * from './picker.directive';
export * from './picker.accessors';

@NgModule({
	declarations: [DIRECTIVES],
	exports: [DIRECTIVES],
	schemas: [NO_ERRORS_SCHEMA],
})
export class NativeScriptPickerModule {}

// Uncomment this line if the package provides a custom view component
registerElement('PickerField', () => PickerField);
```
