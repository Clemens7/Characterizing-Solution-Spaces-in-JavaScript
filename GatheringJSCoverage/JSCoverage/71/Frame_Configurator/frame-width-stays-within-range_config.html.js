

        import {calculatePrice} from "./frame.js";
        import {updateWidth} from "./config.js";
        import {render} from "./frame.js";
        import {addToCart} from "./cart.js";
        import {loadCartSize} from "./cart.js";
        import {Label} from "./label.js";

        const printSizes = document.getElementsByName('printSize');
        const frameOutput = document.getElementById("frameWidth");
        const frameSlider = document.getElementById("frameWidthR");
        const frameStyles = document.getElementsByName('frameStyle');
        const matOutput = document.getElementById("matWidth");
        const matSlider = document.getElementById("matWidthR");
        const matColors = document.getElementsByName('matColor');
        const priceField = document.getElementById('price');

        const configurator = document.getElementsByClassName("configurator")[0];
        const form = document.getElementById("config-form");
        const cart = document.getElementById('cart-link');

        const MET_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

        let objectID;
        let printSize;
        let frameStyle;
        let frameWidth;
        let matColor;
        let matWidth;

        let image = document.getElementById('preview-image');
        let preview = document.getElementById('preview-container');

        //action when document is loaded
        document.addEventListener('DOMContentLoaded', event => {
            // initEventListeners();
            initialize();
            matOutput.value = matSlider.value;
            frameOutput.value = frameSlider.value;
        });

        function initialize() {
            const params = (new URL(document.location)).searchParams;
            objectID = params.get('objectID');
            if (objectID == null || objectID === 0 || objectID > 1000000) 
            printSize = params.get('printSize');
            frameStyle = params.get('frameStyle');
            frameWidth = params.get('frameWidth');
            matWidth = params.get('matWidth');
            matColor = params.get('matColor');

            updateSize();
            updateFrame(frameWidth);
            updateStyle();
            updateMat(matWidth);
            imageSearch(objectID);

            updatePriceField();

            updateColor();
            loadCartSize();
        }

        async function imageSearch(objectID) {
            let image = await getCachedData(MET_URL + objectID);
            if (image === false) {
                let cacheStorage = await caches.open("artmart-cart");
                try {
                    await cacheStorage.add(MET_URL + objectID)
                } 
                image = await getCachedData(MET_URL + objectID);
            }
            if (image !== false) {
                createImage(new Label(image.title, image.artistDisplayName, image.objectDate, image.primaryImageSmall, "ObjectID found"));
            }
        }

        async function getCachedData(itemID) {
            const cacheStorage = await caches.open("artmart-cart");
            const cashedResponse = await cacheStorage.match(itemID);

            if (!cashedResponse || !cashedResponse.ok) {
                return false;
            }
            return await cashedResponse.json();
        }

        function createImage(label) {
            image.src = label.src;
            console.log("Src: " + image.src);
            image.id = "preview-image";
            let labelElement = document.createElement('div');
            labelElement.className = "museum-label";
            labelElement.id = "image-label";
            labelElement.innerText = label.artist + " " + label.title + " (" + label.date + ") ";
            preview.className = "preview";
            preview.id = "preview-container";
            preview.appendChild(image);
            configurator.insertBefore(preview, configurator.childNodes[0]);

            setTimeout(function () {
                preview.appendChild(labelElement);
                render(image, preview, printSize, frameStyle, frameWidth, matColor, matWidth);
            }, 0);
        }

        //     function initEventListeners() {

        //change Output value when Slider was moved
        matSlider.oninput = ;
        frameSlider.oninput = ;


        //change Slider value when Output was changed
        matOutput.addEventListener('change', );
        frameOutput.addEventListener('change', function () {
            updateFrame(this.value * 10);
            render(image, preview, printSize, frameStyle, frameWidth, matColor, matWidth);
            updatePriceField();
        });


        /*
   workaround Race Condition
    */
        //update printSize when clicked
        for (let element of printSizes) {
            element.addEventListener('change', );
        }


        /*
   workaround Race Condition
    */
        //update frameStyle when clicked
        for (let element of frameStyles) {
            element.addEventListener('change', );
        }

        /*
   workaround Race Condition
    */
        //update matColor when clicked
        for (let element of matColors) {
            element.addEventListener('change', );
        }

        form.addEventListener('submit', );

        //}
        function updateSize() {
            let id = "";
            switch (printSize) {
                
                
                
                default:
                    id = "print-size-s";
                    printSize = "S";
            }
            document.getElementById(id).checked = true;
        }

        function updateFrame(inputWidth) {
            frameWidth = updateWidth(inputWidth, 20, 50);
            frameSlider.value = (frameWidth / 10);
            frameOutput.value = (frameWidth / 10);
        }

        function updateStyle() {
            let id = "";

            switch (frameStyle) {
                
                
                
                
                default:
                    id = "frame-style-classic";
                    frameStyle = "classic";
            }
            document.getElementById(id).checked = true;
        }

        function updateMat(inputWidth) {
            matWidth = updateWidth(inputWidth, 0, 100);
            matSlider.value = matWidth / 10;
            matOutput.value = matWidth / 10;
        }

        function updateColor() {
            let id = "";
            switch (matColor) {
                
                
                
                
                
                default:
                    id = "mat-color-mint";
                    matColor = "mint";
            }
            document.getElementById(id).checked = true;
        }

        function updatePriceField() {
            let x = calculatePrice(printSize, frameStyle, frameWidth, matWidth);
            priceField.innerText = "€ " + x.toFixed(2);
        }


    