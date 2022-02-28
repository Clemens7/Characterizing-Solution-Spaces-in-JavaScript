import * as SearchAPI from './search-api.js';
import { PreviewContainer } from './config-preview-dom.js';
import * as Frame from '../frame.js';
import { Artwork } from './datastructures.js';
import { CART, localPictures } from "./artmart-cache.js";
import { setCartCount } from './cart-number.js';

//sinloser commit
(function() {
    // set default parameters (width in Millimeters):
    const printSize = "M";
    const frameStyle = "natural";
    const frameWidth = 40;
    const matColor = "wine";
    const matWidth = 55;

    let artwork = new Artwork(null, printSize, frameStyle, frameWidth, matColor, matWidth);

    getArtworkConfigFromUrl(artwork);
    setCartCount();
    setEventListenersForForm(artwork);
    setEventListenersForInputs(artwork);
    loadImage(artwork);
})();


/**
 * Gets the Query Parameter and sets the corrosponding values in artwork.
 * If no object id is specified => redirect to search-page
 *
 * @param artwork Object of the params that will be set. (can contain default values)
 */
function getArtworkConfigFromUrl(artwork) {
    // -- load query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const objectID = urlParams.get("objectID");
    const printSize = urlParams.get("printSize");
    const frameStyle = urlParams.get("frameStyle");
    const frameWidth = urlParams.get("frameWidth");
    const matColor = urlParams.get("matColor");
    const matWidth = urlParams.get("matWidth");

    // -- redirect if no objectID
    if (objectID === null) 

    // -- set image-paremeters
    artwork.objectID = objectID;

    if (printSize !== null) 
    if (frameStyle !== null) 
    if (frameWidth !== null) 
    if (matColor !== null) 
    if (matWidth !== null) 

    // -- update Input-Elements (they may have a different value due to the query params)
    setInputValues(artwork);
}


/**
 * Loads the image from the objectID.
 * Then renders the image with the artwork-parameters, sets the print sizes, sets the price, sets the total-size
 * if nothing with the objectId exists => redirect to search
 *
 * @param artwork The params of the artwork (object)
 */
async function loadImage(artwork) {
    // -- retrieve image 
    localPictures.init();
    let picture = localPictures.retrieve(artwork.objectID * 1)[0];

    if (typeof picture == 'undefined') {
        picture = await SearchAPI.retrieve_id(artwork.objectID);
        localPictures.store([picture]);
    }

    // -- redirect if no image can be found
    if (typeof picture.id == 'undefined') 

    // -- load image into html
    let previewContainer = new PreviewContainer("preview-container");
    previewContainer.clear();
    previewContainer.set(picture);

    // -- when image is loaded: render image, set print-sizes, set price, set total-size, 
    const img = document.getElementById("preview-image");
    const imgParent = document.getElementById("preview-container");

    img.addEventListener("load", () => {
        Frame.render(img, imgParent, artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matColor, artwork.matWidth);
        setPrintSizes(img);
        setPrice(artwork);
        setTotalSizes(img, artwork);
    });
}


/**
 * Sets the Input-Elements according to the value in artwork.
 *
 * @param artwork The params of the artwork (object)
 */
function setInputValues(artwork) {
    // -- print size
    const printSizeS = document.getElementById("print-size-s");
    const printSizeM = document.getElementById("print-size-m");
    const printSizeL = document.getElementById("print-size-l");

    switch (artwork.printSize) {
        
        case "M":
            printSizeM.checked = true;
            break;
        
    }

    // -- frame width
    const frameWidthTextbox = document.getElementById("frame-width-textbox");
    const frameWidthRange = document.getElementById("frame-width-range");

    // divide by 10 to convert mm in cm
    frameWidthTextbox.value = artwork.frameWidth / 10;
    frameWidthRange.value = artwork.frameWidth / 10;

    // -- frame style
    const frameStyleClassic = document.getElementById("frame-style-classic");
    const frameStyleNatural = document.getElementById("frame-style-natural");
    const frameStyleShabby = document.getElementById("frame-style-shabby");
    const frameStyleElegant = document.getElementById("frame-style-elegant");

    switch (artwork.frameStyle) {
        
        case "natural":
            frameStyleNatural.checked = true;
            break;
        
        
    }

    // -- mat width
    const matWidthTextbox = document.getElementById("mat-width-textbox");
    const matWidthRange = document.getElementById("mat-width-range");

    // divide by 10 to convert mm in cm
    matWidthTextbox.value = artwork.matWidth / 10;
    matWidthRange.value = artwork.matWidth / 10;

    // -- mat color
    const matColorIvory = document.getElementById("mat-color-ivory");
    const matColorMint = document.getElementById("mat-color-mint");
    const matColorWine = document.getElementById("mat-color-wine");
    const matColorIndigo = document.getElementById("mat-color-indigo");
    const matColorCoal = document.getElementById("mat-color-coal");

    switch (artwork.matColor) {
        
        
        case "wine":
            matColorWine.checked = true;
            break;
        
        
    }
}


