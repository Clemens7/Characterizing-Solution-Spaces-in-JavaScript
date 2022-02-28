
        import * as SearchAPI from './search.js';
        import {retrieve, store} from './search-cache.js';
        import {PictureDocumentContainer} from './search-dom.js';
        import {setCartItemsInHeader} from './header-cart.js';

        document.addEventListener('DOMContentLoaded', event => {

            setCartItemsInHeader();
            //parameter
            const params = (new URL(document.location)).searchParams;
            const pictureQuery = params.get('q');

            try {
                pictureSearch(pictureQuery);
            } 

        });

        //when we click in input the red boarder disappears
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('click', );

        const form = document.getElementById('form-search');

        //search call
        async function pictureSearch(pictureQuery) {
            try {

                if (pictureQuery == null) {
                    //TODO soll ma das stattdessen posten haha?
                    document.getElementById('search-info').innerText = `Selecting some highlights for you`;
                }


                //const Results
                // search in cache for pictureQuery

                var numberPictureTotal;
                var listOfPicture;
                var pictureCacheQuery = `search-cache-${pictureQuery}`;

                if (!pictureQuery) {
                    //TODO hier leider doppelter code (noch)
                    if ('highlights' in localStorage)  else {
                        const finishedObject = await SearchAPI.getHighlightImages();}


    