import { MetropolitanService } from "./MetropolitanService.js";
import { QueryString } from "./Query.js";
import { Image } from "./Image.js";
import { PrintSize, PrintSizes } from "./PrintSize.js";
import { calculatePrice } from "./frame.js";
import * as CacheService from "./CacheService.js"

let printSizeControls = document.querySelectorAll(".segmented input[type=radio][name=printSize]");
let frameStyleControls = document.querySelectorAll(".frame-style-row input[type=radio]");
let matColorControls = document.querySelectorAll(".mat-color-row input[type=radio]");
let addToCartButton = document.querySelector(".buy");
let cartLabeElement = document.querySelector("#cart-link")

let printSize = document.querySelector(".segmented input[type=radio][name=printSize]:checked");
let frameStyle = document.querySelector(".frame-style-row input[type=radio]:checked");
let frameWidth = document.querySelector(".config-row input[type=number][name=frameWidth]");
let frameWidthR = document.querySelector("fieldset input[type=range][name=frameWidthR]");
let matColor = document.querySelector(".mat-color-row input[type=radio]:checked");
let matWidth = document.querySelector(".config-row input[type=number][name=matWidth]");
let matWidthR = document.querySelector("fieldset input[type=range][name=matWidthR]");

let imageElement = document.querySelector('#preview-image');
const artist = document.querySelector('#label-author');
const description = document.querySelector('#label-description');

let image = null;
let printSizeSmall = new PrintSize(PrintSizes.SMALL, 0, 0);
let printSizeMedium = new PrintSize(PrintSizes.MEDIUM, 0, 0);
let printSizeLarge = new PrintSize(PrintSizes.LARGE, 0, 0);

let id = null;
let cart = CacheService.get("cart");

printSizeSmall.calculate(imageElement);
printSizeMedium.calculate(imageElement);
printSizeLarge.calculate(imageElement);


(async () => {
    id = QueryString.getParamFromUrl(document.location.search, "objectID");
    const printSizeParam = QueryString.getParamFromUrl(document.location.search, "printSize");
    const frameStyleParam = QueryString.getParamFromUrl(document.location.search, "frameStyle");
    const frameWidthParam = QueryString.getParamFromUrl(document.location.search, "frameWidth");
    const matColorParam = QueryString.getParamFromUrl(document.location.search, "matColor");
    const matWidthParam = QueryString.getParamFromUrl(document.location.search, "matWidth");

    printSize.value = printSizeParam  : printSize.value;
    frameStyle.value = frameStyleParam  : frameStyle.value;
    frameWidth.value = frameWidthParam  : frameWidth.value;
    matColor.value = matColorParam  : matColor.value;
    matWidth.value = matWidthParam  : matWidth.value;

    if (!id) 
    const metropolitanService = new MetropolitanService;
    const object = await metropolitanService.object(id, true);
    if (object.message === "ObjectID not found") 
    artist.innerText = object.artistDisplayName;
    description.innerHTML = `${object.title}, ca. ${object.objectDate}`;
    imageElement.setAttribute("src", object.primaryImageSmall);

    cartLabeElement.innerHTML = cart ? `Cart (${cart.length})` 
})();

imageElement.addEventListener('load', _ => {
    image = new Image(imageElement, printSize.value, frameStyle.value, frameWidth.value, matColor.value, matWidth.value);
    image.renderImage();
    calculateTotalSize()
    calculateTotalPrice()
})

frameWidth.addEventListener('change', );

frameWidthR.addEventListener('change', );

matWidth.addEventListener('change', );

matWidthR.addEventListener('change', );

addToCartButton.addEventListener('click', )

addCallBackToControls(printSizeControls, 'change', );
addCallBackToControls(frameStyleControls, 'change', );
addCallBackToControls(matColorControls, 'change', );

function addCallBackToControls(controls, event, callback) {
    for (let control of controls) {
        control.addEventListener(event, callback)
    }
}

function calculateTotalSize() {
    const x = document.querySelector(`.config-row div[id=total-size] span[id=size-total-x]`);
    const y = document.querySelector(`.config-row div[id=total-size] span[id=size-total-y]`);
    const size = [printSizeSmall, printSizeMedium, printSizeLarge].find(printSize => printSize.element.checked);
    x.innerHTML = size.x + (matWidth.value * 2) + (frameWidth.value * 2);
    y.innerHTML = size.y + (matWidth.value * 2) + (frameWidth.value * 2);
}

function calculateTotalPrice() {
    const price = document.querySelector('#price');
    const size = [printSizeSmall, printSizeMedium, printSizeLarge].find(printSize => printSize.element.checked);
    price.innerHTML = `€ ${calculatePrice(size.size, image.frameStyle, image.frameWidth, image.matWidth).toFixed(2)}`;
}







