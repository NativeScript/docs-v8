---
title: ApplicationSettings
---

# ApplicationSettings

The `ApplicationSettings` class allows you to store key/value pairs of data on the device. For example, an app could store a user's auth state so that, the user does not have to re-login when she resumes the app,if she didn't log out when she left the app.

## Usage

The code in the following Stackblitz Editor is an example of how to use the `ApplicationSettings` class. To try it out, download the `Nativescript Preview` app on your phone from Google Play or App Store. Once you have downloaded the app, scan the QR with your phone Camera and the app resulting from the code in the IDE will appear in the `Nativescript Preview` app.

<iframe  width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-zvs34v?embed=1&file=app/main-view-model.ts&hideExplorer=0"></iframe>

You can use the Stackblitz + Preview to experiment with the rest of the code snippets in the post.

### Setters

#### setBoolean(key: string, value: boolean): void

Sets a Boolean Object for a key.

```javascript
ApplicationSettings.setBoolean(key, value)
```

```typescript
ApplicationSettings.setBoolean(key, value)
```

#### setString(key: string, value: string): void

Sets a String Object for a key. You can use this method with the `JSON.stringify()` to store an object or an array as a string and then use `JSON.parse()` to convert the result of `getString()` back to the object or array.

```javascript
// simple string
ApplicationSettings.setString(key, "some string value")

//Storing an object
const obj = {key: "value"};
const objAsString = JSON.stringify(obj);// objAsString = '{"key":"value"}'
ApplicationSettings.setString("key", objAsString)

//Retrieve
const objStr = ApplicationSettings.getString("key");
comsy myObj = JSON.parse(ObjStr) // myObj = {key: 'value'}
```

```typescript
ApplicationSettings.setString(key, value)
```

#### setNumber(key: string, value: number): void

Sets a Number Object for a key.

```javascript
ApplicationSettings.setNumber(key, value)
```

```typescript
ApplicationSettings.setNumber(key, value)
```

### Getters

#### hasKey(key: string): boolean

Checks whether such a key exists.

```javascript
ApplicationSettings.hasKey(key)
```

```typescript
ApplicationSettings.hasKey(key)
```

#### getBoolean(key: string, defaultValue?: boolean): boolean

Gets a value (if existing) for a key as a Boolean Object. A default value can be provided in case there is no existing value.

```javascript
ApplicationSettings.getBoolean(key, defaultValue)
```

```typescript
ApplicationSettings.getBoolean(key, defaultValue)
```

#### getString(key: string, defaultValue?: string): string

Gets a value (if existing) for a key as a String Object. A default value can be provided in case there is no existing value.

```javascript
ApplicationSettings.getString(key, defaultValue)
```

```typescript
ApplicationSettings.getString(key, defaultValue)
```

#### getNumber(key: string, defaultValue?: number): number

Gets a value (if existing) for a key as a Number Object. A default value to be returned can be provided in case there is no existing value.

```javascript
ApplicationSettings.getNumber(key, defaultValue)
```

```typescript
ApplicationSettings.getNumber(key, defaultValue)
```

### Other methods

#### remove(key: string): void

```javascript
ApplicationSettings.remove(key)
```

```typescript
ApplicationSettings.remove(key)
```

#### clear()

Removes all values from the local storage.

```javascript
ApplicationSettings.clear()
```

```typescript
ApplicationSettings.clear()
```

#### getAllKeys(): Array\<string>

Returns an array of all stored keys or an empty array if no keys exist in the storage.

```javascript
ApplicationSettings.getAllKeys()
```

```typescript
ApplicationSettings.getAllKeys()
```

#### API References

| Name                                                                                                               | Type     |
| ------------------------------------------------------------------------------------------------------------------ | -------- |
| [@nativescript/core/application-settings](https://docs.nativescript.org/api-reference/modules#applicationsettings) | `Module` |

#### Native Component

| Android                                                                                        | iOS                                                                                   |
| :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences) | [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults) |
