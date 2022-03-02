---
title: Svelte Tutorial
---

## Getting Started with NativeScript Svelte

This tutorial introduces you to the fundamentals of using NativeScript with Svelte by walking you through building an example app with some basic functionalities.

This tutorial will teach you the following:

- Build layouts using NativeScript components
- Add interactivity to your app using gestures
- Use routing to navigate between different views

## Prerequisites

To get the most out of this tutorial you should already have a basic understanding of Svelte. If you're completely new to Svelte, you might want to try the official [Svelte tutorial](https://svelte.dev/tutorial/basics) first.

## Overview of the example application

You'll build a master-details app that displays a list of musicals and allows you to navigate to a details page to view more information about each musical.

![Example app preview](/assets/images/tutorial/tutorial-example-app-preview.png)

You can find the complete source code of the application on [GitHub](https://github.com/NativeScript/tutorials/tree/main/svelte-tutorial)

## Set up your environment

To set up your development environment, follow the instructions in the [Environment Setup](https://docs.nativescript.org/environment-setup.html#windows-android) section of the docs.

## Create a new NativeScript application

We will be using Typescript for this tutorial. To create a new NativeScript Typescript application, run the CLI command `ns create` with the name of the application followed by `--svelte`.

```cli
ns create example-app --svelte
```

The NativeScript CLI creates a new directory with the root folder named `example-app` with an initial skeleton app project and installs the necessary packages and dependencies. This can take a few minutes and should be ready to run once it's done installing.

## Run the application

Go to the project's directory and run the following command to run it on the respective platforms.

```cli
cd example-app

// run on iOS
ns run ios

// run on Android
ns run android
```

The `ns run` command builds the app and launches the app on a connected Android device or Android emulator for Android and a connected iOS device or iOS simulator for iOS. By default, it listens for changes in your code, synchronizes those changes, and refreshes all selected devices.

## Folder structure

Based on the Typescript starter app, we will be creating the following file/folder structure for our application.

```
app
  |- assets
      |- anastasia.png
      |- beetlejuicemusical.png
      |- bookofmormon.png
  |- pages
      |- Home.svelte
      |- Details.svelte
  |- models
      |- flick.ts
  |- services
      |- flickService.ts
  |- app.css
  |- App.svelte
  |- app.ts
```

## Create the home page

Let's start with creating the file for our home page with the following contents:

```html
<!-- app/pages/Home.svelte -->
<page> </page>

<script></script>
```

### Routing setup

We will be setting up the home page as our default route when the app starts. We can set the default route by importing the home component in our `App.svelte` file and setting it as the `defaultPage` of the root's `frame` component. Open `App.svelte` and add the following code:

```html
<!-- app/App.svelte -->

<page>
  <frame id="rootFrame" defaultPage="{Home}"></frame>
</page>

<script>
  import Home from './pages/Home.svelte'
</script>
```

### Home UI

Before we create the UI of our home page, let's create our `FlickModel` and `FlickService` first. This will allow us to use the data directly in our template.

`FlickModel` will contain the shape of each flick object. Create a `models` directory inside `app` and create a new file called `flick.ts`. Open the new `flick.ts` and add the following `interface`:

```typescript
// app/models/flick.ts

export interface FlickModel {
  id: number
  genre: string
  title: string
  image: string
  url: string
  description: string
  details: {
    title: string
    body: string
  }[]
}
```

We will then use the `FlickModel` in our `FlickService` to return our flick data. Create a `services` directory inside `app` and create a new file called `flickService.ts`. Open the new `flickService.ts` and add the following:

```typescript
// app/services/flickService.ts

import { FlickModel } from '../models/flick'

export class FlickService {
  private flicks: FlickModel[] = [
    {
      id: 1,
      genre: 'Musical',
      title: 'Book of Mormon',
      image: '~/assets/bookofmormon.png',
      url: 'https://nativescript.org/images/ngconf/book-of-mormon.mov',
      description: `A satirical examination of the beliefs and practices of The Church of Jesus Christ of Latter-day Saints.`,
      details: [
        {
          title: 'Music, Lyrics and Book by',
          body: 'Trey Parker, Robert Lopez, and Matt Stone'
        },
        {
          title: 'First showing on Broadway',
          body: 'March 2011 after nearly seven years of development.'
        },
        {
          title: 'Revenue',
          body:
            'Grossed over $500 million, making it one of the most successful musicals of all time.'
        },
        {
          title: 'History',
          body:
            'The Book of Mormon was conceived by Trey Parker, Matt Stone and Robert Lopez. Parker and Stone grew up in Colorado, and were familiar with The Church of Jesus Christ of Latter-day Saints and its members. They became friends at the University of Colorado Boulder and collaborated on a musical film, Cannibal! The Musical (1993), their first experience with movie musicals. In 1997, they created the TV series South Park for Comedy Central and in 1999, the musical film South Park: Bigger, Longer & Uncut. The two had first thought of a fictionalized Joseph Smith, religious leader and founder of the Latter Day Saint movement, while working on an aborted Fox series about historical characters. Their 1997 film, Orgazmo, and a 2003 episode of South Park, "All About Mormons", both gave comic treatment to Mormonism. Smith was also included as one of South Park\'s "Super Best Friends", a Justice League parody team of religious figures like Jesus and Buddha.'
        },
        {
          title: 'Development',
          body: `During the summer of 2003, Parker and Stone flew to New York City to discuss the script of their new film, Team America: World Police, with friend and producer Scott Rudin (who also produced South Park: Bigger, Longer & Uncut). Rudin advised the duo to see the musical Avenue Q on Broadway, finding the cast of marionettes in Team America similar to the puppets of Avenue Q. Parker and Stone went to see the production during that summer and the writer-composers of Avenue Q, Lopez and Jeff Marx, noticed them in the audience and introduced themselves. Lopez revealed that South Park: Bigger, Longer & Uncut was highly influential in the creation of Avenue Q. The quartet went for drinks afterwards, and soon found that each camp wanted to write something involving Joseph Smith. The four began working out details nearly immediately, with the idea to create a modern story formulated early on. For research purposes, the quartet took a road trip to Salt Lake City where they "interviewed a bunch of missionaries—or ex-missionaries." They had to work around Parker and Stone\'s South Park schedule. In 2006, Parker and Stone flew to London where they spent three weeks with Lopez, who was working on the West End production of Avenue Q. There, the three wrote "four or five songs" and came up with the basic idea of the story. After an argument between Parker and Marx, who felt he was not getting enough creative control, Marx was separated from the project.[10] For the next few years, the remaining trio met frequently to develop what they initially called The Book of Mormon: The Musical of the Church of Jesus Christ of Latter-day Saints. "There was a lot of hopping back and forth between L.A. and New York," Parker recalled.`
        }
      ]
    },
    {
      id: 2,
      genre: 'Musical',
      title: 'Beetlejuice',
      image: '~/assets/beetlejuicemusical.png',
      url: 'https://nativescript.org/images/ngconf/beetlejuice.mov',
      description: `A deceased couple looks for help from a devious bio-exorcist to handle their haunted house.`,
      details: [
        {
          title: 'Music and Lyrics',
          body: 'Eddie Perfect'
        },
        {
          title: 'Book by',
          body: 'Scott Brown and Anthony King'
        },
        {
          title: 'Based on',
          body: 'A 1988 film of the same name.'
        },
        {
          title: 'First showing on Broadway',
          body: 'April 25, 2019'
        },
        {
          title: 'Background',
          body: `In 2016, a musical adaptation of the 1988 film Beetlejuice (directed by Tim Burton and starring Geena Davis as Barbara Maitland, Alec Baldwin as Adam Maitland, Winona Ryder as Lydia Deetz and Michael Keaton as Betelgeuse) was reported to be in the works, directed by Alex Timbers and produced by Warner Bros., following a reading with Christopher Fitzgerald in the title role. In March 2017, it was reported that Australian musical comedian Eddie Perfect would be writing the music and lyrics and Scott Brown and Anthony King would be writing the book of the musical, and that another reading would take place in May, featuring Kris Kukul as musical director. The musical has had three readings and two laboratory workshops with Alex Brightman in the title role, Sophia Anne Caruso as Lydia Deetz, Kerry Butler and Rob McClure as Barbara and Adam Maitland.`
        }
      ]
    },
    {
      id: 3,
      genre: 'Musical',
      title: 'Anastasia',
      image: '~/assets/anastasia.png',
      url: 'https://nativescript.org/images/ngconf/anastasia.mov',
      description: `The legend of Grand Duchess Anastasia Nikolaevna of Russia.`,
      details: [
        { title: 'Music and Lyrics', body: 'Lynn Ahrens and Stephen Flaherty' },
        {
          title: 'Book by',
          body: 'Terrence McNally'
        },
        {
          title: 'Based on',
          body: 'A 1997 film of the same name.'
        },
        {
          title: 'Background',
          body: `A reading was held in 2012, featuring Kelli Barret as Anya (Anastasia), Aaron Tveit as Dmitry, Patrick Page as Vladimir, and Angela Lansbury as the Empress Maria. A workshop was held on June 12, 2015, in New York City, and included Elena Shaddow as Anya, Ramin Karimloo as Gleb Vaganov, a new role, and Douglas Sills as Vlad.
        The original stage production of Anastasia premiered at the Hartford Stage in Hartford, Connecticut on May 13, 2016 (previews). The show was directed by Darko Tresnjak and choreography by Peggy Hickey, with Christy Altomare and Derek Klena starring as Anya and Dmitry, respectively.
        Director Tresnjak explained: "We've kept, I think, six songs from the movie, but there are 16 new numbers. We've kept the best parts of the animated movie, but it really is a new musical." The musical also adds characters not in the film. Additionally, Act 1 is set in Russia and Act 2 in Paris, "which was everything modern Soviet Russia was not: free, expressive, creative, no barriers," according to McNally.
        The musical also omits the supernatural elements from the original film, including the character of Rasputin and his musical number "In the Dark of the Night", (although that song’s melody is repurposed in the new number "Stay, I Pray You"), and introduces instead a new villain called Gleb, a general for the Bolsheviks who receives orders to kill Anya.`
        }
      ]
    }
  ]

  static getInstance(): FlickService {
    return FlickService._instance
  }

  private static _instance: FlickService = new FlickService()

  getFlicks(): FlickModel[] {
    return this.flicks
  }

  getFlickById(id: number): FlickModel | undefined {
    return this.flicks.find(flick => flick.id === id) || undefined
  }
}
```

Add a `/app/assets/` directory to your project, and copy the 3 static images over from the sample project [here](https://github.com/NativeScript/tutorials/tree/main/svelte-tutorial/app/assets).

Next, let's break down the layout and UI elements of the home page.

![Home page layout breakdown](/assets/images/tutorial/tutorial-example-app-master-breakdown.png)

The home page can be divided into two main parts, the action bar with the title and the scrollable main content area with the cards (we will talk about the cards in the next section). Let's start with creating the action bar with the title. Open `Home.svelte` and add the following code:

```html
<!-- app/pages/Home.svelte -->
<page>
  <actionBar title="NativeFlix" />
