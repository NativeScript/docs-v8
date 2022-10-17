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

- [Pause code with breakpoints](https://developer.chrome.com/docs/devtools/javascript/breakpoints/) - Set a breakpoint so that you can pause your code in the middle of its execution. Once your code is paused (Figure 1), you can [step through it](https://developer.chrome.com/docs/devtools/javascript/#code-stepping) (Figure 2) to investigate the control flow and property values

Figure 1: A line-of-code breakpoint set on line 29: Setting breakpoints

Figure 2: Stepping over code: Stepping over

:::tip Note:
Sometimes when the code you want to debug executes too early, for example during application initialization, you will have to place a [Line-of-code breakpoint](https://developer.chrome.com/docs/devtools/javascript/#line-breakpoint) - `debugger;` statement in your code and start the debugging process with the [`--debug-brk`](/development-workflow/cli-basics.md#debug) CLI flag to allow the DevTools enough time to connect and attach before your code is executed.
:::

- [Inspect local and global properties, and variables](https://developer.chrome.com/docs/devtools/javascript/#check-values) - While paused on a line of code, use the Scope pane (Figure 3) to view and edit the values of properties and variables in the local, closure, and global scopes.

Figure 3: The Scope pane: Scope pane

:::tip Note:
The `Global` object in the context of a NativeScript application is a custom object and contains only a limited subset of the `Window` global object present in a Web application.
:::

- [Watch the values of custom JavaScript expressions](https://developer.chrome.com/docs/devtools/javascript/#watch-expressions) - Use the Watch pane (Figure 4) to watch the values of custom expressions. You can watch any valid JavaScript expression.

Figure 4: The Watch pane: Watch pane

- [View the current call stack](https://developer.chrome.com/docs/devtools/javascript/#scope) - While paused on a line of code, use the Call Stack pane (Figure 5) to view the call stack that got you to this point. Click on an entry to jump to the line of code where that function was called. The blue arrow icon represents which function DevTools is currently highlighting.

Figure 5: Call stack: Call stack

:::tip Note:
To be able to debug code other than JavaScript, the transpiled sources should include [inlined source maps](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for your code (default when developing NativeScript apps with TypeScript).
::::

### console

#### [Writing to the console]()

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

#### [Autocompleting commands and expressions]()

When you type in the Console, the Console automatically displays an autocomplete dropdown menu (Figure 6) of relevant methods that match the text that you have already typed. This includes previous commands that you executed.

Figure 6: Console autocomplete: Console autocomplete

#### [Measure execution times]()

The `time()` method starts a new timer and is very useful to measure how long something took. Pass a string to the method to give the marker a name. When you want to stop the timer, call `timeEnd()` and pass it the same string passed to the initializer. The console then logs the label and time elapsed when the `timeEnd()` method fires.

#### [Evaluate expressions]()

Explore the state of any object of your global application scope, or the paused local scope from the Console by evaluating an expression just by typing it.

## Resources

Scripts loaded by the JavaScript Virtual Machine appear in the Sources panel, which you can then debug and place breakpoints in. Besides scripts all other text and image resources found in your application are also listed in the Sources panel, grouped by folder name by default. You can inspect and search inside the contents of XML, HTML, CSS, JSON, and image files. Text and image network responses are also stored there.
