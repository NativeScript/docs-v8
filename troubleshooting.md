---
title: Troubleshooting Common Issues
---

```
nstudio@Teams-MacBook-Pro sample % ns run ios
Searching for devices...
Error: spawn /opt/homebrew/lib/node_modules/nativescript/node_modules/ios-device-lib/bin/darwin/arm64/ios-device-lib ENOENT
    at Process.ChildProcess._handle.onexit (node:internal/child_process:282:19)
    at onErrorNT (node:internal/child_process:480:16)
    at processTicksAndRejections (node:internal/process/task_queues:81:21)
```

```cli
cp -R /opt/homebrew/lib/node_modules/nativescript/node_modules/ios-device-lib/bin/darwin/x64 /opt/homebrew/lib/node_modules/nativescript/node_modules/ios-device-lib/bin/darwin/arm64
```

```
Command failed: ruby -e "require 'xcodeproj'; Xcodeproj::Config.new('/Users/nstudio/Documents/NativeScript/sample/platforms/ios/plugins-debug.xcconfig').merge(Xcodeproj::Config.new('/Users/nstudio/Documents/NativeScript/sample/App_Resources/iOS/build.xcconfig')).save_as(Pathname.new('/Users/nstudio/Documents/NativeScript/sample/platforms/ios/plugins-debug.xcconfig'))"
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- xcodeproj (LoadError)
	from /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
	from -e:1:in `<main>'
```

Open a new terminal window - and retry.
