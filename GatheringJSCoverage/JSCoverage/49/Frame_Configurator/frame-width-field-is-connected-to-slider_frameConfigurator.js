import {calculatePrice, getPrintSizes, render} from './frame.js';
import {$, $all} from './helper.js';
import {getArtObjectByID} from './artStore.js';
import {addObjectToCart} from './cartStore.js';


let updateDeferred = true;

const isValidOption = {
    printSize: ,
    frameStyle: ,
    frameWidth: w => w >= 2 && w <= 5 && Math.floor(w * 10) / 10 === w,
    matColor: ,
    matWidth: ,
};



function getOptionsFromForm() {
    return {
        printSize: $('input[type="radio"][name="printSize"]:checked').value,
        frameStyle: $('input[type="radio"][name="frameStyle"]:checked').value,
        frameWidth: $('input[type="number"][name="frameWidth"]').value,
        matColor: $('input[type="radio"][name="matColor"]:checked').value,
        matWidth: $('input[type="number"][name="matWidth"]').value
    };
}

function getQueryVariable(name) {
    return (new URLSearchParams(window.location.search)).get(name);
}

export async function getArtObject() {
    const objectID = getQueryVariable('objectID');
    if (!objectID) 
    let object = await getArtObjectByID(objectID);
    if (!object) 
    return object;
}

function setRangeOption(name, value) {
    let range = $(`input[type='range'][name='${name}R']`);
    let number = $(`input[type='number'][name='${name}']`);

    if (!isValidOption[name](value)) 

    range.value = value;
    number.value = value;
    updateFrame();
}



export function setOption(option, value) {
    const radioOptions = ['printSize', 'frameStyle', 'matColor'];
    const rangeOptions = ['frameWidth', 'matWidth'];
    if (radioOptions.includes(option))  else if (rangeOptions.includes(option)) {
        setRangeOption(option, value);
    }
}

export function setQueryConfigOptions() {
    for (let option of ['printSize', 'frameStyle', 'frameWidth', 'matColor', 'matWidth']) {
        let value = getQueryVariable(option);
        if (value) 
    }
    updateDeferred = false;
}

export function renderPreview(artObject) {
    let img = document.getElementById('preview-image');

    img.src = artObject.previewImage;
    img.alt = artObject.title + ' by ' + artObject.artist;
    img.onload = () => renderFrame(getOptionsFromForm());

    let labelDiv = document.getElementById('image-label');
    labelDiv.childNodes.forEach();
    labelDiv.appendChild(getDescriptionDOM(artObject));
}

function getDescriptionDOM(artObject) {
    let titleNode = document.createElement('b');
    titleNode.innerHTML = artObject.title+'<br>';

    let artistNode = document.createElement('span');
    artistNode.textContent = artObject.artist;

    let yearNode = document.createElement('i');
    yearNode.textContent = ', '+artObject.year;

    let container = document.createElement('div');
    container.appendChild(titleNode);
    container.appendChild(artistNode);
    container.appendChild(yearNode);

    return container;
}

function renderFrame(options) {
    let img = document.getElementById('preview-image');
    let container = document.getElementById('preview-container');
    render(img, container, options.printSize, options.frameStyle, options.frameWidth, options.matColor, options.matWidth);
    renderPrintSizes(img);
    renderTotalSize(img);
    renderPrice(options);
}

function renderPrintSizes(img) {
    const printSizes = getPrintSizes(img);
    for (let size of ['Small', 'Medium', 'Large']) {
        let c = size[0];
        let s = printSizes[c];
        $(`#print-size-${c.toLowerCase()}-label`).innerHTML = `${size}<br>${s[0]} × ${s[1]} cm`;
    }
}

function renderTotalSize(img) {
    let printSizes = getPrintSizes(img);
    let options = getOptionsFromForm();

    let totalWidth = printSizes[options.printSize][0] + 2 * options.matWidth + 2 * options.frameWidth;
    let totalHeight = printSizes[options.printSize][1] + 2 * options.matWidth + 2 * options.frameWidth;

    $('#total-size').innerText = `${parseFloat(totalWidth).toFixed(1)} × ${parseFloat(totalHeight).toFixed(1)} cm`;
}

function renderPrice(options) {
    let price = calculatePrice(options.printSize, options.frameStyle, options.frameWidth*10, options.matWidth*10);
    $('#price').innerText = `€ ${parseFloat(price).toFixed(2)}`;
}

function updateFrame() {
    if (!updateDeferred) {
        const options = getOptionsFromForm();
        renderFrame(options);
    }
}

export 


