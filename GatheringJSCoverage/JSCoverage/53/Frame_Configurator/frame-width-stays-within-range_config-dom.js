import { Artmart } from "./artmart.js";
import {render, getPrintSizes, calculatePrice, loadPreviewImage} from './frame.js';

/**
 * Updates the Frame Configurator Controls in DOM
 * @param {string} paramPrintSize 
 * @param {string} paramFrameStyle 
 * @param {number} paramFrameWidth in millimeters
 * @param {string} paramMatColor 
 * @param {number} paramMatWidth in millimeters
 */
export function initConfiguratorControls(frameConfig) {
    setPrintSize(frameConfig);
    setWidth(frameConfig);
    setFrameStyle(frameConfig);
    setMatColor(frameConfig);
    setPrice(frameConfig);
}

export async function setPreviewImage(artmart, frameConfig) {
    let previewImage = document.getElementById('preview-image');
    let previewContainer = document.getElementById('preview-container');
    console.info('Loading Preview Image from API')
    let initializedImage = await loadPreviewImage(artmart, previewImage);
    // make sure image is fully loaded before we render frame, to be able to calculate correct image height/width
    render(initializedImage, previewContainer, frameConfig.printSize, frameConfig.frameStyle, frameConfig.frameWidth, frameConfig.matColor, frameConfig.matWidth)
    initializedImage.alt = artmart.objectName;
    setPrintAndTotalSize(initializedImage, frameConfig);
}

export function createLabel(artmart) {
    const labelContainer = document.getElementById('image-label');

    const artist = document.createElement('span');
    artist.className = 'artist';
    artist.innerText = artmart.artistDisplayName;

    const title = document.createElement('span');
    title.className = 'title';
    title.innerText = artmart.title;

    const date = document.createElement('span');
    date.className = 'date';
    date.innerText = ", " + artmart.objectDate;

    labelContainer.appendChild(artist);
    labelContainer.appendChild(title);
    labelContainer.appendChild(date);
}

export function updateConfigurator(frameConfig) {
    console.info('Updating configurator with configuration')
    reRenderPreviewImage(frameConfig);
    setPrice(frameConfig);
    let initializedImage = document.getElementById('preview-image');
    setPrintAndTotalSize(initializedImage, frameConfig);
}

function reRenderPreviewImage(frameConfig) {
    let initializedImage = document.getElementById('preview-image');
    let previewContainer = document.getElementById('preview-container');
    // assumption image is already fully loaded, maybe load image again from cache? TODO
    render(initializedImage, previewContainer, frameConfig.printSize, frameConfig.frameStyle, frameConfig.frameWidth, frameConfig.matColor, frameConfig.matWidth)
}

function setPrintSize(frameConfig) {
    document.getElementById(`print-size-${frameConfig.printSize.toLowerCase()}`).checked = true;
}

function setWidth(frameConfig) {
    let frameWidthNumber = document.querySelector('.config-row input[name="frameWidth"]');
    frameWidthNumber.value = frameConfig.frameWidth/10;

    let matWidthNumber = document.querySelector('.config-row input[name="matWidth"]');
    matWidthNumber.value = frameConfig.matWidth/10;
}

function setFrameStyle(frameConfig) {
    let frameStyle = document.getElementById(`frame-style-${frameConfig.frameStyle}`);
    frameStyle.checked = true;
}

function setMatColor(frameConfig) {
    let matColor = document.getElementById(`mat-color-${frameConfig.matColor}`);
    matColor.checked = true;
}

function setPrintAndTotalSize(image, frameConfig) {
    const printSizes = getPrintSizes(image);
    let printSizeLabelSmall = document.getElementById('print-size-s-label');
    printSizeLabelSmall.innerHTML = `Small <br> ${printSizes['S'][0]/10} x ${printSizes['S'][1]/10}`;
    let printSizeLabelMedium = document.getElementById('print-size-m-label');
    printSizeLabelMedium.innerHTML = `Medium <br> ${printSizes['M'][0]/10} x ${printSizes['M'][1]/10}`;
    let printSizeLabelLarge = document.getElementById('print-size-l-label');
    printSizeLabelLarge.innerHTML = `Large <br> ${printSizes['L'][0]/10} x ${printSizes['L'][1]/10}`;

    let totalSizeOutput = document.getElementById('total-size');
    const actualPrintSize = printSizes[frameConfig.printSize]
    const totalSizeCentimeter = actualPrintSize.map(x => (x + 2*frameConfig.matWidth + 2*frameConfig.frameWidth) / 10);
    totalSizeOutput.innerText = `${totalSizeCentimeter[0]} × ${totalSizeCentimeter[1]} cm`;
}

function setPrice(frameConfig) {
    const price = calculatePrice(frameConfig.printSize, frameConfig.frameStyle, frameConfig.frameWidth, frameConfig.matWidth);
    let priceOutput = document.getElementById('price');
    priceOutput.innerHTML = `&euro; ${price.toFixed(2)}`;
}
