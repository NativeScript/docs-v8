---
title: Trace
---

## Trace

This module provides a good way to streamline error logging and handling throughout the framework. It gives you a way to define custom TraceWriters and ErrorHandlers for your app and even specify different sets of those to be used in during development and in production.
When developing an app, developers tend to add `console.log()` to test out different values in the code. When it's time to launch the app to production, you have to remove those `console.log()`s for clean up. To remove those `console.log()` from all the places you left them is tedious. You can instead use the `Trace.write()` function, and then call the `Trace.disable()` once to switch off all of them.

This article uses the StackBlitz IDE and the Nativescript Preview app to demostrate different use cases of the `Trace` module. You need to download the app from Google Play or App Store. Once you've downloaded the app, use your phone Camera to scan the QR shown in the `Preview` tab.

The following are the 3 basic steps to take in order to use the Trace module. The first two step should be executed earlier in your applicaton, usually in the `app.ts` file.

1. If you have specific categor(ies)y you want to trace, set them by calling:

```ts
Trace.setCategories("category"))
// or
Trace.setCategories(Trace.categories.concat("category1","category2"));
```

Setting categor(ies)y makes the message for the category you pass as the second parameter of `Trace.write()` to print to the console.

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

A big difference between web and NativeScript applications is the way the Errors are handled. Currently, when an unhandled exception is thrown in NativeScript, the app will crash, and an Error with the corresponding stack trace will be shown. In some cases, this seems to be the expected behaviour when the app is in **development** mode. You would want to have the stack trace of the exact location the unexpected error has occurred so that you can more easily understand what happened and fix the issue. However, when the app is in **production** similar application crashes can seriously hurt your application credibility and drive away customers. In many cases, you might prefer something else (e.g. app freeze, blank screen, failed navigation) to an actual crash with an error log.

Through the `Trace` module, Nativescript provides you with the ability to handle errors differently depending on whether the app is in **development** or **production** mode. When creating this module, the following 3 scenarios were taken into consideration:

1. (**development mode**) Throw exceptions as soon as an error occurs.
1. (**development mode**) Show a scary console.log with `"ERROR: Something bad happened"` but continue the execution of the app. You will see it in your terminal, but decide if it is critical based on what happens with the app after that.
1. (**production mode**) Send an error report to your analytics/error-report server but continue app execution. Maybe trigger some recover logic that will handle the app without a crash.

### Defining custom error handler

The default error handler will just throw the errors as they come. The following is a simple example showing how to define a custom handler to deal with the scenarios above:

```ts
const errorHandler: TraceErrorHandler = {
  handlerError(err) {
    // Option 1 (development) - throw the error
    throw err

    // Option 2 (development) - logging the error via write method provided from trace module
    Trace.write(err, 'unhandled-error', type.error)

    // (production) - custom functionality for error handling
    // reportToAnalytics(err)
  }
}

// Register errorHandler
Trace.setErrorHandler(errorHandler)
```

The `errorHandler` will be called whenever `Trace.error(...)` is called.

### Disabling rethrowing of uncaught JS exceptions to native

Nativescript provides developers with the property called `discardUncaughtJsExceptions` that allows you to configure whether unhandled exceptions coming from JavaScript code which has been called from the native platform should be caught or not. This option is disabled by default and to enable it you have to set the `discardUncaughtJsExceptions` property to `true` inside the `app/package.json` file.

Switching it on will cause JS exceptions to be caught without being propagated to the native world, effectively protecting the app from crashing. All discarded exceptions can be processed in the app by either subscribing to the `Application.discardedErrorEvent` and using the received `DiscardedErrorEventData` instance, or by assigning a one-argument function to `global.__onDiscardedError` which will receive the exception as a `NativeScriptError` instance. Usually you would want to log and/or report the exception to analytics.

<!--tabs: app/package.json -->

```json
{
    "main": "app.js",
    "discardUncaughtJsExceptions": true,
    ...
}
```

```ts
import { Application, DiscardedErrorEventData } from '@nativescript/core'

Application.on(Application.discardedErrorEvent, function (args: DiscardedErrorEventData) {
  const error = args.error

  console.log('Received discarded exception: ')
  console.log(error.message)
  console.log(error.name)
  console.log(error.stack)
  console.log(error.nativeError)
  //report the exception in your analytics solution here
})
```

### Trace functions

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
