

        const urlPrefixWithSearchWord = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=`;
        const form = document.querySelector('#search-section form');


        function processRequest(value) {
            let artWorksData;

            if (value == null) {
                artWorksData = retrieveHighlights();
            }

                artWorksData.then();
        }


        form.addEventListener('submit', );

        document.addEventListener('DOMContentLoaded', event => {
            if('cart' in localStorage) 
            const params = (new URL(document.location)).searchParams;
            const artQuery = params.get('q');
            document.getElementById('search').value = artQuery;
            processRequest(artQuery);
        });

        async function retrieveHighlights() {
            let rawJson;

            try {
                const jsonResponse = await fetch('./highlights.json');}

        

        

        

        
    