/**
 * Sets the EventListener to the form element
 *
 * @param artwork The params of the artwork (object)
 */
function setEventListenersForForm(artwork) {
    const form = document.getElementById("config-form");

    form.addEventListener("submit", )
}


/**
 * Sets the EventListener to all input elements.
 *
 * @param artwork The params of the artwork (object)
 */
function setEventListenersForInputs(artwork) {
    // -- print size
    let printSizeRadioButtons = document.getElementsByName("printSize");
    for (let i = 0; i < printSizeRadioButtons.length; i++) {
        printSizeRadioButtons[i].addEventListener("change", );
    }


    // -- frame width
    const frameWidthTextbox = document.getElementById("frame-width-textbox");
    const frameWidthRange = document.getElementById("frame-width-range");

    frameWidthTextbox.addEventListener("change", );
    frameWidthRange.addEventListener("input", );


    // -- frame style
    let frameStyleRadioButtons = document.getElementsByName("frameStyle");
    frameStyleRadioButtons.forEach(item => {
        item.addEventListener("change", )
    });


    // -- mat width
    const matWidthTextbox = document.getElementById("mat-width-textbox");
    const matWidthRange = document.getElementById("mat-width-range");

    matWidthTextbox.addEventListener("change", );
    matWidthRange.addEventListener("input", );


    // -- mat color
    let matColorRadioButtons = document.getElementsByName("matColor");
    matColorRadioButtons.forEach(item => {
        item.addEventListener("change", )
    });


    // -- updated the rest of the dom
    
}


/**
 * Sets the Print-Sizes in the HTML
 *
 * @param img An Image object.
 */
function setPrintSizes(img) {
    const printSizes = Frame.getPrintSizes(img);

    const labelS = document.getElementById("print-size-s-label");
    const labelM = document.getElementById("print-size-m-label");
    const labelL = document.getElementById("print-size-l-label");

    setPrintSizesHTML(labelS, "Small", printSizes.S[0], printSizes.S[1]);
    setPrintSizesHTML(labelM, "Medium", printSizes.M[0], printSizes.M[1]);
    setPrintSizesHTML(labelL, "Large", printSizes.L[0], printSizes.L[1]);

    function setPrintSizesHTML(element, name, width, height) {
        element.innerHTML = `${name}<br>${width / 10} × ${height / 10} cm`;
    }
}


/**
 * Sets the Total-Size in the HTML
 *
 * @param img An Image object.
 * @param artwork The params of the artwork (object)
 */
function setTotalSizes(img, artwork) {
    const allPrintSizes = Frame.getPrintSizes(img);

    let printSize;
    switch (artwork.printSize) {
        
        case "M":
            printSize = allPrintSizes.M;
            break;
        
    }

    const totalWidth = round(printSize[0] + artwork.matWidth * 2 + artwork.frameWidth * 2);
    const totalHeight = round(printSize[1] + artwork.matWidth * 2 + artwork.frameWidth * 2);

    const totalSizeEl = document.getElementById("total-size");
    totalSizeEl.innerText = `${totalWidth / 10} × ${totalHeight / 10} cm`;


    function round(number) {
        return Math.round((number + Number.EPSILON) * 100) / 100;
    }
}


/**
 * Sets the price according to the artwork
 *
 * @param artwork The params of the artwork (object)
 */
function setPrice(artwork) {
    let price = Frame.calculatePrice(artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matWidth);
    document.getElementById("price").innerHTML = "€ " + price.toFixed(2);
}


/**
 * Returns the num.
 * If num is out of bound, it will be set to min/max.
 *
 * @param {Number} num
 * @param {Number} min
 * @param {Number} max
 * @returns {Number}
 */



/**
 * Retruns num, but rounded to 1 decimal
 * @param {Number} num
 * @returns {Number}
 */
