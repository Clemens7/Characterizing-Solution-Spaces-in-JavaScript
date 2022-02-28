import * as Cart from "./cart-api.js";

import * as Api from "./art-api.js";
import * as FrameUtil from "./frame.js";

let total = 0;

document.addEventListener("DOMContentLoaded", event => {
    //Cart.clearCart();
    //Cart.addToCart(new Cart.CartItem(39799, "S", "classic", 40, "ivory", 20));
    //Cart.addToCart(new Cart.CartItem(459055, "M", "elegant", 50, "wine", 0));

    Cart.showNumCartItems();
    clearCartRender();

    total = 0;
    let checkout = document.getElementById("checkout-button");

    if (Cart.cartIsEmpty())  else {
        renderCart(Cart.getCartItems());
        checkout.addEventListener("click", )
    }
});



function clearCartRender() {
    const container = document.getElementById("cart");
    const items = container.getElementsByClassName("cart-item");

    while (items[0]) 
}

async function renderCart(cartItems) {
    const renders = cartItems.map(item => displayCartItem(item));
    await Promise.all(renders);

    const priceSpan = document.getElementById("price-total");
    priceSpan.innerText = total;
}



async function displayCartItem(cartItem) {
    const template = document.getElementById("cart-template");
    const item = template.content.children[0];

    const newItem = document.importNode(item, true);
    newItem.id = `cart-item-${cartItem.objectID}`;

    const artworkData = (await Api.get_objects([cartItem.objectID])) [0];

    const preview = newItem.children[0];
    const link = preview.children[0];
    link.href = `/config.html?` +
        `objectID=${cartItem.objectID}&` +
        `printSize=${cartItem.printSize}&` +
        `frameStyle=${cartItem.frameStyle}&` +
        `frameWidth=${cartItem.frameWidth}&` +
        `matColor=${cartItem.matColor}&` +
        `matWidth=${cartItem.matWidth}`;
    const thumbnail = link.children[0];
    thumbnail.alt = `Picture ${cartItem.objectID}`;

    loadImage(cartItem, artworkData, preview, thumbnail);

    const label = newItem.children[1];
    fillLabel(label, artworkData, cartItem);

    const removeButton = label.children[2];
    removeButton.addEventListener("click", );

    const cartContainer = document.getElementById("cart");
    cartContainer.prepend(newItem);
}

async function fillLabel(label, artwork, cartItem) {
    const div = label.children[0];
    const artist = div.children[0];
    artist.innerText = artwork.artist;
    const title = div.children[1];
    title.innerText = artwork.title;
    const date = div.children[2];
    date.innerText = artwork.date;

    const desc = div.children[5];
    console.log(cartItem.frameWidth);
    console.log(cartItem.frameStyle);
    console.log(cartItem.matWidth);
    console.log(cartItem.matColor);

    let sizeString;
    if (cartItem.printSize == "S") {
        sizeString = "Small";
    }
    if (cartItem.printSize == "M") {
        sizeString = "Medium";
    }
    if (cartItem.printSize == "L") 

    desc.innerText = sizeString + " print in a "
        + cartItem.frameWidth + " cm "
        + cartItem.frameStyle + " frame with a "
        + cartItem.matWidth + " cm "
        + cartItem.matColor + " mat.";

    const price =
        FrameUtil.calculatePrice(
            cartItem.printSize, cartItem.frameStyle,
            cartItem.frameWidth, cartItem.matWidth);

    total += price;

    const priceLabel = label.children[1].children[0];
    priceLabel.innerText = price;
}

async function loadImage(cartItem, artwork, container, imageTag) {
    const imageLoadPromise = new Promise(resolve => {
        imageTag.onload = resolve;
        imageTag.src = artwork.imageUrl;
    });

    await imageLoadPromise;

    FrameUtil.render(imageTag, container,
        cartItem.printSize, cartItem.frameStyle,
        cartItem.frameWidth, cartItem.matColor,
        cartItem.matWidth);
}