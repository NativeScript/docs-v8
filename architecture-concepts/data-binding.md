---
title: Data Binding
---

## Data Binding

The purpose of this article is to explain what Data Binding is and how it works in NativeScript.

Data binding is the process of connecting application user interface (UI) to a data object (code). It enables changes propagation by reflecting UI modifications in the code and vice versa.

::: tip Note

1. In this article `source` is used as any object in the code and `target` as any UI control (like [TextField](/ui/components.html#textfield)).

2. The article uses StackBlitz IDE + Nativescript Preview app to show different examples of data binding in Nativescript. Use these tools to try out the code snippets provided throughout the article.
   :::

### Data flow direction

Part of the data binding settings deals with how the data flows between the UI( XML code) and the data object. NativeScript data binding supports the following data transmissions:

- **One-Way**: This is the default setting, which ensures that the target property updates when a change in the source property occurs. However, UI modification will not update the code.
- **Two-Way**: This setting ensures the reflection of changes in both directions — from target to source and source to target. You can use two-way data binding when you need to handle user input.

## Two-way binding

### Creating a two-way data binding in code

The example below consists of a Label, TextField and a source property to which the UI controls are bound. First, the **source** object is created with a **textSource** property, initially set to an empty string and then is bound to both the `TextField` and `Label` elements. Then when the user inputs new string into the `TextField`, the two-way binding will update the TextFiled's text property. Since the Label is bound to the same property, its text property will also be updated. For the Label the data flow is uni-directional, though. For a constant flow of changes propagation from the source property to the Label, the property in the code has to raise a **propertyChange** event in order to notify the Label of the changes. To raise this event, a built-in class is used, which provides this functionality - [Observable](/nativescript-core/observable.md).

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-itpjy3?embed=1&hideExplorer=0&file=app/main-view-model.ts"></iframe>

### Creating binding in XML

To create a binding in XML, a source object is needed, which will be created the same way, as in the example above. Then the binding is created in the XML using a mustache(`{{ }}`) syntax. With an XML declaration, only the names of the properties are set - for the target: text, and for source: textSource. The interesting thing here is that the source of the binding is not specified explicitly.

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
