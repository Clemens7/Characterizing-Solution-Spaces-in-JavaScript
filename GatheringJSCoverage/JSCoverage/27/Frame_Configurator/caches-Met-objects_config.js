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
    if (urlParams.has("printSize"))  else {
        let printSizes = document.getElementsByName("printSize");
        for (let i = 0; i < printSizes.length; i++) {
            if (printSizes[i].checked === true) {
                printSize = printSizes[i].value;
                return printSize;
            }
        }}

async function initFrameWidth() {
    let frameWidth;
    if (urlParams.has("frameWidth"))  else {
        frameWidth = document.getElementsByName('frameWidth')[0].value;
        return frameWidth;
    }}

async function initFrameStyle() {
    let frameStyle;
    if (urlParams.has("frameStyle"))  else {
        let framestyles = document.getElementsByName("frameStyle");
        for (let i = 0; i < framestyles.length; i++) {
            if (framestyles[i].checked === true) {
                frameStyle = framestyles[i].value;
                return frameStyle;
            }
        }}

async function initMatWidth() {
    let matWidth;
    if (urlParams.has("matWidth"))  else {
        matWidth = document.getElementsByName('matWidth')[0].value;
        return matWidth;
    }}

async function initMatColor() {
    let matColor;
    if (urlParams.has("matColor"))  else {
        let matColors = document.getElementsByName("matColor");
        for (let i = 0; i < matColors.length; i++) {
            if (matColors[i].checked === true) {
                matColor = matColors[i].value;
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
    if (artwork) {
        return JSON.parse(artwork);
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
