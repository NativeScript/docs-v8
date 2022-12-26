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

## How to focus on just 1 package to develop in isolation

```cli
npm start
```

- Choose the **focus** commands for the package you wish to focus on and hit enter. (You can type `focus.{package-name}` to drill down the list)
- All the demo app's will be updated to isolate that 1 package and for supported IDE's (currently VS Code), the source code will also become isolated in the workspace.

Note: _good to always clean the demo you plan to run after focusing. (You can clean any demo from `npm start` as well)_

You can reset anytime with `npm start` > `focus.reset` ENTER

## How to publish packages?

```cli
npm run publish-packages
```

- You will be prompted for the package names to publish. Leaving blank and hitting enter will publish them all.
- You will then be prompted for the version to use. Leaving blank will auto bump the patch version (it also handles prerelease types like alpha, beta, rc, etc. - It even auto tags the corresponding prelease type on npm).
- You will then be given a brief sanity check 🧠😊

## If needed, add Angular compatibility to a package

Not all packages need specific Angular compatibility. Only if you want to provide Angular specific behavior for example, custom directives, components or other extended behavior to expand on top of your NativeScript plugin will you need to do this.

You can [see an example of Angular specific behavior in a plugin here](https://github.com/NativeScript/plugins/blob/main/packages/datetimepicker/angular/nativescript-datetimepicker.accessors.ts).

```cli
npm run add-angular
```

At the prompt, enter the name of the package to add an `angular` folder to it with the necessary boilerplate to provide Angular support to the package.

## Migrating your plugin workspace

One of the nice benefits of using our plugin workspaces is updating them is made simple and efficient through Nx tooling. The TSC maintains plugin workspace migrations so whenever one is available you can update your plugin workspace with just a few simple commands (which will often provide dependency version bumps of supporting packages to latest NativeScript versions, configuration improvements, as well as other welcome additions to help you create and maintain NativeScript plugins):

```cli
yarn nx migrate @nativescript/plugin-tools
```

That will fetch `latest` version of `plugin-tools`, analyze the package to see if any migrations are available and then print a message if there are migrations to run.

Sometimes `@nativescript/plugin-tools` updates won't need any migrations so you won't always see migrations available but if it states they are available you can run them as the message states:

```cli
// install latest updates
yarn

// now run the migrations
yarn nx migrate --run-migrations=migrations.json
```

Your plugin workspace will now be up to date regarding various configurations, settings and core dependencies. Depending on other customizations you made there may be other things to adjust on your own.

After running migrations you can always _delete_ the `migrations.json` file as it will no longer be used. A `migrations.json` file is always generated if migrations are available to run. After applied, you no longer need the file.

### Migration 5.0.0 (Released Dec 26, 2022)

- Migrates to Nx 15.4.1, NativeScript 8.4, and TypeScript ~4.8.x.

With NativeScript 8.4, the TypeScript target has been upgraded to `es2020` while also using `esnext` lib. In doing so, this standardizes WeakRef usage to modern usage.

The migration updates this target for you, however if you encounter an issue like this:

```
Compiling TypeScript files for project "nativescript-loading-indicator"...
packages/nativescript-loading-indicator/index.android.ts:122:19 - error TS2693: 'WeakRef' only refers to a type, but is being used as a value here.

122   const ref = new WeakRef(this);
```

This just means the `tsconfig.base.json` still needs this following adjustment:

```
"target": "ES2020",
"module": "esnext",
"lib": ["ESNext", "dom"],
```

This also updates transient dependencies to Angular 15. When migrating your plugin workspace to @nativescript/plugin-tools@5, it is expected that any Angular parts will be compatible with Angular 15 and higher.

### Migration 4.1.0 (Released Sept 17, 2022)

- Migrates to Nx 14.7.5 and NativeScript 8.3.

For any angular specific behavior you may encounter the following if you are extending `ListViewComponent`:

```
✖ Compiling with Angular sources in Ivy partial compilation mode.
Error: packages/picker/angular/picker.directive.ts:60:40 - error TS2345: Argument of type 'NgZone' is not assignable to parameter of type 'ChangeDetectorRef'.
  Type 'NgZone' is missing the following properties from type 'ChangeDetectorRef': markForCheck, detach, detectChanges, checkNoChanges, reattach

     super(_elementRef, _iterableDiffers, zone);
```

This is related the `ListViewComponent` signature modified in latest:
https://github.com/NativeScript/angular/blob/main/packages/angular/src/lib/cdk/list-view/list-view.component.ts#L133

Can fix by modifying signature to the following:

```
export class PickerFieldComponent extends ListViewComponent implements AfterContentInit {
	constructor(_elementRef: ElementRef, _iterableDiffers: IterableDiffers, _cdRef: ChangeDetectorRef) {
		super(_elementRef, _iterableDiffers, _cdRef);
	}
```

### Migration 4.0.0 (Released July 3, 2022)

- Migrates to Nx 14.4.0 and Angular 14 compatibility.
- Allows custom demo `modals` folder to work with _focus_ tooling:

> You can now have supplementary modal views within `apps/demo/src/modals/anything-packagename.{xml,ts}` for assisting testing package integrations with various modal handling whereby using the `packagename` in the filename will work with the _focus_ tooling of the workspace. See [here](https://github.com/NativeScript/plugins/tree/main/apps/demo/src/modals) for example.

### Migration 3.0.0 (Released March 8, 2022)

After migrating:

- If using angular integrations you may run into issues like the following:

```cli
✖ Compiling with Angular sources in Ivy partial compilation mode.
Error: packages/picker/angular/picker.accessors.ts:30:14 - error NG3001: Unsupported private class PickerValueAccessor. This class is visible to consumers via NativeScriptPickerModule -> PickerValueAccessor, but is not exported from the top-level library entrypoint.

30 export class PickerValueAccessor extends BaseValueAccessor<PickerField> {
                ~~~~~~~~~~~~~~~~~~~~
packages/picker/angular/picker.directive.ts:58:14 - error NG3001: Unsupported private class PickerFieldComponent. This class is visible to consumers via NativeScriptPickerModule -> PickerFieldComponent, but is not exported from the top-level library entrypoint.

58 export class PickerFieldComponent extends ListViewComponent implements AfterContentInit {
                ~~~~~~~~~~~~~~~~~~~~~

    at compileSourceFiles (/NativeScript/plugins/node_modules/ng-packagr/lib/ngc/compile-source-files.js:141:15)
    at async /NativeScript/plugins/node_modules/ng-packagr/lib/ng-package/entry-point/compile-ngc.transform.js:59:13
    at async /NativeScript/plugins/node_modules/ng-packagr/lib/graph/transform.js:7:29
ERROR: Something went wrong in @nrwl/run-commands - Command failed: node tools/scripts/build-finish.ts picker
```

This is related to ng-packgr updates and you can resolve by ensuring that the symbols complained about are exported from `packages/picker/angular/index.ts`, for example:

- `packages/picker/angular/index/ts`:

```ts
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { registerElement } from '@nativescript/angular'
import { PickerField } from '@nativescript/picker'
import { DIRECTIVES } from './picker.directive'

// Adding these exports fixes the error
export * from './picker.directive'
export * from './picker.accessors'

@NgModule({
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NativeScriptPickerModule {}

// Uncomment this line if the package provides a custom view component
registerElement('PickerField', () => PickerField)
```
