---
title: ImageSource
---

## ImageSource

This classEncapsulates the common abstraction behind a platform specific object (typically a Bitmap for Android and UIImage for iOS) that is used as a source for images.

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
