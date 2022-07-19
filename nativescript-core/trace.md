---
title: Trace
---

## Trace

Tracing is the process of logging diagnostic information about your application at runtime. This module is useful for debugging. When developing an app, develpers tend to add `console.log()` to test out different values in the code. When it's time to launch the app to production, you have to remove those `console.log()`s for clean up. To remove those `console.log()` from all the places you left them is tedious. The `Trace` module comes in handy because it allows you to disable the `Trace.write()` from one place by calling `Trace.disable()`.

This article uses the StackBlitz editor and the Nativescript Preview app to demostrate different use cases of the `Trace` module. You need to download the app from Google Play or App Store. Once you've downloaded the app, use your phone Camera to scan the QR shown in the `Preview` tab.

The following are the 3 basic steps to take in order to use the Trace module. The first two step must be executed earlier in your applicaton, usually in the `app.ts` file.

1. If you have specific categor(ies)y you want to trace, set them by calling:

```ts
Trace.setCategories("category"))
// or
Trace.setCategories(Trace.categories.concat("category1","category2"));
```

Setting categor(ies)y makes the message for the category you pass as the second parameter of Trace.write() to print on the console.

2. Enable tracing

```ts
Trace.enable()
```

3. Call the `Trace.write()` where you would call `console.log()` passing it a message,a category name and optionally, a message type. The category should be one of those you set with `Trace.setCategories()`

```ts
Trace.write('some message', 'category')
```

### Creating Custom Trace Writer

The default Nativescript TraceWriter instance only allows you to handle the message of type `log`. The other message types you could handle are `info`, `warn` and `error`.
With a custom TraceWriter you can capture those message types and handle them accordingly.

See `app/trace/trace-writer.ts` for an example of how to create a custom Trace Writer.

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-gdglmn?file=app/trace/trace-writer.tsl"></iframe>

### Registering a custom Trace Writer

In order to use the custom TraceWriter instance, you have to register it with the Trace module, using the `addWriter()` method.

```js
Trace.addWriter(new TimestampConsoleWriter())
```

```ts
Trace.addWriter(new TimestampConsoleWriter())
```

### Predefined categories

- Trace.categories.VisualTreeEvents = `"VisualTreeEvents"`
- Trace.categories.Layout = `"Layout"`
- Trace.categories.Style = `"Style"`
- Trace.categories.ViewHierarchy = `"ViewHierarchy"`
- Trace.categories.NativeLifecycle = `"NativeLifecycle"`
- Trace.categories.Debug = `"Debug"`
- Trace.categories.Navigation = `"Navigation"`
- Trace.categories.Test = `"Test"`
- Trace.categories.Binding = `"Binding"`
- Trace.categories.BindingError = `"BindingError"`
- Trace.categories.Error = `"Error"`
- Trace.categories.Animation = `"Animation"`
- Trace.categories.Transition = `"Transition"`
- Trace.categories.Livesync = `"Livesync"`
- Trace.categories.ModuleNameResolver = `"ModuleNameResolver"`
- Trace.categories.All(All of the categories above).
- Trace.categories.concat(`"cat1"`, `"cat2"`, `"cat3"`, `"cat4"`).

### Message Types

- `log = 0`
- `info = 1`
- `warn = 2`
- `error = 3`

### Error handling

The Trace module also allows you to set a single error handler(`TraceErrorHandler`) to handle errors you capture with `Trace.error("Error messsage" | Error)` at different places in your app.

```ts
const errorHandler: TraceErrorHandler = {
  handlerError(error: Error) {
    console.log(error.stack)
  }
}

// Register errorHandler
Trace.setErrorHandler(errorHandler)
```

### Trace functionss

| Name                                                    | Type                | Description                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addCategories(categories: string)`                     | `void`              | Adds categories to existing categories the module will trace.<br> `categories`: The comma-separated list of categories. If not specified all messages from all categories will be traced.                                                                                   |
| `addWriter(writer: TraceWriter)`                        | `void`              | Adds a TraceWriter instance to the trace module. <br> `writer`: The TraceWriter instance to add.                                                                                                                                                                            |
| `clearWriters()`                                        | `void`              | Clears all the writers from the trace module.                                                                                                                                                                                                                               |
| `disable()`                                             | `void`              | Disables the trace module.                                                                                                                                                                                                                                                  |
| `enable()`                                              | `void`              | Enables the trace module.                                                                                                                                                                                                                                                   |
| `setCategories(categories: string)`                     | `void`              | Sets the categories the module will trace. <br> `categories`: The comma-separated list of categories. If not specified all messages from all categories will be traced.                                                                                                     |
| `error(error: string \| Error)`                         | `void`              | Passes an error to the registered ErrorHandler. <br>`error`: The error to be handled.                                                                                                                                                                                       |
| `getErrorHandler()`                                     | `TraceErrorHandler` | Get the registered TraceErrorHandler.                                                                                                                                                                                                                                       |
| `setErrorHandler(handler: TraceErrorHandler)`           | `void`              | Registers an error handler.                                                                                                                                                                                                                                                 |
| `isCategorySet(category: string)`                       | `boolean`           | Check if category is already set in trace module.                                                                                                                                                                                                                           |
| `isEnabled()`                                           | `boolean`           | A function that returns whether the tracer is enabled and there is a point in writing messages. Check this to avoid writing complex string templates and send error messages even if tracing is disabled.                                                                   |
| `notifyEvent(object: Object, name: string, data?: any)` | `void`              | Notifies all the attached listeners for an event that has occurred in the sender object. <br>`object`: The Object instance that raised the event.<br>`name`: The name of the raised event.<br>`data`: An optional parameter that passes the data associated with the event. |
| `removeWriter(writer: TraceWriter)`                     | `void`              | Removes a `TraceWriter` instance from the trace module.<br>`writer`: The TraceWriter instance to remove.                                                                                                                                                                    |
| `write(message: any, category: string, type?: number)`  | `void`              | Writes a message using the available writers. <br>`message`: The message to be written.<br>`category`: The category of the message.<br>`type`: Optional, the type of the message - info, warning, error.                                                                    |

## API References

| Name                                                                                  | Type     |
| ------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/trace](https://docs.nativescript.org/api-reference/modules/trace) | `Module` |
