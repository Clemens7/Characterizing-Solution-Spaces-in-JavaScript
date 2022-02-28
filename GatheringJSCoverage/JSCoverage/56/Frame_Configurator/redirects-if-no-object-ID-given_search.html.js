
        import * as Search from './search.js';
        import * as Config from './config.js';

        async function artSearch(searchToken) {
            const arts = await Search.retrieve(searchToken);) }

        document.addEventListener('DOMContentLoaded', async event => {
            const params = (new URL(document.location)).searchParams;
            const searchQuery = params.get('q');
            if (!searchQuery) {
                await artSearch(/*undefined*/);});
        document.addEventListener('DOMContentLoaded', Config.updateCartItems());

        
         /*document.getElementsByClassName('search-form')[0].addEventListener('submit', event => {
             const searchInput = document.getElementById('search');
             if (!searchInput.value) {
                 searchInput.style.border = "1px solid red";
                 event.preventDefault();
             }
         });*/
    