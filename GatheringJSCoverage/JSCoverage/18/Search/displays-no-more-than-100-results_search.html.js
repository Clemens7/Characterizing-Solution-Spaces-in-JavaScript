
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

                if (pictureQuery == null)  else {
                    document.getElementById('search-info').innerText = `Searching for “${pictureQuery}”...`;
                }


                //const Results
                // search in cache for pictureQuery

                var numberPictureTotal;
                var listOfPicture;
                var pictureCacheQuery = `search-cache-${pictureQuery}`;

                if (!pictureQuery)  else if (pictureCacheQuery in localStorage)  else {
                    //object with total and all objectID with pic
                    const pictureIDRaw = await SearchAPI.getIDResultFromSearch(pictureQuery);
                    numberPictureTotal = pictureIDRaw.total;
                    SearchAPI.updateSearchInfo(numberPictureTotal, pictureQuery);

                    // API --> numberPictureTotal, listOfPicture + caching
                    if (numberPictureTotal > 0) {
                        listOfPicture = await SearchAPI.getObjectsFromSearch(pictureIDRaw.objectIDs);
                        store(pictureCacheQuery, [pictureIDRaw, listOfPicture]);
                    }
                }

                // DOM aufbau
                const pictureContainer = new PictureDocumentContainer();
                pictureContainer.clear();
                for (let picture of listOfPicture) {
                    pictureContainer.addPictureToDocument(picture);
                }
            } 
        }


    