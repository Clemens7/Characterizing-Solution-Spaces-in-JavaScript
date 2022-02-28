import * as frameutil from './frame.js';
import * as util from './util.js';
import {getObject} from './metmuseumAPI.js';
import {Item, Cart, retrieveCart} from './models.js';

//testdata
//without image: http://127.0.0.1:5500/www/config.html?objectID=830999
//with image http://127.0.0.1:5500/www/config.html?objectID=39799

let metObjectGlob;

async function getObjectFromMETApi(objectID) {
    metObjectGlob = await getObject(objectID);
    console.log(metObjectGlob)
    return metObjectGlob;
}

function setupPictureLabel(labelElement, artistDisplayName, title, date) {
    const nameElement = document.createElement("b");
    nameElement.innerText = artistDisplayName;
    labelElement.appendChild(nameElement);

    labelElement.appendChild(document.createElement("br"));

    const titleElement = document.createElement("i");
    titleElement.innerText = title + ", ";
    labelElement.appendChild(titleElement);

    const dateElement = document.createElement("span");
    dateElement.innerText = date;
    labelElement.appendChild(dateElement)
}

function setupPicture(metObject, imgElement, imgContainer, printSize, frameStyle, frameWidth, matColor, matWidth) {
    imgElement.src = metObject.primaryImageSmall;
    frameutil.render(imgElement, imgContainer, printSize, frameStyle, frameWidth*10, matColor, matWidth*10);
}

function setupConfigForm(printSize, frameStyle, frameWidth, matColor, matWidth) {
    util.setRadioButtonByValue(document.getElementsByName("printSize"), printSize);
    util.setRadioButtonByValue(document.getElementsByName("frameStyle"), frameStyle);

    //framwidth to be set in textfield and slider
    document.getElementsByName("frameWidth")[0].value = frameWidth;
    document.getElementsByName("frameWidthR")[0].value = frameWidth;

    util.setRadioButtonByValue(document.getElementsByName("matColor"), matColor);

    //matwidth to be set in textfield and slider
    document.getElementsByName("matWidth")[0].value = matWidth;
    document.getElementsByName("matWidthR")[0].value = matWidth;
}

function setupSizes(imgElement) {
    const printSizes = frameutil.getPrintSizes(imgElement);

    const sPrintSizeLabel = document.getElementById("print-size-s-label");
    const mPrintSizeLabel = document.getElementById("print-size-m-label");
    const lPrintSizeLabel = document.getElementById("print-size-l-label");

    sPrintSizeLabel.innerHTML = `Small<br>${printSizes['S'][0]/10}  × ${printSizes['S'][1]/10} cm`;
    mPrintSizeLabel.innerHTML = `Medium<br>${printSizes['M'][0]/10}  × ${printSizes['M'][1]/10} cm`;
    lPrintSizeLabel.innerHTML = `Large<br>${printSizes['L'][0]/10}  × ${printSizes['L'][1]/10} cm`;
}

function setupPrice(printSize, frameStyle, frameWidth, matWidth) {
    updatePrice(printSize, frameStyle, frameWidth, matWidth);
}


export async function setupConfigurator(objectID, printSize = 'S', frameStyle = 'natural', frameWidth = 4, matColor = 'mint', matWidth = 5.5) {
    setupConfigForm(printSize, frameStyle, frameWidth, matColor, matWidth);

    //check if the met object is correct
    let metObject;
    try {
        metObject =  await getObjectFromMETApi(objectID);
        if (!metObject || !metObject.primaryImageSmall) 
    } 


    const labelElement = document.getElementById("image-label");
    setupPictureLabel(labelElement, metObject.artistDisplayName, metObject.title, metObject.objectDate);

    const imgContainer = document.getElementById("preview-container");
    const imgElement = document.getElementById("preview-image");
    setupPicture(metObject, imgElement, imgContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
    setupSizes(imgElement);
    setupPrice(printSize, frameStyle, frameWidth, matWidth);
}

function render() {
    const imgContainer = document.getElementById("preview-container");
    const imgElement = document.getElementById("preview-image");
    const printSize = util.getActiveRadioValue(document.getElementsByName("printSize"));
    const frameStyle = util.getActiveRadioValue(document.getElementsByName("frameStyle"));
    const frameWidth = document.getElementsByName("frameWidth")[0].value;
    const matColor = util.getActiveRadioValue(document.getElementsByName("matColor"));
    const matWidth = document.getElementsByName("matWidth")[0].value;
    console.log(`Calling render with printSize=${printSize}, frameStyle=${frameStyle}, frameWidth=${frameWidth*10}, matColor=${matColor}, matWidth=${matWidth*10}`);
    frameutil.render(imgElement, imgContainer, printSize, frameStyle, frameWidth*10, matColor, matWidth*10);
    updatePrice(printSize, frameStyle, frameWidth, matWidth);
}

function updatePrice(printSize, frameStyle, frameWidth, matWidth) {
    const priceField = document.getElementById("price");
    const price = frameutil.calculatePrice(printSize, frameStyle, frameWidth*10, matWidth*10);
    priceField.innerText = `€ ${price.toFixed(2)}`;
    return price;
}

export function onRadioFormChange(radioButton, value = radioButton.value) {
    util.setRadioButtonByValue(document.getElementsByName(radioButton.name), value);
    render();
}

export 

export function onTextInputWithCorrespondingSliderChange(textInput) {
    textInput.value = util.round(Number(textInput.value),1);

    const sliderForTextInput = document.getElementsByName(textInput.name + "R")[0];
    if (sliderForTextInput) {
        sliderForTextInput.value = textInput.value;
    }
    util.validateAndResetSliderAndTextInputForRange(sliderForTextInput, textInput);

    render();
} 

export 