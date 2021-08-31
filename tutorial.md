---
title: Tutorial
---

## Vue

### Getting Started

Are you ready to build your app with the tools you already know?

<!-- tab:npm -->

```cli
npm i nativescript -g
ns create myCoolApp --vue
```

<!-- tab:yarn -->

```cli
yarn global add nativescript
ns create myCoolApp --vue
```

### Hello World

Let's see what the basic app has out of the box, and break down what's happening behind the scenes.

```js
// app.js
import Vue from 'nativescript-vue'
import Home from './components/Home'

new Vue({
  render: h => h('frame', [h(Home)])
}).$start()
```

We are creating a new Vue application, and specifying a render function that will render our `Home.vue` in a frame (we will cover frames at a later point). Then we are calling `$start` without any arguments.

On the web we would pass an element id to mount, but in NativeScript, there is no DOM that we are attaching to, so we simply don't need to pass in anything. The elements rendered by `Home.vue` will be created and automatically displayed when the application has been booted up.

Let's explore what `Home.vue` does...

```vue
<!-- Home.vue -->
<template>
  <Page>
    <GridLayout>
      <Label text="Hello World" />
    </GridLayout>
  </Page>
</template>
```

Here we have a `<Page>` component that represents an application screen. We also have a`<GridLayout>` and a `<Label>` inside of it. Once we start the app we will see Hello World printed in the middle.

### Styling

To apply styles we can use inline styles, inline attributes or css.

