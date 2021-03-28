---
title: Best Practices with usages of the @NativeClass() decorator
---

The `@NativeClass()` decorator was introduced in NativeScript 7 and offers a simple way to decorate any class intended to extend/customize platform native classes in the JavaScript ESM world.

There's a couple things to note about it's usage.

## When used only within a single file

When using the custom native class within the same file you can define it as follows:

```ts
@NativeClass()
class CustomClass extends NSObject {}

const customClassInstance = CustomClass.new()
```

This allows the code to be compiled naturally and will work as expected.

## When needing to define iOS and Android custom native classes in a single file

You can use setup methods in this case to mitigate any cross compilation issue, for example:

```ts
let customClass
function setupCustomClass() {
  if (global.isAndroid) {
    @NativeClass()
    class CustomClass extends android.view.View {}
    customClass = CustomClass
  } else {
    @NativeClass()
    class CustomClass extends NSObject {}
    customClass = CustomClass
  }
}

setupCustomClass()
const customClassInstance = new customClass() // can handle different platform args with ternary if needed
```

The `global.isAndroid` conditional will get removed when building the app for iOS so your compiled code is clean and isolated while allowing you to handle in a single file.

## When exported from a file and used elsewhere

Since the `@NativeClass()` decorator modifies the JS syntax to work with the NativeScript runtimes you want to ensure the symbol is exported properly when using that outside of the file it's defined. Here's how you can do that:

```ts
// custom-class.ts
@NativeClass()
class CustomClass extends NSObject {}

export { CustomClass }

// usage.ts
import { CustomClass } from './custom-class'
```
