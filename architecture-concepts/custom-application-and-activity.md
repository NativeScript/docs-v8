---
title: Custom Application and Activity
---

## Custom Application and Activity

NativeScript provides a way to create custom `android.app.Application` and `android.app.Activity` implementations.

### Extending the Android Application

1. Create a new TypeScript file in the root of your project folder - name it `application.android.ts` or `application.android.js` if you are using plain JS.
   ::: tip Note
   Note the \*.android suffix - we want this file packaged for Android only.
   :::

2. Copy the following code for TypeScript file:

```ts
// the `JavaProxy` decorator specifies the package and the name for the native *.JAVA file generated.
@NativeClass()
@JavaProxy('org.myApp.Application')
class Application extends android.app.Application {
  public onCreate(): void {
    super.onCreate()

    // At this point modules have already been initialized

    // Enter custom initialization code here
  }

  public attachBaseContext(baseContext: android.content.Context) {
    super.attachBaseContext(baseContext)

    // This code enables MultiDex support for the application (if needed)
    // androidx.multidex.MultiDex.install(this);
  }
}
```

Copy the following code for the JavaScript file:

```js
const superProto = android.app.Application.prototype

// the first parameter of the `extend` call defines the package and the name for the native *.JAVA file generated.
android.app.Application.extend('org.myApp.Application', {
  onCreate: function () {
    superProto.onCreate.call(this)

    // At this point modules have already been initialized

    // Enter custom initialization code here
  },
  attachBaseContext: function (base) {
    superProto.attachBaseContext.call(this, base)
    // This code enables MultiDex support for the application (if needed compile androidx.multidex:multidex)
    // androidx.multidex.MultiDex.install(this);
  }
})
```

3. Modify the application entry within the AndroidManifest.xml file found in the `<application-name>/App_Resources/Android/` folder:

```xml
<application
        android:name="org.myApp.Application"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
```

::: tip Note
This modification is required by the native platform; it tells Android that your custom Application class will be used as the main entry point of the application.
:::

4. In order to build the app, the extended Android application should be added to the webpack.config.js file.

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  webpack.init(env)

  webpack.chainWebpack(config => {
    if (webpack.Utils.platform.getPlatformName() === 'android') {
      // make sure the path to the applicatioon.android.(js|ts)
      // is relative to the webpack.config.js
      // you may need to use `./app/application.android if
      // your app source is located inside the ./app folder.
      config.entry('application').add('./application.android')
    }
  })

  return webpack.resolveConfig()
}
```

The source code of `application.android.ts` is bundled separately as `application.js` file which is loaded from the native Application.java class on launch.

The `bundle.js` and `vendor.js` files are not loaded early enough in the application launch. That's why the logic in `application.android.ts` is needed to be bundled separately in order to be loaded as early as needed in the application lifecycle.

::: warning Note
This approach will not work if application.android.ts requires external modules.
:::

### Extending Android Activity

NativeScript Core ships with a default `androidx.appcompat.app.AppCompatActivity` implementation, that bootstraps the NativeScript application, without forcing users to declare their custom Activity in every project. In some cases you may need to implement a custom Android Activity. In this section we'll look at how to do that!

Create a new `activity.android.ts` or `activity.android.js` when using plain JS.

::: tip Note
Note the `.android.(js|ts)` suffix - we only want this file on Android.
:::

A basic Activity looks as follows:

```ts
import {
  Frame,
  Application,
  setActivityCallbacks,
  AndroidActivityCallbacks
} from '@nativescript/core'

@NativeClass()
@JavaProxy('org.myApp.MainActivity')
class Activity extends androidx.appcompat.app.AppCompatActivity {
  public isNativeScriptActivity

  private _callbacks: AndroidActivityCallbacks

  public onCreate(savedInstanceState: android.os.Bundle): void {
    Application.android.init(this.getApplication())
    // Set the isNativeScriptActivity in onCreate (as done in the original NativeScript activity code)
    // The JS constructor might not be called because the activity is created from Android.
    this.isNativeScriptActivity = true
    if (!this._callbacks) {
      setActivityCallbacks(this)
    }

    this._callbacks.onCreate(this, savedInstanceState, this.getIntent(), super.onCreate)
  }

  public onNewIntent(intent: android.content.Intent): void {
    this._callbacks.onNewIntent(this, intent, super.setIntent, super.onNewIntent)
  }

