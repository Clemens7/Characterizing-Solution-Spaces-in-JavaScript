import { requestById } from './museumAPI.js';
import * as frame from './frame.js';
class Artwork {
    constructor(objectID, printSize, printSizeShort, frameStyle, frameWidth, matColor, matWidth, image, title, artist, date, price) {
        this.objectID = objectID;
        this.printSize = printSize;
        this.printSizeShort = printSizeShort;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
        this.image = image;
        this.title = title;
        this.artist = artist;
        this.date = date;
        this.price = price;
    }
}

let cart;

document.addEventListener('DOMContentLoaded', async event => {
    cart = parseCart();

    if (cart.length === 0)
    else {
        nonEmptyCart();
        calcPrice();
        for (let n in cart) {
            let artwork = await getMetaData(cart[n]);
            document.getElementById("cart").insertBefore(createPreview(artwork, n), document.getElementById("emptyMessage"));
        }
        calcTotal();
    }

});


function parseCart() {
    let cartT = [];
    for (let n of JSON.parse(localStorage.getItem("cart"))) {
        let size = "";
        switch (n.printSize) {
            case "S":
                size = "Small";
                break;
            
            case "L":
                size = "Large";
                break;
        }
        cartT.push(new Artwork(n.objectID, size, n.printSize, n.frameStyle, n.frameWidth, n.matColor, n.matWidth, null));

    }
    return cartT;
}

async function getMetaData(artwork) {
    if (localStorage.getItem(artwork.objectID)) else {
         await requestById(artwork.objectID).then((painting => {
            artwork.image = painting.primaryImageSmall;
            artwork.title = painting.title;
            artwork.artist = painting.artistDisplayName;
            artwork.date = painting.objectDate;
            localStorage[painting.objectID] = JSON.stringify(painting)
        }));
    }
    return artwork;
}

function calcPrice() {
    for (let n of cart){
        n.price = frame.calculatePrice(n.printSizeShort, n.frameStyle, n.frameWidth, n.matWidth);
    }
}
function calcTotal() {
    let sum = 0;
    for (let n of cart){
        sum += frame.calculatePrice(n.printSizeShort, n.frameStyle, n.frameWidth, n.matWidth);
    }
    sum = Math.round((sum + Number.EPSILON) * 100) / 100;
    document.getElementById("price-total").innerText = sum.toString();
}



function nonEmptyCart() {
    document.getElementById("emptyMessage").innerText = "";
    document.getElementById("checkout-button").disabled = false;
}

function createPreview(artwork, id) {
    const cartItem = document.createElement('div');
    cartItem.className = "cart-item";

    const cartPreview = document.createElement("div");
    cartPreview.className = "cart-preview";
    cartPreview.id = "preview-container-" + id;

    const a = document.createElement("a");
    a.href = './config.html?objectID=' + artwork.objectID + '&printSize=' + artwork.printSizeShort + '&frameStyle=' + artwork.frameStyle + '&frameWidth=' + artwork.frameWidth + '&matColor=' + artwork.matColor + '&matWidth=' + artwork.matWidth;

    const img = document.createElement("img");
    img.className = "cart-thumb";
    img.src = artwork.image;
    img.id = "preview-" + id;
    img.alt = "";
    img.addEventListener("load", evt => frame.render(img, cartPreview, artwork.printSizeShort, artwork.frameStyle, artwork.frameWidth, artwork.matColor, artwork.matWidth));

    a.appendChild(img);
    cartPreview.appendChild(a);
    cartItem.appendChild(cartPreview);

    const museumLabel = document.createElement("div");
    museumLabel.className = "museum-label";

    const div = document.createElement("div");

    const artist = document.createElement("span");
    artist.className = "artist";
    artist.innerText = artwork.artist;

    const title = document.createElement("span");
    title.className = "title";
    title.innerText = artwork.title;

    const date = document.createElement("span");
    date.className = "date";
    date.innerText = artwork.date;

    const frameDescription = document.createElement("span");
    frameDescription.className = "frame-description";
    if (artwork.matWidth > 0) {
        frameDescription.innerText = artwork.printSize + " print in a " + artwork.frameWidth/10 + " cm " + artwork.frameStyle + " frame with a " + artwork.matWidth/10 + " cm " + artwork.matColor + " mat.";
    }

    const cartPrice = document.createElement('div');
    cartPrice.className = "cart-price";
    cartPrice.innerText = "€ ";

    const price = document.createElement("span");
    price.id = "price-" + id;
    price.innerText = artwork.price;

    const button = document.createElement("button");
    button.className = "cart-remove";
    button.addEventListener("click", );

    div.appendChild(artist);
    div.appendChild(title);
    const bs = document.createElement("span");
    bs.innerText = ", ";
    div.appendChild(bs);
    div.appendChild(date);
    div.appendChild(document.createElement("br"));
    div.appendChild(frameDescription);

    cartPrice.appendChild(price);

    museumLabel.appendChild(div);
    museumLabel.appendChild(cartPrice);
    museumLabel.appendChild(button);

    cartItem.appendChild(museumLabel);

    return cartItem;
}
