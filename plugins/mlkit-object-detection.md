---
title: 'Object Detection'
link: https://raw.githubusercontent.com/NativeScript/mlkit/main/packages/mlkit-object-detection/README.md
---

<div style="width: 100%; padding: 1.2em 0em">
	<img alt="github logo" src="../assets/images/github/GitHub-Mark-32px.png" style="display: inline; margin: 1em 0.5em 1em 0em">
	<a href="https://github.com/NativeScript/mlkit/tree/main/packages/mlkit-object-detection" target="_blank" noopener>Object Detection</a>
</div>

# @nativescript/mlkit-object-detection

A plugin that is used with [@nativescript/mlkit-core](../mlkit-core/) to enable Object Detection and provide the [ObjectResult](#objectresult) type for the object detection event data.

## Contents

- [Installation](#installation)
- [Use @nativescript/mlkit-object-detection](#use-nativescriptmlkit-object-detection)
- [ObjectResult](#objectresult)
- [API](#api)
  - [ObjectResult]

## Installation

Install `@nativescript/mlkit-object-detection` by running the following command:

```cli
npm install @nativescript/mlkit-object-detection
```

## Use @nativescript/mlkit-object-detection

For an example, read [Use @nativescript/mlkit-core](../mlkit-core#use-nativescriptmlkit-core) and [Object Detection](../mlkit-core#object-detection).

## API

### ObjectResult

The type of object detection event data.

```ts
interface ObjectResult {
  trackingId?: number
  bounds: Bounds
  labels: ObjectLabeling[]
}
```

#### ObjectLabeling

```ts
interface ObjectLabeling {
  text?: string
  confidence?: number
  index?: number
}
```

#### Bounds

```ts
interface Bounds {
  origin: Origin
  size: Size
}
```

#### Origin

```ts
export interface Origin {
  x: number
  y: number
}
```

#### Size

```ts
interface Size {
  width: number
  height: number
}
```

## License

Apache License Version 2.0