</page>
<script></script>
```

Since we have an array of flicks to display we can use NativeScript's [`ListView`](https://docs.nativescript.org/ui-and-styling.html#listview) component. `ListView` is a NativeScript UI component that efficiently renders items in a vertical or horizontal scrolling list. Let's first create a variable called flick in our home component that we are going to use as our `ListView`'s data source. Open `Home.svelte` and add the following:

```html{9}
<!-- app/pages/Home.svelte -->

<page>
  <actionBar title="NativeFlix" />
</page>

<script>
  // Add the following 👇
  import { FlickService } from '../services/FlickService'

  let flicks = FlickService.getInstance().getFlicks()
</script>
```

Next, add the `ListView` component:

```html{6-12,17}
<!-- app/pages/Home.svelte -->

<page>
  <actionBar title="NativeFlix" />
  <!-- Add this 👇 -->
  <stackLayout height="100%">
    <listView height="100%" separatorColor="transparent" items="{flicks}">
      <Template let:item>
        <label text="{item.title}" />
      </Template>
    </listView>
  </stackLayout>
</page>

<script>
  // Add this 👇
  import { Template } from 'svelte-native/components'
  import { FlickService } from '../services/FlickService'

  let flicks = FlickService.getInstance().getFlicks()
</script>
```

`ListView` in NativeScript Svelte uses the `items` property as its data source. In the snippet above, we set the `items` property to `flicks`. This loops through the `flicks` observable array and renders the contents within the `Template` for each entry. If you run the app now, you should see a list of flick titles.

### Create flick cards

Before we dive into creating the card below, let's create some classes for our background and text colors that we will be using in the application. As this will be shared throughout the application, let's add this to the `app.css`. Open `app.css` and add the following:

```css
/* app/app.scss */

