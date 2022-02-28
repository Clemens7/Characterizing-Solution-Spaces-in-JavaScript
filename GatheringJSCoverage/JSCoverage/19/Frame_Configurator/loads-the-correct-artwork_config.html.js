
        import * as ArtworkAPI from './artwork-api.js';
        import {ConfigImage} from './artwork-dom.js';
        import {getPrintSizes, render, calculatePrice} from "./frame.js";
        import {ArtworkCart} from './artworkCart.js';

        /* variable that contains information to store in local storage */
        const cartItem = new ArtworkCart();
        /* set default values */
        cartItem.printSize = "M";
        cartItem.frameWidth = 2;
        cartItem.frameStyle = "natural";
        cartItem.matColor = "mint";
        cartItem.matWidth = 5.5;


        /* Refactor getting cart cache */
        if ('cart' in localStorage) 

        document.addEventListener('DOMContentLoaded', event => {
            const params = (new URL(document.location)).searchParams;
            let searchQuery = params.get('objectID');
            if (!searchQuery) 
            let printSize = params.get('printSize');
            let frameStyle = params.get('frameStyle');
            let frameWidth = params.get('frameWidth');
            let matColor = params.get('matColor');
            let matWidth = params.get('matWidth');
            setConfigParams(printSize, frameStyle, frameWidth, matColor, matWidth);
            artworkSearch(searchQuery, printSize, frameWidth, frameStyle, matColor, matWidth);

            /* setting id of item to store in local storage */
            cartItem.objectID = searchQuery;
        });

        function setConfigParams(printSize, frameStyle, frameWidth, matColor, matWidth) {
            if (printSize != null) 
            if (matColor != null) 
            if (frameStyle != null) 
            if (frameWidth != null )  else if (Number(frameWidth) > 50)  else if (Number(frameWidth) < 20) {
                document.getElementsByName("frameWidth")[0].value = 2;
                document.getElementsByName("frameWidthR")[0].value = 2;
            }
            if (matWidth != null )  else if (Number(matWidth) > 100)  else if (Number(matWidth) < 0) 

        }

        async function artworkSearch(artwork, printSize, frameWidth, frameStyle, matColor, matWidth) {
            let configImage = new ConfigImage();
            configImage.clear();
            const data = await ArtworkAPI.retrieveObjectErrorHandling(artwork);
            configImage.addArtworkFrame(data, printSize, frameWidth, frameStyle, matColor, matWidth);

        }

        const form = document.getElementById("config-form");
        form.addEventListener('change', );

        /* save configured artwork in local storage cart */
        form.onsubmit = ;

        
    