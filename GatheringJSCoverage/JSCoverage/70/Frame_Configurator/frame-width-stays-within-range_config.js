import * as Frame from './frame.js'
import * as Cache from './cache.js'
import { generateArtLabel } from './artmart-dom.js';

const possibleQueryParams = ['objectID', 'printSize', 'frameStyle', 'frameWidth', 'matColor', 'matWidth'];
const sizeLabels = { 'S': 'Small<br>', 'M': 'Medium<br>', 'L': 'Large<br>' };
const hostURL = document.location;
const params = new URLSearchParams(document.location.search);
const MIN_FRAME_WIDTH_CM = 2.0;
const MAX_FRAME_WIDTH_CM = 5.0; // in cm
const MIN_MAT_WIDTH_CM = 0.0; // in cm
const MAX_MAT_WIDTH_CM = 10.0; // in cm
const INCREMENT_FACTOR = 10;

const elems = {};
const formData = {
    objectID: null,
    printSize: 'M',
    frameStyle: 'natural',
    frameWidth: 4,
    matColor: 'mint',
    matWidth: 5.5
}
let objectData = null;
let initDone = false;

//debug info
for (let param of possibleQueryParams) {
    console.log(`query param ${param}=\t${params.get(param)}`);
}

/**
 * Gets all the DOM references required for this view
 * */
function gatherDOMElements() {
    elems.previewContainer = document.getElementById('preview-container');
    elems.img = document.getElementById('preview-image');
    elems.imgLabel = document.getElementById('image-label');

    elems.inputFrameWidth = document.querySelector('input[name="frameWidth"]');
    elems.inputFrameWidthR = document.querySelector('input[name="frameWidthR"]');
    elems.inputMatWidth = document.querySelector('input[name="matWidth"]');
    elems.inputMatWidthR = document.querySelector('input[name="matWidthR"]');

    elems.radioInputs = document.querySelectorAll('input[type="radio"]');

    elems.printSizes = {};
    elems.printSizes.labelS = document.getElementById('print-size-s-label');
    elems.printSizes.labelM = document.getElementById('print-size-m-label');
    elems.printSizes.labelL = document.getElementById('print-size-l-label');

    elems.price = document.getElementById('price');
    elems.totalSize = document.getElementById('total-size');

    elems.button = document.getElementById("object-id");
    elems.form = document.getElementById("config-form");
}

/**
 *  Clamps the value in the interval [min, max].
 *  If incr is given, rounds the value to the nearest incr .
*/
function clamp(value, min, max, incr = 1) {
    if (value > max)
        return max;
    if (value < min)
        return min;

    return Math.round(value * incr) / incr;
}

function updateFormData() {
    const printSizeElem = document.querySelector('input[type="radio"][name="printSize"][checked]');
    const frameStyleElem = document.querySelector('input[type="radio"][name="frameStyle"][checked]');
    const matColorElem = document.querySelector('input[type="radio"][name="matColor"][checked]');

    formData.printSize = printSizeElem.value;
    formData.frameStyle = frameStyleElem.value;
    formData.matColor = matColorElem.value;
    formData.frameWidth = elems.inputFrameWidth.value * 10;
    formData.matWidth = elems.inputMatWidth.value * 10;

    updateUrlParameters();
}

/**
 * Updates the URL parameters
 */
function updateUrlParameters() {
    params.set("printSize", formData.printSize);
    params.set("frameStyle", formData.frameStyle);
    params.set("matColor", formData.matColor);
    params.set("frameWidth", formData.frameWidth);
    params.set("matWidth", formData.matWidth);
    
    window.history.pushState(formData, formData.objectID, `${document.location.pathname.split('?')[0]}?${params}`);
}

/**
 * Recalculates the price for the configuration based on the values in formData
 * Call updateFormData() beforehand.
 * */
function updatePrice() {
    const price = Frame.calculatePrice(formData.printSize, formData.frameStyle, formData.frameWidth, formData.matWidth);
    elems.price.innerHTML = `€ ${price.toFixed(2)}`;
}

