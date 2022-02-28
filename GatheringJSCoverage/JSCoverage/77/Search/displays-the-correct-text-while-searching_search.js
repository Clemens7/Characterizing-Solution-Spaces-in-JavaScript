    import { Picture } from './datastructures.js';
    import { ResultDocumentContainer } from './search-result-dom.js';
    import * as SearchAPI from './search-api.js';
    import { localPictures } from './artmart-cache.js ';
    import { setCartCount } from './cart-number.js';

    localPictures.init();

    /**
     * searches for all artwork with the serach parameter
     * also represents them on the screen
     * 
     * @param  parameter the search terms
     */
    async function pictureSearch(parameter) {
        const resultContainer = new ResultDocumentContainer();
        const searchTitle = document.getElementById('search-info');
        resultContainer.clear();

        searchTitle.innerHTML = `Searching for “${parameter}”...`;

        const url = SearchAPI.api_url_search(parameter);
        let pictures = [];
        try {
            const response = await fetch(url);
            const rawData = await response.json();
            const responsePicturesIDs = await rawData.objectIDs;

            if (!responsePicturesIDs) 

            if (responsePicturesIDs.length == 1)  else {
                searchTitle.innerHTML = `Found ${responsePicturesIDs.length} artworks for “${parameter}”`;
            }

            for (let i = 0; i < 100 && i < responsePicturesIDs.length; i++) {
                let picture = localPictures.retrieve(responsePicturesIDs[i])[0];
                if (typeof picture == 'undefined') {
                    SearchAPI.retrieve_id(responsePicturesIDs[i]).then(picture => {
                        pictures.push(picture);
                        resultContainer.addResultToDocument(picture);
                        //store retrieved pictures in local storage
                        localPictures.store([picture]);
                    });
                }
            }
        } 
    }

    /**
     * retrieves all highlights and represents them on the screen
     */
    


    // when the site is loaded
    document.addEventListener('DOMContentLoaded', event => {
        const param = (new URL(document.location)).searchParams;
        const searchQuery = param.get('q');

        setCartCount();

        if (!searchQuery) 
        document.getElementById('search').value = searchQuery;
        pictureSearch(searchQuery);
    })

    // when the form is submited
    const form = document.querySelector('.search-form');
    form.addEventListener('submit', 