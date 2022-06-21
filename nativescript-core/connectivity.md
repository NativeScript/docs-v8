---
title: Connectivity
---

## Connectivity

The connectivity module provides a common abstraction of the functionality responsible for receiving information about the connection type and availability of the network.

#### Usage

```typescript
import { Connectivity } from '@nativescript/core'

export function onNavigatedTo(args) {
  const page = args.object

  // Get the current connection type
  const type = Connectivity.getConnectionType()

  switch (type) {
    case Connectivity.connectionType.none:
      console.log('No connection')
      break
    case Connectivity.connectionType.wifi:
      console.log('WiFi connection')
      break
    case Connectivity.connectionType.vpn:
      console.log('VPN connection')
      break
    case Connectivity.connectionType.mobile:
      console.log('Mobile connection')
      break
    case Connectivity.connectionType.ethernet:
      console.log('Ethernet connection')
      break
    case Connectivity.connectionType.bluetooth:
      console.log('Bluetooth connection')
      break
    default:
      break
  }

  // Starts monitoring the network for changes
  Connectivity.startMonitoring(newConnectionType => {
    switch (newConnectionType) {
      case Connectivity.connectionType.none:
        console.log('Connection type changed to none.')
        break
      case Connectivity.connectionType.wifi:
        console.log('Connection type changed to WiFi.')
        break
      case Connectivity.connectionType.vpn:
        console.log('Connection type changed to VPN.')
        break
      case Connectivity.connectionType.mobile:
        console.log('Connection type changed to mobile.')
        break
      case Connectivity.connectionType.ethernet:
        console.log('Connection type changed to ethernet.')
        break
      case Connectivity.connectionType.bluetooth:
        console.log('Connection type changed to bluetooth.')
        break
      default:
        break
    }
  })

  // Stops monitoring the connection
  Connectivity.stopMonitoring()
}
```

#### Methods

| Name                                                       | Type     | Description                                                                                                                                                                                                                                                 |
| ---------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `getConnectionType`                                        | `number` | Gets the type of connection. Returns a value from the `connectivityModule.connectionType` enumeration. To use this method on Android you need to have the **android.permission.ACCESS_NETWORK_STATE** permission added to the **AndroidManifest.xml** file. |
| `startMonitoring(connectionTypeChangedCallback: function)` | `void`   | Starts monitoring the connection type.                                                                                                                                                                                                                      |
| `stopMonitoring`                                           | `void`   | Stops monitoring the connection type.                                                                                                                                                                                                                       |

#### Connection Types

- `none = 0`,
- `wifi = 1`,
- `mobile = 2`,
- `ethernet = 3`,
- `bluetooth = 4`,
- `vpn = 5`

#### API References

| Name                                                                                                     | Type     |
| -------------------------------------------------------------------------------------------------------- | -------- |
| [@nativescript/core/connectivity](https://docs.nativescript.org/api-reference/modules.html#connectivity) | `Module` |
| [connectionType](https://docs.nativescript.org/api-reference/modules.html#connectivity)                  | `Enum`   |

#### Native Component

| Android                                                                                                           | iOS                                                                                                              |
| :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| [CONNECTIVITY_SERVICE (android.content.Context)](https://developer.android.com/reference/android/content/Context) | [SCNetworkReachability](https://developer.apple.com/documentation/systemconfiguration/scnetworkreachability-g7d) |
