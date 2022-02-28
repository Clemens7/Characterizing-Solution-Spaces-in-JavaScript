import {API} from "./api.js";
import {calculatePrice, getPrintSizes, render} from "./frame.js";
import * as Cart from './cartCache.js'

const api = new API();

let imgContainerDOMElement;
let imgDOMElement;
let frameWidthDOMElement;
let frameWidthSliderDOMElement;
let matWidthDOMElement;
let matWidthSliderDOMElement;

const PRINT_SIZES = [
    "s",
    "m",
    "l",
];
const FRAME_STYLES = [
    "classic",
    "natural",
    "shabby",
    "elegant"
];
const COLORS = [
    "ivory",
    "mint",
    "wine",
    "indigo",
    "coal"
];



function getPrintSize() {
    for (const size of PRINT_SIZES) {
        if (document.getElementById("print-size-" + size).checked) {
            return size.toUpperCase()
        }
    }}



function getFrameStyle() {
    for (const style of FRAME_STYLES) {
        if (document.getElementById("frame-style-" + style).checked) {
            return style
        }
    }}



function getFrameWidth() {
    return frameWidthDOMElement.value
}



function getMatColor() {
    for (const color of COLORS) {
        if (document.getElementById("mat-color-" + color).checked) {
            return color
        }
    }}



function getMatWidth() {
    return matWidthDOMElement.value
}



function update() {
    const printSize = getPrintSize();
    const frameStyle = getFrameStyle();
    const frameWidth = getFrameWidth();
    const matWidth = getMatWidth();
    render(imgDOMElement, imgContainerDOMElement, printSize, frameStyle, frameWidth, getMatColor(), matWidth);
    const printSizes = getPrintSizes(imgDOMElement);
    for (const size of PRINT_SIZES) {
        const mmSize = printSizes[size.toUpperCase()];
        let html;
        switch (size) {
            case "s":
                html = "Small";
                break;
            case "m":
                html = "Medium";
                break;
            case "l":
                html = "Large";
                break;
        }
        html += `<br>${mmSize[0] / 10} x ${mmSize[0] / 10} cm`;
        document.getElementById(`print-size-${size}-label`).innerHTML = html;
    }
    document.getElementById("price").innerHTML = `€ ${calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2)}`
}

const params = new URLSearchParams(window.location.search);

async function loadObject() {
    if (!params.has("objectID")) 
    const id = params.get("objectID");
    let response;
    try {
        response = await api.getById(id);
    } 
    if (!response) 
    document.getElementById("object-id").value = id;

    imgDOMElement.onload = update;
    imgDOMElement.src = response.primaryImage || response.primaryImageSmall;

    const imageLabelDOMElement = document.getElementById("image-label");
    imageLabelDOMElement.innerHTML = `
        <span class="artist">${response.artistDisplayName}</span>
        <span class="title">${response.title}</span>,
        <span class="date">${response.objectDate}</span>
    `;
}

window.addEventListener('DOMContentLoaded', async function () {
    imgContainerDOMElement = document.getElementById("preview-container");
    imgDOMElement = document.getElementById("preview-image");
    frameWidthDOMElement = document.getElementsByName("frameWidth")[0];
    matWidthDOMElement = document.getElementsByName("matWidth")[0];

    const radioInputs = document.querySelectorAll("input[type=radio]");
    for (const input of radioInputs) {
        input.addEventListener("change", update);
    }

    frameWidthSliderDOMElement = document.getElementsByName("frameWidthR")[0];
    frameWidthSliderDOMElement.addEventListener("change", );
    frameWidthDOMElement.addEventListener("change", );
    matWidthSliderDOMElement = document.getElementsByName("matWidthR")[0];
    matWidthSliderDOMElement.addEventListener("change", );
    matWidthDOMElement.addEventListener("change", );

    if (params.has("printSize")) 
    if (params.has("frameStyle")) 
    if (params.has("frameWidth")) 
    if (params.has("matColor")) 
    if (params.has("matWidth")) 

    //Add to Cart Event
    document.getElementById('config-form').addEventListener("submit", );

    await loadObject();
});

// Show Number of Cart Items in Header
showCartItemNumber(Cart.retrieve());

function showCartItemNumber(cartObjects) {
  const cartHeader = document.getElementById("cart-link");
  if (cartObjects.length !== 0)  else {
    cartHeader.innerText = 'Cart';
  }
}
