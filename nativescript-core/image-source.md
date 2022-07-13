---
title: ImageSource
---

## ImageSource

This class encapsulates the common abstraction behind a platform specific object (typically a Bitmap for Android and a UIImage for iOS) that is used as a source for images.

## Usage

### Import

```javascript
import { ImageSource } from '@nativescript/core'
```

```typescript
import { ImageSource } from '@nativescript/core'
```

### Load image using resource name

This is similar to loading Bitmap from R.drawable.logo on Android or calling [UIImage imageNamed@"logo"] on iOS. The method `fromResource('name')` creates an ImageSource instance and loads it afrom the specified resource name.

#### Parameter(s)

| Name   | Type     | Description                                       |
| ------ | -------- | ------------------------------------------------- |
| `name` | `string` | The name of the resource (without its extension). |

```javascript
ImageSource.fromResource('logo')
  .then(image => {
    console.log(image.width)
  })
  .catch(err => {
    console.error(err.stack)
  })
```

```typescript
ImageSource.fromResource('logo')
  .then((image: ImageSource) => {
    console.log(image.width)
  })
  .catch(err => {
    console.error(err.stack)
  })
```

### Load image from a local file

Use the `ImageSource.fromFile(path)` method to load an ImageSource instance from the specified file asynchronously.

#### Parameter(s)

| Name   | Type     | Description                                  |
| ------ | -------- | -------------------------------------------- |
| `path` | `string` | The location of the file on the file system. |

```javascript
async function createImageSourceFromFile() {
  const folder = knownFolders.currentApp()
  const filePath = path.join(folder.path, 'images/logo.png')
  folder.getFile('images/logo.png') // 1. Create the file you want to save the image to.
  try {
    const image = await ImageSource.fromResource('logo')

    const saved = await image.saveToFileAsync(filePath, 'png') // 2. Save the image to the file created in 1

    if (saved) {
      const imageFromFile = await ImageSource.fromFile(filePath)
      console.log('Image height: ' + imageFromFile.height)
    } else {
      Dialogs.alert('Not saved')
    }
  } catch (err) {
    console.error(err)
  }
}
```

```typescript
async function createImageSourceFromFile() {
  const folder: Folder = knownFolders.currentApp()
  const filePath: string = path.join(folder.path, 'images/logo.png')
  folder.getFile('images/logo.png') // 1. Create the file you want to save the image to.
  try {
    const image: ImageSource = await ImageSource.fromResource('logo')

    const saved: boolean = await image.saveToFileAsync(filePath, 'png') // 2. Save the image to the file created in 1

    if (saved) {
      const imageFromFile: ImageSource = await ImageSource.fromFile(filePath)
      console.log('Image height: ' + imageFromFile.height)
    } else {
      Dialogs.alert('Not saved')
    }
  } catch (err) {
    console.error(err)
  }
}
```

### Save an image to a local file

```javascript
async function saveImageToFile() {
  try {
    const image = await ImageSource.fromBase64(base64String)
    const folderDest = knownFolders.documents()
    folderDest.getFile('/images/test.png') //1. Create the file
    const pathDest = path.join(folderDest.path, '/images/test.png')
    const saved: boolean = await image.saveToFileAsync(pathDest, 'png') // Save to the file
    if (saved) {
      Dialogs.alert('Saved successfully')
    }
  } catch (err) {
    Dialogs.alert(err)
  }
}
```

```typescript
async function saveImageToFile() {
  try {
    const image: ImageSource = await ImageSource.fromBase64(base64String)
    const folderDest: Folder = knownFolders.documents()
    folderDest.getFile('/images/test.png') //1. Create the file
    const pathDest = path.join(folderDest.path, '/images/test.png')
    const saved: boolean = await image.saveToFileAsync(pathDest, 'png') // Save to the file
    if (saved) {
      Dialogs.alert('Saved successfully')
    }
  } catch (err) {
    Dialogs.alert(err)
  }
}
```

### Create image from base64 string

Use `ImageSource.fromBase64(source)` method to asynchronously load an image instance from the specified base64 encoded string.

#### Parameter(s)

| Name     | Type     | Description                               |
| -------- | -------- | ----------------------------------------- |
| `source` | `string` | The Base64 string to load the image from. |

```javascript
async function createImageFromBase64() {
  try {
    const image = await ImageSource.fromBase64(base64String)
    if (isIOS) {
      // isIOS must be imported,from @nativescript/core
      console.log(image.ios) // <UIImage:0x280a5e640 anonymous {1024, 1024}>
    } else {
      console.log(image.android) // android.graphics.Bitmap@9d09ef6
    }
  } catch (err) {}
}
```

```typescript
async function createImage() {
  try {
    const image: ImageSource = await ImageSource.fromBase64(base64String)
    if (isIOS) {
      // isIOS must be imported,from @nativescript/core
      console.log(image.ios) // <UIImage:0x280a5e640 anonymous {1024, 1024} >
    } else {
      console.log(image.android) // android.graphics.Bitmap@9d09ef6
    }
  } catch (err) {}
}
```

