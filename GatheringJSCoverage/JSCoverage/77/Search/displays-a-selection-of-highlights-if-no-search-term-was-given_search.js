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
    

    /**
     * retrieves all highlights and represents them on the screen
     */
    async function pictureHighlights() {
        const resultContainer = new ResultDocumentContainer();
        resultContainer.clear();

        const url = './highlights.json';
        let pictures = [];
        try {
            const response = await fetch(url);
            const rawData = await response.json();
            const responsePicturesIDs = await rawData.highlights;

            if (!responsePicturesIDs)  else {
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
    }


    // when the site is loaded
    document.addEventListener('DOMContentLoaded', event => {
        const param = (new URL(document.location)).searchParams;
        const searchQuery = param.get('q');

        setCartCount();

        if (!searchQuery) {
            pictureHighlights();
            return;
        }})

    // when the form is submited
    const form = document.querySelector('.search-form');
    form.addEventListener('submit', 