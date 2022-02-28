
    import { ResultItem } from './result-item.js';
    import { ResultContainer } from './result-container.js';
    import * as SearchService from './search-service.js';

    document.addEventListener('DOMContentLoaded', event => {

      var cartObj = localStorage.getItem('cart');
      if (cartObj) {

        document.getElementById('cart-link').innerText = 'Cart ' + '(' + JSON.parse(cartObj).length + ')';
        
      }
      const params = (new URL(document.location)).searchParams;
      const searchQuery = params.get('q');
      document.getElementById('search').value = searchQuery;
      artWorksSearch(searchQuery);


    });



    async function artWorksSearch(searchParam) {
      const results = await SearchService.retrieveResultItem(searchParam);
      const resultContainer = new ResultContainer();
      resultContainer.clear();
      for (let item of results) {
        resultContainer.addResultItemtoContainer(item);
      }

    }

  