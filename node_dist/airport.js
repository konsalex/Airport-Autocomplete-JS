"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fuse = _interopRequireDefault(require("fuse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Variables to Come as parameters
var RETURNED_RESULTS = 5; // Simulates Jquery .empty() behavior but a little bit more Vanilla

function emptyChildNodes(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

var airport_input = function airport_input(id, data, options) {
  var fuse = new _fuse.default(data, options);
  var ac = document.getElementById(id);
  ac.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  ac.addEventListener("keyup", search);
  ac.addEventListener("focus", search);
  ac.addEventListener("keydown", onKeyDown);
  var autocomplete_wrapper = ["autocomplete-wrapper", id].join(" ");
  var autocomplete_results = ["autocomplete-results", id].join(" ");
  var autocomplete_result = ["autocomplete-result", id].join(" ");
  var wrap = document.createElement("div");
  wrap.className = autocomplete_wrapper;
  ac.parentNode.insertBefore(wrap, ac);
  wrap.appendChild(ac);
  var list = document.createElement("div");
  list.className = autocomplete_results;
  wrap.appendChild(list);
  var list = document.getElementsByClassName(autocomplete_results)[0];
  list.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    selectIndex(this.getAttribute("data-highlight"));
  });
  list.addEventListener("mouseover", function (event) {
    var index = event.target.getAttribute('data-index');
    list.setAttribute("data-highlight", index);
  });

  function clearResults() {
    results = [];
    numResults = 0;
    emptyChildNodes(list);
  }

  function selectIndex(index) {
    if (results.length >= parseInt(index) + 1) {
      ac.value = results[index].IATA + "  " + results[index].name;
      ac.setAttribute("data-lon", results[index].lon);
      ac.setAttribute("data-lat", results[index].lat);
      ac.setAttribute("data-iata", results[index].IATA);
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
    } // Check if user have written anything


    if (ac.value.length > 0) {
      // Splice the results and 
      results = fuse.search(ac.value).slice(0, RETURNED_RESULTS);
      numResults = results.length;
      var divs = results.map(function (r, i) {
        return "<div class=\" ".concat(autocomplete_result, " single-result\" data-index=\"").concat(i, "\"> \n                    <strong>").concat(r.IATA, "</strong> - ").concat(r.name, "\n                    </br>\n                    ").concat(r.city, " , ").concat(r.country, " \n                    </div> ");
      });
      selectedIndex = -1; // Jquery - Inserts HTML code to the div of the list
      // list.html(divs.join("")).attr("data-highlight", selectedIndex);
      // Mine VanillaJS implementation of this 

      document.getElementsByClassName(autocomplete_results)[0].innerHTML = divs.join("");
    } else {
      numResults = 0; // Jquery - Removes all child nodes of the set of matched elements from the DOM.
      // list.empty();
      // Vanilla JS replacement by Konsalex (Xamos)

      emptyChildNodes(list);
    }
  }

  function onKeyDown(e) {
    switch (e.which) {
      case 38:
        // up
        selectedIndex--;

        if (selectedIndex <= -1) {
          selectedIndex = -1;
        }

        list.setAttribute("data-highlight", selectedIndex);
        break;

      case 13:
        // enter
        selectIndex(selectedIndex);
        break;

      case 9:
        // enter
        selectIndex(selectedIndex);
        e.stopPropagation();
        return;

      case 40:
        // down
        selectedIndex++;

        if (selectedIndex >= numResults) {
          selectedIndex = numResults - 1;
        }

        list.setAttribute("data-highlight", selectedIndex);
        break;

      default:
        return;
      // exit this handler for other keys
    }

    e.stopPropagation();
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
};

var _default = airport_input;
exports.default = _default;