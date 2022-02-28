import {calculatePrice} from "./frame.js";
import {CartItem} from "./cartItem.js";
import {render} from "./frame.js";

export function displayNoInCart() {
    let items = [];
    if(localStorage.getItem("cart") !== null) 
    if (items.length > 0) 
}

displayNoInCart();

const params = new URLSearchParams(window.location.search);
document.getElementById("buy-button").addEventListener("click", addToCart);
document.getElementById("frameWidth-display").addEventListener("change", frameW_input_write_slider);
document.getElementById("frameWidth-slider").addEventListener("input", frameW_slider_write_input);
document.getElementById("matWidth-display").addEventListener("change", matW_input_write_slider);
document.getElementById("matWidth-slider").addEventListener("input", matW_slider_write_input);
document.getElementById("frameWidth-display").addEventListener("change", calculatePriceConfig);
document.getElementById("frameWidth-slider").addEventListener("input", calculatePriceConfig);
document.getElementById("matWidth-display").addEventListener("change", calculatePriceConfig);
document.getElementById("matWidth-slider").addEventListener("input", calculatePriceConfig);
document.getElementById("print-size-s").addEventListener("click", calculatePriceConfig);
document.getElementById("print-size-m").addEventListener("click", calculatePriceConfig);
document.getElementById("print-size-l").addEventListener("click", calculatePriceConfig);
document.getElementById("frame-style-elegant").addEventListener("click", calculatePriceConfig);
document.getElementById("frame-style-classic").addEventListener("click", calculatePriceConfig);
document.getElementById("frame-style-shabby").addEventListener("click", calculatePriceConfig);
document.getElementById("frame-style-natural").addEventListener("click", calculatePriceConfig);
document.getElementById("frameWidth-display").addEventListener("change", renderPreview);
document.getElementById("frameWidth-slider").addEventListener("input", renderPreview);
document.getElementById("matWidth-display").addEventListener("change", renderPreview);
document.getElementById("matWidth-slider").addEventListener("input", renderPreview);
document.getElementById("print-size-s").addEventListener("click", renderPreview);
document.getElementById("print-size-m").addEventListener("click", renderPreview);
document.getElementById("print-size-l").addEventListener("click", renderPreview);
document.getElementById("frame-style-elegant").addEventListener("click", renderPreview);
document.getElementById("frame-style-classic").addEventListener("click", renderPreview);
document.getElementById("frame-style-shabby").addEventListener("click", renderPreview);
document.getElementById("frame-style-natural").addEventListener("click", renderPreview);
document.getElementById("mat-color-coal").addEventListener("click", renderPreview);
document.getElementById("mat-color-ivory").addEventListener("click", renderPreview);
document.getElementById("mat-color-wine").addEventListener("click", renderPreview);
document.getElementById("mat-color-mint").addEventListener("click", renderPreview);
document.getElementById("mat-color-indigo").addEventListener("click", renderPreview);
document.getElementById("preview-image").addEventListener("load", renderPreview);



/**
 * Checks if the id given via the objectID query parameter is a valid id in the metrop. museum api. If the query parameter
 * is not given or the given id cannot be found (not a 2xx code), the user is redirected to the search page.
 * If it can be found the picture and metadata of the artwork are loaded and displayed.
 */
const objectID = params.get("objectID");
if (objectID === null) 

let cached = localStorage.getItem("object" + objectID);
if (cached === undefined || cached ===null) {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID)
        .then(response => {
            if (!response.ok)  else response.json().then(
                data => {
                    if (data.displayName !== null) document.getElementById("artwork-author").innerHTML = data.artistDisplayName;
                    if (data.title !== null) document.getElementById("artwork-name").innerHTML = data.title;
                    if (data.objectDate != null) document.getElementById("artwork-date").innerHTML = data.objectDate;
                    if (data["primaryImageSmall"] !== null) document.getElementById("preview-image").src = data["primaryImageSmall"];
                    localStorage.setItem("object" + objectID, JSON.stringify(data));
                }
            )
        })
        .catch();
}

/**
 * Sets print size, mat color, mat width, frame width and frame style if they are defined by the query parameters
 * printSize, frameStyle, frameWidth, matColor and matWidth
 */
