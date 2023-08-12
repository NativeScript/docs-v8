You can refer to and follow the writing guide from the Vue team at : https://v3.vuejs.org/guide/contributing/writing-guide.html

```cli
git clone https://github.com/NativeScript/docs-new.git
npm i
npm start
```

## Important Note about Plugin Docs

Plugin docs are automatically synced every night via cron job with various plugin workspace repos, for example:

- https://github.com/NativeScript/firebase
- https://github.com/NativeScript/plugins
- https://github.com/NativeScript/payments
- https://github.com/NativeScript/ui-kit

Each plugin workspace can manage it's own set of README's for documentation. This docs repo will keep itself in sync with them every night.
If you want to modify any plugin documentation, you can do so via their plugin workspaces as listed above.

## Outline

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
    - Building for Smart Watches
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
- [Native API Access](/native-api-access.md)
- [Interaction](/interaction.md)
  - Gestures
  - Navigation
  - Animations
  - Accessibility
- [Networking](/http.md)
- [Connectivity](/connectivity.md)
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
