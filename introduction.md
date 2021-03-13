---
title: Introduction
---

- [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/start/introduction.md

The docs should not assume the experience level of the reader - clear examples and explanations.

## How to use the docs

A quick introduction of the docs, order things in a way that the docs can be read in a linear fashion like a book - but also allow taking shortcuts ie. jump to the relevant sections easily.

## Prerequisites

The docs should not assume the experience level of the reader, however some basic concepts should be required, such as JavaScript fundamentals.

## Learn the basics

Introduce the absolute basics of NativeScript, such as simple UI elements like Labels and buttons paired with fundamentals of layouts.

Emphasize the importance of keeping layouts simple right from the start to avoid common pitfalls with performance

Flavor specific guide to building your first screen with a very simple example.

## Templates

- [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/app-templates/app-templates.md
- [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/app-templates/creating-custom-templates.md

The NativeScript app template is a blueprint for a fully functional mobile application developed with NativeScript. The templates maintained by the NativeScript team reside in [GitHub](https://github.com/nativescript/nativescript-app-templates). Each template is also published as an npm package (e.g. [NativeScript Core with TypeScript Master Detail Template](https://www.npmjs.com/package/tns-template-master-detail-ts)).

There are several available templates that can help you bootstrap your NativeScript application using the best coding practices, in all supported flavors, including Angular & TypeScript, Vue, Vanilla JavaScript or TypeScript.

To create a new app using one of the templates, you can use the following command:

```Bash
$  tns create my-app-name --template tns-template-name
```

In the command above `tns-template-name` should be the template you wish to use. See bellow for the name of each template.

> Different versions of NativeScript can have different code in the application templates. If you create an app using an older version of the framework you might get less features from the ones included in the current NativeScript release.

### Blank

A basic template with a single page and no custom styles. Useful for when minimal and clean code is needed.

<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-blank/tools/assets/appTemplate-ios.png" style="height:400px;border:1px solid black"> <img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-blank/tools/assets/appTemplate-android.png" style="height:400px;border:1px solid black">

| Flavor             | Name                  | Repo                                                                                              |
| ------------------ | --------------------- | ------------------------------------------------------------------------------------------------- |
| Core JavaScript    | tns-template-blank    | https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-blank    |
| Core TypeScript    | tns-template-blank-ts | https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-blank-ts |
| Angular TypeScript | tns-template-blank-ng | https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-blank-ng |

### Navigation Drawer

<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-drawer-navigation/tools/assets/appTemplate-ios.png" style="height:400px"> <img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-blank/tools/assets/appTemplate-android.png" style="height:400px">

| Flavor | Name | Repo |
| ------ | ---- | ---- |

{% nativescript %}
`tns-template-drawer-navigation` - JavaScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-drawer-navigation  
`tns-template-drawer-navigation-ts` - TypeScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-drawer-navigation-ts
{% endnativescript %}{% angular %}
`tns-template-drawer-navigation-ng` - Angular with TypeScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-drawer-navigation-ng
{% endangular %}

This template contains a preconfigured {% nativescript %}[SideDrawer]({% slug sidedrawer-overview %}){% endnativescript %}{% angular %}[SideDrawer]({% slug sidedrawer-overview-angular %}){% endangular %} component from [NativeScript UI's built-in components]({% slug components %}) with several pages.

### Tabs

<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-tab-navigation/tools/assets/phone-tab-ios.png" style="height:400px"> <img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-tab-navigation/tools/assets/phone-tab-android.png" style="height:400px">

{% nativescript %}
`tns-template-tab-navigation` - JavaScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-tab-navigation  
`tns-template-tab-navigation-ts` - TypeScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-tab-navigation-ts
{% endnativescript %}{% angular %}
`tns-template-tab-navigation-ng` - Angular with TypeScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-tab-navigation-ng
{% endangular %}

This template uses a [TabView](https://docs.nativescript.org/cookbook/ui/tab-view) component for navigation. It also includes several pages to show how to populate the tabs and perform the navigation.

## Master Detail with Firebase

<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-master-detail-kinvey/tools/assets/phone-masterDetail-ios.png" style="height:400px"> <img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-master-detail-kinvey/tools/assets/phone-masterDetail-detail-ios.png" style="height:400px">

{% nativescript %}
`tns-template-master-detail` - JavaScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-master-detail  
`tns-template-master-detail-ts` - TypeScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-master-detail-ts
{% endnativescript %}{% angular %}
`tns-template-master-detail-ng` - Angular with TypeScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-master-detail-ng
{% endangular %}

This Master-Detail template is a fundamental building block for any app that displays a collection of objects and their details, which also need to work both in online and offline mode. It utilizes [Firebase](https://firebase.google.com/) as a backend.

## Master Detail with Kinvey

<img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-master-detail/tools/assets/phone-masterDetail-ios.png" style="height:400px"> <img src="https://raw.githubusercontent.com/NativeScript/nativescript-app-templates/master/packages/template-master-detail/tools/assets/phone-masterDetail-detail-ios.png" style="height:400px">

{% nativescript %}
`tns-template-master-detail-kinvey` - JavaScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-master-detail-kinvey  
`tns-template-master-detail-kinvey-ts` - TypeScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-master-detail-kinvey-ts
{% endnativescript %}{% angular %}
`tns-template-master-detail-kinvey-ng` - Angular with TypeScript  
Github repo: https://github.com/NativeScript/nativescript-app-templates/tree/master/packages/template-master-detail-kinvey-ng
{% endangular %}

This template is functionally identical to [Master Detail with Firebase](#master-detail-with-firebase). The only difference is that it utilizes [Kinvey](https://www.kinvey.com/) as a backend.

## Versioning Scheme

`@nativescript/core` does not follow Semantic Versioning. Major framework releases are released every six months (~March and ~September), while minor and patch releases may be released as often as every week. Patch releases should never contain breaking changes, however minor, and major releases can. We strive to note any breaking changes in the Changelogs, to make upgrades as easy as possible.

When referencing the `@nativescript/core` package, you should use a fixed version constraint such as `7.0.11`, or alternatively `~7.0.11` to allow installing patch updates.
