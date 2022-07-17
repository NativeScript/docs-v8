---
title: Trace
---

## Trace

Tracing is the process of logging diagnostic information about your application at runtime. This module is useful for debugging, which could provide detailed info about internal workings of the app. When developers are developing an app they tend to add `console.log()` for debugging. When it's time to launch the app to production, you have to remove those `console.log()`s. To remove those `console.log()` from all the places you left them is tedious. The `Trace` module comes in handy because it allows you to disable the `Trace.write()` from one place by calling `Trace.disable()`.

This article uses the StackBlitz editor and the Nativescript Preview app to demostrate different use cases of the `Trace` module. You need to download the app from Google Play or App Store. Once you've downloaded the app, use your phone Camera to scan the QR shown in the `Preview` tab.

The following are the 3 basic steps to take in order to use the Trace module. The first two step must be executed earlier in your applicaton, usually in the `app.ts` file. 1. If you have specific categor(ies)y you want to trace, set them by calling `Trace.setCategories("category"))` or `Trace.setCategories(Trace.categories.concat(cat1,cat2))`. 2. Enable tracing by call `Trace.enable()`. 3. call the `Trace.write()` where you would call `console.log()`

### Creating Custom Trace Writer

Why would create a custon writer?

See `app/trace/trace-writer.ts` for an example of how to create a custom Trace Writer.

<iframe width="100%" height="600px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-gdglmn?file=app/trace/trace-writer.tsl"></iframe>

### Registering a custom Trace Writer

In order to use the custom TraceWriter instance, you have to register it with the
