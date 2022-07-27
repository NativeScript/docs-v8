---
title: Best Practices with Android and NativeScript
---

## Images in Android Drawables

With the large number of devices available in the world and the numerous different display sizes and resolutions it is generally a good idea to serve images that scale with the device screen.

On Android images inside the various drawable directories are used to serve the image that scales for the device display.

Google provides a great resource to learn more about [supporting different pixel densities](https://developer.android.com/training/multiscreen/screendensities).

In our NativeScript project, you will have the `App_Resources/Android` directory. Everything in here will mirror a standard Android project. Inside the `App_Resources/Android/src/main` directory you should have a `res` directory which contains many `drawable-...` directories. This is where you should place images that have been resized for the different device displays. To read more on this topic you can read [the Android documentation for alternative bitmaps](https://developer.android.com/training/multiscreen/screendensities#TaskProvideAltBmp).

::: tip Note
Any time you edit files inside `App_Resources` it is a best practice to execute `ns clean` which will clean your project build so the next build will be a fresh native build of the application.
:::
