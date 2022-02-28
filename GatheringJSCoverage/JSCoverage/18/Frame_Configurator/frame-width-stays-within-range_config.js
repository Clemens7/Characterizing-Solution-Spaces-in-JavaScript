import * as SearchAPI from './search.js';
import * as FrameAPI from './frame.js';
import {retrieve, store} from './search-cache.js';
import * as ConfigDomAPI from './config-dom.js';

export async function constructConfig(params) {
    //Paramenter
    var objectID = parseInt(params.get('objectID'));
    var printSize = params.get('printSize');
    var frameStyle = params.get('frameStyle');
    var frameWidth = parseFloat(params.get('frameWidth'));
    var matColor = params.get('matColor');
    var matWidth = parseFloat(params.get('matWidth'));

    //if ObjectID is not a number -> return tu search
    if (!Number.isFinite(objectID)) 

    //Initialize all Inputparam
    const priceElement = document.getElementById('price');

    const frameSliderElement = document.getElementById('frame-slider');
    const frameTextboxElement = document.getElementById('frame-text-box');

    const matSliderElement = document.getElementById('mat-slider');
    const matTextboxElement = document.getElementById('mat-text-box');

    matWidth = normalizeMatWidth(matWidth, true);
    frameWidth = normalizeFrameWidth(frameWidth, true);

    //Setting the parameters of the GUI
    initialSetParameter(printSize, frameStyle, frameWidth, matColor, matWidth);

    const previewContainerElement = document.getElementById('preview-container');
    const previewImageElement = document.getElementById('preview-image');

    const totalSizeWithFrameElement = document.getElementById('total-size');


    // check for valid parameters and set to default if not
    if ((printSize != 'S') && (printSize != 'M') && (printSize != 'L')) {
        printSize = 'M';
    }

    if ((frameStyle != 'classic') && (frameStyle != 'shabby') && (frameStyle != 'elegant') && (frameStyle != 'natural')) {
        frameStyle = 'natural'
    }

    if ((matColor != 'ivory') && (matColor != 'wine') && (matColor != 'indigo') && (matColor != 'coal') && (matColor != 'mint')) {
        matColor = 'mint';
    }


    //check if cached
    const cacheObject = retrieve(objectID);
    var fetchedPicture = [];
    if (cacheObject == null ) {
        //Fetching Picture if not cached-> see if existing
        fetchedPicture = await ObjectIDFetch(objectID);
        //cache object
        store(objectID, fetchedPicture);
    }


    var imageSize = {};

    previewImageElement.src = fetchedPicture.primaryImageSmall;

    previewImageElement.onload = function () {
        imageSize = FrameAPI.getPrintSizes(previewImageElement);
        FrameAPI.render(previewImageElement, previewContainerElement, printSize, frameStyle, frameWidth, matColor, matWidth);
        setPrintSizesDOM(imageSize, previewImageElement);
        updateTotalSize(imageSize, totalSizeWithFrameElement, matWidth, frameWidth);
    };

    ConfigDomAPI.setLabel(fetchedPicture);

    //Listener for GUI
    frameSliderElement.addEventListener('input', , false);

    frameTextboxElement.addEventListener('change', function () {
        frameWidth = frameTextboxElement.value;
        frameWidth = normalizeFrameWidth(frameWidth);

        frameSliderElement.value = frameWidth;
        frameTextboxElement.value = frameWidth;

        FrameAPI.render(previewImageElement, previewContainerElement, printSize, frameStyle, frameWidth, matColor, matWidth);
        updatePrice(priceElement, printSize, frameStyle, frameWidth, matWidth);
        updateTotalSize(imageSize, totalSizeWithFrameElement, matWidth, frameWidth)
    }, false);

    matSliderElement.addEventListener('input', , false);

    matTextboxElement.addEventListener('change', , false);

    const frameStyleElements = document.getElementsByName('frameStyle');
    for (let tmp of frameStyleElements) {
        tmp.addEventListener('input', , false);
    }

    const matColorElements = document.getElementsByName('matColor');
    for (let matColorElement of matColorElements) {
        matColorElement.addEventListener('input', , false);
    }

    const printSizeElements = document.getElementsByName('printSize');
    for (let printSizeElement of printSizeElements) {
        printSizeElement.addEventListener('input', , false);
    }

    updatePrice(priceElement, printSize, frameStyle, frameWidth, matWidth);
}


