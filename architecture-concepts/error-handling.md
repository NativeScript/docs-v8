---
title: Error Handling
---

## Error Handling

A big difference between web and NativeScript applications is the way the Errors are handled. Currently, when an unhandled exception is thrown in NativeScript, the app will crash, and an Error with the corresponding stack trace will be shown. In some cases, this seems to be the expected behaviour when the app is in **development** mode. You would want to have the stack trace of the exact location the unexpected error has occurred so that you can more easily understand what happened and fix the issue. However, when the app is in **production** similar application crashes can seriously hurt your application credibility and drive away customers. In many cases, you might prefer something else (e.g. app freeze, blank screen, failed navigation) to an actual crash with an error log.

Nativescript provides you with the ability to handle errors differently depending on whether the app is in **development** or **production** mode.
