---
title: Debuggig
---

# Debugging

## Visual Studio Code

To debug NativeScript applications in [Visual Studio Code](https://code.visualstudio.com/), you need the [NativeScript extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Telerik.nativescript).

## Chrome DevTools

Debugging Android and iOS applications with Chrome by executing `ns debug <android | ios>`.

<!-- ### iOS with WebKit Web Inspector

To debug iOS applications using the WebKit Web Inspector debugger use the `--inspector` flag - `ns debug ios --inspector`. -->

The following is an overview of the features supported in Chrome DevTools when debugging NativeScript applications.

|                            | ANDROID CHROME DEVTOOLS | IOS SAFARI APPINSPECTOR | IOS CHROME DEVTOOLS | VSCODE EXTENSION |
| -------------------------- | ----------------------- | ----------------------- | ------------------- | ---------------- |
| Debugger                   | ✔                       | ✔                       | ✔                   | ✔                |
| Console                    | ✔                       | ✔                       | ✔                   | ✔                |
| Resources                  | ✔                       | ✔                       | ✔                   | not applicable   |
| Network                    | ✔                       | ✔                       | ✔                   | not applicable   |
| Elements (DOM)             | ✔                       | ✘                       | ✔                   | not applicable   |
| Elements (Styles)          | ✘                       | ✘                       | ✘                   | not applicable   |
| Memory Profiling           | ✘                       | ✘                       | ✘                   | not applicable   |
| Timeline and CPU Profiling | ✘                       | ✔                       | ✘                   | not applicable   |

### Debugger

Very often you need to reproduce a bug many times to get to the root of the problem. The debugger feature can help you find and diagnose the bugs occurring at runtime using the following techniques:

- [Pause code with breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints/) - Set a breakpoint so that you can pause your code in the middle of its execution. Once your code is paused (Figure 1), you can [step through it](https://developer.chrome.com/docs/devtools/javascript/#code-stepping) to investigate the control flow and property values.

```js
console.log('a')
console.log('b')
debugger
console.log('c')
```

Figure 1: A line-of-code breakpoint set on line 29: Setting breakpoints
![Line of code breakpoint example](https://wd.imgix.net/image/admin/0BqKJaEX3Afeq6s5GbA6.png?auto=format&w=1600)

:::tip Note:
Sometimes when the code you want to debug executes too early, for example during application initialization, you will have to place a [Line-of-code breakpoint](https://developer.chrome.com/docs/devtools/javascript/#line-breakpoint) - `debugger;` statement in your code and start the debugging process with the [`--debug-brk`](/development-workflow/cli-basics.md#debug) CLI flag to allow the DevTools enough time to connect and attach before your code is executed.
:::

- [Inspect local and global properties, and variables](https://developer.chrome.com/docs/devtools/javascript/#check-values) - While paused on a line of code, use the Scope pane (Figure 3) to view and edit the values of properties and variables in the local, closure, and global scopes.

Figure 3: The Scope pane: Scope pane
![The Scope pane](https://wd.imgix.net/image/admin/Tynv55DnsSgtvpd6Iz9z.png?auto=format&w=1600)

:::tip Note:
The `Global` object in the context of a NativeScript application is a custom object and contains only a limited subset of the `Window` global object present in a Web application.
:::

- [Watch the values of custom JavaScript expressions](https://developer.chrome.com/docs/devtools/javascript/#watch-expressions) - Use the Watch pane (Figure 4) to watch the values of custom expressions. You can watch any valid JavaScript expression.

Figure 4: The Watch pane: Watch pane
![The Watch pane](https://wd.imgix.net/image/admin/iAZLQFWjCy2kNbYKPGpR.png?auto=format&w=1600)

- [View the current call stack](https://developer.chrome.com/docs/devtools/javascript/#scope) - While paused on a line of code, use the Call Stack pane (Figure 5) to view the call stack that got you to this point. Click on an entry to jump to the line of code where that function was called. The blue arrow icon on the left of the blue outline represents which function DevTools is currently highlighting.

Figure 5: Call stack: Call stack
![Call stack](https://wd.imgix.net/image/admin/Tynv55DnsSgtvpd6Iz9z.png?auto=format&w=1600)

:::tip Note:
To be able to debug code other than JavaScript, the transpiled sources should include [inlined source maps](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for your code (default when developing NativeScript apps with TypeScript).
::::

## Console

### [Writing to the console](https://developer.chrome.com/docs/devtools/console/api/#log)

One of the most natural things you can do to debug apps in any environment is writing to the system’s log. In NativeScript logging works a lot as it does on the web, as most of the same `console` APIs that work on the web also work in NativeScript.

The `console.log()` function is great for outputting primitive values such as strings, numbers, and booleans, but it doesn’t work so well for objects. For those situations you’ll want to use another of the `console` object’s methods intended for complex object output: `console.dir()`.

To see this in action add a `console.log()` in your app code, which uses `console.log()` to log a simple object.

```typescript
export function pageLoaded = () => {
    console.log({
      type: "Apple",
      color: "Red"
    });
};
```

If you look at your console, you’ll see the following not-very-helpful output.

```shell
JS: [object Object]
```

Now replace the `console.log` reference with `console.dir`. After the NativeScript CLI refreshes your app, you should see the full output of the object in your terminal or command prompt.

```shell
JS: === dump(): dumping members ===
JS: {
JS:     "type": "Apple",
JS:     "color": "Red"
JS: }
JS: === dump(): dumping function and properties names ===
JS: === dump(): finished ===
```

## Autocompleting commands and expressions

When you type in the Console, the Console automatically displays an autocomplete dropdown menu (Figure 6) of relevant methods that match the text that you have already typed. This includes previous commands that you executed.

Figure 6: Console autocomplete: Console autocomplete

![Console autocomplete](https://wd.imgix.net/image/admin/7HsvmvxxZifd5ZqkP4Hg.png?auto=format&w=1600)

### [Measure execution times](https://developer.chrome.com/docs/devtools/console/api/#time)

The `time()` method starts a new timer and is very useful to measure how long something took. Pass a string to the method to give the marker a name. When you want to stop the timer, call `timeEnd()` and pass it the same string passed to the initializer. The console then logs the label and time elapsed when the `timeEnd()` method fires.

### Evaluate expressions

Explore the state of any object of your global application scope, or the paused local scope from the Console by evaluating an expression just by typing it.

## Resources

Scripts loaded by the JavaScript Virtual Machine appear in the Sources panel, which you can then debug and place breakpoints in. Besides scripts all other text and image resources found in your application are also listed in the Sources panel, grouped by folder name by default. You can inspect and search inside the contents of XML, HTML, CSS, JSON, and image files. Text and image network responses are also stored there.

## Network

DevTools shows **all\*** network requests in the Network panel while the DevTools are open. In the panel you will find information about the requests made, whether they've completed, the response status and data.

- [View a log of requests](https://developer.chrome.com/docs/devtools/network/reference/#requests) - Use the Requests table (Figure 7) to view a log of all requests made while DevTools has been open. Clicking or hovering over requests reveals more information about them.

Figure 8: A log of requests

![A log of requests](https://wd.imgix.net/image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0lULFSOjRlz3L83HPcKX.png?auto=format&w=1600)

:::tip Note:
Time, Size, and Waterfall metrics may sometimes appear incorrectly or be missing altogether if a Status Code is available, however, that means a response has been received.
:::

- [View a preview of a response body](https://developer.chrome.com/docs/devtools/network/reference/#preview) - To view a preview of a response body: Click the URL of the request, Under the Name column of the Requests table. Click the Preview tab (Figure 8). This tab is mostly useful for viewing images.

Figure 8: A preview of a response body
![A preview of a response body](https://wd.imgix.net/image/NJdAV9UgKuN8AhoaPBquL7giZQo1/91J6iI0F1RkJZEXBysdR.png?auto=format&w=1600)

- [View a response body](https://developer.chrome.com/docs/devtools/network/reference/#response) - To view the response body to a request: Click the URL of the request, under the Name column of the Requests table. Click the Response tab (Figure 9).

Figure 9: The Response tab, outlined in blue: Response tab
![The Response tab](https://wd.imgix.net/image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KDZZBMl2isErxrNSY0gQ.png?auto=format&w=1600)

- [View HTTP headers](https://developer.chrome.com/docs/devtools/network/reference/#headers) - To view HTTP header data about a request: Click the URL of the request, under the Name column of the Requests table. Click the Headers tab (Figure 10).

Figure 10: The Headers tab, outlined in blue: Headers tab
![The Headers tab](https://wd.imgix.net/image/NJdAV9UgKuN8AhoaPBquL7giZQo1/0l9iRxK3yvrnha53NiKH.png?auto=format&w=1600)

- [View query string parameters](https://developer.chrome.com/docs/devtools/network/reference/#payload) - To view the query string parameters of a URL in a human-readable format: Open the Headers tab for the request you're interested in. Go to the Query String Parameters section.

:::tip Note:
This is currently available for the built-in [http module](/nativescript-core/http.md). For third-party modules that do network requests, additional code must be implemented to populate the Network Tab. See [Plugin author's guide](#plugin-authors-guide) for details on how to do it for your plugin.
:::

## Elements

The Elements panel in DevTools displays information about the current view tree, the attributes of each child, and its computed styles.

## Plugin author’s guide

Writing plugins is a great way to give back to the community by making application development ever easier by abstracting complex logic through a simple interface. What is even better is when your plugin can integrate almost seamlessly with the expanding arsenal of debugging tools provided by the platform. Following are the optional requirements and interfaces your plugin should comply to, to have your plugin's components/data shown in the respective DevTools panels.

- Elements panel (UI plugins) - The following content concerns only plugin authors who wrap and expose native Android/iOS views in their work. If you are a plugin author or plan to be one, you can either:

  - A: start off with a nativescript plugin template, which provides you with an already well-established structure to wrap native UI views in. To get started head over to the official [seed's](https://github.com/NativeScript/nativescript-plugin-seed)
    repository and follow the README instructions.

  - B: extend the [View](https://docs.nativescript.org/api-reference/classes/view) class or any of its subclasses. For detailed information, see this [Label Marquee](https://blog.nativescript.org/create-a-custom-view-plugin-marquee-label/) example.

- Network requests in plugins - **Note: The following content concerns only plugin authors who wrap and expose Android (Network agent in DevTools not yet supported with a public API in the iOS runtime) http functionalities.** To make your http functionality debuggable, there are callbacks you need to call at certain times of the lifecycle of the network request, following a [specific protocol](https://chromedevtools.github.io/devtools-protocol/). For your convenience, we've exposed callbacks and [TypeScript interfaces](https://github.com/NativeScript/NativeScript/blob/8f621a0df0f5c5660ed784944470e47bd6133825/tns-core-modules/debugger/debugger.ts#L48) to facilitate sending information to the Network agent.

  - Immediately before making the request:
    Check if the `global.__inspector` object is available, and whether the DevTools are connected:

  ```js
  if (global.__inspector && global.__inspector.isConnected) {
  }
  ```

  Build a [RequestData-compliant]() object, as declared in the debugger module. RequestData contains the minimum subset of properties needed to display request entries in the Network panel. Finally call to the runtime-exposed callback:

  ```js
  global.__inspector.requestWillBeSent(requestData)
  ```

  - When a response is received:

    Check if the `global.__inspector` object is available, and whether the DevTools are connected, as shown above. Build a [ResponseData-compliant](https://github.com/NativeScript/NativeScript/blob/8f621a0df0f5c5660ed784944470e47bd6133825/tns-core-modules/debugger/debugger.ts#L56) object, as declared in the debugger module. `ResponseData` contains the minimum subset of properties needed to display the response for a completed request.

    Build a [LoadingFinishedData-compliant](https://github.com/NativeScript/NativeScript/blob/8f621a0df0f5c5660ed784944470e47bd6133825/tns-core-modules/debugger/debugger.ts#L87) object, as declared in the debugger module. The object notifies the Network agent that a request has completed, as well as the time spent.

    Build a [SuccessfulRequestData-compliant](https://github.com/NativeScript/NativeScript/blob/8f621a0df0f5c5660ed784944470e47bd6133825/tns-core-modules/debugger/debugger.ts#L81) object, as declared in the debugger module. The object contains the response data, in a string format, the Id of the original request the response data corresponds to, and information whether the content should be base64-encoded, or not.

    Finally call the following runtime-exposed callbacks:

    ```js
    global.__inspector.responseReceived(responseData)
    global.__inspector.loadingFinished({
      requestId: requestIdStr,
      timestamp: getTimeStamp()
    })
    global.__inspector.dataForRequestId(successfulRequestData)
    ```

- Debugging typescript-transpiledTo debug your TypeScript plugin based on the sources, and not the transpiled JS, it is enough to edit the respective `tsconfig.json` to output sources with inlined maps. That will ensure that the TypeScript sources will also show in the Sources pane, and allow you to debug it. Don't forget to transpile the sources without source maps before publishing the plugin.

## Credits

:::tip Note:
Portions of this page are modifications based on work created and [shared by Google](https://developers.google.com/terms/site-policies) and used according to terms described in the [Creative Commons 3.0 Attribution License](https://creativecommons.org/licenses/by/3.0/).
:::