function updateView() {
    updateFormData();

    // update the size labels
    const printSizes = Frame.getPrintSizes(elems.img);
    for (let size of ["S", "M", "L"]) {
        elems.printSizes[`label${size}`].innerHTML = `${sizeLabels[size]}${printSizes[size][0] / 10} x ${printSizes[size][1] / 10} cm`;

        if (size === formData.printSize) {
            // update total size
            const outer = (formData.frameWidth + formData.matWidth) / 10 * 2;

            elems.totalSize.innerHTML = `${Math.round(printSizes[size][0] + 10 * outer) / 10} x ${Math.round(printSizes[size][1] + 10 * outer) / 10} cm`;
        }
    }

    // update the preview image/frame configuration
    Frame.render(elems.img, elems.previewContainer, formData.printSize, formData.frameStyle, formData.frameWidth, formData.matColor, formData.matWidth);

    updatePrice();
}



/* Ensure gatherDOMElements has been called */
function addEventListeners() {
    // define event handlers
    const commonTrigger = _ => {
        if(initDone){
            updateView();
        }
    };

    const setFrameWidthHandler = (event) => {
        let currentValue = checkValue(event.currentTarget.value, MIN_FRAME_WIDTH_CM);
        let clampedVal = clamp(parseFloat(currentValue),
            MIN_FRAME_WIDTH_CM,
            MAX_FRAME_WIDTH_CM,
            INCREMENT_FACTOR);
        elems.inputFrameWidth.value = clampedVal;
        elems.inputFrameWidthR.value = clampedVal;
        commonTrigger();
    };
    const setMatWidthHandler = ;
    const radioHandler = ;

    // register event handlers to dom elements
    elems.inputFrameWidth.addEventListener('focusout', setFrameWidthHandler);
    elems.inputFrameWidthR.addEventListener('change', setFrameWidthHandler);
    elems.inputMatWidth.addEventListener('focusout', setMatWidthHandler);
    elems.inputMatWidthR.addEventListener('change', setMatWidthHandler);

    for (let radioBtn of elems.radioInputs) {
        radioBtn.addEventListener('change', radioHandler);
    }

    // overrides the default event for the submit action
    elems.form.addEventListener('submit', )
}

function checkValue(value, defaultValue) {
    if (value){
        return value;
    }}

function initPreview() {
    return new Promise((resolve, reject) => {
        formData.objectID = objectData.objectID;

        elems.button.value = objectData.objectID;

        generateArtLabel(objectData, elems.imgLabel);

        elems.img.setAttribute('alt', objectData.title);
        elems.img.setAttribute('src', objectData.primaryImageSmall);

        if (elems.img.complete)  else {
            elems.img.addEventListener('load', _ => {
                resolve();
            });
            elems.img.addEventListener('error', );
        }
    });
}

function fetchObjectData(objId) {
    //TODO check localstorage?

    return new Promise((resolve, reject) => {

        Cache.getObjectData(objId).then((dataObj) => {

            if (!dataObj.primaryImageSmall)  else {
                resolve(dataObj);
            }
        })
    });
}

/**
 * Selects the given element by triggering click if the element exists
 * */


/**
 * Sets the form values and options with the parsed url query parameters.
 * Possible form value parameters: ['printSize', 'frameStyle', 'frameWidth', 'matColor', 'matWidth']
 */
function parseQueryParameters(){
    
    // input values
    if(params.get('frameWidth'))
    if(params.get('matWidth'))

    // radio options
    // id="print-size-s-label"
    if(params.get('printSize'))
    // id="frame-style-classic-label"
    if(params.get('frameStyle'))
    // id="mat-color-ivory-label"
    if(params.get('matColor'))

    updateFormData();

    return true;
}

function init() {
    if (!params.get('objectID')) 
    
    document.getElementById("cart-link").innerHTML = Cache.generateCartString();

    gatherDOMElements();
    addEventListeners();

    initDone = parseQueryParameters();

    fetchObjectData(params.get('objectID'))
        .then(
            (objData) => {
                objectData = objData;
                // return Promise => wait until initPreview is done before going on with the next .then
                return initPreview();
            },
            
        ).then(_ => {

            updateView();
        });
}

init();
