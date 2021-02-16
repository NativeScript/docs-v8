## Setting up your system

- [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/start/general-requirements.md
- [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/start/ns-setup-linux.md
- [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/start/ns-setup-os-x.md
- [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/start/ns-setup-win.md
- [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/start/quick-setup.md

---

Interactive page where content is shown based on your selections:

**Development OS**: macOS, Windows, Linux

**Target OS**: Android, iOS

Content dynamically changes based on the selection above to reduce the page complexity and hide irrelevant details.

---

This page will walk through installing everything you need to build your first NativeScript app.

### Windows + Android

You will need Node, NativeScript CLI (command line interface), Android Studio and a JDK (java development kit).

**Android Studio** is not strictly necessary &mdash; however it provides an easy to use interface for installing and managing the Android SDKs.

We recommend using [Chocolatey](https://chocolatey.org/) to install the required dependencies &mdash; a popular package manager for Windows.

To install **Node** and **JDK** open an Administrator Command Prompt (right click and select "Run as Administrator") and run the following command:

```powershell
choco install -y nodejs.install openjdk8
```

Setting up the Android development environment can be daunting if you are new to Android development, however following the next steps carefully will get you up and running in no time.

[Download and install Android Studio](https://developer.android.com/studio). In the installation wizard make sure to have the following components selected:

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

```
npm install -g nativescript
```

To verify if the installation was successful, open a new Command Prompt window to ensure the new environment variables are loaded and run

```
ns doctor
```

If you see **No issues were detected** you have successfully set up your system.

#### Preparing an Android device

To run a NativeScript app, you will need an Android device &mdash; either a physical or a virtual device.

- **Using a physical device**: Connect the device using a USB cable, and follow the instructions from [Running on a physical device](/development-workflow.md)

- **Using a virtual device**: Open Android Studio, and open "AVD Manager" &mdash; If you are on the welcome screen, it's under the **Configure › AVD Manager** dropdown, otherwise under the **Tools › AVD Manager** menu.

  If the list of available Virtual Devices is empty, you will need to create a new AVD. Click on "**Create Virtual Device...**" then pick a phone from the list. You can select any phone from the list &mdash; for example "**Pixel 3 XL**" and then click "**Next**". For the System Image select the latest version (the highest API Level in the list). If the selection is greyed out, click the "Download" link next to the Release Name to download the System Image and then click "**Next**" and "**Finish**" to create the AVD. The newly created AVD should show up in the list, and you should be able to click the green "play" button to start the virtual device.

### Windows + iOS

> **Unsupported** &mdash; A Mac is required to build projects that use native iOS code. Simpler apps can be tested using the NativeScript Playground.

### macOS + Android

You will need Node, NativeScript CLI (command line interface), Android Studio and a JDK (java development kit).

**Android Studio** is not strictly necessary &mdash; however it provides an easy to use interface for installing and managing the Android SDKs.

We recommend using [Howbrew](https://brew.sh/) to install the required dependencies &mdash; a popular package manager for macOS.

To install **Node** open a Terminal and run the following command:

```powershell
brew install node
```

To install a **JDK** run the following command:

```
brew cask install adoptopenjdk/openjdk/adoptopenjdk8
```

Setting up the Android development environment can be daunting if you are new to Android development, however following the next steps carefully will get you up and running in no time.

> !!! Same-ish as Windows + Android! Copy here once Windows version is finalized.

Configure the `ANDROID_HOME` environment variable for NativeScript to be able to find the Android SDK, and add the required tools to path.

Add the following lines to your shell profile, usually `~/.bash_profile` or `~/.bashrc`, or if you are using `zsh` then `~/.zshrc` config file:

```shell
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Install the NativeScript CLI globally:

```
npm install -g nativescript
```

To verify if the installation was successful, open a new Command Prompt window to ensure the new environment variables are loaded and run

```
ns doctor
```

If you see **No issues were detected** you have successfully set up your system.

#### Preparing an Android device

To run a NativeScript app, you will need an Android device &mdash; either a physical or a virtual device.

- **Using a physical device**: Connect the device using a USB cable, and follow the instructions from [Running on a physical device](/development-workflow.md)

- **Using a virtual device**: Open Android Studio, and open "AVD Manager" &mdash; If you are on the welcome screen, it's under the **Configure › AVD Manager** dropdown, otherwise under the **Tools › AVD Manager** menu.

  If the list of available Virtual Devices is empty, you will need to create a new AVD. Click on "**Create Virtual Device...**" then pick a phone from the list. You can select any phone from the list &mdash; for example "**Pixel 3 XL**" and then click "**Next**". For the System Image select the latest version (the highest API Level in the list). If the selection is greyed out, click the "Download" link next to the Release Name to download the System Image and then click "**Next**" and "**Finish**" to create the AVD. The newly created AVD should show up in the list, and you should be able to click the green "play" button to start the virtual device.

### macOS + iOS

## Integrating with native apps

Talk about how NativeScript can be embedded into existing apps - clear and detailed step-by-step guide. This is a huge potential for bringing more people into the ecosystem.

- https://github.com/NativeScript/docs/tree/master/docs/guides/integration-with-existing-ios-and-android-apps

## Building for Other Platforms/Devices

### Building for TV devices

### Building for Smart Watches

- [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/tooling/ios-watch-apps.md

### Potentially desktop in the future?
