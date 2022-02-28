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
    printSizeS.addEventListener("change", () => {
        document.getElementById('total-size').innerHTML = '297 × 297 cm';
        console.log('small');
        printSize = 'S';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        addPrice(printSize, frameStyle, frameWidth, matWidth);
    });
    let printSizeM = document.getElementById("print-size-m");
    printSizeM.addEventListener("change", () => {
        document.getElementById('total-size').innerHTML = '420 × 420 cm';
        console.log('medium');
        printSize = 'M';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        addPrice(printSize, frameStyle, frameWidth, matWidth);
    });
    let printSizeL = document.getElementById("print-size-l");
    printSizeL.addEventListener("change", () => {
        document.getElementById('total-size').innerHTML = '594 × 594 cm';
        console.log('large');
        printSize = 'L';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        addPrice(printSize, frameStyle, frameWidth, matWidth);
    });
    setCheckedAttributeForPrintSize();
}

function setCheckedAttributeForPrintSize() {
    if (printSize === 'S')  else if (printSize === 'M') {
        document.getElementById('print-size-m').checked = true;
    }
}

function setFrameStyle() {
    let frameStyleClassic = document.getElementById("frame-style-classic");
    frameStyleClassic.addEventListener("change", () => {
        console.log("classic");
        frameStyle = 'classic';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        addPrice(printSize, frameStyle, frameWidth, matWidth);
    });
    let frameStyleNatural = document.getElementById("frame-style-natural");
    frameStyleNatural.addEventListener("change", () => {
        console.log("natural");
        frameStyle = 'natural';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        addPrice(printSize, frameStyle, frameWidth, matWidth);
    });
    let frameStyleShabby = document.getElementById("frame-style-shabby");
    frameStyleShabby.addEventListener("change", () => {
        console.log("shabby");
        frameStyle = 'shabby';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        addPrice(printSize, frameStyle, frameWidth, matWidth);
    });
    let frameStyleElegant = document.getElementById("frame-style-elegant");
    frameStyleElegant.addEventListener("change", () => {
        console.log("elegant");
        frameStyle = 'elegant';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
        addPrice(printSize, frameStyle, frameWidth, matWidth);
    });
    setCheckedAttributeForPrintStyle();
}

function setCheckedAttributeForPrintStyle() {
    if (frameStyle === 'classic') {
        document.getElementById("frame-style-classic").checked = true;
    }
}

function setMatColor() {
    let matColorIvory = document.getElementById("mat-color-ivory");
    matColorIvory.addEventListener("change", () => {
        console.log("ivory");
        matColor = 'ivory';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
    });
    let matColorMint = document.getElementById("mat-color-mint");
    matColorMint.addEventListener("change", );
    let matColorWine = document.getElementById("mat-color-wine");
    matColorWine.addEventListener("change", () => {
        console.log("wine");
        matColor = 'wine';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
    });
    let matColorIndigo = document.getElementById("mat-color-indigo");
    matColorIndigo.addEventListener("change", );
    let matColorCoal = document.getElementById("mat-color-coal");
    matColorCoal.addEventListener("change", () => {
        console.log("coal");
        matColor = 'coal';
        render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
    });
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
    frameWidthInputField.addEventListener("change", () => {
        if (frameWidthInputField.value > 5)  else if (frameWidthInputField.value < 2)  else {
            frameWidthSlider.value = frameWidthInputField.value;
            frameWidth = frameWidthSlider.value;
            frameWidthInputField.value = frameWidth;
            render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
            addPrice(printSize, frameStyle, frameWidth, matWidth);
        }
    });
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