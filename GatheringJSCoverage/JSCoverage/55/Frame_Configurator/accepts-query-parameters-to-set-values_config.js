import {calculatePrice} from "./frame.js";

document.addEventListener('DOMContentLoaded',init,false);
let previewImg;
let artObj;
async function init() {
    cartLinkCounter();
    const frameSlider = document.getElementById('frameWidthR');
    const frameWidth = document.getElementById('frameWidth');
    const matSlider = document.getElementById('matWidthR');
    const matWidth = document.getElementById('matWidth');
    frameWidth.addEventListener('change', synchronizeFrame);
    frameSlider.addEventListener('change', synchronizeFrame);
    matWidth.addEventListener('change',synchronizeMat);
    matSlider.addEventListener('change',synchronizeMat);
    const urlParams = new URLSearchParams(window.location.search);
    setValues(urlParams.get('printSize'),urlParams.get('frameStyle'),urlParams.get('frameWidth'),urlParams.get('matColor'),urlParams.get('matWidth'));
    const inputElems = document.getElementsByTagName('input');
    for (let i = 0;i<inputElems.length;i++) {
        inputElems[i].addEventListener('input',updateRendering);
    }
    if(urlParams.get('objectID') === undefined || urlParams.get('objectID') === null) 
    artObj = await getArtObj(urlParams.get('objectID'));}
export async function getArtObj(objectID) {
    let artObj = null;
    let artCache = JSON.parse(window.localStorage.getItem("artCache"));
    if (artCache!=null) {
        console.log("Cache exists");
        artObj = artCache[objectID];
    }
    if (artObj != null) 
    const imgResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);}
export 






function setValues(printSize = 'M', frameStyle = 'natural', frameWidth = 38, matColor = 'mint', matWidth = 89) {
    switch (printSize) {
        case ('S'): document.getElementById('print-size-s').checked = true;break;
        
        
    }
    switch (frameStyle) {
        case ('classic'): document.getElementById('frame-style-classic').checked = true;break;
        
        
        
    }
    switch (matColor) {
        
        case ('wine'): document.getElementById('mat-color-wine').checked = true;break;
        
        
        
    }
    if (isNaN(frameWidth)) 
    setFrameWidth(frameWidth / 10);
    if (isNaN(matWidth)) 
    setMatWidth(matWidth / 10);
}

/**
 * Calculates the possible print sizes for an image.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @returns A dictionary with fitting sizes for small, medium and large prints.
 *          The keys are 'S', 'M' and 'L' and the entries are two-element arrays [w,h] of width and height.
 */
export 

/**
 * Renders an image within a given square container as a print of a certain size, with a frame and a mat.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @param container The object that contains the Image.
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matColor The color of the mat, as a string.
 * @param matWidth The width of the mat, in millimeters.
 */
export 


function setFrameWidth(value) {
    if (value>5)  else if (value < 2) 
    value = Math.round(value * 10) / 10;
    document.getElementById('frameWidth').value=value;
    document.getElementById('frameWidthR').value=value;
}

function setMatWidth(value) {
    if (value>10)  else if (value < 0) 
    value = Math.round(value * 10) / 10;
    document.getElementById('matWidth').value=value;
    document.getElementById('matWidthR').value=value;
}
function cartLinkCounter(){
    let numberOfItems = JSON.parse(window.localStorage.getItem("cart")) != null  : 0
    if(numberOfItems == 0){
        document.getElementById("cart-link").innerText = `Cart`
    }

}
