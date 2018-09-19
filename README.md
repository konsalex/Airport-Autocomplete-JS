# Airport Autocomple JS 🛩

[![Build Status](https://travis-ci.org/konsalex/Airport-Autocomplete-JS.svg?branch=master)](https://travis-ci.org/konsalex/Airport-Autocomplete-JS) [![CocoaPods](https://img.shields.io/cocoapods/l/AFNetworking.svg)](https://github.com/konsalex/Airport-Autocomplete-JS) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/airport-autocomplete-js.svg)](https://www.npmjs.com/package/airport-autocomplete-js)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## First airport autocomplete package for JS 🎉

This package depends on [Fuse.js](http://fusejs.io/) in order to search efficient the airport json.

You can find the airport.json under the `src/data` folder. The data has being scrapped from [OpenFlights.org](https://openflights.org/data.html)

As you can see in the code in order to minimize the js size and serve it fast, the airport json is being fetched only when needed from [RawGit](https://rawgit.com/).

This package aims to be used in travel websites, flight claiming platforms and anywhere you would love to. 

---

## Installation 🐲

### Option 1: Node package
You can isntall it just by typing 
```
npm i install airport-autocomplete-js
``` 
 or if you have yarn
```
yarn add airport-autocomplete-js
```

### Option 2: Embed the script to your page

Just include the script in your page served by [jsDelivr](https://www.jsdelivr.com/) CDN 

```
<script src="https://cdn.jsdelivr.net/npm/airport-autocomplete-js@2.0.2/dist/index.browser.min.js"></script>
```


## Usage 🌊

In order to use it just initialize instances of airport-autocomplete objects just by passing the input's id.

```
AirportInput("id-of-the-input-1")
AirportInput("id-of-the-input-n")
```

Regarding your needs, some of you may want to give bigger attention to IATA code search, others would love the City name search to gain the attention. So in addition to that, you can define your own options settings and pass it to the airport-autocomplete object.

```
const customOptions = {
  shouldSort: true,
  threshold: 0.4,
  maxPatternLength: 32,
  keys: [{
      name: "IATA",
      weight: 0.6
    },
    {
      name: "name",
      weight: 0.4
    },
    {
      name: "city",
      weight: 0.2
    }
  ]
};

AirportInput("id-of-the-input-1", customOptions)
```

For additional info on how option's object works you can check Fuse.js well-documented website.


---

## Demo 📽

You can see it in action! 

Clone the repo, install the dependencies and run `npm run dev` .

Then just open the `index.html` file inside demo folder and examine the code. 

Here is a gif demonstrating the functionality.

![AirportJS demo](https://raw.githubusercontent.com/konsalex/Airport-Autocomplete-JS/master/assets/img/AirportJS_demo.gif)


---

## Next steps 

Make it more dev-friendly for other devs to come and contribute and create framework specific packages (React, Angular). 
And maybe write the first tests 👨🏻‍💻
