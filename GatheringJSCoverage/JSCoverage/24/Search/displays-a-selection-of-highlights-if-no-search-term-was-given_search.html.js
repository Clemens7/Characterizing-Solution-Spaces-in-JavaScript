
    import * as search from './search.js';
    import { searchObjects } from "./artworkApi.js";
    import { renderCart } from "./cart.js";

    renderCart();

    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');

    if (q !== null ) else{
      fetch('./highlights.json')
      .then(function (ids) {
        return ids.json();
      }).then(function(json) {
        search.renderResults(json.highlights);
      });
    }

  