### Properties

| Name     | Type     | Description                                                     |
| -------- | -------- | --------------------------------------------------------------- |
| `height` | `number` | Gets the height of this instance. This is a read-only property. |

|
| `width` | `number` | Gets the width of this instance. This is a read-only property.|
| `rotationAngle` | `number` | Gets or sets the rotation angle that should be applied to the image. (`Android` only)|
| `ios` | `UIImage` | The iOS-specific [UIImage](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/) instance. Will be undefined when running on Android.|
| `android` | `android.graphics.Bitmap` | The Android-specific [image](http://developer.android.com/reference/android/graphics/Bitmap.html) instance. Will be undefined when running on iOS.|

### ImageSource Static Methods

| Name                                   | Return Type            | Description                                                                                                                        |
| -------------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `fromAsset(asset: ImageAsset)`         | `Promise<ImageSource>` | Loads an image instance from the specified asset asynchronously.                                                                   |
| `fromUrl(url: string)`                 | `Promise<ImageSource>` | Downloads the image from the provided Url and creates a new ImageSource instance from it.                                          |
| `fromResourceSync(name: string)`       | `ImageSource`          | Loads an image instance from the specified resource name.                                                                          |
| `fromResource(name: string)`           | `Promise<ImageSource>` | Loads an image instance from the specified resource name asynchronously.                                                           |
| `fromFileSync(path: string)`           | `ImageSource`          | Loads an image instance from the specified file on the file system.                                                                |
| `fromFile(path: string)`               | `Promise<ImageSource>` | Asynchronously loads an image instance from the specified file on the file system.                                                 |
| `fromFileOrResourceSync(path: string)` | `ImageSource`          | Creates a new ImageSource instance and loads it from the specified local file or resource (if specified with the "res://" prefix). |

|
|`fromDataSync(data: any)` | `ImageSource` | Loads an image instance from the specified native image data. `data` is the native data (byte array) to load the image from. This will be either Stream for Android or NSData for iOS.|
|`fromBase64Sync(source: string)` |`ImageSource` | Loads an image instance from the specified base64 encoded string.|
|`fromBase64(source: string)` |`Promise<ImageSource>` | Asynchronously loads an image instance from the specified base64 encoded string.|
|`fromFontIconCodeSync(source: string, font: Font, color: Color)` |`ImageSource` | Creates a new ImageSource instance and loads it from the specified font icon code. <br> `source` : The hex font icon code string. <br>`font` : The font for the corresponding font icon code. <br> `color`: The color of the generated icon image|

### ImageSource instance methods

| Name                                                                                | Return Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `constructor(nativeSource?: any)`                                                   |                        | Creates a new ImageSource instance and sets the provided native source object (typically a Bitmap for Android or UIImage for iOS). The native source object will update either the android or ios properties, depending on the target os.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `setNativeSource(nativeSource: any)`                                                | `void`                 | Sets the provided native source object (typically a Bitmap or a UIImage). This will update either the android or ios properties, depending on the target os.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `saveToFile(path: string, format: 'png' \| 'jpeg' \| 'jpg', quality?: number)`      | `boolean`              | Saves this instance to the specified file, using the provided image format and quality.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `saveToFileAsync(path: string, format: 'png' \| 'jpeg' \| 'jpg', quality?: number)` | `Promise<boolean>`     | Asynchronously saves this instance to the specified file on the file system, using the provided image `format` and `quality`. The `quality` parameter defaults to the maximum available quality and varies on a scale of `0` to `100`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `toBase64String(format: 'png' \| 'jpeg' \| 'jpg', quality?: number)`                | `string`               | Converts the image to base64 encoded string, using the provided image `format` and `quality`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `toBase64StringAsync(format: 'png' \| 'jpeg' \| 'jpg', quality?: number)`           | `Promise<string>`      | Asynchronously converts the image to base64 encoded string, using the provided image `format` and `quality`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `resize(maxSize: number, options?: any)`                                            | `ImageSource`          | Returns a new `ImageSource` that is a resized version of this image with the same aspect ratio, but the max dimension set to the provided maxSize. <br> `maxSize`: The maximum pixel dimension of the resulting image. <br> `options` : Optional parameter, Only used for `Android`, `options.filter` is a boolean which determines whether or not bilinear filtering should be used when scaling the bitmap. If this is true then bilinear filtering will be used when scaling which has better image quality at the cost of worse performance. If this is `false` then nearest-neighbor scaling is used instead which will have worse image quality but is faster. Recommended default is to set filter to `true` as the cost of bilinear filtering is typically minimal and the improved image quality is significant. |
| `resizeAsync(maxSize: number, options?: any)`                                       | `Promise<ImageSource>` | Similar to `resize(maxSize: number, options?: any)` and the only difference being that it returns a new `ImageSource` asynchronously.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
