window.addEventListener('DOMContentLoaded', event => {
    let cart = localStorage.getItem("cart") || "[]";
    cart = JSON.parse(cart);

    document.getElementById("cart-link").innerHTML = "Cart (" + cart.length + ")";
    document.getElementById("config-form").onchange = ;

    document.getElementById("config-form").addEventListener('submit', );
    document.getElementById("preview-image").onload = function () {
        setSizes(this);
        updateImg();
        updatePrice();
        updateSize();
    };
    let frameSlider = document.getElementById("frameSlider");
    let frameSliderInput = document.getElementById("frameSliderInput");

    let matSlider = document.getElementById("matSlider");
    let matSliderInput = document.getElementById("matSliderInput");

    frameSlider.onchange = ;

    frameSliderInput.onchange = ;

    matSlider.onchange = ;

    matSliderInput.onchange = ;
    presetConfiguration();

});

function presetConfiguration() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('objectID') && urlParams.get('objectID') !== "") {
        let objectID = urlParams.get('objectID');
        let img = retrieveImages(objectID);
        if (img)  else {
            httpGet("https://collectionapi.metmuseum.org/public/collection/v1/objects/", objectID);
        }
    }
    if (urlParams.has('printSize')) {
        let printSize = urlParams.get('printSize');
        switch (printSize) {
            
            case 'M':
                document.getElementById("print-size-m").checked = true;
                break;
            
            
        }

    }
    if (urlParams.has('frameWidth')) {
        let frameWidth = urlParams.get('frameWidth');
        if (!isNaN(frameWidth)) {
            document.getElementById("frameSlider").value = checkMinMax(2, 5, frameWidth / 10);
            document.getElementById("frameSliderInput").value = checkMinMax(2, 5, frameWidth / 10);
        }
    }
    if (urlParams.has('frameStyle')) {
        let frameStyle = urlParams.get('frameStyle');
        switch (frameStyle) {
            
            
            case 'shabby':
                document.getElementById("frame-style-shabby").checked = true;
                break;
            
            
        }
    }
    if (urlParams.has('matWidth')) {
        let matWidth = urlParams.get('matWidth');
        if (!isNaN(matWidth)) {
            document.getElementById("matSlider").value = checkMinMax(0, 10, matWidth / 10);
            document.getElementById("matSliderInput").value = checkMinMax(0, 10, matWidth / 10);
        }
    }

    if (urlParams.has('matColor')) {
        let matColor = urlParams.get('matColor');
        switch (matColor) {
            
            case 'mint':
                document.getElementById("mat-color-mint").checked = true;
                break;
            
            
            
            
        }
    }
}

function checkMinMax(min, max, value) {
    value = Math.round(value * 10) / 10;
    if (value < min)  else if (value > max) 
    return value;
}

function httpGet(baseUrl, objectID) {
    return fetch(baseUrl + objectID)
        .then((response) => {
            return response.json();
        })
        .then((img) => {
            if (!img.hasOwnProperty("objectID")) 
            setImage(img)
            storeImages(objectID, img)
        }).catch();
}

function setImage(img) {
    document.getElementById("preview-image").src = img.primaryImageSmall;
    document.getElementById("artist").innerHTML = img.artistDisplayName + "<br>";
    document.getElementById("title").innerHTML = img.title;
    document.getElementById("date").innerHTML = img.objectDate;
}

function setSizes(img) {
    let sizes = getPrintSizes(img);
    document.getElementById("print-size-s-label").innerHTML = "Small<br>" + sizes.S[0] + " ?? " + sizes.S[1] + " cm";
    document.getElementById("print-size-m-label").innerHTML = "Medium<br>" + sizes.M[0] + " ?? " + sizes.M[1] + " cm";
    document.getElementById("print-size-l-label").innerHTML = "Large<br>" + sizes.L[0] + " ?? " + sizes.L[1] + " cm";
}

function updateSize() {
    let size = displayRadioValue("printSize");

    let sizes = getPrintSizes(document.getElementById("preview-image"));

    let frameWidth = document.getElementById("frameSlider").value;
    let matWidth = document.getElementById("matSlider").value;

    switch (size) {
        
        case "M":
            sizes = sizes.M;
            break;
        
        
    }

    sizes[0] -= -frameWidth;
    sizes[0] -= -matWidth;

    sizes[1] -= -frameWidth;
    sizes[1] -= -matWidth;

    document.getElementById("total-size").innerHTML = sizes[0].toFixed(1) + " x " + sizes[1].toFixed(1) + " cm"
}

function updatePrice() {
    let printSize = displayRadioValue("printSize");
    let frameStyle = displayRadioValue("frameStyle");
    let frameWidth = document.getElementById("frameSlider").value;
    let matWidth = document.getElementById("matSlider").value;
    let price = calculatePrice(printSize, frameStyle, frameWidth*10, matWidth*10);
    document.getElementById("price").innerHTML = "??? " + price;
}

function updateImg() {
    let img = document.getElementById("preview-image");
    let container = document.getElementById("preview-container");
    let printSize = displayRadioValue("printSize");
    let frameStyle = displayRadioValue("frameStyle");
    let frameWidth = document.getElementById("frameSlider").value;
    let matColor = displayRadioValue("matColor");
    let matWidth = document.getElementById("matSlider").value;
    render(img, container, printSize, frameStyle, frameWidth*10, matColor, matWidth*10);
}



function displayRadioValue(tagName) {
    let ele = document.getElementsByName(tagName);

    for (let i = 0; i < ele.length; i++) {

        if (ele[i].type === "radio") {
            if (ele[i].checked) {
                return ele[i].value;
            }
        }
    }}


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

    if (h > w)  else {
        S[1] = Math.floor(h * S[0] / w);
        M[1] = Math.floor(h * M[0] / w);
        L[1] = Math.floor(h * L[0] / w);
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
    if (w > h) {
        x = container.offsetWidth / (w + 2 * matWidth + 2 * frameWidth);
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

    let base = 30;
    let framecost = 0;
    switch (frameStyle) {
        
        
        case "shabby":
            framecost = 0.09;
            break;
        
        
    }

    let matCost = 0.005;

    price += base;
    price += framecost * frameWidth;
    price += matCost * matWidth;

    switch (printSize) {
        
        case "M":
            price *= 2;
            break;
        
        
    }

    return (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2);
}


function storeImages(objectID, data) {
    localStorage[objectID] = JSON.stringify(data);
}

function retrieveImages(objectID) {
    if (objectID in localStorage) 
}

