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

#### Gradle settings

Add this to your `app.gradle` inside the `android` section:

```yml
kotlinOptions {
jvmTarget = '1.8'
}
```

Ensure your gradle settings are setup to use Kotlin by adding a `gradle.properties` file (right next to your `app.gradle`) with the following:

```yml
useKotlin=true
```

## RiveView

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

When using flavors, you can register the element for usage in your markup:

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

## Troubleshooting

When configuring your Android app for Rive you may run into the following issues. Here's some solutions.

### Potential Error 1

```
Execution failed for task ':app:checkDebugDuplicateClasses'.
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.21 (org.jetbrains.kotlin:kotlin-stdlib:1.8.21) and jetified-kotlin-stdlib-jdk8-1.6.21 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.6.21)
Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.21 (org.jetbrains.kotlin:kotlin-stdlib:1.8.21) and jetified-kotlin-stdlib-jdk7-1.6.21 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.6.21)
```

**Solution**

Add the following dependency constraints to the top of your `app.gradle` above the android section:

```
dependencies {
    constraints {
        implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.21"
        implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.21"
    }
}
```

### Potential Error 2

```bash
Execution failed for task ':app:mergeDebugNativeLibs'.
2 files found with path 'lib/arm64-v8a/libc++_shared.so' from inputs:
 - /Users/you/.gradle/caches/transforms-3/fed290951dd20dba6bd42d7106bb3f26/transformed/jetified-rive-android-8.1.3/jni/arm64-v8a/libc++_shared.so
```

**Solution**

Add this section to `app.gradle` android section:

```bash
android {
  …
  packagingOptions {
      pickFirst "lib/x86/libc++_shared.so"
      pickFirst "lib/x86_64/libc++_shared.so"
      pickFirst "lib/armeabi-v7a/libc++_shared.so"
      pickFirst "lib/arm64-v8a/libc++_shared.so"
  }
  …
}
```

### Potential Error 3

```bash
This version (1.2.0-alpha05) of the Compose Compiler requires Kotlin version 1.6.10 but you appear to be using Kotlin version 1.7.10 which is not known to be compatible.  Please fix your configuration (or `suppressKotlinVersionCompatibilityCheck` but don't say I didn't warn you!).
```

**Solution**

Add a `before-plugins.gradle` file next to your app.gradle containing the following:

```
ext {
    gradlePluginVersion = "7.3.1"
    kotlinVersion = "1.6.10"
}
```

## License

Apache License Version 2.0