/* applied when device is in light mode */
.ns-light .bg-primary {
  background-color: #fdfdfd;
}
.ns-light .bg-secondary {
  background-color: #ffffff;
}
.ns-light.text-primary {
  color: #444;
}
.ns-light.text-secondary {
  color: #777;
}

/* applied when device is in dark mode */
.ns-dark .bg-primary {
  background-color: #212121;
}
.ns-dark .bg-secondary {
  background-color: #383838;
}
.ns-dark .text-primary {
  color: #eee;
}
.ns-dark .text-secondary {
  color: #ccc;
}
```

![Home page cards breakdown](/assets/images/tutorial/tutorial-example-app-master-card-breakdown.png)

As you can see in the image above, each card is made up of 3 components, the preview image, a title, and a description. We will be using a `GridLayout` as our container and use the `Image` and `Label` components for the preview image and texts. Open your `Home.svelte` and add the following:

```html
<!-- app/pages/Home.svelte -->

<page>
  <actionBar title="NativeFlix" />
  <stackLayout height="100%">
    <listView height="100%" separatorColor="transparent" items="{flicks}">
      <Template let:item>
        <!-- Add this 👇 -->
        <gridLayout
          height="280"
          borderRadius="10"
          class="bg-secondary"
          rows="*, auto, auto"
          columns="*"
          margin="5 10"
          padding="0"
        >
          <image row="0" margin="0" stretch="aspectFill" src="{item.image}" />
          <label
            row="1"
            margin="10 10 0 10"
            fontWeight="700"
            class="text-primary"
            fontSize="18"
            text="{item.title}"
          />
          <label
            row="2"
            margin="0 10 10 10"
            class="text-secondary"
            fontSize="14"
            textWrap="true"
            text="{item.description}"
          />
        </gridLayout>
      </Template>
    </listView>
  </stackLayout>