  public onSaveInstanceState(outState: android.os.Bundle): void {
    this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState)
  }

  public onStart(): void {
    this._callbacks.onStart(this, super.onStart)
  }

  public onStop(): void {
    this._callbacks.onStop(this, super.onStop)
  }

  public onDestroy(): void {
    this._callbacks.onDestroy(this, super.onDestroy)
  }

  public onPostResume(): void {
    this._callbacks.onPostResume(this, super.onPostResume)
  }

  public onBackPressed(): void {
    this._callbacks.onBackPressed(this, super.onBackPressed)
  }

  public onRequestPermissionsResult(
    requestCode: number,
    permissions: Array<string>,
    grantResults: Array<number>
  ): void {
    this._callbacks.onRequestPermissionsResult(
      this,
      requestCode,
      permissions,
      grantResults,
      undefined /*TODO: Enable if needed*/
    )
  }

  public onActivityResult(
    requestCode: number,
    resultCode: number,
    data: android.content.Intent
  ): void {
    this._callbacks.onActivityResult(
      this,
      requestCode,
      resultCode,
      data,
      super.onActivityResult
    )
  }
}
```

```js
import { Frame, Application, setActivityCallbacks } from '@nativescript/core'

const superProto = androidx.appcompat.app.AppCompatActivity.prototype
androidx.appcompat.app.AppCompatActivity.extend('org.myApp.MainActivity', {
  onCreate: function (savedInstanceState) {
    // Used to make sure the App is inited in case onCreate is called before the rest of the framework
    Application.android.init(this.getApplication())

    // Set the isNativeScriptActivity in onCreate (as done in the original NativeScript activity code)
    // The JS constructor might not be called because the activity is created from Android.
    this.isNativeScriptActivity = true
    if (!this._callbacks) {
      setActivityCallbacks(this)
    }
    // Modules will take care of calling super.onCreate, do not call it here
    this._callbacks.onCreate(
      this,
      savedInstanceState,
      this.getIntent(),
      superProto.onCreate
    )

    // Add custom initialization logic here
  },
  onNewIntent: function (intent) {
    this._callbacks.onNewIntent(
      this,
      intent,
      superProto.setIntent,
      superProto.onNewIntent
    )
  },
  onSaveInstanceState: function (outState) {
    this._callbacks.onSaveInstanceState(this, outState, superProto.onSaveInstanceState)
  },
  onStart: function () {
    this._callbacks.onStart(this, superProto.onStart)
  },
  onStop: function () {
    this._callbacks.onStop(this, superProto.onStop)
  },
  onDestroy: function () {
    this._callbacks.onDestroy(this, superProto.onDestroy)
  },
  onPostResume: function () {
    this._callbacks.onPostResume(this, superProto.onPostResume)
  },
  onBackPressed: function () {
    this._callbacks.onBackPressed(this, superProto.onBackPressed)
  },
  onRequestPermissionsResult: function (requestCode, permissions, grantResults) {
    this._callbacks.onRequestPermissionsResult(
      this,
      requestCode,
      permissions,
      grantResults,
      undefined
    )
  },
  onActivityResult: function (requestCode, resultCode, data) {
    this._callbacks.onActivityResult(
      this,
      requestCode,
      resultCode,
      data,
      superProto.onActivityResult
    )
  }
  /* Add any other events you need to capture */
})
```

:::warning Note
The `this._callbacks` property is automatically assigned to your extended class by the `frame.setActivityCallbacks` method. It implements the [AndroidActivityCallbacks interface](https://docs.nativescript.org/core-concepts/application-lifecycle#android-activity-events) and allows the core modules to get notified for important Activity events. It is **important** to use these callbacks, as many parts of NativeScript rely on them!
:::

<!-- TODO: fix links -->

Next, modify the activity in `App_Resources/Android/src/main/AndroidManifest.xml`

```xml
<activity
  android:name="org.myApp.MainActivity"
  android:label="@string/title_activity_kimera"
  android:configChanges="keyboardHidden|orientation|screenSize">
```

To include the new Activity in the build, it has to be added to the webpack compilation by editing the `webpack.config.js`:

```js
const webpack = require('@nativescript/webpack')

module.exports = env => {
  env.appComponents = (env.appComponents || []).concat(['./src/activity.android'])
  webpack.init(env)

  return webpack.resolveConfig()
}
```
