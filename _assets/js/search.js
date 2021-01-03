(function () {
  const indexName = "log.nikhil.io";
  const algoliaClient = algoliasearch(
    "WTZA4EGO48",
    "f76aa50d1ba08951c66f726009eea753",
  );
  const algoliaIndex = algoliaClient.initIndex(indexName);
  const input = document.querySelector("#search input");
  const resultsTemplate = document.querySelector("#search-results-template")
    .innerHTML;

  function debounce(func, wait, immediate) {
    let timeout;

    return function () {
      const context = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      document.querySelector("h1 a").innerText = "searching...";

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  function searchHandler(e) {
    input.classList.add("searching");

    if (input.value.length >= 3) {
      let searchTerm = input.value;
      let tagList = null;

      algoliaIndex.search(
        { query: searchTerm },

        function searchDone(err, searchResults) {
          if (searchResults.hits.length > 0) {
            let rendered = Mustache.render(resultsTemplate, {
              results: searchResults.hits,
            });

            document.querySelector("#search-results").innerHTML = rendered;

            if (searchResults.hits.length === 1) {
              document.querySelector("h1 a").innerText = "one post";
            } else {
              document.querySelector("h1 a").innerText =
                searchResults.hits.length + " posts";
            }

            // AARGH MUSTACHE!
            tagList = document.querySelectorAll(".search-result-tag");

            for (let i = tagList.length - 1; i >= 0; i--) {
              tagList[i].href = tagList[i].href
                .replaceAll("%3Cem%3E", "")
                .replaceAll("%3C/em%3E", "");
              
              tagList[i].title = tagList[i].title
                .replaceAll("%3Cem%3E", "")
                .replaceAll("%3C/em%3E", "");
            }
          } else {
            document.querySelector("#search-results").innerHTML =
              '<div id="search-no-results">No results for "' +
              input.value +
              '"</div>';
            document.querySelector("h1 a").innerText = ":(";
          }
          input.classList.remove("searching");
        }, // searchDone
      ); // algolia.search
    } else {
      document.querySelector("#search-results").innerHTML = null;
      document.querySelector("h1 a").innerText = "log.nikhil.io";
      input.classList.remove("searching");
    }
  }

  window.onload = function () {
    const debouncedSearch = debounce(searchHandler, 100);
    input.addEventListener("input", debouncedSearch);
  };
})();
