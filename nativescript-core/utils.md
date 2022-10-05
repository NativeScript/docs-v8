---
title: Utils
---

## Utils overview

`Utils` provides you with different utilities properties and functions.

## Usage

### Import

```javascript
import { Utils } from '@nativescript/core'
```

```typescript
import { Utils } from '@nativescript/core'
```

### isFileOrResourcePath(path)

Verifies if the specified `path` is a valid resource or local file path.

```javascript
let isPathValid
let path
path = 'https://thiscatdoesnotexist.com/' // Remote cat image
isPathValid = Utils.isFileOrResourcePath(path)
console.log(isPathValid) // isPathValid => false

path = 'res://icon'
isPathValid = Utils.isFileOrResourcePath(path)
console.log(isPathValid) // isPathValid => true
```

```typescript
let isPathValid: boolean
let path: string
path = 'https://thiscatdoesnotexist.com/' // Remote cat image
isPathValid = Utils.isFileOrResourcePath(path)
console.log(isPathValid) // isPathValid => false

path = 'res://icon'
isPathValid = Utils.isFileOrResourcePath(path)
console.log(isPathValid) // isPathValid => true
```

### isDataURI(uri)

Returns true if the specified URI is data URI (http://en.wikipedia.org/wiki/Data_URI_scheme).

```javascript
let uri = '<uri>'
let value = Utils.isDataURI(uri)
```

```typescript
let uri: string = '<uri>'
let value: boolean = Utils.isDataURI(uri)
```

### openUrl(url)

Opens a `url`. Returns `true` if the url is successfully opened. False otherwise.

```javascript
Utils.openUrl('https://thiscatdoesnotexist.com/')
```

```typescript
Utils.openUrl('https://thiscatdoesnotexist.com/')
```

### escapeRegexSymbols() function

Escapes special regex symbols (., \*, ^, $, etc.) in string in order to create a valid regex from it.

```javascript
Utils.openUrl('https://thiscatdoesnotexist.com/')
```

```typescript
Utils.openUrl('https://thiscatdoesnotexist.com/')
```

### escapeRegexSymbols(sampleString)

```javascript
var sampleString = 'All of these should be escaped: ^ $ * '
var newString = Utils.escapeRegexSymbols(sampleString)
console.log(newString) // All of these should be escaped: \^ \$ \*
```

```typescript
var sampleString = 'All of these should be escaped: ^ $ * '
var newString: string = Utils.escapeRegexSymbols(sampleString)
console.log(newString) // All of these should be escaped: \^ \$ \*
```

### convertString(value:any)

Converts a string value to a number or boolean;

```javascript
let stringToBoolean = 'true'
let booleanValue = Utils.convertString(stringToBoolean)
console.log(booleanValue) // logs true

let stringToNumber = '23'
let numberValue = Utils.convertString(stringToNumber)
console.log(numberValue) // logs 23
```

```typescript
let stringToBoolean = 'true'
let booleanValue: boolean = Utils.convertString(stringToBoolean)
console.log(booleanValue) // logs true

let stringToNumber = '23'
let numberValue: number = Utils.convertString(stringToNumber)
console.log(numberValue) // logs 23
```

## Other functions

| Name                                                  | Return Type                | Description                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GC()`                                                | `any`                      | A utility function that invokes garbage collection on the JavaScript side.                                                                                                                                                                                                                                                                       |
| `queueMacrotask(task: () => void)`                    | `any`                      | A utility function that invokes garbage collection on the JavaScript side. <br> `task` :the function to execute as a macroTask.                                                                                                                                                                                                                  |
| `queueGC(delay?: number, useThrottle?: boolean)`      | `any`                      | An utility function that queues a garbage collection, multiple calls in quick succession are debounced by default and only one gc will be executed after 900ms. <br> `delay`: Customize the delay.<br> `useThrottle`: Instead of default debounce strategy, use throttling.                                                                      |
| `debounce(fn: any, delay?: number)`                   | `any`                      | A simple debounce utility.<br> `fn`:Function to debounce. <br> `delay`: Customize the delay (default is 300ms).                                                                                                                                                                                                                                  |
| `throttle(fn: any, delay?: number)`                   | `any`                      | A simple throttle utility.<br> `fn`: Function to throttle. <br> `delay`: Customize the delay (default is 300ms).                                                                                                                                                                                                                                 |
| `isFontIconURI(uri: string)`                          | `boolean`                  | Returns true if the specified URI is a font icon URI like "fontIcon://&#xf1e0". `uri`: The URI.                                                                                                                                                                                                                                                  |
| `executeOnMainThread(func: Function)`                 | `any`                      | Checks if the current thread is the main thread. Directly calls the passed function if it is, or dispatches it to the main thread otherwise. <br> `func`: The function to execute on the main thread.                                                                                                                                            |
| `executeOnUIThread(func: Function)`                   | `any`                      | Runs the passed function on the UI Thread.<br> `func`: The function to execute on the UI thread.                                                                                                                                                                                                                                                 |
| `mainThreadify(func: Function)`                       | `(...args: any[]) => void` | Returns a function wrapper which executes the supplied function on the main thread. The wrapper behaves like the original function and passes all of its arguments BUT discards its return value.<br> `func`: The function to execute on the main thread. The function returns the wrapper function which schedules execution to the main thread |
| `isMainThread()`                                      | `boolean`                  | Returns a boolean value indicating whether the current thread is the main thread.                                                                                                                                                                                                                                                                |
| `dispatchToMainThread(func: Function)`                | `any`                      | Dispatches the passed function for execution on the main thread. <br> `func`: The function to execute on the main thread.                                                                                                                                                                                                                        |
| `releaseNativeObject(object: any)`                    | `any`                      | Releases the reference to the wrapped native object.                                                                                                                                                                                                                                                                                             |
| `getModuleName(path: string)`                         | `string`                   | Gets module name from `path`. <br> `path` : The module path.                                                                                                                                                                                                                                                                                     |
| `openFile(filePath: string, title?: string)`          | `boolean`                  | Opens file. <br> `filePath`: The file to open. <br> `title`:Optional title for Android. Default is: 'Open File...'                                                                                                                                                                                                                               |
| `isRealDevice()`                                      | `boolean`                  | Checks whether the application is running on real device and not on simulator/emulator.                                                                                                                                                                                                                                                          |
| `getClass()`                                          | `string`                   | A function that gets the class name of an object. Examples: <br> `console.log(Utils.getClass({}))` logs `"Object"` <br> `console.log(Utils.getClass([]))` logs `"Array"` <br> `console.log(Utils.getClass(2))` logs `"Number"`                                                                                                                   |
| `getBaseClasses(object: any)`                         | `Array<string>`            | A function that gets the entire class hierarchy of an object.                                                                                                                                                                                                                                                                                    |
| `getClassInfo(object: Object)`                        | `ClassInfo`                | A function that gets the ClassInfo for an object.                                                                                                                                                                                                                                                                                                |
| `isBoolean(value: any)`                               | `boolean`                  | A function that checks if something is a valid boolean.                                                                                                                                                                                                                                                                                          |
| `isDefined(value: any)`                               | `boolean`                  | A function that checks if something is defined (not undefined).                                                                                                                                                                                                                                                                                  |
| `isFunction(value:any)`                               | `boolean`                  | A function that checks if something is a function.                                                                                                                                                                                                                                                                                               |
| `isNullOrUndefined(value:any)`                        | `boolean`                  | A function that checks if something is not defined (null or undefined).                                                                                                                                                                                                                                                                          |
| `isNumber(value:any)`                                 | `boolean`                  | A function that checks if something is a valid number.                                                                                                                                                                                                                                                                                           |
| `isObject(value:any)`                                 | `boolean`                  | A function that checks if something is an object. Examples: <br> `console.log(Utils.isObject(""))` logs `false` <br> `console.log(Utils.isObject([]))` logs `true`                                                                                                                                                                               |
| `isString(value:any)`                                 | `boolean`                  | A function that checks if something is a valid string.                                                                                                                                                                                                                                                                                           |
| `isUndefined(value:any)`                              | `boolean`                  | A function that checks if something is "undefined".                                                                                                                                                                                                                                                                                              |
| `toUIString(object: any)`                             | `string`                   | Returns a string representation of an object to be shown in UI.                                                                                                                                                                                                                                                                                  |
| `verifyCallback(value: any)`                          | `void`                     | A function that checks if something is a valid function. Throws exception if passed value is not a valid function.                                                                                                                                                                                                                               |
| `dataSerialize(data?: any, wrapPrimitives?: boolean)` | `any`                      | Data serialization from JS > Native. <br>`wrapPrimitives`: Optionally wrap primitive types (Some APIs may require this)                                                                                                                                                                                                                          |
| `dataDeserialize(nativeData?: any)`                   | `any`                      | Data deserialization from Native > JS. <br>`nativeData`: Native platform data                                                                                                                                                                                                                                                                    |

## Timer utilities

### Setting & clearing interval

`Utils.setInterval()` can be used to apply recurring action on given interval in miliseconds. To stop `Utils.setInterval()`, use `Utils.clearInterval()`.

```js
let counter = 0
const interval = Utils.setInterval(() => {
  console.log('Hello' + counter)

  if (counter > 10) {
    Dialogs.alert('Condition met')
    Utils.clearInterval(interval)
  }
  counter++
}, 1000)
```

```ts
let counter = 0
const interval = Utils.setInterval(() => {
  console.log('Hello' + counter)

  if (counter > 10) {
    Dialogs.alert('Condition met')
    Utils.clearInterval(interval)
  }
  counter++
}, 1000)
```

### Setting Timeout

`Utils.setTimeout()` can be used to delay the execution of an action in miliseconds.

```js
Utils.setTimeout(() => {
  Dialogs.alert('Hello there! 500 milliseconds have passed.')
}, 500)
```

```ts
Utils.setTimeout(() => {
  Dialogs.alert('Hello there! 500 milliseconds have passed.')
}, 500)
```

## Android specific utilities

### Utils.android functions

Module with android specific utilities.

| Name                                               | Return Type                                   | Description                                           |
| -------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `getApplication()`                                 | `android.app.Application`                     | Gets the native Android application instance.         |
| `getApplicationContext()`                          | `android.content.Context`                     | Gets the Android application context.                 |
| `getInputMethodManager()`                          | `android.view.inputmethod.InputMethodManager` | Gets the native Android input method manager.         |
| `dismissSoftInput(nativeView?: android.view.View)` | `void`                                        | Hides the soft input method, usually a soft keyboard. |
| `showSoftInput(nativeView?: android.view.View)`    | `void`                                        | Shows the soft input method, usually a soft keyboard. |

### Utils.android.collections functions

Utility module dealing with some android collections.

| Name                                     | Return Type | Description                                                                                                           |
| ---------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `stringArrayToStringSet(str: string[])`  | `any`       | Converts an array of strings into a String [hash set](http://developer.android.com/reference/java/util/HashSet.html). |
| `stringSetToStringArray(stringSet: any)` | `string[]`  | Converts a string hash set into array of strings.                                                                     |

### Utils.android.resources functions

Utility module related to android resources.

| Name                                                              | Return Type | Description                                                                                                                        |
| ----------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `getDrawableId(name)`                                             | `any`       | Gets the drawable id from a given name.<br> `name`: Name of the resource. Example: `Utils.android.resources.getDrawableId("logo")` |
| `getStringId(name)`                                               | `any`       | Gets the string id from a given name.<br> `name`: Name of the resource.                                                            |
| `getId(name: string)`                                             | `number`    | Gets the id from a given name. <br> `name`: Name of the resource.                                                                  |
| `getPaletteColor(name: string, context: android.content.Context)` | `number`    | Gets a color from the current theme. <br> `name`: Name of the color resource.                                                      |

## iOS specific utilities

### Utils.ios propeties

| Name           | Return Type | Description                                                |
| -------------- | ----------- | ---------------------------------------------------------- |
| `MajorVersion` | `number`    | Gets the iOS device major version (for 8.1 will return 8). |

### Utils.ios functions

| Name                                                                 | Return Type        | Description                                                                                                                                                                                                    |
| -------------------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `joinPaths(...paths: string[])`                                      | `string`           | Joins an array of file paths aeturns the joined path.                                                                                                                                                          |
| `getCurrentAppPath()`                                                | `string`           | Gets the root folder for the current application. This Folder is private for the application and not accessible from Users/External apps. This folder is read-only and contains the app and all its resources. |
| `getVisibleViewController(rootViewController: UIViewController)`     | `UIViewController` | Gets the currently visible(topmost) UIViewController. <br> `rootViewController`: The root UIViewController instance to start searching from (normally window.rootViewController).                              |
| `getShadowLayer(nativeView:UIView, name?: string, create?: boolean)` | `CALayer`          | `nativeView`: UIView to find shadow layer with. <br> `name`: Name of the shadow layer if looking for specifically named layer. <br> `create`: should we create a new layer if not found.                       |
| `createUIDocumentInteractionControllerDelegate()`                    | `any`              | Create a UIDocumentInteractionControllerDelegate implementation for use with UIDocumentInteractionController.                                                                                                  |

### Utils.ios.collections

Utility module dealing with some iOS collections.

| Name                                 | Return Type  | Description                                                                                                                                      |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `jsArrayToNSArray<T>(str: T[])`      | `NSArray<T>` | Converts JavaScript array to [NSArray](https://developer.apple.com/library/ios/documentation/Cocoa/Reference/Foundation/Classes/NSArray_Class/). |
| `nsArrayToJSArray<T>(a: NSArray<T>)` | `T[]`        | Converts NSArray to JavaScript array.                                                                                                            |

### API Reference

| Name                                                                                  | Type     |
| ------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/utils](https://docs.nativescript.org/api-reference/modules#utils) | `Module` |
