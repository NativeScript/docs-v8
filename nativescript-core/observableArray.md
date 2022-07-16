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

## Properties

| Name          | Type     | Description                                               |
| ------------- | -------- | --------------------------------------------------------- |
| `changeEvent` | `string` | This a static property used when hooking to change event. |

## Methods

| Name                                       | Return Type | Description                                                                                                                                                                                                                                        |
| ------------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setItem(index: number, value: T)`         | `void`      | Sets item at specified index.                                                                                                                                                                                                                      |
| `getItem(index: number)`                   | `T`         | Returns item at specified index. `T` represents the type of the element retrieved. For example, if the retrieved value is a number, then `T` is `number` type                                                                                      |
| `toString()`, `toLocaleString()`           | `string`    | Returns a string representation of an array.                                                                                                                                                                                                       |
| `concat(...args: any[])`                   | `T[]`       | Combines two or more arrays. <br> `items`: Additional items to add to the end of array1.                                                                                                                                                           |
| `join(separator?: string)`                 | `string`    | Adds all the elements of an array separated by the specified separator string.<br>`separator`: A string used to separate one element of an array from the next in the resulting string. If omitted, the array elements are separated with a comma. |
| `pop()`                                    | `T`         | Removes the last element from an array and returns it.                                                                                                                                                                                             |
| `push(...args: any)`                       | `number`    | Appends new elements to an array, and returns the new length of the array.<br>`item`: New element(s) of the Array.                                                                                                                                 |
| `reverse()`                                | `T[]`       | Reverses the elements in an Array.                                                                                                                                                                                                                 |
| `shift()`                                  | `T`         | Removes the first element from an array and returns it.                                                                                                                                                                                            |
| `slice(start?: number, end?: number)`      | `T[]`       | Returns a section of an array. <br>`start`: The beginning of the specified portion of the array.<br>`end`: The end of the specified portion of the array.                                                                                          |
| `sort(compareFn?: (a: T, b: T) => number)` | `T[]`       | Sorts an array. <br>`start`: The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.                                                                        |

## Methods
