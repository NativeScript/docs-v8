---
title: 'Rive'
link: https://raw.githubusercontent.com/NativeScript/ui-kit/main/packages/rive/README.md
---

<div style="width: 100%; padding: 1.2em 0em">
	<img alt="github logo" src="../assets/images/github/GitHub-Mark-32px.png" style="display: inline; margin: 1em 0.5em 1em 0em">
	<a href="https://github.com/NativeScript/ui-kit/tree/main/packages/rive" target="_blank" noopener>Rive</a>
</div>

# @nativescript/rive

Rive for NativeScript

```bash
npm install @nativescript/rive
```

## Usage

You can configure both iOS and Android for Rive usage.

### iOS

For iOS, configure your `nativescript.config.ts` to use the Swift Package:

```ts
ios: {
    SPMPackages: [
        {
            name: 'RiveRuntime',
            libs: ['RiveRuntime'],
            repositoryURL: 'https://github.com/rive-app/rive-ios.git',
            version: '5.0.0',
        },
    ],
},
```

#### Swift Package version note

If you encounter a build error related to a specified version as follows:

```bash
xcodebuild: error: Could not resolve package dependencies:
  Dependencies could not be resolved because no versions of 'rive-ios' match the requirement 5.1.12..<6.0.0 and root depends on 'rive-ios' 5.1.12..<6.0.0.
```

You can use the base major version, `5.0.0`, instead of the precise version. It will still resolve the latest in the major version series.

### Android

For Android, add this provider to your `AndroidManifest.xml` inside the `application` tag:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="__PACKAGE__"
    xmlns:tools="http://schemas.android.com/tools"> <!-- You may need to add this xmlns:tools attr/value -->
    ...

    <application
        android:name="com.tns.NativeScriptApplication"
        ...>

        <!-- Add this for Rive -->
        <provider
                android:name="androidx.startup.InitializationProvider"
                android:authorities="${applicationId}.androidx-startup"
                android:exported="false"
                tools:node="merge">
            <meta-data android:name="app.rive.runtime.kotlin.RiveInitializer"
                        android:value="androidx.startup" />
        </provider>
```

Use `RiveView`:

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:rive="@nativescript/rive">
  <GridLayout>
    <rive:RiveView
      src="~/assets/rive/icons.riv"
      width="300"
      height="300"
      autoPlay="true"
    />
  </GridLayout>
</Page>
```

When using flavors, you can just register the element for usage in your markup:

```ts
import { RiveView } from '@nativescript/rive'

// Angular
import { registerElement } from '@nativescript/angular'
registerElement('RiveView', () => RiveView)

// Solid
import { registerElement } from 'dominative'
registerElement('riveView', RiveView)

// Svelte
import { registerNativeViewElement } from 'svelte-native/dom'
registerNativeViewElement('riveView', () => RiveView)

// React
import { registerElement } from 'react-nativescript'
registerElement('riveView', () => RiveView)

// Vue
import Vue from 'nativescript-vue'
Vue.registerElement('RiveView', () => RiveView)
```

Use `RiveView` anywhere.

```xml
<RiveView />
```

### Using State Machines

You can specify the artboard, stateMachine, input along with inputValue (`boolean`).

```html
<RiveView
  src="~/assets/rive/icons.riv"
  artboard="CHAT"
  stateMachine="CHAT_Interactivity"
  input="active"
  [inputValue]="inputValue"
  width="300"
  height="300"
  autoPlay="true"
/>
```

### Triggering State Changes

You can also trigger state changes via the RiveView instance, for example:

```html
<RiveView src="~/assets/rive/icons.riv" (loaded)="loadedRive($event)" />
```

You can now use the instance to trigger state changes anytime:

```ts
let rive: RiveView
function loadedRive(args) {
  rive = args.object
  rive.triggerInputValue(name, value)
}
```

## License

Apache License Version 2.0