function initialSetParameter(printSize, frameStyle, frameWidth, matColor, matWidth) {
    const printSizeSElement = document.getElementById('print-size-s');
    const printSizeMElement = document.getElementById('print-size-m');
    const printSizeLElement = document.getElementById('print-size-l');

    const frameSliderElement = document.getElementById('frame-slider');
    const frameTextboxElement = document.getElementById('frame-text-box');

    const frameStyleClassicElement = document.getElementById('frame-style-classic');
    const frameStyleNaturalElement = document.getElementById('frame-style-natural');
    const frameStyleShabbyElement = document.getElementById('frame-style-shabby');
    const frameStyleElegantElement = document.getElementById('frame-style-elegant');

    const matSliderElement = document.getElementById('mat-slider');
    const matTextboxElement = document.getElementById('mat-text-box');

    const matColorIvoryElement = document.getElementById('mat-color-ivory');
    const matColorMintElement = document.getElementById('mat-color-mint');
    const matColorWineElement = document.getElementById('mat-color-wine');
    const matColorIndigoElement = document.getElementById('mat-color-indigo');
    const matColorCoalElement = document.getElementById('mat-color-coal');

    const finishedObject = [];
    if (printSize == 'S')  else if (printSize == 'L')  else {
        printSizeMElement.checked = true;
    }


    frameSliderElement.value = frameWidth;
    frameTextboxElement.value = frameWidth;

    if (frameStyle == 'classic')  else if (frameStyle == 'shabby')  else if (frameStyle == 'elegant')  else {
        frameStyleNaturalElement.checked = true;
    }

    matSliderElement.value = matWidth;
    matTextboxElement.value = matWidth;

    if (matColor == 'ivory')  else if (matColor == 'wine')  else if (matColor == 'indigo')  else if (matColor == 'coal')  else {
        matColorMintElement.checked = true;
    }

};


async function ObjectIDFetch(ObjectIDQuery) {
    let pictureFetched = await SearchAPI.getObjectsFromSearch([ObjectIDQuery]);

    // if pic doesn't exist redirect
    if (!pictureFetched[0].primaryImageSmall)  else {
        return pictureFetched[0];
    }}


function normalizeMatWidth(matWidthOriginal, comesFromURL = false) {
    let matWidth = parseFloat(matWidthOriginal);

    if (!Number.isFinite(matWidth)) {
        return 5.5;
    }};


function normalizeFrameWidth(frameWidthOriginal, comesFromURL = false) {
    let frameWidth = parseFloat(frameWidthOriginal);

    if (!Number.isFinite(frameWidth)) {
        return 4;
    } else if (comesFromURL) 

    if (frameWidth < 2) {
        return 2;
    } else if (frameWidth > 5) {
        return 5;
    }

    frameWidth = parseFloat((Math.round(frameWidth * 10) / 10).toFixed(1));

    if (Number.isInteger(frameWidth)) {
           return parseInt(frameWidth.toString());
    }

    return frameWidth;
};


function setPrintSizesDOM(imageSize, previewImageElement) {
    const printSizeSElement = document.getElementById('print-size-s-num');
    const printSizeMElement = document.getElementById('print-size-m-num');
    const printSizeLElement = document.getElementById('print-size-l-num');

    //imageSize = FrameAPI.getPrintSizes(previewImageElement);
    printSizeSElement.innerText = `${parseFloat(imageSize.S[0]) / 10} × ${parseFloat(imageSize.S[1]) / 10}`;
    printSizeMElement.innerText = `${parseFloat(imageSize.M[0]) / 10} × ${parseFloat(imageSize.M[1]) / 10}`;
    printSizeLElement.innerText = `${parseFloat(imageSize.L[0]) / 10} × ${parseFloat(imageSize.L[1]) / 10}`;
}


function updatePrice(priceElement, printSize, frameStyle, frameWidth, matWidth) {
    let currentPrice = FrameAPI.calculatePrice(printSize, frameStyle, frameWidth * 10, matWidth * 10);
    priceElement.innerText = `€ ${(Math.round(currentPrice * 100) / 100).toFixed(2)}`;
}


function updateTotalSize(imageSize, totalSizeWithFrameElement, matWidth, frameWidth) {
    const checkedSize = document.querySelector('input[name="printSize"]:checked').value;
    const totalWidthAdd = (parseInt(matWidth) * 10 + parseInt(frameWidth) * 10) * 2;
    var totalWidth = (imageSize[checkedSize][0] + totalWidthAdd) / 10;
    var totalHeight = (imageSize[checkedSize][1] + totalWidthAdd) / 10;
    totalSizeWithFrameElement.innerText = `${totalWidth} × ${totalHeight} cm`;
}


