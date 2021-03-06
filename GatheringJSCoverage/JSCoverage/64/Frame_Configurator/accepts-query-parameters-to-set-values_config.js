import * as ArtworkCache from './artwork-cache.js';
import {render, getPrintSizes, calculatePrice} from "../frame.js";
import {displayCartContent} from "./cart-common.js";

const onLoaded = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const objectID = urlParams.get('objectID');
    const printSize = urlParams.get('printSize');
    const frameStyle = urlParams.get('frameStyle');
    const frameWidth = urlParams.get('frameWidth');
    const matColor = urlParams.get('matColor');
    const matWidth = urlParams.get('matWidth');

    init(objectID, printSize, frameStyle, frameWidth, matColor, matWidth);
};

document.addEventListener('DOMContentLoaded', onLoaded);
window.addEventListener('resize', );

function init(objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
    loadObject(objectID);
    connectFrameWidthInputs();
    connectMatWidthInputs();
    setPrintSize(printSize);
    setFrameStyle(frameStyle);
    setFrameWidth(frameWidth);
    setMatColor(matColor);
    setMatWidth(matWidth);
    attachRangeListeners();
    attachAddToCartListener();
    displayCartContent();
}

function attachAddToCartListener() {
    const addToCartForm = document.getElementById('config-form');
    addToCartForm.addEventListener('submit', )
}

function setPrintSize(printSize) {
    const validValues = ["S", "M", "L"];
    if (!validValues.includes(printSize)) 

    document.getElementsByName("printSize")
        .forEach((element) => {
            element.checked = element.value === printSize;
        });
}

function setFrameStyle(frameStyle) {
    const validValues = ["classic", "natural", "shabby", "elegant"];
    if (!validValues.includes(frameStyle)) 

    document.getElementsByName("frameStyle")
        .forEach((element) => {
            element.checked = element.value === frameStyle;
        });
}

function setFrameWidth(frameWidth) {
    if (frameWidth === null) 

    let frameWidthCM = parseInt(frameWidth, 10) / 10;
    if (frameWidthCM < 2 || frameWidthCM > 5) 

    frameWidthCM = Math.trunc(frameWidthCM * 10) / 10;

    document.getElementsByName('frameWidth')[0].value = frameWidthCM;
}

function setMatColor(matColor) {
    const validValues = ["ivory", "mint", "wine", "indigo", "coal"];
    if (!validValues.includes(matColor)) 

    document.getElementsByName("matColor")
        .forEach((element) => {
            element.checked = element.value === matColor;
        });
}

function setMatWidth(matWidth) {
    if (matWidth === null) 

    let matWidthCM = parseInt(matWidth, 10) / 10;
    if (matWidthCM < 0 || matWidthCM > 10) 

    matWidthCM = Math.trunc(matWidthCM * 10) / 10;

    document.getElementsByName('matWidth')[0].value = matWidthCM;
}

function connectFrameWidthInputs() {
    const frameWidthInput = document.getElementsByName('frameWidth')[0];
    const frameWidthSlider = document.getElementsByName('frameWidthR')[0];
    const setValue = ;

    frameWidthInput.addEventListener('change', );
    frameWidthSlider.addEventListener('input', );
}

function connectMatWidthInputs() {
    const matWidthInput = document.getElementsByName('matWidth')[0];
    const matWidthSlider = document.getElementsByName('matWidthR')[0];
    const setValue = ;

    matWidthInput.addEventListener('change', );
    matWidthSlider.addEventListener('input', );
}

function attachRangeListeners() {
    const rangeElementNames = ["printSize", "frameStyle", "matColor"];
    rangeElementNames
        .flatMap(name => Array.from(document.getElementsByName(name)))
        .forEach(element => {
            element.addEventListener('input', );
        });
}

