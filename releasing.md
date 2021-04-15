---
title: Releasing
---

# Releasing

## Android

### Overview

You can publish a NativeScript app in _Google Play_ the same way [you would release a purely native Android app](http://developer.android.com/tools/publishing/publishing_overview.html).

1.  Make sure that you have a `.keystore` file to sign your app with. For more information, see [How to create a .keystore file](http://developer.android.com/tools/publishing/app-signing.html#signing-manually)?
2.  Build your project in release mode by running the following command:

    ```cli
    ns build android --release \
      --key-store-path <path-to-your-keystore> \
      --key-store-password <your-key-store-password> \
      --key-store-alias <your-alias-name> \
      --key-store-alias-password <your-alias-password>
    ```

:::tip Note

At the end of `<path-to-your-keystore>` you should also add the exact name of your keystore.

:::

Example

<!-- tab:Windows -->

```cli
ns build android --release --key-store-path C:\keystore\NativeScriptApp.keystore --key-store-password sample_password --key-store-alias NativeScriptApp --key-store-alias-password sample_password
```

<!-- tab:Mac -->

```cli
ns build android --release --key-store-path ~/Desktop/keystore/NativeScriptApp.keystore --key-store-password sample_password --key-store-alias NativeScriptApp --key-store-alias-password sample_password
```

4. Obtain the release `.apk` located at `<app_name>/platforms/android/app/build/outputs/apk/<app_name>-release.apk`. 5. Publish your Android app by uploading the `.apk` file to the Google Developer Console. For more information, see [How to publish an Android app?](http://developer.android.com/distribute/googleplay/start.html)

### Application Id and Package Name

Both _Package Name_, and _Application Id_, are unique identifiers, provided by you for your app.

- _Package Name_ is used to identify resources such as the `R`.
- _Application Id_ is used to identify your app on devices and at the _Google Play_.

In the NativeScript framework, both are set to the `applicationId` in `app.gradle`.
The NativeScript CLI build system will set them as the `package` attribute in the generated project in `platforms/android/src/main/AndroidManifest.xml`.
In the `app/App_Resources/Android/AndroidManifest.xml` it will use a placeholder: `package="__PACKAGE__"`. Do **not** modify the `package` attribute there.

:::tip Note

To edit the _Package Name_ and the _Application Id_, modify the `package.json` of your app and set the `nativescript.id` key.
You may need to delete `platforms/android` and rebuild using the CLI command `ns prepare android`.

:::

[Read more about "ApplicationId versus PackageName"](http://tools.android.com/tech-docs/new-build-system/applicationid-vs-packagename).

### App name

This is the display name for your app. It is purely cosmetic but highly important. For example, it appears under the app icon.
The value can be set via the `App_Resources/Android/src/main/res/values/strings.xml` file. Creating your own `strings.xml` will require population of the `app_name` and `title_activity_kimera` attributes explictly, like so:

```XML
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">MyAppName</string>
    <string name="title_activity_kimera">MyAppName</string>
</resources>
```

By default (or if the project lacks the values above) your application name is generated with the `create` command (e.g. `ns create testApp` will have app name **testApp**)

You can check out more information about [the elements you can define in the `AndroidManifest.xml` here](http://developer.android.com/guide/topics/manifest/application-element.html).

### App icons

App icons are defined similar to the app name.
The icon name is defined in the `app/App_Resources/Android/AndroidManifest.xml` file, as an `android:icon="@drawable/icon"` attribute, on the `<application>` element.

The actual .PNG icons stay at the Android resources in `app/App_Resource/Android/<DPI>/icon.png`, DPIs:

| directory          | DPI | screen                                | size          |
| ------------------ | --- | ------------------------------------- | ------------- |
| `drawable-ldpi`    | 120 | Low density screen                    | 36px x 36px   |
| `drawable-mdpi`    | 160 | Medium density screen                 | 48px x 48px   |
| `drawable-hdpi`    | 240 | High density screen                   | 72px x 72px   |
| `drawable-xhdpi`   | 320 | Extra-high density screen             | 96px x 96px   |
| `drawable-xxhdpi`  | 480 | Extra-extra-high density screen       | 144px x 144px |
| `drawable-xxxhdpi` | 640 | Extra-extra-extra-high density screen | 192px x 192px |

:::tip Note

NativeScript supports adaptive icons on Android 8 and above (API 26+). No code changes are required - follow the [Android guidelines for creating adaptive icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive) for your application.
:::

### Launch screen

#### Creating Launch Screens for Android

Launch screens are essential as they provide a user's first experience with your mobile application.
Based on [Google's Material Design launch screens guidelines](https://material.io/design/communication/launch-screen.html), there are two
main types of launch screens:

- Placeholder UI: A simple seamless transaction type screen
- Branded Launch Screens: A screen providing the user with momentary brand exposure and focus on the content

Instead of displaying a blank white canvas while your app is loading,
creating a launch screen will not only "fill the gap" but also provide the basic introduction
for your users. These basic rules for creating both types of launch screens
are good to follow to create a good first impression:

- avoid using text (except for your logo and tagline)
- avoid using animations (your launch should be as light as possible)
- avoid reusing your launch screen inside your application
- follow Google's [Material design](https://material.io/) rules

#### Setting launch screen and app icons

In NativeScript, your application template (created with `ns create myApp`) ships with a basic launch screen template.
In this article, we are going to introduce the workflow to create/modify your own launch screen.

#### Application resources used for launch screen creation

The default template in NativeScript (created with `ns create myApp`) provides you with a predefined
**splash_screen.xml** file with the NativeScript logo on a blue background and with sample app icons.
To modify that template and create your own launch screen using your own assets and design, you will need to access
the files located under the **app/App_Resources/Android** folder.
Let’s look at the various files and folders in App_Resources/Android
and then look at the specific steps you’ll need to take to change them and configure your launch screen.

- **drawable** folders: In your **app/App_Resources/Android** folder you will find a number of subfolders named drawable-X (where x is the different DPI for the different devices)
  These folders will store your properly scaled images for your app icons, launch screens and in app images (optional).
  Here is the full list of your drawable resources folders.

  - **drawable-ldpi**: Resources for low-density (ldpi) screens (~120dpi).
  - **drawable-mdpi**: Resources for medium-density (mdpi) screens (~160dpi). (This is the baseline density.)
  - **drawable-hdpi**: Resources for high-density (hdpi) screens (~240dpi).
  - **drawable-nodpi**: Resources for all densities. These are density-independent resources. The system does not scale resources tagged with this qualifier, regardless of the current screen's density.

    :::tip Important

    In NativeScript this is the folder that holds **splash_screen.xml** &ndash; the file that creates your launch screen.

    :::

  - **drawable-xdpi**: Resources for extra-high-density (xhdpi) screens (~320dpi).
  - **drawable-xxdpi**: Resources for extra-extra-high-density (xxhdpi) screens (~480dpi).
  - **drawable-xxxdpi**: Resources for extra-extra-extra-high-density (xxxhdpi) uses (~640dpi). Use this for the launcher icon only.

- **values** folder: XML files that contain simple values such as strings, integers, and colors.
  Here is the full list of the files that ship with the basic NativeScript template.

      * **colors.xml**: XML file in which the app colors are declared.
      * **strings.xml**: XML file in which the app string are declared.
      * **styles.xml**: XML file in which the app styles are declared.
      This file holds your `LaunchScreenTheme` style,
      which you can customize to change the `splash_screen.xml` mentioned above.
      Once your application is loaded, the `LaunchScreenTheme` is changed with the `AppTheme` style.

- **values-v21** folder: XML files that contain simple values, such as strings, integers, and colors.
  Used when you need to provide themes supported only on API Level 21+ (e.g., Theme.Material)

- **AndroidManifest.xml** file: Every application must have an `AndroidManifest.xml` file (with precisely that name)
  in its root directory. The manifest file presents essential information about your app to the Android system &ndash;
  information the system must have before it can run any of the app's code.
  In order to change your application icon file, you must modify the `android:icon` key in the `applcation` tag. <Comment: Please review to enure I did not create a technical error. The original text was sort of hard to understand.>
  The default app icon set up:

  `android:icon="@drawable/icon"`

  The code above will look for the file named **icon.png** in the drawable folder and will load the properly scaled image for the current device. <Comment: Please review my rewrite of the sentence above to ensure I did not create an error. You had "drawables folders" but the command referred to a single folder (not plural).>

:::tip Note
In `AndroidManifest` you will find the following key:

`<meta-data android:name="SET_THEME_ON_LAUNCH" android:resource="@style/AppTheme" />`

This key is used by NativeScript to change your `LaunchScreenTheme` with `AppTheme` when your application is loading.
:::

#### How to setup a custom launch screen

In order to change the default NativeScript launch screen (defined in `drawable-nodpi/splash_screen.xml`) and create your own, follow these steps:

1. Put your properly scaled images into the corresponding **drawable** folders.
   This folder can be used not only for your launch screen images, but also for your app icons and for your
   in-app images (you can refer to this resource from your application logic with `"res://image-name"`).
   The default template app ships with three images: **icon.png** (used for app icon), **logo.png** (centered sample image)
   and **background.png** (image used to fill the background).

The default **splash_screen.xml** with centered `logo.png` and filled `background.png`.

```xml
<layer-list
  xmlns:android="http://schemas.android.com/apk/res/android"
  android:gravity="fill"
>
  <item>
    <bitmap android:gravity="fill" android:src="@drawable/background" />
  </item>
  <item>
    <bitmap android:gravity="center" android:src="@drawable/logo" />
  </item>
</layer-list>
```

![Setting images in drawable resource folders](/assets/releasing/launch-android-005.png 'Setting images in drawable resource folders')

2. Define the colors you want to use in **values/colors.xml** and in **values-v21/colors.xml**.
   You can set your own colors and reuse them in the splash_screen.xml file for your launch screen (or reuse them in your app).

![Setting colors in values folders](/assets/releasing/launch-android-002.png 'Setting colors in values folders')

3. Define the strings you want to use in **values/strings.xml** and in **values-v21/strings.xml**.
   You can set your own string here and reuse them in the **splash_screen.xml** file for your launch screen (or reuse them in your app).

![Setting strings in values folders](/assets/releasing/launch-android-003.png 'Setting strings in values folders')

4. Define the styles and themes you want to use in **values/styles.xml** and in **values-v21/styles.xml**.
   Note that styles applied in the values-v21 folder will be applied only to devices with API 21+. <Comment: Did you mean DPI 21+>

The default NativeScript template ships with two themes: `LaunchScreenTheme` (used for your initial launch)
and `AppTheme` (used for your main application).

![Setting styles in values folders](/assets/releasing/launch-android-004.png 'Setting styles in values folders')

:::tip Note

If your project comes with no folders **values**, **values-v21** and/or **drawable-xxx**, you can create them manually and add the files needed accordingly. Or you can use [the default set of styles and themes used in NativeScript](https://github.com/NativeScript/nativescript-marketplace-demo/tree/master/app/App_Resources/Android).

:::
Notice that you can **NOT** have custom folders inside your App_Resources.
Only folders that are required by the Android convention <Comment: convention seems like the wrong word. Do you mean operating system?> are allowed and they must be created with the exact names
provided (e.g., **values**, **values-v21**, **drawable**). When adding new folders in your App_Resources you should reset your
platform folder.

```cli
ns platform remove android
ns platform add android
```

Once your launch screen is fully set, rebuild your application and your launch screen is ready.
On some occasions, you might need to reset your platform folder as mentioned above.

### Certificates

#### Debug certificate

These are automatically generated by the Android SDK tools for you.

In debug mode, you sign your app with a debug certificate.
This certificate has a private key with a known password.
The process is handled by the Android tooling.

You can read more at ["Signing in Debug Mode"](http://developer.android.com/tools/publishing/app-signing.html).

#### Release certificate

The release certificate for Android is created by you; it does not have to be signed by a certificate authority.
It is easier to create a release certificate for Android than it is for iOS. You should, however, be more careful with your certificate.

A few pitfalls are:

- You create the certificate only once. If you lose it, you will not be able to publish any updates to your app, because you must always sign all versions of your app with the same key.
- If your certificate expires, you will not be able to renew it. Ensure long validity when creating a new certificate (for 20+ years).
- If a third party obtains your private key, that party could sign and distribute apps that maliciously replace your authentic apps or corrupt them.

You can generate a private key for a release certificate using the [keytool](http://docs.oracle.com/javase/6/docs/technotes/tools/solaris/keytool.html).

```cli
keytool -genkey -v \
  -keystore <my-release-key>.keystore \
  -alias <alias_name> \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

This will run an interactive session collecting information about your name, organization and most importantly &mdash; keystore and alias passwords.

### Google Play Developer Console

You will need a developer account and you will need to log into the [Google Play Developer Console](https://play.google.com/apps/publish/).

Go to the **All applications** section and click the **+ Add new application** button.

- You will get prompted to provide the app title

- You can then proceed with the store listings.

- You can fill in app description, screenshots and so on.

- You can also submit an APK. Read about how to obtain an APK from a NativeScript app.

### Builds

#### Build versioning

We have already explained how the _Application Id_ is set in your project, how icons are added to your app and how you can set the display name.

Before the build, you need to set two important things: the _versionCode_ and the _android:versionName_.

When a build is uploaded, its _versionCode_ should be larger than previous builds.
A new build with a higher _versionCode_ is considered an upgrade to builds that have a lower _versionCode_.
The _versionCode_ is an integer so you should carefully consider a strategy for versioning.

Both values are stored in `app/App_Resources/Android/AndroidManifest.xml`.

:::tip Note

`android:versionName` is a string value, which is used to represent the application version to the user whereas `android:versionCode`, which is integer value showing version of the application code relative to the other versions.
You can read more about ["Versioning Your Applications"](http://developer.android.com/tools/publishing/versioning.html).

:::
In the `app/App_Resources/Android/AndroidManifest.xml`, the _versionCode_ and _versionName_ appear as:

```
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
      package="org.nativescript.name"
      android:versionCode="2"
      android:versionName="1.1">
      ...
```

#### Build signed release APK

You can perform a full build and produce a signed APK using the NativeScript CLI:

```cli
ns build android --release \
  --key-store-path <path-to-your-keystore> \
  --key-store-password <your-key-store-password> \
  --key-store-alias <your-alias-name> \
  --key-store-alias-password <your-alias-password> \
  --copy-to <apk-location>.apk
```

You can then use the produced `<apk-location>.apk` for upload to _Google Play_.

### APKs with ABI splits

:::tip Note

The recommended approach for reducing the app size by splitting it per architecture is the [Android App Bundle](#android-app-bundle) which is supported out of the box through the `--aab` NativeScript CLI flag.

:::

#### Android ABI split

If the recommended Android App Bundle approach is not applicable for you, an ABI split could be manually configured as an alternative. The ABI split approach will produce different apk files for the different architectures.
To achieve this you need to enable ABI splits at **app/App_Resources/Android/app.gradle**

#### Enable ABI split

```
android {
....
  defaultConfig {
    ....
    ndk {
      abiFilters.clear()
    }
  }
  splits {
    abi {
      enable true //enables the ABIs split mechanism
      reset() //reset the list of ABIs to be included to an empty string
      include 'arm64-v8a', 'armeabi-v7a', 'x86'
      universalApk true
    }
  }
....
```

#### Publishing ABI split apk

Now you will need to upload all built apk files in Google Play Developer Console. To achieve this the different apks need to have different Version Codes otherwise Google Play won't allow adding them in the same version.
To use different Version Codes you can add the following code in your `App_Resources/Android/app.gradle` which will prefix the different architecture apk Version Codes with different prefixes:

```
project.ext.abiCodes = ['armeabi-v7a': 1, 'arm64-v8a': 2, 'x86': 3]

android.applicationVariants.all { variant ->
    variant.outputs.each { output ->
        def baseAbiVersionCode = project.ext.abiCodes.get(output.getFilter("ABI"), 0)
        if (baseAbiVersionCode != null) {
            output.versionCodeOverride = baseAbiVersionCode * 10000000 + variant.versionCode
        }
    }
}
```

<h4 id="submit-with-the-google-play-developer-console">Submit with the Google Play Developer Console</h4>

To submit your app to the _Google Play Developer Console_:

1. Log into the [Google Play Developer Console](https://play.google.com/apps/publish).
2. Select your application and go to the **APK** section.
3. Choose _Production_, _Beta_ or _Alpha_ stage and click the **Upload new APK**.
4. Select the APK produced by the CLI.

You can read more about these stages at ["Set up alpha/beta tests"](https://support.google.com/googleplay/android-developer/answer/3131213?hl=en).

Once you upload your APK, it will go through a review. When approved, you can move it to production to make it available on _Google Play_.

### Android App Bundle

Android App Bundle is a new publishing format that contains all the compiled code and resources of your app, but leaves the actual APK generation and signing to Google Play. The store then uses the app bundle to generate and serve optimized APKs based on the device configuration of the specific user. In general, the benefit of using Android App Bundles is that you no longer have to build, sign, and manage multiple APKs to support different devices, and users get smaller, more optimized downloads. For more information about the Android App Bundle, see the About Android App Bundles article in the official [Android Developer documentation](https://developer.android.com/guide/app-bundle/).

#### Produce Android App Bundle

You can perform a full build and produce a signed AAB using the NativeScript CLI:

```cli
ns build android --release \
  --key-store-path <path-to-your-keystore> \
  --key-store-password <your-key-store-password> \
  --key-store-alias <your-alias-name> \
  --key-store-alias-password <your-alias-password> \
  --aab \
  --copy-to <aab-location>.aab
```

#### Changing the default target architectures

:::warning Warning

Filtering the target architectures does not reduce the app size, it just drops the support for the devices and emulators using the missing architecture.

:::
By default, the generated `aab` file supports all of the available device architectures - `armeabi-v7a`, `arm64-v8a`, `x86` and `x86_64`. This behavior can be overridden from your `App_Resources/Android/app.gradle`'s `apiFilters` property:

```
android {
....
  defaultConfig {
    ....
    ndk {
      abiFilters.clear()
      abiFilters "x86_64", "x86", "arm64-v8a", "armeabi-v7a"
    }
  }
....
```

#### Testing the produced `.aab` file

Starting from NativeScript CLI 6.2.0, the Android App Bundle is supported out of the box by the `ns run` command:

```cli
ns run android \
  --key-store-path <path-to-your-keystore> \
  --key-store-password <your-key-store-password> \
  --key-store-alias <your-alias-name> \
  --key-store-alias-password <your-alias-password> \
  --aab
```

#### Testing the produced `.aab` file before NativeScript 6.2

For older NativeScript version, in order to test the `apk` files that Google Play will produce from the `.aab` for a specific device you will need to use the Android `bundletool` or upload to Google Play and use a test track.

If you use the `bundletool` you should first generate an `.apks` file that will later be used to deploy on a device.

```cli
java -jar <toolPath>/bundletool.jar build-apks \
  --bundle=<somePath>/app.aab  \
  --output="<somePath>/my_app.apks" \
  --ks=<path-to-keystore-file> \
  --ks-pass=pass:<keystore-pass> \
  --ks-key-alias=<key-alias> \
  --key-pass=pass:<key-pass> \
```

Then you can install the application on a connected device by executing:
:::tip Note

Devices running Android 4.4 (API level 19) and lower don’t support downloading and installing split APKs. On such devices `bundletool` will not be able to deploy the application. When the bundle is released Google Play will serve a single multi-APK to such devices.

:::

```cli
java -jar <toolPath>/bundletool.jar install-apks \
  --apks="somePath/my_app.apks" \
  --device-id=<deviceId>
```

You can find more information about using Android `bundletool` [here](https://developer.android.com/studio/command-line/bundletool).

You can perform a full build and produce a signed AAB using the NativeScript CLI:

```cli
ns build android --release \
  --key-store-path <path-to-your-keystore> \
  --key-store-password <your-key-store-password> \
  --key-store-alias <your-alias-name> \
  --key-store-alias-password <your-alias-password> \
  --aab \
  --copy-to <aab-location>.aab
```

Then you can use the produced file to upload it to Google Play Developer Console following the steps described in [Google Android Developer Documentation](https://developer.android.com/studio/publish/upload-bundle).

#### Submission automation

Some tools allow the submission process to be automated - [MIT Licensed one: fastlane](https://github.com/fastlane/fastlane).
You can also hack your own scripts around the [Google Play Developer API](https://developers.google.com/android-publisher/api-ref/edits/apks/upload).

### Publish

Once you successfully upload your APK, and it passes Google review, you will be able to move your APK to production, and it will go live on _Google Play_.

## iOS

You can publish a NativeScript app in the _App Store_ the same way you would [release a purely native iOS app](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/Introduction/Introduction.html).

1.  Verify that the iOS native project inside your app contains your latest changes and resources by running the following command.
    ```cli
    ns prepare ios --release
    ```
2.  Open the iOS native project in Xcode. Your native project is located at: `{app-name}/platforms/ios/{app-name}.xcworkspace` (or in `{app-name}/platforms/ios/{app-name}.xcodeproj` if the project does not contain any native iOS libraries).
3.  [Configure the project for distribution](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html).
4.  [Upload the app to App Store Connect](https://help.apple.com/xcode/mac/current/#/dev442d7f2ca).
5.  [Submit it to the _App Store_](https://help.apple.com/app-store-connect/#/dev301cb2b3e).

### Creating iOS NativeScript app

#### Bundle ID

The _Bundle ID_ is a unique identifier, provided by you for your app. It uses reverse domain name notation. For example, the NativeScript CLI will use `org.nativescript.<AppName>` as default. During `ns create` you can provide the _Bundle ID_ using the `--appid <id>` option.

In iOS apps, the _Bundle ID_ is stored in the `CFBundleIdentifier` in the `Info.plist`, but the NativeScript CLI will explicitly set this to the value of the `nativescript.id` key stored in the `package.json` file in the root of your application.

:::tip Note

To edit the _Bundle ID_, edit the `package.json` of your app and set the `nativescript.id` key.

:::

The _Bundle ID_ is used to precisely identify your app at various situations and plays an important role, when it is built and launched by the CLI, as well as when _Provisioning Profiles_ and certificates are created in the _Apple Member Center_.

For more information consider [the 'About Bundle IDs' section in the following article](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html).

### App name

This is the display name for your app. It is purely cosmetic but highly important. For example, it will appear under the app icon.
The value is stored in the `app/App_Resources/iOS/Info.plist` file as the `CFBundleDisplayName` key.

### App icons

The NativeScript framework will use icons from `app/App_Resources/iOS/`. All files from that folder are added as resources in the generated Xcode project in `platforms/ios`.

_App Store_ submissions will be rejected if certain icon files are not present. To ensure you have the required icons, you can consider the following Apple article: ['App Icons on iPad and iPhone'](https://developer.apple.com/library/ios/qa/qa1686/_index.html).

If you want to extend the default icon set, and you don't want to use the default naming, or you need finer control, you can use the `app/App_Resources/iOS/Info.plist`.
List the icons using [`CFBundleIconFiles`](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-SW10) or [`CFBundleIcon`](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-SW13).

For example, listing icons using `CFBundleIconFiles`:

#### Example 1: How to customise Info.plist.\_\_>

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <!-- The full content of the Info.plist still should be here. -->
    <key>CFBundleIconFiles</key>
    <array>
      <string>Icon@2x.png</string>
      <string>Icon.png</string>
      <string>Icon-Small@3x.png</string>
      <string>Icon-Small@2x.png</string>
      <string>Icon-Small.png</string>
      <string>Icon-Small-50@2x.png</string>
      <!-- etc -->
    </array>
  </dict>
</plist>
```

### Launch files

Launch screens are an essential part of your iOS app. This is the first thing your users see when they start your app.

The Springboard will play a subtle animation transitioning from the home screen to your app. In order to provide a pleasing experience, it's best to avoid a default that's entirely black or white.

The launch files are not a splash screen; instead, they are a way for the OS to quickly grab a preview image of your app and use it during the first ~300ms while your app is booting.

[For design guidelines you can consider the following article provided by Apple](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/LaunchImages.html).

:::tip Note

If you think that following these guidelines will result in a plain, boring launch image, you’re right. Remember, the launch image doesn’t provide you with an opportunity for artistic expression. It’s solely intended to enhance the user’s perception of your app as quick to launch and immediately ready for use.

:::

_App Store_ submissions will be rejected if certain launch files are not present. Make sure that when new iOS versions and devices are released that you update your _launch files_ and accommodate the upcoming form factors.

If a customer runs your app on a device with a high resolution screen and your app is missing the launch screen file for that device, then iOS will render your app using a smaller resolution, degrading its quality:

- Your app may be upscaled, and blurred
- Your app may have black areas

Earlier iOS versions had to support a small range of form factors. Providing a different launch image per screen size was trivial. With the new devices released by Apple, the number of images that had to be provided increased. That's where Apple introduced the _launch screen storyboard_.
The storyboard allows basic primitives such as images to be presented on the screen, and you can have dynamic layout using layout constraints. This makes it possible to design a single _launch screen_ that fits well for all form factors.

The NativeScript framework default project has a _Launch Screen Storyboard_ and _Launch Images_. In iOS8 and later, your app may use storyboards; your app can use launch images for devices that run earlier versions of iOS.

#### Launch screen images

The images are placed, similar to the icons already mentioned, in `app/App_Resources/iOS`. The default project template ships several `Default-*.PNG` files there; you may consider changing them.

In iOS8 and later versions, your app will display its storyboard. If you want to use images on all devices, you can consider disabling the _Launch Screen Storyboard_. Instructions for how to do this are explained later in the next section.

Similar to the icons, you can use the [`UILaunchImageFile`](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/iPhoneOSKeys.html#//apple_ref/doc/uid/TP40009252-SW24) and [`UILaunchImages`](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/iPhoneOSKeys.html#//apple_ref/doc/uid/TP40009252-SW28) key in the `app/App_Resources/iOS`.

#### Launch screen Storyboard

The NativeScript framework will provide a _Launch Screen Storyboard_ in `platforms/ios/<YourAppName>/en.lproj/LaunchScreen.xib`, but does **not** yet provide a means to store it at `app/App_Resources/iOS`.
If you want to edit it you can use the `.xcodeproj` generated in `platforms/ios`. You will have to add it in source control.
CLI rebuilds may overwrite it, so you will have to watch out for automatic changes in it when you commit.

To disable the default _Launch Screen Storyboard_, remove the `UILaunchStoryboardName` from the `app/App_Resources/iOS/Info.plist`:

```xml
<key>UILaunchStoryboardName</key>
<string>LaunchScreen</string>
```

This will force all supported launch screens to use the _launch image_.

#### Creating App Icons and Launch Screens for iOS

Publishing your iOS app is an essential step in the development process and in order for your iOS application
to be published successfully in the App Store, there are some requirements that need to be fulfilled.
As described in [iOS Human Interface Guidelines](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html) setting the following is mandatory:

- App name
- App icon
- Launch image or files

In NativeScript, your application comes with predefined template settings and images for these steps.
In this article, we are going to introduce the workflow to create your own launch screens.

:::warning Warning

Occasionally, the iOS operating system caches your application’s icons and launch screens. If you’re updating icons or launch screens and not seeing your changes, delete the application from your device or emulator and redeploy. If on a real device: remove `platforms` folder from your project, delete app, restart device, redeploy.

:::

#### Setting launch screen and App Icons

Setting up launch screens depends on the version of iOS you are targeting.
In iOS 7 and lower, the approach for creating the launch screen is to use static image resources.
The drawback of this method is that the app developer will have to provide many different
images, each with different resolution for each iOS device. In iOS 8 and above, the approach is to create
a LaunchScreen.storyboard, which is much more powerful in terms of customization and is easier to maintain.

The default Hello-World project in NativeScript is provided with default settings that supports both
approaches. When you build your app for devices with iOS lower then version 8, NativeScript will use the static images and when you use NativeScript to build your app for devices with iOS 8 and above, it will use the provided LaunchScreen.storyboard.

#### How to set your launch screen

The default template in NativeScript (created with `ns create myApp`) provides you with predefined
AppIcons, launch images and a LaunchScreen.storyboard all with the NativeScript logo.
To modify that template and create your own launch screen using your own assets and design, you will need the following:

- **app/App_Resources/iOS/Assets.xcassets**: The resource that holds your image asset catalogs (for AppIcons, LaunchImages and LaunchScreen).

- **app/App_Resources/iOS/LaunchScreen.storyboard**: Your default storyboard used for your launch screen (used in iOS versions 8+).

- **app/App_Resources/iOS/build.xcconfig**: The resource that holds the references to the assets catalogs which will be used
  (optional: modify only if you change the name convention or introduce a new image asset catalog).

- Xcode 7.1 or newer version (optional: needed only if you prefer WYSIWYG workflow for changing your images).

The workflow for creating your own launch screen can be handled from Xcode or manually in the NativeScript enviroment.
In this article we are going to cover both the manual and the Xcode WYSIWYG approach.

In your **app/App_Resources/iOS/Assets.xcassets** you will find the following sub-folders:

- **AppIcon.appiconset**: The resource that holds the images for your AppIcons (all iOS versions).

- **LaunchScreen.AspectFill.imageset**: The resource that holds the background image for your LaunchScreen.storyboard.

- **LaunchScreen.Center.imageset**: The resource that holds the centered image for your LaunchScreen.storyboard.

#### Customizing App Icons

- Changing AppIcons: manual approach

Open **AppIcon.appiconset** and change the default icons images with your own using the proper resolution for each image (e.g., icon-29.png should be 29px x 29px; icon-29@2x should be 58px x 58px; icon-29@3x should be 87px x 87px).
If your images have different file names then open Contents.json and change the key `filename` for each image.

![App icons config.json](/assets/releasing/launch-screen-howto-002.png 'App icons config.json')

- Changing AppIcons: Xcode WYSIWYG approach

Drag and drop your **Assets.xcassets** into Xcode (7.1 or newer version).
In the opened window choose **AppIcon** and add a proper image for each iOS version and device.
Close Xcode and rebuild your NativeScript app to use the new AppIcons.

![AppIcon setup in Xcode](/assets/releasing/launch-screen-howto-003.png 'AppIcon setup in Xcode]')

#### Customizing launch images

- Manual approach

Open **LaunchImage.launchimage** and change the default launch images with your own using the proper resolution for each image (e.g., Default-568h@2x.png should be 640px x 1136px).
If your images have different file names then open Contents.json and change the key `filename` for each image.

| Device                  | Image Resolution | Image name                 |
| ----------------------- | ---------------- | -------------------------- |
| iPhone 1g-3Gs           | 320x480          | `Default.png`              |
| iPhone 4, 4s            | 640x960          | `Default@2x.png`           |
| iPhone 5, 5c, 5s        | 640x1136         | `Default-568h@2x.png`      |
| iPhone 6s - 8           | 750x1334         | `Default-667h@2x.png`      |
| iPhone 6s Plus - 8 Plus | 1242x2208        | `Default-736h@3x.png`      |
| iPhone X                | 1125px × 2436px  | `Default-1125h.png`        |
| iPhone X Landscape      | 2436px × 1125px  | `Default-Landscape-X.png`  |
| iPad, iPad 2, Mini      | 768x1024         | `Default-Portrait.png`     |
| iPad Landscape          | 1024x768         | `Default-Landscape.png`    |
| iPad Retina             | 1536x2048        | `Default-Portrait@2x.png`  |
| 12.9" iPad Pro          | 2048x1536        | `Default-Landscape@2x.png` |

:::tip Note

For a better understanding of the supported image resolutions for the different iOS devices, refer to [iOS Human Interface Guidelines](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27-SW1) or check our reference table.
:::

- Xcode WYSIWYG approach

Drag and drop your **Assets.xcassets** into Xcode (7.1 or newer version).
In the opened window add the proper image for each iOS version and device.
Close Xcode and rebuild your NativeScript app to use the new launch images.

:::tip Important

Make sure you have provided all required images or your app wil be rejected from publishing in the App Store.

:::

#### Customizing LaunchScreen.storyboard

The default template app in NativeScript comes with **LaunchScreen.storyboard**, which contains two image views.
The first one, named **LaunchScreen.AspectFill.imageset**, is used to visualize your background.
The second one, named **LaunchScreen.Center.imageset**, is used to visualize your centered logo.
Your own storyboard can be customized to use your own logic with different images and styles.
However, keep in mind that according to iOS Human Interface Guidelines, the LaunchScreen should be as light as possible
with minimal or no moving elements and text labels. It is meant to provide immediate UX rather than artistic presentation.

![LaunchScreen setup in Xcode](/assets/releasing/launch-screen-howto-010.png 'LaunchScreen setup in Xcode')

##### Customizing LaunchScreen.AspectFill

- Manual approach

Open **LaunchScreen.AspectFill.imageset** and change the default LaunchScreen.AspectFill images with your own using the proper scale for each image (1x, 2x and 3x).
As this is an image that will be used in your LaunchScreen.storyboard, your actual resolution may vary depending on your design.
The default NativeScript template ships a LaunchScreen-AspectFill.png and LaunchScreen-AspectFill@2x.png used as a sample background.
If your images have different file names then open Contents.json and change the key `filename` for each image.

:::tip Important

After each file change in the **Assets.xcassets** folder you should rebuild your project and restart your emulator to avoid visualizing cached images.

:::

- Xcode WYSIWYG approach

Drag and drop your **Assets.xcassets** into Xcode (7.1 or newer version).
In the opened window choose **LaunchScreen.AspectFill** and add the properly scaled image for each entry (1x, 2x and 3x).
Close Xcode and rebuild your NativeScript app to use the new LaunchScreen.AspectFill.

![LaunchScreen.AspectFill setup in Xcode](/assets/releasing/launch-screen-howto-008.png 'LaunchScreen.AspectFill setup in Xcode')

##### Customizing LaunchScreen.Center

- Manual approach

Open **LaunchScreen.Center.imageset** and change the default LaunchScreen.Center images with your own using the proper scale for each image (1x, 2x and 3x).
As this is an image that will be used in your LaunchScreen.storyboard, your actual resolution may vary depending on your design.
The default NativeScript template ships a LaunchScreen-Center.png and LaunchScreen-Center@2x.png used as a sample center logo image.
If your images have different file names then open Contents.json and change the key `filename` for each image.

:::tip Important

After each file change in the **Assets.xcassets** folder you should rebuild your project and restart your emulator to avoid visualizing cached images.

:::

- Xcode WYSIWYG approach

Drag and drop your **Assets.xcassets** into Xcode (7.1 or newer version).
In the opened window choose **LaunchScreen.Center** and add the properly scaled image for each entry (1x, 2x and 3x).
Close Xcode and rebuild your NativeScript app to use the new LaunchScreen.Center.

![LaunchScreen.Center setup in Xcode](/assets/releasing/launch-screen-howto-009.png 'LaunchScreen.Center setup in Xcode')

### Certificates, identifiers & profiles

Certificates, identifiers and profiles are managed at [https://developer.apple.com/membercenter](https://developer.apple.com/membercenter).

[You should really explore the information Apple provides on certificates and identities](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingCertificates/MaintainingCertificates.html).
This article will cover only the basics.

### Account with Apple ID

You will need a developer account with an _Apple ID_ so you can access the [Apple Developer Member Center](https://developer.apple.com/membercenter).

You will need to be added as an iOS developer in your organization.

### Development certificates

Development certificates are used to sign iOS apps proving the origin of the app. If you plan to use the Xcode tooling it would be best to create a _development certificate_.

A few pitfalls are:

- A developer is allowed to have one certificate at any time. You must 'revoke' an existing certificate before you can create a new one.
- Certificates consist of public and private keys. The private key is never sent to Apple, so you cannot 'download' your certificate from the _Member Center_. If you lose the private key of your certificate, you have to revoke it and create a new one.
- When revoked or expired, the certificates may further invalidate _provisioning profiles_. Once the certificate is recreated, the _provisioning profiles_ need to be updated as well.
- Making a certificate requires a Mac. You use the Keychain Access tool to create a certificate request, generating a public and private keys at your side, then send the public key to Apple while storing the private key in your keychain.
- If you follow the steps at the _Member Center_ to create a new _development certificate_, the certificate must be stored in your keychain. You can consider exporting it and backing it up.

:::tip Note

Go to [https://developer.apple.com/account/ios/certificate/certificateList.action?type=development](https://developer.apple.com/account/ios/certificate/certificateList.action?type=development) click the '+' (add) button and follow the instructions for making a new 'iOS App Development' certificate.

:::

### Production certificates

_Production certificates_ work similarly to development certificates. They consist of public and private keys. The private key stays at your side and is never sent to Apple. Your app is signed with the distribution certificate using your private key,
so Apple can verify the origin of submissions in _iTunes Connect_ using the public key you sent them.

This _production certificates_ is used to sign the application binary when it is prepared for submission.
Usually when an app is built for a device, its IPA file is signed with the development certificate.

:::tip Note

You can read more about IPA (file extension) [here](<https://en.wikipedia.org/wiki/.ipa_(file_extension)>)
Later, the tooling resigns the IPA with the _production certificate_ and appends the distribution provisioning profile when submitting to _iTunes Connect_.

:::

A few pitfalls are:

- Creating _production certificates_ are more restricted than creating development certificates. Apple limit the number of _production certificates_ per team.
- Because production certificates are limited in quantity per team, and frequently shared between multiple team members, you must be extremely careful when you revoke an existing distribution certificate. If you ultimately lost your private key of a distribution certificate and revoke it, consult with anyone that may have backed it up or is in need of the new certificate. Hopefully this will avoid your new copy being revoked in the future or losing your admin rights.
- _Production certificates_ can be shared between team members. If you follow the steps at the _Member Center_ to create a new one (link below) the certificate will be stored in your keychain. You can export it as a .p12 file, easily backing it up and sharing it with senior team peers.

If you need a new distribution certificate, go to [https://developer.apple.com/account/ios/certificate/certificateList.action?type=distribution](https://developer.apple.com/account/ios/certificate/certificateList.action?type=distribution) click the '+' (add) button and follow the instructions for making a new 'App Store Distribution' certificate. Chances are you are part of a larger organization and your role does not have sufficient rights to create a new distribution certificate. Admins or other team member may provide you the certificates in that case. In such cases, you will probably be given a .p12 file and a password. You should import the file in your keychain using the `Keychain Access` application.

### Identifiers - App IDs

To test your app on a device or submit in the _App Store_, you will need to create an _App ID_.
App IDs consist of a _Prefix_ or a _Team ID_ that is generated by Apple, followed by an ID provided by you that must match your _Bundle ID_.
For example, you can create an _App ID_ with the `org.nativescript.*` ID that will match all your NativeScript apps.
The wildcard pattern imposes some restrictions on the services you can use, so you may also consider using a non-wildcard pattern such as `org.nativescript.<my-app>`.

These identifiers are later used to bind apps with _provisioning profiles_.

### Devices

At the _Member Center_ you can register the devices you and your team use for testing.
Go to [https://developer.apple.com/account/ios/device/deviceList.action](https://developer.apple.com/account/ios/device/deviceList.action).

To register a phone you will need its UDID. Connect it to the Mac and run in a terminal:

```cli
instruments -s devices
```

It will output all known devices and their UDIDs.

### Development provisioning profiles

Development provisioning profiles bind together one or multiple developer signing identities (developer certificates), _App ID_ and device IDs.
These are created at [https://developer.apple.com/account/ios/profile/profileList.action?type=limited](https://developer.apple.com/account/ios/profile/profileList.action?type=limited).
If you are making a new one, or adding a new app to an existing one, make sure to select these three:

- Your _development certificate_
- _App ID identifier_, that matches your App ID
- The _device_ you will test on

Unlike the certificates, _provisioning profiles_ are files that can be easily updated and downloaded from the Member Center (in .mobileprovision files) and installed in Xcode by double-clicking that file.

Xcode is also capable of obtaining these automatically. Open Xcode and from the menu go to `Xcode > Preferences... > Accounts > (select your apple ID) > (double-click on your Team Name)`.
There you can check all signing identities (developer and _production certificates_) available to Xcode as well as `Download All` _provisioning profiles_.

When you run an app on a device, Xcode will sign the app with your development certificate and add a provisioning profile that has your certificate, device ID and App ID.

While the _development provisioning profiles_ are easily created and updated, they frequently invalidate, especially when multiple _developer certificates_ are involved. Every time one of them is revoked or expires, you need to update the provisioning certificate.

These are not of a particular interest for _App Store_ submissions but you may need one to test on a real device.

### Distribution provisioning profiles

There are several _distribution provisioning profile_ types. The one you will need for _App Store_ submission is 'App Store Distribution Provisioning Profile'.
These are similar to the _development provisioning profiles_ because they bind:

- Your _distribution certificate_
- Your _device_-es
- An _App ID_
- Various settings, enabled services, etc.

_Distribution provisioning profiles_ are created at [https://developer.apple.com/account/ios/profile/profileList.action?type=production](https://developer.apple.com/account/ios/profile/profileList.action?type=production).

For _App Store_ submissions, you must create an _App Store Distribution Provisioning Profile_. Once you create it, download it and double-click it on your Mac so it gets registered with Xcode.

_Distribution provisioning profiles_ invalidate rarely since they refer a single _Distribution Certificate_.

## App Store Connect

While you manage your _provisioning profiles_ and certificates at the _Apple Developer Member Center_, apps are registered and submitted at [App Store Connect](https://appstoreconnect.apple.com) (former iTunes Connect).
This is where you will be able to create new apps, prepare app screens, descriptions, manage app versions, etc.

### Account

You will need your _Apple ID_ added to your organization with sufficient rights at [https://appstoreconnect.apple.com](https://appstoreconnect.apple.com).

### Creating an app

To publish your app in the iOS _App Store_ you will have to register your app. Log into [https://appstoreconnect.apple.com](https://appstoreconnect.apple.com) and go to 'My Apps'.
There you can check the status and edit existing apps or create a new app.

Click the '+' button at the top left corner. The 'New App' dialog should appear. There you have to fill the public _App Store_ name of your app and primary language.

Also, you have to set _Bundle ID_, which must match the _Bundle ID_ referred in ['1.1. Bundle ID'](#bundle-id).
If the drop-down does not contain a suitable match, you are probably missing an _App ID_ referred at ['2.4. Identifiers - App IDs'](#identifiers-app-ids).
If there is a wildcard _App ID_, that is a potential match so select it. You will be able to type the suffix, replacing the wildcard in a text box.

At that point you have to fill in the App Information.
There are various assets that you must provide such as screenshots, icons, description, etc.
Failing to provide all necessary assets may prevent you from submitting your app, or result in app rejection.

:::tip Note

Screenshots not matching the actual app may result in rejection of a new version sent for approval.

:::

### Builds

Once you have your app information registered at [https://appstoreconnect.apple.com](https://appstoreconnect.apple.com) it is time to build your NativeScript app for iOS and submit it to _iTunes Connect_ — using Xcode.

#### Build versioning

We have already explained how the _Bundle ID_ is set in your project, how the launch screen (or storyboard) and images are added to your app, and how you can set the display name.

Before the build, you need to set two important things: the _Bundle Short Version String_ and the _Bundle Version String_.

_Bundle Short Version String_ is the public version of your app. It is incremented between releases. For example: `2.1`.
_Bundle Version String_ is the internal build number. One public release usually has multiple release candidates. For example `2.1.1`, `2.1.2`, etc.

iTunes Connect has a restriction that a bundle cannot be uploaded with the same version twice, so you must increment the _Bundle Version String_ with each upload.

The _Bundle Short Version String_ should be incremented once your app version is uploaded, sent for approval, approved and published.

Both values are stored in `app/App_Resources/iOS/Info.plist`:

- The `CFBundleShortVersionString` key stores the _Bundle Short Version String_.
- The `CFBundleVersion` key stores the _Bundle Version String_.

In the `app/App_Resources/iOS/Info.plist` they appear as:

```xml
<key>CFBundleShortVersionString</key>
<string>2.1</string>
<key>CFBundleVersion</key>
<string>2.1.2</string>
```

If you need to edit these from the command line, there is a handy tool called `PlistBuddy` that can read and write Plist files.
For example, the following shell script appends the Jenkins `$BUILD_NUMBER` to the `CFBundleVersion` in the Info.plist:

```bash
### Set CFBundleVersion ###
export CFBundleVersion=`/usr/libexec/PlistBuddy app/App_Resources/iOS/Info.plist -c "Print :CFBundleVersion"`
/usr/libexec/PlistBuddy app/App_Resources/iOS/Info.plist -c "Set :CFBundleVersion $CFBundleVersion.$BUILD_NUMBER"
```

### Submit from the NativeScript CLI

You can execute the following command inside a NativeScript project using the CLI:

```cli
ns publish ios
```

The command will prompt for your `Apple ID` and `Password` for authentication with [iTunes Connect](https://itunesconnect.apple.com) and then produce a `release` build and proceed to upload it to iTunes Connect.

Alternatively, you can use an existing build by running the following command:

```cli
ns publish ios --ipa <path-to-ipa>
```

For more information, run the following command:

```cli
ns help publish ios
```

### Submit from Xcode

You can execute the following command using the CLI:

```cli
ns prepare ios
```

This will create an Xcode project in `platforms/ios/`. Then you may consider the following Apple article about how to [configure the project for distribution](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html).

The `platform` folder is not meant to stay in source control and you should be careful when you do modifications there.
Rebuilds may erase your changes and you should add changed files to source control.

A common pitfall, if you are using CocoaPods, is to open the Xcode project instead of the workspace, so be sure to open the workspace.

Once you have it open in Xcode, you have to go to your target's `Signing & Capabilities` and pick a team.
In `Build Settings` there should be a suitable 'iOS Developer' and 'Code Signing Identity'.

From the top drop-down, select your target, and from the devices and emulators, pick 'Generic iOS Device'.

Then you should be able to select from the top menu `Product > Archive`.

This makes an xcodearchive and opens it in the Xcode Organizer.
The Xcode Organizer displays a list with builds of your app. Pick the last build and click `Upload to App Store...`.
You should select a team again and whether to include app symbols for your app. Next, you can see a list with the binary information, entitlements, etc.
Click `Upload`.

If you upload successfully, you should be able to log in at [https://appstoreconnect.apple.com](https://appstoreconnect.apple.com) and see your build in 'Activities'. From there you can enable Test Flight beta testing or send it for approval.

### Submission automation

Automation can be achieved using the NativeScript CLI only. All of the parameters needed for publishing can be passed to the `publish` command directly:

```cli
ns publish ios [<Apple ID> [<Password> [<Mobile Provisioning Profile Identifier> [<Code Sign Identity>]]]]]
```

For example, assuming that you want to issue a build using a mobile provision with an identifier _d5d40f61-b303-4fc8-aea3-fbb229a8171c_, you could run:

```cli
ns publish ios my-apple-id my-password d5d40f61-b303-4fc8-aea3-fbb229a8171c "iPhone Distribution"
```

Note that the `Code Sign Identity` can be set to something generic like _iPhone Distribution_ in order to let the build automatically detect a code sign identity.

You can also automate the uploads of already built packages:

```cli
ns publish ios my-apple-id my-password --ipa /tmp/build/myIpa.ipa
```

Some tools that allow the submission process to be automated - [MIT Licensed one: fastlane](https://github.com/fastlane/fastlane).

### Send for approval and publish

Once you successfully submit a build at _App Store Connect_, you can enable testing through _Test Flight_.
When you are ready, go to the 'Build' section of your iOS app, pick the build, and click 'Submit for Review' for that version.
The app will pass through several [App Statuses](https://help.apple.com/app-store-connect/#/dev18557d60e). If your app passes Apple review, it can go live at the _App Store_.
