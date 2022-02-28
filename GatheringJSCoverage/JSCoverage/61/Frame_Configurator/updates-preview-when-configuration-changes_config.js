import {CartItem} from "./common.js"
import {showCartNumber} from "./common.js";
import {fetchArtwork} from "./common.js";
import {getPrintSizes} from "./frame.js";
import {render} from "./frame.js";
import {calculatePrice} from "./frame.js";

class Configurator{
    constructor() {
        const urlParams = new URLSearchParams(location.search);
        this.cartItem = new CartItem(urlParams.get("objectID"),
            nullToUndefined(urlParams.get("printSize")),
            nullToUndefined(urlParams.get("frameStyle")),
            cmToMM(nullToUndefined(urlParams.get("frameWidth"))),
            nullToUndefined(urlParams.get("matColor")),
            cmToMM(nullToUndefined(urlParams.get("matWidth"))));
    }
    updateValuesinHTML() {
        // Update values in HTML based on query parameters
        const printSizeEl = document.getElementById(`print-size-${this.cartItem.printSize.toLowerCase()}`);
        printSizeEl.checked = true;

        const frameInputEl = document.getElementsByName('frameWidth')[0];
        frameInputEl.value = this.cartItem.frameWidth;
        frameInputEl.dispatchEvent(new Event('change'));

        const frameStyleEl = document.getElementById(`frame-style-${this.cartItem.frameStyle.toLowerCase()}`);
        frameStyleEl.checked = true;

        const matInputEl = document.getElementsByName('matWidth')[0];
        matInputEl.value = this.cartItem.matWidth;
        matInputEl.dispatchEvent(new Event('change'));

        const matColorEl = document.getElementById(`mat-color-${this.cartItem.matColor.toLowerCase()}`);
        matColorEl.checked = true;
    }
}

// helper
function cmToMM(cmValue){
    if (cmValue )  else {
        return undefined;
    }
}
function nullToUndefined(param1) {
    if (param1 === null) {
        return undefined;
    }
}

// range check
function setIfInRange(el1, el2, lower, upper, cartItemKey) {
    el1.value = (Math.round((parseFloat(el1.value) + Number.EPSILON) * 10) / 10);
    el2.value = (Math.round((parseFloat(el2.value) + Number.EPSILON) * 10) / 10);

    if (el1.value >= lower && el1.value <= upper) {
        el2.value = el1.value;
    }
    // keep CartItem Object updated as well
    if (cartItemKey) {
        conf.cartItem[cartItemKey] = el1.value;
    }
}

function updateForm() {
    if (imageLoaded) {
        render(document.getElementById("preview-image"), document.getElementById("preview-container"), conf.cartItem.printSize, conf.cartItem.frameStyle, conf.cartItem.frameWidth * 10, conf.cartItem.matColor, conf.cartItem.matWidth * 10);
    }
    setPrice();
    setTotalSize();
}

function setPrice() {
    const total = calculatePrice(conf.cartItem.printSize, conf.cartItem.frameStyle, conf.cartItem.frameWidth * 10, conf.cartItem.matWidth * 10);
    document.getElementById('price').innerText = "€ " + total.toFixed(2);
}

function setTotalSize() {
    const size = getPrintSizes(document.getElementById('preview-image'));
    const width = Math.floor(size[conf.cartItem.printSize][0] + 20 * (parseFloat(conf.cartItem.frameWidth) + parseFloat(conf.cartItem.matWidth))) / 10;
    const height = Math.floor(size[conf.cartItem.printSize][1] + 20 * (parseFloat(conf.cartItem.frameWidth) + parseFloat(conf.cartItem.matWidth))) / 10;
    document.getElementById('total-size').innerHTML = `${width} × ${height} cm`;
}



showCartNumber();

const conf = new Configurator();

let imageLoaded = false;

// Connect the frame width and mat width text fields with their respective range sliders,
// so that changing the value of the slider changes the value in the text field, and vice versa.
const frameSlider = document.getElementsByName('frameWidthR')[0];
const frameInput = document.getElementsByName('frameWidth')[0];
const matSlider = document.getElementsByName('matWidthR')[0];
const matInput = document.getElementsByName('matWidth')[0];

frameSlider.addEventListener('change', );
frameInput.addEventListener('change', () => {
    setIfInRange(frameInput, frameSlider, 2.0, 5.0, "frameWidth");
    updateForm();
});
matSlider.addEventListener('change', );
matInput.addEventListener('change', () => {
    setIfInRange(matInput, matSlider, 0.0, 10.0, "matWidth");
    updateForm();
});

// must be called after Slider/Input Range EventListeners have been registered
// so that we only have to set the Input and the Sliders get updated accordingly
conf.updateValuesinHTML();

// Event Handlers to update CartItem for the other entries as well
const printSize = document.getElementsByClassName("segmented")[0];
const frameStyle = document.getElementsByClassName("frame-style-row")[0];
const matColor = document.getElementsByClassName("mat-color-row")[0];

printSize.addEventListener('change', () => {
    conf.cartItem.printSize = document.getElementById('config-form').elements['printSize'].value;
    updateForm();
});
frameStyle.addEventListener('change', () => {
    conf.cartItem.frameStyle = document.getElementById('config-form').elements['frameStyle'].value;
    updateForm();
});
matColor.addEventListener('change', () => {
    conf.cartItem.matColor = document.getElementById('config-form').elements['matColor'].value;
    updateForm();
});

// add click event to add-to-cart button
document.getElementsByClassName('buy')[0].addEventListener('click', addItem);

// Use a query parameter objectID to determine which artwork is being configured on the page.
// If the requested picture does not exist, the user should be redirected to the Search page.
if (!conf.cartItem.objectID)  else {
    fetchArtwork(conf.cartItem.objectID, obj => {
        if (!obj) 

        // Image
        const previewImgEl = document.getElementById("preview-image");
        previewImgEl.setAttribute("src", obj.primaryImageSmall);

        // Label
        const imgLabelEL = document.getElementById("image-label");

        // Label Artist
        let imgArtistEl = document.createElement("p");
        imgArtistEl.setAttribute("class", "artist");
        imgArtistEl.innerText = obj.artistDisplayName;

        // Label Description
        let imgLabelDescriptionEl = document.createElement("p");

        // Label Description Title/Description
        let imgLabelDescriptionTitleEl = document.createElement("span");
        imgLabelDescriptionTitleEl.setAttribute("class", "title");
        imgLabelDescriptionTitleEl.innerText = obj.title;

        // Label Description Date concatenated
        const imgLabelDescriptionDateEl = document.createTextNode(', ' + obj.objectDate);

        imgLabelDescriptionEl.appendChild(imgLabelDescriptionTitleEl);
        imgLabelDescriptionEl.appendChild(imgLabelDescriptionDateEl);

        imgLabelEL.appendChild(imgArtistEl);
        imgLabelEL.appendChild(imgLabelDescriptionEl);

        // Size
        previewImgEl.addEventListener('load', () => {
            imageLoaded = true;
            const sizes = getPrintSizes(previewImgEl);
            document.getElementById('print-size-s-label').innerHTML = `Small<br>${sizes.S[0] / 10} × ${sizes.S[1] / 10} cm`;
            document.getElementById('print-size-m-label').innerHTML = `Medium<br>${sizes.M[0] / 10} × ${sizes.M[1] / 10} cm`;
            document.getElementById('print-size-l-label').innerHTML = `Large<br>${sizes.L[0] / 10} × ${sizes.L[1] / 10} cm`;
            updateForm();
        });
    })
}
