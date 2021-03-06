import { calculatePrice, render, getPrintSizes } from './frame.js';
import CartObject from './cartObject.js';
import { addToCartContent, getIdForObject } from "./cartStorage.js";

const frameWidthNumberInput = document.getElementById('frameWidthNumber');
const frameWidthSliderInput = document.getElementById('frameWidthSlider');
let frameWidth = frameWidthNumberInput.value;

const matWidthNumberInput = document.getElementById('matWidthNumber');
const matWidthSliderInput = document.getElementById('matWidthSlider');
let matWidth = matWidthNumberInput.value;

const printSizeItems = Array.from(document.getElementsByName('printSize'));
let printSize = printSizeItems.find(elem => elem.checked).value;

const frameStyleItems = Array.from(document.getElementsByName('frameStyle'));
let frameStyle = frameStyleItems.find(elem => elem.checked).value;

const matColorItems = Array.from(document.getElementsByName('matColor'));
let matColor = matColorItems.find(elem => elem.checked).value;

let renderReady = false;
let pictureSizes = {};

const urlParams = new URLSearchParams(window.location.search);


redirectIfObjectIdUndefined();
setupImg();
setInitialValues();
setUpListeners();
updatePrice();


function redirectIfObjectIdUndefined() {
    if (!urlParams.has('objectID'))
        
}

function setupImg() {
    let objectId = urlParams.get('objectID');

    let storage = localStorage.getItem('configStore');
    storage =  storage ? JSON.parse(storage) ;

    if (storage[objectId]) 
    else {
        const objectRequest = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
        fetch(objectRequest)
            .then(resp => {
                if (!resp.ok)
                    
                return resp.json();
            })
            .then(object => {
                setUpObject(object);
                storage[objectId] = object;
                localStorage.setItem('configStore', JSON.stringify(storage));
            })
            .catch();
    }
    
}

function setUpObject(object) {
    updateDescription(object.artistDisplayName, object.title, object.objectDate);

    if (!object.primaryImageSmall) 

    const img = document.getElementById('preview-image');

    img.addEventListener('load', )

    img.src = object.primaryImageSmall;
}

function setInitialValues() {
    let printSizeRes = setRadioQueryParam('printSize', printSizeItems);
    if (printSizeRes)
        printSize = printSizeRes;

    let frameStyleRes = setRadioQueryParam('frameStyle', frameStyleItems);
    if (frameStyleRes)
        frameStyle = frameStyleRes;

    let matColorRes = setRadioQueryParam('matColor', matColorItems);
    if (matColorRes)
        matColor = matColorRes;

    if (urlParams.has('frameWidth')) {
        let value = urlParams.get('frameWidth') / 10;
        if (isValueCorrect(value, frameWidthSliderInput.min, frameWidthSliderInput.max)) {
            frameWidthSliderInput.value = value;
            frameWidthNumberInput.value = value;
            frameWidth = value;
        }
    }

    if (urlParams.has('matWidth')) {
        let value = urlParams.get('matWidth') / 10;
        if (isValueCorrect(value, matWidthSliderInput.min, matWidthSliderInput.max)) {
            matWidthSliderInput.value = value;
            matWidthNumberInput.value = value;
            matWidth = value;
        }
    }
}

function setUpListeners() {
    for (let item of printSizeItems) {
        item.addEventListener('change', )
    }

    for (let item of frameStyleItems) {
        item.addEventListener('change', )
    }

    for (let item of matColorItems) {
        item.addEventListener('change', )
    }

    frameWidthNumberInput.addEventListener('change', );
    frameWidthSliderInput.addEventListener('change', );


    matWidthNumberInput.addEventListener('change', );
    matWidthSliderInput.addEventListener('change', );

    document.getElementById('addItemToCartButton').addEventListener('click', );
}

function updatePrice() {
    let price = calculatePrice(printSize, frameStyle, frameWidth, matWidth);
    let priceDisplay = document.getElementById('price');
    priceDisplay.innerText = `??? ${price.toFixed(2)}`;
}



function updateDescription(artist, description, date) {
    const container = document.getElementById('image-label');
    for (let child of container.children) {
        if (child.className == "artist") {
            child.innerText = artist;
        }
        else if (child.className == "title") {
            child.innerText = description;
        }
        else if (child.className == "date") {
            child.innerText = `(${date})`;
        }
    }
}




//Helper Functions



function isValueCorrect(value, min, max, step = 0.1) {
    return value >= min && value <= max && isInStep(value, step);
}

function isInStep(value, step) {
    const factor = Math.pow(10, getMaxFloatingDigetsCount(value, step));
    return parseInt(value * factor) % parseInt(step * factor) === 0;
}

function getMaxFloatingDigetsCount(a, b) {
    return Math.max((a.toString().split('.')[1] || "").length, (b.toString().split('.')[1] ).length);
}



function setRadioQueryParam(parameter, itemList) {
    if (urlParams.has(parameter)) {
        let value = urlParams.get(parameter);
        let item = itemList.find(elem => elem.value.toLowerCase() === value.toLowerCase());
        if (!item) 
        itemList.forEach(elem => elem.checked = false);
        item.checked = true;
        return item.value;
    }