---
title: Best Practices with iOS and NativeScript
---

## Delegates, delegates, DELEGATES!!

**Always** retain custom delegate implementations that you use in a your own custom iOS classes. Not doing so can cause your delegate to get garbage collected early and functionality not working as expected.

For example:

- **BAD**

```ts
let applePayController: PKPaymentAuthorizationViewController

applePayController =
  PKPaymentAuthorizationViewController.alloc().initWithPaymentRequest(paymentRequest)
applePayController.delegate =
  PKPaymentAuthorizationViewControllerDelegateImpl.initWithOwner(this)
```

- **GOOD**

```ts
let applePayController: PKPaymentAuthorizationViewController
let applePayControllerDelegate: PKPaymentAuthorizationViewControllerDelegateImpl

applePayController =
  PKPaymentAuthorizationViewController.alloc().initWithPaymentRequest(paymentRequest)
applePayControllerDelegate =
  PKPaymentAuthorizationViewControllerDelegateImpl.initWithOwner(this)
applePayController.delegate = applePayControllerDelegate
```
