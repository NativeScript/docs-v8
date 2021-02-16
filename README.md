Writing Guide from the Vue team we can refer to and follow: https://v3.vuejs.org/guide/contributing/writing-guide.html

```shell
git clone https://github.com/NativeScript/docs-new.git
npm i
npm start
```

The outline of the docs:

- [Introduction](/introduction.md)
  - How to use the docs
  - Prerequisites
  - Learn the basics
  - Templates
  - Versioning Scheme
- [Environment Setup](/environment-setup.md)
  - Setting up your system
  - Integrating with native apps
  - Building for Other Platforms/Devices
    - Building for TV devices
    - Building for Smart Watches
    - Potentially desktop in the future?
- [Development Workflow](/development-workflow.md)
  - Running on virtual device
  - Running on physical device
  - HMR
  - Debugging
  - Testing
  - Using packages
  - Updating
- [UI & Styling](/ui-and-styling.md)
  - Layouts
  - Components
  - CSS
- [Interaction](/interaction.md)
  - Gestures
  - Navigation
  - Animations
  - Accessibility
- [Networking](/networking.md)
- [Security](/security.md)
- [Performance](/performance.md)
  - Profiling
  - Scroll Performance
  - Navigation Performance
- [Advanced Concepts](/advanced-concepts.md)
  - Marshalling
  - Multithreading & Workers
  - Metadata filtering
- [Releasing your app](/releasing.md)
- [Developing Plugins](/plugins/developing-plugins.md)
- [Common Pitfalls](/common-pitfalls.md)

  - Layout Nesting
  - Heavy work on main thread

- Uncategorized
  - Code Sharing (ng):
    - https://github.com/NativeScript/docs/tree/master/docs/code-sharing
  - Flavor Choice:
    - [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/guides/architecture-choice.md
  - Cloud backends (Kinvey/Firebase)
    - [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/guides/wire-backend.md
      - Probably should live under a guides/cookbook type of page (blog post style)
  - Troubleshooting - Perhaps under Development Workflow?
    - [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/troubleshooting.md
  - Configuration
    - [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/tooling/changing-appid.md
    - [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/tooling/custom-webpack-configuration.md
  - ios stuff
    - [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/tooling/ios-app-extensions.md
  - CLI related
    - [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/tooling/package-managers.md
    - (obsolete?) [REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/tooling/transpilers.md
