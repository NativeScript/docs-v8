---
title: Advanced Concepts
---

## Adding ObjectiveC/Swift Code

- [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/guides/ios-source-code.md

For the Objective-C/Swift symbols to be accessible by the Nativescript runtimes the following criteria should be met:

**1)** They need to be compiled and linked

**2)** Metadata needs to be generated for them

The first task is done by the NativeScript CLI by adding the source files to the generated _.xcodeproj_. For the second one the Metadata Generator needs to find a [module.modulemap](https://clang.llvm.org/docs/Modules.html) of the compiled modules.

**Note:** For _.swift_ files _module.modulemap_ is not required.

In order to satisfy the above constraints the developer has to:

**1)** Place the source files in _App_Resources/iOS/src/_

**2)** Create a modulemap for the Objective-C files

**Note:** Swift classes need to be accessible from the Objective-C runtime in order to be used from NativeScript. This can be done by using the _@objc_ attribute or by inheriting _NSObject_.

For a detailed walkthrough on how to use native iOS source code in NativeScript [here](https://www.nativescript.org/blog/adding-objective-c-code-to-a-nativescript-app).

### Objective C Example

A minimal example for adding native Objective C source code to your NativeScript application:

1. Create ExampleCrypto.m file with the following content:

```objective-c
// import required header files
#import <CommonCrypto/CommonDigest.h>
#import <CommonCrypto/CommonHMAC.h>
#import "ExampleCrypto.h"

@implementation ExampleCrypto

+ (NSString *)generateHMACWithApiKey:(NSString *) apiKey andApiSecret:(NSString *) apiSecret {

    NSString *hmacData = [NSString stringWithFormat:@"%@%@%@%@%@",apiKey];

    // Make sure the HMAC hash is in hex
    unsigned char outputHMAC[CC_SHA256_DIGEST_LENGTH];
    const char* keyChar = [apiSecret cStringUsingEncoding:NSUTF8StringEncoding];
    const char* dataChar = [hmacData cStringUsingEncoding:NSUTF8StringEncoding];
    CCHmac(kCCHmacAlgSHA256, keyChar, strlen(keyChar), dataChar, strlen(dataChar), outputHMAC);
    NSData* hmacHash = [[NSData alloc] initWithBytes:outputHMAC length:sizeof(outputHMAC)];

    NSString* hmacHashHexString = [[hmacHash description] stringByReplacingOccurrencesOfString:@" " withString:@""];

    // Authorization : base64 of hmac hash -->
    NSString* authorization = [[hmacHashHexString dataUsingEncoding:NSUTF8StringEncoding] base64EncodedStringWithOptions:0];

    return authorization;

}

@end
```

2. Create ExampleCrypto.h file with the following content:

```objective-c
#import <Foundation/Foundation.h>

@interface ExampleCrypto : NSObject

+ (NSString *)generateHMACWithApiKey:(NSString *)apiKey andApiSecret:(NSString *)apiSecret;

@end
```

3. Create the module.modulemap file with the following content:

```objective-c
module ExampleCrypto {
    header "ExampleCrypto.h"
    export *
}
```

4. Call the static method from the ObjectiveC source code just added somewhere in your application.

```typescript
function generateNativeIOSHMAC() {
  // This if check ensures the following code is only executed on iOS.
  if (global.isIOS) {
    const apiKey = '9292skksd88172alekdd782939ssa'
    const apiSecret = 'f82828282828f992f'

    const base64encryptedKey = ExampleCrypto.generateHMACWithApiKeyandApiSecret(
      apiKey,
      apiSecret
    )
    console.log('base64encryptedKey', base64encryptedKey)
  }
}
```

5. Build your NativeScript application by running the following and you should see the base64encryptedKey print in your terminal.

```bash
ns clean && ns run ios --no-hmr
```

## Marshalling

NativeScript for iOS handles the conversion between JavaScript and Objective-C data types implicitly. However, the rules that govern this conversion need to take into account the differences between JavaScript and Objective-C. NativeScript tries to translate idioms between languages, but there are quirks and features in both that are hard to reconcile. The following is a thorough but not exhaustive list of rules and exceptions NativeScript abides by when exposing Objective-C APIs in JavaScript.

### Objective-C Classes and Objects

The most common data type in Objective-C by far is the class. Classes can have instance or static methods, and properties which are always instance. NativeScript exposes an Objective-C class and its members as a JavaScript constructor function with an associated prototype according to the [prototypal inheritance model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain). This means that each static method on an Objective-C class becomes a function on its JavaScript constructor function, each instance method becomes a function on the JavaScript prototype, and each property becomes a property descriptor on the same prototype. Every JavaScript constructor function created to expose an Objective-C class is arranged in a prototype chain that mirrors the class hierarchy in Objective-C: if `NSMutableArray` extends `NSArray`, which in turn extends `NSObject` in Objective-C, then in JavaScript the prototype of the `NSObject` constructor function is the prototype of `NSArray`, which in turn is the prototype of `NSMutableArray`.

To illustrate:

```objective-c
@interface NSArray : NSObject

+ (instancetype)arrayWithArray:(NSArray *)anArray;

- (id)objectAtIndex:(NSUInteger)index;

@property (readonly) NSUInteger count;

@end
```

```javascript
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

```javascript
const tableViewController = new UITableViewController() // returns a wrapper around a UITableViewController instance
Object.getPrototypeOf(tableViewController) === UITableViewController.prototype // returns true
```

There is only one JavaScript wrapper around an Objective-C object, always. This means that Objective-C wrappers maintain JavaScript identity equality:

```javascript
tableViewController.tableView === tableViewController.tableView
```

Calling native APIs that expect Objective-C classes or objects is easy - just pass the JavaScript constructor function for the class, or the wrapper for the object.

If an API is declared as accepting a `Class` in Objective-C, the argument in JavaScript is the constructor function:

```objective-c
NSString *className = NSStringFromClass([NSArray class]);
```

```javascript
const className = NSStringFromClass(NSArray)
```

Conversely, if an API is declared as accepting an instance of a specific class such as `NSDate`, the argument is a wrapper around an object inheriting from that class.

```objective-c
NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
NSDate *date = [NSDate date];
NSString *formattedDate = [formatter stringFromDate:date];
```

```javascript
const formatter = new NSDateFormatter()
const date = NSDate.date()
const formattedDate = formatter.stringFromDate(date)
```

An API expecting the `id` data type in Objective-C means it will any accept Objective-C class or object in JavaScript.

```objective-c
NSMutableArray *array = [[NSMutableArray alloc] init];
Class buttonClass = [UIButton class];
UIButton *button = [[buttonClass alloc] init];
[array setObject:buttonClass atIndex:0];
[array setObject:button atIndex:1];
```

```javascript
const array = new NSMutableArray()
const buttonClass = UIButton
const button = new buttonClass()
array.setObjectAtIndex(buttonClass, 0)
array.setObjectAtIndex(button, 1)
```

### Converting JavaScript array to CGFloat array

In the below-given code sample, you can see, how to convert a JavaScript array to a `CGFloat` array.
In the tabs, you will find the Objective-C code for a function accepting a `CGFloat` array as an argument and the JavaScript code for calling this native function.

```JavaScript
const CGFloatArray = interop.sizeof(interop.types.id) == 4 ? Float32Array : Float64Array;
const jsArray = [4.5, 0, 1e-5, -1242e10, -4.5, 34, -34, -1e-6];

FloatArraySample.dumpFloats(CGFloatArray.from(jsArray), jsArray.length);
```

```objective-c
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

> Note: Keep in mind that `CGFloat` is architecture dependent. On 32-bit devices, we need to use `Float32Array` and `Float64Array` -- on 64-bit ones. A straightforward way to verify the device/emulator architecture is to check the pointer size via `interop.sizeof(interop.types.id)`. The return value for the pointer size will be 4 bytes for 32-bit architectures and 8 bytes - for 64-bit ones. For further info, check out [CGFloat's documentation](https://developer.apple.com/documentation/coregraphics/cgfloat).

### Primitive Exceptions

NativeScript considers instances of `NSNull`, `NSNumber`, `NSString` and `NSDate` to be "primitives". This means that instances of these classes won't be exposed in JavaScript via a wrapper exotic object, instead they will be converted to the equivalent JavaScript data type: `NSNull` becomes `null`, `NSNumber` becomes `number` or `boolean`, `NSString` becomes `string` and `NSDate` becomes `Date`. The exception to this are the methods on those classes declared as returning `instancetype` - init methods and factory methods. This means that a call to `NSString.stringWithString` whose return type in Objective-C is `instancetype` will return a wrapper around an `NSString` instance, rather than a JavaScript string. This applies for all methods on `NSNull`, `NSNumber`, `NSString` and `NSDate` returning `instancetype`.

On the other hand, any API that expects a `NSNull`, `NSNumber`, `NSString` or `NSDate` instance in Objective-C can be called either with a wrapper object or a JavaScript value - `null`, `number` or `boolean`, `string` or `Date`, in JavaScript. The conversion is automatically handled by NativeScript.

More information on how NativeScript deals with Objective-C classes is available [here](types/ObjC-Classes.md).

### Objective-C Protocols

Protocols in Objective-C are like interfaces in other languages - they are blueprints of what members a class should contain, a sort of an API contract. Protocols are exposed as empty objects in JavaScript. Protocols are usually only referenced when [subclassing](../how-to/ObjC-Subclassing.md) an Objective-C class or when checking whether an object or class conforms to a protocol.

```objective-c
BOOL isCopying = [NSArray conformsToProtocol:@protocol(NSCopying)];
```

```javascript
const isCopying = NSArray.conformsToProtocol(NSCopying)
```

### Objective-C Selectors

In Objective-C `SEL` is a data type that represents the name of a method of an Objective-C class. NativeScript exposes this data type as a JavaScript string. Whenever an API expects a selector value in Objective-C, it's JavaScript projection will expect a string with the method name.

```objective-c
NSMutableString *aString = [[NSMutableString alloc] init];
BOOL hasAppend = [aString respondsToSelector:@selector(appendString:)];
```

```javascript
const aString = NSMutableString.alloc().init()
const hasAppend = aString.respondsToSelector('appendString:')
```

### Objective-C Blocks

[Objective-C blocks](https://developer.apple.com/library/ios/documentation/Cocoa/Conceptual/Blocks/Articles/00_Introduction.html) are anonymous functions in Objective-C. They can be closures, just like JavaScript functions, and are often used as callbacks. NativeScript implicitly exposes an Objective-C block as a JavaScript function. Any API that accepts a block in Objective-C accepts a JavaScript function when called in JavaScript:

```objective-c
NSURL *url = [NSURL URLWithString:@"http://example.com"];
NSURLRequest *request = [NSURLRequest requestWithURL:url];
[NSURLConnection sendAsynchronousRequest:request queue:nil completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
    NSLog(@"request complete");
}];
```

```javascript
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

### CoreFoundation Objects

iOS contains both an Objective-C standard library (the Foundation framework) and a pure C standard library (Core Foundation). Core Foundation is modeled after Foundation to a great extent and implements a limited object model. Data types such as CFDictionaryRef and CFBundleRef are Core Foundation objects. Core Foundation objects are retained and released just like Objective-C objects, using the CFRetain and CFRelease functions. NativeScript implements automatic memory management for functions that are annotated as returning a retained Core Foundation object. For those that are not annotated, NativeScript returns an Unmanaged type that wraps the Core Foundation instance. This makes you partially responsible for keeping the instance allive. You could either

- Call takeRetainedValue() which would return managed reference to the wrapped instance, decrementing the reference count while doing so
- Call takeUnretainedValue() which would return managed reference to the wrapped instance _without_ decrementing the reference count

### Toll-free Bridging

Core Foundation has the concept of [Toll-free bridged types](https://developer.apple.com/library/ios/documentation/CoreFoundation/Conceptual/CFDesignConcepts/Articles/tollFreeBridgedTypes.html) - data types which can be used interchangably with their Objective-C counterparts. When dealing with a toll-free bridged type NativeScript always treats it as its Objective-C counterpart. Core Foundation objects on the [toll-free bridged types list](https://developer.apple.com/library/ios/documentation/CoreFoundation/Conceptual/CFDesignConcepts/Articles/tollFreeBridgedTypes.html#//apple_ref/doc/uid/TP40010677-SW4) are exposed as if they were instances of the equivalent Objective-C class. This means that a `CFDictionaryRef` value in JavaScript has the same methods on its prototype as if it were a `NSDictionary` object. Unlike regular Core Foundation objects, toll-free bridged types are automatically memory managed by NativeScript, so there is no need to retain or release them using `CFRetain` and `CFRelease`.

### Null Values

Objective-C has three null values - `NULL`, `Nil` and `nil`. `NULL` means a regular C pointer to zero, `Nil` is a `NULL` pointer to an Objective-C class, and `nil` is a `NULL` pointer to an Objective-C object. They are implicitly converted to `null` in JavaScript. When calling a native API with a `null` argument NativeScript converts the JavaScript null value to a C pointer to zero. Some APIs require their arguments to not be pointers to zero - invoking them with null in JavaScript can potentially crash the application without a chance to recover.

### Numeric Types

Integer and floating point data types in Objective-C are converted to JavaScript numbers. This includes types such as `char`, `int`, `long`, `float`, `double`, `NSInteger` and their unsigned variants. However, integer values larger than ±2<sup>53</sup> will lose their precision because the JavaScript number type is limited in size to 53-bit integers.

### Struct Types

NativeScript exposes Objective-C structures as JavaScript objects. The properties on such an object are the same as the fields on the structure it exposes. APIs that expect a struct type in Objective-C can be called with a JavaScript object with the same shape as the structure:

```objective-c
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

```javascript
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

More information on how NativeScript deals with structures is available [here](./types/C-Structures.md).

### `NSError **` marshalling

### Native to JavaScript

```objective-c
@interface NSFileManager : NSObject
+ (NSFileManager *)defaultManager;
- (NSArray *)contentsOfDirectoryAtPath:(NSString *)path error:(NSError **)error;
@end
```

We can use this method from JavaScript in the following way:

```javascript
const fileManager = NSFileManager.defaultManager
const bundlePath = NSBundle.mainBundle.bundlePath

console.log(fileManager.contentsOfDirectoryAtPathError(bundlePath, null))
```

If we want to check the error using out parameters:

```javascript
const errorRef = new interop.Reference()
fileManager.contentsOfDirectoryAtPathError('/not-existing-path', errorRef)
console.log(errorRef.value) // NSError: "The folder '/not-existing-path' doesn't exist."
```

Or we can skip passing the **last NSError \*\*** out parameter and a JavaScript error will be thrown if the `NSError **` is set from native:

```javascript
try {
  fileManager.contentsOfDirectoryAtPathError('/not-existing-path')
} catch (e) {
  console.log(e) // NSError: "The folder '/not-existing-path' doesn't exist."
}
```

### JavaScript to Native

When overriding a method having **NSError ** out parameter in the end** any thrown JavaScript error will be wrapped and set to the `NSError **` argument (if given).

### Pointer Types

Languages in the C family have the notion of a pointer data type. A pointer is a value that points to another value, or, more accurately, to the location of that value in memory. JavaScript has no notion of pointers, but the pointer data type is used throughout the iOS SDK. To overcome this, NativeScript introduces the `Reference` object. References are special objects which allow JavaScript to reason about and access pointer values. Consider this example:

```objective-c
NSFileManager *fileManager = [NSFileManager defaultManager];
BOOL isDirectory;
BOOL exists = [fileManager fileExistsAtPath:@"/var/log" isDirectory:&isDirectory];
if (isDirectory) {
    NSLog(@"The path is actually a directory");
}
```

This snippet calls the `fileExistsAtPath:isDirectory` method of the `NSFileManager` class. This method accepts a `NSString` as its first argument and a pointer to a boolean value as its second argument. During its execution the method will use the pointer to update the boolean value. This means it will directly change the value of `isDirectory`. The same code can be written as follows:

```javascript
const fileManager = NSFileManager.defaultManager
const isDirectory = new interop.Reference()
const exists = fileManager.fileExistsAtPathIsDirectory('/var/log', isDirectory)
if (isDirectory.value) {
  console.log('The path is actually a directory')
}
```

## Multithreading & Workers

### Multithreading Model

One of NativeScript's benefits is that it allows fast and efficient access to all native platform (Android/Objective-C) APIs through JavaScript, without using (de)serialization or reflection. This however comes with a tradeoff - all JavaScript executes on the main thread (AKA the `UI thread`). That means that operations that potentially take longer can lag the rendering of the UI and make the application look and feel slow.

To tackle issues with slowness where UI sharpness and high performance are critical, developers can use NativeScript's solution to multithreading - worker threads. Workers are scripts executing on a background thread in an absolutely isolated context. Tasks that could take long to execute should be offloaded on to a worker thread.

Workers API in NativeScript is loosely based on the [Dedicated Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) and the [Web Workers Specification](https://www.w3.org/TR/workers/)

### Workers API

#### Worker Object prototype

- `new Worker(path)` - creates an instance of a Worker and spawns a new OS thread, where the script pointed to by the `path` parameter is executed.
- `postMessage(message)` - sends a JSON-serializable message to the associated script's `onmessage` event handler.
- `terminate()` - terminates the execution of the worker thread on the next run loop tick.

**Worker** Object event handlers

- `onmessage(message)` - handle incoming messages sent from the associated worker thread. The message object has the following properties:
  - `message.data` - the message's content, as sent in the worker thread's `postMessage`
- `onerror(error)` - handle uncaught errors from the worker thread. The error object exposes the following properties:
  - `error.message` - the uncaught error, and a stacktrace, if applicable
  - `error.filename` - the file where the uncaught error was thrown
  - `error.lineno` - the line where the uncaught error was thrown

### Worker Global Scope

- `self` - returns a reference to the `WorkerGlobalScope` itself
- `postMessage(message)` - sends a JSON-serializable message to the Worker instance's `onmessage` event handler on the main thread.
- `close()` - terminates the execution of the worker thread on the next run loop tick

**Worker** Global Scope event handlers

- `onmessage(message)` - handle incoming messages sent from the main thread. The message object exposes the following properties:
  - `message.data` - the message's content, as sent in the main thread's `postMessage`
- `onerror(error)` - handle uncaught errors occurring during execution of functions inside the Worker Scope (worker thread). The `error` parameter contains the uncaught error. If the handler returns a true-like value, the message will not propagate to the Worker instance's `onerror` handler on the main thread. After `onerror` is called the worker thread, execution is not terminated and the worker is still capable of sending/receiving messages.
- `onclose()` - handle any "clean-up" work; suitable for freeing up resources, closing streams and sockets.

### Sample Usage

![NativeScript Workers API](/assets/images/multithreading/Workers.png)

> Note: In order to use `console`'s methods, setTimeout/setInterval, or other functionality coming from the core-modules package, the `globals` module needs to be imported manually to bootstrap the infrastructure on the new worker thread.

main-view-model.js

```JavaScript
   ...

   const WorkerScript = require("nativescript-worker-loader!./worker-script.js");
   const worker = new WorkerScript();
   worker.postMessage({ src: imageSource, mode: 'scale', options: options });

   worker.onmessage = function(msg) {
       if (msg.data.success) {
           // Stop idle animation
           // Update Image View
           // Terminate worker or send another message

           worker.terminate();
       } else {
           // Stop idle animation
           // Display meaningful message
           // Terminate worker or send message with different parameters
       }
   }

   worker.onerror = function(err) {
       console.log(`An unhandled error occurred in worker: ${err.filename}, line: ${err.lineno} :`);
       console.log(err.message);
   }

   ...
```

workers/image-processor.js

```JavaScript
   require('globals'); // necessary to bootstrap tns modules on the new thread

   global.onmessage = function(msg) {
       const request = msg.data;
       const src = request.src;
       const mode = request.mode || 'noop'
       const options = request.options;

       const result = processImage(src, mode, options);

       const msg = result !== undefined ? { success: true, src: result } : { }

       global.postMessage(msg);
   }

   function processImage(src, mode, options) {
       console.log(options); // will throw an exception if `globals` hasn't been imported before this call

       // image processing logic

       // save image, retrieve location

       // return source to processed image
       return updatedImgSrc;
   }

   // does not handle errors with an `onerror` handler
   // errors will propagate directly to the main thread Worker instance

   // to handle errors implement the global.onerror handler:
   // global.onerror = function(err) {}
```

For details on the worker plugin check out the [nativescript-worker-loader](https://github.com/NativeScript/worker-loader) repository.

### General Guidelines

For optimal results when using the Workers API, follow these guidelines:

- Always make sure you close the worker threads, using the appropriate API (`terminate()` or `close()`), when the worker's finished its job. If Worker instances become unreachable in the scope you are working in before you are able to terminate it, you will be able to close it only from inside the worker script itself by calling the `close()` function.
- Workers are not a general solution for all performance-related problems. Starting a Worker has an overhead of its own, and may sometimes be slower than just processing a quick task. Optimize DB queries, or rethink complex application logic before resorting to workers.
- Since worker threads have access to the entire native SDK, the NativeScript developer must take care of all the synchronization when calling APIs which are not guaranteed to be thread-safe from more than one thread.

### Limitations

There are certain limitations to keep in mind when working with workers:

- No JavaScript memory sharing. This means that you can't access a JavaScript value/object from both threads. You can only serialize the object, send it to the other thread and deserialize it there. This is what postMessage() function is responsible for. However, this is not the case with native objects. You can access a native object from more than one thread, without copying it, because the runtime will create a separate JavaScript wrapper object for each thread. Keep in mind that when you are using non-thread-safe native APIs and data you have to handle the synchronization part on your own. The runtime doesn't perform any locking or synchronization logic on native data access and API calls.
- Only JSON-serializable objects can be sent with postMessage() API.
  - You can’t send native objects. This means that you can't send native objects with postMessage, because in most of the cases JSON serializing a JavaScript wrapper of a native object results in empty object literal - "{}". On the other side this message will be deserialized to a pure empty JavaScript object. Sending native object is something we want to support in the future, so stay tuned.
  - Also, be careful when sending circular objects because their recursive nodes will be stripped on the serialization step.
- No object transferring. If you are a web developer you may be familiar with the ArrayBuffer and MessagePort transferring support in browsers. Currently, in NativeScript there is no such concept as object transferring.
- Currently, you can’t debug scripts running in the context of worker thread. It will be available in the future.
- No nested workers support. We want to hear from the community if this is something we need to support.

### Demo projects

The below-attached projects demonstrate, how we could use the multithreading functionality in non-Angular NativeScript project as well as NativeScript Angular one.

[NativeScript Angular Demo](https://github.com/NativeScript/worker-loader)

## Metadata filtering

# Metadata

To allow JavaScript code to call into native iOS or Android code both NativeScript runtimes need the so called **_metadata_**. It contains all the necessary information about each of the supported native classes, interfaces, protocols, structures, enumerations, functions, variables, etc. and is generated at build time by examining the native libraries from the iOS/Android operating systems' SDKs and any third-party libraries and frameworks that are used by the {N} application. More detailed descriptions about the iOS and Android metadata format and features can be found in these two articles:

- [Android Runtime | Metadata | Metadata Overview]({% slug android-metadata-overview %})
- [iOS Runtime | Overview]({% slug ios-runtime-overview %}#metadata)

### Metadata Filtering

By default NativeScript includes all supported entities in the metadata. This allows app and plugin authors to freely call any native API from JavaScript. While it is benefitial during development, in some cases having metadata for all the APIs is undesirable. There could be security implications involved (mentioning names of entities that shouldn't be known in the metadata binary files for example); performance could be degraded at runtime (due to larger metabase which has to be consulted when an unknown entry is encountered or at startup); or app size could increase due to unnecessary metadata which is never used.

To give developers control over what to be included or not in the generated metadata there's support for black and whitelisting symbols by their native name.

### Metadata filtering rules in plugins

Plugins can declare their list of APIs that are called from JavaScript using a file named `native-api-usage.json`, located in each of the platform directories (`platforms/android` or `platforms/ios`). Its format is similar to:

```JavaScript
{
    "uses": [
      "java.util:List"
    ]
}
```

### Metadata filtering rules in apps

Applications have the final word of what filtering will be applied to metadata. They provide similar `native-api-usage.json` files, located in `App_Resources/Android` and `App_Resources/iOS`, having the following format:

```JavaScript
{
    "whitelist-plugins-usages": true,
    "whitelist": [
        "java.util:Base64*"
    ],
    "blacklist": [
        "java.util:Locale*"
    ]
}
```

### Rules syntax

Each list comprises of pattern entries with the following characteristics:

- Entries are of the form `<pattern1>[:pattern2]`
- On Android, **_pattern1_** is matched against Java package names, while the optional **_pattern2_** -- against classes, interfaces, enums.
- On iOS, **_pattern1_** is matched against Clang module/submodule names, while the optional **_pattern2_** -- against structs, global functions, enums, Objective-C interfaces, protocols, categories, constants, etc.
- Patterns support wildcards (**"\*"** - any number of characters and **"?"** - any single character).
- An unspecified or empty pattern is equivalent to being set to **"\*"** (matching everything)

### Rules semantics

After analyzing the filtering rules for a platform, {N} CLI builds final whitelist and blacklist files and outputs them in the native project to be used by the corresponding metadata generator. The blacklist is always equal to the one specified by the app. While the whitelist depends on the `whitelist-plugins-usages` flag:

- If it is `true`, the final whitelist is a concatenation of all plugins' usage lists with the app's whitelist
- Otherwise, it is equal to the app's whitelist

These two lists unambigously determine how filtering is performed:

1. If the whitelist is empty, then everything is considered whitelisted by default
2. If it contains at least one rule, only entities matching a rule are considered whitelisted
3. All entities which are not whitelisted or match a rule in the blacklist are stripped from metadata
4. All other entities are included in the metadata

### Examples

Sample filtering specifications can be found in `@nativescript/core` plugin's repository:

- [Plugin's Android API usage list](https://github.com/NativeScript/NativeScript/blob/master/nativescript-core/platforms/android/native-api-usage.json)
- [Plugin's iOS API usage list](https://github.com/NativeScript/NativeScript/blob/master/nativescript-core/platforms/ios/native-api-usage.json)
- [App's Andoroid API usage lists](https://github.com/NativeScript/NativeScript/blob/master/tests/app/App_Resources/Android/native-api-usage.json)
- [App's iOS API usage lists](https://github.com/NativeScript/NativeScript/blob/master/tests/app/App_Resources/iOS/native-api-usage.json)

### Troubleshooting

Missing metadata entities could result in bugs at runtime. For example, if a native class has been accidentally filtered out, its constructor function will be `undefined` and this will lead to an exception when its attempted to be called. Figuring out what is the reason for something being `undefined` could be quite difficult because the reasons can vary. To check whether metadata filtering is to blame or not you should examine metadata generator's verbose logs after a successful build:

- On iOS they are located in `platforms/ios/build/<configuration>-<platform>/metadata-generation-stderr-<arch>.txt` (e.g. `platforms/ios/build/Debug-iphonesimulator/metadata-generation-stderr-x86_64.txt`);
- On Android they are located in `platforms/android/build-tools/buildMetadata.log`

For each global symbol that is discovered by the generator, there should be a line providing information whether it was included in metadata or not, and which rules or what exception caused this. Examples:

- `verbose: Blacklisted kCFBuddhistCalendar from CoreFoundation.CFLocale (disabled by 'CoreFoundation*:*')` - when there are no whitelist rules a blacklisted symbol will show only the rule which disabled it
- `verbose: Blacklisted NSString from Foundation.NSString` - when there is at least one whitelist rule, some blacklisted symbols will not specify a rule. This means that the symbol didn't match any of the whitelist rules.
- `verbose: Blacklisted PHImageContentModeDefault from Photos.PhotosTypes (enabled by 'Photos.PhotosTypes:*', disabled by 'Photos.PhotosTypes:PHImageContentMode*')`, `verbose: Blacklisted String from java.lang (enabled by java.lang:*, disabled by java.lang:String)` - a blacklisted entry which matches both a whitelist rule and a blacklist rule will specify both.
- `verbose: Included NSObject from ObjectiveC.NSObject` - when there are no whitelist rules an included symbol won't specify a rule which caused it to be included
- `verbose: Included PHCollectionListType from Photos.PhotosTypes (enabled by 'Photos.PhotosTypes:*')`, `verbose: Included StrictMath from java.lang (enabled by java.lang:*)` - when a symbol is included because it matched a rule from the whitelist (and didn't match any from the blacklist) it will print that rule
- `verbose: Exception [Name: 'vfwprintf', JsName: 'vfwprintf', Module: 'Darwin.C.wchar', File: '/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator13.2.sdk/usr/include/wchar.h'] : Can't create type dependency. --> [Type Decayed] : Can't create type dependency. --> [Type Typedef] : VaList type is not supported.` - if a symbol is not included because it isn't supported for some reason it will be stated in the logged exception. In this case the symbol cannot be used from JavaScript because {N} doesn't support calling functions with variable argument lists.
- `verbose: Exception [Name: 'GLKVector3Make', JsName: 'GLKVector3Make', Module: 'GLKit.GLKVector3', File: '/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator13.2.sdk/System/Library/Frameworks/GLKit.framework/Headers/GLKVector3.h'] : Can't create type dependency. --> [Type Typedef] : Can't create type dependency. --> [Type Elaborated] : Can't create type dependency. --> [Type Record] : The record is an union.` - Another example of an unsupported symbol, this time the reason is that `union`s are unsupported
