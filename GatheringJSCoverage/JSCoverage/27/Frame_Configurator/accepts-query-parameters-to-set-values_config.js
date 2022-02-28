import { render,getPrintSizes } from './frame.js';
import { writeNumberOfCartItems } from './global.js';

writeNumberOfCartItems(document.getElementById('cart-link'));

const urlParams = new URLSearchParams(window.location.search);

let artworkID;
if (urlParams.has("objectID")) {
    artworkID = urlParams.get("objectID");
}
const previewImage = document.getElementById("preview-image");
const imageLabel = document.getElementById("image-label");
const previewContainer = document.getElementById("preview-container");
const artwork = getArtwork();
let printSize;
let frameWidth;
let frameStyle;
let matWidth;
let matColor;
initialize();

async function initPrintSize() {
    let printSize;
    if (urlParams.has("printSize")) {
        printSize = urlParams.get("printSize");
        let printSizes = document.getElementsByName("printSize");
        for (let i = 0; i < printSizes.length; i++) {
            if (printSizes[i].value === printSize) {
                printSizes[i].checked = true;
                return printSize;
            }
        }}

async function initFrameWidth() {
    let frameWidth;
    if (urlParams.has("frameWidth")) {
        frameWidth = urlParams.get("frameWidth") / 10;
        document.getElementsByName('frameWidth')[0].value = frameWidth;
        document.getElementsByName('frameWidthR')[0].value = frameWidth;
        return frameWidth;
    }}

async function initFrameStyle() {
    let frameStyle;
    if (urlParams.has("frameStyle")) {
        frameStyle = urlParams.get("frameStyle");
        let framestyles = document.getElementsByName("frameStyle");
        for (let i = 0; i < framestyles.length; i++) {
            if (frameStyle === framestyles[i].value) {
                framestyles[i].checked = true;
                return frameStyle;
            }
        }}

async function initMatWidth() {
    let matWidth;
    if (urlParams.has("matWidth")) {
        matWidth = urlParams.get("matWidth") / 10;
        document.getElementsByName('matWidth')[0].value = matWidth;
        document.getElementsByName('matWidthR')[0].value = matWidth;
        return matWidth;
    }}

async function initMatColor() {
    let matColor;
    if (urlParams.has("matColor")) {
        matColor = urlParams.get("matColor");
        let matColors = document.getElementsByName("matColor");
        for (let i = 0; i < matColors.length; i++) {
            if (matColor === matColors[i].value) {
                matColors[i].checked = true;
                return matColor;
            }
        }}


artwork.then(artwork => {
    previewImage.src = artwork.primaryImageSmall;
    let t = document.createTextNode(artwork.title);
    imageLabel.appendChild(t);
    t = document.createTextNode(artwork.artistDisplayName);
    imageLabel.appendChild(t);
    t = document.createTextNode(artwork.objectDate);
    imageLabel.appendChild(t);
});

async function initialize() {
    let printSizeC = await initPrintSize();
    let frameWidthC = await initFrameWidth();
    let frameStyleC = await initFrameStyle();
    let matWidthC = await initMatWidth();
    let matColorC = await initMatColor();
    console.log(previewImage);
    render(previewImage, previewContainer, printSizeC, frameStyleC, frameWidthC, matColorC, matWidthC);
    getPrintSizeLabels();
    printSize = printSizeC;
    frameWidth = frameWidthC;
    frameStyle = frameStyleC;
    matWidth = matWidthC;
    matColor = matColorC;
}

async function getPrintSizeLabels() {
    let printSizes = getPrintSizes(previewImage);
    let sLabel = document.getElementById("print-size-s-label");
    let mLabel = document.getElementById("print-size-m-label");
    let lLabel = document.getElementById("print-size-l-label");
    sLabel.innerHTML = "Small<br>" + printSizes.S[0] + " \u00d7 " + printSizes.S[1] + " cm";
    mLabel.innerHTML = "Medium<br>" + printSizes.M[0] + " \u00d7 " + printSizes.M[1] + " cm";
    lLabel.innerHTML = "Large<br>" + printSizes.L[0] + " \u00d7 " + printSizes.L[1] + " cm";
}

async function getArtwork() {
    let artwork = window.localStorage.getItem(artworkID);
    if (artwork) 
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + artworkID;
    try {
        const response = await fetch(url);
        if (response.status === 404) 
        const rawData = await response.json();
        window.localStorage.setItem(artworkID, JSON.stringify(rawData));
        return rawData;
    }}

//Update Print Size

const printSizes = document.getElementsByName("printSize");
for (var i = 0; i < printSizes.length; i++) {
    printSizes[i].addEventListener('click', );
}

//Update Frame Width

const frameWidthSlider = document.getElementsByName('frameWidthR');
frameWidthSlider[0].addEventListener('input', );

frameWidthSlider[0].addEventListener('change', );

const frameWidthLabel = document.getElementsByName('frameWidth');
frameWidthLabel[0].addEventListener('change', );

//Update Frame Style

const frameStyles = document.getElementsByName("frameStyle");
for (var i = 0; i < frameStyles.length; i++) {
    frameStyles[i].addEventListener('click', );
}

//Update Mat Width

const matWidthSlider = document.getElementsByName('matWidthR');
matWidthSlider[0].addEventListener('input', );

matWidthSlider[0].addEventListener('change', );

const matWidthLabel = document.getElementsByName('matWidth');
matWidthLabel[0].addEventListener('change', );

//Update Mat Color

const matColors = document.getElementsByName("matColor");
for (var i = 0; i < matColors.length; i++) {
    matColors[i].addEventListener('click', );
}

//add to cart

const form = document.getElementById("config-form");
form.addEventListener("submit", );
