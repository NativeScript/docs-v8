---
title: 'Core'
link: https://raw.githubusercontent.com/NativeScript/firebase/main/packages/firebase-core/README.md
---

<div style="width: 100%; padding: 1.2em 0em">
  					<img alt="github logo" src="../assets/images/github/GitHub-Mark-32px.png" style="display: inline; margin: 1em 0.5em 1em 0em">
  					<a href="https://github.com/NativeScript/firebase/tree/main/packages/firebase-core" target="_blank" noopener>Core</a>
				</div>

# @nativescript/firebase-core

```javascript
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

## License

Apache License Version 2.0
