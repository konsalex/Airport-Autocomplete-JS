// Import polyfill for async support
import '@babel/polyfill';

///////////////////////////////
////// Custom Imports  ///////
//////////////////////////////
import airport_input from './airport.js';

// Development Link :
// https://cdn.rawgit.com/konsalex/Airport-Autocomplete-JS/3dbde72e/src/airports.json
// Should generate new link everytime for production?

const AIRPORT_URL =
  'https://raw.githubusercontent.com/konsalex/Airport-Autocomplete-JS/master/src/data/airports.json';

let airports;

let fetchTries = false;
let pending = true;

///////////////////////////////
// Airport Autocomplete //////
//////////////////////////////

// Fuse Option. We should enable user to override parameters for this!
const fuse_options = {
  shouldSort: true,
  threshold: 0.4,
  maxPatternLength: 32,
  keys: [
    {
      name: 'IATA',
      weight: 0.6,
    },
    {
      name: 'name',
      weight: 0.4,
    },
    {
      name: 'city',
      weight: 0.2,
    },
  ],
};

const Formatting = `<div class="$(unique-result)"
                     single-result" 
                     data-index="$(i)"> 
                     $(name) $(IATA) 
                    </br>
                    $(city) ,$(country)
                    </div>`;

const default_options = {
  fuse_options,
  // the formatting of the suggestions
  formatting: Formatting,
  // the maximum number of suggestions
  max_returned_results: 5,
};

/**
 * AirportInput(id, options = default_options)
 * Takes as inputs the following ->
 * id : The id of the input element is the webpage
 * options : A js object defining the Fuse options but also the
 *           formatting of the suggestions; more are going to be added
 *
 */

async function AirportInput(id, options = default_options) {
  const mergedOptions = {
    ...default_options,
    ...options,
  };

  // Create a promise to handle airport data fetching from the RawGit
  const airports_data = new Promise(resolve => {
    const FetchingFunction = () => {
      if (fetchTries) {
        // console.log('I am waiting for another id to fetch the airports');
        if (!pending) {
          clearInterval(cron);
          resolve(airports);
        }
      } else {
        fetchTries = true;
        // Call the fetch function passing the url of the API as a parameter
        fetch(AIRPORT_URL)
          .then(function(response) {
            return response.json();
          })
          .then(data => {
            pending = false;
            airports = data;
            clearInterval(cron);
            resolve(data);
          });
      }
    };
    const cron = setInterval(FetchingFunction, 500);
  });

  if (typeof airports === 'undefined' && pending) {
    airports = await airports_data; // wait till the promise resolves (*)
  }
  const { airports: airportList } = airports;

  airport_input(id, airportList, mergedOptions);
}

window.AirportInput = AirportInput;
