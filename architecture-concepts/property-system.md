---
title: Property System
---

## Property System

NativeScript provides own property system based on a wrapper around the well known JavaScript's `Object.defineProperty`. To deliver good developer experience in the context of mobile development with UI and CSS elements, we provided extended classes of the Property class.

This article will cover the provided property classes and the base techniques when working with views and properties including initialization, registering, views lifecycles and recycling and handling changed events. Some commonly used methods of View are demonstrated as well.

## Property System Classes

### Property class

Property is a simple wrapper around [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) with some additional callbacks like `valueChange`, `valueConverter` and `equalityComparer`. When you define a property you specify the owning type and the type of the property:

```ts
const MyButtonBase = new Button()
const textProperty = new Property<Button, string>({
  name: 'text',
  defaultValue: '',
  affectsLayout: true
})
textProperty.register({ prototype: MyButtonBase })
```

Looking at `textProperty`, the owning type is `Button` meaning that this property will be defined on instances of `Button`. The type of the property is `string` so it will accept any text.

The **valueChange** event is executed when the value of a property has changed. If the type of the property isn't `string`, we will need to specify **valueConverter** and **equalityComparer**. The **valueConverter** is called if a string value is set to this property (for example from XML or CSS) and there you will have to convert that string to meaningful value if possible or throw exception if you can't. If **equalityComparer** is specified it will be called everytime a value is set to a property. There you can compare current and new value for equality. For example, if your property is of type [Color](/nativescript-core/color.md´) you can use `Color.equals()` as `equalityComparer` function so even if new instance of Color is set, the comparer will return false if current color and new color have the same argb value.

There is one more option in the Property constructor: `affectsLayout: boolean`. When set to true setting new value to this property will trigger a new layout pass. This is done as performance optimization. Android has an integrated layout system so most of the time it will invalidate itself when needed. Thus we skip one native call by defining affectsLayout as true only for iOS for example using 'isIOS' boolean property. Because iOS doesn't have integrated layout system if you know that this property could affect the layout you should specify it in the Property constructor.

The flag **affectsLayout** should be **true** (mainly for iOS) if that property will change the element size and/or position. For example in our case setting button text to something different will either widen or shorten the width of the button so this will affect the element dimension hence we specify it as `affectsLayout: isIOS`. If this property won't change element position/size then you don't have to specify **affectsLayout** at all. For example `background-color` property doesn't change element position/size.

:::tip Note:
In the platform specific implementation use **getDefault** and **setNative** symbols from the property object (example: textProperty), to define how this property is applied to native views. The **getDefault** method is called just once before the first call to **setNative** so that we know what is the default native value for this property. The value that you return will be passed to **setNative** method when we decide to recycle the native view. Recycling the native view of a UI control is done only if **recycleNativeView** field is set to true.
