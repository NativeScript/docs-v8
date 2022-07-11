---
title: FileSystem
---

## FileSystem

The FileSystem module provides high-level abstractions for file system entities such as files, folders, known folders, paths, separators, etc.

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
const documents = knownFolders.documents()
const folder = documents.getFolder(vm.get('folderName') || 'testFolder')
const file = folder.getFile(`${vm.get('fileName') || 'testFile'}.txt`)

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
```

```typescript
const documents: Folder = <Folder>knownFolders.documents()
const folder: Folder = <Folder>documents.getFolder(vm.get('folderName') || 'testFolder')
const file: File = folder.getFile(`${vm.get('fileName') || 'testFile'}` + `.txt`)

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
  .then((res: boolean) => {
    // Success removing the file.
    vm.set('resultMessage', 'File successfully deleted!')
  })
  .catch(err => {
    console.log(err.stack)
  })
```

### Removing a Folder

```javascript
folder
  .remove()
  .then(res => {
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
  .then((res: boolean) => {
    // Success removing the folder.
    vm.set('resultMessage', 'Folder successfully deleted!')
  })
  .catch(err => {
    console.log(err.stack)
  })
```

### Clearing the contents of a Folder

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
  .then((res: boolean) => {
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
const filePath = path.join(documentsFolder.path, 'FileFromPath.txt')
const file = File.fromPath(filePath)

// Writing text to the file.
file
  .writeText('Some text')
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
const filePath = path.join(documentsFolder.path, 'FileFromPath.txt')
const file = File.fromPath(filePath)

// Writing text to the file.
file
  .writeText('Some text')
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

const folder = knownFolders.documents()
const fPath = path.join(folder.path, 'Test.png')
const imageFile = File.fromPath(fPath)

const image = ImageSource.fromResource('icon')
  .then(image => {
    const saved = image.saveToFile(fPath, 'png')

    if (saved) {
      Dialogs.alert('Saved')
      const binarySource = imageFile.readSync(err => {
        console.log(err)
      })
      console.log(binarySource)
    }
  })
  .catch(err => Dialogs.alert(err))
```

```typescript
import { ImageSource } from '@nativescript/core'

const folder = knownFolders.documents()
const fPath = path.join(folder.path, 'Test.png')
const imageFile = File.fromPath(fPath)

const image = ImageSource.fromResource('icon')
  .then((image: ImageSource) => {
    const saved = image.saveToFile(fPath, 'png')

    if (saved) {
      Dialogs.alert('Saved')
      const binarySource = imageFile.readSync(err => {
        console.log(err)
      })
      console.log(binarySource)
    }
  })
  .catch(err => Dialogs.alert(err))
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
const fPath = path.join(documents.path, 'Text.txt')
const exists = File.exists(fPath)
console.log(`Does Text.txt exists: ${exists}`)
```

### Renaming a File

```javascript
const newName = 'NewName'
const documents = knownFolders.documents()
const file = documents.getFile('Text.txt')
const fPath = path.join(documents.path, 'Text.txt')
file
  .rename(`${newName}.txt`)
  .then(res => {
    // File Successfully Renamed.
    Dialogs.alert(`File renamed to:  ${newName}.txt`)
    vm.set('fileSuccessMessage', `File renamed to:  ${newName}.txt`)
    vm.set('isItemVisible', true)
  })
  .catch(err => {
    // Error!
    console.log('Error: ')
    console.log(err)

    Dialogs.alert(err).then(() => {
      console.log('Dialog closed!')
    })
  })
```

```typescript
const newName = 'NewName'
const documents = knownFolders.documents()
const file = documents.getFile('Text.txt')
const fPath = path.join(documents.path, 'Text.txt')
file
  .rename(`${newName}.txt`)
  .then(res => {
    // File Successfully Renamed.
    Dialogs.alert(`File renamed to:  ${newName}.txt`)
    vm.set('fileSuccessMessage', `File renamed to:  ${newName}.txt`)
    vm.set('isItemVisible', true)
  })
  .catch(err => {
    // Error!
    console.log('Error: ')
    console.log(err)

    Dialogs.alert(err).then(() => {
      console.log('Dialog closed!')
    })
  })
```

### Get or Create a Folder With Path

```javascript
const folderPath = path.join(knownFolders.documents().path, 'music')
const folder = Folder.fromPath(folderPath)
```

```typescript
const folderPath = path.join(knownFolders.documents().path, 'music')
const folder: Folder = Folder.fromPath(folderPath)
```

### Renaming a Folder

```javascript
const newName = 'newName'

folder
  .rename(newName)
  .then(res => {
    // Folder Successfully Renamed.
    Dialogs.alert(`Folder renamed to:  ${newName} ${res}`)
    vm.set('folderSuccessMessage', `Folder renamed to:  ${newName}`)
    vm.set('isFolderItemVisible', true)
  })
  .catch(err => {
    // Error!
    console.log('Error: ')
    console.error(err)
  })
```

```typescript
const newName = 'newName'

folder
  .rename(newName)
  .then((res: boolean) => {
    // Folder Successfully Renamed.
    Dialogs.alert(`Folder renamed to:  ${newName} ${res}`)
    vm.set('folderSuccessMessage', `Folder renamed to:  ${newName}`)
    vm.set('isFolderItemVisible', true)
  })
  .catch(err => {
    // Error!
    console.log('Error: ')
    console.error(err)
  })
```

### Getting Folder Contents

Getting all folder entities in an array may be slow with large number of files. Enumerating the folder entities would iterate the files one by one without blocking the UI.

```javascript
folder
  .getEntities()
  .then(entities => {
    // entities is array with the document's files and folders.
    entities.forEach(entity => {
      array.push({
        name: entity.name,
        path: entity.path,
        lastModified: entity.lastModified.toString()
      })
      console.log(array.length)
    })
  })
  .catch(err => {
    // Failed to obtain folder's contents.
    console.log(err.stack)
  })
```

```typescript
folder
  .getEntities()
  .then((entities: FileSystemEntity[]) => {
    // entities is array with the document's files and folders.
    entities.forEach(entity => {
      array.push({
        name: entity.name,
        path: entity.path,
        lastModified: entity.lastModified.toString()
      })
      console.log(array.length)
    })
  })
  .catch(err => {
    // Failed to obtain folder's contents.
    console.log(err.stack)
  })
```

### Removing a Folder

```javascript
folder
  .remove()
  .then(res => {
    // Success removing the folder.
    vm.set('resultMessage', 'Folder successfully deleted!')
    Dialogs.alert(res)
  })
  .catch(err => {
    console.log(err.stack)
  })
```

```typescript
folder
  .remove()
  .then((res: boolean) => {
    // Success removing the folder.
    vm.set('resultMessage', 'Folder successfully deleted!')
    Dialogs.alert(res)
  })
  .catch(err => {
    console.log(err.stack)
  })
```

### Checking if a Folder Exists

```javascript
const documents = knownFolders.documents()
const folder = documents.getFolder(vm.get('folderName') || 'testFolder')

const folderExists = Folder.exists(folder.path)
console.log(folderExists) // true
const folder2Path = path.join(documents.path, 'myFolder')

const folder2Exists = Folder.exists(folder2Path)
console.log(folder2Exists) // false
```

```typescript
const documents = knownFolders.documents()
const folder: Folder = documents.getFolder(vm.get('folderName') || 'testFolder')

const folderExists: boolean = Folder.exists(folder.path)
console.log(folderExists) // true

const folder2Path: string = path.join(documents.path, 'myFolder')
const folder2Exists: boolean = Folder.exists(folder2Path)
console.log(folder2Exists) // false
```

### Normalize a Path

```javascript
let documentsFolder = knownFolders.documents()
const currentAppFolder = knownFolders.currentApp()
const tempFolder = knownFolders.temp()

const testPath = '///test.txt'
// Get a normalized path such as <folder.path>/test.txt from <folder.path>///test.txt
console.log('documents', path.normalize(documentsFolder.path + testPath))
console.log('currentApp', path.normalize(currentAppFolder.path + testPath))
console.log('temp', path.normalize(tempFolder.path + testPath))
```

```typescript
let documentsFolder = knownFolders.documents()
const currentAppFolder = knownFolders.currentApp()
const tempFolder = knownFolders.temp()

const testPath = '///test.txt'
// Get a normalized path such as <folder.path>/test.txt from <folder.path>///test.txt
console.log('documents', path.normalize(documentsFolder.path + testPath))
console.log('currentApp', path.normalize(currentAppFolder.path + testPath))
console.log('temp', path.normalize(tempFolder.path + testPath))
```

### Path join

```javascript
// Generate a path like <documents.path>/myFiles/test.txt
const documentsFolder = knownFolders.documents()
const filePath = path.join(documentsFolder.path, 'myFiles', 'test.txt')
```

```typescript
// Generate a path like <documents.path>/myFiles/test.txt
const documentsFolder = <Folder>knownFolders.documents()
const filePath: string = path.join(documentsFolder.path, 'myFiles', 'test.txt')
```

### Get the Path Separator

```javascript
// An OS dependent path separator, "\" or "/".
const separator = path.separator
```

```typescript
// An OS dependent path separator, "\" or "/".
const separator = path.separator
```

## File Properties

| Name           | Type      | Description                                                                                                                                           |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `extension`    | `string`  | Gets the extension of the file.property.                                                                                                              |
| `isLocked`     | `boolean` | Gets a value indicating whether the file is currently locked, meaning a background operation associated with this file is running.property.           |
| `lastModified` | `Date`    | Gets the Date object specifying the last time this entity was modified.                                                                               |
| `name`         | `string`  | Gets the name of the entity.                                                                                                                          |
| `parent`       | `Folder`  | Gets the Folder object representing the parent of this entity. Will be null for a root folder like Documents or Temporary. This property is readonly. |
| `path`         | `string`  | Gets the fully-qualified path (including the extension for a File) of the entity.                                                                     |
| `name`         | `string`  | Gets the known name of this instance. Defined only if it has been constructed from a known color name - e.g. "red". This is a read-only property.     |
| `size`         | `number`  | Gets the size in bytes of the file.                                                                                                                   |

## File Methods

| Name                                                   | Return Type       | Description                                                                                                 |
| ------------------------------------------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `read()`                                               | `Promise<any>`    | Reads the binary content of the file asynchronously.                                                        |
| `readSync(onError?: function)`                         | `any`             | Reads the binary content of the file synchronously.                                                         |
| `readText(encoding?: string)`                          | `Promise<string>` | Reads the content of the file asynchronously as a string using the specified encoding (defaults to UTF-8).  |
| `readTextSync(onError?: function, encoding?: string)`  | `string`          | Reads the content of the file as a string synchronously, using the specified encoding (defaults to UTF-8).  |
| `remove()`                                             | `Promise<void>`   | Removes (deletes) the current file asynchronously from the file system.                                     |
| `removeSync(onError?: function)`                       | `void`            | Removes (deletes) the current file from the file system synchronously.                                      |
| `rename(newName: string)`                              | `Promise<any>`    | Renames the current file asynchronously using the specified name.                                           |
| `renameSync(newName: string, onError?: function)`      | `void`            | Renames the current file synchronously using the specified name.                                            |
| `write(newName: string)`                               | `Promise<void>`   | Writes the provided binary content,asynchronously, to the file.                                             |
| `writeText(encoding?: string)`                         | `Promise<string>` | Asynchronously writes the content of the file as a string using the specified encoding (defaults to UTF-8). |
| `writeTextSync(onError?: function, encoding?: string)` | `string`          | Writes the content of the file as a string synchronously using the specified encoding (defaults to UTF-8).  |
| `exists(path: string)`                                 | `boolean`         | Checks whether a File with the specified path already exists.                                               |
| `fromPath(path: string)`                               | `File`            | Gets or creates a File entity at the specified path.                                                        |

## Folder Properties

| Name           | Type      | Description                                                                                                                                           |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isKnown`      | `boolean` | Determines whether this instance is a KnownFolder (accessed through the KnownFolders object).                                                         |
| `lastModified` | `Date`    | Gets the Date object specifying the last time this entity was modified.                                                                               |
| `name`         | `string`  | Gets the name of the entity.                                                                                                                          |
| `parent`       | `Folder`  | Gets the Folder object representing the parent of this entity. Will be null for a root folder like Documents or Temporary. This property is readonly. |
| `path`         | `string`  | Gets the fully-qualified path (including the extension for a File) of the entity.                                                                     |

## Folder Methods

| Name                                  | Return Type                       | Description                                                                                                                                                   |
| ------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clear()`                             | `Promise<any>`                    | Deletes all the files and folders (recursively), contained within this Folder.                                                                                |
| `clearSync(onError?: function)`       | `void`                            | Deletes all the files and folders (recursively), contained within this Folder synchronously.                                                                  |
| `contains(name: string)`              | `boolean`                         | Checks whether this Folder contains an Entity with the specified name. The path of the folder is added to the name to resolve the complete path to check for. |
| `eachEntity(onEntity: function)`      | `any`                             | Enumerates all the top-level FileSystem entities residing within this folder.                                                                                 |
| `getEntities()`                       | `Promise<Array<FileSystemEntity>` | Gets all the top-level entities residing within this folder.                                                                                                  |
| `getEntitiesSync(onError?: function)` | `Array<FileSystemEntity>`         | Gets all the top-level entities residing within this folder synchronously                                                                                     |
| `getFile(name: string)`               | `File`                            | Gets or creates a File entity with the specified name within this Folder.                                                                                     |
| `getFolder(name: string)`             | `Folder`                          | Gets or creates a Folder entity with the specified name within this Folder.                                                                                   |
| `remove()`                            | `Promise<any>`                    | Removes (deletes) the current Entity from the file system.                                                                                                    |
| `removeSync(onError?: function)`      | `void`                            | Removes (deletes) the current Entity from the file system synchronously.                                                                                      |

## knownFolders Methods

| Name           | Return Type | Description                                                                                                                                                                                                          |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currentApp()` | `Folder`    | Gets the root folder for the current application. This Folder is private for the application and not accessible from Users/External apps. iOS - this folder is read-only and contains the app and all its resources. |
| `documents()`  | `Folder`    | Gets the Documents folder available for the current application. This Folder is private for the application and not accessible from Users/External apps.                                                             |
| `temp()`       | `Folder`    | Gets the Temporary (Caches) folder available for the current application. This Folder is private for the application and not accessible from Users/External apps.                                                    |

## path Methods

| Name                       | Return Type | Description                                                                    |
| -------------------------- | ----------- | ------------------------------------------------------------------------------ |
| `join(...paths: string[])` | `string`    | Joins all the provided string components, forming a valid and normalized path. |
| `normalize(path: string)`  | `string`    | Normalizes a path, taking care of occurrances like ".." and "//".              |

## API References

| Name                                                                                     | Type     |
| ---------------------------------------------------------------------------------------- | -------- |
| [File](https://docs.nativescript.org/api-reference/classes/file)                         | Class    |
| [FileSystemEntity](https://docs.nativescript.org/api-reference/classes/filesystementity) | `Class`  |
| [Folder](https://docs.nativescript.org/api-reference/classes/folder)                     | `Class`  |
| [knownFolders](https://docs.nativescript.org/api-reference/modules/knownfolders)         | `Module` |
| [path](https://docs.nativescript.org/api-reference/modules/path)                         | `Module` |

## Native Component

| Android                                                              | iOS                                                                                 |
| :------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| [java.io.File](https://developer.android.com/reference/java/io/File) | [NSFileManager](https://developer.apple.com/documentation/foundation/nsfilemanager) |
