---
title: Firebase Cire
link: https://raw.githubusercontent.com/NativeScript/firebase/master/packages/firebase-cire/README.md
---

# @nativescript/firebase-core

```cli
ns plugin add @nativescript/firebase-core
```

## Usage

### Initialize Default App

```ts
import { Firebase } from '@nativescript/firebase-core'
const firebase = Firebase.initializeApp()
```

### Initialize Secondary App

```ts
import { Firebase } from '@nativescript/firebase-core'
const config = new FirebaseOptions()
const firebase = Firebase.initializeApp(config, 'SECONDARY_APP')
```
