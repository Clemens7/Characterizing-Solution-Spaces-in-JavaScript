import { retrieveJson, fetchJsonFromAPI } from './cache.js';
import { calculatePrice, render } from './frame.js';

const cart = document.getElementById("cart");
let priceTotal = 0;
let id = 0;

document.addEventListener('DOMContentLoaded', event => {
    loadDataAndPopulateUI();
});


async function loadDataAndPopulateUI() {
    priceTotal = 0;
    try {
        let jsonItems = localStorage.getItem('cart');
        const elements = JSON.parse(jsonItems);
        if (elements.length === 0) 
        for (let e of elements) {
            try {   // load metadata from localStore if available
                const fetched = retrieveJson(e.objectID);
                populateItems(fetched, e, elements)
            }
            
        }
    } 
    updateHeaderCartCount();
}

function populateItems(fetched, e, elements) {
    const artwork = new artworkMetadata(0, fetched.artistDisplayName, fetched.title, fetched.objectDate, fetched.primaryImageSmall);
    artwork.price = calculatePrice(e.printSize, e.frameStyle, e.frameWidth, e.matWidth);
    priceTotal += parseFloat(artwork.price);
    cart.appendChild(createCartElement(id++, e, artwork));
    if (e === elements[elements.length - 1]) createPriceAndCheckout();
}


function artworkMetadata(price, artist, title, date, image) {
    this.price = price;
    this.artist = artist;
    this.title = title;
    this.date = date;
    this.image = image;
}

function createCartElement(id, item, artworkData) {
    const cartItem = document.createElement("div");
    cartItem.id = `cart-item-${id}`;
    cartItem.className = 'cart-item';

    const cartPreview = document.createElement("div");
    cartPreview.className = 'cart-preview';
    cartPreview.id = `preview-container-${id}`;
    cartItem.appendChild(cartPreview);

    const configRef = document.createElement("a");
    configRef.href = `config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameWidth=${item.frameWidth}&frameStyle=${item.frameStyle}&matWidth=${item.matWidth}&matColor=${item.matColor}`;
    cartPreview.appendChild(configRef);

    const img = document.createElement("img");
    img.className = 'cart-thumb';
    img.src = artworkData.image;
    img.alt = `${artworkData.title} by ${artworkData.artist} from ${artworkData.date}`;
    img.id = `preview-${id}`;
    img.addEventListener('load', () => { setItemImage(id, item)})
    configRef.appendChild(img);


    const museumLabel = document.createElement("div");
    museumLabel.className = "museum-label";
    cartItem.appendChild(museumLabel);
    const innerLabelDiv = document.createElement("div");
    museumLabel.appendChild(innerLabelDiv);

    const artist = document.createElement("span");
    artist.className = "artist";
    artist.innerText = artworkData.artist;
    innerLabelDiv.appendChild(artist);

    const title = document.createElement("span");
    title.className = "title";
    title.innerText = artworkData.title + ', ';
    innerLabelDiv.appendChild(title);

    const date = document.createElement("span");
    date.className = "date";
    date.innerText = artworkData.date;
    innerLabelDiv.appendChild(date);

    const br1 = document.createElement("br");
    innerLabelDiv.appendChild(br1);
    const br2 = document.createElement("br");
    innerLabelDiv.appendChild(br2);

    const frameDescription = document.createElement("span");
    frameDescription.className = "frame-description";
    frameDescription.innerText = frameDescriptor(item);
    innerLabelDiv.appendChild(frameDescription);

    const cartPrice = document.createElement("div");
    cartPrice.className = "cart-price";
    cartPrice.innerText = "€ ";
    museumLabel.appendChild(cartPrice);
    const priceSpan = document.createElement("span");
    priceSpan.id = `price-${id}`;
    priceSpan.innerText = artworkData.price;
    cartPrice.appendChild(priceSpan);

    const removeButton = document.createElement("button");
    removeButton.className = "cart-remove";
    removeButton.id = `cart-remove-${id}`;
    removeButton.addEventListener('click', );
    museumLabel.appendChild(removeButton);

    return cartItem;
}

function setItemImage(id, item) {
    let image = document.getElementById(`preview-${id}`);
    let container = document.getElementById(`preview-container-${id}`);
    render(image, container, item.printSize, item.frameStyle, item.frameWidth*10, item.matColor, item.matWidth*10);
}

// iterate over all items and inc counter (counter is delete index for cart-array)





function createPriceAndCheckout() {
    const cartTotal = document.createElement("div");
    cartTotal.className = "cart-total";
    cart.appendChild(cartTotal);
    const price = document.createElement("div");
    price.className = "price";
    price.innerText = "Total: € ";
    cartTotal.appendChild(price);
    const checkoutPriceTotal = document.createElement("span");
    checkoutPriceTotal.id = "price-total";
    checkoutPriceTotal.innerText = `${parseFloat(priceTotal)}`;
    price.appendChild(checkoutPriceTotal);
    const checkoutButton = document.createElement("button");
    checkoutButton.id = "checkout-button";
    checkoutButton.innerText = "Checkout";
    checkoutButton.addEventListener('click', );

    cartTotal.appendChild(checkoutButton);
}

export function updateHeaderCartCount() {
    let jsonItems = localStorage.getItem('cart');
    try {
        const elements = JSON.parse(jsonItems);
        let count = 0;
        elements.forEach(e => { count++ });
        const cartLink = document.getElementById("cart-link");
        if (count == 0)  else {
            cartLink.innerText = `Cart (${count})`;
        }
    } 
}

export function frameDescriptor(item) {
    let size;
    switch (item.printSize) {
        case "S": size = "Small"; break;
        case "M": size = "Medium"; break;
        
        
    }
    size+= ' print';
    if (item.frameWidth > 0) size += ` in a ${item.frameWidth/10} cm ${item.frameStyle} frame`;
    size += (item.matWidth > 0) ? ` with a ${item.matWidth/10} cm ${item.matColor} mat.` ;
    return size;
}
