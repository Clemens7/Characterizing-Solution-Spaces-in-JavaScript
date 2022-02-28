import { getPrintSizes, render, calculatePrice } from "./frame.js";
import { addItemToCart, refreshNumberOfCartItems } from "./shopping_cart.js"

function setConfigParams() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('objectID')) {
        document.getElementById('object-id').value = urlParams.get('objectID');
    }

    if (urlParams.has('printSize')) 

    if (urlParams.has('frameWidth')) 

    if (urlParams.has('frameStyle')) 

    if (urlParams.has('matColor')) 

    if (urlParams.has('matWidth')) 
}





function getObjectID() {
    return document.getElementById('object-id').value;
}

function getPreviewImage() {
    return document.getElementById('preview-image');
}

function getPrintSize() {
    return document.querySelector('input[type=radio][name="printSize"]:checked').value;
}

function getFrameStyle() {
    return document.querySelector('input[type=radio][name="frameStyle"]:checked').value;
}

function getFrameWidthMM() {
    return document.getElementById('frame-width').value * 10;
}

function getMatColor() {
    return document.querySelector('input[type=radio][name="matColor"]:checked').value;
}

function getMatWidthMM() {
    return document.getElementById('mat-width').value * 10;
}

async function retrieveMetObject() {
    const objectID = getObjectID();
    const cacheKey = `objectID${objectID}`;
    if (localStorage[cacheKey])  else {
        const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
        const response = await fetch(url);
        if (response.status === 200) {
            const metObject = await response.json();
            localStorage[cacheKey] = JSON.stringify(metObject);
            return metObject;
        }}

function createPreviewLabel(metObject) {
    const imgLabel = document.getElementById('image-label');
    
    const artist = document.createElement('span');
    artist.className = 'artist';
    artist.textContent = metObject.artistDisplayName;
    imgLabel.appendChild(artist);

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = `${metObject.title}, `;
    imgLabel.appendChild(title);

    const date = document.createElement('span');
    date.textContent = metObject.objectDate;
    imgLabel.appendChild(date);
}

function initPreviewImage(imgSrc) {
    const img = getPreviewImage();
    img.src = imgSrc;
    img.onload = function () {
        const printSizes = getPrintSizes(img);
        document.getElementById('print-size-s-label').innerHTML = `Small<br>${printSizes.S[0] / 10} × ${printSizes.S[1] / 10} cm`;
        document.getElementById('print-size-m-label').innerHTML = `Medium<br>${printSizes.M[0] / 10} × ${printSizes.M[1] / 10} cm`;
        document.getElementById('print-size-l-label').innerHTML = `Large<br>${printSizes.L[0] / 10} × ${printSizes.L[1] / 10} cm`;
        configurationChanged();
    };
}

async function onPageLoaded() {
    setConfigParams();
    refreshNumberOfCartItems();

    const metObject = await retrieveMetObject();

    if (metObject) {
        initPreviewImage(metObject.primaryImageSmall);
        createPreviewLabel(metObject);
        configurationChanged();
    }
}

function configurationChanged() {
    renderImage();
    refreshTotalPrice();
    refreshTotalSize();
}

function renderImage() {
    render(getPreviewImage(),
        document.getElementById('preview-container'),
        getPrintSize(),
        getFrameStyle(),
        getFrameWidthMM(),
        getMatColor(),
        getMatWidthMM());
}

function refreshTotalPrice() {
    const price = calculatePrice(
        getPrintSize(),
        getFrameStyle(),
        getFrameWidthMM(),
        getMatWidthMM());
    document.getElementById('price').textContent = `€ ${price.toFixed(2)}`;
}

function refreshTotalSize() {
    const img = getPreviewImage();
    const printSize = getPrintSize();
    const frameWidth = getFrameWidthMM();
    const matWidth = getMatWidthMM();
    const printSizes = getPrintSizes(img);

    let totalWidth = printSizes[printSize][0];
    totalWidth += 2 * frameWidth;
    totalWidth += 2 * matWidth;
    totalWidth /= 10;

    let totalHeight = printSizes[printSize][1];
    totalHeight += 2 * frameWidth;
    totalHeight += 2 * matWidth;
    totalHeight /= 10;

    document.getElementById('total-size').innerText = `${totalWidth} × ${totalHeight} cm`;
}















// Event Listener
document.addEventListener("DOMContentLoaded", () => {
    onPageLoaded()
});

document.getElementById('frame-width').addEventListener('change', );

document.getElementById('frameWidthSlider').addEventListener('input', );

document.getElementById('mat-width').addEventListener('change', );

document.getElementById('matWidthSlider').addEventListener('input', );

document.getElementsByName('printSize').forEach(radio => radio.addEventListener('change', ));

document.getElementsByName('frameStyle').forEach(radio => radio.addEventListener('change', ));

document.getElementsByName('matColor').forEach(radio => radio.addEventListener('change', ));

document.getElementById('add-to-cart').addEventListener('click', );
