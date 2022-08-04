---
title: Memory Management
---

## Memory Management

NativeScript allows JavaScript code to be called from native and vice versa. It does so by creating bridging counterparts for each instance which must be exposed to the "other world" (native or JavaScript). These let developers access and consume the native APIs from JavaScript by:

- implementing native interfaces or deriving from native classes in JavaScript
- creating/accessing native instances and calling into their methods from JavaScript.

In this article, we are explaining the lifecycle of JavaScript and native instances and show some troublesome conditions which may arise out of the complications of having two garbage collected runtimes (Android) or a garbage collected runtime and reference counting (iOS).

## Terms

_Disclaimer: These terms are not necessarily well established in the literature but we are introducing them for convenience in the following sections._

- **native instance** - Objective-C/Swift class instance (iOS) or Java/Kotlin class instance (Android).

- **reference counting** - the Objective-C runtime in iOS uses reference counting for lifetime management. Instances keep an internal counter which can be incremented and decremented. Each time a strong reference is set to point to an instance, the instance's reference count is incremented. Each time a strong reference is changed, the previous instance it pointed to has its reference count decremented. When the count reaches 0, the instance is deallocated.

- **Garbage Collection (GC)** - garbage collection in general. When GC runs, it first block the threads to find all strong instances from the stack. Then resumes execution until the GC marks all reachable objects in a separate thread. Then blocks again the threads to complete the marking. And in the end finalizes and deallocates the detected unreachable instances. While the actual GC implementation may be much more sophisticated, all implementations in virtual machines used for UI aim at minimizing the time the main thread is blocked. The Android Java VM, Android's V8 and iOS's JavaScriptCore are the three state of the art virtual machines used by NativeScript, which have garbage collectors.
