---
title: Connectivity
---

## Connectivity

The connectivity module provides a common abstraction of the functionality responsible for receiving information about the connection type and availability of the network.

### Usage

The following is a Stackblitz + Preview instance showing you how to you could use the `Connectivity` module. To try the example out, download the `Nativescript Preview` app from Google Play or App Store. Once you have the app, scan the QR with your phone Camera and the app resulting from the code in the IDE will appear in the `Nativescript Preview` app.

<iframe width="100%" height="640px" src="https://stackblitz.com/edit/nativescript-stackblitz-templates-1xb9ys?embed=1&file=app/main-view-model.ts&hideExplorer=0"></iframe>
### Methods

| Name                                                       | Type     | Description                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getConnectionType`                                        | `number` | Gets the type of connection. Returns a value from the `connectivityModule.connectionType` enumeration. To use this method on Android you need to have the **android.permission.ACCESS_NETWORK_STATE** permission added to the **AndroidManifest.xml** file. |
| `startMonitoring(connectionTypeChangedCallback: function)` | `void`   | Starts monitoring the connection type.                                                                                                                                                                                                                      |
| `stopMonitoring`                                           | `void`   | Stops monitoring the connection type.                                                                                                                                                                                                                       |

### Connection Types

- `none = 0`,
- `wifi = 1`,
- `mobile = 2`,
- `ethernet = 3`,
- `bluetooth = 4`,
- `vpn = 5`

### API References

| Name                                                                                                     | Type     |
| -------------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/connectivity](https://docs.nativescript.org/api-reference/modules.html#connectivity) | `Module` |
| [connectionType](https://docs.nativescript.org/api-reference/modules.html#connectivity)                  | `Enum`   |

#### Native Component

| Android                                                                                                           | iOS                                                                                                              |
| :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| [CONNECTIVITY_SERVICE (android.content.Context)](https://developer.android.com/reference/android/content/Context) | [SCNetworkReachability](https://developer.apple.com/documentation/systemconfiguration/scnetworkreachability-g7d) |