See more in the [UI & Styling](/ui-and-styling.html#css)

### Interacting with the UI

Let's see how we can handle user interaction using gestures. The most common gesture is a `tap` - it's fired whenever the user taps on an element.

```vue
<!-- Home.vue -->
<template>
  <Page>
    <GridLayout>
      <Label text="Hello World" @tap="onUserTap" />
    </GridLayout>
  </Page>
</template>

<script>
export default {
  methods: {
    onUserTap(args) {
      // this will print "You have tapped on Hello World"
      // whenever the Label is tapped
      alert(`You have tapped on ${args.object.text}`)
    }
  }
}
</script>
```

### Showing different screens

Most apps need to be able to show different screens to the user. In NativeScript this is done with the `<Frame>` and `<Page>` elements.

In native applications it's very common to let users go back to a previous screen by tapping a back button, either physical or on-screen. To allow for this, the application has to keep track of the different screens the users has been presented with, and go back to any of them when necessary. This is called a backstack, a list of navigation entries.

A `<Frame>` is an element that is responsible for managing the backstack, and `<Page>` elements represent the screens associated with each backstack entry. An application is not limited to a single frame, but that is an advanced topic we will cover at a later point.

Let's see how we can navigate between different screens through a concrete example.

We created the `<Frame>` for `Home.vue` as mentioned before. In this case, we would like to make it the root of our app.

Let's create a new page in `Hello.vue`

```vue
<!-- Hello.vue -->
<template>
  <Page>
    <GridLayout>
      <Label text="This is the Hello page!" />
    </GridLayout>
  </Page>
</template>
```

To present this page to the user, we can edit the `onUserTap` method in `Home.vue` to navigate our `<Frame>` to this new `<Page>`.

```js
// Home.vue
// ...
onUserTap(args) {
    this.$navigateTo(Hello);
}
```

### Manipulating the backstack

We've learned how we can show different screens to the user. There are additional options we can pass to `$navigateTo` that will alter how the backstack stores the entry.

#### clearHistory

If we don't want the user to be able to go back to any of the previous pages, we can set `clearHistory` to `true` and the frame will navigate to the new page, and delete all previous entries from the backstack. All the previous pages will be destroyed, and the component lifecycle hooks will be invoked to do additional cleanup if necessary.

#### backstackVisible

If we want to navigate the user to a page but don't want to let them go back to that page after they have left it, we can set `backstackVisible` to `false` and the entry will not be added to the backstack.

## JS

### Getting Started

Are you ready to build your app with the tools you already know?

<!-- tab:npm -->

```cli
npm i nativescript -g
ns create myCoolApp --js
```

<!-- tab:yarn -->

```cli
yarn global add nativescript
ns create myCoolApp --js
```

### Hello World

Let's see what the basic app has out of the box, and break down what's happening behind the scenes.

```js
// app.js
import { Application } from '@nativescript/core'
Application.run({ moduleName: 'app-root' })
```

After importing the `Application` from `@nativescript/core`, we are calling `run` on it with specifying a module that has a the root level `<Frame>`.

On the web we would pass an element id to mount, but in NativeScript, there is no DOM that we are attaching to, so we simply don't need to pass in anything.

```xml
<!-- app-root.xml -->
<Frame defaultPage="main-page" />
```

The elements rendered by `main-page.xml` will be created and automatically displayed when the application has been booted up.

Let's explore what `main-page.xml` does...

```xml
<!-- main-page.xml -->
<Page>
  <StackLayout>
    <Label text="Hello World" />
  </StackLayout>
</Page>
```

Here we have a `<Page>` component that represents an application screen. We also have a `<StackLayout>` and a `<Label>` inside of it. Once we start the app we will see Hello World printed in the middle.

### Styling

To apply styles we can use inline styles, inline attributes or css.

See more in the [UI & Styling](/ui-and-styling.html#css)

### Interacting with the UI

Let's see how we can handle user interaction using gestures. The most common gesture is a `tap` - it's fired whenever the user taps on an element.

```xml
<!-- main-page.xml -->
<Page navigatingTo="onNavigatingTo">
  <StackLayout>
    <Label text="Hello World" tap="{{ onTap }}" />
  </StackLayout>
</Page>
```

We are adding `navigatingTo="onNavigatingTo"` to the `<Page>` to initialize the page where we are arriving to.
The `onNavigatingTo` function takes place in the `main-page.js`.

```js
// main-page.js
import { createViewModel } from './main-view-model'

export function onNavigatingTo(args) {
  const page = args.object

  page.bindingContext = createViewModel()
}
```

After we set the view model for the page's `bindingContext`, we can create a view model for our main page where we can implement the `onTap` function.

```js
// main-view-model.js
import { Observable } from '@nativescript/core'

export function createViewModel() {
  const viewModel = new Observable()

  viewModel.onTap = args => {
    // this will print "You have tapped on Hello World"
    // whenever the Label is tapped
    alert(`You have tapped on ${args.object.text}`)
  }

  return viewModel
}
```

### Showing different screens

Most apps need to be able to show different screens to the user. In NativeScript this is done with the `<Frame>` and `<Page>` elements.

<!-- TODO -->

## React

### Getting Started

Are you ready to build your app with the tools you already know?

<!-- tab:npm -->

```cli
npm i nativescript -g
ns create myCoolApp --react
```

<!-- tab:yarn -->

```cli
yarn global add nativescript
ns create myCoolApp --react
```

### Hello World

Let's see what the basic app has out of the box, and break down what's happening behind the scenes

```ts
// app.ts

import * as React from 'react'
import * as ReactNativeScript from 'react-nativescript'
import { mainStackNavigator as AppContainer } from './components/Navigator'

ReactNativeScript.start(React.createElement(AppContainer, {}, null))
```

Let's explore what `HomeScreen.tsx` does...

```tsx
// HomeScreen.tsx
<flexboxLayout>
  <label>Hello World!</label>
</flexboxLayout>
```

Here we have a `<flexboxLayout>` and a `<label>` inside of it. With this structure, the root of our application will be the `<flexboxLayout>` and once we start the app we will see Hello World printed in the middle.

### Styling

To apply styles we can use inline styles, inline attributes or css...

### Interacting with the UI

Let's see how we can handle user interaction using gestures. The most common gesture is a `tap` - it's fired whenever the user taps on an element.

```tsx
// HomeScreen.tsx
<flexboxLayout>
  <label
    onTap={args => {
      alert(`You have tapped on ${args.object.text}!`)
    }}
  >
    Hello World!
  </label>
</flexboxLayout>
```

### Showing different screens

:::warning Warning

Do not use the NativeScript navigators directly

React NativeScript wraps all of the aforementioned components as React components, but it's fiddly to use them directly as all the navigation actions are non-declarative, meaning they don't map well to React and you have to do a lot of ref-handling. Without special care, you may find the navigator model going out of sync with your React state (e.g. due to neglecting to update the history stack upon user interaction).

:::

Insted of NativeScript navigators you can use `react-nativescript-navigation`, which uses `React Navigation v5` components under-the-hood.

We are creating a `<BaseNavigationContainer>` with a `<StackNavigator.Navigator>` inside. Here we can set our initial screen at `initialRouteName`.

```tsx
// Navigator.tsx
import * as React from 'react'
import { BaseNavigationContainer } from '@react-navigation/core'
import { stackNavigatorFactory } from 'react-nativescript-navigation'
import { HomeScreen } from './HomeScreen'
import { SecondaryScreen } from './SecondaryScreen'

const StackNavigator = stackNavigatorFactory()

export const mainStackNavigator = () => (
  <BaseNavigationContainer>
    <StackNavigator.Navigator initialRouteName="Home">
      <StackNavigator.Screen name="Home" component={HomeScreen} />
      <StackNavigator.Screen name="Secondary" component={SecondaryScreen} />
    </StackNavigator.Navigator>
  </BaseNavigationContainer>
)
```

Inside `<StackNavigator.Navigator>` we have two screens. We can name them and use the screen's name to navigate.

From now on we can use the `<StackNavigator>` to navigate between screens.

```tsx
// HomeScreen.tsx
<flexboxLayout
  style={styles.container}
  onTap={() => {
    alert(`You have tapped on Hello World!`)
  }}
>
  <label>Hello World!</label>

  <button style={styles.button} onTap={() => navigation.navigate('Secondary')}>
    Go to next screen
  </button>
</flexboxLayout>
```

:::tip Note

React NativeScript Navigation's TabNavigator and StackNavigator have fewer configurable options than React Navigation's ones – this is because the React NativeScript Navigation navigators are fully native, and so are ultimately limited by the styling options that are possible natively (and the way that NativeScript Core wraps them).

:::

## Angular

### Getting Started

Are you ready to build your app with the tools you already know?

<!-- tab:npm -->

```cli
npm i nativescript -g
ns create myCoolApp --angular // or --ng for short
```

<!-- tab:yarn -->

```cli
yarn global add nativescript
ns create myCoolApp --angular // or --ng for short
```

### Hello World

Let's see what the basic app has out of the box, and break down what's happening behind the scenes.

```ts
// main.ts
import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular'

import { AppModule } from './app/app.module'

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule)
})
```

### Styling

To apply styles we can use inline styles, inline attributes or css...

### Interacting with the UI

### Showing different screens

## Svelte

### Getting Started

Are you ready to build your app with the tools you already know?

<!-- tab:npm -->

```cli
npm i nativescript -g
ns create myCoolApp --svelte
```

<!-- tab:yarn -->

```cli
yarn global add nativescript
ns create myCoolApp --svelte
```

### Hello World

Let's see what the basic app has out of the box, and break down what's happening behind the scenes.

```ts
// app.ts
import { svelteNative } from 'svelte-native'
import App from './App.svelte'
svelteNative(App, {})
```

```vue
// App.svelte
<page>
    <gridLayout>
        <label text="Hello World!">
    </gridLayout>
</page>
```

### Styling

To apply styles we can use inline styles, inline attributes or css...

### Interacting with the UI

```vue
// App.svelte
<page>
    <gridLayout>
        <label text="Hello World!" on:tap="{onButtonTap}">
    </gridLayout>
</page>

<script lang="typescript">
let message: string = "Blank Svelte Native App"
function onButtonTap() {
    alert("asd");
}
</script>
```

### Showing different screens
