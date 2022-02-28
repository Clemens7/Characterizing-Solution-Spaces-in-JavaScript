import { getPrintSizes, render, calculatePrice, calculateTotalSize } from './frame.js';
import { fetchJsonFromAPI } from './cache.js';
import { updateHeaderCartCount } from './cart.js'

const frameWidthSlider = document.getElementsByName('frameWidthR')[0];
const frameWidthField = document.getElementsByName('frameWidth')[0];
const matWidthSlider = document.getElementsByName('matWidthR')[0];
const matWidthField = document.getElementsByName('matWidth')[0];
const previewImage = document.getElementById('preview-image');
const imageLabel = document.getElementById('image-label');
const previewContainer = document.getElementById('preview-container');
const radioElements = document.querySelectorAll('input[type = radio]');
const form = document.getElementById('config-form');
const cartLink = document.getElementById('cart-link');

let config = {
    objectId : null,
    printSize: 'M',
    frameStyle: 'natural',
    frameWidth: 4,
    matColor: 'mint',
    matWidth: 5.5,
    price: 30.0,
    artist: null,
    title: null,
    date: null
}

form.onsubmit = ;






// TODO: display correct number of cart items
updateHeaderCartCount();

previewImage.onload = function() {
    calculatePrintSizeLabels();
    updatePreview();
};

for (let radioElement of radioElements) {
    radioElement.addEventListener('click', updateConfig);
}

let params = new URLSearchParams(window.location.search);
if (!params.has('objectID')) 

for (const [key, value] of params) {
    if (key === 'objectID') {
        config.objectId = value;

        fetchJsonFromAPI(config.objectId).then(data => {
            if (data === null) 
            config.artist = data.artistDisplayName;
            config.title = data.title;
            config.date = data.objectDate;
            imageLabel.innerHTML = `<strong>${config.artist}</strong> <br> <i>${config.title}, ${config.date}</i>`;
            previewImage.src = data.primaryImageSmall;
            previewImage.alt = `${config.title} by ${config.artist} from ${config.date}`;
        });
    }
}

frameWidthSlider.addEventListener('input', );
frameWidthField.addEventListener('focusout', );
matWidthSlider.addEventListener('input', );
matWidthField.addEventListener('focusout', );



function calculatePrintSizeLabels() {
    const sizes = getPrintSizes(previewImage);

    document.getElementById('print-size-s-label').innerHTML = `Small<br>${sizes.S[0]} × ${sizes.S[1]} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${sizes.M[0]} × ${sizes.M[1]} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${sizes.L[0]} × ${sizes.L[1]} cm`;
}



function updatePreview() {
    const priceLabel = document.getElementById('price');
    const totalSizeLabel = document.getElementById('total-size');
    const price = calculatePrice(config.printSize, config.frameStyle, config.frameWidth, config.matWidth);

    config.price = price;
    priceLabel.innerText = '€ ' + price.toFixed(2);
    totalSizeLabel.innerText = calculateTotalSize(previewImage, config.printSize, config.frameWidth, config.matWidth);

    render(previewImage, previewContainer, config.printSize, config.frameStyle, config.frameWidth*10, config.matColor, config.matWidth*10);
}
