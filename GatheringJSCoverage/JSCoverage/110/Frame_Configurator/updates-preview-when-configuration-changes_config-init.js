import * as MuseumAPI from '../metmuseum/museum-api.js'
import * as DOM from '../helpers/dom.js';
import * as UTILS from '../helpers/utils.js';
import * as CONF from './config-update.js';
import { addConfiguration } from '../cart/storage.js';

async function initArtwork() {
    initConfigFields();

    const objectID = UTILS.getSearchParam("objectID");
    if (objectID != 0 && !objectID) 
    const artwork = await MuseumAPI.getArtworkByObjectId(objectID)
        .catch(redirectToSearch);

    if (artwork) {
        DOM.getInputElementByName("object-id").value = artwork.objectID;

        initPreview(artwork);
        initDescription(artwork);
    }
}

function initPreview(artwork) {
    const previewImg = document.getElementById("preview-image");
    previewImg.addEventListener('load', event => {
        initPrintSizeDesc();
        CONF.refreshPreview();
    });
    DOM.setAttributes(previewImg, {
        src: artwork.img,
        alt: artwork.title
    });
}

function initDescription(artwork) {
    const imageLabel = document.getElementById("image-label");

    const artistElem = DOM.textElement("b", artwork.artist);
    const brEleme = document.createElement("br");
    const titleElem = DOM.textElement("em", artwork.title);
    const dateElem = DOM.textElement("span", `, ${artwork.date}`);

    imageLabel.innerHTML = "";
    imageLabel.appendChild(artistElem);
    imageLabel.appendChild(brEleme);
    imageLabel.appendChild(titleElem);
    imageLabel.appendChild(dateElem);
}

function initPrintSizeDesc() {
    CONF.setPreviewImgLoaded();
    CONF.refreshPrintSizeDesc();
}

function initConfigFields() {
    initPrintSize();
    initFrameStyle();
    initMatColor();
    initFrameWidth();
    initMatWidth();
}

function initPrintSize() {
    const printSizeDomMapping = {
        "S": "print-size-s",
        "M": "print-size-m",
        "L": "print-size-l"
    };
    initEnumConfigField("printSize", printSizeDomMapping);
}

function initFrameStyle() {
    const frameStyleDomMapping = {
        "classic": "frame-style-classic",
        "natural": "frame-style-natural",
        "shabby": "frame-style-shabby",
        "elegant": "frame-style-elegant"
    };
    initEnumConfigField("frameStyle", frameStyleDomMapping);
}

function initMatColor() {
    const matColorDomMapping = {
        "ivory": "mat-color-ivory",
        "mint": "mat-color-mint",
        "wine": "mat-color-wine",
        "indigo": "mat-color-indigo",
        "coal": "mat-color-coal"
    };
    initEnumConfigField("matColor", matColorDomMapping);
}

function initFrameWidth() {
    const frameWidth = UTILS.getSearchParam("frameWidth");
    if (frameWidth ) 
}

function initMatWidth() {
    const matWidth = UTILS.getSearchParam("matWidth");
    if (matWidth ) 
}

function initEnumConfigField(field, mapping) {
    const param = UTILS.getSearchParam(field);
    if (param ) 
}




DOM.onReady(initArtwork);
DOM.onFormSubmit('config-form', );