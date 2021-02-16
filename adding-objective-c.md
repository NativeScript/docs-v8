---
title: Advanced Concepts
---

## Adding ObjC/Swift code

- [USED REFERENCE] https://github.com/NativeScript/docs/blob/master/docs/guides/ios-source-code.md

For the Objective-C/Swift symbols to be accessible by the Nativescript runtimes the following criteria should be met:

**1)** They need to be compiled and linked

**2)** Metadata needs to be generated for them

The first task is done by the NativeScript CLI by adding the source files to the generated _.xcodeproj_. For the second one the Metadata Generator needs to find a [module.modulemap](https://clang.llvm.org/docs/Modules.html) of the compiled modules.

**Note:** For _.swift_ files _module.modulemap_ is not required.

In order to satisfy the above constraints the developer has to:

**1)** Place the source files in _App_Resources/iOS/src/_

**2)** Create a modulemap for the Objective-C files

**Note:** Swift classes need to be accessible from the Objective-C runtime in order to be used from NativeScript. This can be done by using the _@objc_ attribute or by inheriting _NSObject_.

For a detailed walkthrough on how to use native iOS source code in NativeScript [here](https://www.nativescript.org/blog/adding-objective-c-code-to-a-nativescript-app).

A minimal example for adding native Objective C source code to your NativeScript application:

1. Create ExampleCrypto.m file with the following content:

```objective-c
// import required header files
#import <CommonCrypto/CommonDigest.h>
#import <CommonCrypto/CommonHMAC.h>
#import "ExampleCrypto.h"

@implementation ExampleCrypto

+ (NSString *)generateHMACWithApiKey:(NSString *) apiKey andApiSecret:(NSString *) apiSecret {

    NSString *hmacData = [NSString stringWithFormat:@"%@%@%@%@%@",apiKey];

    // Make sure the HMAC hash is in hex
    unsigned char outputHMAC[CC_SHA256_DIGEST_LENGTH];
    const char* keyChar = [apiSecret cStringUsingEncoding:NSUTF8StringEncoding];
    const char* dataChar = [hmacData cStringUsingEncoding:NSUTF8StringEncoding];
    CCHmac(kCCHmacAlgSHA256, keyChar, strlen(keyChar), dataChar, strlen(dataChar), outputHMAC);
    NSData* hmacHash = [[NSData alloc] initWithBytes:outputHMAC length:sizeof(outputHMAC)];

    NSString* hmacHashHexString = [[hmacHash description] stringByReplacingOccurrencesOfString:@" " withString:@""];

    // Authorization : base64 of hmac hash -->
    NSString* authorization = [[hmacHashHexString dataUsingEncoding:NSUTF8StringEncoding] base64EncodedStringWithOptions:0];

    return authorization;

}

@end
```

2. Create ExampleCrypto.h file with the following content:

```objective-c
#import <Foundation/Foundation.h>

@interface ExampleCrypto : NSObject

+ (NSString *)generateHMACWithApiKey:(NSString *)apiKey andApiSecret:(NSString *)apiSecret;

@end
```

3. Create the module.modulemap file with the following content:

```objective-c
module ExampleCrypto {
    header "ExampleCrypto.h"
    export *
}
```

4. Call the static method from the ObjectiveC source code just added somewhere in your application.

```typescript
function generateNativeIOSHMAC() {
  // This if check ensures the following code is only executed on iOS.
  if (global.isIOS) {
    const apiKey = '9292skksd88172alekdd782939ssa'
    const apiSecret = 'f82828282828f992f'

    const base64encryptedKey = ExampleCrypto.generateHMACWithApiKeyandApiSecret(
      apiKey,
      apiSecret
    )
    console.log('base64encryptedKey', base64encryptedKey)
  }
}
```

5. Build your NativeScript application by running the following and you should see the base64encryptedKey print in your terminal.

```bash
ns clean && ns run ios --no-hmr
```
