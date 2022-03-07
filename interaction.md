---
title: Interaction
---

## TouchManager 8.2+

The `TouchManager` provides several conveniences for your apps interaction.

### Auto animate touch down/up for all tap bindings

For example, you can easily and quickly enable consistent touch down/up animations on every view which has a `tap` event binding throughout your entire app by enabling `TouchManager.enableGlobalTapAnimations` before your app bootstraps (typically in `app.ts` or `main.ts`):

```ts
import { TouchManager } from '@nativescript/core'

TouchManager.enableGlobalTapAnimations = true
TouchManager.animations = {
  down: {
    scale: { x: 0.95, y: 0.95 },
    duration: 200,
    curve: CoreTypes.AnimationCurve.easeInOut
  },
  up: {
    scale: { x: 1, y: 1 },
    duration: 200,
    curve: CoreTypes.AnimationCurve.easeInOut
  }
}

// bootstrap the app...
```

This would auto animate any view with a `tap` binding with those specific animations on touch down and up.

If you have a few "tappable" views that need to be ignored:

```xml
<Button text="Global tap animations simply ignored" ignoreTouchAnimation="true" />
```

In addition to expressing NativeScript [Animation APIs](https://docs.nativescript.org/interaction.html#animations) which are convenient, simple and easy you can also define purely native animations like [iOS UIView Animations](https://developer.apple.com/documentation/uikit/uiview/1622418-animate) or even [Android Dynamic Spring Physics Animations](https://developer.android.com/guide/topics/graphics/spring-animation), for example:

```ts
touchAnimation = {
  down(view: View) {
    if (global.isIOS) {
      UIView.animateWithDurationAnimations(0.25, () => {
        view.ios.transform = CGAffineTransformMakeScale(0.95, 0.95)
      })
    } else if (global.isAndroid) {
      const lib = androidx.dynamicanimation.animation
      const spring = new lib.SpringForce(0.95)
        .setDampingRatio(lib.SpringForce.DAMPING_RATIO_MEDIUM_BOUNCY)
        .setStiffness(lib.SpringForce.STIFFNESS_MEDIUM)
      let animation = new lib.SpringAnimation(
        view.android,
        lib.DynamicAnimation().SCALE_X,
        float(0.95)
      )
      animation.setSpring(spring).setStartVelocity(0.7).setStartValue(1.0)
      animation.start()
      animation = new lib.SpringAnimation(
        view.android,
        lib.DynamicAnimation().SCALE_Y,
        float(0.95)
      )
      animation.setSpring(spring).setStartVelocity(0.7).setStartValue(1.0)
      animation.start()
    }
  },
  up(view: View) {
    if (global.isIOS) {
      UIView.animateWithDurationAnimations(0.25, () => {
        view.ios.transform = CGAffineTransformIdentity
      })
    } else if (global.isAndroid) {
      const lib = androidx.dynamicanimation.animation
      const spring = new lib.SpringForce(1)
        .setDampingRatio(lib.SpringForce.DAMPING_RATIO_MEDIUM_BOUNCY)
        .setStiffness(lib.SpringForce.STIFFNESS_MEDIUM)
      let animation = new lib.SpringAnimation(
        view.android,
        lib.DynamicAnimation().SCALE_X,
        float(1)
      )
      animation.setSpring(spring).setStartVelocity(0.7).setStartValue(0.95)
      animation.start()
      animation = new lib.SpringAnimation(
        view.android,
        lib.DynamicAnimation().SCALE_Y,
        float(1)
      )
      animation.setSpring(spring).setStartVelocity(0.7).setStartValue(0.95)
      animation.start()
    }
  }
}
```

### touchAnimation and ignoreTouchAnimation

You can also declaratively define custom touch animations on any specific view (_which overrides any global TouchManager settings_) by specifying it's own `touchAnimation` property:

```xml
<Button touchAnimation="{{ touchAnimation }}" />
```

This would animate touch down and up with the following view binding settings:

```ts
touchAnimation = {
  down: {
    scale: { x: 0.95, y: 0.95 },
    backgroundColor: new Color('yellow'),
    duration: 250,
    curve: CoreTypes.AnimationCurve.easeInOut
  },
  up: {
    scale: { x: 1, y: 1 },
    backgroundColor: new Color('#63cdff'),
    duration: 250,
    curve: CoreTypes.AnimationCurve.easeInOut
  }
}
```

When using `TouchManager.enableGlobalTapAnimations` you can declare any views to be ignored in cases where a couple may need to be excluded from your global animation settings:

```xml
<Button text="Global tap animations simply ignored" ignoreTouchAnimation="true" />
```

You can [read more about how this feature came to be here](https://blog.nativescript.org/create-a-custom-view-plugin-touch-effects).

## Animations

### Animations with code

The easiest way to animate a **single** [`View`](/api-reference/classes/view.html) is by using the `View.animate` method which accepts an [`AnimationDefinition`](/api-reference/interfaces/animationdefinition.html), immediately starts the animation and then returns its finished promise.

**Example 20: How to execute animation on single view.**

```js
view.animate({
  translate: { x: 0, y: 100 },
  duration: 1000,
  curve: CoreTypes.AnimationCurve.easeIn
})
```

```typescript
view.animate({
  translate: { x: 0, y: 100 },
  duration: 1000,
  curve: CoreTypes.AnimationCurve.easeIn
})
```

:::tip Note

You should create an [`Animation`](/api-reference/classes/animation.html) class in order to be able to **cancel** the animation. This is demonstrated below.

:::

### The AnimationDefinition interface

The [`AnimationDefinition`](/api-reference/interfaces/animationdefinition.html) interface is central for defining an animation for **one or more properties** of a **single** [`View`](/api-reference/classes/view.html). The animatable properties are:

- **opacity**
- **backgroundColor**
- **translateX** and **translateY**
- **scaleX** and **scaleY**
- **rotate**
- **width** and **height**

The [`AnimationDefinition`](/api-reference/interfaces/animationdefinition.html) interface has the following members:

- **target**: The view whose property is to be animated.
- **opacity**: Animates the opacity of the view. Value should be a number between 0.0 and 1.0.
- **backgroundColor**: Animates the backgroundColor of the view.
- **translate**: Animates the translate affine transform of the view. Value should be a [`Pair`](https://v6.docs.nativescript.org/api-reference/interfaces/_ui_animation_.pair.html).
- **scale**: Animates the scale affine transform of the view. Value should be a [`Pair`](https://v6.docs.nativescript.org/api-reference/interfaces/_ui_animation_.pair.html).
- **rotate**: Animates the rotate affine transform of the view. Value should be a number specifying the rotation amount in degrees.
- **duration**: The length of the animation in milliseconds. The default duration is 300 milliseconds.
- **delay**: The amount of time, in milliseconds, to delay starting the animation.
- **iterations**: Specifies how many times the animation should be played. Default is 1. iOS animations support fractional iterations, i.e., 1.5. To repeat an animation infinitely, use `Number.POSITIVE_INFINITY`.
- **curve**: An optional animation curve. Possible values are contained in the [AnimationCurve](/api-reference/modules/coretypes.animationcurve.html). Alternatively, you can pass an instance of type [`UIViewAnimationCurve`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/#//apple_ref/c/tdef/UIViewAnimationCurve) for iOS or [`android.animation.TimeInterpolator`](http://developer.android.com/reference/android/animation/TimeInterpolator.html) for Android.
- **width**: Animates view's width.
- **height**: Animates view's height.

All members of the interface are **optional** and have default values with the following exceptions:

- target is only optional when calling the `animate` method of a [`View`](/api-reference/classes/view.html) instance since it is set automatically for you.
- You must specify at least one property from this list: opacity, backgroundColor, scale, rotate or translate.

### The Animation class

The [`Animation`](/api-reference/classes/animation.html) class represents a **set** of one or more [`AnimationDefinitions`](/api-reference/interfaces/animationdefinition.html) that can be played either **simultaneously or sequentially**. **This class is typically used when you need to animate several views together**. The constructor of the [`Animation`](/api-reference/classes/animation.html) class accepts an array of [`AnimationDefinitions`](/api-reference/interfaces/animationdefinition.html) and a boolean parameter indicating whether to play the animations sequentially. Creating an instance of the [`Animation`](/api-reference/classes/animation.html) class does not start the animation playback. The class has four members:

- **play**: A method that starts the animation and returns the instance it was called on for fluent animation chaining.
- **cancel**: A void method that stops the animation.
- **finished**: A promise that will be resolved when the animation finishes or rejected when the animation is cancelled or stops for another reason.
- **isPlaying**: A boolean property returning **True** if the animation is currently playing.

### Animating multiple properties

It is easy to animate multiple properties at once; just pass the desired animatable properties and the corresponding values when calling the animate function.

**Example 21: How to animate multiple properties.**

```js
view.animate({
  backgroundColor: new color.Color('#3D5AFE'),
  opacity: 0.5,
  translate: { x: 100, y: 100 },
  rotate: 180,
  duration: 3000
})
```

```typescript
view.animate({
  backgroundColor: new color.Color('#3D5AFE'),
  opacity: 0.5,
  translate: { x: 100, y: 100 },
  rotate: 180,
  duration: 3000
})
```

![multiple-properties](/assets/images/modules/animation/multiple-properties.gif 'Multiple Properties')

### Chaining animations with promises

The animate method returns a promise that you can use to chain animations, as shown in **Example 21**.

**Example 22: How to create chain animations.**

```js
view
  .animate({ opacity: 0 })
  .then(function () {
    return view.animate({ opacity: 1 })
  })
  .then(function () {
    return view.animate({ translate: { x: 100, y: 100 } })
  })
  .then(function () {
    return view.animate({ translate: { x: 0, y: 0 } })
  })
  .then(function () {
    return view.animate({ scale: { x: 3, y: 3 } })
  })
  .then(function () {
    return view.animate({ scale: { x: 1, y: 1 } })
  })
  .then(function () {
    return view.animate({ rotate: 180 })
  })
  .then(function () {
    return view.animate({ rotate: 0 })
  })
  .then(function () {
    console.log('Animation finished')
  })
  .catch(function (e) {
    console.log(e.message)
  })
```

```typescript
view
  .animate({ opacity: 0 })
  .then(() => view.animate({ opacity: 1 }))
  .then(() => view.animate({ translate: { x: 100, y: 100 } }))
  .then(() => view.animate({ translate: { x: 0, y: 0 } }))
  .then(() => view.animate({ scale: { x: 3, y: 3 } }))
  .then(() => view.animate({ scale: { x: 1, y: 1 } }))
  .then(() => view.animate({ rotate: 180 }))
  .then(() => view.animate({ rotate: 0 }))
  .then(() => {
    console.log('Animation finished')
  })
  .catch(e => {
    console.log(e.message)
  })
```

![chaining-with-promises](/assets/images/modules/animation/chaining-with-promises.gif 'Chaining with Promises')

### CSS Animations

CSS animations are based on the simple and easy to use standard [CSS3 animations API](http://www.w3schools.com/css/css3_animations.asp). You can use them to animate almost every native view without even having to know JavaScript. You have the potential to alter the appearance and behavior of an element whenever a state change occurs, such as when it is touched or activated. You can use multiple frames and change the animation direction. Finally, with CSS animations, you can separate the animation code from your application logic.

CSS animations consist of two components: a style describing the CSS animation and a set of keyframes that indicate the start and end states of the animation's style, as well as possible intermediate waypoints. You can change as many animatable CSS properties you want, as many times you want.

**Example 1** binds the "example" animation to the button element. The animation lasts 4 seconds. It will gradually change the background-color of the button element from "red" to "green".

**Example 1: How to create simple animation using CSS.**

```css
@keyframes example {
  from {
    background-color: red;
  }
  to {
    background-color: green;
  }
}

.view {
  animation-name: example;
  animation-duration: 4s;
  animation-fill-mode: forwards;
}
```

To get an animation to work, you must bind the animation to an element:

```js
view1.className = 'example'
```

```typescript
view1.className = 'example'
```

```xml
<Button id="myButton" text="{N}" class="example" />
```

:::tip Note

If the **animation-duration** property is not specified, the animation will use a default value - 0.3 seconds.

:::

### Animatable properties

CSS animations support the same animatable properties used in code-based animations:

- **opacity**
- **background-color**: Corresponds with the backgroundColor.
- **transform: translate**: Corresponds with translateX and translateY properties.
- **transform: scale**: Corresponds with scaleX and scaleY properties.
- **transform: rotate**: Corresponds with the rotate property.

:::tip Note

You cannot set a single x or y field in scale and translate. If you set only x in translate, y will be assumed 0; If you set only y in scale, x will be assumed 1.

:::

### Animation properties

A CSS animation is defined by using the animation property and its sub-properties. Those include timing, duration, delay and other animation properties. The actual animation appearance is defined with the @keyframes rule.

The following list presents all animation properties:

- **animation-name**: Specifies the name of the @keyframes rule that should be used.
- **animation-delay**: Specifies the time between the style is applied and the beginning of the animation.
- **animation-duration**: The length of the animation in seconds.
- **animation-iteration-count**: Specifies how many times the animation should be played. Default is 1. To repeat an animation forever, use infinite.
- **animation-timing-function**: Defines how the animation transitions through keyframes by establishing acceleration curves.
- **animation-fill-mode**: Configures what values are applied by the animation after it is executing.
- **animation-direction**: Configures whether or not the animation should alternate direction on each run through the sequence or reset to the start point and repeat itself.
- **animation**: The shorthand property allows setting all animation properties in a single line.

### Animation keyframes

To set multiple points at which an element should undergo a transition, use the **@keyframes** rule, shown in **Example 2**. It includes the animation name, any animation breakpoints, and the properties intended to be animated.

**Example 2: How to use **@keyframes** rule.**

```css
@keyframes example {
  from {
    background-color: red;
  }
  to {
    background-color: green;
  }
}
```

**Example 2** defines an animation with two keyframes. The "from" represents 0% (the start of the animation) and "to" represents 100% (the final value). You can add more keyframes by using percent.

**Example 3** shows how to change the background color when the animation is 25% complete, 50% complete, and again when the animation is 100% complete.

**Example 3: Changing background color in different animation stages.**

```css
@keyframes example {
  0% {
    background-color: red;
  }
  25% {
    background-color: yellow;
  }
  50% {
    background-color: blue;
  }
  100% {
    background-color: green;
  }
}
```

You can set multiple properties in a keyframe, as shown in **Example 4**.

**Example 4: Changing multiple properties in different animation stages.**

```css
@keyframes example {
  0% {
    background-color: red;
    transform: translate(0, 0);
  }
  25% {
    background-color: yellow;
    transform: translate(200, 0);
  }
  50% {
    background-color: blue;
    transform: translate(200, 200);
  }
  75% {
    background-color: green;
    transform: translate(0, 200);
  }
  100% {
    background-color: red;
    transform: translate(0, 0);
  }
}
```

You can combine keyframes, as shown in **Example 5**.

**Example 5: Set up properties for several keyframes**

```css
@keyframes example {
  0%,
  50% {
    background-color: red;
    transform: translate(0, 0);
  }
  25%,
  75% {
    background-color: yellow;
    transform: translate(200, 0);
  }
  100% {
    background-color: red;
    transform: translate(0, 0);
  }
}
```

### Delay an animation

The **animation-delay** property specifies a delay (in seconds) before the animation starts:

**Example 6: Set up a delay before the animation starts**

```css
.view {
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
  animation-delay: 2s;
}
```

### Set how many times an animation should run

The **animation-iteration-count** property defines the number of times an animation should run. The animation in **Example 7** will play two times before it stops.

**Example 7: How to use `animation-iteration-count` property**

```css
.view {
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: 2;
}
```

If you want to play an animation forever, set this property to "infinite".

```css
animation-iteration-count: infinite;
```

### Specify the speed curve of the animation

The **animation-timing-function** property specifies the speed curve of the animation. It can have one of the following values:

- **ease**: Specifies an animation with a slow start, then fast, then end slowly (this is the default).
- **linear**: Specifies an animation with the same speed from start to end.
- **ease-in**: Specifies an animation with a slow start.
- **ease-out**: Specifies an animation with a slow end.
- **ease-in-out**: Specifies an animation with a slow start and slow end.
- **spring**: Specifies a spring animation.
- **cubic-bezier(n,n,n,n)**: Lets you define your own values in a cubic-bezier function, as shown in **Example 8**.

**Example 8: How to specify the speed curve using cubic-bezier function.**

```css
.view {
  animation-name: example;
  animation-timing-function: cubic-bezier(0.1, 0.1, 1, 1);
}
```

### Determine the result when the animation ends

The **animation-fill-mode** property determines the element style when the animation finishes. Its default value is "none". In this case, all animated values will be reset to the state before the animation started. You should choose "forwards" in order to preserve the property values set during the animation.

**Example 9: How to use **animation-fill-mode** property**

```css
.view {
  background-color: red;
  animation-name: example;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
```

### Animation direction

You can use the **animation-direction** property to play a CSS animation in reverse direction, as shown in **Example 10**.

**Example 10: How to reverse animation direction.**

```css
.view {
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
  animation-direction: reverse;
}
```

### Animation shorthand

The **animation** property allows setting all seven animation properties with a single line:

**Example 11: How to use animation shorthand property**

```css
.view {
  animation: example 4s ease-in-out 2s infinite reverse forwards;
}
```

The supported syntax is:

animation: name duration timing-function delay iteration-count direction fill-mode;

You can combine two animations in the **animation** property by using commas:

**Example 12: How to combine several animations in the **animation** property**

```css
.view {
  animation: example 4s ease-in-out 2s infinite reverse, second-animation-example 5s
      ease-out;
}
```

### Pseudo selectors

A pseudo selector is used to define a special state of an element. For example, when a button is touched by the user. You can use pseudo selectors to trigger animations:

**Example 13: How to trigger animation on element special state**

```css
.button {
  background-color: green;
}

.button:highlighted {
  animation-name: highlight;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}

@keyframes highlight {
  from {
    background-color: yellow;
  }
  to {
    background-color: red;
  }
}
```

> As of version 2.0, only the **Button** component has a built-in special state "highlighted" to indicate that it is touched by the user.

### Animations - width and height

**Example 14: How to animate view's width and height.**

/// flavor plain

```xml
<GridLayout rows="* *" columns="*" class="home-panel">
  <StackLayout row="0">
    <Label text="{N}" class="big-label first-view" textWrap="true" />
  </StackLayout>
  <StackLayout row="1">
    <Label text="{N}" class="big-label second-view" textWrap="true" />
  </StackLayout>
</GridLayout>
```

```css
.first-view {
  animation-name: example-width;
  animation-duration: 5s;
  animation-fill-mode: forwards;
}

.second-view {
  animation-name: example-height;
  animation-duration: 5s;
  animation-fill-mode: forwards;
}

@keyframes example-width {
  from {
    width: 140;
  }
  to {
    width: 200;
  }
}

@keyframes example-height {
  from {
    height: 140;
  }
  to {
    height: 200;
  }
}
```

[Demo](https://play.nativescript.org/?template=play-js&id=xe3lMf)

///

/// flavor angular

```html
<GridLayout rows="* *" columns="*" class="home-panel">
  <StackLayout row="0">
    <label text="{N}" class="big-label first-view" textWrap="true"></label>
  </StackLayout>
  <StackLayout row="1">
    <label text="{N}" class="big-label second-view" textWrap="true"></label>
  </StackLayout>
</GridLayout>
```

```css
.first-view {
  animation-name: example-width;
  animation-duration: 5s;
  animation-fill-mode: forwards;
}

.second-view {
  animation-name: example-height;
  animation-duration: 5s;
  animation-fill-mode: forwards;
}

@keyframes example-width {
  from {
    width: 140;
  }
  to {
    width: 200;
  }
}

@keyframes example-height {
  from {
    height: 140;
  }
  to {
    height: 200;
  }
}
```

[Demo](https://play.nativescript.org/?template=play-ng&id=NMM4I5)

///

### Access CSS animations from code

The simplest way to trigger a CSS animation is by changing the element **className** property:

**Example 15: How to trigger CSS animation**

```js
const view = page.getViewById('view')
view.className = 'transparent'
```

```ts
const view = page.getViewById('view')
view.className = 'transparent'
```

All keyframes defined in CSS can be accessed with code by using the **getKeyframeAnimationWithName** method. This allows further customization of animation properties:

**Example 16: Accessing CSS defined keyframe in the code via **getKeyframeAnimationWithName** method**

```js
import { KeyframeAnimation } from '@nativescript/core'

const view = page.getViewById('view')
const animationInfo = page.getKeyframeAnimationWithName('bounce')
animationInfo.duration = 2000

const animation = KeyframeAnimation.keyframeAnimationFromInfo(animationInfo)
animation.play(view).then(() => {
  console.log('Played with code!')
})
```

```ts
import { KeyframeAnimation, View } from '@nativescript/core'

const view = page.getViewById('view') as View
const animationInfo = page.getKeyframeAnimationWithName('bounce')
animationInfo.duration = 2000

const animation = KeyframeAnimation.keyframeAnimationFromInfo(animationInfo)
animation.play(view).then(() => {
  console.log('Played with code!')
})
```

### Animations

One of the ways to improve the attractiveness of your application is by adding animations. NativeScript exposes a simple and easy, but powerful enough API to allow animating almost every native element in your application.

For your convenience, we expose two ways of creating animations:

- [Declarative]() - you will use the easy and familiar CSS3 animations API
- [Imperative]() - take full control of any animation by calling animation methods directly with code

<!-- TODO: fix links -->

Here you will find a detailed set of examples demonstrating the different animations that can be achieved with NativeScript.

#### Hello world example

In **Example 1** we will change the background color of a button from "red" to "green". You can use JavaScript or TypeScript code to do the following:

**Example 1: Changing background color animation with code.**

![hello-world](/assets/images/modules/animation/hello-world.gif 'Hello world')

```js
// Import color module
import { Color } from '@nativescript/core'

view.backgroundColor = new Color('red')
view.animate({ backgroundColor: new Color('green'), duration: 2000 })
```

```ts
// Import color module
import { Color } from '@nativescript/core'

view.backgroundColor = new Color('red')
view.animate({ backgroundColor: new Color('green'), duration: 2000 })
```

[Try this animation in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=h6g8J8)

As _Example 2_ shows, you can express the same animation in CSS with the following definition:

**Example 2: Changing background color animation with CSS.**

```css
@keyframes example {
  from {
    background-color: red;
  }
  to {
    background-color: green;
  }
}
.view {
  animation-name: example;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}
```

```xml
<!-- Apply CSS class to element to trigger CSS animation -->
<Label class="view" text="{N}" />
```

:::tip Note

CSS animations apply with lower precedence, like any other CSS settings, so any local values set in your element will cancel the animation.

:::

[Try this animation in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=tQRe9Q)

NativeScript lets you animate the following properties:

- **opacity**
- **backgroundColor**
- **translate**
- **scale**
- **rotate**

:::tip Note

To use `translate` or `scale` you must proceed with an object declaring both x and y values, for example `translate: { x: 100, y: 250 }` or `scale: { x: 1.5, y: 0 }`.

:::

In every animation, you can control the following properties:

- **duration**: The length of the animation.
- **delay**: The amount of time to delay starting the animation.
- **iterations**: Specifies how many times the animation should be played.
- **timing function**: The speed curve of the animation. Available options are defined below.
- **originX** and **originY**: The X and Y components of the origin point around which the view will be transformed.

### Animation curves

By default, an animation moves with a linear speed without acceleration or deceleration. This might look unnatural and different from the real world where objects need time to reach their top speed and can't stop immediately. The animation curve (sometimes called an easing function) is used to give animations an illusion of inertia. It controls the animation speed by modifying the fraction of the duration. NativeScript comes with a number of predefined animation curves.

- **linear**: The simplest animation curve is linear. It maintains a constant speed while the animation is running:

![linear](/assets/images/modules/animation/linear.gif 'Linear')

- **Ease-in**: The ease-in curve causes the animation to begin slowly, and then speed up as it progresses.

![easein](/assets/images/modules/animation/easein.gif 'EaseIn')

- **Ease-out**: An ease-out curve causes the animation to begin quickly, and then slow down as it completes.

![easeout](/assets/images/modules/animation/easeout.gif 'EaseOut')

- **Ease-in-out**: An ease-in ease-out curve causes the animation to begin slowly, accelerate through the middle of its duration, and then slow again before completing.

![easeinout](/assets/images/modules/animation/easeinout.gif 'EaseInOut')

- **Spring**: A spring animation curve causes an animation to produce a spring (bounce) effect.

![spring](/assets/images/modules/animation/spring.gif 'Spring')

In NativeScript, the animation curve is represented by the AnimationCurve enumeration and can be specified with the curve property of the animation. In CSS, the animation curve is defined by using the animation-timing-function property (see **Example 3**):

**Example 3: How to customize the animation timing function**

```js
import { CoreTypes } from '@nativescript/core'

view.animate({
  translate: { x: 0, y: 100 },
  duration: 1000,
  curve: CoreTypes.AnimationCurve.easeIn
})
```

```ts
import { CoreTypes } from '@nativescript/core'

view.animate({
  translate: { x: 0, y: 100 },
  duration: 1000,
  curve: CoreTypes.AnimationCurve.easeIn
})
```

```css
.view {
  animation-name: example;
  animation-duration: 1;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
}
@keyframes example {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, 100);
  }
}
```

[Experiment with the different animation timing functions in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=zt5sXZ)

It is easy to create your own animation curve by passing in the X and Y components of two control points of a cubic Bezier curve (as shown in **Example 4**). Using Bezier curves is a common technique to create smooth curves in computer graphics and they are widely used in vector-based drawing tools. The values passed to the cubicBezier method control the curve shape. The animation speed will be adjusted based on the resulting path.

For help finding the `cubicBezier` values you need for your custom animation timing function, use the visual tools on [cubic-bezier.com](http://cubic-bezier.com). Once you find an animation path you like, simply copy and paste the cubic bezier values and paste them in the `AnimationCurve.cubicBezier` function. There should be four numbers (X,Y coordinates for each of the two points in the animation).

**Example 4: How to create own animation curve via cubic Bezier**

![beziergraph](/assets/images/modules/animation/bezier-graph.png 'BezierGraph')

```js
import { Enums } from '@nativescript/core'

view.animate({
  translate: { x: 0, y: 100 },
  duration: 1000,
  curve: Enums.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
})
```

```typescript
import { Enums } from '@nativescript/core'

view.animate({
  translate: { x: 0, y: 100 },
  duration: 1000,
  curve: Enums.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
})
```

```css
.view {
  animation-name: example;
  animation-duration: 1;
  animation-timing-function: cubicBezier(0.1, 0.1, 0.1, 1);
  animation-fill-mode: forwards;
}
```

![bezier](/assets/images/modules/animation/bezier.gif 'Bezier')

More detailed examples are available on the [Animation Examples](#animation-examples) page.

### Rotation using originX and originY

To create more complex animations, we might need to change the origin point around which the selected view will be transformed. This can be achieved using [`originX`](/api-reference/classes/view.html#originx) and [`originY`](/api-reference/classes/view.html#originy) properties of `View`.

**Example 5: Rotating a view around its center. Center of view is changed via `originX` and `originY` properties.**

```js
view.originX = 1 // default 0.5 (center), 0 is most left, 1 is most right
view.originY = 0.5 // default 0.5 (middle), 0 is top, 1 is bottom
view.animate({
  rotate: 360, // will take into account originX and originY
  duration: 1000
})
```

```typescript
view.originX = 1 // default 0.5 (center), 0 is most left, 1 is most right
view.originY = 0.5 // default 0.5 (middle), 0 is top, 1 is bottom
view.animate({
  rotate: 360, // will take into account originX and originY
  duration: 1000
})
```

::: warning Note
The properties `originX` and `originY` are JavaScript properties and can be assigned via code-behind only via a given `View` reference. We can still use them along with CSS animations, but the values for `originX` and `originY` must be set in the code-behind logic.
:::

### Limitations

- `Span` and `FormattedString` can not be animated. `Span` and `FormattedString` elements are not extending the [`View`](/api-reference/classes/view.html) class, but only [`ViewBase`](/api-reference/classes/viewbase.html). Because of this, neither `Span` nor `FormattedString` are ui elements, making it impossible to animate them and causing a crash on iOS.

### Animation examples

This article contains examples demonstrating how to animate the animatable view properties. A full list of all animatable properties and a detailed explanation of the animations API is presented [here](#animations).

The full source code for all samples is located [here](https://github.com/NativeScript/animation-demo).

### Animated opacity

![opacity](/assets/images/modules/animation/opacity.gif 'Opacity')

```js
view.animate({
  opacity: 0,
  duration: 3000
})
```

```ts
view.animate({
  opacity: 0,
  duration: 3000
})
```

```css
.view {
  animation-name: opacity;
  animation-duration: 3;
}
@keyframes opacity {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=q9nY9l)

### Animate background color

![background-color](/assets/images/modules/animation/background-color.gif 'Background Color')

```js
import { Color } from '@nativescript/core'

view.animate({
  backgroundColor: new Color('#3D5AFE'),
  duration: 3000
})
```

```ts
import { Color } from '@nativescript/core'

view.animate({
  backgroundColor: new Color('#3D5AFE'),
  duration: 3000
})
```

```css
.view {
  animation-name: backgroundColor;
  animation-duration: 3;
}
@keyframes backgroundColor {
  from {
    background-color: white;
  }
  to {
    background-color: #3d5afe;
  }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=aLjBQg)

### Animate position

![translate](/assets/images/modules/animation/translate.gif 'Translate')

```js
view.animate({
  translate: { x: 100, y: 100 },
  duration: 3000
})
```

```ts
view.animate({
  translate: { x: 100, y: 100 },
  duration: 3000
})
```

```css
.view {
  animation-name: translate;
  animation-duration: 3;
}
@keyframes translate {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(100, 100);
  }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=egSanf)

### Animate scale

![scale](/assets/images/modules/animation/scale.gif 'Scale')

```js
view.animate({
  scale: { x: 2, y: 2 },
  duration: 3000
})
```

```ts
view.animate({
  scale: { x: 2, y: 2 },
  duration: 3000
})
```

```css
.view {
  animation-name: scale;
  animation-duration: 3;
}
@keyframes scale {
  from {
    transform: scale(1, 1);
  }
  to {
    transform: scale(2, 2);
  }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=4Ni5sU)

### Animate rotate

![rotate](/assets/images/modules/animation/rotate.gif 'Rotate')

```js
view.animate({
  rotate: 360,
  duration: 3000
})
```

```ts
view.animate({
  rotate: 360,
  duration: 3000
})
```

```css
.view {
  animation-name: rotate;
  animation-duration: 3;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=2vpfgV)

### Chaining animations with AnimationSet

![chaining-with-animation-set](/assets/images/modules/animation/chaining-with-animation-set.gif 'Chaining with Animation Set')

```js
import { Animation } from '@nativescript/core'

const definitions = new Array()
definitions.push({ target: view1, translate: { x: 200, y: 0 }, duration: 3000 })
definitions.push({ target: view2, translate: { x: 0, y: 200 }, duration: 3000 })
definitions.push({ target: view3, translate: { x: -200, y: 0 }, duration: 3000 })
definitions.push({ target: view4, translate: { x: 0, y: -200 }, duration: 3000 })

const playSequentially = true
const animationSet = new Animation(definitions, playSequentially)
animationSet
  .play()
  .then(() => {
    console.log('Animation finished')
  })
  .catch(e => {
    console.log(e.message)
  })
```

```ts
import { Animation, AnimationDefinition } from '@nativescript/core'

const definitions = new Array<AnimationDefinition>()
definitions.push({ target: view1, translate: { x: 200, y: 0 }, duration: 3000 })
definitions.push({ target: view2, translate: { x: 0, y: 200 }, duration: 3000 })
definitions.push({ target: view3, translate: { x: -200, y: 0 }, duration: 3000 })
definitions.push({ target: view4, translate: { x: 0, y: -200 }, duration: 3000 })
const playSequentially = true
const animationSet = new Animation(definitions, playSequentially)
animationSet
  .play()
  .then(() => {
    console.log('Animation finished')
  })
  .catch(e => {
    console.log(e.message)
  })
```

### Animating multiple views

![multiple-views](/assets/images/modules/animation/multiple-views.gif 'Multiple Views')

```js
import { Animation } from '@nativescript/core'

const definitions = new Array()
const a1 = {
  target: view1,
  translate: { x: 200, y: 0 },
  duration: 3000
}
definitions.push(a1)

const a2 = {
  target: view2,
  translate: { x: 0, y: 200 },
  duration: 3000
}
definitions.push(a2)

const a3 = {
  target: view3,
  translate: { x: -200, y: 0 },
  duration: 3000
}
definitions.push(a3)

const a4 = {
  target: view4,
  translate: { x: 0, y: -200 },
  duration: 3000
}
definitions.push(a4)

const animationSet = new Animation(definitions)
animationSet
  .play()
  .then(() => {
    console.log('Animation finished')
  })
  .catch(e => {
    console.log(e.message)
  })
```

```ts
import { AnimationDefinition } from '@nativescript/core'

const definitions = new Array<AnimationDefinition>()
const a1: AnimationDefinition = {
  target: view1,
  translate: { x: 200, y: 0 },
  duration: 3000
}
definitions.push(a1)

const a2: AnimationDefinition = {
  target: view2,
  translate: { x: 0, y: 200 },
  duration: 3000
}
definitions.push(a2)

const a3: AnimationDefinition = {
  target: view3,
  translate: { x: -200, y: 0 },
  duration: 3000
}
definitions.push(a3)

const a4: AnimationDefinition = {
  target: view4,
  translate: { x: 0, y: -200 },
  duration: 3000
}
definitions.push(a4)

const animationSet = new Animation(definitions)

animationSet
  .play()
  .then(() => {
    console.log('Animation finished')
  })
  .catch(e => {
    console.log(e.message)
  })
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=rgm744)

### Reusing animations

![reusing](/assets/images/modules/animation/reusing.gif 'Reusing Animations')

```js
const animation1 = view.createAnimation({ opacity: 0 })
const animation2 = view.createAnimation({ opacity: 1 })
animation1
  .play()
  .then(() => {
    return animation2.play()
  })
  .then(() => {
    return animation1.play()
  })
  .then(() => {
    return animation2.play()
  })
  .then(() => {
    return animation1.play()
  })
  .then(() => {
    return animation2.play()
  })
  .then(() => {
    console.log('Animation finished')
  })
  .catch(e => {
    console.log(e.message)
  })
```

```ts
const animation1 = view.createAnimation({ opacity: 0 })
const animation2 = view.createAnimation({ opacity: 1 })

animation1
  .play()
  .then(() => animation2.play())
  .then(() => animation1.play())
  .then(() => animation2.play())
  .then(() => animation1.play())
  .then(() => animation2.play())
  .then(() => {
    console.log('Animation finished')
  })
  .catch(e => {
    console.log(e.message)
  })
```

### Slide-in effect

![slide-in-effect](/assets/images/modules/animation/slide-in-effect.gif 'Slide-in Effect')

```js
const item = new imageModule.Image()
item.src = '~/res/icon_100x100.png'
item.width = 90
item.height = 90
item.style.margin = '5,5,5,5'
item.translateX = -300
item.opacity = 0
item.on('loaded', args => {
  args.object.animate({
    translate: { x: 0, y: 0 },
    opacity: 1
  })
})
wrapLayout.addChild(item)
```

```ts
import { EventData, View } from '@nativescript/core'
const item = new imageModule.Image()
item.src = '~/res/icon_100x100.png'
item.width = 90
item.height = 90
item.style.margin = '5,5,5,5'
item.translateX = -300
item.opacity = 0
item.on('loaded', (args: EventData) => {
  ;(args.object as View).animate({
    translate: { x: 0, y: 0 },
    opacity: 1
  })
})
wrapLayout.addChild(item)
```

### Infinite animations

![infinite](/assets/images/modules/animation/infinite.gif 'Infinite')

```js
animationSet = new animationModule.Animation([
  {
    target: view,
    rotate: 360,
    duration: 3000,
    iterations: Number.POSITIVE_INFINITY,
    curve: view.ios
      ? UIViewAnimationCurve.UIViewAnimationCurveLinear
      : new android.view.animation.LinearInterpolator()
  }
])
animationSet.play().catch(function (e) {
  console.log('Animation stopped!')
})
// Call animationSet.cancel() to stop it;
```

```ts
animationSet = new animationModule.Animation([
  {
    target: view,
    rotate: 360,
    duration: 3000,
    iterations: Number.POSITIVE_INFINITY,
    curve: view.ios
      ? UIViewAnimationCurve.UIViewAnimationCurveLinear
      : new android.view.animation.LinearInterpolator()
  }
])
animationSet.play().catch(e => {
  console.log('Animation stopped!')
})
// Call animationSet.cancel() to stop it;
```

### Rotation using originX and originY

**Example 5: Rotating a view around its center. Center of view is changed via `originX` and `originY` properties.**

![rotation_origin_x_y](/assets/images/modules/animation/rotation_origin_x_y.gif 'Rotation originX / originY')

```js
const view = page.getViewById('myView')

view.originX = 1 // default 0.5 (center), 0 is most left, 1 is most right
view.originY = 0 // default 0.5 (middle), 0 is top, 1 is bottom
view
  .animate({
    rotate: 360, // will take into account originX and originY
    duration: 1000
  })
  .then(() => {
    view.originX = 0
    view.originY = 1
    view.rotate = 0

    view.animate({
      rotate: -360,
      duration: 1000
    })
  })
```

```ts
const view = page.getViewById('myView')

view.originX = 1 // default 0.5 (center), 0 is most left, 1 is most right
view.originY = 0 // default 0.5 (middle), 0 is top, 1 is bottom
view
  .animate({
    rotate: 360, // will take into account originX and originY
    duration: 1000
  })
  .then(() => {
    view.originX = 0
    view.originY = 1
    view.rotate = 0

    view.animate({
      rotate: -360,
      duration: 1000
    })
  })
```

### Animation - View's Width and Height

### Width

```js
const label = page.getViewById('lblNS')
const animation = new Animation([
  {
    width: 200,
    duration: 2000,
    target: label,
    delay: 200
  }
])
animation.play()
```

```ts
const label: Label = page.getViewById('lblNS')
const animation = new Animation([
  {
    width: 200,
    duration: 2000,
    target: label,
    delay: 200
  }
])
animation.play()
```

### Height

```js
const label = page.getViewById('lblNS')
const animation = new Animation([
  {
    height: 200,
    duration: 2000,
    target: label,
    delay: 200
  }
])
animation.play()
```

```ts
const label: Label = page.getViewById('lblNS')
const animation = new Animation([
  {
    height: 200,
    duration: 2000,
    target: label,
    delay: 200
  }
])
animation.play()
```

[Demo JavaScript](https://play.nativescript.org/?template=play-js&id=mOZv68) [Demo TypeScript](https://play.nativescript.org/?template=play-tsc&id=ckdYDS)

```typescript
@ViewChild("lblNS", { read: ElementRef, static: false }) labelRef: ElementRef;
private label: Label;
...
ngAfterViewInit(): void {
    this.label = this.labelRef.nativeElement;
}
...
let animation = new Animation([
    {
        width: 200,
        duration: 2000,
        target: this.label,
        delay: 200
    }

]);
animation.play();
```

### Height

```typescript
@ViewChild("lblNS", { read: ElementRef, static: false }) labelRef: ElementRef;
private label: Label;
...
ngAfterViewInit(): void {
    this.label = this.labelRef.nativeElement;
}
...
let animation = new Animation([
    {
        height: 200,
        duration: 2000,
        target: this.label,
        delay: 200
    }

]);
animation.play();
```

[Demo](https://play.nativescript.org/?template=play-ng&id=cWAc2j)

## Dialogs

NativeScript lets you create dialogs in a similar manner to the web browser. You can create alerts, confirmations, prompts, logins and dialogs that require action.

---

### Alert Dialog

An Alert Dialog to notify the user of some event or action.

```ts
import { Dialogs } from '@nativescript/core'

export function showAlertDialog() {
  const alertOptions = {
    title: 'Warning',
    message: 'Something terrible has happened.',
    okButtonText: 'Okay',
    cancelable: false // [Android only] Gets or sets if the dialog can be canceled by taping outside of the dialog.
  }

  Dialogs.alert(alertOptions).then(() => {
    console.log('Race chosen!')
  })
}
```

#### Alert Dialog Properties

| Name           | Type      | Description                                                                                    |
| -------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `title`        | `string`  | Gets or sets the dialog title.                                                                 |
| `message`      | `string`  | Gets or sets the dialog message.                                                               |
| `cancelable`   | `boolean` | _*[Android only]*_ Gets or sets if the dialog can be canceled by taping outside of the dialog. |
| `okButtonText` | `string`  | Gets or sets the OK button text.                                                               |

### Action Dialog

An Action Dialog will require a particular activity from the user. The action method accepts multiple parameters or an ActionOptions object with keys title, message, cancelButtonText, actions, and cancelable(Android only property).

```ts
import { Dialogs } from '@nativescript/core'

export function showActionDialog() {
  const actionOptions = {
    title: 'Race selection',
    message: 'Choose your race',
    cancelButtonText: 'Cancel',
    actions: ['Human', 'Elf', 'Dwarf', 'Orc', 'Unicorn'],
    cancelable: true // Android only
  }

  Dialogs.action(actionOptions).then(result => {
    console.log('Dialog result: ', result)
    if (result === 'Options1') {
      // Do action 1
    } else if (result === 'Option2') {
      // Do action 2
    }
  })
}
```

#### Action Dialog Properties

| Name               | Type            | Description                                                                                    |
| ------------------ | --------------- | ---------------------------------------------------------------------------------------------- |
| `title`            | `string`        | Gets or sets the dialog title.                                                                 |
| `message`          | `string`        | Gets or sets the dialog message.                                                               |
| `cancelable`       | `boolean`       | _*[Android only]*_ Gets or sets if the dialog can be canceled by taping outside of the dialog. |
| `actions`          | `Array<string>` | Gets or sets the list of available actions.                                                    |
| `cancelButtonText` | `string`        | Gets or sets the Cancel button text.                                                           |

### Confirm

A Confirm Dialog will expect the user to accept or reject the action that is about the happen.

```ts
import { Dialogs } from '@nativescript/core'

export function showConfirmDialog() {
  const confirmOptions = {
    title: 'Race selection',
    message: 'Are you sure you want to be a Unicorn?',
    okButtonText: 'Yes',
    cancelButtonText: 'No',
    neutralButtonText: 'Cancel'
  }

  Dialogs.confirm(confirmOptions).then(result => {
    console.log(result)
  })
}
```

#### Confirm Dialog Properties

| Name                | Type      | Description                                                                                    |
| ------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `title`             | `string`  | Gets or sets the dialog title.                                                                 |
| `message`           | `string`  | Gets or sets the dialog message.                                                               |
| `cancelable`        | `boolean` | _*[Android only]*_ Gets or sets if the dialog can be canceled by taping outside of the dialog. |
| `cancelButtonText`  | `string`  | Gets or sets the Cancel button text.                                                           |
| `okButtonText`      | `string`  | Gets or sets the OK button text.                                                               |
| `neutralButtonText` | `string`  | Gets or sets the neutral button text.                                                          |

### Login

A Login Dialog will wait for the user to input their credentials.

```ts
import { Dialogs } from '@nativescript/core'

export function showLoginDialog() {
  const loginOptions = {
    title: 'Login Form',
    message: 'Enter your credentials',
    okButtonText: 'Login',
    cancelButtonText: 'Cancel',
    neutralButtonText: 'Neutral',
    userNameHint: 'Enter your username',
    passwordHint: 'Enter your password',
    userName: 'john_doe',
    password: '123456'
  }

  Dialogs.login(loginOptions).then(loginResult => {
    console.log(loginResult.result)
  })
}
```

#### Login Dialog Properties

| Name                | Type      | Description                                                                                    |
| ------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `title`             | `string`  | Gets or sets the dialog title.                                                                 |
| `message`           | `string`  | Gets or sets the dialog message.                                                               |
| `cancelable`        | `boolean` | _*[Android only]*_ Gets or sets if the dialog can be canceled by taping outside of the dialog. |
| `cancelButtonText`  | `string`  | Gets or sets the Cancel button text.                                                           |
| `okButtonText`      | `string`  | Gets or sets the OK button text.                                                               |
| `neutralButtonText` | `string`  | Gets or sets the neutral button text.                                                          |
| `userName`          | `string`  | Gets or sets the default text to display in the username input box.                            |
| `userNameHint`      | `string`  | Gets or sets the default text to display as hint in the username input box.                    |
| `password`          | `string`  | Gets or sets the default text to display in the password input box.                            |
| `passwordHint`      | `string`  | Gets or sets the default text to display as hint in the password input box.                    |

#### Login Dialog Result Properties

The result are received in the dialog resolved promise after the user closes or dismisses the dialog.

| Name       | Type      | Description                                                            |
| ---------- | --------- | ---------------------------------------------------------------------- |
| `userName` | `string`  | Gets the username entered in the login dialog.                         |
| `password` | `string`  | Gets the password entered in the login dialog.                         |
| `result`   | `boolean` | Returns `false` when the dialog is dismissed. Otherwise returns `true` |

### Prompt

A Prompt Dialog will request for an input. A basic definition might be:

```ts
import { Dialogs, Enums, inputType } from '@nativescript/core'

export function showPromptDialog() {
  const promptOptions = {
    title: 'Hey There',
    defaultText: ' Enter your mood ',
    message: "How you doin'",
    okButtonText: 'OK',
    cancelButtonText: 'Cancel',
    neutralButtonText: 'Neutral',
    cancelable: true,
    inputType: inputType.text, // email, number, text, password, or email
    capitalizationType: Enums.AutocapitalizationType.sentences // all. none, sentences or words
  }

  Dialogs.prompt(promptOptions).then(result => {
    console.log('Hello, ' + result.text)
  })
}
```

#### Prompt Dialog Properties

| Name                 | Type      | Description                                                                                    |
| -------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `title`              | `string`  | Gets or sets the dialog title.                                                                 |
| `message`            | `string`  | Gets or sets the dialog message.                                                               |
| `cancelable`         | `boolean` | _*[Android only]*_ Gets or sets if the dialog can be canceled by taping outside of the dialog. |
| `cancelButtonText`   | `string`  | Gets or sets the Cancel button text.                                                           |
| `okButtonText`       | `string`  | Gets or sets the OK button text.                                                               |
| `neutralButtonText`  | `string`  | Gets or sets the neutral button text.                                                          |
| `defaultText`        | `string`  | Gets or sets the default text to display in the input box.                                     |
| `capitalizationType` | `string`  | Gets or sets the prompt capitalizationType (none, all, sentences, or words).                   |
| `inputType`          | `string`  | Gets or sets the prompt input type (plain text, password, or email).                           |

#### Prompt Dialog Result Properties

The result are received in the dialog resolved promise after the user closes or dismisses the dialog.

| Name     | Type      | Description                                                            |
| -------- | --------- | ---------------------------------------------------------------------- |
| `text`   | `string`  | Gets the text entered in the prompt dialog input field.                |
| `result` | `boolean` | Returns `false` when the dialog is dismissed. Otherwise returns `true` |

### API References

| Name                                                              | Type        |
| ----------------------------------------------------------------- | ----------- |
| [@nativescript/core/dialogs](/api-reference/modules.html#dialogs) | `Module`    |
| [action](/api-reference/modules.html#dialogs)                     | `function`  |
| [ActionOptions](/api-reference/modules.html#dialogs)              | `interface` |
| [alert](/api-reference/modules.html#dialogs)                      | `function`  |
| [AlertOptions](/api-reference/modules.html#dialogs)               | `interface` |
| [confirm](/api-reference/modules.html#dialogs)                    | `function`  |
| [ConfirmOptions](/api-reference/modules.html#dialogs)             | `interface` |
| [login](/api-reference/modules.html#dialogs)                      | `function`  |
| [LoginOptions](/api-reference/modules.html#dialogs)               | `interface` |
| [LoginResults](/api-reference/modules.html#dialogs)               | `interface` |
| [prompt](/api-reference/modules.html#dialogs)                     | `function`  |
| [PromptOptions](/api-reference/modules.html#dialogs)              | `interface` |

### Native Component

| Android                                                                                                    | iOS                                                                                    |
| :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| [android.app.AlertDialog.Builder](https://developer.android.com/reference/android/app/AlertDialog.Builder) | [UIAlertController](https://developer.apple.com/documentation/uikit/uialertcontroller) |

## Gestures

Gestures, such as tap, slide and pinch, allow users to interact with your app by manipulating UI elements on the screen.

In NativeScript, `View`&mdash;the base class for all NativeScript UI elements&mdash;has `on` and `off` methods that let you subscribe or unsubscribe to all events and gestures recognized by the UI element.

As the first parameter, you pass an `on` or `off` method and the type of gesture you want to track. The second parameter is a function that is called each time the specified gesture is recognized. The function arguments contain additional information about the gesture, if applicable.

- **on(** type _Number_ | name _String_ | names Comma separated _String_, callback _Function_... \*\*)

  - **type** - _Number_ | **name** - _String_ | **names** - Comma separated _String_
  - **callback** - _Function_(args _GestureEventData_)

- **off(** type _Number_ | name _String_ | names Comma separated _String_, callback _Function_... \*\*)
  - **type** - _Number_ | **name** - _String_ | **names** - Comma separated _String_
  - **callback** - _Function_(args _GestureEventData_)

### Tap

**Action: Briefly touch the screen.**

/// flavor plain

```ts
import { GestureTypes, GestureEventData, Label } from '@nativescript/core'
var label = new Label()
label.on(GestureTypes.tap, (args: GestureEventData) => {
  console.log('Tap')
})
```

///

/// flavor angular

```ts
import { GestureEventData } from '@nativescript/core'

onTap(args: GestureEventData) {
  console.log("Tap!");
}
```

```html
<label text="Tap here" (tap)="onTap($event)"></label>
```

///

### Double Tap

**Action: Two taps in a quick succession.**

/// flavor plain

```ts
import { GestureTypes, GestureEventData, Label } from '@nativescript/core'
var label = new Label()
label.on(GestureTypes.doubleTap, (args: GestureEventData) => {
  console.log('Double Tap')
})
```

///

/// flavor angular

```ts
import { GestureEventData } from '@nativescript/core'

onDoubleTap(args: GestureEventData) {
  console.log("DoubleTap!");
}
```

```html
<label text="Double tap here" (doubleTap)="onDoubleTap($event)"></label>
```

///

Possible implementation:

- Scale up the object with a predefined percentage, centered around the double-tapped region. If a user keeps repeating the double tap gesture, continue to scale up until the maximum scale is reached.
- Scale up the smallest targetable view or returns it to its original scale in nested views.
- Select text.

### Long Press

**Action: Press your finger against the screen for a few moments.**

/// flavor plain

```ts
import { GestureTypes, GestureEventData, Label } from '@nativescript/core'

var label = new Label()
label.on(GestureTypes.longPress, (args: GestureEventData) => {
  console.log('Long Press')
})
```

///

/// flavor angular

```ts
import { GestureEventData } from '@nativescript/core'

onLongPress(args: GestureEventData) {
  console.log("LongPress!");
}
```

```html
<label text="Long press here" (longPress)="onLongPress($event)"></label>
```

///

Possible implementation: Select one or more items in a view and act upon the data using a contextual action bar. Enter data selection mode. Avoid using long press for displaying contextual menus.

### Swipe

**Action: Swiftly slide your finger across the screen. Swipes are quick and affect the screen even after the finger is lifted off the screen.**

/// flavor plain

```ts
import { GestureTypes, SwipeGestureEventData, Label } from '@nativescript/core'

var label = new Label()
label.on(GestureTypes.swipe, (args: SwipeGestureEventData) => {
  console.log('Swipe Direction: ' + args.direction)
})
```

///

/// flavor angular

```ts
import { SwipeGestureEventData } from '@nativescript/core'

onSwipe(args: SwipeGestureEventData) {
  console.log("Swipe Direction: " + args.direction);
}
```

```html
<label text="Swipe here" (swipe)="onSwipe($event)"></label>
```

///

Possible implementation: Navigate between views in the same hierarchy.

### Pan

**Action: Press your finger down and immediately start moving it around. Pans are executed more slowly and allow for more precision and the screen stops responding as soon as the finger is lifted off it.**

/// flavor plain

```ts
import { GestureTypes, PanGestureEventData, Label } from '@nativescript/core'

const label = new Label()
label.on(GestureTypes.pan, (args: PanGestureEventData) => {
  console.log('Pan deltaX:' + args.deltaX + '; deltaY:' + args.deltaY + ';')
})
```

///

/// flavor angular

```ts
import { PanGestureEventData } from '@nativescript/core'

onPan(args: PanGestureEventData) {
  console.log("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
}
```

```html
<label text="Pan here" (pan)="onPan($event)"></label>
```

///

### Pinch

**Action: Touch the screen using two of your fingers, then move them towards each other or away from each other.**

/// flavor plain

```ts
import { GestureTypes, PinchGestureEventData, Label } from '@nativescript/core'

var label = new Label()
label.on(GestureTypes.pinch, (args: PinchGestureEventData) => {
  console.log('Pinch Scale: ' + args.scale)
})
```

///

/// flavor angular

```ts
import { PinchGestureEventData } from '@nativescript/core'

onPinch(args: PinchGestureEventData) {
  console.log("Pinch scale: " + args.scale + " state: " + args.state);
}
```

```html
<label text="Pinch here" (pinch)="onPinch($event)"></label>
```

///

Possible implementation: Zoom into content or out of content.

### Rotation

**Action: Touch the screen using two of your fingers, then rotate them simultaneously left or right.**

/// flavor plain

```ts
import { GestureTypes, RotationGestureEventData, Label } from '@nativescript/core'

var label = new Label()
label.on(GestureTypes.rotation, (args: RotationGestureEventData) => {
  console.log('Rotation: ' + args.rotation)
})
```

///

/// flavor angular

```ts
import { RotationGestureEventData } from '@nativescript/core'

onRotate(args: RotationGestureEventData) {
  console.log("Rotate angle: " + args.rotation + " state: " + args.state);
}
```

```html
<label text="Rotate here" (rotation)="onRotate($event)"></label>
```

///

### Touch

**Action: A finger action was performed.**

This is a general purpose gesture that is triggered whenever a pointer (usually a finger) has performed a touch action (up, down, move or cancel). `TouchGestureEventData` provides information about all the pointers currently on the screen and their position inside the view that triggered the event.

/// flavor plain

```ts
import { GestureTypes, TouchGestureEventData, Label } from '@nativescript/core'

var label = new Label()
label.on(GestureTypes.touch, (args: TouchGestureEventData) => {
  console.log('Touch: x: ' + args.getX() + ' y: ' + args.getY())
})
```

///

/// flavor angular

```ts
import { TouchGestureEventData } from '@nativescript/core'

onTouch(args: TouchGestureEventData) {
  console.log(
    "Touch point: [" + args.getX() + ", " + args.getY() +
    "] activePointers: " + args.getActivePointers().length);
}
```

```html
<label text="Touch here" (touch)="onTouch($event)"></label>
```

///

### Subscribing to Multiple Gestures and Events

Since the release of NativeScript 1.3, when subscribing you can use gestures names, comma separated gestures names and/or even mix with events.

/// flavor plain

```ts
import { GestureEventData, Label } from '@nativescript/core'

var label = new Label()
label.on('loaded, tap, doubleTap, longPress', (args: GestureEventData) => {
  console.log('Event: ' + args.eventName + ', sender: ' + args.object)
})
```

///

### Gesture Manipulations

In some scenarios, you would want to disable the user interaction or to create more complex UI where some gestures are passing through the parents of the actual interactive zone. NativeScript provides some specific properties for handling similar cases as follows:

- `isUserInteractionEnabled` - Gets or sets a boolean value indicating whether the user can interact with the view. Does not affect the appearance of the view. The default value is `true`.

- `isEnabled` - Gets or sets a boolean value indicating whether the view is enabled. Affects the appearance of the view. The default value is `true`.

- `isPassThroughParentEnabled` - Gets or sets a value indicating whether touch events should pass through to a parent view of the layout container in case an interactive child view did not handle the event. Does not affect the appearance of the view. The default value is `false`.

::: warning Note
There is a conceptual difference in how `isEnabled` is acting on Android and iOS. On Android, the `isEnabled` set to `false` (e.g., on Button) won't allow any events to pass through even when `isPassThroughParentEnabled` is set to `true` for its parent. On the contrary on iOS, the same setup will pass through the event to the parent.
:::

Playground application demonstrating the usage of the three properties can be found [here](https://play.nativescript.org/?template=play-tsc&id=6c9GA0).

## Navigation

## Accessibility (aka a11y)

There are two primary ways to enable first class a11y support in your apps:

1. View attribute: `accessible="true"`

```html
<label text="{N}" accessible="true"></label>
```

2. CSS property: `a11y-enabled: true`

This option allows you to reuse CSS classes to enable a11y features.

```css
.a11y {
  a11y-enabled: true;
}
```

```html
<label text="{N}" class="a11y"></label>
```

Both options provide the flexibility desired when needing to enable a11y properly for your app.

::: warning Note
By default, all touchable elements are accessible as expected. (ie, `Button`, `Slider` etc.)
:::

### Properties

Various properties exist to further control a11y.

#### accessibilityLabel

It's recommended to always use an `accessibilityLabel` when marking a view as `accessible`. VoiceOver usage on the device will speak this value so the user knows what element has been selected.

```html
<label
  text="{N}"
  class="a11y"
  accessibilityLabel="The NativeScript logo in textual form"
></label>
```

#### accessibilityHint

Provide additional help so users understand what will happen when they perform an action on the accessible element.

```html
<button
  text="Submit"
  class="a11y"
  accessibilityLabel="Button to submit the form"
  accessibilityHint="Submit this form"
></button>
```

#### accessibilityIgnoresInvertColors (iOS only)

When screen colors invert with accessibility, you often don't want views such as photos to be inverted. You can set this to ignore the inversion.

#### accessibilityLiveRegion (Android only)

When components dynamically change, we want TalkBack to alert the end user.

- `AccessibilityLiveRegion.None`: Should not announce changes to this view.
- `AccessibilityLiveRegion.Polite`: Should announce changes to this view.
- `AccessibilityLiveRegion.Assertive`: Should interrupt ongoing speech to immediately announce changes to this view.

```html
<Switch checked="true" class="a11y" checkedChange="{{checkedChange}}" />
<TextView
  hint="TextView"
  text="{{switchCheckedText}}"
  accessibilityLiveRegion="{{AccessibilityLiveRegions.Assertive}}"
/>
```

In the above example method checkedChange changes the `switchCheckedText` variable. As soon as an end user taps the `Switch`, TalkBack reads text in the Text view because of its `AccessibilityLiveRegions.Assertive` property.

#### accessibilityRole

Communicates the purpose of an element to the user.

It can be set to one of the following:

- `AccessibilityRole.Adjustable` Element that can be "adjusted" (e.g. a slider).
- `AccessibilityRole.Button` Element that should be treated as a button.
- `AccessibilityRole.Checkbox` Element that represents a checkbox which can be checked or unchecked.
- `AccessibilityRole.Header` Eement that acts as a header for a section.
- `AccessibilityRole.Image` Element that should be treated as an image.
- `AccessibilityRole.ImageButton` Element that should be treated as a button and is also an image.
- `AccessibilityRole.KeyboardKey` Element that acts as a keyboard key.
- `AccessibilityRole.Link` Element that should be treated as a link.
- `AccessibilityRole.None` Element has no role.
- `AccessibilityRole.PlaysSound` Element that plays its own sound when activated.
- `AccessibilityRole.ProgressBar` Element that indicates progress of a task.
- `AccessibilityRole.RadioButton` Element is a radio button.
- `AccessibilityRole.Search` Element should be treated as a search field.
- `AccessibilityRole.SpinButton` Element that behaves like a SpinButton.
- `AccessibilityRole.StartsMediaSession` Element starts a media session when it is activated.
- `AccessibilityRole.StaticText` Element that should be treated as static text that cannot change.
- `AccessibilityRole.Summary` Element that provides summary information when the application starts.
- `AccessibilityRole.Switch` Element that behaves like a switch.

#### accessibilityState

Current state of an element.

It can be set to one of the following:

- `AccessibilityState.Selected` Element is currently selected.
- `AccessibilityState.Checked` Element is currently checked.
- `AccessibilityState.Unchecked` Element is currently unchecked.
- `AccessibilityState.Disabled` Element is currently disabled.

#### accessibilityValue

Current value of an element.

#### accessibilityElementsHidden

Whether elements contained within this accessibility element are hidden.

#### Coming soon

`onAccessibilityEscape`, `onMagicTap` (iOS only).