</page>

<script>
  import { Template } from 'svelte-native/components'
  import { FlickService } from '../services/FlickService'

  let flicks = FlickService.getInstance().getFlicks()
</script>
```

### Checkpoint

If you've followed along this far, running the app on either platform should result in an app that resembles the one in this screenshot, with the list being scrollable vertically.

![Home page](/assets/images/tutorial/tutorial-example-app-master.png)

## Create the details page

Let's start with creating the file for our details page with the following contents:

```html
<!-- app/pages/Details.svelte -->

<page> </page>

<script></script>
```

### Setup navigation from home to details component

We will be using the `navigate` function from `svelte-native` class to navigate from our home component to the details component. In addition to the page name, we will also pass in the flick's `id` as part of the `props` object of the `navigate` function. We will use this `id` in our details component to access more information about the flick. Open `Home.svelte` and add the following:

```html{42,46,51-56}
<!-- app/pages/Home.svelte -->

<page>
  <actionBar title="NativeFlix" />
  <stackLayout height="100%">
    <listView height="100%" separatorColor="transparent" items="{flicks}">
      <Template let:item>
        <gridLayout
          height="280"
          borderRadius="10"
          class="bg-secondary"
          rows="*, auto, auto"
          columns="*"
          margin="5 10"
          padding="0"
        >
          <image row="0" margin="0" stretch="aspectFill" src="{item.image}" />
          <label
            row="1"
            margin="10 10 0 10"
            fontWeight="700"
            class="text-primary"
            fontSize="18"
            text="{item.title}"
          />
          <label
            row="2"
            margin="0 10 10 10"
            class="text-secondary"
            fontSize="14"
            textWrap="true"
            text="{item.description}"
          />
        </gridLayout>
      </Template>
    </listView>
  </stackLayout>
</page>

<script>
  // Add this 👇
  import { navigate } from 'svelte-native'
  import { Template } from 'svelte-native/components'
  import { FlickService } from '../services/FlickService'
  // Add this 👇
  import Details from './Details.svelte'

  let flicks = FlickService.getInstance().getFlicks()

  // Add this 👇
  function onFlickTap(event) {
    navigate({
      page: Details,
      props: { flickId: flicks[event.index].id }
    })
  }
