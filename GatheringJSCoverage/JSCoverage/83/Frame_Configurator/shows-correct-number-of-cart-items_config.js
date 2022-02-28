import * as FrameTools from "./frame.js";

const urlParams = new URLSearchParams(window.location.search);
const objectID = urlParams.get('objectID');
const printSize = urlParams.get('printSize');
const frameStyle = urlParams.get('frameStyle');
let frameWidth = urlParams.get('frameWidth');
const matColor = urlParams.get('matColor');
let matWidth = urlParams.get('matWidth');

if (frameWidth) 
if (matWidth) 

let previewImageContainerElement = document.getElementById('preview-container');
let previewImageElement = document.getElementById('preview-image');
let imageLabel = document.getElementById("image-label");


let frameWidthRangeElement = document.getElementsByName("frameWidthR")[0];
let frameWidthElement = document.getElementsByName("frameWidth")[0];
let matWidthRangeElement = document.getElementsByName("matWidthR")[0];
let matWidthElement = document.getElementsByName("matWidth")[0];

let priceElement = document.getElementById("price");
let totalSizeElement = document.getElementById("total-size");
let sSizeLabelElement = document.getElementById("print-size-s-label");
let mSizeLabelElement = document.getElementById("print-size-m-label");
let lSizeLabelElement = document.getElementById("print-size-l-label");

loadImage();

setSize(printSize);
setStyle(frameStyle);
setColor(matColor);
if (frameWidth) 
if (matWidth) 
updateMatWidthRangeElement();
updateFrameWidthRangeElement();


async function loadImage() {
    try {
        if (objectID == null) 
        const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID;
        let data;
        if (localStorage.getItem(objectID) == null)  else {
            data = localStorage.getItem(objectID);
        }
        if (data != null) {
            let image = data.primaryImage;
            if (image == undefined) image = data.primaryImageSmall;
            if (image == undefined) image = data.additionalImages[0];
    }catch (error) {
        //document.location.href = "./search.html";
        console.log(error);
    }
}

window.setSize = setSize;

function setSize(size) {
    console.log(size);
    if (size != null) 
    updateUI();
}

window.setStyle = setStyle;

//http://localhost:63342/A2/www/config.html?_ijt=q1gl50ueg8er16e9vcjncf2ihr&printSize=M&frameStyle=natural&matColor=wine&frameWidth=4.9&matWidth=8.2&objectID=100
function setStyle(style) {
    if (style != null) 
    updateUI();
}

window.setColor = setColor;

function setColor(color) {
    if (color != null) 
    updateUI();
}

window.updateFrameWidthElement = updateFrameWidthElement;



window.updateFrameWidthRangeElement = updateFrameWidthRangeElement;

function updateFrameWidthRangeElement() {
    if (frameWidthElement.value != null && frameWidthElement.value != "") {
        if (frameWidthElement.value < 2) 
        if (frameWidthElement.value > 5) 
        if (frameWidthElement.value.length > 3) 
    }
    frameWidthRangeElement.value = frameWidthElement.value;
    updateUI();
}

window.updateMatWidthElement = updateMatWidthElement;



window.updateMatWidthRangeElement = updateMatWidthRangeElement;

function updateMatWidthRangeElement() {
    if (matWidthElement.value != null && matWidthElement.value != "") {
        if (matWidthElement.value < 0) 
        if (matWidthElement.value > 10) 
        if (matWidthElement.value.length > 3) 
    }
    matWidthRangeElement.value = matWidthElement.value;
    updateUI();
}

window.updateUI = updateUI;

function updateUI() {
    FrameTools.render(previewImageElement,
        previewImageContainerElement,
        document.querySelector('input[name="printSize"]:checked').value,
        document.querySelector('input[name="frameStyle"]:checked').value,
        frameWidthElement.value,
        document.querySelector('input[name="matColor"]:checked').value,
        matWidthElement.value);
    updatePrintSizes();
    calcPrice();
}

function updatePrintSizes() {
    const sizes = FrameTools.getPrintSizes(previewImageElement);
    sSizeLabelElement.innerHTML = "Small<br>" + sizes['S'][0] + " x " + sizes['S'][1];
    mSizeLabelElement.innerHTML = "Medium<br>" + sizes['M'][0] + " x " + sizes['M'][1];
    lSizeLabelElement.innerHTML = "Large<br>" + sizes['L'][0] + " x " + sizes['L'][1];
    updateTotalSize(sizes, document.querySelector('input[name="printSize"]:checked').value);
}

window.calcPrice = calcPrice;

function calcPrice() {
    const price = FrameTools.calculatePrice(
        document.querySelector('input[name="printSize"]:checked').value,
        document.querySelector('input[name="frameStyle"]:checked').value,
        +frameWidthElement.value,
        +matWidthElement.value);
    priceElement.innerText = "€ " + Number.parseFloat(price).toFixed(2);
}


function updateTotalSize(sizes, type) {
    let x = sizes[type.toString().toUpperCase()][0] + (+frameWidthElement.value) * 2 + (+matWidthElement.value) * 2;
    let y = (sizes[type][1] + (+frameWidthElement.value) * 2 + (+matWidthElement.value) * 2);
    totalSizeElement.innerHTML =
        Math.round(x * 10) / 10 + " x " + Math.round(y * 10) / 10 + " cm";
}



document.querySelector('form').addEventListener('submit', saveMet);