---
title: FileSystem
---

## FileSystem

The File System module provides high-level abstractions for file system entities such as files, folders, known folders, paths, separators, etc.

## Usage

### Import

```javascript
import { File, Folder, knownFolders, path } from '@nativescript/core'
```

```typescript
import { File, Folder, knownFolders, path } from '@nativescript/core'
```

#### view model

```javascript
let vm
export function createViewModel() {
  vm = new Observable()
  return vm
}
```

### Create a File

```javascript
function createFile() {
  const documents = knownFolders.documents()
  const folder = documents.getFolder(vm.get('folderName') || 'testFolder')
  const file = folder.getFile(`${vm.get('fileName') || 'testFile'}`.txt)

  file
    .writeText(vm.get('fileTextContent') || 'some random content')
    .then(result => {
      file.readText().then(res => {
        vm.set('successMessage', `Successfully saved in${file.path}`)
        vm.set('message', res)
        vm.set('isItemVisible', true)
      })
    })
    .catch(err => {
      console.log(err)
    })
}
```

```typescript
const documents: Folder = <Folder>knownFolders.documents()
const folder: Folder = <Folder>documents.getFolder(vm.get('folderName') || 'testFolder')
const file: File = <File>folder.getFile(`${vm.get('fileName') || 'testFile'}` + `.txt`)

file
  .writeText(vm.get('fileTextContent') || 'some random content')
  .then(() => {
    file.readText().then(res => {
      vm.set('successMessage', `Successfully saved in${file.path}`)
      vm.set('writtenContent', res)
      vm.set('isItemVisible', true)
    })
  })
  .catch(err => {
    console.log(err)
  })
```

### Remove a File

```javascript
file
  .remove()
  .then(res => {
    // Success removing the file.
    vm.set('resultMessage', 'File successfully deleted!')
  })
  .catch(err => {
    console.log(err.stack)
  })
```

```typescript
file
  .remove()
  .then(res => {
    // Success removing the file.
    vm.set('resultMessage', 'File successfully deleted!')
  })
  .catch(err => {
    console.log(err.stack)
  })
```

### Remove a Folder

```javascript
folder
  .remove()
  .then(fres => {
    // Success removing the folder.
    vm.set('resultMessage', 'Folder successfully deleted!')
  })
  .catch(err => {
    console.log(err.stack)
  })
```

```typescript
folder
  .remove()
  .then(fres => {
    // Success removing the folder.
    vm.set('resultMessage', 'Folder successfully deleted!')
  })
  .catch(err => {
    console.log(err.stack)
  })
```

### Clear the contents of a Folder

```javascript
folder
  .clear()
  .then(res => {
    // Successfully cleared the folder.
    vm.set('resultMessage', 'Folder successfully cleared!')
  })
  .catch(err => {
    console.log(err.stack)
  })
```

```typescript
folder
  .clear()
  .then(res => {
    // Successfully cleared the folder.
    vm.set('resultMessage', 'Folder successfully cleared!')
  })
  .catch(err => {
    console.log(err.stack)
  })
```

### Get or create a File with Path

```javascript
const documentsFolder = knownFolders.documents()
const path = path.join(documentsFolder.path, 'FileFromPath.txt')
const file = File.fromPath(path)

// Writing text to the file.
file
  .writeText(vm.get('textContentToBeSaved'))
  .then(result => {
    // Succeeded writing to the file.
    file.readText().then(res => {
      // Succeeded read from file.
      vm.set('isContentSaved', true)
      vm.set('savedContent', res)
      console.log(`File content:  ${res}`)
    })
  })
  .catch(err => {
    console.log(err.stack)
  })
```

```typescript
const documentsFolder = knownFolders.documents()
const path = path.join(documentsFolder.path, 'FileFromPath.txt')
const file = File.fromPath(path)

// Writing text to the file.
file
  .writeText(vm.get('textContentToBeSaved'))
  .then(result => {
    // Succeeded writing to the file.
    file.readText().then(res => {
      // Succeeded read from file.
      vm.set('isContentSaved', true)
      vm.set('savedContent', res)
      console.log(`File content:  ${res}`)
    })
  })
  .catch(err => {
    console.log(err.stack)
  })
```

### Reading from a File

```javascript
file
  .readText()
  .then(res => {
    vm.set('writtenContent', res)
  })
  .catch(err => {
    console.log(err.stack)
  })
```

```typescript
file
  .readText()
  .then(res => {
    vm.set('writtenContent', res)
  })
  .catch(err => {
    console.log(err.stack)
  })
```

### Reading binary data from a File

