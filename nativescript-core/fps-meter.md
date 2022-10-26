---
title: FPS Meter
---

## FPS Meter

Logging frames-per-second statistics for your app requires the `fps-meter` module.

### Usage

```ts
import {
  removeCallback,
  start,
  stop,
  addCallback,
  running
} from '@nativescript/core/fps-meter'

let callbackId: number

export function stopFPSMeter(args: EventData) {
  removeCallback(callbackId)
  stop()
  console.log('Is running: ', running())
}

export function startFPSMeter(args: EventData) {
  callbackId = addCallback((fps: number, minFps: number | undefined) => {
    console.log(`Frames per seconds: ${fps.toFixed(2)}`)
    console.log(minFps?.toFixed(2))
  })
  start()
  console.log('Is running: ', running())
}
```

### Methods

| Name                              | Type      | Description                                                                                                                                          |
| --------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addCallback(callback: function)` | `number`  | Adds a callback function to be called each time FPS data is due to be reported. Returns a unique id which can be used to remove this callback later. |
| `removeCallback(id: number)`      | `any`     | Removes the callback with the specified id.                                                                                                          |
| `running()`                       | `boolean` | Checks whether the frames-per-second meter is currently running.                                                                                     |
| `start()`                         | `void`    | Starts the frames-per-second meter.                                                                                                                  |
| `stop()`                          | `void`    | Stops the frames-per-second meter.                                                                                                                   |

### Native Component

| Android                                                                                          | iOS                                                                                 |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [android.view.Choreographer](https://developer.android.com/reference/android/view/Choreographer) | [CADisplayLink](https://developer.apple.com/documentation/quartzcore/cadisplaylink) |
