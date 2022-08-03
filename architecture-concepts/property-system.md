---
title: Property System
---

## Property System

NativeScript provides own property system based on a wrapper around the well known JavaScript's `Object.defineProperty`. To deliver good developer experience in the context of mobile development with UI and CSS elements, we provided extended classes of the Property class.

This article will cover the provided property classes and the base techniques when working with views and properties including initialization, registering, views lifecycles and recycling and handling changed events. Some commonly used methods of View are demonstrated as well.

## Property class

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

## CssProperty Class

The **CssProperty** class is very similar to [Property](#property-class) type with two small differences:

- you have to additionally specify **cssName** which will be used to set this property through CSS
- its value can be set from inline styles, page CSS or application CSS

```js
import {CssProperty, Style} from "@nativescript/core";
export const myOpacityProperty = new CssProperty<Style, number>({
    name: "myOpacity",
    cssName: "my-opacity",
    defaultValue: 1,
    valueConverter: (v) => {
        const x = parseFloat(v);
        if (x < 0 || x > 1) {
            throw new Error(`opacity accepts values in the range [0, 1]. Value: ${v}`);
        }

        return x;
    }
});
myOpacityProperty.register(Style);
```

:::tip Note:
For CSS properties that could be animated via keyframe animations, you can use the extended **CssAnimationProperty** class which comes with the optional keyframe parameter.
:::

### Properties

| Name                   | Type                 |
| ---------------------- | -------------------- |
| `name`                 | `string`             |
| `cssLocalName`         | `string`             |
| `cssName`              | `string`             |
| `cssValueDescriptor`   | `PropertyDescriptor` |
| `localValueDescriptor` | `PropertyDescriptor` |
| `isStyleProperty`      | `boolean`            |
| `key`                  | `symbol`             |
| `getDefault`           | `symbol`             |
| `setNative`            | `symbol`             |
| `sourceKey`            | `symbol`             |
| `defaultValueKey`      | `symbol`             |

### Methods

## InheritedCssProperty Class

The **InheritedCssProperty** class is a property defined on Style type. These are inheritable CSS properties that could be set in CSS and propagates value on its children. These are properties like FontSize, FontWeight, Color, etc.

```ts
import { Color, InheritedCssProperty, Style } from '@nativescript/core'

const selectedBackgroundColorProperty = new InheritedCssProperty<Style, Color>({
  name: 'selectedBackgroundColor',
  cssName: 'selected-background-color',
  equalityComparer: Color.equals,
  valueConverter: v => new Color(v)
})
selectedBackgroundColorProperty.register(Style)
```

## ShorthandProperty Class

The shorthand property provides the capability to provide shorthand syntax rules for your CSS properties. For example, instead of the explicit side-by-side syntax for all four margins

```
margin-top:  0;
margin-right: 10;
margin-bottom: 0;
margin-left: 10;
```

The user would want to use the shorthand syntax for _margin_ as follows:

```
margin: 0 10 0 10;

```

Creating the shorthand _margin_ property would require to have all CSS properties defined. This way, you could use them to set the syntax rule in our shorthand property getter.

```ts
const marginProperty = new ShorthandProperty<Style, string | CoreTypes.PercentLengthType>(
  {
    name: 'margin',
    cssName: 'margin',
    getter: function (this: Style) {
      if (
        PercentLength.equals(this.marginTop, this.marginRight) &&
        PercentLength.equals(this.marginTop, this.marginBottom) &&
        PercentLength.equals(this.marginTop, this.marginLeft)
      ) {
        return this.marginTop
      }
      return `${PercentLength.convertToString(
        this.marginTop
      )} ${PercentLength.convertToString(
        this.marginRight
      )} ${PercentLength.convertToString(
        this.marginBottom
      )} ${PercentLength.convertToString(this.marginLeft)}`
    },
    converter: PercentLength
  }
)
marginProperty.register(Style)

const marginLeftProperty = new CssProperty<Style, CoreTypes.PercentLengthType>({
  name: 'marginLeft',
  cssName: 'margin-left',
  defaultValue: zeroLength,
  affectsLayout: isIOS,
  equalityComparer: Length.equals,
  valueConverter: PercentLength.parse
})
marginLeftProperty.register(Style)

const marginRightProperty = new CssProperty<Style, CoreTypes.PercentLengthType>({
  name: 'marginRight',
  cssName: 'margin-right',
  defaultValue: zeroLength,
  affectsLayout: isIOS,
  equalityComparer: Length.equals,
  valueConverter: PercentLength.parse
})
marginRightProperty.register(Style)

const marginTopProperty = new CssProperty<Style, CoreTypes.PercentLengthType>({
  name: 'marginTop',
  cssName: 'margin-top',
  defaultValue: zeroLength,
  affectsLayout: isIOS,
  equalityComparer: Length.equals,
  valueConverter: PercentLength.parse
})
marginTopProperty.register(Style)

const marginBottomProperty = new CssProperty<Style, CoreTypes.PercentLengthType>({
  name: 'marginBottom',
  cssName: 'margin-bottom',
  defaultValue: zeroLength,
  affectsLayout: isIOS,
  equalityComparer: Length.equals,
  valueConverter: PercentLength.parse
})
marginBottomProperty.register(Style)
```

## CoercibleProperty Class

The **CoercibleProperty** is a property that extends the base Property class by providing the capability to be coercible. For better illustration when a property might need to be coercible let's assume that we are working on **selectedIndex** property of some UI element that can hold different number of items. The base case would suggest that the **selectedIndex** would vary within the number of items, but what would cover the case where the items are changed dynamically (and the **selectedIndex** is not within the length range)? This is the case that can be handled by a property that can coerce the value.

Creating the **selectedIndex** as coercible property dependent on the number of items:

```ts
const selectedIndexProperty = new CoercibleProperty<SegmentedBar, number>({
  name: 'selectedIndex',
  defaultValue: -1,
  valueChanged: (target, oldValue, newValue) => {
    target.notify(<SelectedIndexChangedEventData>{
      eventName: SegmentedBar.selectedIndexChangedEvent,
      object: target,
      oldIndex: oldValue,
      newIndex: newValue
    })
  },

  // in this case the coerce value will change depending on whether the actual number of items
  // is more or less than the value we want to apply for selectedIndex
  coerceValue: (target, value) => {
    let items = target.items
    if (items) {
      let max = items.length - 1
      if (value < 0) {
        value = 0
      }
      if (value > max) {
        value = max
      }
    } else {
      value = -1
    }

    return value
  },

  valueConverter: v => parseInt(v)
})
selectedIndexProperty.register(SegmentedBar)
```

When setting the **items** property we will coerce the **selectedIndex**

```
[itemsProperty.setNative](value: SegmentedBarItem[]) {
    this.nativeViewProtected.clearAllTabs();

    const newItems = value;
    if (newItems) {
        newItems.forEach((item, i, arr) => this.insertTab(item, i));
    }

    selectedIndexProperty.coerce(this);
}
```

## Registering the Property

After a property is defined it needs to be registered on a type like this:

```
textProperty.register(MyButtonBase);
```

The _CssProperties_ should be registered on the _Style_ class like this:

```ts
declare module '@nativescript/core/ui/styling/style' {
  interface Style {
    myOpacity: number
  }
}

// Defines 'myOpacity' property on Style class.
myOpacityProperty.register(Style)
```

The registration defines that property for the type passed on to _register_ method.

## Value Change Event

To get notification when some property value changes, a `<propertyName>Change` has to be specified as eventName to `addEventListener()` or `on()` method. For example:

```
textField.addEventListener('textChange', handler...)
```

## NativeView Property
