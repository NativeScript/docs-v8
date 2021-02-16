## Gestures

* [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/ui/gestures.md

Gestures, such as tap, slide and pinch, allow users to interact with your app by manipulating UI elements on the screen.

In NativeScript, `View`&mdash;the base class for all NativeScript UI elements&mdash;has `on` and `off` methods that let you subscribe or unsubscribe to all events and gestures recognized by the UI element.

As the first parameter, you pass an `on` or `off` method and the type of gesture you want to track. The second  parameter is a function that is called each time the specified gesture is recognized. The function arguments contain additional information about the gesture, if applicable.

- **on(** type _Number_ | name _String_ | names Comma separated _String_, callback _Function_... **)
   - **type** - _Number_ | **name** - _String_ | **names** - Comma separated _String_
   - **callback** - _Function_(args _GestureEventData_)

- **off(** type _Number_ | name _String_ | names Comma separated _String_, callback _Function_... **)
   - **type** - _Number_ | **name** - _String_ | **names** - Comma separated _String_
   - **callback** - _Function_(args _GestureEventData_)

### Tap

**Action: Briefly touch the screen.**

{% nativescript %}
``` TypeScript
import { GestureTypes, GestureEventData, Label } from "@nativescript/core";
var label = new Label();
label.on(GestureTypes.tap, function (args: GestureEventData) {
    console.log("Tap");
});
```
{% endnativescript %}
{% angular %}
```TypeScript
onTap(args: GestureEventData) {
    console.log("Tap!");
}
```
```HTML
<Label text="Tap here" (tap)="onTap($event)"></Label>
```
{% endangular %}

### Double Tap

**Action: Two taps in a quick succession.**

{% nativescript %}
``` TypeScript
import { GestureTypes, GestureEventData, Label } from "@nativescript/core";
var label = new Label();
label.on(GestureTypes.doubleTap, function (args: GestureEventData) {
    console.log("Double Tap");
});
```
{% endnativescript %}
{% angular %}
```TypeScript
onDoubleTap(args: GestureEventData) {
    console.log("DoubleTap!");

}
```
```HTML
<Label text="Double tap here" (doubleTap)="onDoubleTap($event)"></Label>
```
{% endangular %}
Possible implementation:
* Scale up the object with a predefined percentage, centered around the double-tapped region. If a user keeps repeating the double tap gesture, continue to scale up until the maximum scale is reached.
* Scale up the smallest targetable view or returns it to its original scale in nested views.
* Select text.

### Long Press

**Action: Press your finger against the screen for a few moments.**

{% nativescript %}
``` TypeScript
import { GestureTypes, GestureEventData, Label } from "@nativescript/core";
var label = new Label();
label.on(GestureTypes.longPress, function (args: GestureEventData) {
    console.log("Long Press");
});
```
{% endnativescript %}
{% angular %}
```TypeScript
onLongPress(args: GestureEventData) {
    console.log("LongPress!");
}
```
```HTML
<Label text="Long press here" (longPress)="onLongPress($event)"></Label>
```
{% endangular %}
Possible implementation: Select one or more items in a view and act upon the data using a contextual action bar. Enter data selection mode. Avoid using long press for displaying contextual menus.

### Swipe

**Action: Swiftly slide your finger across the screen. Swipes are quick and affect the screen even after the finger is lifted off the screen.**

{% nativescript %}
``` TypeScript
import { GestureTypes, SwipeGestureEventData, Label } from "@nativescript/core";

var label = new Label();
label.on(GestureTypes.swipe, function (args: SwipeGestureEventData) {
    console.log("Swipe Direction: " + args.direction);
});
```
{% endnativescript %}
{% angular %}
```TypeScript
onSwipe(args: SwipeGestureEventData) {
    console.log("Swipe Direction: " + args.direction);
}
```
```HTML
<Label text="Swipe here" (swipe)="onSwipe($event)"></Label>
```
{% endangular %}
Possible implementation: Navigate between views in the same hierarchy.

### Pan

**Action: Press your finger down and immediately start moving it around. Pans are executed more slowly and allow for more precision and the screen stops responding as soon as the finger is lifted off it.**

{% nativescript %}
``` TypeScript
import { GestureTypes, PanGestureEventData, Label } from "@nativescript/core";

const label = new Label();
label.on(GestureTypes.pan, function (args: PanGestureEventData) {
    console.log("Pan deltaX:" + args.deltaX + "; deltaY:" + args.deltaY + ";");
});
```
{% endnativescript %}
{% angular %}
```TypeScript
onPan(args: PanGestureEventData) {
    console.log("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);
}
```
```HTML
<Label text="Pan here" (pan)="onPan($event)"></Label>
```
{% endangular %}

### Pinch

**Action: Touch the screen using two of your fingers, then move them towards each other or away from each other.**

{% nativescript %}
``` TypeScript
import { GestureTypes, PinchGestureEventData, Label } from "@nativescript/core";

var label = new Label();
label.on(GestureTypes.pinch, function (args: PinchGestureEventData) {
    console.log("Pinch Scale: " + args.scale);
});
```
{% endnativescript %}
{% angular %}
```TypeScript
onPinch(args: PinchGestureEventData) {
    console.log("Pinch scale: " + args.scale + " state: " + args.state);
}
```
```HTML
<Label text="Pinch here" (pinch)="onPinch($event)"></Label>
```
{% endangular %}
Possible implementation: Zoom into content or out of content.

### Rotation

**Action: Touch the screen using two of your fingers, then rotate them simultaneously left or right.**

{% nativescript %}
``` TypeScript
import { GestureTypes, RotationGestureEventData, Label } from "@nativescript/core";

var label = new Label();
label.on(GestureTypes.rotation, function (args: RotationGestureEventData) {
    console.log("Rotation: " + args.rotation);
});
```
{% endnativescript %}
{% angular %}
```TypeScript
onRotate(args: RotationGestureEventData) {
    console.log("Rotate angle: " + args.rotation + " state: " + args.state);
}
```
```HTML
<Label text="Rotate here" (rotation)="onRotate($event)"></Label>
```
{% endangular %}

### Touch

**Action: A finger action was performed.**

This is a general purpose gesture that is triggered whenever a pointer (usually a finger) has performed a touch action (up, down, move or cancel). `TouchGestureEventData` provides information about all the pointers currently on the screen and their position inside the view that triggered the event.

{% nativescript %}
``` TypeScript
import { GestureTypes, TouchGestureEventData, Label } from "@nativescript/core";

var label = new Label();
label.on(GestureTypes.touch, function (args: TouchGestureEventData) {
    console.log("Touch: x: " + args.getX() + " y: " + args.getY());
});
```
{% endnativescript %}
{% angular %}
```TypeScript
onTouch(args: TouchGestureEventData) {
    console.log(
        "Touch point: [" + args.getX() + ", " + args.getY() +
        "] activePointers: " + args.getActivePointers().length);
}
```
```HTML
<Label text="Touch here" (touch)="onTouch($event)"></Label>
```
{% endangular %}

{% nativescript %}
### Subscribing to Multiple Gestures and Events

Since the release of NativeScript 1.3, when subscribing you can use gestures names, comma separated gestures names and/or even mix with events.

``` TypeScript
import { GestureEventData, Label } from "@nativescript/core";

var label = new Label();
label.on("loaded, tap, doubleTap, longPress", function (args: GestureEventData) {
    console.log("Event: " + args.eventName + ", sender: " + args.object);
});
```
{% endnativescript %}

### Gesture Manipulations

In some scenarios, you would want to disable the user interaction or to create more complex UI where some gestures are passing through the parents of the actual interactive zone. NativeScript provides some specific properties for handling similar cases as follows:

- `isUserInteractionEnabled` - Gets or sets a boolean value indicating whether the user can interact with the view. Does not affect the appearance of the view. The default value is `true`.

- `isEnabled` - Gets or sets a boolean value indicating whether the view is enabled. Affects the appearance of the view. The default value is `true`.

- `isPassThroughParentEnabled` - Gets or sets a value indicating whether touch events should pass through to a parent view of the layout container in case an interactive child view did not handle the event. Does not affect the appearance of the view. The default value is `false`.

> **Note: **: There is a conceptual difference in how `isEnabled` is acting on Android and iOS. On Android, the `isEnabled` set to `false` (e.g., on Button) won't allow any events to pass through even when `isPassThroughParentEnabled` is set to `true` for its parent. On the contrary on iOS, the same setup will pass through the event to the parent.

Playground application demonstrating the usage of the three properties can be found [here](https://play.nativescript.org/?template=play-tsc&id=6c9GA0). 

## Navigation

## Animations

* [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/ui/animation-code.md
* [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/ui/animation-css.md
* [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/ui/animation.md
* [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/ui/animation-examples.md

### Animations with code

The easiest way to animate a **single** [`View`](/api-reference/classes/_ui_core_view_.view.html) is by using the `View.animate` method which accepts an [`AnimationDefinition`](/api-reference/interfaces/_ui_animation_.animationdefinition.html), immediately starts the animation and then returns its finished promise.

__Example 20: How to execute animation on single view.__

``` JavaScript
view.animate({
    translate: { x: 0, y: 100},
    duration: 1000,
    curve: enums.AnimationCurve.easeIn
});
```
``` TypeScript
view.animate({
    translate: { x: 0, y: 100},
    duration: 1000,
    curve: enums.AnimationCurve.easeIn
});
```

> You should create an [`Animation`](/api-reference/classes/_ui_animation_.animation.html) class in order to be able to **cancel** the animation. This is demonstrated below.

### The AnimationDefinition interface

The [`AnimationDefinition`](/api-reference/interfaces/_ui_animation_.animationdefinition.html) interface is central for defining an animation for **one or more properties** of a **single** [`View`](/api-reference/classes/_ui_core_view_.view.html). The animatable properties are:

 - **opacity**
 - **backgroundColor**
 - **translateX** and **translateY**
 - **scaleX** and **scaleY**
 - **rotate**
 - **width** and **height**

The [`AnimationDefinition`](/api-reference/interfaces/_ui_animation_.animationdefinition.html) interface has the following members:

 - **target**: The view whose property is to be animated.
 - **opacity**: Animates the opacity of the view. Value should be a number between 0.0 and 1.0.
 - **backgroundColor**: Animates the backgroundColor of the view.
 - **translate**: Animates the translate affine transform of the view. Value should be a [`Pair`](/api-reference/interfaces/_ui_animation_.pair.html).
 - **scale**: Animates the scale affine transform of the view. Value should be a [`Pair`](/api-reference/interfaces/_ui_animation_.pair.html).
 - **rotate**: Animates the rotate affine transform of the view. Value should be a number specifying the rotation amount in degrees.
 - **duration**: The length of the animation in milliseconds. The default duration is 300 milliseconds.
 - **delay**: The amount of time, in milliseconds, to delay starting the animation.
 - **iterations**: Specifies how many times the animation should be played. Default is 1. iOS animations support fractional iterations, i.e., 1.5. To repeat an animation infinitely, use `Number.POSITIVE_INFINITY`.
 - **curve**: An optional animation curve. Possible values are contained in the [AnimationCurve enumeration](/api-reference/modules/_ui_enums_.animationcurve.html). Alternatively, you can pass an instance of type [`UIViewAnimationCurve`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIView_Class/#//apple_ref/c/tdef/UIViewAnimationCurve) for iOS or [`android.animation.TimeInterpolator`](http://developer.android.com/reference/android/animation/TimeInterpolator.html) for Android.
 - **width**: Animates view's width.
 - **height**: Animates view's height.

 All members of the interface are **optional** and have default values with the following exceptions:

 - target is only optional when calling the `animate` method of a [`View`](/api-reference/classes/_ui_core_view_.view.html) instance since it is set automatically for you.
 - You must specify at least one property from this list: opacity, backgroundColor, scale, rotate or translate.

### The Animation class

The [`Animation`](/api-reference/classes/_ui_animation_.animation.html) class represents a **set** of one or more [`AnimationDefinitions`](/api-reference/interfaces/_ui_animation_.animationdefinition.html) that can be played either **simultaneously or sequentially**. **This class is typically used when you need to animate several views together**. The constructor of the  [`Animation`](/api-reference/classes/_ui_animation_.animation.html) class accepts an array of [`AnimationDefinitions`](/api-reference/interfaces/_ui_animation_.animationdefinition.html) and a boolean parameter indicating whether to play the animations sequentially. Creating an instance of the [`Animation`](/api-reference/classes/_ui_animation_.animation.html) class does not start the animation playback. The class has four members:

 - **play**: A method that starts the animation and returns the instance it was called on for fluent animation chaining.
 - **cancel**: A void method that stops the animation.
 - **finished**: A promise that will be resolved when the animation finishes or rejected when the animation is cancelled or stops for another reason.
 - **isPlaying**: A boolean property returning __True__ if the animation is currently playing.

### Animating multiple properties

It is easy to animate multiple properties at once; just pass the desired animatable properties and the corresponding values when calling the animate function.

__Example 21: How to animate multiple properties.__

``` JavaScript
view.animate({
    backgroundColor: new color.Color("#3D5AFE"),
    opacity: 0.5,
    translate: { x: 100, y: 100 },
    rotate: 180,
    duration: 3000
});
```
``` TypeScript
view.animate({
    backgroundColor: new color.Color("#3D5AFE"),
    opacity: 0.5,
    translate: {x: 100, y: 100},
    rotate: 180,
    duration: 3000
});
```

![multiple-properties](/assets/images/modules/animation/multiple-properties.gif "Multiple Properties")

### Chaining animations with promises

The animate method returns a promise that you can use to chain animations, as shown in __Example 21__.

__Example 22: How to create chain animations.__

``` JavaScript
view.animate({ opacity: 0 })
    .then(function () { return view.animate({ opacity: 1 }); })
    .then(function () { return view.animate({ translate: { x: 100, y: 100 } }); })
    .then(function () { return view.animate({ translate: { x: 0, y: 0 } }); })
    .then(function () { return view.animate({ scale: { x: 3, y: 3 } }); })
    .then(function () { return view.animate({ scale: { x: 1, y: 1 } }); })
    .then(function () { return view.animate({ rotate: 180 }); })
    .then(function () { return view.animate({ rotate: 0 }); })
    .then(function () {
    console.log("Animation finished");
})
    .catch(function (e) {
    console.log(e.message);
});
```
``` TypeScript
view.animate({ opacity: 0 })
    .then(() => view.animate({ opacity: 1 }))
    .then(() => view.animate({ translate: { x: 100, y: 100 } }))
    .then(() => view.animate({ translate: { x: 0, y: 0 } }))
    .then(() => view.animate({ scale: { x: 3, y: 3 } }))
    .then(() => view.animate({ scale: { x: 1, y: 1 } }))
    .then(() => view.animate({ rotate: 180 }))
    .then(() => view.animate({ rotate: 0 }))
    .then(() => {
    console.log("Animation finished");
  })
    .catch((e) => {
    console.log(e.message);
  });
```

![chaining-with-promises](/assets/images/modules/animation/chaining-with-promises.gif "Chaining with Promises")

### CSS Animations

CSS animations are based on the simple and easy to use standard [CSS3 animations API](http://www.w3schools.com/css/css3_animations.asp). You can use them to animate almost every native view without even having to know JavaScript. You have the potential to alter the appearance and behavior of an element whenever a state change occurs, such as when it is touched or activated. You can use multiple frames and change the animation direction. Finally, with CSS animations, you can separate the animation code from your application logic.

CSS animations consist of two components: a style describing the CSS animation and a set of keyframes that indicate the start and end states of the animation's style, as well as possible intermediate waypoints. You can change as many animatable CSS properties you want, as many times you want.

__Example 1__ binds the "example" animation to the button element. The animation lasts 4 seconds. It will gradually change the background-color of the button element from "red" to "green".

__Example 1: How to create simple animation using CSS.__

``` CSS
@keyframes example {
    from { background-color: red; }
    to { background-color: green; }
}

.view {
    animation-name: example;
    animation-duration: 4s;
	animation-fill-mode: forwards;
}
```

To get an animation to work, you must bind the animation to an element:

``` JavaScript
view1.className = "example";
```
``` TypeScript
view1.className = "example";
```
``` XML
<Button id="myButton" text="{N}" class="example"/>
```

> If the **animation-duration** property is not specified, the animation will use a default value - 0.3 seconds.

### Animatable properties

CSS animations support the same animatable properties used in code-based animations: 

- **opacity**
- **background-color**: Corresponds with the backgroundColor.
- **transform: translate**: Corresponds with translateX and translateY properties. 
- **transform: scale**: Corresponds with scaleX and scaleY properties.
- **transform: rotate**: Corresponds with the rotate property.

> You cannot set a single x or y field in scale and translate. If you set only x in translate, y will be assumed 0; If you set only y in scale, x will be assumed 1.

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

To set multiple points at which an element should undergo a transition, use the **@keyframes** rule, shown in __Example 2__. It includes the animation name, any animation breakpoints, and the properties intended to be animated. 

__Example 2: How to use **@keyframes** rule.__

``` CSS
@keyframes example {
    from { background-color: red; }
    to { background-color: green; }
}
```

__Example 2__ defines an animation with two keyframes. The "from" represents 0% (the start of the animation) and "to" represents 100% (the final value). You can add more keyframes by using percent.

__Example 3__ shows how to change the background color when the animation is 25% complete, 50% complete, and again when the animation is 100% complete.

__Example 3: Changing background color in different animation stages.__

``` CSS
@keyframes example {
    0%   { background-color: red; }
    25%  { background-color: yellow; }
    50%  { background-color: blue; }
    100% { background-color: green; }
}
```

You can set multiple properties in a keyframe, as shown in __Example 4__.

__Example 4: Changing multiple properties in different animation stages.__

``` CSS
@keyframes example {
    0%   { background-color: red; transform: translate(0, 0); }
    25%  { background-color: yellow; transform: translate(200, 0); }
    50%  { background-color: blue; transform: translate(200, 200);  }
    75%  { background-color: green; transform: translate(0, 200); }
    100% { background-color: red; transform: translate(0, 0); }
}
```

You can combine keyframes, as shown in __Example 5__.

__Example 5: Set up properties for several keyframes__

``` CSS
@keyframes example {
    0%, 50% { background-color: red; transform: translate(0, 0); }
    25%, 75% { background-color: yellow; transform: translate(200, 0); }
    100% { background-color: red; transform: translate(0, 0); }
}
```

### Delay an animation

The **animation-delay** property specifies a delay (in seconds) before the animation starts:

__Example 6: Set up a delay before the animation starts__

``` CSS
.view {
	background-color: red;
    animation-name: example;
    animation-duration: 4s;
    animation-delay: 2s;
}
```

### Set how many times an animation should run

The **animation-iteration-count** property defines the number of times an animation should run. The animation in __Example 7__ will play two times before it stops.

__Example 7: How to use `animation-iteration-count` property__

``` CSS
.view {
	background-color: red;
   animation-name: example;
   animation-duration: 4s;
   animation-iteration-count: 2;
}
```

If you want to play an animation forever, set this property to "infinite".

``` CSS
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
- **cubic-bezier(n,n,n,n)**: Lets you define your own values in a cubic-bezier function, as shown in __Example 8__.

__Example 8: How to specify the speed curve using cubic-bezier function.__

``` CSS
.view {
	animation-name: example;
   animation-timing-function: cubic-bezier(0.1, 0.1, 1.0, 1.0);
}
```

### Determine the result when the animation ends

The **animation-fill-mode** property determines the element style when the animation finishes. Its default value is "none". In this case, all animated values will be reset to the state before the animation started. You should choose "forwards" in order to preserve the property values set during the animation.

__Example 9: How to use **animation-fill-mode** property__

``` CSS
.view {
	background-color: red;
    animation-name: example;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}
```

### Animation direction

You can use the **animation-direction** property to play a CSS animation in reverse direction, as shown in __Example 10__.

__Example 10: How to reverse animation direction.__

``` CSS
.view {
	background-color: red;
    animation-name: example;
    animation-duration: 4s;
    animation-direction: reverse;
}
```

### Animation shorthand

The **animation** property allows setting all seven animation properties with a single line:

__Example 11: How to use animation shorthand property__

``` CSS
.view {
    animation: example 4s ease-in-out 2s infinite reverse forwards;
}
```

The supported syntax is:

animation: name duration timing-function delay iteration-count direction fill-mode;

You can combine two animations in the **animation** property by using commas:

__Example 12: How to combine several animations in the **animation** property__

``` CSS
.view {
    animation: example 4s ease-in-out 2s infinite reverse, second-animation-example 5s ease-out;
}
```

### Pseudo selectors

A pseudo selector is used to define a special state of an element. For example, when a button is touched by the user. You can use pseudo selectors to trigger animations:

__Example 13: How to trigger animation on element special state__

``` CSS
.button {
    background-color: green;
}

.button:highlighted {
    animation-name: highlight;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}

@keyframes highlight {
    from { background-color: yellow; }
    to { background-color: red; }
}
```

> As of version 2.0, only the **Button** component has a built-in special state "highlighted" to indicate that it is touched by the user.

### Animations - width and height

__Example 14: How to animate view's width and height.__
{% nativescript %}
```XML
<GridLayout rows="* *" columns="*" class="home-panel">
        <StackLayout row="0">
            <Label text="{N}" class="big-label first-view" textWrap="true" />
        </StackLayout>
        <StackLayout row="1">
            <Label text="{N}" class="big-label second-view" textWrap="true" />
        </StackLayout>
</GridLayout>
```
```CSS
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
    from { width:140; }
    to { width:200; }
}

@keyframes example-height {
    from { height:140; }
    to { height:200; }
}
```
[Demo](https://play.nativescript.org/?template=play-js&id=xe3lMf)
{% endnativescript %}
{% angular %}
```HTML
<GridLayout rows="* *" columns="*" class="home-panel">
    <StackLayout row="0">
        <Label text="{N}" class="big-label first-view" textWrap="true" ></Label>
    </StackLayout>
    <StackLayout row="1">
        <Label text="{N}" class="big-label second-view" textWrap="true" ></Label>
    </StackLayout>
</GridLayout>
```
```CSS
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
    from { width:140; }
    to { width:200; }
}

@keyframes example-height {
    from { height:140; }
    to { height:200; }
}
```
[Demo](https://play.nativescript.org/?template=play-ng&id=NMM4I5)
{% endangular %}

### Access CSS animations from code

The simplest way to trigger a CSS animation is by changing the element **className** property:

__Example 15: How to trigger CSS animation__

```JavaScript
var view = page.getViewById("view");
view.className = "transparent";
```
```TypeScript
let view = page.getViewById<viewModule.View>("view");
view.className = "transparent";
```

All keyframes defined in CSS can be accessed with code by using the **getKeyframeAnimationWithName** method. This allows further customization of animation properties:


__Example 16: Accessing CSS defined keyframe in the code via **getKeyframeAnimationWithName** method__

``` JavaScript
import { KeyframeAnimation } from "@nativescript/core";

var view = page.getViewById("view");
var animationInfo = page.getKeyframeAnimationWithName("bounce");
animationInfo.duration = 2000;
var animation = KeyframeAnimation.keyframeAnimationFromInfo(animationInfo);
animation.play(view).then(() => {
    console.log("Played with code!");
});
```
``` TypeScript
import { KeyframeAnimation, View } from "@nativescript/core";

let view = page.getViewById<View>("view");
let animationInfo = page.getKeyframeAnimationWithName("bounce");
animationInfo.duration = 2000;
let animation = KeyframeAnimation.keyframeAnimationFromInfo(animationInfo);
animation.play(view).then(() => {
    console.log("Played with code!");
});
```

### Animations

One of the ways to improve the attractiveness of your application is by adding animations. NativeScript exposes a simple and easy, but powerful enough API to allow animating almost every native element in your application.

For your convenience, we expose two ways of creating animations:

- [Declarative](./animation-css.md) - you will use the easy and familiar CSS3 animations API
- [Imperative](./animation-code.md) - take full control of any animation by calling animation methods directly with code

[Here](./animation-examples.md) you will find a detailed set of examples demonstrating the different animations that can be achieved with NativeScript.

##Hello world example

In __Example 1__ we will change the background color of a button from "red" to "green". You can use JavaScript or TypeScript code to do the following:

__Example 1: Changing background color animation with code.__

![hello-world](/assets/images/modules/animation/hello-world.gif "Hello world")

``` JavaScript
// Import color module
import { Color } from "@nativescript/core";

view.backgroundColor = new Color("red");
view.animate({ backgroundColor: new Color("green"), duration: 2000 });
```
``` TypeScript
// Import color module
import { Color } from "@nativescript/core";

view.backgroundColor = new Color("red");
view.animate({ backgroundColor: new Color("green"), duration: 2000 });
```

[Try this animation in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=h6g8J8)

As _Example 2_ shows, you can express the same animation in CSS with the following definition:

__Example 2: Changing background color animation with CSS.__

``` CSS
@keyframes example {
    from { background-color: red; }
    to { background-color: green; }
}
.view {
    animation-name: example;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}
```
``` XML
<!-- Apply CSS class to element to trigger CSS animation -->
<Label class="view" text="{N}"></Label>
```

> CSS animations apply with lower precedence, like any other CSS settings, so any local values set in your element will cancel the animation.

[Try this animation in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=tQRe9Q)

NativeScript lets you animate the following properties:

- **opacity**
- **backgroundColor**
- **translate**
- **scale**
- **rotate**

> To use `translate` or `scale` you must preceed with an object declaring both x and y values, for example `translate: { x: 100, y: 250 }` or `scale: { x: 1.5, y: 0 }`.

In every animation, you can control the following properties:

- **duration**: The length of the animation.
- **delay**: The amount of time to delay starting the animation.
- **iterations**: Specifies how many times the animation should be played.
- **timing function**: The speed curve of the animation. Available options are defined below.
- **originX** and **originY**: The X and Y components of the origin point around which the view will be transformed.

### Animation curves

By default, an animation moves with a linear speed without acceleration or deceleration. This might look unnatural and different from the real world where objects need time to reach their top speed and can't stop immediately. The animation curve (sometimes called an easing function) is used to give animations an illusion of inertia. It controls the animation speed by modifying the fraction of the duration. NativeScript comes with a number of predefined animation curves.

- **linear**: The simplest animation curve is linear. It maintains a constant speed while the animation is running:

![linear](/assets/images/modules/animation/linear.gif "Linear")

- **Ease-in**: The ease-in curve causes the animation to begin slowly, and then speed up as it progresses.

![easein](/assets/images/modules/animation/easein.gif "EaseIn")

- **Ease-out**: An ease-out curve causes the animation to begin quickly, and then slow down as it completes.

![easeout](/assets/images/modules/animation/easeout.gif "EaseOut")

- **Ease-in-out**: An ease-in ease-out curve causes the animation to begin slowly, accelerate through the middle of its duration, and then slow again before completing.

![easeinout](/assets/images/modules/animation/easeinout.gif "EaseInOut")

- **Spring**: A spring animation curve causes an animation to produce a spring (bounce) effect.

![spring](/assets/images/modules/animation/spring.gif "Spring")

In NativeScript, the animation curve is represented by the AnimationCurve enumeration and can be specified with the curve property of the animation. In CSS, the animation curve is defined by using the animation-timing-function property (see __Example 3__):

__Example 3: How to customize the animation timing function__

``` JavaScript
import { Enums } from "@nativescript/core";
view.animate({
	translate: { x: 0, y: 100},
	duration: 1000,
	curve: Enums.AnimationCurve.easeIn
});
```
``` TypeScript
import { Enums } from "@nativescript/core";
view.animate({
	translate: { x: 0, y: 100},
	duration: 1000,
	curve: Enums.AnimationCurve.easeIn
});
```
``` CSS
.view {
	animation-name: example;
	animation-duration: 1;
	animation-timing-function: ease-in;
   animation-fill-mode: forwards;
}
@keyframes example {
	from { transform: translate(0, 0); }
	to { transform: translate(0, 100); }
}
```

[Experiment with the different animation timing functions in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=zt5sXZ)

It is easy to create your own animation curve by passing in the X and Y components of two control points of a cubic Bezier curve (as shown in __Example 4__). Using Bezier curves is a common technique to create smooth curves in computer graphics and they are widely used in vector-based drawing tools. The values passed to the cubicBezier method control the curve shape. The animation speed will be adjusted based on the resulting path.

For help finding the `cubicBezier` values you need for your custom animation timing function, use the visual tools on [cubic-bezier.com](http://cubic-bezier.com). Once you find an animation path you like, simply copy and paste the cubic bezier values and paste them in the `AnimationCurve.cubicBezier` function. There should be four numbers (X,Y coordinates for each of the two points in the animation).

__Example 4: How to create own animation curve via cubic Bezier__

![beziergraph](/assets/images/modules/animation/bezier-graph.png "BezierGraph")

``` JavaScript
import { Enums } from "@nativescript/core";

view.animate({
    translate: { x: 0, y: 100 },
    duration: 1000,
    curve: Enums.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
});
```
``` TypeScript
import { Enums } from "@nativescript/core";
view.animate({
    translate: { x: 0, y: 100 },
    duration: 1000,
    curve: Enums.AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
});
```
``` CSS
.view {
	animation-name: example;
	animation-duration: 1;
	animation-timing-function: cubicBezier(0.1, 0.1, 0.1, 1);
	animation-fill-mode: forwards;
}
```

![bezier](/assets/images/modules/animation/bezier.gif "Bezier")

More detailed examples are available on the [Animation Examples](./animation-examples.md) page.

### Rotation using originX and originY

To create more complex animations, we might need to change the origin point around which the selected view will be transformed. This can be achieved using [`originX`](/api-reference/classes/_ui_core_view_.view#originx) and [`originY`](/api-reference/classes/_ui_core_view_.view#originy) properties of `View`.

__Example 5: Rotating a view around its center. Center of view is changed via `originX` and `originY` properties.__

``` JavaScript
view.originX = 1; // default 0.5 (center), 0 is most left, 1 is most right
view.originY = 0.5; // default 0.5 (middle), 0 is top, 1 is bottom
view.animate({
	rotate: 360, // will take into account originX and originY
    duration: 1000
});
```
``` TypeScript
view.originX = 1; // default 0.5 (center), 0 is most left, 1 is most right
view.originY = 0.5; // default 0.5 (middle), 0 is top, 1 is bottom
view.animate({
	rotate: 360, // will take into account originX and originY
    duration: 1000
});
```

> Note: The properties `originX` and `originY` are JavaScript properties and can be assigned via code-behind only via a given `View` reference. We can still use them along with CSS animations, but the values for `originX` and `originY` must be set in the code-behind logic.

### Limitations

- `Span` and `FormattedString` can not be animated. `Span` and `FormattedString` elements are not extending the [`View`](https://docs.nativescript.org/api-reference/classes/__nativescript_core_.view) class, but only [`ViewBase`](https://docs.nativescript.org/api-reference/classes/__nativescript_core_.viewbase). Because of this, neither `Span` nor `FormattedString` are ui elements, making it impossible to animate them and causing a crash on iOS.

### Animation examples

This article contains examples demonstrating how to animate the animatable view properties. A full list of all animatable properties and a detailed explanation of the animations API is presented [here](./animation.md).

The full source code for all samples is located [here](https://github.com/NativeScript/animation-demo).

### Animated opacity

![opacity](/assets/images/modules/animation/opacity.gif "Opacity")

``` JavaScript
view.animate({
    opacity: 0,
    duration: 3000
});
```
``` TypeScript
view.animate({
    opacity: 0,
    duration: 3000
});
```
``` CSS
.view {
	animation-name: opacity;
	animation-duration: 3;
}
@keyframes opacity {
	from { opacity: 1; }
	to { opacity: 0; }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=q9nY9l)

### Animate background color

![background-color](/assets/images/modules/animation/background-color.gif "Background Color")

``` JavaScript
view.animate({
    backgroundColor: new colorModule.Color("#3D5AFE"),
    duration: 3000
});
```
``` TypeScript
view.animate({
    backgroundColor: new colorModule.Color("#3D5AFE"),
    duration: 3000
});
```
``` CSS
.view {
	animation-name: backgroundColor;
	animation-duration: 3;
}
@keyframes backgroundColor {
	from { background-color: white; }
	to { background-color: #3D5AFE; }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=aLjBQg)

### Animate position

![translate](/assets/images/modules/animation/translate.gif "Translate")

``` JavaScript
view.animate({
    translate: { x: 100, y: 100},
    duration: 3000
});
```
``` TypeScript
view.animate({
    translate: { x: 100, y: 100},
    duration: 3000
});
```
``` CSS
.view {
	animation-name: translate;
	animation-duration: 3;
}
@keyframes translate {
	from { transform: translate(0, 0); }
	to { transform: translate(100, 100); }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=egSanf)

### Animate scale

![scale](/assets/images/modules/animation/scale.gif "Scale")

``` JavaScript
view.animate({
    scale: { x: 2, y: 2},
    duration: 3000
});
```
``` TypeScript
view.animate({
    scale: { x: 2, y: 2},
    duration: 3000
});
```
``` CSS
.view {
	animation-name: scale;
	animation-duration: 3;
}
@keyframes scale {
	from { transform: scale(1, 1); }
	to { transform: scale(2, 2); }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=4Ni5sU)

### Animate rotate

![rotate](/assets/images/modules/animation/rotate.gif "Rotate")

``` JavaScript
view.animate({
    rotate: 360,
    duration: 3000
});
```
``` TypeScript
view.animate({
    rotate: 360,
    duration: 3000
});
```
``` CSS
.view {
	animation-name: rotate;
	animation-duration: 3;
}
@keyframes rotate {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=2vpfgV)

### Chaining animations with AnimationSet

![chaining-with-animation-set](/assets/images/modules/animation/chaining-with-animation-set.gif "Chaining with Animation Set")

``` JavaScript
var definitions = new Array();
definitions.push({ target: view1, translate: { x: 200, y: 0 }, duration: 3000 });
definitions.push({ target: view2, translate: { x: 0, y: 200 }, duration: 3000 });
definitions.push({ target: view3, translate: { x: -200, y: 0 }, duration: 3000 });
definitions.push({ target: view4, translate: { x: 0, y: -200 }, duration: 3000 });
var playSequentially = true;
var animationSet = new animationModule.Animation(definitions, playSequentially);
animationSet.play().then(function () {
    console.log("Animation finished");
})
    .catch(function (e) {
    console.log(e.message);
});
```
``` TypeScript
var definitions = new Array<animationModule.AnimationDefinition>();
definitions.push({target: view1, translate: {x: 200, y: 0}, duration: 3000 });
definitions.push({target: view2, translate: {x: 0, y: 200}, duration: 3000 });
definitions.push({target: view3, translate: {x: -200, y: 0}, duration: 3000 });
definitions.push({target: view4, translate: {x: 0, y: -200}, duration: 3000 });
var playSequentially = true;
var animationSet = new animationModule.Animation(definitions, playSequentially);
animationSet.play().then(() => {
    console.log("Animation finished");
})
.catch((e) => {
    console.log(e.message);
});
```

### Animating multiple views

![multiple-views](/assets/images/modules/animation/multiple-views.gif "Multiple Views")

``` JavaScript
var definitions = new Array();
var a1 = {
    target: view1,
    translate: { x: 200, y: 0 },
    duration: 3000
};
definitions.push(a1);
var a2 = {
    target: view2,
    translate: { x: 0, y: 200 },
    duration: 3000
};
definitions.push(a2);
var a3 = {
    target: view3,
    translate: { x: -200, y: 0 },
    duration: 3000
};
definitions.push(a3);
var a4 = {
    target: view4,
    translate: { x: 0, y: -200 },
    duration: 3000
};
definitions.push(a4);
var animationSet = new animationModule.Animation(definitions);
animationSet.play().then(function () {
    console.log("Animation finished");
})
    .catch(function (e) {
    console.log(e.message);
});
```
``` TypeScript
var definitions = new Array<animationModule.AnimationDefinition>();
var a1: animationModule.AnimationDefinition = {
    target: view1,
    translate: {x: 200, y: 0},
    duration: 3000
};
definitions.push(a1);

var a2: animationModule.AnimationDefinition = {
    target: view2,
    translate: {x: 0, y: 200},
    duration: 3000
};
definitions.push(a2);

var a3: animationModule.AnimationDefinition = {
    target: view3,
    translate: {x: -200, y: 0},
    duration: 3000
};
definitions.push(a3);

var a4: animationModule.AnimationDefinition = {
    target: view4,
    translate: {x: 0, y: -200},
    duration: 3000
};
definitions.push(a4);

var animationSet = new animationModule.Animation(definitions);

animationSet.play().then(() => {
    console.log("Animation finished");
})
.catch((e) => {
    console.log(e.message);
});
```

[Try this in the NativeScript Playground](https://play.nativescript.org/?template=play-tsc&id=rgm744)

### Reusing animations

![reusing](/assets/images/modules/animation/reusing.gif "Reusing Animations")

``` JavaScript
var animation1 = view.createAnimation({ opacity: 0 });
var animation2 = view.createAnimation({ opacity: 1 });
animation1.play()
    .then(function () { return animation2.play(); })
    .then(function () { return animation1.play(); })
    .then(function () { return animation2.play(); })
    .then(function () { return animation1.play(); })
    .then(function () { return animation2.play(); })
    .then(function () {
    console.log("Animation finished");
})
    .catch(function (e) {
    console.log(e.message);
});
```
``` TypeScript
var animation1 = view.createAnimation({opacity: 0});
var animation2 = view.createAnimation({opacity: 1});

animation1.play()
.then(()=>animation2.play())
.then(()=>animation1.play())
.then(()=>animation2.play())
.then(()=>animation1.play())
.then(()=>animation2.play())
.then(() => {
    console.log("Animation finished");
})
.catch((e) => {
    console.log(e.message);
});
```

### Slide-in effect

![slide-in-effect](/assets/images/modules/animation/slide-in-effect.gif "Slide-in Effect")

``` JavaScript
var item = new imageModule.Image();
item.src = "~/res/icon_100x100.png";
item.width = 90;
item.height = 90;
item.style.margin = "5,5,5,5";
item.translateX = -300;
item.opacity = 0;
item.on("loaded", function (args) {
    args.object.animate({ translate: { x: 0, y: 0 }, opacity: 1 });
});
wrapLayout.addChild(item);
```
``` TypeScript
var item = new imageModule.Image();
item.src = "~/res/icon_100x100.png";
item.width = 90;
item.height = 90;
item.style.margin = "5,5,5,5";
item.translateX = -300;
item.opacity = 0;
item.on("loaded", (args: observable.EventData) => {
    (<viewModule.View>args.object).animate({translate: { x: 0, y: 0 }, opacity: 1});
});
wrapLayout.addChild(item);
```

### Infinite animations

![infinite](/assets/images/modules/animation/infinite.gif "Infinite")

``` JavaScript
animationSet = new animationModule.Animation([{
        target: view,
        rotate: 360,
        duration: 3000,
        iterations: Number.POSITIVE_INFINITY,
        curve: view.ios ? UIViewAnimationCurve.UIViewAnimationCurveLinear : new android.view.animation.LinearInterpolator
    }]);
animationSet.play().catch(function (e) {
    console.log("Animation stopped!");
});
// Call animationSet.cancel() to stop it;
```
``` TypeScript
animationSet = new animationModule.Animation([{
    target: view,
    rotate: 360,
    duration: 3000,
    iterations: Number.POSITIVE_INFINITY,
    curve: view.ios ? UIViewAnimationCurve.UIViewAnimationCurveLinear : new android.view.animation.LinearInterpolator
}]);
animationSet.play().catch((e) => {
    console.log("Animation stopped!");
});
// Call animationSet.cancel() to stop it;
```

### Rotation using originX and originY
__Example 5: Rotating a view around its center. Center of view is changed via `originX` and `originY` properties.__

![rotation_origin_x_y](/assets/images/modules/animation/rotation_origin_x_y.gif "Rotation originX / originY")

``` JavaScript
const view = page.getViewById("myView");

view.originX = 1; // default 0.5 (center), 0 is most left, 1 is most right
view.originY = 0; // default 0.5 (middle), 0 is top, 1 is bottom
view.animate({
	rotate: 360, // will take into account originX and originY
    duration: 1000
}).then(() => {
    view.originX = 0;
    view.originY = 1;
    view.rotate = 0;

    view.animate({
        rotate: -360,
        duration: 1000
    })
})
```
``` TypeScript
const view = page.getViewById("myView");

view.originX = 1; // default 0.5 (center), 0 is most left, 1 is most right
view.originY = 0; // default 0.5 (middle), 0 is top, 1 is bottom
view.animate({
	rotate: 360, // will take into account originX and originY
    duration: 1000
}).then(() => {
    view.originX = 0;
    view.originY = 1;
    view.rotate = 0;

    view.animate({
        rotate: -360,
        duration: 1000
    })
})
```

### Animation -  View's Width and Height
{% nativescript %}
### Width
```JavaScript
let label = page.getViewById("lblNS");
let animation = new Animation([
    {
      width: 200,
      duration: 2000,
      target: label,
      delay: 200
    }

  ]);
animation.play();
```
```TypeScript
let label: Label = <Label>page.getViewById("lblNS");
let animation = new Animation([
        {
            width: 200,
            duration: 2000,
            target: label,
            delay: 200
        }

    ]);
animation.play();
```
### Height
```JavaScript
let label = page.getViewById("lblNS");
let animation = new Animation([
    {
      height: 200,
      duration: 2000,
      target: label,
      delay: 200
    }

  ]);
animation.play();
```
```TypeScript
let label: Label = <Label>page.getViewById("lblNS");
let animation = new Animation([
        {
            height: 200,
            duration: 2000,
            target: label,
            delay: 200
        }

    ]);
animation.play();
```
[Demo JavaScript](https://play.nativescript.org/?template=play-js&id=mOZv68)
[Demo TypeScript](https://play.nativescript.org/?template=play-tsc&id=ckdYDS)
{% endnativescript %}
{% angular %}
### Width
```TypeScript
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
```TypeScript
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
{% endangular %}

## Accessibility