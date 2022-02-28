import {calculatePrice, getPrintSizes, render} from "./frame.js";
import {updateCartItemsNumber} from "./cart-numbers.js";
import {Artwork} from "./artwork.js";

function load_img() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('objectID');
    if (myParam== null || myParam.length === 0)

    let input_params = getCurrentInputValues();

    let pictureElement;
    let k;
    for (k = 0;  k < localStorage.length; k++) 

    let image = document.getElementById("preview-image");
    let imageContainer = document.getElementById("preview-container");

    if (pictureElement == null) {

        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${myParam}`).then(
            function(response) {
                if (response.status !== 200) 
                return response.json();
            }
        ).then(result => {
            image.src = result.primaryImageSmall;
            render(image, imageContainer, input_params.printSize, input_params.frameStyle, input_params.frameWidth, input_params.matColor, input_params.matWidth);

            let cart = JSON.parse(localStorage.getItem("configCache"));
            if (cart === null) {
                cart = [];
            }
            cart.push(new Artwork(result.objectID, result.title, result.title, result.primaryImageSmall, result.objectDate));
            localStorage.setItem("configCache", JSON.stringify(cart));

            let labelContainer = document.getElementById("image-label");

            labelContainer.innerHTML += `
            <span class="artist">${result.artistDisplayName}</span>
            <span class="title">${result.title}</span></br>
            <span class="date">${result.objectDate}</span>`;
        }).then(update).then(setupSizes);
        return;

    }}


function getCurrentInputValues(){
    const objIdField = document.getElementsByName("object-id");
    let objectId = Number(objIdField.value);

    let printSize = "M";
    let frameStyle = "natural";
    let frameWidth = 40;
    let matWidth = 50;


    let matColor = "mint";


    let sizes = document.getElementsByName("printSize");
    for (let size of sizes){
        if (size.checked) {
            printSize = size.value;
            break;
        }
    }

    let frameWithInput = document.getElementById(`frameWidth`);
    if (frameWithInput !== null) {
        frameWidth = Number(frameWithInput.value) * 10;
    }

    let frame_styles = document.getElementsByName("frameStyle");
    for (let style of frame_styles){
        if (style.checked) {
            frameStyle = style.value;
            break;
        }
    }

    let matWidthInput = document.getElementById(`matWidth`);
    if (matWidthInput !== null) {
        matWidth = Number(matWidthInput.value) * 10;
    }

    let mat_style = document.getElementsByName("matColor");
    for (let style of mat_style){
        if (style.checked) {
            matColor = style.value;
            break;
        }
    }

    let size_Object = {
        objectID: objectId,
        printSize: printSize,
        frameStyle: frameStyle,
        frameWidth: frameWidth,
        matWidth: matWidth,
        matColor: matColor
    }

    return size_Object;
}

function update(){

    let input_params = getCurrentInputValues();


    let image = document.getElementById("preview-image");
    let imageContainer = document.getElementById("preview-container");
    let arr = getPrintSizes(image);

    image.height = arr[input_params.printSize][0];
    image.width = arr[input_params.printSize][1];
    render(image, imageContainer, input_params.printSize, input_params.frameStyle, input_params.frameWidth, input_params.matColor, input_params.matWidth);

    let priceTag = document.getElementById("price");
    let price = calculatePrice(input_params.printSize, input_params.frameStyle, input_params.frameWidth, input_params.matWidth);
    priceTag.innerText = "€ "+(price.toFixed(2));


    let sizeTag = document.getElementById("total-size");
    let sizes = getPrintSizes(image);
    let height = sizes[input_params.printSize][0] + (input_params.frameWidth * 2) + (input_params.matWidth * 2);
    let width = sizes[input_params.printSize][1] + (input_params.frameWidth * 2) + (input_params.matWidth * 2);
    sizeTag.innerHTML =`${height / 10} &times; ${width / 10} cm`;

}

function addConfigEventListeners() {
    const inputElements = document.getElementsByTagName("input");
    for (let element of inputElements) {
        if (element.id === "frameWidth"){
            element.addEventListener("change", syncSliders_frame_slider);
            continue;
        }
        if (element.id === "frameWidthR"){
            element.addEventListener("change", syncSliders_frame_input);
            continue;
        }
        if (element.id === "matWidth"){
            element.addEventListener("change", syncSliders_mat_slider);
            continue;
        }
        if (element.id === "matWidthR"){
            element.addEventListener("change", syncSliders_mat_input);
            continue;
        }

        element.addEventListener("change", update);

    }
    let addToCartButton = document.getElementById('subButton');
    addToCartButton.addEventListener("click", addToCart);
}





function syncSliders_mat_slider(){
    const matSize_input = document.getElementById("matWidth");
    const matSize_slider = document.getElementById("matWidthR");

    let min_mat = 0;
    let max_mat = 10;

    if (matSize_input.value < min_mat) 

    if (matSize_input.value > max_mat) 

    matSize_input.value = (Math.round(matSize_input.value * 10) / 10);

    matSize_slider.value = matSize_input.value;
    update()
}



function setupSizes() {

    let image = document.getElementById("preview-image");
    let imageContainer = document.getElementById("preview-container");

    let printSizes = getPrintSizes(image);
    let relevantLabel_S = document.getElementById(`print-size-s-label`);
    relevantLabel_S.innerHTML =
        `${"Small"}<br>${printSizes["S"][0] / 10} &times; ${printSizes["S"][1] / 10} cm`;

    let relevantLabel_M = document.getElementById(`print-size-m-label`);
    relevantLabel_M.innerHTML =
        `${"Medium"}<br>${printSizes["M"][0] / 10} &times; ${printSizes["M"][1] / 10} cm`;

    let relevantLabel_L = document.getElementById(`print-size-l-label`);
    relevantLabel_L.innerHTML =
        `${"Large"}<br>${printSizes["L"][0] / 10} &times; ${printSizes["L"][1] / 10} cm`;
}

function translateUrlParamsToFrom() {
    const urlParams = new URLSearchParams(window.location.search);
    let myParam = urlParams.get('objectID');

    const objIdField = document.getElementsByName("object-id");

    if (myParam !== null) {
        objIdField.value = Number(myParam);
    }

    let printSizes_values = ["S","M","L"];
    let mat_Colors= ["ivory", "mint", "wine", "indigo", "coal"];
    let frame_styles = ["classic", "natural", "shabby", "elegant"];

    let min_frame = 2;
    let max_frame = 5;

    let min_mat = 0;
    let max_mat = 10;

    myParam = urlParams.get('printSize');
    if (myParam != null)

    myParam = urlParams.get('frameStyle');
    if (myParam != null)

    myParam = urlParams.get('matColor');
    if (myParam != null)

    let myParam_X = urlParams.get('frameWidth');
    if (myParam_X !== null)

    myParam_X = urlParams.get('matWidth');
    if (myParam_X !== null)
    
}




translateUrlParamsToFrom();
load_img();
addConfigEventListeners();
updateCartItemsNumber();



