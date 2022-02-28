import {getPrintSizes, render, calculatePrice} from './frame.js';
import {getArtworkById} from './search.js';
import {addCartEntry, CartEntry, numberOfEntries} from './cart-storage.js'

const configForm = document.getElementById('config-form');
const frameWidthNumber = document.getElementById('frameWidth');
const frameWidthSlider = document.getElementById('frameWidthR');
const matWidthNumber = document.getElementById('matWidth');
const matWidthSlider = document.getElementById('matWidthR');

let imageSizes;

let size = 'M';
let frameWidth = frameWidthNumber.value;
let frameStyle = 'natural';
let matWidth = matWidthNumber.value; 
let matColor = 'mint'
let objectID;

function initSizes() {
    const image = document.getElementById('preview-image');
    imageSizes = getPrintSizes(image);
    
    document.getElementById('print-size-s-label').innerHTML = `Small<br>${imageSizes.S[0] / 10} x ${imageSizes.S[1] / 10} cm`
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${imageSizes.M[0] / 10} x ${imageSizes.M[1] / 10} cm`
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${imageSizes.L[0] / 10} x ${imageSizes.L[1] / 10} cm`
}

function initParams() {
    const paramMap = new URLSearchParams(document.location.search);

    // `printSize`, `frameStyle`, `frameWidth`, `matColor` `matWidth` 
    const objectID = paramMap.get('objectID');
    const frameWidthParam = parseInt(paramMap.get('frameWidth'))
    const frameStyleParam = paramMap.get('frameStyle');
    const matWidthParam = parseInt(paramMap.get('matWidth'));
    const matColorParam = paramMap.get('matColor')
    const printSize = paramMap.get('printSize');

    frameWidth = frameWidthParam  : 40;
    frameWidthNumber.value = frameWidth / 10;
    frameWidthSlider.value = frameWidth / 10;

    matWidth = matWidthParam  : 55
    matWidthNumber.value = matWidth / 10;
    matWidthSlider.value = matWidth / 10;

    size = printSize  : 'M';
    document.querySelector(`input[name="printSize"][value="${size}"]`).checked = true;
    
    frameStyle = frameStyleParam  : 'natural';
    document.querySelector(`input[name="frameStyle"][value="${frameStyle}"]`).checked = true;
    
    matColor = matColorParam  : 'mint';
    document.querySelector(`input[name="matColor"][value="${matColor}"]`).checked = true;
    
    return objectID;
}

document.addEventListener('DOMContentLoaded', () => {
    const numberOfCartItems = numberOfEntries();
    if (numberOfCartItems ) 
    objectID = initParams();
    if (!objectID)  else {
        getArtworkById(objectID).then((artwork) => {
            const imageContainer = document.getElementById('preview-container');
            const image = document.createElement('img');

            image.onload = () => {
                initSizes();
                updateForm();
            }
            image.src = artwork.image;
            image.id = 'preview-image';
            const description = document.createElement('div');
            description.className = 'museum-label'
            description.innerHTML = `
            <span class="artist">${artwork.artist}</span>
            <span class="title">${artwork.title}</span>,
            <span class="date">${artwork.date}</span>`
            imageContainer.appendChild(image);
            imageContainer.appendChild(description);
        }, )
    }
})

configForm.addEventListener('submit', )        

frameWidthNumber.onchange = () => {
    frameWidthNumber.value = Math.round(parseFloat(frameWidthNumber.value)*10)/10;
    if (frameWidthNumber.value) {        
        const value = parseFloat(frameWidthNumber.value);
        if (value < parseFloat(frameWidthNumber.min))  else if (value > parseFloat(frameWidthNumber.max)) 
        frameWidthSlider.value = frameWidthNumber.value;
        frameWidth = frameWidthNumber.value * 10;
        updateForm();
    }
}    

frameWidthSlider.oninput =     

matWidthSlider.oninput = 

matWidthNumber.onchange = 

document.getElementsByName('printSize').forEach(a => {
    a.oninput = 
});

document.getElementsByName('frameStyle').forEach(a => {
    a.oninput = 
})

document.getElementsByName('matColor').forEach(a => {
    a.oninput = 
})

function updateForm() {
    document.getElementById('price').innerHTML = `€ ${calculatePrice(size, frameStyle, frameWidth, matWidth).toFixed(2)}`
    document.getElementById('total-size').innerText = getFullSizeText()
    renderFromImage();
}

function renderFromImage() {
    const image = document.getElementById('preview-image');
    const imageContainer = document.getElementById('preview-container')

    render(image, imageContainer, size, frameStyle, frameWidth, matColor, matWidth);
}

function getFullSizeText() {
    const width = imageSizes[size][0] + 2 * matWidth / 10 + 2 * frameWidth / 10
    const height = imageSizes[size][1] + 2 * matWidth / 10 + 2 * frameWidth / 10
    return `${width/10} x ${height/10} cm`
}

