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

    static 

    static 
}

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


































function loadLocalStorageImages(key) {
    let pictures = localStorage["objectID:"+key].split(';;;');
    const image = JSON.parse(pictures);
    getSearchIDsSuccessCallback(image, key);
}

function init() {
    const shoppingCart = JSON.parse(localStorage.getItem('cart'));
    if(shoppingCart!==null && shoppingCart!== undefined && shoppingCart !== "") {
        document.getElementById('cart-link').innerHTML = "Cart (" +shoppingCart.length + ")";
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

        if (localStorage["objectID:"+objectID] && localStorage["objectID:"+objectID] !== "") {
            loadLocalStorageImages(objectID);
        }


    }
}

init();
