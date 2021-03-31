---
title: Troubleshooting Common Issues
---

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
