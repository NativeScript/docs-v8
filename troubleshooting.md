---
title: Troubleshooting Common Issues
---

# Troubleshooting Common Issues

## iOS Cocoapods

### Common Issue 1

If you ever see a build issue like the following:

```
CocoaPods could not find compatible versions for pod "SDWebImage":
  In Podfile:
    SDWebImage (~> 5.13.2)
```

**Solution**: `pod repo update`

For context, this is a very standard iOS developer item. Cocoapods are like npm packages but for iOS community (it's their own npm registry if you will). Thus it also behaves similar to npm cache. Your local Cocoapods cache (located in ~/.cocoapods) keeps a Spec list reference of what it knows about out there in the Cocoapod universe; Sometimes (fairly often actually) that Spec list gets out of date, thus when you use newer versions of iOS dependencies it will report that: `CocoaPods could not find compatible versions`

`pod repo update` mentioned in the text that follows will resolve it. That will update your local home folder spec list. In the case pod repo update does not resolve it, you can often delete DerivedData in Xcode which can also interfere for time-to-time.

### Common Issue 2

If you ever see a build issue like the following:

```
[!] CocoaPods could not find compatible versions for pod "FBSDKCoreKit":
  In Podfile:
    FBSDKCoreKit (~> 13.1.0)

Specs satisfying the `FBSDKCoreKit (~> 13.1.0)` dependency were found, but they required a higher minimum deployment target.
```

**Solution**: Use `build.xcconfig` and your own `Podfile` to target the minimum your build requires, for example:

- In `build.xcconfig`, add this:

```
IPHONEOS_DEPLOYMENT_TARGET = 13.0;
```

Or any version your build needs/requires. Keep in mind some dependencies require certain minimum targets.

- If you don't have one already, you can add `App_Resources/iOS/Podfile` with the following:

```
platform :ios, '13.0'

post_install do |installer|
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
    end
  end
end
```

Just match the target version you use in `build.xcconfig`.

## iOS run on device

If you see a message like the following when trying to run on a connected iOS device:

```
Installing on device d06531f3df21b65f44d52bcb1b147dew65d0c958...
Unable to apply changes on device: d06531f3df21b65f44d52bcb1b147dew65d0c958. Error is: Failed to install /path/to/appname/platforms/ios/build/Debug-iphoneos/appname.ipa on device with identifier d06531f3df21b65f44d52bcb1b147dew65d0c958. Error is: Could not install application.
```

**Solution:**

Open Xcode (platforms/ios/{appname}.xcworkspace) and then select the project name in the left file tree. You should see 'General', 'Signing & Capabilities' and other tabs in the middle. Choose 'Signing & Capabilities' and choose to 'Register Device' (there will be a button). You should now be able to run/install on that connected device.

## Chrome DevTools

If you have trouble connecting Chrome DevTools debugger via `devtools://devtools/bundled/inspector.html?ws=localhost:41000` or `devtools://devtools/bundled/inspector.html?ws=localhost:40000` you may encounter an error like this:

```
NativeScript debugger has opened inspector socket on port 18183 for {your-app-bundle-id}.
Error: connect ECONNREFUSED ::1:18183
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1195:16) {
  errno: -61,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '::1',
  port: 18183
}
Backend socket created.
TypeError: Cannot read properties of undefined (reading 'pipe')
    at WebSocketServer.<anonymous> (/Users/{username}/.config/yarn/global/node_modules/nativescript/lib/device-sockets/ios/app-debug-socket-proxy-factory.js:151:32)
    at WebSocketServer.emit (node:events:527:28)
```

This can be related to different versions of NativeScript CLI being installed on your system. For example the above error is from a system where global yarn packages were installed but also [nvm](https://github.com/nvm-sh/nvm) was configured which had the latest CLI. The project was invoked using yarn package manager and used the older CLI from yarn globals which interfered with latest versions being used in the project.

When doing `ns -v` to print version it would print the latest CLI was installed but that was pulling from `nvm` only.

**Solution**: `yarn global add nativescript` which ensured latest CLI was installed in yarn as well as latest in `nvm`. That ensured that for projects using `yarn` as the package manager also used latest CLI.

## Machine Setup Related

If you had just followed the setup guide in the docs you may see something like this:

```
sample % ns run ios
Searching for devices...
Error: spawn /opt/homebrew/lib/node_modules/nativescript/node_modules/ios-device-lib/bin/darwin/arm64/ios-device-lib ENOENT
    at Process.ChildProcess._handle.onexit (node:internal/child_process:282:19)
    at onErrorNT (node:internal/child_process:480:16)
    at processTicksAndRejections (node:internal/process/task_queues:81:21)
```

<!-- -->

```cli
cp -R /opt/homebrew/lib/node_modules/nativescript/node_modules/ios-device-lib/bin/darwin/x64 /opt/homebrew/lib/node_modules/nativescript/node_modules/ios-device-lib/bin/darwin/arm64
```

<!-- -->

```
Command failed: ruby -e "require 'xcodeproj'; Xcodeproj::Config.new('/Users/nstudio/Documents/NativeScript/sample/platforms/ios/plugins-debug.xcconfig').merge(Xcodeproj::Config.new('/Users/nstudio/Documents/NativeScript/sample/App_Resources/iOS/build.xcconfig')).save_as(Pathname.new('/Users/nstudio/Documents/NativeScript/sample/platforms/ios/plugins-debug.xcconfig'))"
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- xcodeproj (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
	from -e:1:in `<main>'
```

**Common solution:** Open a new terminal window - and retry.

### EMFILE: too many open files 'FILE_PATH'

```
Webpack compilation complete. Watching for file changes.
Watchpack Error (watcher): Error: EMFILE: too many open files 'FILE_PATH'
Watchpack Error (watcher): Error: EMFILE: too many open files 'FILE_PATH'
Watchpack Error (watcher): Error: EMFILE: too many open files 'FILE_PATH' <-- This repeats many times
```

**Solution**:

Try adding this to your `~/.bash_profile` if you have one or `~/.zshenv` if using Zsh:

```
export NODE_OPTIONS="--max-old-space-size=6096"
```

Then open a new terminal window and run your app.

## TypeScript related

```
ERROR: ../../node_modules/@nativescript/core/ui/proxy-view-container/index.d.ts:10:9 - error TS2611: 'ios' is defined as a property in class 'LayoutBase', but is overridden here in 'ProxyViewContainer' as an accessor.

10     get ios(): any;
           ~~~
../../node_modules/@nativescript/core/ui/proxy-view-container/index.d.ts:11:9 - error TS2611: 'android' is defined as a property in class 'LayoutBase', but is overridden here in 'ProxyViewContainer' as an accessor.

11     get android(): any;
```

**Common solution:** If run into this, you can add this to your tsconfig.json:

```
"skipDefaultLibCheck": true,
"skipLibCheck": true,
```
