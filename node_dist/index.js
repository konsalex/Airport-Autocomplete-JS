"use strict";

require("@babel/polyfill");

var _airport = _interopRequireDefault(require("./airport.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Development Link : https://cdn.rawgit.com/konsalex/Airport-Autocomplete-JS/3dbde72e/src/airports.json
// Should generate new link everytime for production?
var AIRPORT_URL = "https://cdn.rawgit.com/konsalex/Airport-Autocomplete-JS/3dbde72e/src/airports.json";
var airports;
var FETCH_TRIES = false; ///////////////////////////////
// Airport Autocomplete //////
//////////////////////////////
// Fuse Option. We should enable user to override parameters for this!

var options = {
  shouldSort: true,
  threshold: 0.4,
  maxPatternLength: 32,
  keys: [{
    name: "IATA",
    weight: 0.6
  }, {
    name: "name",
    weight: 0.4
  }, {
    name: "city",
    weight: 0.2
  }]
};

function AirportInput(_x) {
  return _AirportInput.apply(this, arguments);
}

function _AirportInput() {
  _AirportInput = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id) {
    var fuses_options,
        airports_data,
        _airports,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fuses_options = _args.length > 1 && _args[1] !== undefined ? _args[1] : options;
            // Create a promise to handle airport data fetching from the RawGit
            airports_data = new Promise(function (resolve, reject) {
              if (FETCH_TRIES) {
                console.log("I have the airports");
              } else {
                fetch(AIRPORT_URL) // Call the fetch function passing the url of the API as a parameter
                .then(function (response) {
                  return response.json();
                }).then(function (data) {
                  airports = data;
                  resolve(data);
                });
              }
            });

            if (!(typeof airports === "undefined")) {
              _context.next = 6;
              break;
            }

            _context.next = 5;
            return airports_data;

          case 5:
            _airports = _context.sent;

          case 6:
            (0, _airport.default)(id, airports.airports, options);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _AirportInput.apply(this, arguments);
}

window.AirportInput = AirportInput;