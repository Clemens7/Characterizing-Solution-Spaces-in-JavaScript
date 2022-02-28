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
    storage =  storage  : {};

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

    img.addEventListener('load', x => {
        renderReady = true;
        showImage();
        updatePrintSizes();
        updateTotalSize();
    })

    img.src = object.primaryImageSmall;
}

function setInitialValues() {
    let printSizeRes = setRadioQueryParam('printSize', printSizeItems);
    if (printSizeRes)
        

    let frameStyleRes = setRadioQueryParam('frameStyle', frameStyleItems);
    if (frameStyleRes)
        

    let matColorRes = setRadioQueryParam('matColor', matColorItems);
    if (matColorRes)
        

    if (urlParams.has('frameWidth')) 

    if (urlParams.has('matWidth')) 
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

    frameWidthNumberInput.addEventListener('change', (evt) => {
        let value = evtValueChecks(evt);

        frameWidthSliderInput.value = value;
        frameWidth = value;

        updatePrice();
        showImage();
        updateTotalSize();
    });
    frameWidthSliderInput.addEventListener('change', );


    matWidthNumberInput.addEventListener('change', );
    matWidthSliderInput.addEventListener('change', );

    document.getElementById('addItemToCartButton').addEventListener('click', );
}

function updatePrice() {
    let price = calculatePrice(printSize, frameStyle, frameWidth, matWidth);
    let priceDisplay = document.getElementById('price');
    priceDisplay.innerText = `€ ${price.toFixed(2)}`;
}

function showImage() {
    if (!renderReady)
        

    const img = document.getElementById('preview-image');
    const container = document.getElementById('preview-container');
    render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
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

function updateTotalSize() {
    if (!(pictureSizes.S && pictureSizes.M && pictureSizes.L)) 
    let total = document.getElementById('total-size');
    let baseSize = pictureSizes[printSize];
    total.innerText = `${baseSize[0] + 2 * matWidth + 2 * frameWidth} × ${baseSize[1] + 2 * matWidth + 2 * frameWidth} cm`
}

function updatePrintSizes() {
    const img = document.getElementById('preview-image');
    pictureSizes = getPrintSizes(img);

    const s = document.getElementById('print-size-s-label');
    const m = document.getElementById('print-size-m-label');
    const l = document.getElementById('print-size-l-label');

    s.innerText = `Small\n\n${pictureSizes.S[0]} × ${pictureSizes.S[1]} cm`
    m.innerText = `Medium\n\n${pictureSizes.M[0]} × ${pictureSizes.M[1]} cm`
    l.innerText = `Large\n\n${pictureSizes.L[0]} × ${pictureSizes.L[1]} cm`
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

function evtValueChecks(evt) {
    const src = evt.srcElement;
    let value = src.value;

    if (!isValueCorrect(src.valueAsNumber, src.min, src.max)) ;
    return value;
}

function setRadioQueryParam(parameter, itemList) {
    if (urlParams.has(parameter)) 
    return undefined;
}