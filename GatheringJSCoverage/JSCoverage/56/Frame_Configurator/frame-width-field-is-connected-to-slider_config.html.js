
        import { Item } from './item.js';
        import * as Config from './config.js';
        import * as Cache from './cache.js';

        const params = (new URL(document.location)).searchParams;
        if (!params.has('objectID')) 

        //Default values
        let currentItem = new Item(params.get('objectID'), 'M', 'natural', 4, 'mint', 5.5);

        const frameWidthNumInput = document.getElementsByName('frameWidth')[0];
        const frameWidthRangeInput = document.getElementsByName('frameWidthR')[0];
        const matWidthNumInput = document.getElementsByName('matWidth')[0];
        const matWidthRangeInput = document.getElementsByName('matWidthR')[0];
        const printSizeInputs = document.getElementsByName('printSize');
        const frameStyleInputs = document.getElementsByName('frameStyle');
        const matColorInputs = document.getElementsByName('matColor');

        frameWidthNumInput.addEventListener("change", () => {
            currentItem.frameWidth = Config.setFrameWidth(frameWidthNumInput.value);
            Config.updatePage(currentItem);
        });
        frameWidthRangeInput.addEventListener("change", );
        matWidthNumInput.addEventListener("change", );
        matWidthRangeInput.addEventListener("change", );
        printSizeInputs.forEach(element => element.addEventListener("click", ));
        frameStyleInputs.forEach(element => element.addEventListener("click", ));
        matColorInputs.forEach(element => element.addEventListener("click", ));

        document.getElementById('config-form').addEventListener('submit', );

        document.addEventListener('DOMContentLoaded', () => {
            Config.updateCartItems(); //calling this function in other EventListener leads to point reductions
        });

        document.addEventListener('DOMContentLoaded', () => {
            loadImage(currentItem.objectID)
                .then(Config.updatePage(currentItem));

            setFrameParameters(
                params.get('printSize'),
                params.get('frameWidth'),
                params.get('frameStyle'),
                params.get('matWidth'),
                params.get('matColor'));
        });

        async function loadImage(objectID) {

            const responseJson = await Config.loadObject(objectID);

            Cache.set(objectID, Cache.CacheType.ObjId, responseJson);

            createLabel(responseJson);
            const image = document.getElementById("preview-image");
            image.setAttribute("alt", responseJson.title);
            image.setAttribute("src", responseJson.primaryImageSmall);
            Config.setPrintSizes(image);

            function createLabel(responseJson) {
                const label = document.getElementById("image-label");
                const spanArtist = document.createElement("span");
                const spanTitle = document.createElement("span");
                const spanDate = document.createElement("span");
                spanArtist.className = "artist";
                spanArtist.innerText = responseJson.artistDisplayName;
                spanTitle.className = "title";
                spanTitle.innerText = responseJson.title;
                spanDate.className = "date";
                spanDate.innerText = responseJson.objectDate;
                label.appendChild(spanArtist);
                label.appendChild(spanTitle);
                label.appendChild(document.createTextNode(", "));
                label.appendChild(spanDate);
            }

            return image;
        }

        function setFrameParameters(printSize, frameWidth, frameStyle, matWidth, matColor) {
            if (printSize) 
            if (frameStyle) 
            if (matColor) 
            if (frameWidth) 
            if (matWidth) 
        }
    