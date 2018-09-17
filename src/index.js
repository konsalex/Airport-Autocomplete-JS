// Import polyfill for async support
import "@babel/polyfill";

///////////////////////////////
////// Custom Imports  ///////
//////////////////////////////
import airport_input from "./airport.js";

// Development Link : https://cdn.rawgit.com/konsalex/Airport-Autocomplete-JS/3dbde72e/src/airports.json
// Should generate new link everytime for production?

const AIRPORT_URL =
  "https://cdn.rawgit.com/konsalex/Airport-Autocomplete-JS/3dbde72e/src/airports.json";

let airports;

let FETCH_TRIES = false;

///////////////////////////////
// Airport Autocomplete //////
//////////////////////////////

// Fuse Option. We should enable user to override parameters for this!
const options = {
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

async function AirportInput(id, fuses_options = options) {
  // Create a promise to handle airport data fetching from the RawGit
  let airports_data = new Promise((resolve, reject) => {
    if (FETCH_TRIES) {
      console.log("I have the airports");
    } else {
      fetch(AIRPORT_URL) // Call the fetch function passing the url of the API as a parameter
        .then(function (response) {
          return response.json();
        })
        .then(data => {
          airports = data;
          resolve(data);
        });
    }
  });

  if (typeof airports === "undefined") {
    let airports = await airports_data; // wait till the promise resolves (*)
  }
  airport_input(id, airports.airports, options);
}

window.AirportInput = AirportInput;