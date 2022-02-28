import * as FrameHelper from "./frame.js";
import {getObject} from "./common.js";
import {addToCart} from "./cart-model.js";

const params = new URLSearchParams(window.location.search);
const form = document.getElementById("config-form");
document.getElementById("print-size-row").addEventListener("change", updatePage);
document.getElementById("frame-style-row").addEventListener("change", updatePage);
document.getElementById("mat-color-row").addEventListener("change", updatePage);

getObject(params.get("objectID")).then(object => {
    if (object === null) 

    document.getElementById("object-id").value = object.objectID;
    document.getElementById("preview-image").src = object.primaryImageSmall;
    document.getElementById("image-label").innerText = `${object.title}, ${object.artistDisplayName} (${object.objectDate})`
    document.getElementById("preview-image").onload = function () {
        updatePage();
    }
});

if (params.get("printSize")) 
if (params.get("frameStyle")) 
if (params.get("frameWidth")) 
if (params.get("matColor")) 
if (params.get("matWidth")) 



document.getElementById("mat-width-text").addEventListener("change", );
document.getElementById("mat-width-slider").addEventListener("change", );
document.getElementById("mat-width-slider").addEventListener("input", );
document.getElementById("frame-width-text").addEventListener("change", );
document.getElementById("frame-width-slider").addEventListener("change", );
document.getElementById("frame-width-slider").addEventListener("input", );
document.getElementById("mat-width-text").addEventListener("blur", );
document.getElementById("frame-width-text").addEventListener("blur", );

function updatePage() {
    const image = document.getElementById("preview-image");

    const printSizes = FrameHelper.getPrintSizes(image);
    document.getElementById("small-size").innerText = `${printSizes["S"][0] / 10} × ${printSizes["S"][1] / 10} cm`;
    document.getElementById("medium-size").innerText = `${printSizes["M"][0] / 10} × ${printSizes["M"][1] / 10} cm`;
    document.getElementById("large-size").innerText = `${printSizes["L"][0] / 10} × ${printSizes["L"][1] / 10} cm`;

    const printSize = form["printSize"].value;
    const frameWidth = form["frameWidth"].value * 10;
    const matWidth = form["matWidth"].value * 10;
    const frameStyle = form["frameStyle"].value;
    const matColor = form["matColor"].value;

    const borderWidth = 2 * matWidth + 2 * frameWidth;
    const totalWidth = printSizes[printSize][0] + borderWidth;
    const totalHeight = printSizes[printSize][1] + borderWidth;
    document.getElementById("total-size").innerText = `${totalWidth} × ${totalHeight} cm`;

    const previewContainer = document.getElementById("preview-container");
    FrameHelper.render(image, previewContainer, printSize, frameStyle, frameWidth, matColor, matWidth);

    const price = FrameHelper.calculatePrice(printSize, frameStyle, frameWidth, matWidth);
    document.getElementById("price").innerText = `€ ${price.toFixed(2)}`
}

form.addEventListener("submit", )
