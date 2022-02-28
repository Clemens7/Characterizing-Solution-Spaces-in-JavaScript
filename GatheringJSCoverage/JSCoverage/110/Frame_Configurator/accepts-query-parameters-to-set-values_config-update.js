import * as DOM from '../helpers/dom.js';
import * as UTILS from '../helpers/utils.js';
import * as FRAME from '../../frame.js';
import { Configuration } from './configuration.js';

let previewImgLoaded = false;

export function extractConfig() {
    const form = document.querySelector("form#config-form");
    const formData = new FormData(form);
    return new Configuration(
        formData.get("object-id"),
        formData.get("printSize"),
        formData.get("frameStyle"),
        formData.get("frameWidth") * 10.0,
        formData.get("matColor"),
        formData.get("matWidth") * 10.0
    );
}

export function refreshPreview() {
    const previewImg = document.getElementById("preview-image");
    const previewContainer = document.getElementById("preview-container");
    const config = extractConfig();
    FRAME.renderConfig(previewImg, previewContainer, config);
    refreshPrice();
    refreshPrintSizeDesc();
}

export function refreshPrintSizeDesc() {
    if (previewImgLoaded) {
        const previewImg = document.getElementById("preview-image");
        const dimensions = FRAME.getPrintSizes(previewImg);
        const elementIDs = {
            "S": "print-size-s-label",
            "M": "print-size-m-label",
            "L": "print-size-l-label"
        };
        Object.keys(elementIDs).forEach(key => {
            const elem = document.querySelector(`#${elementIDs[key]} span`);
            elem.innerText = `${dimensions[key][0]} x ${dimensions[key][1]}`;
        });
        refreshTotalPrintSizeDesc(dimensions);
    }
}

export function setPreviewImgLoaded() {
    previewImgLoaded = true;
}

function refreshTotalPrintSizeDesc(dimensions) {
    const config = extractConfig();
    const frameSize = 2 * (config.frameWidth + config.matWidth);
    const totalDimensions = dimensions[config.printSize].map(dim => dim + frameSize);
    const elem = document.querySelector(`#total-size span`);
    elem.innerText = `${totalDimensions[0]} x ${totalDimensions[1]}`
}

function refreshPrice() {
    const price = FRAME.calculateConfigPrice(extractConfig()).toFixed(2);
    const priceElem = document.getElementById("price");
    priceElem.innerText = `€ ${price}`;
}

function initListeners() {
    initNumericInputListeners();
    initRadioButtonListeners();
}

function initNumericInputListeners() {
    const sliderPairs = {
        "frameWidth": "frameWidthR",
        "matWidth": "matWidthR"
    };
    Object.entries(sliderPairs).forEach(([key, value]) => {
        const textElem = DOM.getInputElementByName(key);
        const sliderElem = DOM.getInputElementByName(value);

        textElem.addEventListener('change', );
        sliderElem.addEventListener('change', );
    });
}

function initRadioButtonListeners() {
    const elementIDs = [
        "print-size-s",
        "print-size-m",
        "print-size-l",

        "frame-style-classic",
        "frame-style-natural",
        "frame-style-shabby",
        "frame-style-elegant",

        "mat-color-ivory",
        "mat-color-mint",
        "mat-color-wine",
        "mat-color-indigo",
        "mat-color-coal"
    ];
    elementIDs.forEach(id => {
        document.getElementById(id).addEventListener('click', refreshPreview);
    });
}


initListeners();