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
