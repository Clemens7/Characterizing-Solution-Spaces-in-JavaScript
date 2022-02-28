import * as CONSTANTS from "../constants.js";
import * as Museum_API from "../museum/museum-api.js"
import * as Config_DOM from "./config-dom.js";
import * as Frame from "../../frame.js";
import * as CacheApi from "../cache-api.js"
import {loadCartLink} from "../cart-service.js";

// params
const urlParams = new URLSearchParams(window.location.search);
const objectID = urlParams.get(CONSTANTS.ARTWORK_OBJECT_ID);
let printSize = urlParams.get(CONSTANTS.ARTWORK_PRINT_SIZE);
let frameStyle = urlParams.get(CONSTANTS.ARTWORK_FRAME_STYLE);
let frameWidth = urlParams.get(CONSTANTS.ARTWORK_FRAME_WIDTH)/10;
let matColor = urlParams.get(CONSTANTS.ARTWORK_MAT_COLOR);
let matWidth = urlParams.get(CONSTANTS.ARTWORK_MAT_WIDTH)/10;

// DOM element refs
const previewImageElement = new Config_DOM.PreviewImageDocumentElement();
const previewImageLabelElement = new Config_DOM.PreviewImageLabelDocumentElement();
const printSizeSLabelText = new Config_DOM.TextDocumentElement('print-size-s-label-text');
const printSizeMLabelText = new Config_DOM.TextDocumentElement('print-size-m-label-text');
const printSizeLLabelText = new Config_DOM.TextDocumentElement('print-size-l-label-text');
const totalPrintSize = new Config_DOM.TextDocumentElement('total-size');
const totalPrice = new Config_DOM.TextDocumentElement('price');
const frameWidthInput = document.getElementById('frame-width-input');
const matWidthInput = document.getElementById('mat-width-input');
const frameWidthRange = document.getElementById('frame-width-slider');
const matWidthRange = document.getElementById('mat-width-slider');

// onload code
loadCartLink();
if (printSize)  else {
    loadPrintSize();
}
if (frameStyle)  else {
    loadFrameStyle();
}
if (frameWidth !== undefined && frameWidth !== null) {
    let frameWidthInput = document.getElementById('frame-width-input');
    let defaultValue = frameWidthInput.value;
    frameWidthInput.value = frameWidth;
    calculateValue(frameWidthInput, defaultValue);
    updateFrameRangeSlider(frameWidthInput);
}
if (matColor)  else {
    loadMatColor();
}
if (matWidth !== undefined && matWidth !== null) {
    let matWidthInput = document.getElementById('mat-width-input');
    let defaultValue = matWidthInput.value;
    matWidthInput.value = matWidth;
    calculateValue(matWidthInput, defaultValue);
    updateMatRangeSlider(matWidthInput);
}
if (objectID !== undefined && objectID !== null) {
    Museum_API.retrieveByObjectId(objectID).then(object => loadPreviewImage(object), );
}

// event listener
frameWidthInput.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') 
});

frameWidthInput.addEventListener("focusout", function(event) {
    calculateValue(frameWidthInput, 4);
    updateFrameRangeSlider(frameWidthInput, 4);
    renderPreviewImage();
});

matWidthInput.addEventListener("keypress", );

matWidthInput.addEventListener("focusout", );

document.getElementById('config-form').addEventListener("submit", );


// functions
function loadPreviewImage(object) {
    previewImageElement.setImageSource(object.primaryImage).then(() => {
        loadPrintSizes();
        renderPreviewImage();
    });
    previewImageLabelElement.setLabel(object.artistDisplayName, object.title, object.objectDate);
}

function loadPrintSizes() {
    let printSizes = Frame.getPrintSizes(previewImageElement.element);
    printSizeSLabelText.setInnerText(`${printSizes['S'][0]/10} x ${printSizes['S'][0]/10} cm`);
    printSizeMLabelText.setInnerText(`${printSizes['M'][0]/10} x ${printSizes['M'][0]/10} cm`);
    printSizeLLabelText.setInnerText(`${printSizes['L'][0]/10} x ${printSizes['L'][0]/10} cm`);
}

function loadTotalPrintSize() {
    let selectedPrintSize = Frame.getPrintSizes(previewImageElement.element)[printSize];
    let toAdd = 20 * matWidth + 20 * frameWidth;
    selectedPrintSize[0] += toAdd;
    selectedPrintSize[1] += toAdd;
    totalPrintSize.setInnerText(`${selectedPrintSize[0]/10} x ${selectedPrintSize[0]/10} cm`);
}

function loadTotalPrice() {
    totalPrice.setInnerText(`€ ${Frame.calculatePrice(printSize, frameStyle, 10*frameWidth, 10*matWidth).toFixed(2)}`);
}

function loadPrintSize(){
    printSize = document.querySelector('input[name="printSize"]:checked').value;
}
function loadFrameStyle() {
    frameStyle = document.querySelector('input[name="frameStyle"]:checked').value;
}
function loadFrameWidth() {
    frameWidth = frameWidthInput.value;
}
function loadMatColor() {
    matColor = document.querySelector('input[name="matColor"]:checked').value;
}
function loadMatWidth() {
    matWidth = matWidthInput.value;
}

window.renderPreviewImage = renderPreviewImage;
function renderPreviewImage() {
    loadPrintSize();
    loadFrameStyle();
    loadFrameWidth();
    loadMatColor();
    loadMatWidth();
    let previewContainer = document.getElementById('preview-container');
    Frame.render(previewImageElement.element, previewContainer, printSize, frameStyle, 10*frameWidth, matColor, 10*matWidth);
    // console.log(printSize + "\n" + frameStyle + "\n" + frameWidth + "\n" + matColor + "\n" + matWidth);
    loadTotalPrintSize();
    loadTotalPrice();
}

window.updateFrameWidthInput = updateFrameWidthInput;


window.updateMatWidthInput = updateMatWidthInput;


window.updateFrameRangeSlider = updateFrameRangeSlider;
function updateFrameRangeSlider(element) {
    frameWidthRange.value = element.value;
}

window.updateMatRangeSlider = updateMatRangeSlider;
function updateMatRangeSlider(element) {
    matWidthRange.value = element.value;
}

window.calculateValue = calculateValue;
function calculateValue(element, defaultValue) {
    let value = element.value;
    const min = element.min;
    const max = element.max;
    if (value && value.length > 0) {
        value = Math.round((value) * 10) / 10;
        value = Math.max(value, min);
        value = Math.min(value, max);
    }
    element.value = value;
}

window.addToCart = addToCart;

