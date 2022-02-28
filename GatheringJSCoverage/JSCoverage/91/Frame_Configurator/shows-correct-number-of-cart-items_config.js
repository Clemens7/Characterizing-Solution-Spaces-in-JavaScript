import * as artworkCache from './artwork-cache.js';
import * as frameUtil from './frame.js';
import { Artwork } from './artwork.js';

// Get queries
let queryString = window.location.search;
let queries = {
    objectID: null,
    printSize: null,
    frameStyle: null,
    frameWidth: null,
    matColor: null,
    matWidth: null
};
for (const [key, value] of new URLSearchParams(queryString)) {
    queries = { ...queries, [key]: value };
}

// Redirect if necessary
if (!queries.objectID) 


window.addEventListener('load', () => {
    document.getElementById("config-form").addEventListener("submit", addToCart);

    // Set input values from query
    if (queries.printSize) 
    if (queries.frameStyle) 
    if (queries.frameWidth) 
    if (queries.matColor) 
    if (queries.matWidth) 

    // load image
    let artwork = artworkCache.retrieve(queries.objectID);
    if (artwork) {
        insertImageData(artwork);
        update();
    }

    // mirror sliders to inputs
    document.querySelectorAll('input[type=range], input[type=number]').forEach(element => {
        let event = element.getAttribute('type') === 'range' ? 'input' : 'change';
        element.addEventListener(event, );
    });

    // on change
    document.querySelectorAll('input').forEach((element) => {
        element.addEventListener('change', update);
    });
});

const changeRangeValues = 

const insertImageData = (artwork) => {
    document.getElementById('preview-image').setAttribute('src', artwork.image);
    document.getElementById('image-label').innerHTML = `<span class="artist">${artwork.artist}</span>
<span class="title">${artwork.title}</span>,
<span class="date">${artwork.date}</span>`;
}

const update = () => {
    let img = document.getElementById('preview-image');
    let container = document.getElementById('preview-container');
    let printSize = document.querySelector('input[name="printSize"]:checked').value;
    let frameStyle = document.querySelector('input[name="frameStyle"]:checked').value;
    let frameWidth = document.querySelector('input[name="frameWidth"]').value;
    let matColor = document.querySelector('input[name="matColor"]:checked').value;
    let matWidth = document.querySelector('input[name="matWidth"]').value;

    let ps = frameUtil.getPrintSizes(img);

    // Set size values
    document.getElementById('print-size-s-label').innerHTML = `Small<br>${ps.S[0]} × ${ps.S[1]} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${ps.M[0]} × ${ps.M[1]} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${ps.L[0]} × ${ps.L[1]} cm`;

    document.getElementById('price').innerHTML = `€ ${frameUtil.calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2)}`;

    let totalHeight = ps[printSize][0] + (2 * parseFloat(frameWidth)) + (2 * parseFloat(matWidth));
    let totalWidth = ps[printSize][1] + (2 * parseFloat(frameWidth)) + (2 * parseFloat(matWidth));
    document.getElementById('total-size').innerHTML = `${totalHeight} × ${totalWidth} cm`;

    frameUtil.render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);
}


