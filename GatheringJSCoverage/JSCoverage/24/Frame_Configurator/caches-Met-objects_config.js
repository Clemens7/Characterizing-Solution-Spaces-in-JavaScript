
import { render, getPrintSizes, calculatePrice } from './frame.js';
import  * as cart  from './cart.js';
import { loadObject } from "./artworkApi.js";


let artwork = null;


function getConfig() {
    const formData = new FormData(document.getElementById('config-form'));
    return {
        objectID: formData.get('object-id'),
        printSize: formData.get('printSize'),
        frameStyle: formData.get('frameStyle'),
        frameWidth: formData.get('frameWidth') * 10,
        matColor: formData.get('matColor'),
        matWidth: formData.get('matWidth') * 10,
    }
}

export function initConfigurator() {
    const urlParams = new URLSearchParams(window.location.search);

    cart.renderCart();

    // Set preset parameters
    const form = document.getElementById('config-form');
    form['printSize'].value = urlParams.get('printSize') || 'M';    
    form['frameStyle'].value = urlParams.get('frameStyle') || 'natural';
    form['matColor'].value = urlParams.get('matColor') || 'Mint';

    const frameWidth = (urlParams.get('frameWidth')  : 40) / 10;
    form['frameWidth'].value = frameWidth;
    form['frameWidthR'].value = frameWidth;

    const matWidth = (urlParams.get('matWidth')  : 55) / 10;
    form['matWidth'].value = matWidth;
    form['matWidthR'].value = matWidth;
    
    // Init handlers
    const inputNames = ['printSize', 'frameStyle', 'matColor']
    for (let name of inputNames) {
        for (let input of document.getElementsByName(name)) {
            input.onchange = updateConfigurator;
        }
    }

    const checkAndSyncWithSlider = (sliderName, lower, upper) => {
        return 
    }

    document.getElementsByName('frameWidth')[0].onchange = checkAndSyncWithSlider('frameWidthR', 2, 5);
    document.getElementsByName('matWidth')[0].onchange = checkAndSyncWithSlider('matWidthR', 0, 10);

    document.getElementsByName('frameWidthR')[0].onchange = 

    document.getElementsByName('matWidthR')[0].onchange = 

    document.getElementById('config-form').onsubmit = ;

    initialRenderConfigurator(urlParams);
}

async function initialRenderConfigurator(urlParams) {
    try {
        artwork = await loadObject(urlParams.get('objectID'));
    } 

    document.getElementById("object-id").value = artwork.objectID;

    // Render label
    const artist = document.createElement("b");
    artist.classList.add("artist");
    artist.innerHTML = artwork.artistDisplayName;
    
    const title = document.createElement("i");
    title.classList.add("title");
    title.innerHTML = artwork.title;
    
    const comma = document.createTextNode(', ');
    
    const date = document.createElement("span");
    date.classList.add("date");
    date.innerHTML = artwork.objectDate;

    const label = document.getElementById('image-label');
    label.appendChild(artist);
    label.appendChild(title);
    label.appendChild(comma);
    label.appendChild(date);

    // Render image
    await updateConfigurator();

    // Update print sizes
    const img = document.getElementById('preview-image');
    const printSizes = getPrintSizes(img);
    
    document.getElementById('print-size-s-label-val').innerHTML = `${printSizes.S[0]/10} &times; ${printSizes.S[1]/10}`;
    document.getElementById('print-size-m-label-val').innerHTML = `${printSizes.M[0]/10} &times; ${printSizes.M[1]/10}`;
    document.getElementById('print-size-l-label-val').innerHTML = `${printSizes.L[0]/10} &times; ${printSizes.L[1]/10}`;
}

export async function updateConfigurator() {
    return new Promise((res) => {
        const img = document.getElementById('preview-image');

        const updateImage = () => {
            const {printSize, frameStyle, frameWidth, matColor, matWidth} = getConfig();
            const container = document.getElementById('preview-container');
            render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth);

            // Update total size
            const printSizes = getPrintSizes(img);
            const [w, h] = printSizes[printSize];
            const totalWidth = Math.round(w + (2*frameWidth) + (2*matWidth))  / 10;
            const totalHeight = Math.round(h + (2*frameWidth) + (2*matWidth)) / 10;
            document.getElementById('total-size').innerHTML = `${totalWidth} &times; ${totalHeight} cm`;

            // Update price
            const price = calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2);
            document.getElementById('price').innerHTML = `&euro; ${price}`;
            res();
        }
        
        // Don't know if this is really necessary
        if(img.src !== artwork.primaryImageSmall) {
            img.src = artwork.primaryImageSmall;
            img.onload = updateImage;
        }
    });
}