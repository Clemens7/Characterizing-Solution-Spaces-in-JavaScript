let storage = window.localStorage;

const urlParams = new URLSearchParams(location.search);

const printSize = urlParams.get('printSize');
const frameStyle = urlParams.get('frameStyle');
const frameWidth = urlParams.get('frameWidth');
const matColor = urlParams.get('matColor');
const matWidth = urlParams.get('matWidth');

//added by Stef, used for artwork data
let selectedPrintSize;
let selectedFrameStyle;
let selectedFrameWidth;
let selectedMatColor;
let selectedMatWidth;

document.addEventListener('DOMContentLoaded', presetFrameConfigurator(printSize, frameStyle, frameWidth, matColor, matWidth));

const objectId = urlParams.get('objectID');
retrieveArtworkObject(objectId);

var sizeInputs = document.querySelectorAll('.segmented input');
var framestyleinputs = document.querySelectorAll('.frame-style-row input');
var matcolorrowinputs = document.querySelectorAll('.mat-color-row input');
addEventListenersToRemainingInputs();

var frameRange = document.getElementsByName('frameWidthR')[0];
var frameField = document.getElementsByName('frameWidth')[0];

frameRange.addEventListener('input', );
frameField.addEventListener('input', );







var matRange = document.getElementsByName('matWidthR')[0];
var matField = document.getElementsByName('matWidth')[0];


matRange.addEventListener('input', );
matField.addEventListener('input', );




function addEventListenersToRemainingInputs() {
    for (input of sizeInputs) {
        input.addEventListener('change', );
    }

    for (input of framestyleinputs) {
        input.addEventListener('change', );
    }
    for (input of matcolorrowinputs) {
        input.addEventListener('change', );
    }
}




async function retrieveArtworkObject(objectId) {

    if (storage.getItem("artObj" + objectId) != null) 

    if (objectId === undefined || objectId === null)  else {
        const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectId)
            .then(response => {
                if (response.status === 404)  else {
                    response.json().then(_ => {
                        var image = document.getElementById("preview-image");
                        image.setAttribute("src", _.primaryImageSmall);
                        var label = document.getElementById("image-label");
                        label.innerText = _.artistDisplayName + " " + _.title + " " + _.objectDate;
                        storage.setItem("artObj" + objectId, JSON.stringify(_));
                    })
                }
            })

    }
}


function presetFrameConfigurator(printSize, frameStyle, frameWidth, matColor, matWidth) {

    document.getElementById("addtocartbutton").disabled = true;

    var small = document.getElementById("print-size-s");
    var medium = document.getElementById("print-size-m");
    var large = document.getElementById("print-size-l");
    if (printSize === "S") 
    if (printSize === "M") {
        medium.setAttribute("checked", "checked");
    }
    if (printSize === "L") 

    if (frameStyle === "classic") 
    if (frameStyle === "natural") 
    if (frameStyle === "shabby") {
        var d = document.getElementById("frame-style-shabby");
        d.setAttribute("checked", "checked");
    }
    if (frameStyle === "elegant") 


    if (frameWidth) {
        frameWidth = frameWidth / 10;
        if (frameWidth >= 2 && frameWidth <= 5) {
            var d = document.getElementsByName("frameWidth");
            d[0].setAttribute("value", frameWidth);
        }
    }

    if (matColor === "ivory") 
    if (matColor === "mint") {
        var d = document.getElementById("mat-color-mint");
        d.setAttribute("checked", "checked");
    }
    if (matColor === "wine") 
    if (matColor === "indigo") 
    if (matColor === "coal") 

    if (matWidth) {
        matWidth = matWidth / 10;
        if (matWidth >= 0 && matWidth <= 10) {
            var d = document.getElementsByName("matWidth");
            d[0].setAttribute("value", matWidth);
        }

    }
}


// MOVED THIS BECAUSE OF CORS!
/**
 * Calculates the possible print sizes for an image.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @returns A dictionary with fitting sizes for small, medium and large prints.
 *          The keys are 'S', 'M' and 'L' and the entries are two-element arrays [w,h] of width and height.
 */


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


/**
 * Returns the price of a given frame configuration in euros,
 * as a floating point number rounded to two decimal places.
 *
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 */


// added by Vylorpe



// added by Vylorpe
document.getElementById("price").innerText = "??? 66.95";

//added by Stef?? and Vylorpe

artworks = JSON.parse(localStorage.getItem('cart'));

if (artworks === null) 

let cartLink = document.getElementById('cart-link');

if (artworks.length !== 0)  else {
    cartLink.innerText = 'Cart'
}


let toCartButton = document.getElementById("config-form");
toCartButton.addEventListener('submit', );











