import * as FrameHelper from "./frame.js"

let artworkProperties = {};
let objectID;

getArtwork();
updateSliderFrameWidth();
updateSliderMatWidth();
addToCart();


/**
 * Retrieving the specified image (by objectID) and setting the label
 * @returns {Promise<void>} The promise returned by the function
 */
async function getArtwork() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    objectID = urlParams.get('objectID');

    //redirect to search if no objectID param was given
    if (objectID === null) 

    let artworkJSON;

    //check cache before fetching
    if (localStorage.getItem(objectID))  else {
        //fetch specific artwork and wait for a JSON response
        let artwork = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
        artworkJSON = await artwork.json();
        localStorage.setItem(objectID, JSON.stringify(artworkJSON));
    }

    //redirect to search if objectID not found
    if(artworkJSON.message === "ObjectID not found")

    //set src of preview-image to url retrieved from artworkJSON
    const img = document.getElementById("preview-image");
    img.src = artworkJSON.primaryImageSmall;
    img.alt = "Artwork";

    //storing the artwork properties
    artworkProperties.printSize =  urlParams.get("printSize")  : document.querySelector('input[name="printSize"]:checked').value;
    artworkProperties.frameWidth =  urlParams.get("frameWidth")  : document.getElementById("frameWidth").value*10;
    artworkProperties.frameStyle = urlParams.get("frameStyle")  : document.querySelector(`input[name="frameStyle"]:checked`).value;
    artworkProperties.matWidth =  urlParams.get("matWidth")  : document.getElementById("matWidth").value*10;
    artworkProperties.matColor =  urlParams.get("matColor")  : document.querySelector('input[name="matColor"]:checked').value;

    //add event to image onload
    img.addEventListener("load", () => {
        setPrintSizes(img);
        changeFrameOnUpdate(artworkProperties);
        let itemsInCart = JSON.parse(localStorage.getItem('cart'));
        if(localStorage.getItem("cart") !== null 
    });

    //creating the label
    const artist = artworkJSON.artistDisplayName;
    const description = artworkJSON.title;
    const date = artworkJSON.objectDate;
    const imgLabel = document.getElementById("image-label");
    const boldElementForArtist = document.createElement("b");
    const newLineElementForLabel = document.createElement("br");

    boldElementForArtist.innerText = artist;
    imgLabel.appendChild(boldElementForArtist);
    imgLabel.appendChild(newLineElementForLabel);
    imgLabel.append(description + ", " + date);

    addListenersToProperties(artworkProperties);
    changeFrameOnUpdate(artworkProperties);
}

/**
 * Sync the slider value with the input field and vice-versa; for frame width
 */
function updateSliderFrameWidth() {
    const sliderFrameWidth = document.getElementById("frameWidthR");
    const frameWidthInput = document.getElementById("frameWidth");

    frameWidthInput.value = sliderFrameWidth.value;

    sliderFrameWidth.onchange = ;

    frameWidthInput.onchange = 
}

/**
 * Sync the slider value with the input field and vice-versa; for mat width
 */
function updateSliderMatWidth() {
    const sliderMatWidth = document.getElementById("matWidthR");
    const matWidthInput = document.getElementById("matWidth");

    matWidthInput.value = sliderMatWidth.value;

    sliderMatWidth.onchange = ;

    matWidthInput.onchange = function () {
        matWidthInput.value = Math.round(matWidthInput.value * 10) / 10;

        if(matWidthInput.value < 0.0)  else if (matWidthInput.value > 10.0) 
        sliderMatWidth.value = matWidthInput.value;
    }
}

/**
 * Set the print sizes (S, M, L) according to the specified image
 * @param img The image to calculate the sizes for
 */
function setPrintSizes(img) {
    const calculatedPrintSizes = FrameHelper.getPrintSizes(img);
    document.getElementById("print-size-s-label").innerText = "Small\n" + calculatedPrintSizes.S[0] / 10 + " x " + calculatedPrintSizes.S[1] / 10 + " cm";
    document.getElementById("print-size-m-label").innerText = "Medium\n" + calculatedPrintSizes.M[0] / 10 + " x " + calculatedPrintSizes.M[1] / 10 + " cm";
    document.getElementById("print-size-l-label").innerText = "Large\n" + calculatedPrintSizes.L[0] / 10 + " x " + calculatedPrintSizes.L[1] / 10 + " cm";
}

/**
 * Adding event listeners to the elements of the form
 * @param artworkProperties The object containing all artwork properties
 */
function addListenersToProperties(artworkProperties) {

    //each property in the artwork object (e.g. printSize, frameWidth) needs event listener
    for(let property in artworkProperties){
        if(artworkProperties.hasOwnProperty(property)){
            document.getElementsByName(property).forEach(item => {
                item.addEventListener("change", () => {
                    artworkProperties[property] = item.value;
                    changeFrameOnUpdate(artworkProperties);
                })
            });
        }
    }

    //event listener for the frame width slider
    document.getElementById("frameWidthR").addEventListener(
        "change", );

    //event listener for the mat width slider
    document.getElementById("matWidthR").addEventListener(
        "change",  );
}

/**
 * Correct the frame width within it's boundaries (20 - 50mm)
 * @param value The frame width to correct
 * @returns {number} Corrected frame width
 */
function correctFrameWidth(value){
    return value > 5 ? 50 ;
}

/**
 * Correct the mat width within it's boundaries (0 - 100mm)
 * @param value The mat width to correct
 * @returns {number} Corrected mat width
 */
function correctMatWidth(value){
    return value > 10 ? 100 : value < 0  : value * 10;
}

/**
 * Updating the frame according to the specified parameters (either by form or by url params)
 * @param printSize The size of the print; S, M or L
 * @param frameStyle The style of the frame
 * @param frameWidth The width of the frame
 * @param matColor The color of the mat
 * @param matWidth The width of the mat
 */
function changeFrameOnUpdate({printSize, frameStyle, frameWidth, matColor, matWidth}) {

    const img = document.getElementById("preview-image");

    document.querySelector(`input[name="printSize"][value=${printSize}]`).checked = true;
    document.querySelector(`input[name="frameStyle"][value=${frameStyle}]`).checked = true;
    document.querySelector(`input[name="matColor"][value=${matColor}]`).checked = true;

    frameWidth = correctFrameWidth(frameWidth);
    document.querySelector('input[name="frameWidth"]').value = frameWidth / 10;//frameWidth / 10;
    document.querySelector('input[name="frameWidthR"]').value = frameWidth / 10;

    matWidth = correctMatWidth(matWidth);
    document.querySelector('input[name="matWidth"]').value = matWidth/10;
    document.querySelector('input[name="matWidthR"]').value = matWidth/10;

    FrameHelper.render(img, img.parentElement, printSize, frameStyle, frameWidth, matColor, matWidth);

    //set price
    document.getElementById("price").innerText = "€ " + FrameHelper.calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2);

    //set total size
    const sizes = FrameHelper.getPrintSizes(img);
    const size = sizes[printSize];
    const featureSize = Math.round((frameWidth + matWidth) / 10);
    document.getElementById("total-size").innerText = (size[0]/10 + featureSize) + " x " + (size[1]/10 + featureSize) + " cm";
}

/**
 * Create new object cartItem (objectID + artworkProperties), add it to cart and redirect to cart.html
 */
function addToCart() {

     document.getElementById("addToCartButton").onclick = 
}
