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

### Binding in code

The example below consists of a Label, TextField and a source property to which the UI controls are bound. First, the **source** object is created with a **textSource** property, initially set to an empty string and then is bound to both the `TextField` and `Label` elements. Then when the user inputs new string into the `TextField`, the two-way binding will update the TextField's text property. Since the Label is bound to the same property, its text property will also be updated. For the Label the data flow is one-way,as the changes only propagate from the code to the UI. For a constant flow of changes propagation from the source property to the Label, the source property has to raise a **propertyChange** event in order to notify the Label of the changes. To raise this event, a built-in class is used, which provides this functionality - [Observable](/nativescript-core/observable.md).

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-itpjy3?embed=1&hideExplorer=0&file=app/main-view-model.ts"></iframe>

### Binding in XML

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

### Binding to a property

An important part of the data binding is setting the source object. For a continuous flow of data changes, the source property needs to emit a **propertyChange** event. NativeScript data binding works with any object that emits this event. Adding a **binding** source happens by passing it as a second parameter in the method `bind(bindingOptions, source)`. This parameter is optional and could be omitted, in which case a property named **bindingContext** of the `View` class is used as the source. What is special about this property is that it is inheritable across the visual tree. This means that a UI control can use the **bindingContext** of the first of its parent elements, which has an explicitly set **bindingContext**. In the example from [Binding in Code](), the **bindingContext** can be set either on a [Page]() instance or a [StackLayout]() instance and the [TextField]() will inherit it as a proper source for the binding of its "text" property.

### Parent Binding

Another common case in working with bindings is requesting access to the parent binding context. It is because it might be different from the binding context of the child and might contain information which the child has to use. Generally, the binding context is inheritable, but not when the elements (items) are created dynamically based on some data source. For example, ListView creates its child items based on an itemТemplate, which describes what the ListView element will look like. When this element is added to the visual tree, it gets for binding context an element from a ListView items array (with the corresponding index). This process creates a new binding context chain for the child item and its inner UI elements. So, the inner UI element cannot access the binding context of the ListView. In order to solve this problem, NativeScript binding infrastructure has two special keywords: `$parent` and `$parents`. While the first one denotes the binding context of the direct parent visual element, the second one can be used as an array (with a number or string index). This gives you the option to choose either N levels of UI nesting or get a parent UI element with a given type. Let's see how this works in a realistic example.

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-y6sj7k?embed=1&hideExplorer=0&&file=app/main-page.xml"></iframe>

::: tip Note
If the value of the `items` property of the `ListView` is an array of primitives, such as the one in the preceeding example, you use the `$value` variable to access the current item of the array.
:::
