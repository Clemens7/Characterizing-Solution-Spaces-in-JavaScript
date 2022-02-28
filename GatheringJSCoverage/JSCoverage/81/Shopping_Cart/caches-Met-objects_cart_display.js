import {cart, Frame} from "./cart_objects.js";
import {calculatePrice, render} from "../frame.js";
import {retrieve} from "./cache.js";

async function displayCartItems() {
    const cartTotal = document.getElementsByClassName("cart-total")[0];
    const cartSection = document.getElementById("cart");
    const cartItems = cart.cartItems;

    removeGeneratedDom();

    let totalPrice = 0;
    for (let itemIndex in cartItems) {
        const cartItem = cartItems[itemIndex];
        const price = calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
        totalPrice += price;
        console.log(`Display index ${itemIndex}`);
        cartSection.insertBefore(await createFrameHtml(itemIndex, cartItem, price), cartTotal);
    }

    // cart is empty
    if (cartItems.length === 0) 

    // update total price
    document.getElementById("price-total").innerText = totalPrice.toFixed(2);
    console.log("Displayed Cart");
}

async function createFrameHtml(index, frame, priceAmount) {
    const object = await retrieve(frame.objectID);

    /** create Elements **/
    let cartItem = document.createElement("div");
    cartItem.setAttribute("class", "cart-item");

    let cartPreview =  document.createElement("div");
    cartPreview.setAttribute("class", "cart-preview");
    cartPreview.setAttribute("id",  `preview-container-${index}`);

    let link = document.createElement("a");
    link.setAttribute("href", `config.html?objectID=${frame.objectID}&printSize=${frame.printSize}&frameStyle=${frame.frameStyle}&frameWidth=${frame.frameWidth}&matColor=${frame.matColor}&matWidth=${frame.matWidth}`);

    let image = document.createElement("img");
    image.onload = (e) => render(image, document.getElementById(`preview-container-${index}`), frame.printSize, frame.frameStyle, frame.frameWidth, frame.matColor, frame.matWidth);
    image.setAttribute("class", "cart-thumb");
    image.setAttribute("src", object.image);
    image.setAttribute("id", `preview-${index}`);
    image.setAttribute("alt", object.title);

    let museumLabel = document.createElement("div");
    museumLabel.setAttribute("class", "museum-label");

    let div = document.createElement("div");

    let artist = document.createElement("span");
    artist.setAttribute("class", "artist");
    artist.innerText = object.artist;

    let title = document.createElement("span");
    title.setAttribute("class", "title");
    title.innerText = object.title;

    let date = document.createElement("span");
    date.setAttribute("class", "date");
    date.innerText = `, ${object.date}`;

    let frameDescription = document.createElement("span");
    frameDescription.setAttribute("class", "frame-description");
    frameDescription.innerText = generateFrameDescription(frame);

    let cartPrice = document.createElement("div");
    cartPrice.setAttribute("class", "cart-price");
    cartPrice.innerText = "€ ";

    let price = document.createElement("span");
    price.setAttribute("id", `price-${index}`);
    price.innerText = priceAmount.toFixed(2);

    let cartRemove = document.createElement("button");
    cartRemove.setAttribute("class", "cart-remove");
    cartRemove.onclick = ;

    /** add Elements together **/
    cartItem.appendChild(cartPreview);
    cartPreview.appendChild(link);
    link.appendChild(image);

    cartItem.appendChild(museumLabel);
    museumLabel.appendChild(div);
    div.appendChild(artist);
    div.appendChild(title);
    div.appendChild(date);
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(frameDescription);

    museumLabel.appendChild(cartPrice);
    cartPrice.appendChild(price);

    museumLabel.appendChild(cartRemove);

    return cartItem;
}

function removeGeneratedDom() {
    // enable checkout button
    document.getElementById("checkout-button").disabled = false;

    // remove cart items
    let items = document.getElementsByClassName("cart-item");
    while(items[0]) 

    // remove empty cart text
    let p = document.getElementById("cart-empty");
    if (p !== null) 
    console.log("removed existing generated DOM");
}

function generateFrameDescription(frame) {
    let text = "";
    switch (frame.printSize) {
        
        case "M":
            text="Medium";
            break;
        case "S":
            text="Small";
            break;
    }
    text += ` print in a ${frame.frameWidth/10} cm ${frame.frameStyle} frame`;
    if (frame.matWidth > 0) {
        text += ` with a ${frame.matWidth/10} cm ${frame.matColor} mat`;
    }
    return text + ".";
}

function addLinkToCheckout() {
    let checkout = document.getElementById("checkout-button");
    checkout.onclick = ;
}

addLinkToCheckout();
displayCartItems().then(() => cart.addOnChangeEvent(displayCartItems));