```javascript
import { ImageSource } from '@nativescript/core'

const image = ImageSource.fromResource('icon')
const folder = knownFolders.documents()
const path = path.join(folder.path, 'Test.png')
const saved = image.saveToFile(path, 'png')

if (saved) {
  const imageFile = File.fromPath(path)
  const binarySource = imageFile.readSync(err => {
    console.log(err)
  })
}
```

```typescript
import { ImageSource } from '@nativescript/core'

const image = ImageSource.fromResource('icon')
const folder = knownFolders.documents()
const path = path.join(folder.path, 'Test.png')
const saved = image.saveToFile(path, 'png')

if (saved) {
  const imageFile = File.fromPath(path)
  const binarySource = imageFile.readSync(err => {
    console.log(err)
  })
}
```

### Checking if a File Exists

```javascript
const documents = knownFolders.documents()
const path = path.join(documents.path, 'Text.txt')
const exists = File.exists(path)
console.log(`Does Text.txt exists: ${exists}`)
```

```typescript
const documents = knownFolders.documents()
const path = path.join(documents.path, 'Text.txt')
const exists = File.exists(path)
console.log(`Does Text.txt exists: ${exists}`)
```

### Renaming a File

```javascript
const fileName = vm.get("fileName");
file.rename(`${fileName}.txt`)
    .then((res) => {
        // File Successfully Renamed.
        vm.set("fileSuccessMessage", `File renamed to:  ${fileName}.txt`);
        vm.set("isItemVisible", true);
    }).catch((err) => {
        // Error!
        console.log("Error: ");
        console.log(err);

        .then(() => {
            console.log("Dialog closed!");
        });
    });
```

```typescript
const fileName: string = vm.get("fileName");
file.rename(`${fileName}.txt`)
    .then(() => {
        // File Successfully Renamed.
        vm.set("fileSuccessMessage", `File renamed to:  ${fileName}.txt`);
        vm.set("isItemVisible", true);
    }).catch((err) => {
        // Error!
        console.log("Error: ");
        console.log(err);
            .then(() => {
                console.log("Dialog closed!");
            });
    });
```

### Get or Create a Folder With Path

```javascript
const folderPath = path.join(knownFolders.documents().path, 'music')
const folder = Folder.fromPath(folderPath)
```

```typescript
const folderPath = path.join(knownFolders.documents().path, 'music')
const folder = Folder.fromPath(folderPath)
```

### Renaming a Folder

```javascript
const folderName = "folderName";

folder.rename(folderName)
    .then((res) => {
        // Folder Successfully Renamed.
        vm.set("folderSuccessMessage", `Folder renamed to:  ${folderName}`);
        vm.set("isFolderItemVisible", true);
    }).catch((err) => {
        // Error!
        console.log("Error: ");
        console.log(err);
        .then(() => {
            console.log("Dialog closed!");
        });
    });
```

```typescript
const folderName = "folderName";

folder.rename(folderName)
    .then((res) => {
        // Folder Successfully Renamed.
        vm.set("folderSuccessMessage", `Folder renamed to:  ${folderName}`);
        vm.set("isFolderItemVisible", true);
    }).catch((err) => {
        // Error!
        console.log("Error: ");
        console.log(err);
        .then(() => {
            console.log("Dialog closed!");
        });
    });
```

### Properties

