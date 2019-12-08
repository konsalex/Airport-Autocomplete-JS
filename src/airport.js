import Fuse from 'fuse.js';

// Simulates Jquery .empty() behavior but a little bit more Vanilla
function emptyChildNodes(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

// Check if arrays are equal
function arraysEqual(a, b) {
  /*
        Array-aware equality checker:
        Returns whether arguments a and b are == to each other;
        however if they are equal-lengthed arrays, returns whether their 
        elements are pairwise == to each other recursively under this
        definition.
    */
  if (a instanceof Array && b instanceof Array) {
    if (a.length != b.length)
      // assert same length
      return false;
    for (
      var i = 0;
      i < a.length;
      i++ // assert each element equal
    )
      if (!arraysEqual(a[i], b[i])) return false;
    return true;
  } else {
    return a == b; // if not both arrays, should be the same
  }
}

const airport_input = function(id, data, options) {
  const listOfResults = [];

  const fuse = new Fuse(data, options.fuse_options);

  const ac = document.getElementById(id);
  ac.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  ac.addEventListener('keyup', search);
  ac.addEventListener('focus', search);
  ac.addEventListener('keydown', onKeyDown);

  const autocomplete_wrapper = ['autocomplete-wrapper', id].join(' ');
  const autocomplete_results = ['autocomplete-results', id].join(' ');
  const autocomplete_result = ['autocomplete-result', id].join(' ');

  var wrap = document.createElement('div');
  wrap.className = autocomplete_wrapper;
  ac.parentNode.insertBefore(wrap, ac);
  wrap.appendChild(ac);

  var list = document.createElement('div');
  list.className = autocomplete_results;
  wrap.appendChild(list);

  var list = document.getElementsByClassName(autocomplete_results)[0];
  list.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    selectIndexFunc(this.getAttribute('data-highlight'));
  });

  list.addEventListener('mouseover', function(event) {
    var index = event.target.getAttribute('data-index');
    list.setAttribute('data-highlight', index);
  });

  function clearResults() {
    results = [];
    numResults = 0;
    emptyChildNodes(list);
  }

  function selectIndexFunc(index) {
    if (results.length >= parseInt(index) + 1) {
      ac.value = results[index].IATA + '  ' + results[index].name;
      ac.setAttribute('data-lon', results[index].lon);
      ac.setAttribute('data-lat', results[index].lat);
      ac.setAttribute('data-iata', results[index].IATA);
      clearResults();
    }
  }

  let results = [];
  let numResults = 0;
  let selectedIndex = -1;

  function search(e) {
    // 38 code = up Arrow
    // 13 code = enter
    // 40 code = down arrow

    // Add global event listener for click
    // If the click is not a result it will clear all the suggestions
    document.addEventListener('click', function globalClickListener(evnt) {
      clearResults();
      document.removeEventListener('click', globalClickListener);
    });

    if (e.which === 38 || e.which === 13 || e.which === 40) {
      return;
    }

    // Check if user have written anything
    if (ac.value.length > 0) {
      // Splice the results and
      results = fuse.search(ac.value).slice(0, options.max_returned_results);

      if (arraysEqual(results, listOfResults)) return;

      numResults = results.length;

      const divs = results.map((r, i) => {
        const result = options.formatting
          .replace(
            new RegExp('\\$\\(unique-result\\)', 'g'),
            autocomplete_result
          )
          .replace(new RegExp('\\$\\(i\\)', 'g'), i)
          .replace(new RegExp('\\$\\(name\\)', 'g'), r.name)
          .replace(new RegExp('\\$\\(IATA\\)', 'g'), r.IATA)
          .replace(new RegExp('\\$\\(city\\)', 'g'), r.city)
          .replace(new RegExp('\\$\\(country\\)', 'g'), r.country);

        return result;
      });

      selectedIndex = -1;
      // Jquery - Inserts HTML code to the div of the list
      // list.html(divs.join("")).attr("data-highlight", selectedIndex);

      // Mine VanillaJS implementation of this
      document.getElementsByClassName(
        autocomplete_results
      )[0].innerHTML = divs.join('');
    } else {
      numResults = 0;
      // Jquery - Removes all child nodes of
      // the set of matched elements from the DOM.
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
        list.setAttribute('data-highlight', selectedIndex);
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

        list.setAttribute('data-highlight', selectedIndex);
        break;

      default:
        return; // exit this handler for other keys
    }
    e.stopPropagation();
    e.preventDefault(); // prevent the default action (scroll / move caret)
  }
};
export default airport_input;
