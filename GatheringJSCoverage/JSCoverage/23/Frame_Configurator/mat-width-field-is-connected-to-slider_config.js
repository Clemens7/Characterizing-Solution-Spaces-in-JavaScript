import { store } from "./print-objects-cache.js";
import { render } from "./frame.js";
import { addPrice } from "./frame.js";
import { Print } from "./print-object.js";
import { getGalleryItemFromObjectId } from "./search-api-calls.js";
import { getCartText } from "./header.js";

const urlParams = new URLSearchParams(window.location.search);
const objectId = urlParams.get('objectID');
const container = document.getElementById("preview-container");

let printSize = urlParams.get('printSize') === null  ? 'M' ;
let frameStyle = urlParams.get('frameStyle') === null  ? 'classic' ;
let matColor = urlParams.get('matColor') === null  ? 'mint' ;
let matWidth = urlParams.get('matWidth') === null  ? 5.5 ;
let frameWidth = urlParams.get('frameWidth') === null  ? 4 ;
let img = document.getElementById("preview-image");

addPrice(printSize, frameStyle, frameWidth, matWidth);
initPrintAndDescription();
initEventListeners();
addToCart();

async function initPrintAndDescription() {
    let galleryItem = await getGalleryItemFromObjectId(objectId);
    verifyObjectIsPresent(galleryItem);
    setDescription(galleryItem);
    setImage(galleryItem);
}

function verifyObjectIsPresent(galleryItem) {
    if (objectId === undefined || objectId === null || objectId === "") 
    if (galleryItem === undefined || galleryItem === null || galleryItem.objectID === undefined) 
}

function setImage(galleryItem) {
    img.id = "preview-image";
    img.src = galleryItem.primaryImage;
    render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
}

function setDescription(galleryItem) {
    const label = document.getElementById("image-label");
    const span = document.createElement("span");
    span.classList.add("artist");
    span.innerText = `${galleryItem.artistDisplayName}`;
    label.innerHTML =
        `<span class="artist">${galleryItem.artistDisplayName}</span>
         <span class="title">${galleryItem.title}</span>,
         <span class="date">${galleryItem.date}</span>`;
}

function initEventListeners() {
    setFrameWidth();
    setMatWidth();
    setPrintSize();
    setFrameStyle();
    setMatColor();
}

function setPrintSize() {
    let printSizeS = document.getElementById("print-size-s");
    printSizeS.innerText = img.naturalWidth + ' x ' + img.naturalHeight;
    printSizeS.addEventListener("change", );
    let printSizeM = document.getElementById("print-size-m");
    printSizeM.addEventListener("change", );
    let printSizeL = document.getElementById("print-size-l");
    printSizeL.addEventListener("change", );
    setCheckedAttributeForPrintSize();
}

function setCheckedAttributeForPrintSize() {
    if (printSize === 'S')  else if (printSize === 'M') {
        document.getElementById('print-size-m').checked = true;
    }
}

function setFrameStyle() {
    let frameStyleClassic = document.getElementById("frame-style-classic");
    frameStyleClassic.addEventListener("change", );
    let frameStyleNatural = document.getElementById("frame-style-natural");
    frameStyleNatural.addEventListener("change", );
    let frameStyleShabby = document.getElementById("frame-style-shabby");
    frameStyleShabby.addEventListener("change", );
    let frameStyleElegant = document.getElementById("frame-style-elegant");
    frameStyleElegant.addEventListener("change", );
    setCheckedAttributeForPrintStyle();
}

function setCheckedAttributeForPrintStyle() {
    if (frameStyle === 'classic') {
        document.getElementById("frame-style-classic").checked = true;
    }
}

function setMatColor() {
    let matColorIvory = document.getElementById("mat-color-ivory");
    matColorIvory.addEventListener("change", );
    let matColorMint = document.getElementById("mat-color-mint");
    matColorMint.addEventListener("change", );
    let matColorWine = document.getElementById("mat-color-wine");
    matColorWine.addEventListener("change", );
    let matColorIndigo = document.getElementById("mat-color-indigo");
    matColorIndigo.addEventListener("change", );
    let matColorCoal = document.getElementById("mat-color-coal");
    matColorCoal.addEventListener("change", );
    setCheckedAttributeForMatColor();
}

function setCheckedAttributeForMatColor() {
    if (matColor === 'ivory')  else if (matColor === 'mint') {
        document.getElementById("mat-color-mint").checked = true;
    }
}

function setFrameWidth() {
    let frameWidthSlider = document.getElementById("frameWidthSlider");
    let frameWidthInputField = document.getElementById("frameWidthInputField");
    if (frameWidth > 5)  else if (frameWidth < 2)  else {
        frameWidthInputField.value = frameWidth;
        frameWidthSlider.value = frameWidth;
    }
    frameWidthInputField.addEventListener("change", );
    frameWidthSlider.addEventListener("change", );
    frameWidth = frameWidthInputField.value;
}

function setMatWidth() {
    let matWidthSlider = document.getElementById("matWidthSlider");
    let matWidthInputField = document.getElementById("matWidthInputField");
    if (matWidth > 10)  else if (matWidth < 0)  else {
        matWidthInputField.value = matWidth;
        matWidthSlider.value = matWidth;
    }
    matWidthInputField.addEventListener("change", () => {
        if (matWidthInputField.value > 10)  else if (matWidthInputField.value < 0)  else {
            matWidthSlider.value = matWidthInputField.value;
            matWidth = matWidthSlider.value;
            matWidthInputField.value = matWidth;
            render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
            addPrice(printSize, frameStyle, frameWidth, matWidth);
        }
    });
    matWidthSlider.addEventListener("change", );
    matWidth = matWidthInputField.value;
}

function addToCart() {
    const submitBtn = document.getElementById("addToCart");
    submitBtn.addEventListener("click", );
}