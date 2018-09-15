// Importing the Airport data
import {
  airports
} from "./data_const.js";

import Fuse from "fuse.js";

// Development Link : https://rawgit.com/konsalex/Airport-Autocomplete-JS/master/airports.json
// Should generate new link everytime for production?

// Variables to Come as parameters
var RETURNED_RESULTS = 10

// Fuse Option. We should enable user to override parameters for this!
var options = {
  shouldSort: true,
  threshold: 0.4,
  maxPatternLength: 32,
  keys: [{
      name: "IATA",
      weight: 0.8
    },
    {
      name: "name",
      weight: 0.3
    },
    {
      name: "city",
      weight: 0.5
    }
  ]
};

var fuse = new Fuse(airports.airports, options);





// Replacement of .empty() function in Jquery 

function emptyChildNodes(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

// Elements with Jquery Declaration - Previous Implementation

// var ac = $(".autocomplete")
//   .on("click", function (e) {
//     e.stopPropagation();
//   })
//   .on("focus keyup", search)
//   .on("keydown", onKeyDown);


// var wrap = $("<div>")
//   .addClass("autocomplete-wrapper")
//   .insertBefore(ac)
//   .append(ac);


// var list = $("<div>")
//   .addClass("autocomplete-results")
//   .on("click", ".autocomplete-result", function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     selectIndex($(this).data("index"));
//   })
//   .appendTo(wrap);


/////////////////////////////////////////////////////////////////////////////
//////////////////// Main VanillaJS implementation //////////////////////////
/////////////////////////////////////////////////////////////////////////////

var ac = document.getElementsByClassName('autocomplete')[0]
ac.addEventListener("click", function (e) {
  e.stopPropagation();
})
ac.addEventListener("keyup", search)
ac.addEventListener("focus", search)
ac.addEventListener("keydown", onKeyDown);


var wrap = document.createElement("div");
wrap.className = "autocomplete-wrapper";
ac.parentNode.insertBefore(wrap, ac);
wrap.appendChild(ac);


var list = document.createElement("div");
list.className = "autocomplete-results";
wrap.appendChild(list);

var list = document.getElementsByClassName('autocomplete-results')[0]
list.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  selectIndex(this.getAttribute("data-highlight"));
})


/////////////////////////////////////////////////////////////////////////////
//////////////////// Finito of VanillaJS ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////



$(document)
  .on("mouseover", ".autocomplete-result", function (e) {
    var index = parseInt($(this).data("index"), 10);
    if (!isNaN(index)) {
      list.setAttribute("data-highlight", index);
    }
  })
  .on("click", clearResults);

function clearResults() {
  results = [];
  numResults = 0;
  emptyChildNodes(list)
  // list.empty();
}

function selectIndex(index) {
  if (results.length >= parseInt(index) + 1) {
    ac.value = results[index].IATA + "  " + results[index].name;
    clearResults();
  }
}

var results = [];
var numResults = 0;
var selectedIndex = -1;

function search(e) {
  // 38 code = up Arrow
  // 13 code = enter
  // 40 code = down arrow
  if (e.which === 38 || e.which === 13 || e.which === 40) {
    return;
  }

  // Check if user have written anything
  if (ac.value.length > 0) {
    // Splice the results and 
    results = fuse.search(ac.value).slice(0, RETURNED_RESULTS);
    numResults = results.length;

    var divs = results.map(function (r, i) {
      return (
        '<div class="autocomplete-result single-result" data-index="' +
        i +
        '">' +
        '<div class="autocomplete-result"><b>' +
        r.IATA +
        "</b> - " +
        r.name +
        "</div>" +
        '<div class="autocomplete-location">' +
        r.city +
        ", " +
        r.country +
        "</div>" +
        "</div>"
      );
    });

    selectedIndex = -1;
    // Jquery - Inserts HTML code to the div of the list
    // list.html(divs.join("")).attr("data-highlight", selectedIndex);

    // Mine VanillaJS implementation of this 
    document.getElementsByClassName('autocomplete-results')[0].innerHTML = divs.join("");


  } else {
    numResults = 0;
    // Jquery - Removes all child nodes of the set of matched elements from the DOM.
    // list.empty();
    // Vanilla JS replacement by Konsalex (Xamos)
    emptyChildNodes(list);
  }
}

function onKeyDown(e) {
  switch (e.which) {
    case 38: // up
      selectedIndex--;
      if (selectedIndex <= -1) {
        selectedIndex = -1;
      }
      list.setAttribute("data-highlight", selectedIndex);
      break;
    case 13: // enter
      selectIndex(selectedIndex);
      break;
    case 9: // enter
      selectIndex(selectedIndex);
      e.stopPropagation();
      return;
    case 40: // down
      selectedIndex++;
      if (selectedIndex >= numResults) {
        selectedIndex = numResults - 1;
      }

      list.setAttribute("data-highlight", selectedIndex);
      break;

    default:
      return; // exit this handler for other keys
  }
  e.stopPropagation();
  e.preventDefault(); // prevent the default action (scroll / move caret)
}