import * as API from './met-api.js';
import {getQueryParameter, setCartQty} from './helpers.js';
import {render, getPrintSizes, calculatePrice} from "./frame.js";
import * as DOM from "./dom-helpers.js";

/* for shopping cart */
var cartItem = {
    objectID: null,
    printSize: null,
    frameStyle: null,
    frameWidth: null,
    matWidth: null,
    matColor: null
}

/* sets config params in cartItem */
function setFrameConfigParams(printSize, frameStyle, frameWidth, matColor, matWidth) {
    cartItem.printSize = printSize;
    cartItem.frameStyle = frameStyle;
    cartItem.matColor = matColor;
    /* convert from cm to mm */
    cartItem.frameWidth = 10 * frameWidth;
    cartItem.matWidth = 10 * matWidth;
}

const updateConfiguration = () => {
    let img = document.getElementById('preview-image');
    let container = document.getElementById('preview-container');
    const form = document.getElementById('config-form');
    const printSize = form.elements['printSize'].value;
    const frameStyle = form.elements['frameStyle'].value;
    const frameWidth = form.elements['frameWidth'].value;
    const matWidth = form.elements['matWidth'].value;
    const matColor = form.elements['matColor'].value;
    render(img, container,
        printSize,
        frameStyle,
        frameWidth*10,
        matColor,
        matWidth*10);
    /* save config in cartItem */
    setFrameConfigParams(printSize, frameStyle, frameWidth, matColor, matWidth);
    document.getElementById('price').innerText =
        `€ ${calculatePrice(form.elements['printSize'].value,
            form.elements['frameStyle'].value,
            form.elements['frameWidth'].value*10,
            form.elements['matWidth'].value*10).toFixed(2)}`;
    const additional = Number(frameWidth) + Number(matWidth);
    const sizes = getPrintSizes(img)[printSize];
    document.getElementById('total-size').innerText =
        `${additional + sizes[0]} × ${additional + sizes[1]}`;
}

const textFieldSliderConfiguration = (sliderID, textFieldID, minValue, maxValue) => {
    const slider = document.getElementById(sliderID);
    const textField = document.getElementById(textFieldID);
    slider.addEventListener("input", );
    textField.addEventListener("click", );
    textField.addEventListener("focusout", );
    textField.addEventListener("change", );
    if (slider.value < minValue)  else if (slider.value > maxValue) 
    if (textField.value < minValue)  else if (textField.value > maxValue) 
}

const fetchData = async () => {
    const objectID = getQueryParameter('objectID');
    if (objectID) {
        console.log('checking for', objectID);
        const imageData = await API.fetchObjectData(objectID);
        console.log(`received ${imageData}`)
        if (!imageData)  else {
            cartItem.objectID = objectID;
            return imageData;
        }
    }}

const presetConfiguration = async () => {
    const form = document.getElementById('config-form');

    let printSize = getQueryParameter('printSize');
    if (printSize) 
    let frameStyle = getQueryParameter('frameStyle');
    if (frameStyle) 
    let frameWidth = getQueryParameter('frameWidth');
    console.log(frameWidth);
    if (frameWidth) 
    let matColor = getQueryParameter('matColor');
    if (matColor) 
    let matWidth = getQueryParameter('matWidth');
    if (matWidth) 

    let img = document.getElementById('preview-image');
    img.onload = () => {
        console.log('Loaded Image');
        const printSizes = getPrintSizes(img);
        document.getElementById('print-size-s-label').innerHTML = `Small<br>${printSizes.S[0]} × ${printSizes.S[1]}`;
        document.getElementById('print-size-m-label').innerHTML = `Medium<br>${printSizes.M[0]} × ${printSizes.M[1]}`;
        document.getElementById('print-size-l-label').innerHTML = `Large<br>${printSizes.L[0]} × ${printSizes.L[1]}`;
        updateConfiguration();
    };

    const imageData = await fetchData();
    if (imageData) {
        const artist = DOM.setAttributes(DOM.textElement('span', imageData.artist), {class: ['artist']});
        const title = DOM.setAttributes(DOM.textElement('span', `${imageData.title}, `), {class: ['title']});
        const date = DOM.setAttributes(DOM.textElement('span', imageData.year), {class: ['date']});
        const imageLabel = document.getElementById('image-label');
        imageLabel.appendChild(artist);
        imageLabel.appendChild(title);
        imageLabel.appendChild(date);

        img.src = imageData.url;
    }
}


document.addEventListener('DOMContentLoaded', event => {
    textFieldSliderConfiguration('frameSlider', 'frameTextField', 2, 5);
    textFieldSliderConfiguration('matSlider', 'matTextField', 0, 10);
    setCartQty();
    presetConfiguration();
    const inputs = document.querySelectorAll("input[type='radio']");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', updateConfiguration)
        // inputs[i].onchange = updateConfiguration;
    }
});

/**
 * add new artwork with frame configuration to localStorage
 * @param obj cartItem with fields objectID, printsize, frameWidth, frameStyle, matWidth and matColor
 */


const form = document.getElementById("config-form")
form.addEventListener('submit', );

