import * as API from './art-api.js';
import * as Frame from "./frame.js";
import * as Cart from "./cart-api.js";

//Connect Frame slider with text input
let frameSlider = document.getElementById('frame-slider');
let frameText = document.getElementById('frame-text');
frameSlider.addEventListener("change", );
frameText.addEventListener("change", () => {
    frameText.value = (Math.round((Number(frameText.value) + Number.EPSILON) * 10) / 10);
    if (frameText.value < 2) {
        frameSlider.value = 2;
        frameText.value = 2;
    }
    if (frameText.value > 5) {
        frameSlider.value = 5;
        frameText.value = 5;
    }
    if (frameText.value >= 2 && frameText.value <= 5) {
        frameSlider.value = frameText.value;
    }
    calculateForm();
});

//Connect mat slider with text input
let matSlider = document.getElementById('mat-slider');
let matText = document.getElementById('mat-text');
matSlider.addEventListener("change", );
matText.addEventListener("change", );

// Size check
let sizeS = document.getElementById('print-size-s');
let sizeM = document.getElementById('print-size-m');
let sizeL = document.getElementById('print-size-l');
sizeS.addEventListener("change", );
sizeM.addEventListener("change", );
sizeL.addEventListener("change", );

// frame style check
let frameStyleClassic = document.getElementById('frame-style-classic');
let frameStyleNatural = document.getElementById('frame-style-natural');
let frameStyleShabby = document.getElementById('frame-style-shabby');
let frameStyleElegant = document.getElementById('frame-style-elegant');
frameStyleClassic.addEventListener("change", );
frameStyleNatural.addEventListener("change", );
frameStyleShabby.addEventListener("change", );
frameStyleElegant.addEventListener("change", );

let matColorIvory = document.getElementById('mat-color-ivory');
let matColorMint = document.getElementById('mat-color-mint');
let matColorWine = document.getElementById('mat-color-wine');
let matColorIndigo = document.getElementById('mat-color-indigo');
let matColorCoal = document.getElementById('mat-color-coal');

matColorIvory.addEventListener("change", );
matColorMint.addEventListener("change", );
matColorWine.addEventListener("change", );
matColorIndigo.addEventListener("change", );
matColorCoal.addEventListener("change", );

let objectID;
let frameWidth;
let matWidth;
let priceElement = document.getElementById('price');
let sizeElement = document.getElementById('total-size');
let printSize;
let frameStyle;
let matColor;
let imageSize = {S: [0, 0], M: [0, 0], L: [0, 0]};

let imageTag = document.getElementById('preview-image');
let container = document.getElementById('preview-container');

let buyButton = document.getElementById('buy');
buyButton.addEventListener("click", );


/**
 * gets the values of checkboxes and sets local variables
 */
function getCheckboxValues() {
    if (sizeS.checked) 
    if (sizeM.checked) {
        printSize = 'M';
    }
    if (sizeL.checked) 

    if (frameStyleElegant.checked) 
    if (frameStyleClassic.checked) 
    if (frameStyleNatural.checked) {
        frameStyle = 'natural'
    }
    if (frameStyleShabby.checked) 

    if (matColorIvory.checked) 
    if (matColorMint.checked) {
        matColor = 'mint'
    }
    if (matColorWine.checked) 
    if (matColorIndigo.checked) 
    if (matColorCoal.checked) 
}

/**
 * Calculates and sets the price and total size of the form
 */
function calculateForm() {
    matWidth = Number(matText.value); // in cm
    frameWidth = Number(frameText.value); // in cm

    getCheckboxValues();

    let price = Frame.calculatePrice(printSize, frameStyle, frameWidth * 10, matWidth * 10);
    priceElement.innerText = `€ ${price.toFixed(2)}`;

    let width = (Math.round(((imageSize[printSize][0] / 10) + 2 * (matWidth + frameWidth) + Number.EPSILON) * 100) / 100);
    let length = (Math.round(((imageSize[printSize][1] / 10) + 2 * (matWidth + frameWidth) + Number.EPSILON) * 100) / 100);
    sizeElement.innerText = `${width} × ${length} cm`;

    Frame.render(imageTag, container, printSize, frameStyle, frameWidth * 10, matColor, matWidth * 10);
}

document.addEventListener("DOMContentLoaded", event => {
    const params = (new URL(document.location)).searchParams;
    objectID = params.get('objectID');
    const loadedPrintSize = params.get('printSize');
    const loadedFrameStyle = params.get('frameStyle');
    const loadedFrameWidth = params.get('frameWidth');
    const loadedMatColor = params.get('matColor');
    const loadedMatWidth = params.get('matWidth');

    setFormLoadValues(loadedPrintSize, loadedFrameStyle, loadedFrameWidth, loadedMatColor, loadedMatWidth);


    Cart.showNumCartItems();

    if (!objectID) 
    loadImage(objectID);
});

/**
 * set form values from query parameters
 * @param loadedPrintSize
 * @param loadedFrameStyle
 * @param loadedFrameWidth
 * @param loadedMatColor
 * @param loadedMatWidth
 */
function setFormLoadValues(loadedPrintSize, loadedFrameStyle, loadedFrameWidth, loadedMatColor, loadedMatWidth) {
    //set Print Size of form
    if (loadedPrintSize ) 

    if (loadedFrameStyle ) 

    if (loadedFrameWidth ) 

    if (loadedMatColor ) 

    if (loadedMatWidth ) 
}

/**
 * redirect user to search page
 */
export 

/**
 * gets Print Sizes and loads into form labels
 * @param img: An Image object "<img>". Note: if the image is not fully loaded yet, results might be unexpected.
 */
function loadImageSize(img) {
    let frameWidth = Frame.getPrintSizes(img);
    let sLabel = document.getElementById('print-size-s-label');
    let mLabel = document.getElementById('print-size-m-label');
    let lLabel = document.getElementById('print-size-l-label');

    sLabel.innerHTML = `Small <br> ${frameWidth.S[0] / 10} x ${frameWidth.S[1] / 10} cm`;
    mLabel.innerHTML = `Medium <br> ${frameWidth.M[0] / 10} x ${frameWidth.M[1] / 10} cm`;
    lLabel.innerHTML = `Large <br> ${frameWidth.L[0] / 10} x ${frameWidth.L[1] / 10} cm`;

    return frameWidth;
}

/**
 * loads image
 * @param objectID: id of image to load from API
 * @return {Promise<void>}
 */
async function loadImage(objectID) {
    let imageTag = document.getElementById('preview-image');
    let imageLabel = document.getElementById('image-label');
    let artwork = await API.get_objects([objectID]);

    const imageLoadPromise = new Promise(resolve => {
      console.log(artwork[0]);
        imageTag.onload = resolve;
        imageTag.src = artwork[0].imageUrl;
        imageLabel.innerHTML = `${artwork[0].artist} <br> ${artwork[0].title} <br></br>${artwork[0].date}`;
        if (!artwork[0].imageUrl) 
    });

    await imageLoadPromise;

    imageSize = loadImageSize(imageTag);
    getCheckboxValues();
    Frame.render(imageTag, container, printSize, frameStyle, Number(frameText.value) * 10, matColor, Number(matText.value) * 10);
    calculateForm();
}