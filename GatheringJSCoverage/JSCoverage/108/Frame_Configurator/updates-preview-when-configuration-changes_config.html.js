
        import * as frame from "./frame.js";
        import * as frame_functions from "./frame_functions.js";
        import * as api from "./metropolitan_api.js";
        import {Cart, CartItem} from "./cart.js";
        import * as DOM from './dom_helper.js';

        // TODO: Reihenfolge der Methodenaufrufe checken, auf Laden von Bild warten

        var domData = {};
        let item = new CartItem(null, null, null, null, null, null);

        function updateDomData() {
            const printSizes = document.getElementsByName("printSize");
            for (var i = 0; i < printSizes.length; i++) {
                if (printSizes[i].checked) {
                    domData.printSize = printSizes[i].value;
                    item.printSize = printSizes[i].value;
                    updatePrice();
                }
            }

            domData.frameWidth = document.getElementById("frame-width-number").value * 10;

            const frameStyles = document.getElementsByName("frameStyle");
            for (var i = 0; i < frameStyles.length; i++) {
                if (frameStyles[i].checked) {
                    domData.frameStyle = frameStyles[i].value;
                    item.frameStyle = frameStyles[i].value;
                    updatePrice();
                }
            }

            domData.matWidth = document.getElementById("mat-width-number").value * 10;

            const matColors = document.getElementsByName("matColor");
            for (var i = 0; i < matColors.length; i++) {
                if (matColors[i].checked) {
                    domData.matColor = matColors[i].value;
                    item.matColor = matColors[i].value;
                }
            }
        }

        function setDefaultValues(params) {
            let printSize = params.printSize;
            let frameStyle = params.frameStyle;
            let frameWidth = params.frameWidth;
            let matColor = params.matColor;
            let matWidth = params.matWidth;

            if (printSize)  else {
                frame_functions.setPrintSize('S');
                item.printSize = 'S';
            }

            if (frameStyle)  else {
                frame_functions.setFrameStyle('classic');
                item.frameStyle = 'classic';
            }

            if (matColor)  else {
                frame_functions.setMatColor('ivory');
                item.matColor = 'ivory';
            }

            if (frameWidth)  else {
                frame_functions.setFrameWidth(4);
                item.frameWidth = 40;
            }

            if (matWidth)  else {
                frame_functions.setMatWidth(4);
                item.matWidth = 40;
            }

            updatePrice();
            updateSize();
        }

        // Make frame width number input and frame width number change on input
        let matWidthNumberInput = document.getElementById("mat-width-number");
        let matWidthRangeInput = document.getElementById("mat-width-range");

        matWidthNumberInput.onchange = function () {
            frame_functions.setMatWidth(matWidthNumberInput.value);
            item.matWidth = matWidthNumberInput.value * 10;
            updatePrice();
            updateSize();
        };

        matWidthRangeInput.onchange = ;

        // Make frame width number input and frame width number change on input
        let frameWidthNumberInput = document.getElementById("frame-width-number");
        let frameWidthRangeInput = document.getElementById("frame-width-range");

        frameWidthNumberInput.onchange = function () {
            frame_functions.setFrameWidth(frameWidthNumberInput.value);
            item.frameWidth = frameWidthNumberInput.value * 10;
            updatePrice();
            updateSize();
        };

        frameWidthRangeInput.onchange = ;

        function updatePrice() {
            document.getElementById("price").innerText = `€ ${frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2)}`
        }

        function updateSize() {
            let image = new Image();
            image.src = domData.image;
            let sizes = frame.getPrintSizes(image);

            let width, height;
            switch (item.printSize) {
                case 'S':
                    width = sizes.S[0];
                    height = sizes.S[1];
                    break;
                case 'M':
                    width = sizes.M[0];
                    height = sizes.M[1];
                    break;
                case 'L':
                    width = sizes.L[0];
                    height = sizes.L[1];
            }

            document.getElementById("total-size").innerText = `${width + Number((item.matWidth/10).toFixed(1)) + Number((item.frameWidth/10).toFixed(1))} x ${height + Number((item.matWidth/10).toFixed(1)) + Number((item.frameWidth/10).toFixed(1))} cm`;
        }

        function refreshPage() {
            console.log("Refreshing page.");
            updateDomData();
            frame_functions.setImage(domData);
        }

        function setUpRefreshHandler() {
            var elements = document.getElementsByTagName("input");

            for (let i = 0; i < elements.length; i++) {
                elements[i].addEventListener('change', refreshPage);
            }
        }

        loadContent();

        async function loadContent() {
            const params = (new URL(document.location)).searchParams;
            const paramsJson = Object.fromEntries(params);
            setDefaultValues(paramsJson);

            let image_object = await api.get_object_by_id(paramsJson.objectID);
            // Redirect to search if invalid image
            if (!image_object.id) 

            let artist = DOM.textElement('span', image_object.artist, 'artist');
            let name = DOM.textElement('span', `${image_object.name}, `, 'title');
            let date = DOM.textElement('span', image_object.date, 'date');

            let label = document.getElementById("image-label");
            label.appendChild(artist);
            label.appendChild(name);
            label.appendChild(date);

            domData.image = image_object.image;
            let image = new Image();
            image.src = image_object.image;

            item.objectID = image_object.id;

            frame_functions.setPrintMeasurements(image);
            updateSize();
            refreshPage();
            setUpRefreshHandler();
        }

        document.getElementById("config-form").addEventListener('submit', );

        // CART NUMBER OF ITEMS
        document.getElementById("cart-link").innerText = `Cart ${Cart.numberOfItems() > 0
            
            : ""}`;
    