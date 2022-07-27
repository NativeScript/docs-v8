---
title: Marshalling
---

# Marshalling

### iOS Marshalling

NativeScript for iOS handles the conversion between JavaScript and Objective-C data types implicitly. However, the rules that govern this conversion need to take into account the differences between JavaScript and Objective-C. NativeScript tries to translate idioms between languages, but there are quirks and features in both that are hard to reconcile. The following is a thorough but not exhaustive list of rules and exceptions NativeScript abides by when exposing Objective-C APIs in JavaScript.

#### Objective-C Classes and Objects

The most common data type in Objective-C by far is the class. Classes can have instance or static methods, and properties which are always instance. NativeScript exposes an Objective-C class and its members as a JavaScript constructor function with an associated prototype according to the [prototypal inheritance model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain). This means that each static method on an Objective-C class becomes a function on its JavaScript constructor function, each instance method becomes a function on the JavaScript prototype, and each property becomes a property descriptor on the same prototype. Every JavaScript constructor function created to expose an Objective-C class is arranged in a prototype chain that mirrors the class hierarchy in Objective-C: if `NSMutableArray` extends `NSArray`, which in turn extends `NSObject` in Objective-C, then in JavaScript the prototype of the `NSObject` constructor function is the prototype of `NSArray`, which in turn is the prototype of `NSMutableArray`.

To illustrate:

```objc
@interface NSArray : NSObject

+ (instancetype)arrayWithArray:(NSArray *)anArray;

- (id)objectAtIndex:(NSUInteger)index;

@property (readonly) NSUInteger count;

@end
```

```js
var NSArray = {
  __proto__: NSObject,

  arrayWithArray: function () {
    [native code]
  }
}

NSArray.prototype = {
  __proto__: NSObject.prototype,

  constructor: NSArray,

  objectAtIndex: function () {
    [native code]
  },

  get count() {
    [native code]
  }
}
```

Instances of Objective-C classes exist in JavaScript as special "wrapper" exotic objects - they keep track of and reference native objects, as well as manage their memory. When a native API returns an Objective-C object, NativeScript constructs such a wrapper for it in case one doesn't already exist. Wrappers have a prototype just like regular JavaScript objects. This prototype is the same as the prototype of the JavaScript constructor function that exposes the class the native object is an instance of. In essence:

```js
const tableViewController = new UITableViewController() // returns a wrapper around a UITableViewController instance
Object.getPrototypeOf(tableViewController) === UITableViewController.prototype // returns true
```

There is only one JavaScript wrapper around an Objective-C object, always. This means that Objective-C wrappers maintain JavaScript identity equality:

```js
tableViewController.tableView === tableViewController.tableView
```

Calling native APIs that expect Objective-C classes or objects is easy - just pass the JavaScript constructor function for the class, or the wrapper for the object.

If an API is declared as accepting a `Class` in Objective-C, the argument in JavaScript is the constructor function:

```objc
NSString *className = NSStringFromClass([NSArray class]);
```

```js
const className = NSStringFromClass(NSArray)
```

Conversely, if an API is declared as accepting an instance of a specific class such as `NSDate`, the argument is a wrapper around an object inheriting from that class.

```objc
NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
NSDate *date = [NSDate date];
NSString *formattedDate = [formatter stringFromDate:date];
```

```js
const formatter = new NSDateFormatter()
const date = NSDate.date()
const formattedDate = formatter.stringFromDate(date)
```

An API expecting the `id` data type in Objective-C means it will any accept Objective-C class or object in JavaScript.

```objc
NSMutableArray *array = [[NSMutableArray alloc] init];
Class buttonClass = [UIButton class];
UIButton *button = [[buttonClass alloc] init];
[array setObject:buttonClass atIndex:0];
[array setObject:button atIndex:1];
```

```js
const array = new NSMutableArray()
const buttonClass = UIButton
const button = new buttonClass()
array.setObjectAtIndex(buttonClass, 0)
array.setObjectAtIndex(button, 1)
```

#### Converting JavaScript array to CGFloat array

In the below-given code sample, you can see, how to convert a JavaScript array to a `CGFloat` array.
In the tabs, you will find the Objective-C code for a function accepting a `CGFloat` array as an argument and the JavaScript code for calling this native function.

```js
const CGFloatArray = interop.sizeof(interop.types.id) == 4 ? Float32Array : Float64Array
const jsArray = [4.5, 0, 1e-5, -1242e10, -4.5, 34, -34, -1e-6]

FloatArraySample.dumpFloats(CGFloatArray.from(jsArray), jsArray.length)
```

```objc
@interface FloatArraySample
+ (void)dumpFloats:(CGFloat*) arr withCount:(int)cnt;
@end

@implementation TNSBaseInterface

+ (void)dumpFloats:(CGFloat*) arr withCount:(int)cnt {
    for(int i = 0; i < cnt; i++) {
      NSLog(@"arr[%d] = %f", i, arr[i]);
    }
}
@end
```

