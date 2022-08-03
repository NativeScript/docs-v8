# Metadata

To allow JavaScript code to call into native iOS or Android code both NativeScript runtimes need the so called **_metadata_**. It contains all the necessary information about each of the supported native classes, interfaces, protocols, structures, enumerations, functions, variables, etc. and is generated at build time by examining the native libraries from the iOS/Android operating systems' SDKs and any third-party libraries and frameworks that are used by the {N} application.

## Android Metadata

The NativeScript Metadata is the mapping between the JavaScript and the Android world. Besides a full list with all the available classes and methods, the metadata contains the [JNI](http://developer.android.com/training/articles/perf-jni.html) signature for each accessible Android method/field. It is pre-generated, in a binary format, and embedded in the application package (apk), storing the minimal required information thus providing small size and highly efficient read access. The generation process uses bytecode reading to parse all publicly available types in the Android libraries supplied to the NativeScript project. The generator works as part of the Android build process, meaning that no user interaction is required for it to work.

![Metadata](/assets/images/metadata_diagram.png)

### Metadata API Level

Only Android public APIs (**including those of any plugins added to the project**) present in the metadata will be accessible in JavaScript/TypeScript. That means, if an application is built with metadata for API level 23 (Android Marshmallow 6.0 – 6.0.1), the application user might have problems when running the application on an older device, for example with API levels 17 through 19 (Android KitKat 4.4 – 4.4.4).

Metadata is built automatically for the application. The metadata API level, or simply put, what API level the metadata is built for, is determined by the `--compileSdk` flag passed to the build. By default the nativescript CLI automatically detects the highest Android API level installed on the developer's machine and passes it to the build implicitly. This `--compileSdk` flag can be supplied explicitly when starting a build: `ns run android --compileSdk=1`.

#### Metadata Limitations

Let's look at the Android [TextView](https://developer.android.com/reference/android/widget/TextView.html).
In API level 21 a method called `getLetterSpacing` was added. What that means is, an application developer can use the `getLetterSpacing` method only on two conditions:

- The built metadata is >= 21
- The device that the application will be running on is >= 21

#### Possible Implications When Working With Android APIs

##### Implication A: Building against lower API level.

If an application is built with `--compileSdk` flag pointing to a lower Android API level, for example 19, the generated metadata will also be for API level 19. In that case making calls to API in Levels 21 and up will not be possible, because the metadata comprises of meta information about API level <= 19.

This problem is easily solved by not specifying a `--compileSdk` flag and using the default behavior.

##### Implication B: Building against higher API level.

What happens when an application is built with higher API level(e.g. 23), but runs on a device with a lower API level(e.g. 20)?
First the metadata is built for API level 23. If the javascript code calls a method introduced after API level 20 the Android runtime will try to call this method because it will recognize it in the metadata, but when the actual native call is made on the lower level device, an exception will be trown because this method won't be present on the device.

This problem is solved by detecting the API level at run-time and using the available API.

Detecting the API Level in JavaScript:

```js
if (android.os.Build.VERSION.SDK_INT >= 21) {
  // your api level-specific code
}
```

### Accessing APIs

One of NativeScript's strongest capabilities is the access to Android (also referred to as **'Java/Kotlin'** or **'native'**) APIs inside JavaScript/TypeScript. That's possible thanks to build-time generated [Metadata](#metadata) chunks which hold the information about the public classes from the Android SDK, Android support libraries, and any other Android libraries which may be imported into your Android NativeScript project.

::: warning Note
'Android classes' and 'Java/Kotlin classes' are used interchangeably throughout the article to refer to classes in the Java/Kotlin programming language.
:::

#### Access Android Packages

The [Android packages](https://developer.android.com/reference/packages.html) are available in the JavaScript/TypeScript global context and are the entry point for accessing Android APIs. Think of them as of TypeScript/C# namespaces, or the way to access sets of classes. For example, the `android.view` package grants access to classes like `android.view.View` - the base of all view elements in Android.

In order to access a particular class in JavaScript/TypeScript the full package name leading up to the class name needs to be specified, or you may end up working with `undefined` variables.

- [java.lang](http://developer.android.com/reference/java/lang/package-summary.html)
- [android](http://developer.android.com/reference/android/package-summary.html)
- [android.view](http://developer.android.com/reference/android/view/package-summary.html)
- etc.

The above is accessed in JavaScript like:

```js
const javaLangPkg = java.lang
const androidPkg = android
const androidViewPkg = android.view

// access classes from inside the packages later on

const View = androidViewPkg.View
// or
const View = android.view.View

const Object = javaLangPkg.Object // === java.lang.Object;
```

To find out the package name of an Android class, refer to the [Android SDK Reference](https://developer.android.com/reference/packages.html), or to the supplied API Reference of a plugin, when importing 3rd-party Android components into your project.

For example, if you need to work with the Google API for Google Maps, after following the installation guide, you may need to access packages from the plugin like `com.google.android.gms.maps`, which you can find a reference for at [Google APIs for Android Reference](https://developers.google.com/android/reference/com/google/android/gms/maps/package-summary)

::: warning Note
To have access and Intellisense for the native APIs with **NativeScript + TypeScript** or **NativeScript + Angular** projects, you have to add a dev dependency to `@nativescript/types`. More details about accessing native APIs with TypeScript can be found [here]({% slug access-native-apis %}#intellisense-and-access-to-native-apis-via-typescript).
:::

::: warning Note
**(Experimental)** Alternatively, to get Intellisense for the native APIs based on the available Android Platform SDK and imported Android Support packages (added by default to your Android project), supply the `--androidTypings` flag with your `ns run | build android` command. The resulting `android.d.ts` file can then be used to provide auto-completion.
:::

::: warning Note
You cannot use APIs that are not present in the metadata. By default, if `--compileSdk` argument isn't provided while building, metadata will be built against the latest Android [Platform SDK](https://developer.android.com/about/versions/nougat/index.html) installed on the workstation. See [metadata limitations](#metadata-limitations).
:::

#### Access Android Classes

Classes ([See OOP](https://docs.oracle.com/javase/tutorial/java/concepts/)) are the schematics to producing building blocks (Objects) in Android, as such, they are used to represent almost everything you see, as well as what you don't see, in an Android application - the Android layouts are objects built from classes, the buttons and text views also have class representations. Classes in Java and Kotlin have unique identifiers denoted by the full package name (see above), followed by the actual class name (usually capitalized - see above - 'View')

Accessing classes in Android you would normally add an `import` statement at the beginning of the Java/Kotlin file, to allow referring to the class only by its name. If the developer decides, they may be as expressive as possible by using the full class identifier too:

```java
package my.awesome.application;

import android.view.View;

public class ... {
  public static void staticMethod(context) {
    View newView = new View(context);
    // or
    android.view.View newView2 = new android.view.View(context);
  }
}
```

Accessing Android classes, in the JavaScript/TypeScript of a NativeScript application, is kept as close to the original Java syntax as the JavaScript language allows:

```js
function arbitraryFunction(context) {
  // 'context' is a JavaScript wrapper (Proxy - see below) for the underlying android.content.Context Java instance
  const View = android.view.View

  const newView = new View(context)
  // or
  const newView2 = new android.view.View(context)

  // newView and newView2 will be JavaScript wrappers (Proxies - see below) for the created Java android.view.View objects
}
```

#### Proxies

The JavaScript objects that lie behind the Android APIs are called _Proxies_. There are two types of proxies:

#### Package Proxy

Provides access to the classes, interfaces, constants and enumerations within each package. See `java.lang`.

#### Class Proxy

Represents a thin wrapper over a class or an interface and provides access to its methods and fields. From a JavaScript perspective this type of proxy may be considered as a constructor function. For example `android.view.View` is a class proxy.

The result of the constructor calls (`new ...()`) will create native `android.view.View` instances on the Android side and a special hollow Object on the JavaScript side. This special object knows how to invoke methods and access fields on the corresponding native instance. For example we may retrieve the path value of the above created `File` using the corresponding `File` class API like:

#### Access Methods, Fields and Constants

Thanks to the 'proxying' system, Java/Kotlin methods and fields can be accessed through the JavaScript wrappers of the native instances. For example, you may retrieve the result of a method call to the Java instance:

```js
const javaObj = new java.lang.Object()

// result is `int` in Java, marshalled to a JavaScript number
const javaObjHashCode = javaObj.hashCode()

// prints out the hashCode number
console.log(javaObjHashCode)
```

Public and private members, as well as static fields of an instance, or Java/Kotlin classes can also be accessed. The [android.view.View](https://developer.android.com/reference/android/view/View.html) class will be used below:

```js
// retrieve context
const context = ...;
const newView = new android.view.View(context);

// public member call to 'public void clearFocus()' as declared in Android
newView.clearFocus();

// public static field access to 'public static final SCALE_X' as declared in Android
let newViewScaleX = newView.SCALE_X;

// public static field access to `FOCUS_UP` - represents an integer as declared in the Android source
const focusUpDirection = android.view.View.FOCUS_UP;

// public member call to 'public View focusSearch(int direction)'
let foundView = newView.focusSearch(android.view.View.FOCUS_UP);

// static method call to 'public static int generateViewId()' - generates a random integer suitable for Android Views
const randomViewId = android.view.View.generateViewId();
```

#### Extend Classes and Interfaces

For a comprehensive guide on extending classes and implementing interfaces through JavaScript/TypeScript check out [the dedicated article](/binding-generator/extend-class-interface).

<!-- TODO: fix links -->

#### Full-fledged Example

Let's take a sample Android code, and transcribe it to JavaScript/TypeScript.

The following code (courtesy of [startandroid.ru](http://startandroid.ru/en/lessons/220-lesson-16-creating-layout-programmatically-layoutparams.html)) creates an Android layout, and adds a couple Button and TextView elements:

```java
public class MainActivity extends Activity {
  /** Called when the activity is first created. */
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // creating LinearLayout
    LinearLayout linLayout = new LinearLayout(this);
    // specifying vertical orientation
    linLayout.setOrientation(LinearLayout.VERTICAL);
    // creating LayoutParams
    LayoutParams linLayoutParam = new LayoutParams(
      LayoutParams.MATCH_PARENT,
      LayoutParams.MATCH_PARENT
    );
    // set LinearLayout as a root element of the screen
    setContentView(linLayout, linLayoutParam);

    LayoutParams lpView = new LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    );

    TextView tv = new TextView(this);
    tv.setText("TextView");
    tv.setLayoutParams(lpView);
    linLayout.addView(tv);

    Button btn = new Button(this);
    btn.setText("Button");
    linLayout.addView(btn, lpView);


    LinearLayout.LayoutParams leftMarginParams = new LinearLayout.LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    );
    leftMarginParams.leftMargin = 50;

    Button btn1 = new Button(this);
    btn1.setText("Button1");
    linLayout.addView(btn1, leftMarginParams);


    LinearLayout.LayoutParams rightGravityParams = new LinearLayout.LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    );
    rightGravityParams.gravity = Gravity.RIGHT;

    Button btn2 = new Button(this);
    btn2.setText("Button2");
    linLayout.addView(btn2, rightGravityParams);
  }
}
```

```kotlin
class MainKotlinActivity: Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // creating LinearLayout
    val linLayout = LinearLayout(this)
    // specifying vertical orientation
    linLayout.orientation = LinearLayout.VERTICAL
    // creating LayoutParams
    val linLayoutParam = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    // set LinearLayout as a root element of the screen
    setContentView(linLayout, linLayoutParam)

    val lpView = LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    )

    val tv = TextView(this)
    tv.text = "TextView"
    tv.layoutParams = lpView
    linLayout.addView(tv)

    val btn = Button(this)
    btn.text = "Button"
    linLayout.addView(btn, lpView)


    val leftMarginParams = LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    )
    leftMarginParams.leftMargin = 50

    val btn1 = Button(this)
    btn1.text = "Button1"
    linLayout.addView(btn1, leftMarginParams)


    val rightGravityParams = LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    )
    rightGravityParams.gravity = Gravity.RIGHT

    val btn2 = Button(this)
    btn2.text = "Button2"
    linLayout.addView(btn2, rightGravityParams)
  }
}
```

```js
const MainActivity = android.app.Activity.extend('my.application.name.MainActivity', {
  onCreate: function (savedInstanceState) {
    super.onCreate(savedInstance)

    // creating LinearLayout
    let linLayout = new android.widget.LinearLayout(this)
    // specifying vertical orientation
    linLayout.setOrientation(android.widget.LinearLayout.VERTICAL)
    // creating LayoutParams - accessing static class LayoutParams of LinearLayout
    let linLayoutParam = new android.widget.LinearLayout.LayoutParams(
      android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
      android.widget.LinearLayout.LayoutParams.MATCH_PARENT
    )
    // set LinearLayout as a root element of the screen
    this.setContentView(linLayout, linLayoutParam)

    let lpView = new android.widget.LinearLayout.LayoutParams(
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
    )

    let tv = new android.widget.TextView(this)
    tv.setText('TextView')
    tv.setLayoutParams(lpView)
    linLayout.addView(tv)

    let btn = new android.widget.Button(this)
    btn.setText('Button')
    linLayout.addView(btn, lpView)

    let leftMarginParams = new android.widget.LinearLayout.LayoutParams(
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
    )
    leftMarginParams.leftMargin = 50

    let btn1 = new android.widget.Button(this)
    btn1.setText('Button1')
    linLayout.addView(btn1, leftMarginParams)

    let rightGravityParams = new android.widget.LinearLayout.LayoutParams(
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
    )
    rightGravityParams.gravity = android.view.Gravity.RIGHT

    let btn2 = new android.widget.Button(this)
    btn2.setText('Button2')
    linLayout.addView(btn2, rightGravityParams)
  }
})
```

```typescript
@JavaProxy("my.application.name.MainActivity");
class MainActivity extends android.app.Activity {
  constructor() {
    super();

    return global.__native(this);
  }

  onCreate(savedInstanceState) {
    super.onCreate(savedInstance);

    // creating LinearLayout
    let linLayout = new android.widget.LinearLayout(this);
    // specifying vertical orientation
    linLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
    // creating LayoutParams - accessing static class LayoutParams of LinearLayout
    let linLayoutParam = new android.widget.LinearLayout.LayoutParams(
      android.widget.LinearLayout.LayoutParams.MATCH_PARENT,
      android.widget.LinearLayout.LayoutParams.MATCH_PARENT
    );
    // set LinearLayout as a root element of the screen
    this.setContentView(linLayout, linLayoutParam);

    let lpView = new android.widget.LinearLayout.LayoutParams(
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
    );

    let tv = new android.widget.TextView(this);
    tv.setText("TextView");
    tv.setLayoutParams(lpView);
    linLayout.addView(tv);

    let btn = new android.widget.Button(this);
    btn.setText("Button");
    linLayout.addView(btn, lpView);


    let leftMarginParams = new android.widget.LinearLayout.LayoutParams(
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
    );
    leftMarginParams.leftMargin = 50;

    let btn1 = new android.widget.Button(this);
    btn1.setText("Button1");
    linLayout.addView(btn1, leftMarginParams);


    let rightGravityParams = new android.widget.LinearLayout.LayoutParams(
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT,
      android.widget.LinearLayout.LayoutParams.WRAP_CONTENT
    );
    rightGravityParams.gravity = android.view.Gravity.RIGHT;

    let btn2 = new android.widget.Button(this);
    btn2.setText("Button2");
    linLayout.addView(btn2, rightGravityParams);
  }
};
```

The NativeScript code can further be shortened, and it starts to look a lot like Java:

```js
const LinearLayout = android.widget.LinearLayout
const LayoutParams = android.widget.LinearLayout.LayoutParams
const TextView = android.widget.TextView
const Button = android.widget.Button
const Gravity = android.view.Gravity

const MainActivity = android.app.Activity.extend('my.application.name.MainActivity', {
  onCreate: function (savedInstanceState) {
    super.onCreate(savedInstance)

    // creating LinearLayout
    let linLayout = new LinearLayout(this)
    // specifying vertical orientation
    linLayout.setOrientation(LinearLayout.VERTICAL)
    // creating LayoutParams
    let linLayoutParam = new LayoutParams(
      LayoutParams.MATCH_PARENT,
      LayoutParams.MATCH_PARENT
    )
    // set LinearLayout as a root element of the screen
    setContentView(linLayout, linLayoutParam)

    let lpView = new LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT)

    let tv = new TextView(this)
    tv.setText('TextView')
    tv.setLayoutParams(lpView)
    linLayout.addView(tv)

    let btn = new Button(this)
    btn.setText('Button')
    linLayout.addView(btn, lpView)

    let leftMarginParams = new LinearLayout.LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    )
    leftMarginParams.leftMargin = 50

    let btn1 = new Button(this)
    btn1.setText('Button1')
    linLayout.addView(btn1, leftMarginParams)

    let rightGravityParams = new LinearLayout.LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    )
    rightGravityParams.gravity = Gravity.RIGHT

    let btn2 = new Button(this)
    btn2.setText('Button2')
    linLayout.addView(btn2, rightGravityParams)
  }
})
```

```typescript
const LinearLayout = android.widget.LinearLayout;
const LayoutParams = android.widget.LinearLayout.LayoutParams;
const TextView = android.widget.TextView;
const Button = android.widget.Button;
const Gravity = android.view.Gravity;

@JavaProxy("my.application.name.MainActivity");
class MainActivity extends android.app.Activity {
  constructor() {
    super();

    return global.__native(this);
  }

  onCreate: function (savedInstanceState) {
    super.onCreate(savedInstance);

    // creating LinearLayout
    let linLayout = new LinearLayout(this);
    // specifying vertical orientation
    linLayout.setOrientation(LinearLayout.VERTICAL);
    // creating LayoutParams
    let linLayoutParam = new LayoutParams(
      LayoutParams.MATCH_PARENT,
      LayoutParams.MATCH_PARENT
    );
    // set LinearLayout as a root element of the screen
    setContentView(linLayout, linLayoutParam);

    let lpView = new LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    );

    let tv = new TextView(this);
    tv.setText("TextView");
    tv.setLayoutParams(lpView);
    linLayout.addView(tv);

    let btn = new Button(this);
    btn.setText("Button");
    linLayout.addView(btn, lpView);


    let leftMarginParams = new LinearLayout.LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    );
    leftMarginParams.leftMargin = 50;

    let btn1 = new Button(this);
    btn1.setText("Button1");
    linLayout.addView(btn1, leftMarginParams);


    let rightGravityParams = new LinearLayout.LayoutParams(
      LayoutParams.WRAP_CONTENT,
      LayoutParams.WRAP_CONTENT
    );
    rightGravityParams.gravity = Gravity.RIGHT;

    let btn2 = new Button(this);
    btn2.setText("Button2");
    linLayout.addView(btn2, rightGravityParams);
  }
});
```

## iOS Metadata

### Metadata Filtering

By default NativeScript includes all supported entities in the metadata. This allows app and plugin authors to freely call any native API from JavaScript. While it is benefitial during development, in some cases having metadata for all the APIs is undesirable. There could be security implications involved (mentioning names of entities that shouldn't be known in the metadata binary files for example); performance could be degraded at runtime (due to larger metabase which has to be consulted when an unknown entry is encountered or at startup); or app size could increase due to unnecessary metadata which is never used.

To give developers control over what to be included or not in the generated metadata there's support for black and whitelisting symbols by their native name.

### Metadata filtering rules in plugins

Plugins can declare their list of APIs that are called from JavaScript using a file named `native-api-usage.json`, located in each of the platform directories (`platforms/android` or `platforms/ios`). Its format is similar to:

```json
{
  "uses": ["java.util:List"]
}
```

### Metadata filtering rules in apps

Applications have the final word of what filtering will be applied to metadata. They provide similar `native-api-usage.json` files, located in `App_Resources/Android` and `App_Resources/iOS`, having the following format:

```json
{
  "whitelist-plugins-usages": true,
  "whitelist": ["java.util:Base64*"],
  "blacklist": ["java.util:Locale*"]
}
```

### Rules syntax

Each list comprises of pattern entries with the following characteristics:

- Entries are of the form `<pattern1>[:pattern2]`
- On Android, **_pattern1_** is matched against Java package names, while the optional **_pattern2_** -- against classes, interfaces, enums.
- On iOS, **_pattern1_** is matched against Clang module/submodule names, while the optional **_pattern2_** -- against structs, global functions, enums, Objective-C interfaces, protocols, categories, constants, etc.
- Patterns support wildcards (**"\*"** - any number of characters and **"?"** - any single character).
- An unspecified or empty pattern is equivalent to being set to **"\*"** (matching everything)

### Rules semantics

After analyzing the filtering rules for a platform, {N} CLI builds final whitelist and blacklist files and outputs them in the native project to be used by the corresponding metadata generator. The blacklist is always equal to the one specified by the app. While the whitelist depends on the `whitelist-plugins-usages` flag:

- If it is `true`, the final whitelist is a concatenation of all plugins' usage lists with the app's whitelist
- Otherwise, it is equal to the app's whitelist

These two lists unambiguously determine how filtering is performed:

1. If the whitelist is empty, then everything is considered whitelisted by default
2. If it contains at least one rule, only entities matching a rule are considered whitelisted
3. All entities which are not whitelisted or match a rule in the blacklist are stripped from metadata
4. All other entities are included in the metadata

### Examples

Sample filtering specifications can be found in `@nativescript/core` plugin's repository:

- [Android API usage list](https://github.com/NativeScript/NativeScript/blob/master/packages/core/platforms/android/native-api-usage.json)
- [iOS API usage list](https://github.com/NativeScript/NativeScript/blob/master/packages/core/platforms/ios/native-api-usage.json)

### Troubleshooting

Missing metadata entities could result in bugs at runtime. For example, if a native class has been accidentally filtered out, its constructor function will be `undefined` and this will lead to an exception when its attempted to be called. Figuring out what is the reason for something being `undefined` could be quite difficult because the reasons can vary. To check whether metadata filtering is to blame or not you should examine metadata generator's verbose logs after a successful build:

- On iOS they are located in `platforms/ios/build/<configuration>-<platform>/metadata-generation-stderr-<arch>.txt` (e.g. `platforms/ios/build/Debug-iphonesimulator/metadata-generation-stderr-x86_64.txt`);
- On Android they are located in `platforms/android/build-tools/buildMetadata.log`

For each global symbol that is discovered by the generator, there should be a line providing information whether it was included in metadata or not, and which rules or what exception caused this. Examples:

- `verbose: Blacklisted kCFBuddhistCalendar from CoreFoundation.CFLocale (disabled by 'CoreFoundation*:*')` - when there are no whitelist rules a blacklisted symbol will show only the rule which disabled it
- `verbose: Blacklisted NSString from Foundation.NSString` - when there is at least one whitelist rule, some blacklisted symbols will not specify a rule. This means that the symbol didn't match any of the whitelist rules.
- `verbose: Blacklisted PHImageContentModeDefault from Photos.PhotosTypes (enabled by 'Photos.PhotosTypes:*', disabled by 'Photos.PhotosTypes:PHImageContentMode*')`, `verbose: Blacklisted String from java.lang (enabled by java.lang:*, disabled by java.lang:String)` - a blacklisted entry which matches both a whitelist rule and a blacklist rule will specify both.
- `verbose: Included NSObject from ObjectiveC.NSObject` - when there are no whitelist rules an included symbol won't specify a rule which caused it to be included
- `verbose: Included PHCollectionListType from Photos.PhotosTypes (enabled by 'Photos.PhotosTypes:*')`, `verbose: Included StrictMath from java.lang (enabled by java.lang:*)` - when a symbol is included because it matched a rule from the whitelist (and didn't match any from the blacklist) it will print that rule
- `verbose: Exception [Name: 'vfwprintf', JsName: 'vfwprintf', Module: 'Darwin.C.wchar', File: '/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator13.2.sdk/usr/include/wchar.h'] : Can't create type dependency. --> [Type Decayed] : Can't create type dependency. --> [Type Typedef] : VaList type is not supported.` - if a symbol is not included because it isn't supported for some reason it will be stated in the logged exception. In this case the symbol cannot be used from JavaScript because {N} doesn't support calling functions with variable argument lists.
- `verbose: Exception [Name: 'GLKVector3Make', JsName: 'GLKVector3Make', Module: 'GLKit.GLKVector3', File: '/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator13.2.sdk/System/Library/Frameworks/GLKit.framework/Headers/GLKVector3.h'] : Can't create type dependency. --> [Type Typedef] : Can't create type dependency. --> [Type Elaborated] : Can't create type dependency. --> [Type Record] : The record is an union.` - Another example of an unsupported symbol, this time the reason is that `union`s are unsupported

#### Code Sharing

- [Code Sharing](code-sharing/index.md)
