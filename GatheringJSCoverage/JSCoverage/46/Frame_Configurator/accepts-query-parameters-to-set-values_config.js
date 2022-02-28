import {calculatePrice, render, getPrintSizes} from "./frame.js";
import {ArtAPI} from "./artCollectionApi.js";
import {createArtworkLabel} from "./htmlConstructsAPI.js";

const form = document.getElementById('config-form');
const sizeLabels = document.querySelectorAll('.segmented label');

const price = document.getElementById('price');
const totalSize = document.getElementById('total-size');

const cartLink = document.getElementById('cart-link');

const imgContainer = document.getElementById('preview-container');
const img = document.getElementById('preview-image');
const imgLabel = document.getElementById('image-label');

const api = new ArtAPI();

coupleSliderWithNumber(form.matWidth, form.matWidthR);
coupleSliderWithNumber(form.frameWidth, form.frameWidthR);

limitWidths();

const formElementNames = ['frameWidth', 'matWidth', 'printSize', 'frameStyle', 'matColor'];
for(let elementName of formElementNames) {
    Array.from(document.querySelectorAll(`input[name=${elementName}`)).map(
        el => el.addEventListener('change', 
        ))
}

form.addEventListener('submit', );

for (let param of window.location.search.substr(1).split("&").map(param => param.split("="))) { //param is string[][] containing key, value pairs
    switch (param[0]) {
        case "objectID" :
            form['object-id'].value = param[1];
            break;
        case "frameWidth" :
        case "frameWidthR" :
            assingFrameWidth(param[1]/10);
            break;
        case "matWidth" :
        case "matWidthR" :
            assignMatWidth(param[1]/10);
            break;
        case "printSize" :
            select(form.printSize, param[1]);
            break;
        case "frameStyle" :
            select(form.frameStyle, param[1]);
            break;
        case "matColor":
            select(form.matColor, param[1]);
            break;
    }
}

loadImageData();
setPrice();
updateCart();

function select(options, value) {
    for (let selector of options) {
        selector.checked = selector.value === value;
    }
}

function coupleSliderWithNumber(number, slider) {
    number.addEventListener('input', );
    slider.addEventListener('input', );
}

function limitWidths() {
    form.matWidth.addEventListener('change', );
    form.frameWidth.addEventListener('change', );
}

function assignMatWidth(newVal) {
    if (newVal > 10)  else if (newVal < 0)  else if (newVal * 10 !== Math.floor(newVal * 10)) 
    form.matWidth.value = newVal;
    form.matWidthR.value = newVal;
}

function assingFrameWidth(newVal) {
    if (newVal > 5)  else if (newVal < 2)  else if (newVal * 10 !== Math.floor(newVal * 10)) 
    form.frameWidth.value = newVal;
    form.frameWidthR.value = newVal;
}

async function loadImageData() {
    let id = form['object-id'].value;
    const artwork = await api.getObjectById(id);
    if (!artwork || artwork.message === 'ObjectID not found')  else {
        if(!window.localStorage.getItem(id)){
            window.localStorage.setItem(id, JSON.stringify(artwork));
        }
        img.src = artwork.primaryImageSmall;
        imgLabel.replaceWith(createArtworkLabel(artwork));
        img.addEventListener('load', _ => {
            renderImg();
            setSizeOptions();
            setTotalSize();
        });
    }
}

function setPrice() {
    price.innerText = `€ ${calculatePrice(form.printSize.value, form.frameStyle.value, form.frameWidth.valueAsNumber * 10, form.matWidth.valueAsNumber * 10).toFixed(2)}`;
}

function renderImg() {
    render(img, imgContainer, form.printSize.value, form.frameStyle.value, form.frameWidth.value * 10, form.matColor.value, form.matWidth.value * 10);
}

function setSizeOptions() {
    let sizes = getPrintSizes(img);
    let sizeNames = {'S' : 'Small', 'M' : 'Medium', 'L' : 'Large'};
    for (let size of sizeLabels) {
        size.innerHTML = `${sizeNames[size.control.value]}<br> ${parseInt(sizes[size.control.value][0])/10} × ${parseInt(sizes[size.control.value][1])/10} cm`;
    }
}

function setTotalSize() {
    let sizes = getPrintSizes(img)[form.printSize.value];
    sizes = sizes.map(size => parseInt(size) / 10);
    sizes = sizes.map(size => Math.round(10 * (size + form.frameWidth.valueAsNumber + form.matWidth.valueAsNumber + Number.EPSILON)) / 10);
    totalSize.innerText = `${sizes[0]} x ${sizes[1]} cm`;
}

async function updateCart(){
    let cart = await JSON.parse(localStorage.getItem('cart'));
    if(cart)
}