# Hackathon

This is our repository for the Hackathon during the Web Design &amp; Development minor at AUAS, academic year 2023-2024.

-   [Introduction to the assignment](#introduction-to-the-assignment)
-   [Installation](#installation)
-   [The idea: pre-code](#the-idea-pre-code)
    -   [Tools we want to use](#tools-we-want-to-use)
-   [Usage and Features](#usage-and-features)
-   [External Sources](#external-sources)

## Introduction to the assignment

On 25/03, we were introduced to Krijn Hoetmer who presented to us the assignment for this Hackathon. There are no rules, we may use whatever we please, so long as we create something awesome using data detailing every year of CSS Day, which he has put together for us to use.

Whoever wins, gets tickets to CSS Day. So.. for a lot of us, the challenge was on.

## Installation

Here are the steps to install our project.

1. Under the `Code` tab at the top.
2. Download this repository as a `.zip` file and unpack it.
3. Locate the folder `hackathon`
    - If you have `VS Code`: From here, all you need to do is open the folder in your editor and use the `Live Server` extension to start a local host. This allows you to also view the code and work more hands-on, should you desire.
    - If not, you can find the document on your device, navigate to the `index.html` file (this should be visible just by opening up `hackathon`), right-click it and open in a browser of your choosing.

## The idea: pre-code

The first thing that stood out to us was the data about the amount of attendees for every country. This came to us as valuable and insightful data. Rose brought up the concept of maybe making this very literally visual by attempting to use [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/) to make a 3D (interactable) globe. Of course, we didn't know how much time this might take us, so we took it with a grain of salt but were nonetheless quite motivated to see if we could get this done.

To get the ball rolling more than just this concept though, the team and notably Sena Nur got to making a more general concept, which looked something like this:

<img width="604" alt="Sketch detailing the general idea for the project" src="./readme-images/concept-sketch.png">

For our remaining data, we thought that the speakers themselves were also of course an essential key to telling the story of CSS days. We thought of a timeline where we could make a dynamic timeline of the ten editions of CSS Day. Select a year, get the avatars of speakers for that year back, and hover over them to view their name and the title of their talk. Click on them, and get to view the video of the talk along with its metadata!

### Tools we want to use

The tools we're thinking of using are the following:

1. [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/api/): in their words, MapboxGL is a client-side JavaScript library for building web maps and web applications with Mapbox's modern mapping technology. You can use Mapbox GL JS to display Mapbox maps in a web browser or client, add user interactivity, and customize the map experience in your application. We want to use this to project the amount of visitors per country on a globe in the browser, using a heatmap of sorts. In theory, we'll define a color scale and loop over each country in the CSS Day data array, then take the value of the amount of attendees for that country and calculate the color it should have depending on where it falls on the scale.
2. [SvelteKit](https://kit.svelte.dev/): this is a framework that has fairly little rules and allows us to store the map and other key parts of the application in separate components, without having to adhere to a very specific syntax like you would with _some_ frameworks (cough, React). This will make the process a lot less frustrating for us.

## Usage and Features

TBA.

## Reflection

TBA.

## External Sources

1. [Mapbox GL Docs](https://docs.mapbox.com/mapbox-gl-js/api/)
2. [SvelteKit Docs](https://kit.svelte.dev/)
3. [Article: How to color a country in Mapbox GL](https://www.nieknijland.nl/blog/how-to-highlight-countries-with-mapbox)