</script>
```

Next, let's add the tap event to the listview items. Open `Home.svelte` and add the following:

```html{11}
<!-- app/pages/Home.svelte -->

<page>
  <actionBar title="NativeFlix" />
  <stackLayout height="100%">
    <!-- add itemTap 👇 -->
    <listView
      height="100%"
      separatorColor="transparent"
      items="{flicks}"
      on:itemTap="{onFlickTap}"
    >
      <Template let:item>
        <gridLayout
          height="280"
          borderRadius="10"
          class="bg-secondary"
          rows="*, auto, auto"
          columns="*"
          margin="5 10"
          padding="0"
        >
          <image row="0" margin="0" stretch="aspectFill" src="{item.image}" />
          <label
            row="1"
            margin="10 10 0 10"
            fontWeight="700"
            class="text-primary"
            fontSize="18"
            text="{item.title}"
          />
          <label
            row="2"
            margin="0 10 10 10"
            class="text-secondary"
            fontSize="14"
            textWrap="true"
            text="{item.description}"
          />
        </gridLayout>
      </Template>
    </listView>
  </stackLayout>
</page>

<script>
  import { navigate } from 'svelte-native'
  import { Template } from 'svelte-native/components'
  import { FlickService } from '../services/FlickService'
  import Details from './Details.svelte'

  let flicks = FlickService.getInstance().getFlicks()

  function onFlickTap(event) {
    navigate({
      page: Details,
      props: { flickId: flicks[event.index].id }
    })
  }
</script>
```

### Access navigation props

We passed in the `id` of the flick card the user tapped on in the previous section as we navigate to the details page. We can access the passed in `flickId` by declaring and exporting a variable with the same name in the details component. We can then use the `id` to get the selected flick information to be displayed in our details component's template. Open `Details.svelte` and add the following:

```html{7}
<!-- app/pages/Details.svelte -->

<page> </page>

<script>
  // Add this 👇
  export let flickId
</script>
```

Next, let's use the `flickId` to get the flick information from our `FlickService`. Open `Details.svelte` and add the following:

```html{7,11}
<!-- app/pages/Details.svelte -->

<page> </page>

<script>
  // Add this 👇
  import { FlickService } from '../services/FlickService'

  export let flickId
  // Add this 👇
  let flick = FlickService.getInstance().getFlickById(flickId)
</script>
```

### Details UI

Let's break down the layout and UI elements of the details page.

![Details page layout breakdown](/assets/images/tutorial/tutorial-example-app-details-breakdown.png)

The details page can be divided into three main parts, the action bar with the flick title, the hero image, and the main content with the flick details. We will use the `details` array from our `flicks` object to populate the flick details section. The `details` array contains objects with a `title` and `body` which are rendered uniformly, each with their style. We can use Svelte's `#each` block to loop through the array and create a UI element or set of elements for each entry in the array. Open `Details.svelte` and add the following code:

```html{5,8-32}
<!-- app/pages/Details.svelte -->

<page>
  <!-- Add this 👇 -->
  <actionBar title="{flick.title}" />

  <!-- Add this 👇 -->
  <scrollView>
    <stackLayout>
      <image margin="0" stretch="aspectFill" src="{flick.image}" />
      <stackLayout padding="10 20">
        {#each flick.details as details}
        <stackLayout>
          <label
            marginTop="15"
            fontSize="16"
            fontWeight="700"
            class="text-primary"
            textWrap="true"
            text="{details.title}"
          />
          <label
            fontSize="14"
            class="text-secondary"
            textWrap="true"
            text="{details.body}"
          />
        </stackLayout>
        {/each}
      </stackLayout>
    </stackLayout>
  </scrollView>
</page>

<script>
  import { FlickService } from '../services/FlickService'

  export let flickId
  let flick = FlickService.getInstance().getFlickById(flickId)
</script>
```

### Checkpoint

Running the app on either platform should now result in an app that resembles the one in this screenshot with the ability to navigate between the home and details pages.

![Details page](/assets/images/tutorial/tutorial-example-app-details.png)

## What's next

Congratulations! You built your first NativeScript app that runs on both iOS and Android. You can continue adding more [NativeScript UI components](https://docs.nativescript.org/ui-and-styling.html) (or build your custom UI components), or you could add some [native functionalities](https://docs.nativescript.org/native-api-access.html). The possibilities are endless!
