---
title: SearchBar
---

# SearchBar

`<SearchBar>` is a UI component that provides a user interface for entering search queries and submitting requests to the search provider.

---

/// flavor plain

```xml
<SearchBar
  id="searchBar"
  hint="Enter search term here ..."
  text="{{sbText}}"
  clear="onClear"
  submit="onSubmit"
/>
```

```ts
import { Observable, Page, PropertyChangeData, SearchBar } from '@nativescript/core'

export function onNavigatingTo(args) {
  const page = args.object as Page
  const vm = new Observable()
  vm.set('sbText', '')
  vm.on(Observable.propertyChangeEvent, (propertyChangeData: PropertyChangeData) => {
    if (propertyChangeData.propertyName === 'sbText') {
      const searchBar = propertyChangeData.object as SearchBar
      console.log(`Input changed! New value: ${propertyChangeData.value}`)
    }
  })
  page.bindingContext = vm
}

export function onSubmit(args) {
  const searchBar = args.object as SearchBar
  console.log(`Searching for ${searchBar.text}`)
}

export function onClear(args) {
  const searchBar = args.object as SearchBar
  console.log(`Clear event raised`)
}
```

///

/// flavor angular

```html
<SearchBar
  hint="Enter search term here ..."
  [text]="searchPhrase"
  (textChange)="onTextChanged($event)"
  (clear)="onClear($event)"
  (submit)="onSubmit($event)"
>
</SearchBar>
```

```ts
import { Component } from '@angular/core'
import { SearchBar } from '@nativescript/core'

@Component({
  moduleId: module.id,
  templateUrl: './usage.component.html'
})
export class UsageComponent {
  searchPhrase: string

  onSubmit(args) {
    const searchBar = args.object as SearchBar
    console.log(`Searching for ${searchBar.text}`)
  }

  onTextChanged(args) {
    const searchBar = args.object as SearchBar
    console.log(`Input changed! New value: ${searchBar.text}`)
  }

  onClear(args) {
    const searchBar = args.object as SearchBar
    console.log(`Clear event raised`)
  }
}
```

///

/// flavor vue

```html
<SearchBar
  hint="Search hint"
  :text="searchPhrase"
  @textChange="onTextChanged"
  @submit="onSubmit"
/>
```

`<SearchBar>` provides two-way data binding using `v-model`.

```html
<SearchBar v-model="searchQuery" />
```

///

/// flavor svelte

```tsx
<searchBar
  hint="Search hint"
  text="{searchQuery}"
  on:textChange="{onTextChanged}"
  on:submit="{onSubmit}"
/>
```

`<SearchBar>` provides two-way data binding for `text`.

```html
<searchBar bind:text="{searchQuery}" />
```

///

/// flavor react

```tsx
<searchBar
  hint="Search hint"
  text="searchPhrase"
  onTextChange={onTextChanged}
  onSubmit={onSubmit}
  onClose={onClose}
/>
```

///

### Props

| Name                       | Type        | Description                                                                                                                            |
| -------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `hint`                     | `String`    | Gets or sets placeholder text for the input area.                                                                                      |
| `text`                     | `String`    | Gets or sets the value of the search query.                                                                                            |
| `textFieldBackgroundColor` | `Color`     | Gets or sets the background color of the input area.                                                                                   |
| `textFieldHintColor`       | `Color`     | Gets or sets the color of the placeholder text.                                                                                        |
| `...Inherited`             | `Inherited` | Additional inherited properties not shown. Refer to the [API Reference](https://docs.nativescript.org/api-reference/classes/searchbar) |

<!-- TODO: fix links -->

### Events

| name         | description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| `textChange` | Emitted when the text is changed.                                                            |
| `submit`     | Emitted when the search input is submitted.                                                  |
| `clear`      | Emitted when the current search input is cleared through the **X** button in the input area. |

### Native Component

| Android                                                                                               | iOS                                                                          |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [`android.widget.SearchView`](https://developer.android.com/reference/android/widget/SearchView.html) | [`UISearchBar`](https://developer.apple.com/documentation/uikit/uisearchbar) |
