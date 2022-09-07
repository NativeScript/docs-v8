---
title: 'PDF'
link: https://raw.githubusercontent.com/NativeScript/plugins/main/packages/pdf/README.md
---

<div style="width: 100%; padding: 1.2em 0em">
	<img alt="github logo" src="../assets/images/github/GitHub-Mark-32px.png" style="display: inline; margin: 1em 0.5em 1em 0em">
	<a href="https://github.com/NativeScript/plugins/tree/main/packages/pdf" target="_blank" noopener>PDF</a>
</div>

# @nativescript/pdf

A simple PDF viewer.

> _Remark_ [This repository](https://github.com/NativeScript/plugins/blob/main/packages/pdf) is the replacement for [madmas/nativescript-pdf-view](https://github.com/madmas/nativescript-pdf-view) which was a fork of [the original by Merott](https://github.com/Merott/nativescript-pdf-view) and will be used with his consent to provide further maintenance of this NativeScript plugin.

It serves minimal PDF view implementation that does only one thing, and that is to display PDF files in the simplest way possible. It conveniently uses the iOS `WKWebView`, and for Android it uses [`AndroidPdfViewer`](https://github.com/barteksc/AndroidPdfViewer).

## Installation

```
npm install @nativescript/pdf
```

## Usage

### Vanilla NativeScript

```xml
<Page
  xmlns="http://schemas.nativescript.org/tns.xsd"
  xmlns:pdf="@nativescript/pdf"
  loaded="pageLoaded"
>
  <pdf:PDFView src="{{ pdfUrl }}" load="{{ onLoad }}" />
</Page>
```

### Angular

```ts
import { NativeScriptPdfModule } from '@nativescript/pdf/angular'

@NgModule({
	imports: [
    NativeScriptCommonModule,
    ...
    NativeScriptPdfModule
  ],

```

```html
<PDFView [src]="src" (load)="onLoad()"></PDFView>
```

## Samples

There are sample applications avalable:

- _Plain TypeScript_: see [pdf.ts](https://github.com/NativeScript/plugins/tree/main/apps/demo/src/plugin-demos/pdf.ts) and [pdf.xml](https://github.com/NativeScript/plugins/tree/main/apps/demo/src/plugin-demos/pdf.xml) files in this repository
- _NativeScript+Angular_: [nativescript-pdf-view-angular-sample](https://github.com/madmas/nativescript-pdf-view-angular-sample) repository
- _NativeScript+VueJs_: [nativescript-pdf-view-vue-sample](https://github.com/madmas/nativescript-pdf-view-vue-sample) repository
