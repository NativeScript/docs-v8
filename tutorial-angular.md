---
title: Angular Tutorial
---

## Getting Started with NativeScript Angular

This tutorial introduces you to the essentials of Angular by walking you through building an [Example App] with a [Some Basic Functionalities and UIs].

This tutorial will teach you the following:
- Use built-in Angular directives to create and modify your views
- Use data binding to read and update your views
- Use routing to navigate between different views
- Use Angular animations to add animations to your views

## Prerequisites

To get the most out of this tutorial you should already have a basic understanding of the Angular framework. If you're completely new to Angular, you might want to try the official [Angular tutorial](https://angular.io/tutorial) first.


## Overview of the example application

Components form the basic building blocks of an Angular application. Components represent the pages and views that the user interacts with. NativeScript Angular follows the same concept with the difference being primarily within the component's HTML template layer and it's styling. 

// TODO: some graphic of the example app highlighting the different parts of it


## Set up your environment

To set up your development environment, follow the instructions in the [Environment Setup](https://docs.nativescript.org/environment-setup.html#windows-android) section of the docs.

## Create a new NativeScript Angular application

To create a new NativeScript Angular application, run the CLI command `ns create` with the name of the application followed by the `--ng`.

```bash
ns create example-app --ng
```

The NativeScript CLI creates a new directory with the root folder named `example-app` with an initial skeleton app project and installs the necessary packages and dependencies. This can take a few minutes and should be ready to run once it's done installing.

## Run the application

Go to the project's directory and run the following command to run it on the respective platforms.

```bash
cd example-app

// run on iOS
ns run ios

// run on Android
ns run android
```

The `ns run` command builds the app and launches the app on a connected Android device or Android emulator for Android and a connected iOS device or iOS simulator for iOS. By default listens for changes in your code, synchronizes those changes, and refresh all selected devices.
