import StorageHandler from './storage-handler.js';
import {render, getPrintSizes, calculatePrice} from "./frame.js";
import {searchByObjectIDs} from "./search.js";
import {showItemsDynamically} from "./cart.js";

window.onload = function () {
    init();
    document.getElementById('config-form').onsubmit = ;
    showItemsDynamically();
};

function init() {
    const objectID = readURLParam('objectID');
    if (objectID === null) 
    searchByObjectIDs([+objectID]).then(items => {
        const item = items[0];
        // check if item exist
        if (item.message) 
        setupListeners(item);
        const img = document.getElementById('preview-image');
        img.src = item.primaryImageSmall;
        renderPreview(item);
        addLabelText(item.artistDisplayName, item.title, item.objectDate);
    });

    // set default values
    const printSize = validatePrintSize(readURLParam('printSize'));
    const frameStyle = validateFrameStyle(readURLParam('frameStyle'));
    const frameWidth = validateFrameWidth(readURLParam('frameWidth'));
    const matColor = validateMatColor(readURLParam('matColor'));
    const matWidth = validateMatWidth(readURLParam('matWidth'));

    document.getElementById('frame-style-' + frameStyle).click();
    document.getElementById('mat-color-' + matColor).click();
    document.getElementsByName('matWidth')[0].value = matWidth / 10;
    document.getElementsByName('matWidthR')[0].value = matWidth / 10;
    document.getElementsByName('frameWidthR')[0].value = frameWidth / 10;
    document.getElementsByName('frameWidth')[0].value = frameWidth /10;
    document.getElementById('print-size-' + printSize.toLowerCase()).click();

    writeURLParam('printSize', printSize);
    writeURLParam('frameStyle', frameStyle);
    writeURLParam('frameWidth', frameWidth);
    writeURLParam('matColor', matColor);
    writeURLParam('matWidth', matWidth);

}

function renderPreview(item) {
    let printSize = readURLParam('printSize');
    let frameStyle = readURLParam('frameStyle');
    let frameWidth = readURLParam('frameWidth');
    let matColor = readURLParam('matColor');
    let matWidth = readURLParam('matWidth');
    const previewContainer = document.getElementById('preview-container');
    const img = document.getElementById('preview-image');
    const printSizeValue = validatePrintSize(printSize);
    const frameWidthValue = validateFrameWidth(frameWidth);
    const matWidthValue =  validateMatWidth(matWidth);

    render(img, previewContainer, printSizeValue, validateFrameStyle(frameStyle), frameWidthValue,
        validateMatColor(matColor), matWidthValue);
    document.getElementById('price').innerText = '€ ' + calculatePrice(printSizeValue, validateFrameStyle(frameStyle), frameWidthValue, matWidthValue).toFixed(2);
    const printSizes = getPrintSizes(img);

    document.getElementById('print-size-s-label').innerHTML = `Small <br>${printSizes['S'][0]/10} x ${printSizes['S'][1]/10} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium <br>${printSizes['M'][0]/10} x ${printSizes['M'][1]/10} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large <br>${printSizes['L'][0]/10} x ${printSizes['L'][1]/10} cm`;
    document.getElementById('total-size').innerHTML = `${(printSizes[printSizeValue][0] + frameWidthValue + matWidthValue)/10} x ${(printSizes[printSizeValue][1] + frameWidthValue + matWidthValue)/10} cm`;
    // TODO update centimeter size of small, medium, large and total size in HTML
}

function updateURLParam(param, value, item) {
    writeURLParam(param, value);
    renderPreview(item);
}

function setupListeners(item) {
    const frameWidthR = document.getElementsByName('frameWidthR')[0];
    const frameWidth = document.getElementsByName('frameWidth')[0];
    const matWidthR = document.getElementsByName('matWidthR')[0];
    const matWidth = document.getElementsByName('matWidth')[0];
    const frameClassic = document.getElementById('frame-style-classic');
    const frameNatural = document.getElementById('frame-style-natural');
    const frameShabby = document.getElementById('frame-style-shabby');
    const frameElegant = document.getElementById('frame-style-elegant');
    const frames = [frameClassic, frameElegant, frameNatural, frameShabby];
    const colorIvory = document.getElementById('mat-color-ivory');
    const colorWine = document.getElementById('mat-color-wine');
    const colorMint = document.getElementById('mat-color-mint');
    const colorIndigo = document.getElementById('mat-color-indigo');
    const colorCoal = document.getElementById('mat-color-coal');
    const color = [colorIvory, colorWine, colorMint, colorIndigo, colorCoal];
    const printSizeS = document.getElementById('print-size-s');
    const printSizeM = document.getElementById('print-size-m');
    const printSizeL = document.getElementById('print-size-l');
    const prints = [printSizeS, printSizeM, printSizeL];

    prints.forEach(print => {
        print.onchange = 
    });
    color.forEach(color => {
        color.onchange = 
    });

    frames.forEach(frame => {
        frame.onchange = 
    });

    frameWidthR.onchange   = 
    frameWidth.onchange  = 

    matWidthR.onchange  = 

    matWidth.onchange  = function () {
        if (this.value !== '') {
            this.value = validateMatWidth(this.value * 10) / 10;
        }
        updateURLParam('matWidth', this.value * 10, item);
        matWidthR.value = this.value;
    }
}

function addLabelText(artist, title, date) {
    const spanArtist = document.createElement('span');
    spanArtist.setAttribute('class', 'artist');
    spanArtist.textContent = artist;
    const spanTitle = document.createElement('span');
    spanTitle.setAttribute('class', 'title');
    spanTitle.textContent = title + ', ';
    const spanDate = document.createElement('span');
    spanDate.setAttribute('class', 'date');
    spanDate.textContent = date;
    const labelText = document.getElementById('image-label');
    labelText.appendChild(spanArtist);
    labelText.appendChild(spanTitle);
    labelText.appendChild(spanDate);
}

function validateFrameWidth(value) {
    if (value === null || isNaN(value)) {
        return 40;
    }
    if (value > 50)  else if (value < 20) 
    return Math.round(value);
}

function validateMatWidth(value) {
    if (value === null || isNaN(value)) {
        return 55;
    }
    if (value > 100) {
        return 100;
    } else if (value < 0) {
        return 0;
    }
    return Math.round(value);
}

function validatePrintSize(value) {
    if (value === 'S' || value === 'M' || value === 'L') {
        return value;
    } else {
        return 'M';
    }
}

function validateMatColor(value) {
    if (value === 'ivory' || value === 'mint' || value === 'wine' || value === 'indigo' || value === 'coal') {
        return value;
    } else {
        return 'mint';
    }
}

function validateFrameStyle(value) {
    if (value === 'classic' || value === 'natural' || value === 'shabby' || value === 'elegant') {
        return value;
    } else {
        return 'natural';
    }
}

function readURLParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

function writeURLParam(param, value) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(param,value);
    // set Param without reloading url
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
}
