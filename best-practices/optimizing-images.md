---
title: Optimizing Images
---

The importance of optimizing images for mobile devices is critical to your app's performance. This is true no matter what framework or OS your app targets.

It is even important when building for web and desktop as well but not as critical since those devices typically have much greater memory and CPU to operate with, however you should still optimize your images regardless of any target platform you are distributing applications for.

## Sizing

Devices today have incredible displays with high-resolution screens. With the high-resolution screens we need to provide our users with high-resolution images which will increase file size.

One of the best options is to test your image in various devices and screen sizes. Once you have the image you can include the image in your application and see how it looks. Check the size of the image. If it's a high-resolution image and its size is `1024x1024` and you are displaying a small thumbnail or icon in your app. You probably do not need it to be that size and you can scale it down by resizing the image on your computer. Try different sizes to get the best result while keeping the image looking as sharp as possible.

If you want to take it a step further and provide a better end user experience typically on Android and iOS you would package different sized images in your application.

In NativeScript, these images will be located in your `App_Resources/<platform>` directory for your application. The directory structure inside `App_Resources` mirrors that of a native Android and iOS project. These files are used during the native build of your application.

For more on optimizing images for Android using the Android drawable directories, see the [Android Tips](android-tips.md#images-in-android-drawables) section of the docs.

## Compression

There are numerous compression methods for manipulating images. For most images you are working with you can choose some compression option and end up hardly noticing a difference in the end result, however, you can significantly reduce the file size of the image. Which in turn reduces the overhead of using that application in your application by consuming less memory on the device. If you have ever worked with a lot of images on Android, you may be familiar with [`OOM Exception`](https://developer.android.com/reference/java/lang/OutOfMemoryError) which most Android developers can tell you this happens when you are displaying a lot of images and forget to reduce their size or optimize your layouts.

One example of image compression is [lossy compression for PNG files](https://en.wikipedia.org/wiki/Lossy_compression).

A great resource at [tinypng.com](https://tinypng.com/) is available to optimize images where you can quickly see how much smaller your image file sizes can be when compressed.

The website has the following example:

![TinyPng Example](../assets/images/optimization/tinypng-example.png?raw=true 'TinyPng Example')

With one example you can see how easily you can reduce the file size significantly, which will improve your app's performance when it is displaying images. Another benefit of compressing your images is smaller installables for the end user to download for the Apple App Store and Google Play Store.
