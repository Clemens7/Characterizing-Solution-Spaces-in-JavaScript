import * as ArtworkCache from './helper/artwork-cache.js';
import * as ArtworkAPI from './helper/met-museum-api.js';
import * as FrameConfigurator from '../frame.js';
import * as Storage from './helper/storage.js'

var confPrintSize, confFrameStyle, confFrameWidth, confMatColor, confMatWidth;

const params = (new URL(document.location)).searchParams;
const objectID = params.get('objectID');
const printSize = params.get('printSize');
const frameStyle = params.get('frameStyle');
const frameWidth = params.get('frameWidth');
const matColor = params.get('matColor');
const matWidth = params.get('matWidth');
if (objectID == null) 
console.log(`objectID: ${objectID}`);
(async function() {
    const artwork = await ArtworkAPI.retrieveUsingObjectID(objectID);
    console.log(artwork);

    if (artwork.message === "ObjectID not found" || artwork === undefined) 
    const preview_image = document.getElementById('preview-image');
    preview_image.setAttribute("src", artwork.primaryImageSmall);

    document.getElementById('image-label').innerHTML = "<label><b>" +
        artwork.artistDisplayName +
        "</b><br><i>" + artwork.title +
        ",</i> " + artwork.objectDate +
        "</label>";
}())





if (printSize != null) 

if (frameStyle != null) 

if (frameWidth != null) 

if (matColor != null) 

if (matWidth != null) 
const printSizeRadioInputs = document.getElementsByName('printSize');
const printSizeInputs = Array.from(printSizeRadioInputs);
printSizeInputs.map(input => input.addEventListener('change', ));

const frameStyleRadioInputs = document.getElementsByName('frameStyle');
const frameStyleInputs = Array.from(frameStyleRadioInputs);
frameStyleInputs.map(input => input.addEventListener('change', ));

const matColorRadioInputs = document.getElementsByName('matColor');
const matColorInputs = Array.from(matColorRadioInputs);
matColorInputs.map(input => input.addEventListener('change', ));

function updateRenderer() {
    const printSizeRadioInputs = document.querySelectorAll("input[name='printSize']");
    const printSizeInputs = Array.from(printSizeRadioInputs);
    const printSizeInput = getCheckedItem(printSizeInputs);
    console.log(printSizeInput.value);
    confPrintSize = printSizeInput.value;

    const frameStyleRadioInputs = document.querySelectorAll("input[name='frameStyle']");
    const frameStyleInputs = Array.from(frameStyleRadioInputs);
    const frameStyleInput = getCheckedItem(frameStyleInputs);
    console.log(frameStyleInput.value);
    confFrameStyle = frameStyleInput.value;

    const frameWidthRadioInputs = document.querySelectorAll("input[name='frameWidth']");
    const frameWidthInputs = Array.from(frameWidthRadioInputs);
    const frameWidthInput = frameWidthInputs[0];
    console.log(frameWidthInput.value);
    confFrameWidth = frameWidthInput.value * 10;

    const matColorRadioInputs = document.querySelectorAll("input[name='matColor']");
    const matColorInputs = Array.from(matColorRadioInputs);
    const matColorInput = getCheckedItem(matColorInputs);
    console.log(matColorInput.value);
    confMatColor = matColorInput.value;

    const matWidthRadioInputs = document.querySelectorAll("input[name='matWidth']");
    const matWidthInputs = Array.from(matWidthRadioInputs);
    const matWidthInput = matWidthInputs[0];
    console.log(matWidthInput.value);
    confMatWidth = matWidthInput.value * 10;

    const preview_image = document.getElementById('preview-image');
    const container = document.getElementById('preview-container');
    FrameConfigurator.render(preview_image, container, printSizeInput.value, frameStyleInput.value, frameWidthInput.value, matColorInput.value, matWidthInput.value);
    document.getElementById('price').innerText = `€ ${FrameConfigurator.calculatePrice(printSizeInput.value, frameStyleInput.value, frameWidthInput.value*10, matWidthInput.value*10).toFixed(2)}`;
    document.getElementById('total-size').innerText = `${Math.round(((printSizeInput.value=="S":printSizeInput.value=="M"?42)+frameWidthInput.value*2+matWidthInput.value*2)*10)/10} × ${Math.round(((printSizeInput.value=="S":printSizeInput.value=="M"?28.7)+frameWidthInput.value*2+matWidthInput.value*2)*10)/10} cm`;
}


function getCheckedItem(items) {
    let checkedItem;
    for (let item of items) {
        if (item.type === 'radio') {
            if (item.checked) {
                checkedItem = item;
            }
        }
    }
    return checkedItem;
}

document.getElementById('frameWidth').addEventListener("change", );

document.getElementById('frameWidthR').addEventListener("change", );

document.getElementById('matWidth').addEventListener("change", );

document.getElementById('matWidthR').addEventListener("change", );

document.getElementById('add-to-chart').addEventListener("click", );

document.addEventListener('DOMContentLoaded', event => {
    updateRenderer();
    updateCartItems();
});


function updateCartItems() {
    const cart_link = document.getElementById('cart-link');
    const numberOfItems = Storage.getCartItemCount();
    if (numberOfItems > 0)  else {
        cart_link.innerHTML = `Cart`;
    }
}
