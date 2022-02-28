import {render,calculatePrice} from "../frame.js";
import {cart} from "./cart_objects.js";

setEventListeners();

let urlParams2 = new URLSearchParams(window.location.search);
setOptionalParams(urlParams2.get('printSize'), urlParams2.get('frameStyle'), urlParams2.get('frameWidth'), urlParams2.get('matColor'), urlParams2.get('matWidth'));


function setOptionalParams(printSize, frameStyle, frameWidth, matColor, matWidth) {
    console.log(printSize);
    if (printSize != undefined) {
        checkElementIfDOMExists(document.getElementById(`print-size-${printSize.charAt(0).toLowerCase()}`));
    }
    if (frameStyle != undefined ) {
        checkElementIfDOMExists(document.getElementById(`frame-style-${frameStyle.toLowerCase()}`));
    }
    if (frameWidth != undefined && !isNaN(frameWidth) && frameWidth >= 20 && frameWidth <= 50) {
        var frameWidthElement = document.getElementsByName('frameWidth')[0];
        var frameWidthRElement = document.getElementsByName('frameWidthR')[0];
        frameWidthElement.value = Math.round(frameWidth)/10;
        frameWidthRElement.value = Math.round(frameWidth)/10;
    }
    if (matColor != undefined) {
        checkElementIfDOMExists(document.getElementById(`mat-color-${matColor.toLowerCase()}`));
    }
    if (matWidth != undefined && !isNaN(frameWidth) && frameWidth >= 0 && frameWidth <= 100) {
        var matWidthElement = document.getElementsByName('matWidth')[0];
        var matWidthRElement = document.getElementsByName('matWidthR')[0];
        matWidthElement.value =Math.round(matWidth)/10;
        matWidthRElement.value = Math.round(matWidth)/10;
    }
}

function checkElementIfDOMExists(dom){
    if(dom != undefined){
        dom.checked = true;
    }
}

function setEventListeners() {

    let frameWidth = document.getElementsByName('frameWidth')[0];
    let frameWidthR = document.getElementsByName('frameWidthR')[0];
    let matWidth = document.getElementsByName('matWidth')[0];
    let matWidthR = document.getElementsByName('matWidthR')[0];
    let updateDomElements = document.querySelectorAll('[name="printSize"], [name="frameStyle"], [name="matColor"]');
    for (let element of updateDomElements) {
        element.addEventListener('click', );
    }

    let submit = document.getElementsByClassName('buy')[0];

    let changeFrameWidth = ;
    let changeFrameWidthR = ;
    let changeMatWidth = ;
    let changeMatWidthR = ;

    frameWidth.addEventListener("change", changeFrameWidth);
    frameWidthR.addEventListener("change", changeFrameWidthR);
    matWidth.addEventListener("change", changeMatWidth);
    matWidthR.addEventListener("change", changeMatWidthR);
    let form = document.getElementById('config-form');
    form.onsubmit = ;
    submit.addEventListener('click', );


}



export 



