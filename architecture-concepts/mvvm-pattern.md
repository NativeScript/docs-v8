---
title: MVVMM Pattern
---

## Mvvm Pattern

MVVM ([Model-View-ViewModel](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)) is the base pattern on which NativeScript framework is built. It facilitates the separation of development of the graphical user interface( XML code) from development of the business logic( Javascript or Typescript code).

- **Model:** The model defines and represents the data. Separating the model from the various views that might use it allows for code reuse, better code maintainance and better testing.
- **View:** The view represents the UI( [Button](/ui/components.md#button), [Page](/ui/components.md#page), [Label](/ui/components.md#label), etc), which in NativeScript is written in XML. The view is often data-bound to the view model so that changes made to the properties in the view model instantly trigger visual changes to UI components.
- **View Model:** The view model contains the application business logic (often including the model, and exposes the data to the view. The `Observable` facilitates creating a view model object that can be bound to the view.
  The biggest benefit of separating models, views, and view models, is that you are able to use two-way data binding; that is, changes to data in the model get instantly reflected on the view, and vice versa. The other big benefit is code reuse, as you're often able to reuse models and view models across views.

The biggest benefit of separating models, views, and view models, is that you are able to use two-way data binding; that is, changes to data in the model get instantly reflected on the view, and vice versa. The other big benefit is code reuse, as you're often able to reuse models and view models across views.

### MVVM example

By default, when you create a new Nativescript app with the `ns create appName` command, you get an app project already arranged using the MVVM pattern. For example:

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-cy1pcz?embed=1&hideExplorer=0&file=app/main-view-model.ts
"></iframe>
