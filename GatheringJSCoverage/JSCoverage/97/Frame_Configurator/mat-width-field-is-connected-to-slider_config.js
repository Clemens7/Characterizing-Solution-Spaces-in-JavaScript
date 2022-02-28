var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getArtwork } from "./artwork-api.js";
import { updateCartCounter } from "./cart-counter.js";
import { calculatePrice, getPrintSizes, render } from "./frame.js";
import { ConfiguredFrameRepository } from "./repository/ConfiguredFrameRepository.js";
import { ConfiguredFrame } from "./model/ConfiguredFrame.js";
let objectID;
let id;
let printSizeValue;
let frameStyleValue;
let frameWidthValue;
let matWidthValue;
let matColorValue;
const form = document.getElementById("config-form");
const previewContainer = document.getElementById("preview-container");
const previewImage = document.getElementById("preview-image");
const printSize = form.elements.namedItem("printSize");
const frameWidthR = document.getElementById("frameWidthR");
const frameWidth = document.getElementById("frameWidth");
const frameStyle = form.elements.namedItem("frameStyle");
const matWidthR = document.getElementById("matWidthR");
const matWidth = document.getElementById("matWidth");
const matColor = form.elements.namedItem("matColor");
form.addEventListener("submit", );
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    updateCartCounter();
    const params = (new URL(document.location.href)).searchParams;
    objectID = params.get('objectID');
    if (!objectID) 
    else {
        id = params.get("id");
        printSizeValue = (_a = params.get('printSize')) !== null  : "L";
        frameStyleValue = (_b = params.get('frameStyle')) !== null  : "shabby";
        frameWidthValue = mmToCm(Math.max(20, Math.min(50, (_c = Number(params.get('frameWidth'))) !== null && _c !== void 0 ? _c )));
        matColorValue = (_d = params.get('matColor')) !== null  : "mint";
        matWidthValue = mmToCm(Math.max(0, Math.min(100, Number((_e = params.get('matWidth')) !== null  : 55))));
        printSize.value = printSizeValue;
        frameWidthR.value = String(frameWidthValue);
        frameWidth.value = String(frameWidthValue);
        frameStyle.value = frameStyleValue;
        matColor.value = matColorValue;
        matWidthR.value = String(matWidthValue);
        matWidth.value = String(matWidthValue);
        const artwork = yield getArtwork(Number(objectID));
        if (!artwork) 
        previewImage.alt = `Artwork of ${artwork.artist}, Title: ${artwork.title}, Date: ${artwork.date}`;
        previewImage.src = String(artwork.imageSrc);
        refresh();
        let label = document.getElementById("image-label");
        let artist = document.createElement("span");
        artist.classList.add("artist");
        artist.innerText = artwork.artist;
        label.appendChild(artist);
        let title = document.createElement("span");
        title.classList.add("title");
        title.innerText = artwork.title;
        label.appendChild(title);
        label.appendChild(document.createTextNode(", "));
        let date = document.createElement("span");
        date.classList.add("date");
        date.innerText = artwork.date;
        label.appendChild(date);
        const printSizes = getPrintSizes(previewImage);
        document.getElementById("print-size-s-label").innerHTML = "Small<br>" + mmToCm(printSizes["S"][0]) + " × " + mmToCm(printSizes["S"][1]) + " cm";
        document.getElementById("print-size-m-label").innerHTML = "Medium<br>" + mmToCm(printSizes["M"][0]) + " × " + mmToCm(printSizes["M"][1]) + " cm";
        document.getElementById("print-size-l-label").innerHTML = "Large<br>" + mmToCm(printSizes["L"][0]) + " × " + mmToCm(printSizes["L"][1]) + " cm";
        for (let i = 0; i < printSize.length; i++) {
            printSize[i].addEventListener("change", );
        }
        for (let i = 0; i < frameStyle.length; i++) {
            frameStyle[i].addEventListener("change", );
        }
        for (let i = 0; i < matColor.length; i++) {
            matColor[i].addEventListener("change", );
        }
    }
}));
/**
 * Convert from millimeter to centimeter.
 *
 * @param number value in mm
 * @returns number value in cm
 */
function mmToCm(value) {
    return value / 10;
}
/**
 * Convert from centimeter to millimeter.
 *
 * @param number value in cm
 * @returns number value in mm
 */
function cmToMM(value) {
    return value * 10;
}
/**
 * Set the total frame size given the parameters.
 *
 * @param img The image that will get a frame.
 * @param size The size category (Small, Medium, Large) for the image.
 * @param frameWidth The width of the frame in millimeter.
 * @param matWidth The width of the mat (=passepartout) between the frame and the image in millimeter.
 */
function setTotalSize(img, size, frameWidth, matWidth) {
    let printSizes = getPrintSizes(img);
    document.getElementById("total-size").innerText = mmToCm(printSizes[size][0] + (2 * frameWidth) + (2 * matWidth)) + " × " + mmToCm(printSizes[size][1] + (2 * frameWidth) + (2 * matWidth)) + " cm";
}
/**
 * Set the total prize for the frame given the parameters.
 *
 * @param printSize The size category (Small, Medium, Large) for the image.
 * @param frameStyle The style of the frame in mm.
 * @param frameWidth The width of the frame in mm.
 * @param matWidth The width of the mat between the frame and the image in mm.
 */
function setTotalPrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = calculatePrice(printSize, frameStyle, frameWidth, matWidth);
    document.getElementById("price").innerText = "€ " + price.toFixed(2);
}
/**
 * Refresh the frame by re-setting the total price and the total size, and by re-rendering the preview image.
 */
function refresh() {
    setTotalPrice(printSizeValue, frameStyleValue, cmToMM(Number(frameWidthValue)), cmToMM(Number(matWidthValue)));
    setTotalSize(previewImage, printSizeValue, cmToMM(Number(frameWidthValue)), cmToMM(Number(matWidthValue)));
    render(previewImage, previewContainer, printSizeValue, frameStyleValue, cmToMM(Number(frameWidthValue)), matColorValue, cmToMM(Number(matWidthValue)));
}
frameWidthR.addEventListener("input", );
frameWidth.addEventListener("change", );
matWidthR.addEventListener("input", );
matWidth.addEventListener("change", event => {
    let clipped = String(Math.round(Math.max(0.0, Math.min(10.0, Number(matWidth.value))) * 10) / 10);
    matWidthR.value = clipped;
    let mw = Math.round(Number(matWidthR.value) * 10) / 10;
    matWidth.value = String(mw);
    matWidthValue = mw;
    refresh();
});
