---
title: Firebase Analytics
link: https://raw.githubusercontent.com/NativeScript/firebase/master/packages/firebase-analytics/README.md
---

# @nativescript/firebase-analytics

```cli
ns plugin add @nativescript/firebase-analytics
```

## Usage

```ts
import '@nativescript/firebase-analytics'
```

### Custom Events

```ts
import { firebase } from '@nativescript/firebase-core'
import '@nativescript/firebase-analytics'

firebase().analytics().logEvent('thing', {
  mobile: 'iPhone'
})
```
