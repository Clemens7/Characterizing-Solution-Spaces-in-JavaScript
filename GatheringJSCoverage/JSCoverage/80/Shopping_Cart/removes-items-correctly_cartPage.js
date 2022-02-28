import * as Cache from "./cache.js";
import * as Util from "./util.js";
import * as Frame from "./frame.js";
import {Cart} from "./cart.js";
import * as Api from "./api.js";

async function loadData() {
    cartSection.innerText = '';

    if(Cache.retrieveCart().getItemCount() === 0)  else {
        const itemList = Cache.retrieveCart().items.reverse();

        for(let item of itemList) {
            await appendCartItem(item);
        }
    }
    addCheckoutSection();
}

async function appendCartItem(item) {
    const artwork = await Api.resolveArtwork(item.objectID);
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.id = item.objectID;

    const previewContainer = document.createElement('div');
    previewContainer.classList.add('cart-preview');
    previewContainer.id = `preview-container-${item.objectID}`;

    const a = document.createElement('a');
    a.href = `/config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameStyle=${item.frameStyle}&frameWidth=${item.frameWidth}&matColor=${item.matColor}&matWidth=${item.matWidth}`;
    const previewImage = document.createElement('img');
    previewImage.classList.add('cart-thumb');
    previewImage.id = `preview-${item.objectID}`;
    previewImage.alt = `Image of ${artwork.title}`;
    previewImage.src = artwork.image;
    a.appendChild(previewImage);
    previewContainer.appendChild(a);

    cartItem.appendChild(previewContainer);

    previewImage.onload = () => {
        Frame.render(previewImage, previewImage, previewContainer, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
    };

    const label = document.createElement('div');
    label.classList.add('museum-label');
    const div = document.createElement('div');
    const artistSpan = document.createElement('span');
    artistSpan.innerText = `${artwork.artist}`;
    artistSpan.classList.add('artist');
    div.appendChild(artistSpan);
    const titleSpan = document.createElement('span');
    titleSpan.innerText = `${artwork.title}`;
    titleSpan.classList.add('title');
    div.appendChild(titleSpan);
    const dateSpan = document.createElement('span');
    dateSpan.innerText = `, ${artwork.date}`;
    dateSpan.classList.add('date');
    div.appendChild(dateSpan);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
    const frameDescriptionSpan = document.createElement('span');
    frameDescriptionSpan.innerText = buildDescriptionText(item);
    frameDescriptionSpan.classList.add('frame-description');
    div.appendChild(frameDescriptionSpan);
    label.appendChild(div);
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('cart-price');
    priceDiv.innerText = '€ ';
    const priceSpan = document.createElement('span');
    priceSpan.id = `price-${item.objectID}`;
    priceSpan.innerText = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    priceDiv.appendChild(priceSpan);
    label.appendChild(priceDiv);
    const removeButton = document.createElement('button');
    removeButton.classList.add('cart-remove');
    removeButton.addEventListener('click', (event) => {
       removeItem(event);
    });
    label.appendChild(removeButton);

    cartItem.appendChild(label);

    cartSection.appendChild(cartItem);
}

async function removeItem(event) {
    let itemList = Cache.retrieveCart().items;
    const cartItem = event.target.parentElement.parentElement;

    itemList.forEach((item, i) => {
        if(item.objectID == cartItem.id) {
            itemList.splice(i, 1);
        }
    });

    Cache.storeCart(new Cart(itemList));

    updateCartItems();
    await loadData();
}

function updateCartItems() {
    if(!Cache.retrieveCart().isEmpty()){
        document.getElementById('cart-link').innerHTML = `Cart (${Cache.retrieveCart().getItemCount()})`;
    }
}

function buildDescriptionText(item) {
    let descriptionText = "";

    switch(item.printSize) {
        case 'S':
            descriptionText = "Small";
            break;
        case 'M':
            descriptionText = "Medium";
            break;
        case 'L':
            descriptionText = "Large";
            break;
    }

    descriptionText += " print in a " + (item.frameWidth/10) + " cm " + item.frameStyle + " frame";

    if(item.matWidth !== 0) {
        descriptionText += " with a " + (item.matWidth/10) + " cm " + item.matColor + " mat";
    }

    return descriptionText + ".";
}

function addCheckoutSection() {
    const cartTotalDiv = document.createElement('div');
    cartTotalDiv.classList.add('cart-total');

    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    priceDiv.innerText = 'Total: € ';
    const priceTotalSpan = document.createElement('span');
    priceTotalSpan.id = 'price-total';
    priceTotalSpan.innerText = Util.formatPrice(Cache.retrieveCart().getTotalPrice());
    priceDiv.appendChild(priceTotalSpan);

    const checkoutButton = document.createElement('button');
    checkoutButton.type = 'button';
    checkoutButton.id = 'checkout-button';
    checkoutButton.innerText = 'Checkout';
    checkoutButton.disabled = Cache.retrieveCart().getItemCount() === 0;
    checkoutButton.addEventListener('click', );

    cartTotalDiv.appendChild(priceDiv);
    cartTotalDiv.appendChild(checkoutButton);

    cartSection.appendChild(cartTotalDiv);
}

const cartSection = document.getElementById('cart');

loadData();
