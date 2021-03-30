---
title: Best Practices with Android and NativeScript
---

## Images in Android Drawables

With the large number of devices available in the world and the numerous different display sizes and resolutions it is generally a good idea to serve images that scale with the device screen.

On Android images inside the various drawable directories are used to serve the image that scales for the device display.

Google provides a great resource to learn more about [supporting different pixel densities](https://developer.android.com/training/multiscreen/screendensities).

In our NativeScript project, you will have the `App_Resources/Android` directory. Everything in here will mirror a standard Android project. Inside the `App_Resources/Android/src/main` directory you shuld have a `res` directory which contains many `drawable-...` directories. This is where you should place images that have been resized for the different device displays. To read more on this topic you can read [the Android documentation for alternative bitmaps](https://developer.android.com/training/multiscreen/screendensities#TaskProvideAltBmp).

There are many approaches to resizing your images for the different drawable folders. You could use Android Studio or other third party tools. For this example we will look at a tool specifically built to help NativeScript developers resize their images, [images.nativescript.rocks](https://images.nativescript.rocks/).

![Images NativeScript Rocks Intro](../assets/images/optimization/images.ns.rocks1.png?raw=true 'Images NativeScript Rocks Intro')

Once you select your image and click the `Go` button, your images are processed and then a zipped folder should begin downloading. Open the zip and you should see the same directory structure that you see in your NativeScript `App_Resources` like the following image:

![Images NativeScript Rocks Output](../assets/images/optimization/images.ns.rocks2.png?raw=true 'Images NativeScript Rocks Output')

Now you can take those images in the output and place them in the corresponding directories of your NativeScript `App_Resources`.

::: tip Note
Any time you edit files inside `App_Resources` it is a best practice to execute `ns clean` which will clean your project build so the next build will be a fresh native build of the application.
:::
