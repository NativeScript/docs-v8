---
title: Observable
---

## Observable

The `Observable` class is at the foundation of data binding in Nativescript. Data binding is the process of connecting application user interface (UI) to a data object (code/source of truth). It enables constant changes propagation by reflecting UI modifications in the code and vice versa. In order for the changes propagation to occur, the property in the code has to raise a propertyChange event in order to notify the UI component for the changes. The Observable class is what raises that event.

### Usage

Use the `set()` method to add the different properties and event handlers you want to bind the UI to.

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-fkau2c?embed=1&hideExplorer=0&file=app/main-page.xml"></iframe>

### Creating Observable with fromObject Method

The `fromObject()` method creates an `Observable` instance and sets its properties according to the supplied JavaScript object.

```js
import { fromObject } from '@nativescript/core'

const newViewModel = fromObject({ myColor: 'Lightgray' })
// the above is equal to
/*
    let newViewModel = new Observable();
    newViewModel.set("myColor", "Lightgray");
*/
```

```ts
const newViewModel: Observable = fromObject({ myColor: 'Lightgray' })
// the above is equal to
/*
    let newViewModel = new Observable();
    newViewModel.set("myColor", "Lightgray");
*/
```

### Creating Observable with fromObjectRecursive Method

The `fromObjectRecursive()` method creates an Observable instance and sets its properties according to the supplied JavaScript object. This function will create new Observable for each nested object (except arrays and functions) from supplied JavaScript object.

```js
// fromObjectRecursive will create new Observable for each nested object (except arrays and functions)
const nestedViewModel = fromObjectRecursive({
  client: 'John Doe',
  favoriteColor: { hisColor: 'Green' } // favoriteColor is an Observable (using recursive creation of Observables)
})
// the above is equal to
/*
    let newViewModel2 = new Observable();
    newViewModel2.set("client", "John Doe");
    newViewModel2.set("favoriteColor", fromObject( {hisColor: "Green" }));
*/
```

```ts
// fromObjectRecursive will create new Observable for each nested object (except arrays and functions)
const nestedViewModel: Observable = fromObjectRecursive({
  client: 'John Doe',
  favoriteColor: { hisColor: 'Green' } // favoriteColor is an Observable (using recursive creation of Observables)
})
// the above is equal to
/*
    let newViewModel2 = new Observable();
    newViewModel2.set("client", "John Doe");
    newViewModel2.set("favoriteColor", fromObject( {hisColor: "Green" }));
*/
```

### Adding Event Listener and Using propertyChangeEvent

Using propertyChangeEvent and responding to property changes with arguments of type PropertyChangeData.

```js
const myListener = viewModel.addEventListener(Observable.propertyChangeEvent, args => {
  // args is of type PropertyChangeData
  console.log('propertyChangeEvent [eventName]: ', args.eventName)
  console.log('propertyChangeEvent [propertyName]: ', args.propertyName)
  console.log('propertyChangeEvent [value]: ', args.value)
  console.log('propertyChangeEvent [oldValue]: ', args.oldValue)
})
```

```ts
const myListener = viewModel.addEventListener(Observable.propertyChangeEvent, args => {
  // args is of type PropertyChangeData
  console.log('propertyChangeEvent [eventName]: ', args.eventName)
  console.log('propertyChangeEvent [propertyName]: ', args.propertyName)
  console.log('propertyChangeEvent [value]: ', args.value)
  console.log('propertyChangeEvent [oldValue]: ', args.oldValue)
})
```

### Removing Event Listener

The event listeners can be explicitly removed when no longer needed.

```js
viewModel.removeEventListener(Observable.propertyChangeEvent, myListener)
```

```ts
viewModel.removeEventListener(Observable.propertyChangeEvent, myListener)
```

## Mvvm Pattern

MVVM ([Model-View-ViewModel](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)) is the base pattern on which NativeScript framework is built. MVVM facilitates a separation of development of the graphical user interface from development of the business logic or back-end logic (the data model).

- **Model:** The model defines and represents the data. Separating the model from the various views that might use it allows for code reuse.
- **View:** The view represents the UI, which in NativeScript is written in XML. The view is often data-bound to the view model so that changes made to the view model in JavaScript instantly trigger visual changes to UI components.
- **View Model:** The view model contains the application logic (often including the model), and exposes the data to the view. NativeScript provides a module called Observable, which facilitates creating a view model object that can be bound to the view.
  The biggest benefit of separating models, views, and view models, is that you are able to use two-way data binding; that is, changes to data in the model get instantly reflected on the view, and vice versa. The other big benefit is code reuse, as you're often able to reuse models and view models across views.

The biggest benefit of separating models, views, and view models, is that you are able to use two-way data binding; that is, changes to data in the model get instantly reflected on the view, and vice versa. The other big benefit is code reuse, as you're often able to reuse models and view models across views.

For the MVVM pattern in a NativeScript application with Plain JavaScript, see the `app` directory structure at [Observable class usage](#observable-class-basic-usage).

### MVVM with Typescript
