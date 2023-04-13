---
title: 'Image Labeling'
link: https://raw.githubusercontent.com/NativeScript/mlkit/main/packages/mlkit-image-labeling/README.md
---

<div style="width: 100%; padding: 1.2em 0em">
	<img alt="github logo" src="../assets/images/github/GitHub-Mark-32px.png" style="display: inline; margin: 1em 0.5em 1em 0em">
	<a href="https://github.com/NativeScript/mlkit/tree/main/packages/mlkit-image-labeling" target="_blank" noopener>Image Labeling</a>
</div>

# @nativescript/mlkit-image-labeling

A plugin that is used with [@nativescript/mlkit-core](../mlkit-core/) to enable Image Labeling and provide the [ImageLabelingResult](#imagelabelingresult) type for the image labeling event data.

## Contents

- [Installation](#installation)
- [Use @nativescript/mlkit-image-labeling](#use-nativescriptmlkit-image-labeling)
- [API](#api)
  - [ImageLabelingResult](#imagelabelingresult)
- [License](#license)

## Installation

```cli
npm install @nativescript/mlkit-image-labeling
```

## Use @nativescript/mlkit-image-labeling

For an example, read [Use @nativescript/mlkit-core](../mlkit-core#use-nativescriptmlkit-core) and [Image Labeling](../mlkit-core#image-labeling)

## API

### ImageLabelingResult

The Image Labeling event data type.

```ts
interface ImageLabelingResult {
  text?: string
  confidence?: number
  index?: number
}
```

## License

Apache License Version 2.0
