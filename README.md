# Rooms booking app

[Deployed app](rooms-booking-app.vercel.app)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Intro

I spent 2 hours setting up and building this application, plus about 30 mins writing this README (and fixing a deployment build error).

## Stack used & decisions made

- Next.js (pages router)
  Next.js is a great choice for these kind of small static apps because it allows using static rendering and doing the first API call in the server, thus making the app more performant in terms of speed. It also comes with ts and tailwind css out of the box, so setup is very fast, making it perfect for a quick project. I picked the app router since in this case it wouldn't affect performance much (plus I've only used it a few times and wanted to avoid getting stuck in details about the client boundaries).

- React Context
  I decided to use react context so I could simulate a working application. Since the API only allows reading the values and I wanted to make the app a bit more dynamic, I used context to keep some global state. Normally if we were using an API I would probably use redux or react-query instead for some (optimistic) state management. I considered as well using local storage to persist the data, but it didn't add too much and I decided to use the time in other ways.

- Tailwind CSS
  Comes with Next.js and it's definitely the fastest way to style for me, so I am using it in smaller projects or cases where speed is more important that the code looking good. If this was a more complex and long term project I would probably use Vanilla Extract since it allows type safety.

  - **Arbitrary values:**
    Since the figma design didn't use the 8 point grid system there are some arbitrary values used (more than I would like to), but I just wouldn't have the time in 2h to setup a whole theme config

  - **Pixel perfection:**
    I had to take a liberty here and there with the design, since some things in the figma were unusual: for example in the main component, the padding is 30 on one side and 38 in the other. I believe this is unintended, so I corrected it and centered the container. There might a couple of situations like this.

- Vitest
  I decided to use vitest since it's faster than jest and it works well with the react testing library. (Plus, it's the one I'm used to using)

- Radix UI / Dialog
  I love using the Radix UI components, and I wanted to add a nice dialog to the app. Radix UI comes with a lot of built-in accessibility and interaction features, plus it's modular (unlike headless ui), super complete and super light. Definitely my choice when building UI components / UI component libraries.

- Framer motion
  Last minute I had time to add a transition on the dialog, and I was happy I did since it adds a bit of movement to the app. Framer motion is really nice to use, a lot easier integration with Next than greensock, plus I used it before to animate dialogs etc so I picked it since I knew it would be fast.

## If I had more time

- Form validation: the form works, but it doesn't really show the user much feedback. Loading states, error messages and success screen would definitely be the first thing I would do if I had more time. I would probably use something like react hook form to help with this.

- More DRY: when coding fast it's easy to miss opportunities to separate components, for example the button should be its own component since it's used in several places. There are probably more instances of this.

- Testing: I tested the main parts of the UI but I didn't make tests for my context hook which actually controls all the state, this should definitely be addressed.

- More time spent thinking about hover effects and user interactions: I added some basic hover effects but I would probably spend some time discussing with the designer what can be improved. Maybe a nicer button hover animation?
