---
title: Environment Setup
---

## Setting up your system

This page will walk through installing everything you need to build your first NativeScript app.

### Windows + Android

You will need Node, NativeScript CLI (command line interface), Android Studio and a JDK (java development kit).

**Android Studio** is not strictly necessary &mdash; however it provides an easy to use interface for installing and managing the Android SDKs.

We recommend using [Chocolatey](https://chocolatey.org/) to install the required dependencies &mdash; a popular package manager for Windows.

To install **Node** and **JDK** open an Administrator Command Prompt (right click and select "Run as Administrator") and run the following command:

```cli
choco install -y nodejs.install openjdk8
```

Setting up the Android development environment can be daunting if you are new to Android development, however following the next steps carefully will get you up and running in no time.

[Download and install Android Studio](https://developer.android.com/studio). In the installation wizard make sure to have the following components selected (the list should appear if you select **custom** options):

- Android SDK
- Android SDK Platform
- Android Virtual Device
- Performance (Intel ® HAXM) &mdash; optional, learn more about [AMD Processor & Hyper-V support](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html)

The setup may take a while, but once it has finished a welcome screen should appear.

Android Studio installs the latest Android SDK by default, which in most cases should be all that's needed to build a NativeScript app.

Configure the `ANDROID_HOME` environment variable for NativeScript to be able to find the Android SDK.

1. Search for "**Edit the system environment variables**" in Windows Search and select
2. Click on "**Environment variables...**" in the bottom corner
3. Under the "**User variables for...**" click on **New...** to create the `ANDROID_HOME` user variable that points to the path of the Android SDK:

![New User Variable (ANDROID_HOME)](./assets/environment-setup/new_user_variable_dialog.png)

The SDK is by default located at

```
%LOCALAPPDATA%\Android\Sdk
```

To find the actual location in the Android Studio **Settings**, navigate to **Appearance & Behavior › System Settings › Android SDK** and copy the Android SDK Location.

Add Android **platform-tools** to path.

1. Search for "**Edit the system environment variables**" in Windows Search and select
2. Click on "**Environment variables...**" in the bottom corner
3. Under the "**User variables for...**" select the **Path** variable and click **Edit...**
4. Click **New** and add the **platform-tools** path to the list.

The default location is inside the Android SDK's `platform-tools` folder:

```
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

Install the NativeScript CLI globally:

```cli
npm install -g nativescript
```

To verify if the installation was successful, open a new Command Prompt window to ensure the new environment variables are loaded and run

```cli
ns doctor android
```

If you see **No issues were detected** you have successfully set up your system.

#### Preparing an Android device

To run a NativeScript app, you will need an Android device &mdash; either a physical or a virtual device.

- **Using a physical device**: Connect the device using a USB cable, and follow the instructions from [Running on a physical device](/development-workflow.md)

- **Using a virtual device**: Open Android Studio, and open "AVD Manager" &mdash; If you are on the welcome screen, it's under the **Configure › AVD Manager** dropdown, otherwise under the **Tools › AVD Manager** menu.

  If the list of available Virtual Devices is empty, you will need to create a new AVD. Click on "**Create Virtual Device...**" then pick a phone from the list. You can select any phone from the list &mdash; for example "**Pixel 3 XL**" and then click "**Next**". For the System Image select the latest version (the highest API Level in the list). If the selection is greyed out, click the "Download" link next to the Release Name to download the System Image and then click "**Next**" and "**Finish**" to create the AVD. The newly created AVD should show up in the list, and you should be able to click the green "play" button to start the virtual device.

### Windows + iOS

:::warning Unsupported
A Mac is required to build projects that use native iOS code. Simpler apps can be tested using the NativeScript Playground.
:::

### macOS + Android

You will need Node, NativeScript CLI (command line interface), Android Studio and a JDK (java development kit).

**Android Studio** is not strictly necessary &mdash; however it provides an easy to use interface for installing and managing the Android SDKs.

We recommend using [Homebrew](https://brew.sh/) to install the required dependencies &mdash; a popular package manager for macOS.

:::warning
When installing Homebrew, carefully follow their instructions to avoid configuration issues.
:::

Once you have Homebrew installed, to install **Node** open a Terminal and run the following command:

```cli
brew install node
```

:::tip Pro tip!
If you need to work with multiple versions of node, you may skip installing node via Homebrew, and use a node version manager: [nvm](https://github.com/nvm-sh/nvm), [n](https://npmjs.com/n) or any other node version manager you prefer.
:::

To install a **JDK** run the following command:

```cli
# todo: check if it works with latest jdk
brew install --cask adoptopenjdk
```

Setting up the Android development environment can be daunting if you are new to Android development, however following the next steps carefully will get you up and running in no time.

[Download and install Android Studio](https://developer.android.com/studio). In the installation wizard make sure to have the following components selected (the list should appear if you select **custom** options):

- Android SDK
- Android SDK Platform
- Android Virtual Device
- Performance (Intel ® HAXM) &mdash; optional, learn more about [AMD Processor & Hyper-V support](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html)

The setup may take a while, but once it has finished a welcome screen should appear.

Android Studio installs the latest Android SDK by default, which in most cases should be all that's needed to build a NativeScript app.

Configure the `ANDROID_HOME` environment variable for NativeScript to be able to find the Android SDK, and add the required tools to path.

Add the following lines to your shell profile, usually `~/.bash_profile` or `~/.bashrc`, or if you are using `zsh` then `~/.zshrc` config file:

```shell
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Install the **NativeScript CLI** globally:

```cli
npm install -g nativescript
```

To verify if the installation was successful, open a new Command Prompt window to ensure the new environment variables are loaded and run

```cli
ns doctor android
```

If you see **No issues were detected** you have successfully set up your system.

#### Preparing an Android device

To run a NativeScript app, you will need an Android device &mdash; either a physical or a virtual device.

- **Using a physical device**: Connect the device using a USB cable, and follow the instructions from [Running on a physical device](/development-workflow.md)

- **Using a virtual device**: Open Android Studio, and open "AVD Manager" &mdash; If you are on the welcome screen, it's under the **Configure › AVD Manager** dropdown, otherwise under the **Tools › AVD Manager** menu.

  If the list of available Virtual Devices is empty, you will need to create a new AVD. Click on "**Create Virtual Device...**" then pick a phone from the list. You can select any phone from the list &mdash; for example "**Pixel 3 XL**" and then click "**Next**". For the System Image select the latest version (the highest API Level in the list). If the selection is greyed out, click the "Download" link next to the Release Name to download the System Image and then click "**Next**" and "**Finish**" to create the AVD. The newly created AVD should show up in the list, and you should be able to click the green "play" button to start the virtual device.

### macOS + iOS

You will need Node, NativeScript CLI (command line interface), XCode, xcodeproj, cocoapods.

We recommend using [Homebrew](https://brew.sh/) to install the required dependencies &mdash; a popular package manager for macOS.

:::warning Note
When installing Homebrew, carefully follow their instructions to avoid configuration issues.
:::

Once you have Homebrew installed, to install **Node** open a Terminal and run the following command:

```cli
brew install node
```

:::tip Pro tip!
If you need to work with multiple versions of node, you may skip installing node via Homebrew, and use a node version manager: [nvm](https://github.com/nvm-sh/nvm), [n](https://npmjs.com/n) or any other node version manager you prefer.
:::

Next you will need **XCode**. Open the **AppStore**, search for **XCode** and and install it.

Once the installation is complete (this may take a while &mdash; brew a coffee and enjoy a little break), open **XCode** and if it prompts you to install the Command-Line-Tools make sure to say **Yes**.

Open `XCode › Preferences › Locations` and make sure **Command Line Tools** is set

![XCode Preferences, Locations](/assets/environment-setup/xcode_command_line_tools.png)

Install **ruby 2.7** and link it so it's available in your shell environment:

```cli
brew install ruby@2.7
brew link ruby@2.7
```

Add the following lines to your shell profile, usually `~/.bash_profile` or `~/.bashrc`, or if you are using `zsh` then `~/.zshrc` config file:

```shell
# Add rubygems to the path
export PATH=/opt/homebrew/lib/ruby/gems/2.7.0/bin:$PATH
```

:::warning Important
Make sure to open a new terminal window for the changes to take effect!
:::

In a new terminal window, install the **<abbr title="A package manager for managing 3rd party native dependencies">cocoapods</abbr>** and **<abbr title="CLI utility to interact with XCode projects">xcodeproj</abbr>** gems by running the following commands:

<!-- Note: xcodeproj seems to be installed when installing cocoapods via brew -->
<!-- brew install cocoapods # this will install both cocoapods and xcodeproj -->

```cli
gem install cocoapods
gem install xcodeproj
```

Next install **<abbr title="Python package manager">pip</abbr>** and **<abbr title="Python 2 & 3 compatibility package used by NativeScript">six</abbr>** by running the following:

```cli
sudo easy_install pip==20.3.3
python -m pip install six
```

:::tip NOTE
You may see a Deprecation warning when installing **six**, feel free to ignore it for now &mdash; NativeScript will update to Python 3.x in the near future.
:::

Install the **NativeScript CLI** globally:

```cli
npm install -g nativescript
```

:::tip NOTE
You may see Deprecation and security warnings from **npm**, these are safe to ignore.

_**More details for those curious:** The NativeScript CLI relies on 3rd party packages that may have been deprecated over the past years. We are slowly replacing these dependencies with newer, supported alternatives to resolve these warnings, however they are generally safe to ignore, since the CLI is never exposed to the public and it's only used for local development, where most of the security concerns don't apply._
:::

To verify if the installation was successful, open a new Terminal window to ensure the new environment variables are loaded and run

```cli
ns doctor ios
```

If you see **No issues were detected** you have successfully set up your system.

<!-- If you see the following, you have successfully set up your system for iOS development. Select **Skip Step and Configure Manually** or hit `Ctrl+C` to exit.

![ns doctor output](assets/environment-setup/ns_doctor_ios.png) -->

#### Additional notes for M1 based machines:

:::danger TODO
This section is temporary for now - we can consolidate & make sure it works on M1 as expected with the above flow. May need couple adjustments.
:::

You may need to install rosetta2, run:

```cli
softwareupdate --install-rosetta
```

May need to install `ffi`

```cli
gem install ffi
```

### Linux + Android

You will need Node, NativeScript CLI (command line interface), Android Studio and a JDK (java development kit).

**Android Studio** is not strictly necessary &mdash; however it provides an easy to use interface for installing and managing the Android SDKs.

To install **Node** follow the [instructions specific to your Linux distribution](https://nodejs.org/en/download/package-manager/). We recommend using the latest version, however anything above **Node 12** should be fine.

:::warning Note
We have gone through these steps on **Ubuntu 20.04** and noted commands we've used, however depending on your Linux distribution, the commands may be different. We cannot provide commands for all possible distributions, so please refer to the linked documentation to find the correct commands you need to run.
:::

<!-- tab:Ubuntu 20.04 -->

```cli
# On Ubuntu 20.04, we used the following command to install latest node
$ curl -fsSL https://deb.nodesource.com/setup_15.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

To confirm **Node** is installed correctly, run:

```cli
$ node -v
$ npm -v
# Should print something like
$:v15.x.x
7.x.x
```

A **JDK version 8 or greater** is required, and you have a couple options:

1. [OpenJDK](https://openjdk.java.net/) &mdash; can be downloaded from [AdoptOpenJDK](https://adoptopenjdk.net) or your system package manager.
2. [Oracle JDK](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html) &mdash; can be downloaded directly or through the system package manager.

<!-- tab:Ubuntu 20.04 -->

```cli
# On Ubuntu 20.04, we used the following command to install OpenJDK 14
sudo apt-get install -y openjdk-14-jdk
```

To confirm **JDK** is installed correctly, run:

```cli
$ java --version
$ javac --version
# Should print something like
$:openjdk 14.0.2 2020-07-14
OpenJDK Runtime Environment (build 14.0.2+12-Ubuntu-120.04)
OpenJDK 64-Bit Server VM (build 14.0.2+12-Ubuntu-120.04, mixed mode, sharing)

javac 14.0.2
```

Setting up the Android development environment can be daunting if you are new to Android development, however following the next steps carefully will get you up and running in no time.

[Download and install Android Studio](https://developer.android.com/studio). In the installation wizard make sure to have the following components selected (the list should appear if you select **custom** options):

- Android SDK
- Android SDK Platform
- Android Virtual Device

The setup may take a while, but once it has finished a welcome screen should appear.

Android Studio installs the latest Android SDK by default, which in most cases should be all that's needed to build a NativeScript app.

Configure the `ANDROID_HOME` environment variable for NativeScript to be able to find the Android SDK, and add the required tools to path.

Add the following lines to your shell profile, usually `~/.bash_profile` or `~/.bashrc`, or if you are using `zsh` then `~/.zshrc` config file:

```shell
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Install the NativeScript CLI globally:

```cli
npm install -g nativescript
```

:::tip Note
Depending on how you installed **Node**, you may get an `EACCESS: permission denied` error when trying to install a global package. It's generally not recommended to run `npm` with `sudo`, see this guide for [Resolving EACCESS permissions errors](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).
:::

To verify if the installation was successful, open a new Command Prompt window to ensure the new environment variables are loaded and run

```cli
ns doctor android
```

If you see **No issues were detected** you have successfully set up your system.

#### Preparing an Android device

To run a NativeScript app, you will need an Android device &mdash; either a physical or a virtual device.

- **Using a physical device**: Connect the device using a USB cable, and follow the instructions from [Running on a physical device](/development-workflow.md)

- **Using a virtual device**: Open Android Studio, and open "AVD Manager" &mdash; If you are on the welcome screen, it's under the **Configure › AVD Manager** dropdown, otherwise under the **Tools › AVD Manager** menu.

  If the list of available Virtual Devices is empty, you will need to create a new AVD. Click on "**Create Virtual Device...**" then pick a phone from the list. You can select any phone from the list &mdash; for example "**Pixel 3 XL**" and then click "**Next**". For the System Image select the latest version (the highest API Level in the list). If the selection is greyed out, click the "Download" link next to the Release Name to download the System Image and then click "**Next**" and "**Finish**" to create the AVD. The newly created AVD should show up in the list, and you should be able to click the green "play" button to start the virtual device.

### Linux + iOS

:::warning Unsupported
A Mac is required to build projects that use native iOS code. Simpler apps can be tested using the NativeScript Playground.
:::

<!-- 1. Node

We recommend using [Homebrew](https://brew.sh/) to install Node.

After Homebrew installation, run the following commands to install **Node**:

```powershell
brew install node
```

```warning
If you see a "Next steps:" Note about adding Homebrew to your **PATH**, follow those instructions to add to your profile.
```

```warning
TODO: make note of node version managers maybe?
```

1. Install Xcode via App Store

Open App Store from the Apple menu and search for 'Xcode' to install it.

Wait for this installation to complete.

3. Install Cocoapods and Xcodeproj

```cli
sudo gem install xcodeproj
sudo gem install cocoapods
pod setup
```

4. Install pip and six

```cli
python -m pip install --upgrade pip six
```

```warning Note
`pip` is a python installation manager. `six` provides compatibility utilities for Python 2 and 3.
```

5. Install NativeScript CLI

```cli
npm install -g nativescript
``` -->

## Integrating with native apps

Talk about how NativeScript can be embedded into existing apps - clear and detailed step-by-step guide. This is a huge potential for bringing more people into the ecosystem.

- https://github.com/NativeScript/docs/tree/master/docs/guides/integration-with-existing-ios-and-android-apps

## Building for Other Platforms/Devices

### Building for Smart Watches

#### iOS WatchOS Applications

With version 5.4 the NativeScript CLI introduces a Beta support for integrating a [WatchOS](https://developer.apple.com/watchos/) application in your iOS mobile app created with NativeScript.

#### Prerequisites

- **NativeScript CLI version 5.4** and above.
- NativeScript project.
- **Xcode 10** and above.
- Paired devices or simulators (**iPhone** and **iWatch** with **WatchOS 4.x/5.x** and above).

  > **Note:** WatchOS 4.x won't work with the default Watch App created with Xcode. The user will have to manually set **_`WATCHOS_DEPLOYMENT_TARGET`_** in the configuration json (see below for details).

- WatchOS app created with **Objective-C** (Swift code [is **not** supported yet](https://github.com/NativeScript/nativescript-cli/issues/4541#issuecomment-491202270)).

#### WatchOS application in NativeScript.

To integrate your existing WatchOS application into your NativeScript project, execute the following steps:

1. Create **_Single View App_** from Xcode.

2. Add watch app target through **_File > New > Target > WatchKit App_**.

3. Add a name to your watch app, for example, **_MyFirstWatchApp_**. In the same screen verify that **Objective-C** is selected as your language.

> **Note** You can skip steps 1-3 if your Watch app is already created.

4. Copy the generated **_MyFirstWatchApp_** and **_MyFirstWatchAppExtension_** to **_.../apps/MyApp/app/App_Resources/iOS/watchapp/MyFirstWatchApp_** and **_.../apps/MyApp/app/App_Resources/iOS/watchextension/MyFirstWatchAppExtension_** respectively.

5. Inside the **_Info.plist_** of the Watch App replace the value of **_`WKCompanionAppBundleIdentifier`_** with **_`$(WK_APP_BUNDLE_IDENTIFIER)`_**.

6. Inside the **_Info.plist_** of the Watch Extension replace the
   of **_`WKAppBundleIdentifier`_** with **_`$(WK_APP_BUNDLE_IDENTIFIER)`_**.

7. You can populate the **_Assets.xcassets_** of the Watch App and add the name of the **_`appiconset`_** to the **_.../apps/MyApp/app/App_Resources/iOS/watchapp/MyFirstWatchApp/watchapp.json_**:

   ```JSON
   {
       "assetcatalogCompilerAppiconName": "AppIcon"
   }
   ```

8. You can modify the **_`WATCHOS_DEPLOYMENT_TARGET`_** of the Watch App by adding the value inside the **_watchapp.json _** file like this:

   ```JSON
   {
       "assetcatalogCompilerAppiconName": "AppIcon",
       "targetBuildConfigurationProperties": {
           "WATCHOS_DEPLOYMENT_TARGET": 4.1
       }
   }
   ```

9. Build & Run the NativeScript application.

   ```cli
   ns run ios
   ```

10. The application will be deployed and started on your iOS device/simulator. Make sure that the test iPhone is already paired with the testing iWatch. Once the iOS app starts, the Watch app will be automatically deployed on the testing iWatch device.

> **Note:** [See this tracking issue for more](https://github.com/NativeScript/nativescript-cli/issues/4541#issue-433686622).
