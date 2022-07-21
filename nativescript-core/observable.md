---
title: Observable
---

## Observable

The `Observable` class is at the foundation of data binding in Nativescript. Data binding is the process of connecting application user interface (UI) to a data object (code). It enables constant changes propagation by reflecting UI modifications in the code and vice versa. In order for the changes propagation to occur, the property in the code has to raise a `propertyChange` event to notify the UI component about the changes. The `Observable` class is what raises the `propertyChange` events. Read more on data binding [in this article](/architecture-concepts/data-binding).

### Usage

Use the `set()` method to add the different properties and event handlers you want to bind the UI to.

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-fkau2c?embed=1&hideExplorer=0&file=app/main-page.xml"></iframe>

### Creating Observable with fromObject() Method

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

### Creating Observable with fromObjectRecursive() Method

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

MVVM ([Model-View-ViewModel](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)) is the base pattern on which NativeScript framework is built. It facilitates the separation of development of the graphical user interface( XML code) from development of the business logic( Javascript or Typescript code).

- **Model:** The model defines and represents the data. Separating the model from the various views that might use it allows for code reuse.
- **View:** The view represents the UI, which in NativeScript is written in XML. The view is often data-bound to the view model so that changes made to the view model in JavaScript instantly trigger visual changes to UI components.
- **View Model:** The view model contains the application logic (often including the model), and exposes the data to the view. The `Observable` facilitates creating a view model object that can be bound to the view.
  The biggest benefit of separating models, views, and view models, is that you are able to use two-way data binding; that is, changes to data in the model get instantly reflected on the view, and vice versa. The other big benefit is code reuse, as you're often able to reuse models and view models across views.

The biggest benefit of separating models, views, and view models, is that you are able to use two-way data binding; that is, changes to data in the model get instantly reflected on the view, and vice versa. The other big benefit is code reuse, as you're often able to reuse models and view models across views.

For the MVVM pattern in a NativeScript application with Plain JavaScript, see the `app` directory structure at [Observable class usage](#observable-class-basic-usage).

### MVVM with Typescript

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-cy1pcz?embed=1&hideExplorer=0&file=app/main-view-model.ts
"></iframe>

## Parent Binding

Another common case in working with bindings is requesting access to the parent binding context. It is because it might be different from the binding context of the child and might contain information which the child has to use. Generally, the binding context is inheritable, but not when the elements (items) are created dynamically based on some data source. For example, ListView creates its child items based on an itemТemplate, which describes what the ListView element will look like. When this element is added to the visual tree, it gets for binding context an element from a ListView items array (with the corresponding index). This process creates a new binding context chain for the child item and its inner UI elements. So, the inner UI element cannot access the binding context of the ListView. In order to solve this problem, NativeScript binding infrastructure has two special keywords: `$parent` and `$parents`. While the first one denotes the binding context of the direct parent visual element, the second one can be used as an array (with a number or string index). This gives you the option to choose either N levels of UI nesting or get a parent UI element with a given type. Let's see how this works in a realistic example.

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-y6sj7k?embed=1&hideExplorer=0&&file=app/main-page.xml"></iframe>

::: tip Note
If the value of the `items` property of the `ListView` is an array of primitives, such as the one in the preceeding example, you use the `$value` variable to access the current item of the array.
:::

## Static properties

| Name                  | Type     | Description                                             |
| --------------------- | -------- | ------------------------------------------------------- |
| `propertyChangeEvent` | `string` | String value used when hooking to propertyChange event. |

## Static methods

| Name                                                                    | Return Type | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `on(eventNames: string, callback: any, thisArg?: any)`                  | `void`      | A basic method signature to hook an event listener (shortcut alias to the addEventListener method). <br><br> **Parameters:** <br>`eventNames`: String corresponding to events (e.g. "propertyChange"). Optionally could be used for more events separated by `,` (e.g. "propertyChange", "change").<br>`callback`: A callback function which will be executed when the event(s) is raised. <br>`thisArg`: An optional parameter which will be used as `this` context for callback execution.                                             |
| `once(eventName: string, callback: any, thisArg?: any)`                 | `void`      | The name(s) of the event(s) to attach to. <br><br> **Parameters:** <br>`eventName`: String corresponding to events (e.g. "propertyChange"). Optionally could be used for more events separated by `,` (e.g. "propertyChange", "change").<br>`callback`: A callback function which will be executed when the event(s) is raised. <br>`thisArg`: An optional parameter which will be used as `this` context for callback execution.                                                                                                        |
| `off(eventNames: string, callback?: any, thisArg?: any)`                | `void`      | Shortcut alias to the removeEventListener method.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `addEventListener(eventName: string, callback: any, thisArg?: any)`     | `void`      | Adds a listener for the specified event name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `removeEventListener(eventName: string, callback?: any, thisArg?: any)` | `void`      | The name(s) of the event(s) to attach to. <br><br> **Parameters:** <br>`eventName`: String corresponding to events (e.g. "propertyChange"). Optionally could be used for more events separated by `,` (e.g. "propertyChange", "change").<br>`callback`: An optional parameter pointing to a specific listener. If not defined, all listeners for the event names will be removed. <br>`thisArg`: An optional parameter which when set will be used to refine the search of the correct callback which will be removed as event listener. |

## Instance methods

All the static methods above have their `Observable` instance counterparts.

| Name                                                                     | Return Type | Description                                                                                                                                                    |
| ------------------------------------------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `set(name: string, value: any)`                                          | `void`      | Creates or updates the specified property with the provided value.                                                                                             |
| `setProperty(name: string, value: any)`                                  | `void`      | Updates the specified property with the provided value and raises a property change event and a specific change event based on the property name.              |
| `get(name: string)`                                                      | `any`       | Gets the value of the specified property.                                                                                                                      |
| `notify<T extends NotifyData>(data: T)`                                  | `void`      | Notifies all the registered listeners for the event provided in the data.eventName. <br><br>**Parameter(s):** <br> `data`: The data associated with the event. |
| `notifyPropertyChange(propertyName: string, value: any, oldValue?: any)` | `void`      | Notifies all the registered listeners for the property change event.                                                                                           |
| `hasListeners(eventName: string)`                                        | `boolean`   | Checks whether a listener is registered for the specified event name. <br> `eventName`: The name of the event to check for.                                    |

## propertyChangeEvent data

| Name           | Type         | Description                                        |
| -------------- | ------------ | -------------------------------------------------- |
| `eventName`    | `string`     | The name of the event.                             |
| `object`       | `Observable` | The Observable instance that has raised the event. |
| `propertyName` | `string`     | The name of the property that has changed.         |
| `value`        | `any`        | The new value of the property.                     |
| `oldValue?`    | `any`        | The previous value of the property.                |

## Other functions

| Name                            | Return Type  | Description                                                                                                                                                                                                                                                                                                               |
| ------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fromObject(obj: any)`          | `Observable` | Creates an `Observable` instance and sets its properties according to the supplied JavaScript object. <br> `obj`: A JavaScript object used to initialize Nativescript `Observable` instance.                                                                                                                              |
| `fromObjectRecursive(obj: any)` | `Observable` | Creates an Observable instance and sets its properties according to the supplied JavaScript object. This function will create new Observable for each nested object (except arrays and functions) from supplied JavaScript object. <br> `obj`: A JavaScript object used to initialize Nativescript `Observable` instance. |

## API References

| Name                                                                                            | Type    |
| ----------------------------------------------------------------------------------------------- | ------- |
| [@nativescript/core/observable](https://docs.nativescript.org/api-reference/classes/observable) | `Class` |
