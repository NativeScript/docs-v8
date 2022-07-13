---
title: Utils
---

## Utils overview

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

| Name                                             | Return Type                | Description                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GC()`                                           | `any`                      | A utility function that invokes garbage collection on the JavaScript side.                                                                                                                                                                                                                                                                       |
| `queueMacrotask(task: () => void)`               | `any`                      | A utility function that invokes garbage collection on the JavaScript side. <br> `task` :the function to execute as a macroTask.                                                                                                                                                                                                                  |
| `queueGC(delay?: number, useThrottle?: boolean)` | `any`                      | An utility function that queues a garbage collection, multiple calls in quick succession are debounced by default and only one gc will be executed after 900ms. <br> `delay`: Customize the delay.<br> `useThrottle`: Instead of default debounce strategy, use throttling.                                                                      |
| `debounce(fn: any, delay?: number)`              | `any`                      | A simple debounce utility.<br> `fn`:Function to debounce. <br> `delay`: Customize the delay (default is 300ms).                                                                                                                                                                                                                                  |
| `throttle(fn: any, delay?: number)`              | `any`                      | A simple throttle utility.<br> `fn`: Function to throttle. <br> `delay`: Customize the delay (default is 300ms).                                                                                                                                                                                                                                 |
| `isFontIconURI(uri: string)`                     | `boolean`                  | Returns true if the specified URI is a font icon URI like "fontIcon://&#xf1e0". `uri`: The URI.                                                                                                                                                                                                                                                  |
| `executeOnMainThread(func: Function)`            | `any`                      | Checks if the current thread is the main thread. Directly calls the passed function if it is, or dispatches it to the main thread otherwise. <br> `func`: The function to execute on the main thread.                                                                                                                                            |
| `executeOnUIThread(func: Function)`              | `any`                      | Runs the passed function on the UI Thread.<br> `func`: The function to execute on the UI thread.                                                                                                                                                                                                                                                 |
| `mainThreadify(func: Function)`                  | `(...args: any[]) => void` | Returns a function wrapper which executes the supplied function on the main thread. The wrapper behaves like the original function and passes all of its arguments BUT discards its return value.<br> `func`: The function to execute on the main thread. The function returns the wrapper function which schedules execution to the main thread |
| `isMainThread()`                                 | `boolean`                  | Returns a boolean value indicating whether the current thread is the main thread.                                                                                                                                                                                                                                                                |
| `dispatchToMainThread(func: Function)`           | `any`                      | Dispatches the passed function for execution on the main thread. <br> `func`: The function to execute on the main thread.                                                                                                                                                                                                                        |
| `releaseNativeObject(object: any)`               | `any`                      | Releases the reference to the wrapped native object.                                                                                                                                                                                                                                                                                             |
| `getModuleName(path: string)`                    | `string`                   | Gets module name from `path`. <br> `path` : The module path.                                                                                                                                                                                                                                                                                     |
| `openFile(filePath: string, title?: string)`     | `boolean`                  | Opens file. <br> `filePath`: The file to open. <br> `title`:Optional title for Android. Default is: 'Open File...'                                                                                                                                                                                                                               |
| `isRealDevice()`                                 | `boolean`                  | Checks whether the application is running on real device and not on simulator/emulator.                                                                                                                                                                                                                                                          |

## Android specific utilities

### Utils.ad functions

Module with android specific utilities.

| Name                                               | Return Type                                   | Description                                           |
| -------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `getApplication()`                                 | `android.app.Application`                     | Gets the native Android application instance.         |
| `getApplicationContext()`                          | `android.content.Context`                     | Gets the Android application context.                 |
| `getInputMethodManager()`                          | `android.view.inputmethod.InputMethodManager` | Gets the native Android input method manager.         |
| `dismissSoftInput(nativeView?: android.view.View)` | `void`                                        | Hides the soft input method, usually a soft keyboard. |
| `showSoftInput(nativeView?: android.view.View)`    | `void`                                        | Shows the soft input method, usually a soft keyboard. |

### Utils.ad.resources functions

| Name                                                              | Return Type | Description                                                                                                                   |
| ----------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `getDrawableId(name)`                                             | `any`       | Gets the drawable id from a given name.<br> `name`: Name of the resource. Example: `Utils.ad.resources.getDrawableId("logo")` |
| `getStringId(name)`                                               | `any`       | Gets the string id from a given name.<br> `name`: Name of the resource.                                                       |
| `getId(name: string)`                                             | `number`    | Gets the id from a given name. <br> `name`: Name of the resource.                                                             |
| `getPaletteColor(name: string, context: android.content.Context)` | `number`    | Gets a color from the current theme. <br> `name`: Name of the color resource.                                                 |

### API Reference

| Name                                                                                  | Type     |
| ------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/utils](https://docs.nativescript.org/api-reference/modules#utils) | `Module` |
