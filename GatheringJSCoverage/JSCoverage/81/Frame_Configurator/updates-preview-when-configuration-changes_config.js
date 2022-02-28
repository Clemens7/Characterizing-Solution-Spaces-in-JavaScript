import {render,calculatePrice} from "../frame.js";
import {cart} from "./cart_objects.js";

setEventListeners();

let urlParams2 = new URLSearchParams(window.location.search);
setOptionalParams(urlParams2.get('printSize'), urlParams2.get('frameStyle'), urlParams2.get('frameWidth'), urlParams2.get('matColor'), urlParams2.get('matWidth'));


function setOptionalParams(printSize, frameStyle, frameWidth, matColor, matWidth) {
    console.log(printSize);
    if (printSize != undefined) 
    if (frameStyle != undefined ) 
    if (frameWidth != undefined ) 
    if (matColor != undefined) 
    if (matWidth != undefined ) 
}



function setEventListeners() {

    let frameWidth = document.getElementsByName('frameWidth')[0];
    let frameWidthR = document.getElementsByName('frameWidthR')[0];
    let matWidth = document.getElementsByName('matWidth')[0];
    let matWidthR = document.getElementsByName('matWidthR')[0];
    let updateDomElements = document.querySelectorAll('[name="printSize"], [name="frameStyle"], [name="matColor"]');
    for (let element of updateDomElements) {
        element.addEventListener('click', function () {
            updateDom()
        });
    }

    let submit = document.getElementsByClassName('buy')[0];

    let changeFrameWidth = function () {
        changeBetweenObjects(frameWidth, frameWidthR, 2, 5);
    };
    let changeFrameWidthR = ;
    let changeMatWidth = function () {
        changeBetweenObjects(matWidth, matWidthR, 0, 10);
    };
    let changeMatWidthR = ;

    frameWidth.addEventListener("change", changeFrameWidth);
    frameWidthR.addEventListener("change", changeFrameWidthR);
    matWidth.addEventListener("change", changeMatWidth);
    matWidthR.addEventListener("change", changeMatWidthR);
    let form = document.getElementById('config-form');
    form.onsubmit = ;
    submit.addEventListener('click', );


}

function changeBetweenObjects(dom1, dom2, min, max) {
    if (!isNaN(dom1.value)) {
        if (dom1.value < min)  else if (dom1.value > max) 
        dom2.value = Math.round(dom1.value*10)/10;
        dom1.value = dom2.value;
    }
    updateDom();
}

export function updateDom() {
    let item = createConfigObject();
    let img = document.getElementById('preview-image');
    render(img,img.parentElement, item['printSize'], item['frameStyle'], item['frameWidth'], item['matColor'], item['matWidth']);
    let price = calculatePrice(item['printSize'], item['frameStyle'], item['frameWidth'], item['matWidth']);
    document.getElementById('price').innerText ="€ "+ price.toFixed(2);
}

function getSelected(name) {
    let elements = document.getElementsByName(name);
    let selected;
    for (let element of elements) {
        if (element.checked === true) selected = element;
    }
    return selected.value;
}

function createConfigObject(){
    let item = new Object();

    item['objectID'] = urlParams2.get('objectID');
    item['printSize'] = getSelected("printSize");
    item['frameStyle'] = getSelected("frameStyle");
    item['frameWidth'] = document.getElementsByName('frameWidth')[0].value;
    item['matColor'] = getSelected('matColor');
    item['matWidth'] = document.getElementsByName('matWidth')[0].value;

    return item;
}