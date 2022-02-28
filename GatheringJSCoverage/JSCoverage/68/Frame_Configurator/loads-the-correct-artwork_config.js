const URL = 'https://collectionapi.metmuseum.org';
const GET_OBJECT_API = '/public/collection/v1/objects';

const CURRENT_URL = window.location.href;
let configObjectID = "";
const CONFIG_SIDE = "/config.html";
const SEARCH_SIDE = "./search.html";
const CART_SIDE = "/cart.html";
let SERVER_URL;

// define HTML Components
const previewImage = document.getElementById('preview-image');
const label = document.getElementById('image-label');
let price = document.getElementById('price');
let total_size = document.getElementById('total-size');
let print_size_s = document.getElementById('print-size-s');
let print_size_m = document.getElementById('print-size-m');
let print_size_l = document.getElementById('print-size-l');

let frame_style_classic = document.getElementById('frame-style-classic');
let frame_style_natural = document.getElementById('frame-style-natural');
let frame_style_shabby = document.getElementById('frame-style-shabby');
let frame_style_elegant = document.getElementById('frame-style-elegant');

let frameRange = document.querySelector('input[type="range"][id="frameWidthR"]');
let matRange = document.querySelector('input[type="range"][id="matWidthR"]');

let mat_color_ivory = document.getElementById('mat-color-ivory');
let mat_color_mint = document.getElementById('mat-color-mint');
let mat_color_wine = document.getElementById('mat-color-wine');
let mat_color_indigo = document.getElementById('mat-color-indigo');
let mat_color_coal = document.getElementById('mat-color-coal');

const preview_container = document.getElementById('preview-container');


class Image {

    static fillObjectFromImageResponse(responsePicture, width, height) {
        let image = new Image();
        image.id = responsePicture.objectID;
        image.title = responsePicture.title;
        image.artist = responsePicture.artistDisplayName;
        image.date = responsePicture.objectDate;
        image.link = "";
        image.src = responsePicture.primaryImageSmall;
        image.dimension = [width, height];
        return image;
    }

