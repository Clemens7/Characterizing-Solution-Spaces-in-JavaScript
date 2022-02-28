
    import * as search from './search.js';
    import { searchObjects } from "./artworkApi.js";
    import { renderCart } from "./cart.js";

    renderCart();

    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');

    if (q !== null && q !== '') {
      document.getElementById("search-info").innerHTML = `Searching for “${q}”...`;
      let request = searchObjects(q);
      request.then();
    }

  