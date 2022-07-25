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
