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
        
    if (value < min)
        

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






/* Ensure gatherDOMElements has been called */
function addEventListeners() {
    // define event handlers
    const commonTrigger = _ => {
        if(initDone)
    };

    const setFrameWidthHandler = ;
    const setMatWidthHandler = ;
    const radioHandler = (event) => {
        const radioGroupName = event.currentTarget.getAttribute("name");
        const groupElems = document.querySelectorAll(`input[type="radio"][name="${radioGroupName}"]`);
        for (const el of groupElems) {
            el.removeAttribute("checked"); // reset checked status
        }

        event.currentTarget.setAttribute('checked', 'checked');
        commonTrigger();
    };

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



function initPreview() {
    return new Promise((resolve, reject) => {
        formData.objectID = objectData.objectID;

        elems.button.value = objectData.objectID;

        generateArtLabel(objectData, elems.imgLabel);

        elems.img.setAttribute('alt', objectData.title);
        elems.img.setAttribute('src', objectData.primaryImageSmall);

        if (elems.img.complete)  else {
            elems.img.addEventListener('load', );
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
function selectFormOptionById(id) {
    
    const elem = document.getElementById(id);
    if(elem) {
        elem.click();
    }
}

/**
 * Sets the form values and options with the parsed url query parameters.
 * Possible form value parameters: ['printSize', 'frameStyle', 'frameWidth', 'matColor', 'matWidth']
 */
function parseQueryParameters(){
    
    // input values
    if(params.get('frameWidth')){
        try {
            let fw = parseInt(params.get('frameWidth'), 10);
            if(fw > 0){
                fw = fw / 10;
            }

            let clampedFW = clamp(fw,
                MIN_FRAME_WIDTH_CM,
                MAX_FRAME_WIDTH_CM,
                INCREMENT_FACTOR);

            elems.inputFrameWidth.value = clampedFW;
            elems.inputFrameWidthR.value = clampedFW;
        } 
    }
    if(params.get('matWidth')){
        try {
            let mw = parseInt(params.get('matWidth'), 10);
            if(mw > 0){
                mw /= 10;
            }

            let clampedMW = clamp(mw,
                MIN_MAT_WIDTH_CM,
                MAX_MAT_WIDTH_CM,
                INCREMENT_FACTOR);

            elems.inputMatWidth.value = clampedMW;
            elems.inputMatWidthR.value = clampedMW;
        } 
    }

    // radio options
    // id="print-size-s-label"
    if(params.get('printSize')){
        selectFormOptionById(`print-size-${params.get('printSize').toLowerCase()}-label`);
    }
    // id="frame-style-classic-label"
    if(params.get('frameStyle')){
        selectFormOptionById(`frame-style-${params.get('frameStyle').toLowerCase()}-label`);
    }
    // id="mat-color-ivory-label"
    if(params.get('matColor')){
        selectFormOptionById(`mat-color-${params.get('matColor').toLowerCase()}-label`);
    }

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
            
        ).then();
}

init();