::: warning Note
Keep in mind that `CGFloat` is architecture dependent. On 32-bit devices, we need to use `Float32Array` and `Float64Array` -- on 64-bit ones. A straightforward way to verify the device/emulator architecture is to check the pointer size via `interop.sizeof(interop.types.id)`. The return value for the pointer size will be 4 bytes for 32-bit architectures and 8 bytes - for 64-bit ones. For further info, check out [CGFloat's documentation](https://developer.apple.com/documentation/coregraphics/cgfloat).
:::

#### Primitive Exceptions

NativeScript considers instances of `NSNull`, `NSNumber`, `NSString` and `NSDate` to be "primitives". This means that instances of these classes won't be exposed in JavaScript via a wrapper exotic object, instead they will be converted to the equivalent JavaScript data type: `NSNull` becomes `null`, `NSNumber` becomes `number` or `boolean`, `NSString` becomes `string` and `NSDate` becomes `Date`. The exception to this are the methods on those classes declared as returning `instancetype` - init methods and factory methods. This means that a call to `NSString.stringWithString` whose return type in Objective-C is `instancetype` will return a wrapper around an `NSString` instance, rather than a JavaScript string. This applies for all methods on `NSNull`, `NSNumber`, `NSString` and `NSDate` returning `instancetype`.

On the other hand, any API that expects a `NSNull`, `NSNumber`, `NSString` or `NSDate` instance in Objective-C can be called either with a wrapper object or a JavaScript value - `null`, `number` or `boolean`, `string` or `Date`, in JavaScript. The conversion is automatically handled by NativeScript.

More information on how NativeScript deals with Objective-C classes is available [here](/advanced-concepts.html#objective-c-classes-and-objects).

#### Objective-C Protocols

Protocols in Objective-C are like interfaces in other languages - they are blueprints of what members a class should contain, a sort of an API contract. Protocols are exposed as empty objects in JavaScript. Protocols are usually only referenced when [subclassing](#ObjC-Subclassing) an Objective-C class or when checking whether an object or class conforms to a protocol.

<!-- TODO: fix links -->

```objc
BOOL isCopying = [NSArray conformsToProtocol:@protocol(NSCopying)];
```

```js
const isCopying = NSArray.conformsToProtocol(NSCopying)
```

#### Objective-C Selectors

In Objective-C `SEL` is a data type that represents the name of a method of an Objective-C class. NativeScript exposes this data type as a JavaScript string. Whenever an API expects a selector value in Objective-C, it's JavaScript projection will expect a string with the method name.

```objc
NSMutableString *aString = [[NSMutableString alloc] init];
BOOL hasAppend = [aString respondsToSelector:@selector(appendString:)];
```

```js
const aString = NSMutableString.alloc().init()
const hasAppend = aString.respondsToSelector('appendString:')
```

#### Objective-C Blocks

[Objective-C blocks](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/Blocks/Articles/00_Introduction.html) are anonymous functions in Objective-C. They can be closures, just like JavaScript functions, and are often used as callbacks. NativeScript implicitly exposes an Objective-C block as a JavaScript function. Any API that accepts a block in Objective-C accepts a JavaScript function when called in JavaScript:

```objc
NSURL *url = [NSURL URLWithString:@"http://example.com"];
NSURLRequest *request = [NSURLRequest requestWithURL:url];
[NSURLConnection sendAsynchronousRequest:request queue:nil completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
    NSLog(@"request complete");
}];
```

```js
const url = NSURL.URLWithString('http://example.com')
const request = NSURLRequest.requestWithURL(url)
NSURLConnection.sendAsynchronousRequestQueueCompletionHandler(
  request,
  null,
  (response, data, connectionError) => {
    console.log('request complete')
  }
)
```

Blocks in Objective-C, especially blocks that are closures, need to be properly retained and released in order to not leak memory. NativeScript does this automatically - a block exposed as a JavaScript function is released as soon as the function is garbage collected. A JavaScript function implicitly converted to a block will not be garbage collected as long the block is not released.

#### CoreFoundation Objects

iOS contains both an Objective-C standard library (the Foundation framework) and a pure C standard library (Core Foundation). Core Foundation is modeled after Foundation to a great extent and implements a limited object model. Data types such as CFDictionaryRef and CFBundleRef are Core Foundation objects. Core Foundation objects are retained and released just like Objective-C objects, using the CFRetain and CFRelease functions. NativeScript implements automatic memory management for functions that are annotated as returning a retained Core Foundation object. For those that are not annotated, NativeScript returns an Unmanaged type that wraps the Core Foundation instance. This makes you partially responsible for keeping the instance allive. You could either

- Call takeRetainedValue() which would return managed reference to the wrapped instance, decrementing the reference count while doing so
- Call takeUnretainedValue() which would return managed reference to the wrapped instance _without_ decrementing the reference count

#### Toll-free Bridging

Core Foundation has the concept of [Toll-free bridged types](https://developer.apple.com/library/ios/documentation/CoreFoundation/Conceptual/CFDesignConcepts/Articles/tollFreeBridgedTypes.html) - data types which can be used interchangeably with their Objective-C counterparts. When dealing with a toll-free bridged type NativeScript always treats it as its Objective-C counterpart. Core Foundation objects on the [toll-free bridged types list](https://developer.apple.com/library/ios/documentation/CoreFoundation/Conceptual/CFDesignConcepts/Articles/tollFreeBridgedTypes.html#//apple_ref/doc/uid/TP40010677-SW4) are exposed as if they were instances of the equivalent Objective-C class. This means that a `CFDictionaryRef` value in JavaScript has the same methods on its prototype as if it were a `NSDictionary` object. Unlike regular Core Foundation objects, toll-free bridged types are automatically memory managed by NativeScript, so there is no need to retain or release them using `CFRetain` and `CFRelease`.

#### Null Values

Objective-C has three null values - `NULL`, `Nil` and `nil`. `NULL` means a regular C pointer to zero, `Nil` is a `NULL` pointer to an Objective-C class, and `nil` is a `NULL` pointer to an Objective-C object. They are implicitly converted to `null` in JavaScript. When calling a native API with a `null` argument NativeScript converts the JavaScript null value to a C pointer to zero. Some APIs require their arguments to not be pointers to zero - invoking them with null in JavaScript can potentially crash the application without a chance to recover.

#### Numeric Types

Integer and floating point data types in Objective-C are converted to JavaScript numbers. This includes types such as `char`, `int`, `long`, `float`, `double`, `NSInteger` and their unsigned variants. However, integer values larger than ±2<sup>53</sup> will lose their precision because the JavaScript number type is limited in size to 53-bit integers.

#### Struct Types

NativeScript exposes Objective-C structures as JavaScript objects. The properties on such an object are the same as the fields on the structure it exposes. APIs that expect a struct type in Objective-C can be called with a JavaScript object with the same shape as the structure:

```objc
CGRect rect = {
  .origin = {
    .x = 0,
    .y = 0
  },
  .size = {
    .width = 100,
    .height = 100
  }
};
UIView *view = [[UIView alloc] initWithFrame:rect];
```

```js
const rect = {
  origin: {
    x: 0,
    y: 0
  },
  size: {
    width: 100,
    height: 100
  }
}
const view = UIView.alloc().initWithFrame(rect)
```

More information on how NativeScript deals with structures is available [here](#C-Structures).

<!-- TODO: fix links -->

#### `NSError **` marshalling

#### Native to JavaScript

```objc
@interface NSFileManager : NSObject
+ (NSFileManager *)defaultManager;
- (NSArray *)contentsOfDirectoryAtPath:(NSString *)path error:(NSError **)error;
@end
```

We can use this method from JavaScript in the following way:

```js
const fileManager = NSFileManager.defaultManager
const bundlePath = NSBundle.mainBundle.bundlePath

console.log(fileManager.contentsOfDirectoryAtPathError(bundlePath, null))
```

If we want to check the error using out parameters:

```js
const errorRef = new interop.Reference()
fileManager.contentsOfDirectoryAtPathError('/not-existing-path', errorRef)
console.log(errorRef.value) // NSError: "The folder '/not-existing-path' doesn't exist."
```

Or we can skip passing the **last NSError \*\*** out parameter and a JavaScript error will be thrown if the `NSError **` is set from native:

```js
try {
  fileManager.contentsOfDirectoryAtPathError('/not-existing-path')
} catch (e) {
  console.log(e) // NSError: "The folder '/not-existing-path' doesn't exist."
}
```

#### JavaScript to Native

When overriding a method having **NSError ** out parameter in the end** any thrown JavaScript error will be wrapped and set to the `NSError **` argument (if given).

#### Pointer Types

Languages in the C family have the notion of a pointer data type. A pointer is a value that points to another value, or, more accurately, to the location of that value in memory. JavaScript has no notion of pointers, but the pointer data type is used throughout the iOS SDK. To overcome this, NativeScript introduces the `Reference` object. References are special objects which allow JavaScript to reason about and access pointer values. Consider this example:

```objc
NSFileManager *fileManager = [NSFileManager defaultManager];
BOOL isDirectory;
BOOL exists = [fileManager fileExistsAtPath:@"/var/log" isDirectory:&isDirectory];
if (isDirectory) {
    NSLog(@"The path is actually a directory");
}
```

This snippet calls the `fileExistsAtPath:isDirectory` method of the `NSFileManager` class. This method accepts a `NSString` as its first argument and a pointer to a boolean value as its second argument. During its execution the method will use the pointer to update the boolean value. This means it will directly change the value of `isDirectory`. The same code can be written as follows:

```js
const fileManager = NSFileManager.defaultManager
const isDirectory = new interop.Reference()
const exists = fileManager.fileExistsAtPathIsDirectory('/var/log', isDirectory)
if (isDirectory.value) {
  console.log('The path is actually a directory')
}
```

### Android Marshalling

#### Data Conversion

Being two different worlds, Java/Kotlin and JavaScript use different data types. For example java.lang.String is not the same as the JavaScript's String. The NativeScript Runtime provides implicit type conversion that projects types and values from JavaScript to Java and vice-versa. The Kotlin support in the runtime is similar and data conversion is described in the articles JavaScript to Kotlin and Kotlin to JavaScript There are several corner cases - namely with different method overloads, where an explicit input is required to call the desired method but these cases are not common and a typical application will seldom (if ever) need such explicit conversion.

#### JavaScript to Java Conversion

The article lists the available types in JavaScript and how they are projected to Java.

##### String

JavaScript [String](http://www.w3schools.com/jsref/jsref_obj_string.asp) maps to [java.lang.String](http://developer.android.com/reference/java/lang/String.html):

```js
var context = ...;
var button = new android.widget.Button(context);
var text = "My Button"; // JavaScript string
button.setText(text); // text is converted to java.lang.String
```

##### Boolean

JavaScript [Boolean](http://www.w3schools.com/js/js_booleans.asp) maps to Java primitive [boolean](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html).

```js
var context = ...;
var button = new android.widget.Button(context);
var enabled = false; // JavaScript Boolean
button.setEnabled(enabled); // enabled is converted to Java primitive boolean
```

##### Undefined & Null

JavaScript [Undefined](http://www.w3schools.com/jsref/jsref_undefined.asp) & [Null](https://www.w3schools.com/js/js_type_conversion.asp) maps to Java [null literal](http://docs.oracle.com/javase/specs/jls/se7/html/jls-3.html#jls-3.10.7) (or null pointer).

```js
var context = ...;
var button = new android.widget.Button(context);
button.setOnClickListener(undefined); // the Java call will be made using the null keyword
```

##### Number

Java has several primitive numeric types while JavaScript has the [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp) type only. Additionally, unlike JavaScript, Java is a language that supports [Method Overloading](http://en.wikipedia.org/wiki/Function_overloading), which makes the numeric conversion more complex. Consider the following Java class:

```java
class MyObject extends java.lang.Object {
  public void myMethod(byte value){
  }

  public void myMethod(short value){
  }

  public void myMethod(int value){
  }

  public void myMethod(long value){
  }

  public void myMethod(float value){
  }

  public void myMethod(double value){
  }
}
```

The following logic applies when calling `myMethod` on a `myObject` instance from JavaScript:

```js
var myObject = new MyObject()
```

- Implicit **integer** conversion:

```js
myObject.myMethod(10) // myMethod(int) will be called.
```

::: warning Note
If there is no myMethod(int) implementation, the Runtime will try to choose the best possible overload with least conversion loss. If no such method is found an exception will be raised.
:::

- Implicit **floating-point** conversion:

```js
myObject.myMethod(10.5) // myMethod(double) will be called.
```

::: warning Note
If there is no myMethod(double) implementation, the Runtime will try to choose the best possible overload with least conversion loss. If no such method is found an exception will be raised.
:::

- Explicitly call an overload: <br/>
  To enable developers call a specific method overload, the Runtime exposes the following functions directly in the global context:

         * byte(number) → Java primitive byte

         > The number value will be truncated and only its first byte of the whole part will be used.

         * short(number) → Java primitive short

         > The number value will be truncated and only its first 2 bytes of the whole part will be used.

         * float(number) → Java primitive float

         > The number value will be converted (with a possible precision loss) to a 2^32 floating-point value.

         * long(number) → Java primitive long (in case the number literal fits JavaScript 2^53 limit)

         > The number value's whole part will be taken only.

         * long("number") → Java primitive long (in case the number literal doesn't fit JavaScript 2^53 limit)

```js
myObject.myMethod(byte(10)) // will call myMethod(byte)
myObject.myMethod(short(10)) // will call myMethod(short)
myObject.myMethod(float(10)) // will call myMethod(float)
myObject.myMethod(long(10)) // will call myMethod(long)
myObject.myMethod(long('123456')) // will convert "123456" to Java long and will call myMethod(long)
```

::: warning Note
When an explicit cast function is called and there is no such implementation found, the Runtime will directly fail, without trying to find a matching overload.
:::

##### Array

A JavaScript [Array](http://www.w3schools.com/jsref/jsref_obj_array.asp) is implicitly converted to a [Java Array](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html), using the above described rules for type conversion of the array's elements. For example:

```java
class MyObject extends java.lang.Object {
  public void myMethod(java.lang.String[] items){
  }
}
```

```js
var items = ['One', 'Two', 'Three']
var myObject = new MyObject()
myObject.myMethod(items) // will convert to Java array of java.lang.String objects
```

#### Javascript to Kotlin Conversion

The article lists the available types in JavaScript and how they are projected to Kotlin.

##### String

JavaScript [String](http://www.w3schools.com/jsref/jsref_obj_string.asp) maps to [kotlin.String](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-string/index.html):

```js
var kotlinClass = new com.example.KotlinClassWithStringProperty()
var text = 'My Button' // JavaScript string
kotlinClass.setStringProperty(text) // text is converted to kotlin.String
```

##### Boolean

JavaScript [Boolean](http://www.w3schools.com/js/js_booleans.asp) maps to Kotlin class [Boolean](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-boolean/index.html).

```js
var kotlinClass = new com.example.KotlinClassWithBooleanProperty()
var enabled = false // JavaScript Boolean
kotlinClass.setBooleanProperty(enabled) // enabled is converted to Kotlin Boolean
```

##### Undefined & Null

JavaScript [Undefined](http://www.w3schools.com/jsref/jsref_undefined.asp) & [Null](https://www.w3schools.com/js/js_type_conversion.asp) maps to Kotlin null literal (or null pointer).

```js
var kotlinClass = new com.example.KotlinClassWithNullableParameter(undefined) // the Kotlin call will be made using the null keyword
```

##### Number

Kotlin has several numeric types while JavaScript has the [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp) type only. Additionally, unlike JavaScript, Kotlin is a language that supports [Method Overloading](http://en.wikipedia.org/wiki/Function_overloading), which makes the numeric conversion more complex. Consider the following Java class:

```kotlin
class MyObject : Any() {
  fun myMethod(value: Byte) {}

  fun myMethod(value: Short) {}

  fun myMethod(value: Int) {}

  fun myMethod(value: Long) {}

  fun myMethod(value: Float) {}

  fun myMethod(value: Double) {}
}
```

The following logic applies when calling `myMethod` on a `myObject` instance from JavaScript:

```js
var myObject = new MyObject()
```

- Implicit **integer** conversion:

```js
myObject.myMethod(10) // myMethod(Int) will be called.
```

::: warning Note
If there is no myMethod(Int) implementation, the Runtime will try to choose the best possible overload with least conversion loss. If no such method is found an exception will be raised.
:::

- Implicit **floating-point** conversion:

```js
myObject.myMethod(10.5) // myMethod(Double) will be called.
```

::: warning Note
If there is no myMethod(Double) implementation, the Runtime will try to choose the best possible overload with least conversion loss. If no such method is found an exception will be raised.
:::

- Explicitly call an overload: <br/>
  To enable developers call a specific method overload, the Runtime exposes the following functions directly in the global context:

         * byte(number) → Kotlin Byte

         >The number value will be truncated and only its first byte of the whole part will be used.

         * short(number) → Kotlin Short

         >The number value will be truncated and only its first 2 bytes of the whole part will be used.

         * float(number) → Kotlin Float

         >The number value will be converted (with a possible precision loss) to a 2^32 floating-point value.

         * long(number) → Kotlin Long (in case the number literal fits JavaScript 2^53 limit)

         >The number value's whole part will be taken only.

         * long("number") → Kotlin Long (in case the number literal doesn't fit JavaScript 2^53 limit)

```js
myObject.myMethod(byte(10)) // will call myMethod(Byte)
myObject.myMethod(short(10)) // will call myMethod(Short)
myObject.myMethod(float(10)) // will call myMethod(Float)
myObject.myMethod(long(10)) // will call myMethod(Long)
myObject.myMethod(long('123456')) // will convert "123456" to Kotlin Long and will call myMethod(Long)
```

::: warning Note
When an explicit cast function is called and there is no such implementation found, the Runtime will directly fail, without trying to find a matching overload.
:::

##### Array

A JavaScript [Array](http://www.w3schools.com/jsref/jsref_obj_array.asp) is implicitly converted to a [Kotlin Array](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-array/index.html), using the above described rules for type conversion of the array's elements. For example:

```kotlin
class MyObject : Any() {
    fun myMethod(items: Array<String>) {}
}
```

```js
var items = ['One', 'Two', 'Three']
var myObject = new MyObject()
myObject.myMethod(items) // will convert to Java array of java.lang.String objects
```

#### Java to Javascript Conversion

The article lists the available types in Java and how they are projected to JavaScript.

##### String & Character

Both [java.lang.String](http://developer.android.com/reference/java/lang/String.html) and [java.lang.Character](http://docs.oracle.com/javase/7/docs/api/java/lang/Character.html) types are projected as JavaScript [String](http://www.w3schools.com/jsref/jsref_obj_string.asp):

```js
var file = new java.io.File('/path/to/file')
var path = file.getPath() // returns java.lang.String, converted to JS String
```

##### Boolean & Primitive boolean

Both the primitive [boolean](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) and reference [java.lang.Boolean](http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html) types are projected as JavaScript [Boolean](http://www.w3schools.com/jsref/jsref_obj_boolean.asp):

```js
var context = ...
var button = new android.widget.Button(context);
var enabled = button.isEnabled(); // returns primitive boolean, converted to JS Boolean
```

##### Byte & Primitive byte

Both the primitive [byte](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) and reference [java.lang.Byte](http://docs.oracle.com/javase/7/docs/api/java/lang/Byte.html) types are projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var byte = new java.lang.Byte('1')
var jsByteValue = byte.byteValue() // returns primitive byte, converted to Number
```

##### Short & Primitive short

Both the primitive [short](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) and reference [java.lang.Short](http://docs.oracle.com/javase/7/docs/api/java/lang/Short.html) types are projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var short = new java.lang.Short('1')
var jsShortValue = short.shortValue() // returns primitive short, converted to Number
```

##### Integer & Primitive int

Both the primitive [int](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) and reference [java.lang.Integer](http://docs.oracle.com/javase/7/docs/api/java/lang/Integer.html) types are projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var int = new java.lang.Integer('1')
var jsIntValue = int.intValue() // returns primitive int, converted to Number
```

##### Float & Primitive float

Both the primitive [float](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) and reference [java.lang.Float](http://docs.oracle.com/javase/7/docs/api/java/lang/Float.html) types are projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var float = new java.lang.Float('1.5')
var jsFloatValue = float.floatValue() // returns primitive float, converted to Number
```

##### Double & Primitive double

Both the primitive [double](http://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) and reference [java.lang.Double](http://docs.oracle.com/javase/7/docs/api/java/lang/Double.html) types are projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var double = new java.lang.Double('1.5')
var jsDoubleValue = double.doubleValue() // returns primitive double, converted to Number
```

##### Long & Primitive long

[java.lang.Long](http://docs.oracle.com/javase/7/docs/api/java/lang/Long.html) and its primitive equivalent are special types which are projected to JavaScript by applying the following rules:

- If the value is in the interval (-2^53, 2^53) then it is converted to [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp)
- Else a special object with the following characteristics is created:
  - Has Number.NaN set as a prototype
  - Has value property set to the string representation of the Java long value
  - Its valueOf() method returns NaN
  - Its toString() method returns the string representation of the Java long value

```java
public class TestClass {
	public long getLongNumber54Bits(){
		return 1 << 54;
	}
	public long getLongNumber53Bits(){
		return 1 << 53;
	}
}
```

```js
var testClass = new TestClass()
var jsNumber = testClass.getLongNumber53Bits() // result is JavaScript Number
var specialObject = testClass.getLongNumber54Bits() // result is the special object described above
```

##### Array

Array in Java is a special [java.lang.Object](http://docs.oracle.com/javase/7/docs/api/java/lang/Object.html) that have an implicit Class associated. A Java Array is projected to JavaScript as a special JavaScript proxy object with the following characteristics:

- Has length property
- Has registered indexed getter and setter callbacks, which:
  - If the array contains elements of type convertible to a JavaScript type, then accessing the i-th element will return a converted type
  - If the array contains elements of type non-convertible to JavaScript, then accessing the i-th element will return a proxy object over the Java/Android type (see [Accessing APIs](#accessing-apis))

```js
var directory = new java.io.File('path/to/myDir')
var files = directory.listFiles() // files is a special object as described above
var singleFile = files[0] // the indexed getter callback is triggered and a proxy object over the java.io.File is returned
```

::: warning Note
A Java Array is intentionally not converted to a JavaScript [Array](http://www.w3schools.com/jsref/jsref_obj_array.asp) for the sake of performance, especially when it comes to large arrays.
:::

##### Array of Objects

Occasionally you have to create Java arrays from JavaScript. For this scenario we added method `create` to built-in JavaScript [`Array` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Here are some examples how to use `Array.create` method:

```js
// the following statement is equivalent to byte[] byteArr = new byte[10];
var byteArr = Array.create('byte', 10)

// the following statement is equivalent to String[] stringArr = new String[10];
var stringArr = Array.create(java.lang.String, 10)
```

Here is the full specification for `Array.create` method

```js
Array.create(elementClassName, length)
```

```js
Array.create(javaClassCtorFunction, length)
```

The first signature accepts `string` for `elementClassName`. This option is useful when you have to create Java array of primitive types (e.g. `char`, `boolean`, `byte`, `short`, `int`, `long`, `float` and `double`). It is also useful when you have to create Java jagged arrays. For this scenario `elementClassName` must be the standard JNI class notation. Here are some examples:

```js
// equivalent to int[][] jaggedIntArray2 = new int[10][];
var jaggedIntArray2 = Array.create('[I', 10)

// equivalent to boolean[][][] jaggedBooleanArray3 = new boolean[10][][];
var jaggedBooleanArray3 = Array.create('[[Z', 10)

// equivalent to Object[][][][] jaggedObjectArray4 = new Object[10][][][];
var jaggedObjectArray4 = Array.create('[[[Ljava.lang.Object;', 10)
```

The second signature uses `javaClassCtorFunction` which must the JavaScript constructor function for a given Java type. Here are some examples:

```js
// equivalent to String[] stringArr = new String[10];
var stringArr = Array.create(java.lang.String, 10)

// equivalent to Object[] objectArr = new Object[10];
var objectArr = Array.create(java.lang.Object, 10)
```

#### Array of Primitive Types

The automatic marshalling works only for cases with arrays of objects. In cases where you have a method that takes an array of primitive types, you need to convert it as follows:

```java
public static void myMethod(int[] someParam)
```

Then yoy need to invoke it as follows:

```js
let arr = Array.create('int', 3)
arr[0] = 1
arr[1] = 2
arr[2] = 3

SomeObject.myMethod(arr) // assuming the method is accepting an array of primitive types
```

However there are some other helpful classes we can use to create a few other arrays of primitive types

```js
const byteArray = java.nio.ByteBuffer.wrap([1]).array()
const shortArray = java.nio.ShortBuffer.wrap([1]).array()
const intArray = java.nio.IntBuffer.wrap([1]).array()
const longArray = java.nio.LongBuffer.wrap([1]).array()
const floatArray = java.nio.FloatBuffer.wrap([1]).array()
const doubleArray = java.nio.DoubleBuffer.wrap([1]).array()
```

##### Two-Dimensional Arrays of Primitive Types

The above scenario gets more tricky with two-dimensional arrays. Consider a Java method that accepts as an argument a two-dimensional array:

```java
public static void myMethod(java.lang.Integer[][] someParam)
```

The marshalled JavaScript code will look like this:

```js
let arr = Array.create('[Ljava.lang.Integer;', 2)
let elements = Array.create('java.lang.Integer', 3)
elements[0] = new java.lang.Integer(1)
elements[1] = new java.lang.Integer(2)
elements[2] = new java.lang.Integer(3)
arr[0] = elements

SomeObject.myMethod(arr) // assuming the method is accepting a two-dimensional array of primitive types
```

##### Null

The Java [null literal](http://docs.oracle.com/javase/specs/jls/se7/html/jls-3.html#jls-3.10.7) (or null pointer) is projected to JavaScript [Null](https://www.w3schools.com/js/js_type_conversion.asp):

```js
var context = ...
var button = new android.widget.Button(context);
var background = button.getBackground(); // if there is no background drawable method will return JS null
```

##### Android Types

All Android-declared types are projected to JavaScript using the Package and Class proxies as described in [Accessing APIs](#accessing-apis)

#### Kotlin to Javascript Conversion

The article lists the available types in Kotlin and how they are projected to JavaScript.

Keep in mind that some of Kotlin's fundamental types are translated to a Java type by the Kotlin compiler when targeting Android or the JVM. Those types are the following:

| **Kotlin non-nullable type** | **Java type**    | **Kotlin nullable type** | **Java type**       |
| ---------------------------- | ---------------- | ------------------------ | ------------------- |
| kotlin.Any                   | java.lang.Object | kotlin.Any?              | java.lang.Object    |
| kotlin.String                | java.lang.String | kotlin.String?           | java.lang.String    |
| kotlin.Char                  | char             | kotlin.Char?             | java.lang.Character |
| kotlin.Boolean               | boolean          | kotlin.Boolean?          | java.lang.Boolean   |
| kotlin.Byte                  | byte             | kotlin.Byte?             | java.lang.Byte      |
| kotlin.Short                 | short            | kotlin.Short?            | java.lang.Short     |
| kotlin.Int                   | int              | kotlin.Int?              | java.lang.Integer   |
| kotlin.Long                  | long             | kotlin.Long?             | java.lang.Long      |
| kotlin.Float                 | float            | kotlin.Float?            | java.lang.Float     |

Although the conversion of Kotlin types in NativeScript is quite the same as the [Java conversion](#java-to-javascript-conversion), let's take a look at some examples.

##### String & Character

Both [kotlin.String](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-string/index.html) and [kotlin.Char](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-char/index.html) types are projected as JavaScript [String](http://www.w3schools.com/jsref/jsref_obj_string.asp):

```js
var kotlinClass = new com.example.KotlinClassWithStringAndCharProperty()
var str1 = kotlinClass.getStringProperty() // returns kotlin.String, converted to JS String
var str2 = kotlinClass.getCharProperty() // returns kotlin.Char, converted to JS String
```

```kotlin
package com.example

class KotlinClassWithStringAndCharProperty {
  val stringProperty: String = "string property"
  val charProperty: Char = 'c'
}
```

##### Boolean

Kotlin's boolean type [kotlin.Boolean](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-boolean/index.html) is projected as JavaScript [Boolean](http://www.w3schools.com/jsref/jsref_obj_boolean.asp):

```js
var kotlinClass = new com.example.KotlinClassWithBooleanProperty()
var enabled = kotlinClass.getBooleanProperty() // returns Kotlin Boolean, converted to JS Boolean
```

```kotlin
package com.example

class KotlinClassWithBooleanProperty {
  val booleanProperty: Boolean = false
}
```

##### Byte

Kotlin's byte type [kotlin.Byte](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-byte/index.html) is projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var kotlinClass = new com.example.KotlinClassWithByteProperty()
var jsByteValue = kotlinClass.getByteProperty() // returns Kotlin Byte, converted to Number
```

```kotlin
package com.example

class KotlinClassWithByteProperty {
  val byteProperty: Byte = 42
}
```

##### Short

Kotlin's short type [kotlin.Short](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-short/index.html) is projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var kotlinClass = new com.example.KotlinClassWithShortProperty()
var jsShortValue = kotlinClass.getShortProperty() // returns Kotlin Short, converted to Number
```

```kotlin
package com.example

class KotlinClassWithShortProperty {
  val shortProperty: Short = 42
}
```

##### Integer

Kotlin's integer type [kotlin.Int](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-int/index.html) is projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var kotlinClass = new com.example.KotlinClassWithIntProperty()
var jsIntValue = kotlinClass.getIntProperty() // returns Kotlin Int, converted to Number
```

```kotlin
package com.example

class KotlinClassWithIntProperty {
  val intProperty: Int = 42
}
```

##### Float

Kotlin's float type [kotlin.Float](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-float/index.html) is projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var kotlinClass = new com.example.KotlinClassWithFloatProperty()
var jsFloatValue = kotlinClass.getFloatProperty() // returns Kotlin Float, converted to Number
```

```kotlin
package com.example

class KotlinClassWithFloatProperty {
  val floatProperty: Float = 42.0f
}
```

##### Double

Kotlin's double type [kotlin.Double](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-double/index.html) is projected as JavaScript [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp):

```js
var kotlinClass = new com.example.KotlinClassWithDoubleProperty()
var jsDoubleValue = kotlinClass.getDoubleProperty() // returns Kotlin double, converted to Number
```

```kotlin
package com.example

class KotlinClassWithDoubleProperty {
  val doubleProperty: Double = 42.0
}
```

##### Long

Kotlin's long type [kotlin.Long](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/-long/index.html) is a special type which is projected to JavaScript by applying the following rules:

- If the value is in the interval (-2^53, 2^53) then it is converted to [Number](http://www.w3schools.com/jsref/jsref_obj_number.asp)
- Else a special object with the following characteristics is created:
  - Has Number.NaN set as a prototype
  - Has value property set to the string representation of the Kotlin long value
  - Its valueOf() method returns NaN
  - Its toString() method returns the string representation of the Kotlin long value

```kotlin
package com.example

class KotlinClassWithLongProperties {
  val longNumber54Bits: Long
    get() = (1 shl 54).toLong()
  val longNumber53Bits: Long
    get() = (1 shl 53).toLong()
}
```

```js
var kotlinClass = new com.example.KotlinClassWithLongProperties()
var jsNumber = kotlinClass.getLongNumber53Bits() // result is JavaScript Number
var specialObject = kotlinClass.getLongNumber54Bits() // result is the special object described above
```

##### Array

Array in Kotlin is a special object that has an implicit Class associated. A Kotlin Array is projected to JavaScript as a special JavaScript proxy object with the following characteristics:

- Has length property
- Has registered indexed getter and setter callbacks, which:
  - If the array contains elements of type convertible to a JavaScript type, then accessing the n-th element will return a converted type
  - If the array contains elements of type non-convertible to JavaScript, then accessing the n-th element will return a proxy object over the Kotlin type (see [Accessing APIs](#accessing-apis))

```js
var kotlinClass = new com.example.KotlinClassWithStringArrayProperty()
var kotlinArray = kotlinClass.getStringArrayProperty() // kotlinArray is a special object as described above
var firstStringElement = kotlinArray[0] // the indexed getter callback is triggered and the kotlin.String is returned as a JS string
```

```kotlin
package com.example

class KotlinClassWithStringArrayProperty {
  val stringArrayProperty: Array<String> = arrayOf("element1", "element2", "element3")
}
```

::: warning Note
A Kotlin Array is intentionally not converted to a JavaScript [Array](http://www.w3schools.com/jsref/jsref_obj_array.asp) for the sake of performance, especially when it comes to large arrays.
:::

##### Creating arrays

Occasionally you have to create Kotlin arrays from JavaScript. Because of the translation of the fundamental Kotlin types to Java types in Android, creating Kotlin array could be done the same way Java arrays are created. This is described in [Java to JavaScript](#java-to-javascript-conversion)

##### Null

The Kotlin null literal (or null pointer) is projected to JavaScript [Null](https://www.w3schools.com/js/js_type_conversion.asp):

```js
var kotlinClass = new com.example.KotlinClassWithNullableProperty()
var nullableValue = kotlinClass.getNullableProperty() // if there is no value, the method will return JS null
```

```kotlin
package com.example

class KotlinClassWithNullableProperty() {
  val nullableProperty: Any? = null
}
```

##### Kotlin Types

All Kotlin types are projected to JavaScript using the Package and Class proxies as described in [Accessing APIs](#accessing-apis)

##### Kotlin Companion objects

Kotlin's [companion objects](https://kotlinlang.org/docs/tutorials/kotlin-for-py/objects-and-companion-objects.html#companion-objects) could be accessed in JavaScript the same way they can be accessed in Java - by accessing the `Companion` field:

```js
var companion = com.example.KotlinClassWithCompanion.Companion
var data = companion.getDataFromCompanion()
```

```kotlin
package com.example

class KotlinClassWithCompanion {
  companion object {
    fun getDataFromCompanion() = "some data"
  }
}
```

##### Kotlin Object

Kotlin's [objects](https://kotlinlang.org/docs/tutorials/kotlin-for-py/objects-and-companion-objects.html#object-declarations) could be accessed in JavaScript the same way they can be accessed in Java - by accessing the INSTANCE field:

```js
var objectInstance = com.example.KotlinObject.INSTANCE
var data = objectInstance.getDataFromObject()
```

```kotlin
package com.example

object KotlinObject {
  fun getDataFromObject() = "some data"
}
```

##### Accessing Kotlin properties

Kotlin's [properties](https://kotlinlang.org/docs/reference/properties.html#properties-and-fields) could be accessed in JavaScript the same way they can be accessed in Java - by using their compiler-generated get/set methods. Non-boolean Kotlin properties could be used in NativeScript applications as JS fields as well.

```js
var kotlinClass = new com.example.KotlinClassWithStringProperty()

var propertyValue = kotlinClass.getStringPropert()
kotlinClass.setStringProperty('example')

propertyValue = kotlinClass.stringProperty
kotlinClass.stringProperty = 'second example'
```

```kotlin
package com.example

class KotlinClassWithStringProperty(var stringProperty: kotlin.String)
```

##### Accessing Kotlin package-level functions

Currently using Kotlin [package-level functions](https://kotlinlang.org/docs/reference/java-to-kotlin-interop.html#package-level-functions) could not be achieved easily. In order to use a package-level function, the class where it's defined should be known. Let's take a look at an example:

```js
var randomNumber = com.example.FunctionsKt.getRandomNumber()
```

```kotlin
package com.example

fun getRandomNumber() = 42
```

In the example above, the class `FunctionsKt` is autogenerated by the Kotlin compiler and its name is based on the name of the file where the functions are defined. Kotlin supports annotating a file to have a user provided name and this simplifies using package-level functions:

```js
var randomNumber = com.example.UtilityFunctions.getRandomNumber()
```

```kotlin
@file:JvmName("UtilityFunctions")
package com.example

fun getRandomNumber() = 42
```

##### Accessing Kotlin extension functions

Currently using Kotlin extension functions could not be achieved easily. In order to use an extension function, the class where it's defined should be known. Also, when invoking it, the first parameter should be an instance of the type for which the function is defined. Let's take a look at an example:

```js
var arrayList = new java.util.ArrayList()
arrayList.add('firstElement')
arrayList.add('secondElement')
com.example.Extensions.switchPlaces(arrayList, 0, 1)
```

```kotlin
package com.example

import java.util.ArrayList

fun ArrayList<String>.switchPlaces(firstElementIndex: Int, secondElementIndex: Int) {
  val temp = this[firstElementIndex]
  this[firstElementIndex] = this[secondElementIndex]
  this[secondElementIndex] = temp
}
```

In the example above, the class `ExtensionsKt` is autogenerated by the Kotlin compiler and its name is based on the name of the file where the functions are defined. Kotlin supports annotating a file to have a user provided name and this simplifies using package-level functions:

```js
var arrayList = new java.util.ArrayList()
arrayList.add('firstElement')
arrayList.add('secondElement')
com.example.ExtensionFunctions.switchPlaces(arrayList, 0, 1)
```

```kotlin
@file:JvmName("ExtensionFunctions")
package com.example

import java.util.ArrayList

fun ArrayList<String>.switchPlaces(firstElementIndex: Int, secondElementIndex: Int) {
  val temp = this[firstElementIndex]
  this[firstElementIndex] = this[secondElementIndex]
  this[secondElementIndex] = temp
}
```