applyFrameStyleParam();
applyFrameWidthParam();
applyMatColorParam();
applyMatWidthParam();
applyPrintSizeParam();

//Calling this function once at start for the case that configuration is given via query params
calculatePriceConfig()

function renderPreview() {
    render(document.getElementById("preview-image"), document.getElementById("preview-container"), getCheckedSize(), getCheckedStyle(),
        document.getElementById("frameWidth-display").value * 10, getCheckedColor(),(document.getElementById("matWidth-display").value * 10).toFixed(2));
}

/**
 * Calculates price and updates the html element showing the price, for doc on how price is calculated see frame.js/calculatePrice()
 */
function calculatePriceConfig() {
    document.getElementById("price").innerHTML = "€ " + calculatePrice(getCheckedSize(), getCheckedStyle(), document.getElementById("frameWidth-display").value * 10,
        document.getElementById("matWidth-display").value * 10).toFixed(2);
}

/**
 * Adds a new CartItem that is created from the options chosen on the configurator to the localStorage and
 * redirects to shopping cart.
 */


/**
 * Returns which printSize is currently checked
 * @returns {string} checked Printsize, possible values : S, M, L
 */
function getCheckedSize() {
    if (document.getElementById("print-size-s").checked === true) 
    else if (document.getElementById("print-size-m").checked === true) 
    else return "L";
}

/**
 * Returns which matColor is currently checked
 * @returns {string} checked matColor, possible values : coal, indigo, ivory, mint, wine
 */
function getCheckedColor() {
    if (document.getElementById("mat-color-coal").checked === true) 
    else if (document.getElementById("mat-color-indigo").checked === true) 
    else if (document.getElementById("mat-color-ivory").checked === true) 
    else if (document.getElementById("mat-color-mint").checked === true) 
    else return "wine";
}

/**
 * Returns which frameStyle is currently checked
 * @returns {string} checked frameStyle, possible values : classic, shabby, elegant, natural
 */
function getCheckedStyle() {
    if (document.getElementById("frame-style-classic").checked === true) 
    else if (document.getElementById("frame-style-shabby").checked === true) 
    else if (document.getElementById("frame-style-elegant").checked === true) 
    else return "natural";


}
/**
 * Pre-selects a print size if the corresponding query parameter is set
 */
function applyPrintSizeParam() {
    switch(params.get("printSize")) {
        
        
        
        default:
            document.getElementById("print-size-s").checked = false;
            document.getElementById("print-size-m").checked = false;
            document.getElementById("print-size-l").checked = false;
    }
}

function applyFrameWidthParam() {
    if (params.get("frameWidth") !== null) 
}

function applyMatWidthParam() {
    if (params.get("matWidth") !== null) 
}

/**
 * Pre-selects a frame style if the corresponding query parameter is set
 */
function applyFrameStyleParam() {
    switch (params.get("frameStyle")) {
        
        
        
        
        default:
            document.getElementById("frame-style-classic").checked = false;
            document.getElementById("frame-style-natural").checked = false;
            document.getElementById("frame-style-shabby").checked = false;
            document.getElementById("frame-style-elegant").checked = false;
    }
}

/**
 * Pre-selects a mat color if the corresponding query parameter is set
 */
function applyMatColorParam() {
    switch (params.get("matColor")) {
        
        
        
        
        
        default:
            document.getElementById("mat-color-ivory").checked = false;
            document.getElementById("mat-color-mint").checked = false;
            document.getElementById("mat-color-wine").checked = false;
            document.getElementById("mat-color-indigo").checked = false;
            document.getElementById("mat-color-coal").checked = false;

    }
}



/**
 * Takes an input in the frameW input field, sanitizes it and writes it to the corresponding slider
 */


/**
 * Takes an input value (from the frameW Slider) and writes it to the corresponding input field
 */


/**
 * Takes an input in the matW input field, sanitizes it and writes it to the corresponding slider
 */
function matW_input_write_slider() {
    if (this.value.length !== 0) {
        if (this.value < 0) this.value = 0;
        if (this.value > 10) this.value = 10;
        this.value = Math.round(this.value * 10) / 10
        document.getElementById("matWidth-slider").setAttribute('value', this.value);
    }
}

/**
 * Takes an input value (from the matW Slider) and writes it to the corresponding input field
 */

