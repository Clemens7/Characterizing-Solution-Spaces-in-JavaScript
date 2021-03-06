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
    artObj = await getArtObj(urlParams.get('objectID'));
    if(!artObj) 
    document.getElementById('preview-image').src = artObj.primaryImage;
    const imgObj = document.getElementById('preview-image');
    imgObj.src = artObj.primaryImageSmall;
    //imgSpace.src = artObj.primaryImage;
    //setSizes(imgSpace);
    document.getElementById('image-label').innerHTML = `<b>${artObj.artistDisplayName}</b></br><i>${artObj.title}</i>, ${artObj.objectDate}`
    previewImg = await loadImg(imgObj);
    setSizes(previewImg);
    updateRendering();

}
export async function getArtObj(objectID) {
    let artObj = null;
    let artCache = JSON.parse(window.localStorage.getItem("artCache"));
    if (artCache!=null) {
        console.log("Cache exists");
        artObj = artCache[objectID];
    }
    if (artObj != null) {
        console.log("From cache");
        return artObj;
    }}
export async function loadImg(artObj) {
    //fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`).then(response => response.json()).then(img => console.log(img))
    return new Promise(((resolve, reject) => {
        let img = artObj;
        img.onload = () => resolve(img)
        img.onerror = reject
    }))
}

function updateRendering(onlyPrice = false) {
    const frameWidth = document.getElementById('frameWidth').value * 10;
    const matWidth = document.getElementById('matWidth').value * 10;
    const price = calculatePrice(getRadioButtonValue('printSize'),
        getRadioButtonValue('frameStyle'), frameWidth, matWidth)
    document.getElementById('price').innerText = `??? ${Number.parseFloat(price).toFixed(2)}`;
    const dims = getPrintSizes(previewImg);
    let totalWidth = frameWidth + matWidth;
    let totalHeight = frameWidth + matWidth;
    switch (getRadioButtonValue('printSize')) {
        
        case 'M':
            totalWidth += dims.M[0];
            totalHeight += dims.M[1];
            break;
        
    }
    document.getElementById('total-size').innerText = `${totalWidth / 10} ?? ${totalHeight / 10}`;
    render(document.getElementById('preview-image'),
        document.getElementById('preview-container'),
        getRadioButtonValue('printSize'),
        getRadioButtonValue('frameStyle'),
        document.getElementById('frameWidth').value * 10,
        getRadioButtonValue('matColor'),
        document.getElementById('matWidth').value * 10);
}

function getRadioButtonValue(name) {
    var radios = document.getElementsByName(name);

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            return radios[i].value;
        }
    }}

function setSizes(img) {
    const sizes = getPrintSizes(img);
    document.getElementById('print-size-s-label').innerHTML = `Small<br>${sizes.S[0] / 10} ?? ${sizes.S[1] / 10}`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${sizes.M[0] / 10} ?? ${sizes.M[1] / 10}`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${sizes.L[0] / 10} ?? ${sizes.L[1] / 10}`;
}
function setValues(printSize = 'M', frameStyle = 'natural', frameWidth = 38, matColor = 'mint', matWidth = 89) {
    switch (printSize) {
        
        
        default: document.getElementById('print-size-m').checked = true;break;
    }
    switch (frameStyle) {
        
        
        
        default: document.getElementById('frame-style-natural').checked = true;break;
    }
    switch (matColor) {
        
        
        
        
        default: document.getElementById('mat-color-mint').checked = true;break;
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
export function getPrintSizes(img) {
    let S = [297, 297]; // A4
    let M = [420, 420]; // A3
    let L = [594, 594]; // A2

    const w = img.naturalWidth;
    const h = img.naturalHeight;

    if (h > w) {
        S[0] = Math.floor(w * S[1] / h);
        M[0] = Math.floor(w * M[1] / h);
        L[0] = Math.floor(w * L[1] / h);
    }

    return { S: S, M: M, L: L };
}

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
export function render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth) {
    const printSizes = getPrintSizes(img);
    const w = printSizes[printSize][0];
    const h = printSizes[printSize][1];

    let x;
    if (w > h)  else {
        x = container.offsetHeight / (h + 2 * matWidth + 2 * frameWidth);
    }

    const frameImageSlices = {
        classic: 115,
        natural: 75,
        shabby: 120,
        elegant: 107
    };

    const matColors = {
        ivory: '#fffff0',
        mint: '#e0e6d4',
        wine: '#50222d',
        indigo: '#29434c',
        coal: '#333a3d',
    };

    img.style.boxSizing = 'border-box';
    img.width = (w + 2 * matWidth + 2 * frameWidth) * x;
    img.height = (h + 2 * matWidth + 2 * frameWidth) * x;
    img.style.borderImageSource = `url(frame-styles/${frameStyle}.jpg)`;
    img.style.borderImageSlice = frameImageSlices[frameStyle];
    img.style.borderWidth = `${frameWidth * x}px`;
    img.style.backgroundColor = matColors[matColor];
    img.style.padding = `${matWidth * x}px`;
}


function setFrameWidth(value) {
    if (value>5)  else if (value < 2) {
        value = 2
    }
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
