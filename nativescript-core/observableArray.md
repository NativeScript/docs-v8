---
title: ObservableArray
---

## ObservableArray

The `ObservableArray` class expands the Javascript `Array` class by providng a capability of detecting and responding to changes of a collection of objects. The ObservableArray supports the known methods like concat, push, reduce, slice, splice, reverse and many more (full list here).

### Creating an ObservableArray

Creating an ObservableArray with different class constructors.

```ts
// Create ObservableArray with lenght
let myObservableArray = new ObservableArray(10)

// Create ObservableArray from array.
const arr = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
myObservableArray = new ObservableArray(arr)
```

### Get, Set and Push Array Item

One difference with the base array implementation is in the way the items are accessed through their index. While in the common JS array we would do `array[index]` with an `ObservableArray` we need to use `getItem(index)` method.

```ts
const firstItem = myObservableArray.getItem(0)
const secondItem = myObservableArray.getItem(1)
const thirdItem = myObservableArray.getItem(2)
console.log(firstItem, secondItem, thirdItem)
```

Setting item at specified index using `setItem(index, item)` method.
