---
title: Introduction
---

- [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/start/introduction.md
- [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/app-templates/app-templates.md
- [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/app-templates/creating-custom-templates.md

## Prerequisites

The docs have been written with no assumtions of the readers experience, however it does assume knowledge of JavaScript fundamentals. If you are new to JavaScript, we recommend these resources from <abbr title="Mozilla Developer Network">MDN</abbr>:

- [Introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Re-Introduction to JavaScript to refresh your knowledge](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

## Learn the basics

Introduce the absolute basics of NativeScript, such as simple UI elements like Labels and buttons paired with fundamentals of layouts.

Emphasize the importance of keeping layouts simple right from the start to avoid common pitfalls with performance

Flavor specific guide to building your first screen with a very simple example.

## Templates

NativeScript allows scaffolding projects with various templates to kickstart your app development. Official templates can be found in the [Templates GitHub repository](https://github.com/NativeScript/nativescript-app-templates/tree/master/packages) and on [NPM](https://www.npmjs.com/search?q=%40nativescript%20template).

Some of the templates are listed in the NativeScript CLI when creating a new project with `ns create`, others may be used by passing the `--template` flag with the template name (NPM package name).

To create a new project, run:

```bash
ns create myCoolApp
```

If you'd like to try one of the other templates not listed by `ns create` run:

```bash
ns create myCoolApp --template <template package name>
```

:::tip
If you want to skip the interactive prompts, you can pass `--angular` `--vue` `--vue --ts` `--react` `--ts` `--js` or `--svelte` to create the app with the default template for the specified flavor.
:::

Here are some of the default templates you may want to try:

### Blank

A basic template with a single page and no custom styles.

<!-- TODO: make nicer images -->
<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-blank/tools/assets/appTemplate-ios.png" style="height:400px;">
<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-blank/tools/assets/appTemplate-android.png" style="height:400px;">

To use, run:

```bash
ns create myCoolApp --template @nativescript/template-blank
```

### Drawer

A simple template with a side drawer.

<!-- TODO: make nicer images -->
<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-drawer-navigation/tools/assets/appTemplate-ios.png" style="height:400px">
<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-drawer-navigation/tools/assets/appTemplate-android.png" style="height:400px">

To use, run:

```bash
ns create myCoolApp --template @nativescript/template-blank
```

### Tabs

A simple template with multiple tabs.

<!-- TODO: make nicer images -->
<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-tab-navigation/tools/assets/phone-tab-ios.png" style="height:400px">
<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-tab-navigation/tools/assets/phone-tab-android.png" style="height:400px">

To use, run:

```bash
ns create myCoolApp --template @nativescript/template-tab-navigation
```

### List and Details

A simple template with a ListView and a details screen.

<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-master-detail/tools/assets/phone-masterDetail-ios.png" style="height:400px">
<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-master-detail/tools/assets/phone-masterDetail-detail-ios.png" style="height:400px">

To use, run:

```bash
ns create myCoolApp --template @nativescript/template-master-detail
```

### Bring your own

You may create a custom template for your projects. The best place to start is to use one of the Official templates as a base and applying your changes on top.

## Versioning Scheme

`@nativescript/core` does not follow Semantic Versioning. Major framework releases are released every six months (~March and ~September), while minor and patch releases may be released as often as every week. Patch releases should never contain breaking changes, however minor, and major releases can. We strive to note any breaking changes in the Changelogs, to make upgrades as easy as possible.

When referencing the `@nativescript/core` package, you should use a fixed version constraint such as `7.0.11`, or alternatively `~7.0.11` to allow installing patch updates.
