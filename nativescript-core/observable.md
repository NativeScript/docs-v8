---
title: Observable
---

## Observable

The `Observable` class is at the foundation of data binding in Nativescript. Data binding is the process of connecting application user interface (UI) to a data object (code/source of truth). It enables constant changes propagation by reflecting UI modifications in the code and vice versa. In order for the changes propagation to occur, the property in the code has to raise a propertyChange event in order to notify the UI component for the changes. The Observable class is what raises that event.

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

MVVM ([Model-View-ViewModel](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)) is the base pattern on which NativeScript framework is built. MVVM facilitates a separation of development of the graphical user interface from development of the business logic or back-end logic (the data model).

- **Model:** The model defines and represents the data. Separating the model from the various views that might use it allows for code reuse.
- **View:** The view represents the UI, which in NativeScript is written in XML. The view is often data-bound to the view model so that changes made to the view model in JavaScript instantly trigger visual changes to UI components.
- **View Model:** The view model contains the application logic (often including the model), and exposes the data to the view. NativeScript provides a module called Observable, which facilitates creating a view model object that can be bound to the view.
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

## Two Way

Two-way data binding is a way of binding that combines binding from and to the application UI (binding to model and binding to UI). A typical example is a `TextField` that reads its value from the Model but also changes the Model based on user input.

The example is demonstrating two-way binding via code-behind. The `TextField` accepts an empty string as initial value (the same binding is used for the `Label` element). Then when the user inputs new string into the `TextField`, the two-way binding will update the label's text property simultaneously.

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-itpjy3?embed=1&hideExplorer=0&file=app/main-view-model.ts"></iframe>

To create a binding in XML, a source object is needed, which will be created the same way, as in the example above. Then the binding is described in the XML (using a mustache syntax). With an XML declaration, only the names of the properties are set - for the target: text, and for source: textSource. The interesting thing here is that the source of the binding is not specified explicitly.

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd">
    <StackLayout>
        <TextField text="{{ someSourceProperty }}" />
    </StackLayout>
</Page>
```

::: tip Note
When creating UI elements with an XML declaration, the data binding is two-way by default.
:::

## API References

| Name                                                                                            | Type    |
| ----------------------------------------------------------------------------------------------- | ------- |
| [@nativescript/core/observable](https://docs.nativescript.org/api-reference/classes/observable) | `Class` |
