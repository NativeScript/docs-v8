---
title: 'Google Maps'
link: https://raw.githubusercontent.com/NativeScript/plugins/main/packages/google-maps/README.md
---

<div style="width: 100%; padding: 1.2em 0em">
  					<img alt="github logo" src="../assets/images/github/GitHub-Mark-32px.png" style="display: inline; margin: 1em 0.5em 1em 0em">
  					<a href="https://github.com/NativeScript/plugins/tree/main/packages/google-maps" target="_blank" noopener>Google Maps</a>
				</div>

# @nativescript/google-maps

```javascript
ns plugin add @nativescript/google-maps
```

## Config

### Android

Modify the `AndroidManifest` to include the new meta tag along with your API key, the manifest is located
in `App_Resources/Android/AndroidManifest.xml`

```xml
<application
  android:name="com.tns.NativeScriptApplication"
  android:allowBackup="true"
  android:icon="@mipmap/ic_launcher"
  android:label="@string/app_name"
  android:theme="@style/AppTheme"
  android:hardwareAccelerated="true"
>
  <meta-data android:name="com.google.android.geo.API_KEY" android:value="youKey" />
</application>
```

### iOS

Modify the `Info.plist` to include the new meta tag along with your API key, the manifest is located
in `App_Resources/iOS/Info.plist`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>TNSGoogleMapsAPIKey</key>
    <string>yourKey</string>
  </dict>
</plist>
```

## Usage

#### Core

:::tip Important

Ensure you've included xmlns:map="@nativescript/google-maps" on the Page element

:::

```xml
<map:MapView
  ready="onReady"
  mapTap="onTap"
  mapLongPress="onLongPress"
  markerTap="onMarkerTap"
/>
```

#### Angular

```ts
import { GoogleMapsModule } from '@nativescript/google-maps/angular';

@NgModule({
    imports: [
			GoogleMapsModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
```

```html
<MapView
  (ready)="onReady($event)"
  (mapTap)="onTap($event)"
  (mapLongPress)="onLongPress($event)"
  (markerTap)="onMarkerTap($event)"
>
</MapView>
```

#### Vue

```ts
import Vue from 'nativescript-vue'
import GoogleMaps from '@nativescript/google-maps/vue'

Vue.use(GoogleMaps)
```

```html
<MapView
  @ready="onReady"
  @mapTap="onTap"
  @mapLongPress="onLongPress"
  @markerTap="onMarkerTap"
/>
```

## License

Apache License Version 2.0
