---
title: Choosing An Editor
---

## Choosing An Editor

You can develop NativeScript apps in any text editor or IDE you prefer.

### VS Code

Most of the NativeScript team prefers to use [VS Code from Microsoft](https://code.visualstudio.com/) as their editor for NativeScript apps. Some reasons we use VS Code:

- Visual Studio Code has excellent support for [TypeScript](https://www.typescriptlang.org/).
- Visual Studio Code gives you the ability to debug JavaScript and TypeScript code directly in your editor. The NativeScript team maintains an official [NativeScript Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=NativeScript.nativescript) that enables step debugging for NativeScript apps.
- Visual Studio Code is a fast, modern editor that Microsoft [updates frequently](https://code.visualstudio.com/updates/).
- Visual Studio Code is available for Windows, macOS, and Linux.
- Microsoft backs Visual Studio Code; therefore, you can feel confident that the editor will continue to be supported in the future.

If you do choose to [try Visual Studio Code](https://code.visualstudio.com/), let’s look at one tip you might find useful as you develop NativeScript apps.

- The `code` command

After you install Visual Studio Code, you can open projects using the editor’s `File` → `Open` menu option, but there’s an alternative option that works far better for command-line-based projects like NativeScript: the `code` command.

The `code` command runs in your command-line or terminal, and it works just like the `ns` command does for NativeScript apps. Visual Studio Code installs the `code` command by default on Windows on Linux, but on macOS, there’s [one manual step](https://code.visualstudio.com/docs/setup/mac) you must perform.

Once set up, you can type `code .` in your terminal to open the files in your current folder for editing. For example, you could use the following sequence of command to create a new NativeScript app and open it for editing.

```cli
ns create MyNewApp
cd MyNewApp
code .
```

### WebStorm

If you’re a WebStorm user, check out this [popular community-written plugin](https://plugins.jetbrains.com/webstorm/plugin/8588-nativescript) that adds many NativeScript-related features.

#### Next steps

<!-- TODO: fix links -->

- [Code Samples](https://market.nativescript.org/?tab=samples&framework=all_frameworks&category=all_samples)
  - The NativeScript team provides a collection of high-quality code samples you can add to your applications. Perusing the code samples is a great way to get familiar with what NativeScript can do, as well as find the code you can use on your next app.
- [Books and Videos](https://www.nativescript.org/books-and-videos)
  - Browse our collection of NativeScript books and videos, including the free-to-download NativeScript book by Nick and Mike Brainstein.
- [NativeScripting](https://nativescripting.com/)
  - The third-party NativeScripting site has many video courses to teach you everything you need to know about NativeScript, including a collection of free courses to help you get started.
