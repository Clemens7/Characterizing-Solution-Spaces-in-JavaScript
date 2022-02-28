import { FrameConfig } from './frame-config.js';
import { FrameConfiguratorDocumentContainer } from './frame-configurator-dom.js';
import * as MetAPI from './met-api.js';

const urlSearchParams = (new URL(document.location)).searchParams;

const objectID = urlSearchParams.get('objectID');
if(!objectID) 

const printSizeQuery = urlSearchParams.get('printSize');
const frameWidthQuery = urlSearchParams.get('frameWidth');
const frameStyleQuery = urlSearchParams.get('frameStyle');
const matWidthQuery = urlSearchParams.get('matWidth');
const matColorQuery = urlSearchParams.get('matColor');
        
var frameConfig = new FrameConfig(printSizeQuery,
    frameWidthQuery,
    frameStyleQuery,
    matWidthQuery,
    matColorQuery);

const frameConfiguratorControls = {
    printSize: undefined,
    frameWidth: undefined,
    frameWidthR: undefined,
    frameStyle: undefined,
    matWidth: undefined,
    matWidthR: undefined,
    matColor: undefined
}

if(document.readyState === 'loading')  else {
    init();
}

var frameConfiguratorDocumentContainer;

function init() {
    initFrameConfiguratorDocumentContainer();
    setFrameConfiguratorArtwork();
    initFrameConfiguratorControls();
    setFrameConfiguratorControls();
    addFrameConfiguratorEventListeners();
}

function initFrameConfiguratorDocumentContainer() {
    frameConfiguratorDocumentContainer = new FrameConfiguratorDocumentContainer();
}

async function setFrameConfiguratorArtwork() {
    let artwork = await MetAPI.getArtwork(objectID);
    if(!artwork || !artwork.primaryImageSmall || artwork.primaryImageSmall.length === 0) 
    frameConfiguratorDocumentContainer.setArtwork(artwork, frameConfig);
}

function initFrameConfiguratorControls() {
    frameConfiguratorControls.printSize = document.querySelectorAll("#config-form input[type='radio'][name='printSize']");
    frameConfiguratorControls.frameWidth = document.querySelector("#config-form input[type='number'][name='frameWidth']");
    frameConfiguratorControls.frameWidthR = document.querySelector("#config-form input[type='range'][name='frameWidthR']");
    frameConfiguratorControls.frameStyle = document.querySelectorAll("#config-form input[type='radio'][name='frameStyle']");
    frameConfiguratorControls.matWidth = document.querySelector("#config-form input[type='number'][name='matWidth']");
    frameConfiguratorControls.matWidthR = document.querySelector("#config-form input[type='range'][name='matWidthR']");
    frameConfiguratorControls.matColor = document.querySelectorAll("#config-form input[type='radio'][name='matColor']");
}

function setFrameConfiguratorControls() {
    setPrintSizeControl();
    setFrameWidthControl();
    setFrameStyleControl();
    setMatWidthControl();
    setMatColorControl();
}

function setPrintSizeControl() {
    const radioGroup = frameConfiguratorControls.printSize;
    for(let radioInput of radioGroup) {
        if(radioInput.value === frameConfig.printSize) {
            radioInput.checked = true;
            radioInput.setAttribute('checked', '');
        } else {
            radioInput.checked = false;
            radioInput.removeAttribute('checked');
        }
    }
}

function setFrameWidthControl() {
    const numberInput = frameConfiguratorControls.frameWidth;
    const rangeInput = frameConfiguratorControls.frameWidthR;

    let frameWidth = frameConfig.frameWidth / 10;

    numberInput.value = frameWidth;
    numberInput.setAttribute('value', frameWidth);

    rangeInput.value = frameWidth;
    rangeInput.setAttribute('value', frameWidth);
}

function setFrameStyleControl() {
    const radioGroup = frameConfiguratorControls.frameStyle;
    for(let radioInput of radioGroup) {
        if(radioInput.value === frameConfig.frameStyle) {
            radioInput.checked = true;
            radioInput.setAttribute('checked', '');
        } else {
            radioInput.checked = false;
            radioInput.removeAttribute('checked');
        }
    }
}

function setMatWidthControl() {
    const numberInput = frameConfiguratorControls.matWidth;
    const rangeInput = frameConfiguratorControls.matWidthR;

    let matWidth = frameConfig.matWidth / 10;

    numberInput.value = matWidth;
    numberInput.setAttribute('value', matWidth);

    rangeInput.value = matWidth;
    rangeInput.setAttribute('value', matWidth);
}

function setMatColorControl() {
    const radioGroup = frameConfiguratorControls.matColor;
    for(let radioInput of radioGroup) {
        if(radioInput.value === frameConfig.matColor) {
            radioInput.checked = true;
            radioInput.setAttribute('checked', '');
        } else {
            radioInput.checked = false;
            radioInput.removeAttribute('checked');
        }
    }
}

function addFrameConfiguratorEventListeners() {
    addFormEventListener();
    addPrintSizeEventListener();
    addFrameWidthEventListener();
    addFrameStyleEventListener();
    addMatWidthEventListener();
    addMatColorEventListener();
}

function addFormEventListener() {
    const form = document.getElementById('config-form');
    form.addEventListener('submit', )
}


function addPrintSizeEventListener() {
    const radioGroup = frameConfiguratorControls.printSize;
    for(let radioButton of radioGroup) {
        radioButton.addEventListener('change', eventListener);
    }
    
    
}

function addFrameWidthEventListener() {
    const numberInput = frameConfiguratorControls.frameWidth;
    const rangeInput = frameConfiguratorControls.frameWidthR;

    numberInput.addEventListener('change', eventListener);
    rangeInput.addEventListener('input', eventListener);

    function eventListener() {
        frameConfig.frameWidth = this.value * 10;
        setFrameWidthControl();
        updateArtwork();
    }
}

function addFrameStyleEventListener() {
    const radioGroup = frameConfiguratorControls.frameStyle;
    for(let radioButton of radioGroup) {
        radioButton.addEventListener('change', eventListener);
    }
    
    
}

function addMatWidthEventListener() {
    const numberInput = frameConfiguratorControls.matWidth;
    const rangeInput = frameConfiguratorControls.matWidthR;

    numberInput.addEventListener('change', eventListener);
    rangeInput.addEventListener('input', eventListener);

    
}

function addMatColorEventListener() {
    const radioGroup = frameConfiguratorControls.matColor;
    for(let radioButton of radioGroup) {
        radioButton.addEventListener('change', eventListener);
    }
    
    
}

function updateArtwork() {
    frameConfiguratorDocumentContainer.renderArtwork(frameConfig);
}