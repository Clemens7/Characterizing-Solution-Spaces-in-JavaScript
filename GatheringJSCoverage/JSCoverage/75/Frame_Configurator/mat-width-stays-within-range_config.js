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



function functionMatFieldLostFocus() { // hack due to test doing wierd stuff
    matField.value = roundMat(matField.value);
}



var matRange = document.getElementsByName('matWidthR')[0];
var matField = document.getElementsByName('matWidth')[0];


matRange.addEventListener('input', );
matField.addEventListener('input', function (e) {

    matRange.value = e.target.value;
    updatePreview()
    //   console.log("range:" + range.value);
});

function roundMat(numbertoround) {
    var number = parseFloat(numbertoround, 10);
    if (number <= 0) {
        number = 0;
    }
    if (number >= 10) {
        number = 10;
    }
    return Math.round(number * 10) / 10;
}


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

function updatePreview() {
    //get relevant data

    //set button enabled
    document.getElementById("addtocartbutton").disabled = false;


    var img = document.getElementById("preview-image");
    var container = document.getElementById("preview-container");


    let actualSelectedPrintSize;

    for (let printSize of sizeInputs) {
        if (printSize.checked === true) {
            actualSelectedPrintSize = printSize;
            selectedPrintSize = actualSelectedPrintSize.value;
        }
    }
    console.log(actualSelectedPrintSize.value);

    let actualFrameStyle;

    for (let frameStyle of framestyleinputs) {
        if (frameStyle.checked === true) {
            actualFrameStyle = frameStyle;
            selectedFrameStyle = actualFrameStyle.value;
        }
    }
    console.log(actualFrameStyle.value);

    let actualFrameWidth = document.getElementsByName("frameWidth")[0];
    selectedFrameWidth = actualFrameWidth.value;
    console.log(actualFrameWidth.value);

    let actualColor;
    for (let color of matcolorrowinputs) {
        if (color.checked === true) {
            actualColor = color;
            selectedMatColor = actualColor.value;
        }
    }
    console.log(actualColor.value);


    let actualMatWidth = document.getElementsByName("matWidth")[0];
    selectedMatWidth = actualMatWidth.value;
    console.log(actualMatWidth.value);

    render(img, container, actualSelectedPrintSize.value, actualFrameStyle.value, actualFrameWidth.value, actualColor.value, actualMatWidth.value);
    document.getElementById("price").innerHTML = "€ " + calculatePrice(actualSelectedPrintSize.value, actualFrameStyle.value, actualFrameWidth.value, actualMatWidth.value);
    //render(img, container, printSize,       frameStyle,       frameWidth,       matColor,       matWidth)
    //TODO START HERE TOMORROW

    //added by Vylorpe
    var calculatedSize = calculateTotalSize(img, actualSelectedPrintSize.value, actualFrameWidth.value, actualMatWidth.value);
    document.getElementById("total-size").innerHTML = (calculatedSize.chosenSizeX / 10).toFixed(2) + " × " + (calculatedSize.chosenSizeY / 10).toFixed(2) + " cm";

    document.getElementById("print-size-s-label").innerHTML = "Small<br>" + ((getPrintSizes(img).S[0]) / 10).toFixed(1) + "×" + ((getPrintSizes(img).S[1]) / 10).toFixed(1) + " cm";
    document.getElementById("print-size-m-label").innerHTML = "Medium<br>" + ((getPrintSizes(img).M[0]) / 10).toFixed(1) + "×" + ((getPrintSizes(img).M[1]) / 10).toFixed(1) + " cm";
    document.getElementById("print-size-l-label").innerHTML = "Large<br>" + ((getPrintSizes(img).L[0]) / 10).toFixed(1) + "×" + ((getPrintSizes(img).L[1]) / 10).toFixed(1) + " cm";

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
    if (printSize === "M") 
    if (printSize === "L") 

    if (frameStyle === "classic") 
    if (frameStyle === "natural") 
    if (frameStyle === "shabby") 
    if (frameStyle === "elegant") 


    if (frameWidth) 

    if (matColor === "ivory") 
    if (matColor === "mint") 
    if (matColor === "wine") 
    if (matColor === "indigo") 
    if (matColor === "coal") 

    if (matWidth) 
}


// MOVED THIS BECAUSE OF CORS!
/**
 * Calculates the possible print sizes for an image.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @returns A dictionary with fitting sizes for small, medium and large prints.
 *          The keys are 'S', 'M' and 'L' and the entries are two-element arrays [w,h] of width and height.
 */
function getPrintSizes(img) {
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

    return {S: S, M: M, L: L};
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
function render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth) {
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

/**
 * Returns the price of a given frame configuration in euros,
 * as a floating point number rounded to two decimal places.
 *
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 */
function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 0.0;
    price += 30.0;

    let framePrice;
    if (frameStyle === "classic")  else if (frameStyle === "natural") {
        framePrice = 0.8;
    }
    framePrice = framePrice * frameWidth;

    let matPrice = matWidth * 0.05;

    price = price + framePrice + matPrice;

    if (printSize === "M") {
        price = price * 2;
    }
    if (printSize === "L") 

    return parseFloat((Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2)).toFixed(2);
}

// added by Vylorpe

function calculateTotalSize(img, printSize, frameWidth, matWidth) {

    var chosenSizeX = 0;
    var chosenSizeY = 0;

    if (printSize === "S") 

    if (printSize === "M") {
        chosenSizeX = getPrintSizes(img).M[0];
        chosenSizeY = getPrintSizes(img).M[1];
    }

    if (printSize === "L") 

    return {
        chosenSizeX: (chosenSizeX + parseFloat(frameWidth) + parseFloat(matWidth)).toFixed(1),
        chosenSizeY: (chosenSizeY + parseFloat(frameWidth) + parseFloat(matWidth)).toFixed(1)
    };

}

// added by Vylorpe
document.getElementById("price").innerText = "€ 66.95";

//added by Stefü and Vylorpe

artworks = JSON.parse(localStorage.getItem('cart'));

if (artworks === null) {
    let empty = [];
    localStorage.setItem('cart', JSON.stringify(empty));
}

let cartLink = document.getElementById('cart-link');

if (artworks.length !== 0) 