---
title: Best Practices with when to split up .ios and .android files vs. using platform conditionals
---

The advent of tree shaking and webpack builds does away with quite a bit of worry in this area however there's a few things to consider here.

## Conditional with tree shaking

When speaking of tree shaking ever since NativeScript 7, you've been able to use `global.isAndroid` or `global.isIOS` and anytime those are used as conditional splits in your code, only the applicable code for the platform that's being built would actually end up in your built/compiled code alleviating a lot of concern here.

## Future maintenance

The other aspect comes down to maintenance and clarity over time.

When dealing with just a few lines of code for either platform, using a conditional is certainly highly maintainable and worry free.

General advice is if you have more than 10 or so lines of code for a particular platform use case then splitting into separate `.ios` or `.android` files can certainly help make that code more maintainable and easier to scale over time.

Bottom line is to not fret over these details too much. Conditionals can be tweaked with webpack to exclude certain conditions where you want to dial your distribution bundle in production to only include code applicable for the runtime platform. Outside of that your own preference is just fine.