async function loadObject(objectID) {
    if (objectID === null) 

    document.getElementById("object-id").value = objectID;

    const setLabel = (artistDisplayName, title, objectDate) => {
        const labelElement = document.getElementById('image-label');
        const titleDiv = document.createElement("div");
        const titleStrong = document.createElement("strong");
        titleDiv.append(titleStrong);
        titleStrong.innerText = artistDisplayName;

        const titleEm = document.createElement("em");
        titleEm.innerText = `${title}, `;
        const objectDateSpan = document.createElement("span");
        objectDateSpan.innerText = objectDate;

        labelElement.append(titleDiv, titleEm, objectDateSpan);
    };
    let object = ArtworkCache.retrieve(objectID);
    if (!object) {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
            if (response.ok) {
                object = await response.json();
                ArtworkCache.store(objectID, object);
            }
        } 
    }
    const imageElement = document.getElementById('preview-image');
    imageElement.addEventListener('load', () => updateChangeableData());
    imageElement.src = object.primaryImageSmall;
    setLabel(object.artistDisplayName, object.title, object.objectDate);
}

function updateChangeableData() {
    const imageElement = document.getElementById('preview-image');
    const printSizes = getPrintSizes(imageElement);

    const printSize = document.querySelector('input[name="printSize"]:checked').value;
    const frameStyle = document.querySelector('input[name="frameStyle"]:checked').value;
    const frameWidth = document.getElementsByName("frameWidth")[0].value * 10;
    const matWidth = document.getElementsByName("matWidth")[0].value * 10;

    const imageSize = printSizes[printSize];

    renderImage(printSize, frameStyle, frameWidth, matWidth);
    updatePrintSizeLabel(printSizes);
    updatePriceSum(printSize, frameStyle, frameWidth, matWidth);
    updateTotalSize(imageSize, frameWidth, matWidth);
}

function renderImage(printSize, frameStyle, frameWidth, matWidth) {
    const imageElement = document.getElementById('preview-image');
    const imageContainer = document.getElementById('preview-container');
    const matColor = document.querySelector('input[name="matColor"]:checked').value;
    render(imageElement, imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
}

function updatePrintSizeLabel(printSizes) {
    const smallLabel = document.getElementById("print-size-s-label");
    const mediumLabel = document.getElementById("print-size-m-label");
    const largeLabel = document.getElementById("print-size-l-label");

    const printSizeMapping = {
        S: smallLabel,
        M: mediumLabel,
        L: largeLabel
    };

    const titleMapping = {
        S: 'Small',
        M: 'Medium',
        L: 'Large'
    };

    const setContent = (element, title, width, height) => {
        element.innerHTML = '';

        const titleSpan = document.createElement("span");
        titleSpan.innerText = title;

        const sizeSpan = document.createElement("span");
        const widthCM = width / 10;
        const heightCM = height / 10;
        sizeSpan.innerText = `${widthCM} ?? ${heightCM} cm`;

        element.append(titleSpan, sizeSpan);
    };

    Object.keys(printSizeMapping).forEach(printSizeKey => {
        const [width, height] = printSizes[printSizeKey];
        const element = printSizeMapping[printSizeKey];

        setContent(element, titleMapping[printSizeKey], width, height);
    })
}

function updatePriceSum(printSize, frameStyle, frameWidth, matWidth) {
    const price = calculatePrice(printSize, frameStyle, frameWidth, matWidth);

    const totalPriceField = document.getElementById("price");
    totalPriceField.innerText = `??? ${price.toFixed(2)}`;
}

function updateTotalSize(imageSize, frameWidth, matWidth) {
    const imageWidth = imageSize[0];
    const imageHeight = imageSize[1];

    const printPadding = 2 * matWidth + 2 * frameWidth;
    const totalWidth = imageWidth + printPadding;
    const totalHeight = imageHeight + printPadding;

    const widthCM = totalWidth / 10;
    const heightCM = totalHeight / 10;
    const totalSizeField = document.getElementById("total-size");
    totalSizeField.innerText = `${widthCM} ?? ${heightCM} cm`;
}