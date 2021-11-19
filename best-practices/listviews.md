---
title: Best Practices with ListViews, RadListView, etc.
---

Quite possibly the _most_ important controls available on all mobile devices which have the most impact on perceived app performance.

ListView, RadListView and really any view component that utilizes some form of row recycling with view templates/components.

## Bad setup

Let's first look at a bad way to setup a ListView row template and why:

```xml
<ListView items="{{ myTitles }}" class="list-group">
  <ListView.itemTemplate>
    <StackLayout>
      <r:Render when="{{ !showSomethingElse }}">
        <r:Render.template>
          <StackLayout backgroundColor="lightblue">
            <Label text="{{ title }}" textWrap="true" class="title" />
          </StackLayout>
        </r:Render.template>
      </r:Render>
      <r:Render when="{{ showSomethingElse }}">
        <r:Render.template>
          <GridLayout rows="auto,5,auto,5,auto" backgroundColor="red">
            <Label text="{{ title }}" textWrap="true" class="title" />
            <Label row="2" text="Something Else" textWrap="true" class="title" />
            <Label
              row="4"
              text="Could show yet anything thing here"
              textWrap="true"
              class="title"
            />
          </GridLayout>
        </r:Render.template>
      </r:Render>
    </StackLayout>
  </ListView.itemTemplate>
</ListView>
```

This uses a custom `Render` component which **simulates** how various frontend framework integrations actually behave under the hood when `v-if` (Vue) and `ngIf` (Angular) are involved. The problems when using such things in the context of view scrolling and recyclyable rows with ListView controls can be devastating to user experience.

This is bad because it causes the creation and destruction of view elements while the user scrolls which is not performant at all.

## Good setup

```xml
<ListView items="{{ myTitles }}" class="list-group" itemTemplateSelector="{{selectItemTemplate}}">
  <ListView.itemTemplates>
    <template key="onelayout">
        <StackLayout backgroundColor="lightblue">
          <Label text="{{ title }}" textWrap="true" class="title" />
        </StackLayout>
    </template>
    <template key="anotherlayout">
      <GridLayout rows="auto,5,auto,5,auto" backgroundColor="red">
        <Label text="{{ title }}" textWrap="true" class="title" />
        <Label row="2" text="Something Else" textWrap="true" class="title" />
        <Label row="4" text="Could show yet anything thing here" textWrap="true" class="title" />
      </GridLayout>
    </template>
  </ListView.itemTemplates>
</ListView>

// Using template selectors
selectItemTemplate(item, index, items) {
  return item && item.showSomethingElse ? 'anotherlayout' : 'onelayout';
}
```

Using template selectors is something that ListView and RadListView support and should always be used when needing to do conditional layouts in rows while a user scrolls.