    static 
}

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

    const w = img.dimension[0];
    const h = img.dimension[1];

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
function render(img, outerContainer, printSize, frameStyle, frameWidth, matColor, matWidth) {
    const printSizes = getPrintSizes(img);
    const w = printSizes[printSize][0];
    const h = printSizes[printSize][1];

    let x;
    if (w > h) {
        x = outerContainer.offsetWidth / (w + 2 * matWidth + 2 * frameWidth);
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

    outerContainer.style.padding = `${matWidth * x}px`;
    outerContainer.style.boxSizing = 'border-box';
    outerContainer.width = (w + 2 * matWidth + 2 * frameWidth) * x;
    outerContainer.height = (h + 2 * matWidth + 2 * frameWidth) * x;
    outerContainer.style.borderWidth = `${frameWidth * x}px`;
    outerContainer.style.backgroundColor = matColors[matColor];
    outerContainer.style.borderImageSource = `url(frame-styles/${frameStyle}.jpg)`;
    outerContainer.style.borderImageSlice = frameImageSlices[frameStyle];

    total_size.textContent = (w + 2 * matWidth + 2 * frameWidth) / 10 + ' × ' + (h + 2 * matWidth + 2 * frameWidth) / 10 + 'cm';


    let node = document.getElementById('image-label');
    while (node.firstChild) 


    const innerContainerTemp = document.getElementById('image-label');
    const imgArtist = document.createElement('span');
    imgArtist.innerText = img.artist;
    imgArtist.className = "artist";
    const imgTitle = document.createElement('span');
    imgTitle.innerText = img.title + ', ';
    imgTitle.className = "title";
    const imgDate = document.createElement('span');
    imgDate.innerText = img.date;
    imgDate.className = "date";

    innerContainerTemp.appendChild(imgArtist);
    innerContainerTemp.appendChild(imgTitle);
    innerContainerTemp.appendChild(imgDate);
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
    let price = 30.0;
    let frameConstant = 1;
    switch (frameStyle) {
        
        case "natural":
            frameConstant = 0.8;
            break;
        
        
    }

    price += frameConstant * (frameWidth / 10);
    let matPrice = (matWidth / 10) * 0.05;
    price += matPrice;

    switch (printSize) {
        case "M":
            price = price * 2;
            break;

        
    }

    return (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2);
}



function getPrintSize() {
    if (print_size_s.checked)  else if (print_size_m.checked) {
        return print_size_m.value;
        //return "M";
    }
}

function getFrame() {
    if (frame_style_classic.checked)  else if (frame_style_natural.checked) {
        return "natural";
    }


}





function getMat() {
    if (mat_color_ivory.checked)  else if (mat_color_mint.checked) {
        return 'mint';
    }
}















async function getRequest(url, callback, callbackObject) {
    let rawData;
    try {
        const response = await fetch(url);
        rawData = await response.json();

        if (response.status === 404) 
    } 

    if (callback) {
        callback(rawData, callbackObject);
    }
    return rawData;
}

function getSearchIDsSuccessCallback(response, objectID) {
    let image = Image.fillObjectFromImageResponse(response);
    let printSize = getPrintSize();
    let frameStyle = getFrame();
    let matColor = getMat();
    let fWidth = frameRange.valueAsNumber * 10;
    let mWidth = matRange.valueAsNumber * 10;

    previewImage.src = image.src;
    previewImage.onload = function () {
        image.dimension = [previewImage.width, previewImage.height];
        let sizes = getPrintSizes(image);
        document.getElementById('print-size-s-label').textContent = 'Small' + '\n' + sizes["S"][0] / 10 + ' × ' + sizes["S"][1] / 10 + 'cm';
        document.getElementById('print-size-m-label').textContent = 'Medium \n' + '\n' + sizes["M"][0] / 10 + ' × ' + sizes["M"][1] / 10 + 'cm';
        document.getElementById('print-size-l-label').textContent = 'Large \n' + '\n' + sizes["L"][0] / 10 + ' × ' + sizes["L"][1] / 10 + 'cm';

        render(image, previewImage, printSize, frameStyle, fWidth, matColor, mWidth);
    };

    price.textContent = '€ ' + calculatePrice(printSize, frameStyle, fWidth, mWidth);

    if (objectID) {
        localStorage["objectID:"+objectID] = localStorage["objectID:"+objectID] + JSON.stringify(image) + ";;;";
    }

    initPageListener(image, objectID, printSize, frameStyle, matColor, fWidth, mWidth);
}

function initPageListener(image, objectID, printSize, frameStyle, matColor, fWidth, mWidth) {

    {
        print_size_s.addEventListener('change', );
        print_size_m.addEventListener('change', );
        print_size_l.addEventListener('change', );

        frame_style_classic.addEventListener('change', );
        frame_style_natural.addEventListener('change', );
        frame_style_shabby.addEventListener('change', );
        frame_style_elegant.addEventListener('change', );

        mat_color_ivory.addEventListener('change', );
        mat_color_mint.addEventListener('change', );
        mat_color_wine.addEventListener('change', );
        mat_color_indigo.addEventListener('change', );
        mat_color_coal.addEventListener('change', );


        let frameRange = document.getElementById('frameWidthR');
        let frameInput = document.getElementById('frameWidth');


        frameRange.addEventListener('input', );
        frameRange.addEventListener('change', );
        frameInput.addEventListener('change', );
        frameInput.addEventListener('change', );


        let matRange = document.getElementById('matWidthR');
        let matInput = document.getElementById('matWidth');

        matRange.addEventListener('input', );
        matRange.addEventListener('change', );
        matInput.addEventListener('change', );
        matInput.addEventListener('change', );
    }

    document.getElementById('buy').addEventListener("click", );
}



function init() {
    const shoppingCart = JSON.parse(localStorage.getItem('cart'));
    if(shoppingCart!==null )  else {
        document.getElementById('cart-link').innerHTML = "Cart (0)";
    }


    let newUrl = window.location.href;
    if (newUrl.indexOf('?') !== -1) {
        newUrl = newUrl.substring(0, newUrl.indexOf('?'));
    }
    SERVER_URL = newUrl.substring(0, newUrl.length - CONFIG_SIDE.length);
    let objectID = '';

    const urlParams = new URLSearchParams(window.location.search);

    // Parameter parse
    {
        if (urlParams.has('objectID')) {
            objectID = urlParams.get('objectID');
        }

    if (urlParams.has('printSize')) 
     if(urlParams.has('frameStyle'))
     
     if(urlParams.has('frameWidth'))
    if(urlParams.has('matColor'))
    if(urlParams.has('matWidth'))

    }
    if (objectID !== undefined && objectID != null && objectID !== '') {
        console.log('search with "' + objectID + '" as parameter');
        configObjectID = objectID;

        const currentUrlRequest = URL + GET_OBJECT_API + "/" + objectID;

        if (localStorage["objectID:"+objectID] )  else {
            getRequest(currentUrlRequest, getSearchIDsSuccessCallback, objectID);
        }


    }
}

init();
