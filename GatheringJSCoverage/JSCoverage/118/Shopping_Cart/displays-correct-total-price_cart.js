import { Artwork } from "./artwork.js";
import { calculatePrice } from "./frame.js";
import { render } from "./frame.js";
import { updateCartItemsNumber } from "./cart-numbers.js";


window.addEventListener('storage', );

displayItems();

function parseToArtwork(artwork_json) {
    return new Artwork(artwork_json.objectID, artwork_json.title, artwork_json.artistDisplayName, artwork_json.primaryImageSmall, artwork_json.objectDate);
}

function displayItems() {
    let cart = [];
    if (localStorage.getItem("cart") !== null) {
        cart = localStorage.getItem("cart");
        cart = JSON.parse(cart);
    }

    if (cart.length !== 0) {
        let i;
        for (i = 0; i < cart.length; i++) {
            addCartItem(cart[i], i)
        }
        document.getElementById('checkout-button').disabled = false;
        getSum();
    }
}



function addCartItem(item, i) {
    let pictureElement;
    let k;
    for (k = 0; k < localStorage.length; k++) {
        let storage = localStorage.getItem(localStorage.key(k));

        storage = JSON.parse(storage);
        let j;
        for (j = 0; j < storage.length; j++) {
            let obj = storage[j];
            if (obj.objectID === item.objectID) {
                pictureElement = new Artwork(obj.objectID, obj.title, obj.artistDisplayName, obj.primaryImageSmall, obj.objectDate);
                break;
            }
        }
    }


    if (pictureElement.title === undefined ) {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${item.objectID}`)
            .then((response) => {
                return response.json();
            }
        ).then(result => {
            pictureElement = parseToArtwork(result);
            createCartItemHtml(pictureElement, item, i);

            let cartCache = JSON.parse(localStorage.getItem("cartCache"));
            if (cartCache === null) {
                cartCache = [];
            }
            cartCache.push(new Artwork(result.objectID, result.artistDisplayName, result.title, result.primaryImageSmall, result.objectDate));
            localStorage.setItem("cartCache", JSON.stringify(cartCache));
        });
    }
}

function createCartItemHtml(pictureElement, item, i) {
    const outerContainer = document.createElement('div');
    outerContainer.className = `cart-item`;
    outerContainer.id = i;

    const firstContainer = document.createElement('div');
    firstContainer.className = `cart-preview`;

    const link = document.createElement('a');
    link.href = 'config.html' + "?objectID=" + item.objectID + "&printSize=" + item.printSize + "&frameStyle=" + item.frameStyle +
        "&frameWidth=" + item.frameWidth + "&matColor=" + item.matColor + "&matWidth=" + item.matWidth;
    link.id = `object-`+ item.objectID;

    const img = document.createElement('img');
    img.src = '' + pictureElement.imageURL;
    img.alt = ``;
    img.id = `preview-image-`+ item.objectID;
    img.className = `cart-thumb`;

    img.addEventListener('load', ()=> render(img, firstContainer, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth));

    const secondContainer = document.createElement('div');
    secondContainer.className = `museum-label`;

    const secondInnerContainer = document.createElement('div');

    const artist = document.createElement('span');
    artist.className = `artist`;
    artist.innerText = '' + pictureElement.artist;

    const title = document.createElement('span');
    title.className = 'title';
    title.innerText = '' + pictureElement.title;

    const date = document.createElement('span');
    date.innerText = ", " + pictureElement.date;

    const breakLine = document.createElement('p');

    const description = document.createElement('span');
    description.className = `frame-description`;
    let text = "";
    if (item.printSize === 'S') {
        text += "Small"
    } else if (item.printSize === 'M')  else {
        text += "Large"
    }
    text += " print in a " + (item.frameWidth/10) + " cm " + item.frameStyle + " frame";
    if (item.matWidth > 0) {
        text += " with a " + (item.matWidth/10) + " cm " + item.matColor + " mat."
    }
    description.innerText = text;

    const secondPriceContainer = document.createElement('div');
    secondPriceContainer.className = `cart-price`;
    secondPriceContainer.innerText = "€ ";

    const price = document.createElement('span');
    price.id = `price-` + i;
    price.innerText = "" + calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);

    const button = document.createElement('button');
    button.className = 'cart-remove';
    button.onclick = ;

    outerContainer.appendChild(firstContainer);
    outerContainer.appendChild(secondContainer);
    firstContainer.appendChild(link);
    link.appendChild(img);
    secondContainer.appendChild(secondInnerContainer);
    secondInnerContainer.appendChild(artist);
    secondInnerContainer.appendChild(title);
    secondInnerContainer.appendChild(date);
    secondInnerContainer.appendChild(breakLine);
    secondInnerContainer.appendChild(breakLine);
    secondInnerContainer.appendChild(description);
    secondContainer.appendChild(secondPriceContainer);
    secondPriceContainer.appendChild(price);
    secondContainer.appendChild(button);

    document.getElementById('cart').insertAdjacentElement("afterbegin", outerContainer);
    updateCartItemsNumber();
}



function getSum() {
    let sum = 0;
    let i;
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (i = 0; i < cart.length; i++) {
        let item = cart[i];
        sum += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth)
    }
    document.getElementById('price-total').innerText = sum.toString();
}