| Name      | Type      | Description                                                                                                                                       |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a`       | `string`  | Gets the Alpha component (in the [0, 255] range) of thecolor. This is a read-only property.                                                       |
| `r`       | `string`  | Gets the Red component (in the [0, 255] range) of the color. This is a read-only property.                                                        |
| `g`       | `string`  | Gets the Green component (in the [0, 255] range) of the color. This is a read-only property.                                                      |
| `b`       | `string`  | Gets the Blue component (in the [0, 255] range) of the color. This is a read-only property.                                                       |
| `argb`    | `number`  | Gets the Argb Number representation of this color where each 8 bits represent a single color component. This is a read-only property.             |
| `hex`     | `string`  | Gets the Hexadecimal string representation of the color. This is a read-only property                                                             |
| `name`    | `string`  | Gets the known name of this instance. Defined only if it has been constructed from a known color name - e.g. "red". This is a read-only property. |
| `android` | `number`  | Gets the android-specific integer value representation. Same as the Argb one. This is a read-only property.                                       |
| `ios`     | `UIColor` | Gets the iOS-specific UIColor value representation. This is a read-only property.                                                                 |

### Static Methods

| Name                                                | Return Type | Description                                                  |
| --------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `equals(value1: Color, value2: Color)`              | `boolean`   | Compares two `Color` instances                               |
| `isValid(value: any)`                               | `boolean`   | Validates if a value can be converted to a color.            |
| `fromIosColor(value: UIColor)`                      | `Color`     | Creates color from iOS-specific UIColor value representation |
| `mix(color1: Color, color2: Color, amount: number)` | `Color`     | Mixes                                                        |
| `fromHSL(a, h, s, l)`                               | `Color`     | Returns a new `Color` from HSL.                              |
| `fromHSV(a, h, s, l)`                               | `Color`     | Returns a new `Color` from HSV.                              |

### Instance Methods

| Name                                                        | Return Type                                      | Description                                                                                                                                                |
| ----------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `equals(value: Color)`                                      | `boolean`                                        | Specifies whether the created Color is equal to the Color parameter.                                                                                       |
| `isDark()`                                                  | `boolean`                                        | Returns true if `brightenss < 128`                                                                                                                         |
| `isLight()`                                                 | `boolean`                                        | Returns true if `brightenss >= 128`                                                                                                                        |
| `getBrightness()`                                           | `number`                                         | Returns the [brightness](http://www.w3.org/TR/AERT#color-contrast).                                                                                        |
| `getLuminance()`                                            | `number`                                         | Returns the [luminance](http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef).                                                              |
| `setAlpha(a: number)`. `a` is a value between `0` and `255` | `Color`                                          | Return the created color (as a new Color instance) with the provided alpha                                                                                 |
| `toHsl()`                                                   | `{ h: number; s: number; l: number; a: number }` | Return the hsl representation of the color.                                                                                                                |
| `toHslString()`                                             | `string`                                         | Returns the [CSS hsv](https://www.w3schools.com/Css/css_colors_hsl.asp) representation of the color                                                        |
| `toHsv()`                                                   | `{ h: number; s: number; v: number; a: number }` | Returns the hsv representation of the color.                                                                                                               |
| `toHsvString()`                                             | `string`                                         | Returns the [CSS rgb](https://www.w3schools.com/Css/css_colors_rgb.asp) representation of the color                                                        |
| `desaturate(amount: number)`                                | `Color`                                          | Desaturates the color a given amount, from `0` to `100`. Providing `100` is the same as calling greyscale.                                                 |
| `saturate(amount: number)`                                  | `Color`                                          | Saturates the color a given amount, from `0` to `100`.                                                                                                     |
| `greyscale()`                                               | `Color`                                          | Completely desaturates a color into greyscale. Same as calling `desaturate(100)`                                                                           |
| `lighten()`                                                 | `Color`                                          | Lightens the color a given amount, from `0` to `100`. Providing `100` will always return white.                                                            |
| `brighten(amount: number)`                                  | `Color`                                          | Brightens the color a given amount, from `0` to `100`.                                                                                                     |
| `darken(amount:number)`                                     | `Color`                                          | Darkens the color a given amount, from `0` to `100`. Providing `100` will always return `black`.                                                           |
| `spin(amount: number)`                                      | `Color`                                          | Spins the hue a given amount, from `-360` to `360`. Calling with `0`, `360`, or `-360` will do nothing (since it sets the hue back to what it was before). |
| `complement()`                                              | `Color`                                          | Returns the color complement                                                                                                                               |

## Usage

```javascript
import { Color } from '@nativescript/core'

function createColor() {
  // Using hex values to create color;
  const colorHex = new Color('#FF00CC')
  const colorShortHex = new Color('#F0C')

  // Creates the color with 100 alpha, 255 red, 100 green, 100 blue
  const colorARGB = new Color(100, 255, 100, 100)

  // Creates the color with 100 alpha, 100 red, 100 green, 100 blue
  const argb = (100 << 24) | (100 << 16) | (100 << 8) | 100 //eslint-disable-line no-bitwise
  const colorSingleARGB = new Color(argb)
}
```

```typescript
import { Color } from '@nativescript/core'

function createColor() {
  // Using hex values to create color;
  const colorHex = new Color('#FF00CC')
  const colorShortHex = new Color('#F0C')

  // Creates the color with 100 alpha, 255 red, 100 green, 100 blue
  const colorARGB = new Color(100, 255, 100, 100)

  // Creates the color with 100 alpha, 100 red, 100 green, 100 blue
  const argb = (100 << 24) | (100 << 16) | (100 << 8) | 100
  const colorSingleARGB = new Color(argb)
}
```

## Native Component

| Android                                                                                  | iOS                                                                              |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| [android.graphics.Color](https://developer.android.com/reference/android/graphics/Color) | [UICOlor](https://developer.apple.com/documentation/uikit/uicolor?language=objc) |
