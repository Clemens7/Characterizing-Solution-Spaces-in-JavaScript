import {calculatePrice, getPrintSizes, render} from "./frame.js";
import {getArtwork} from "./met/met-api.js";
import {addToCart, getCartItemCount} from "./cache/cart-cache.js";

// DOM elements
const cartLabel = document.getElementById('cart-link');
const image = document.getElementById('preview-image');
const imageContainer = document.getElementById('preview-container');
const form = document.getElementById('config-form');
const printSizeRadios = document.getElementsByName('printSize');
const frameWidthInput = document.getElementById("frameWidth");
const frameWidthRange = document.getElementById("frameWidthR");
const frameStyleRadios = document.getElementsByName('frameStyle');
const matWidthInput = document.getElementById("matWidth");
const matWidthRange = document.getElementById("matWidthR");
const matColorRadios = document.getElementsByName('matColor');
const sizeS = document.getElementById("print-size-s-label");
const sizeM = document.getElementById("print-size-m-label");
const sizeL = document.getElementById("print-size-l-label");
const sizeTotal = document.getElementById("total-size");
const priceLabel = document.getElementById("price");

let objectID = '-1';
let sizes;
// default config values
let printSize = 'M';
let frameStyle = 'natural';
let frameWidth = 40;
let matColor = 'mint';
let matWidth = 55;

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
objectID = params.get('objectID');

// if configuration values not passed as url params, assign default ones
printSize = params.get('printSize')  : printSize;
frameStyle = params.get('frameStyle')  : frameStyle;
frameWidth = params.get('frameWidth')  : frameWidth;
matColor = params.get('matColor')  : matColor;
matWidth = params.get('matWidth')  : matWidth;

// adjust configuration to passed in url params
document.getElementById(`print-size-${printSize.toLowerCase()}`).checked = true;
document.getElementById(`frame-style-${frameStyle}`).checked = true;
document.getElementById(`mat-color-${matColor}`).checked = true;
frameWidthInput.value = frameWidth / 10;
frameWidthRange.value = frameWidth / 10;
matWidthInput.value = matWidth / 10;
matWidthRange.value = matWidth / 10;


document.addEventListener('DOMContentLoaded', async () => {
    // update 'Cart' label with number of cart items
    const cartItemCount = getCartItemCount();
    const cartItemsString = cartItemCount === 0 ? '' ;
    cartLabel.innerText = `Cart${cartItemsString}`;

    if (objectID) {
        const artwork = await getArtwork(objectID);
        if (artwork)
            renderArtwork(params, artwork);
    }
});


for (let radio of printSizeRadios) {
    radio.onclick = () => {
        printSize = radio.value;
        render(image, imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
        setTotalSize();
        updatePrice();
    }
}


// frameWidthInput.addEventListener('input', frameWidthAction);
frameWidthInput.onchange = frameWidthAction;
// frameWidthRange.addEventListener('input', frameWidthAction);
frameWidthRange.onchange = frameWidthAction;

function frameWidthAction(event) {
    // converting the input string (if present) to a number, rounding it to 1 place after comma
    // (which returns a string), finally converting to a number again
    let newValue = event.target.value !== '' ?
        Number(Number(event.target.value).toFixed(1)) ;
    if (event.target.value !== '' && newValue < 2)
        
    if (newValue > 5)
        
    frameWidthInput.value = newValue;
    frameWidthRange.value = newValue;
    frameWidth = newValue * 10;
    render(image, imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
    setTotalSize();
    updatePrice();
}


for (let radio of frameStyleRadios) {
    radio.onclick = () => {
        frameStyle = radio.value;
        render(image, imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
        updatePrice();
    }
}


// matWidthInput.addEventListener('input', matWidthAction);
matWidthInput.onchange = matWidthAction;
// matWidthRange.addEventListener('input', matWidthAction);
matWidthRange.onchange = matWidthAction;

function matWidthAction(event) {
    // converting the input string (if present) to a number, rounding it to 1 place after comma
    // (which returns a string), finally converting to a number again
    let newValue = event.target.value !== '' ?
        Number(Number(event.target.value).toFixed(1)) ;
    if (event.target.value !== '' && newValue < 0)
        
    if (newValue > 10)
        
    matWidthInput.value = newValue;
    matWidthRange.value = newValue;
    matWidth = newValue * 10;
    render(image, imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
    setTotalSize();
    updatePrice();
}


for (let radio of matColorRadios) {
    radio.onclick = () => {
        matColor = radio.value;
        render(image, imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
    }
}


form.onsubmit = ;


function renderArtwork(params, artwork) {
    const label = document.getElementById('image-label');
    const artist = document.getElementById('label-artist');
    const title = document.getElementById('label-title');

    artist.innerText = artwork.artist;
    title.innerText = `${artwork.title}${artwork.date ? ", " + artwork.date }`;
    image.src = artwork.imgUrl;
    image.onload = () => {
        label.hidden = false;
        render(image, imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
        sizes = getPrintSizes(image);
        setSizes();
        setTotalSize();
        updatePrice();
    };
}


function setSizes() {
    sizeS.innerHTML = `Small<br>${sizes.S[0]} × ${sizes.S[1]} cm`;
    sizeM.innerHTML = `Medium<br>${sizes.M[0]} × ${sizes.M[1]} cm`;
    sizeL.innerHTML = `Large<br>${sizes.L[0]} × ${sizes.L[1]} cm`;
}


function setTotalSize() {
    let totalWidth = sizes[printSize][0] + 2 * frameWidth / 10 + 2 * matWidth / 10;
    if (!Number.isInteger(totalWidth))
        totalWidth = totalWidth.toFixed(1);
    let totalHeight = sizes[printSize][1] + 2 * frameWidth / 10 + 2 * matWidth / 10;
    if (!Number.isInteger(totalHeight))
        totalHeight = totalHeight.toFixed(1);
    sizeTotal.innerText = `${totalWidth} × ${totalHeight} cm`;
}


function updatePrice() {
    priceLabel.innerText = `€ ${calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2)}`;
}