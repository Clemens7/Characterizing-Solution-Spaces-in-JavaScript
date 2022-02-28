import {render} from "./frame.js";
import {getPrintSizes} from "./frame.js";
import {calculatePrice} from "./frame.js";

const baseURL = "https://collectionapi.metmuseum.org";
const objURL = "/public/collection/v1/objects/";
const thisURL = new URL(document.location);
let cartLink;

class Artwork {
    constructor(objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
        this.oID = objectID;
        this.pSize = printSize || 'M';
        this.fStyle = frameStyle || 'natural';
        this.fWidth = frameWidth || 4;
        this.mColor = matColor || 'mint';
        this.mWidth = matWidth || 5.5;
    }

    

    setPrintSizes(){
        this.printSizes = getPrintSizes(previewImage);
        printSizeLabelS.innerHTML = `Small<br>${this.printSizes.S[0]/10} × ${this.printSizes.S[1]/10} cm`;
        printSizeLabelM.innerHTML = `Medium<br>${this.printSizes.M[0]/10} × ${this.printSizes.M[1]/10} cm`;
        printSizeLabelL.innerHTML = `Large<br>${this.printSizes.L[0]/10} × ${this.printSizes.L[1]/10} cm`;
    }

    setPrice(){
        let cPrice = calculatePrice(this.pSize, this.fStyle, this.fWidth, this.mWidth).toFixed(2);
        price.innerHTML = `&euro; ${cPrice}`;
    }

    setTotalSize(){
        this.totalSizeX = Math.round(((this.printSizes[this.pSize][0]/10) + (this.fWidth * 2) + (this.mWidth * 2)) *10)/10;
        this.totalSizeY = Math.round(((this.printSizes[this.pSize][1]/10) + (this.fWidth * 2) + (this.mWidth * 2)) *10)/10;
        totalSizeText.innerHTML = `${this.totalSizeX} × ${this.totalSizeY} cm`;
    }

    updateInput() {
        console.log("Updating the view/input!");
        if (this.fWidth !== null) {
            frameWidthText.value = this.fWidth;
            frameWidthText.setAttribute("value", this.fWidth);
            frameWidthRange.value = this.fWidth;
            frameWidthRange.setAttribute("value", this.fWidth);
        }
        if (this.mWidth !== null) {
            matWidthText.value = this.mWidth;
            matWidthText.setAttribute("value", this.mWidth);
            matWidthRange.value = this.mWidth;
            matWidthText.setAttribute("value", this.mWidth);
        }
        if (this.pSize !== null) {
            switch (this.pSize.toUpperCase()) {
                
                case 'M':
                    printSize[0].checked = false;
                    printSize[1].checked = true;
                    printSize[2].checked = false;
                    break;
                
                
            }
        }
        if (this.fStyle !== null) {
            switch (this.fStyle.toLowerCase()) {
                
                case "natural":
                    frameStyle[0].checked = false;
                    frameStyle[1].checked = true;
                    frameStyle[2].checked = false;
                    frameStyle[3].checked = false;
                    break;
                
                
                
            }
        }
        if (this.mColor !== null){
            switch (this.mColor.toUpperCase()) {
                
                case 'MINT':
                    matColor[0].checked = false;
                    matColor[1].checked = true;
                    matColor[2].checked = false;
                    matColor[3].checked = false;
                    matColor[4].checked = false;
                    break;
                
                
                
                
            }
        }
        render(previewImage,pElement,this.pSize, this.fStyle, this.fWidth, this.mColor, this.mWidth);
        this.setPrintSizes();
        this.setPrice();
        this.setTotalSize();
    }
}

let currentArtwork;
let previewImage;
let pElement;
let imageLabelContainer;
let frameWidthText;
let frameWidthRange;
let matWidthText;
let matWidthRange;
let printSize;
let printSizeLabelS;
let printSizeLabelM;
let printSizeLabelL;
let frameStyle;
let matColor;
let price;
let totalSizeText;



function showArtwork(cArtwork) {
    previewImage.src = cArtwork.data.primaryImageSmall;
    previewImage.alt = cArtwork.data.title;
    previewImage.className = "preview";
}

function showLabel(cArtwork) {
    const imageLabel = `<span class="artist">${cArtwork.data.artistDisplayName}</span>
                        <span class="title">${cArtwork.data.title}</span>,
                        <span class="date">${cArtwork.data.objectDate}</span>`;
    imageLabelContainer.innerHTML = imageLabel;
}

async function validateArtwork(cArtwork) {
    if (cArtwork.oID !== undefined && cArtwork.oID !== null) {

        //Load data and cache
        let data  = null;
        let cache = window.localStorage;
        if (cache.getItem(cArtwork.oID)) {
            data = cache.getItem(cArtwork.oID);
            cArtwork.data = JSON.parse(data);
        }

        if (cArtwork.data.message === "ObjectID not found" || cArtwork.data.primaryImageSmall === null) 
    }
    if (cArtwork.fWidth < 2 || cArtwork.fWidth > 5) 
    if (cArtwork.mWidth < 0 || cArtwork.mWidth > 10) 
}

function addInputListeners(){
    frameWidthText.addEventListener("change", );
    frameWidthRange.addEventListener("input", );
    matWidthText.addEventListener("change", );
    matWidthRange.addEventListener("input", );
    for(let i = 0, max = printSize.length; i < max; i++) {
        printSize[i].addEventListener("click", );
    }
    for(let i = 0, max = frameStyle.length; i < max; i++) {
        frameStyle[i].addEventListener("click", );
    }
    for(let i = 0, max = matColor.length; i < max; i++) {
        matColor[i].addEventListener("click", );
    }
}

document.addEventListener("DOMContentLoaded", function () {
    previewImage         = document.getElementById("preview-image");
    imageLabelContainer  = document.getElementById("image-label");
    pElement             = document.getElementById("preview-container");
    frameWidthText       = document.getElementsByName("frameWidth")[0];
    frameWidthRange      = document.getElementsByName("frameWidthR")[0];
    matWidthText         = document.getElementsByName("matWidth")[0];
    matWidthRange        = document.getElementsByName("matWidthR")[0];
    printSize            = document.getElementsByName("printSize"); //array of 3 elements
    printSizeLabelS      = document.getElementById("print-size-s-label");
    printSizeLabelM      = document.getElementById("print-size-m-label");
    printSizeLabelL      = document.getElementById("print-size-l-label");
    frameStyle           = document.getElementsByName("frameStyle"); //array of 4 elements
    matColor             = document.getElementsByName("matColor"); //array of 5 elements
    price                = document.getElementById("price");
    totalSizeText        = document.getElementById("total-size");

    cartLink             = document.getElementById("cart-link");

    let cartObject = JSON.parse(localStorage.getItem('cart'));
    if (cartObject)

    addInputListeners();

    currentArtwork = new Artwork(thisURL.searchParams.get("objectID"),
        thisURL.searchParams.get("printSize"),
        thisURL.searchParams.get("frameStyle"),
        thisURL.searchParams.get("frameWidth") / 10,
        thisURL.searchParams.get("matColor"),
        thisURL.searchParams.get("matWidth") / 10);

    validateArtwork(currentArtwork)
        .then(() => {
            showArtwork(currentArtwork);
            showLabel(currentArtwork);
        }).catch();

    //DEBUG-INFO
    const debug = true;
    if (debug) {
        window.setInterval(, 5000);
    }

    currentArtwork.updateInput();
});









