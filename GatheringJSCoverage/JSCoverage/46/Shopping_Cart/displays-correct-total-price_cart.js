import {ArtAPI} from "./artCollectionApi.js";
import {render, calculatePrice} from "./frame.js";
import {createContainer, createArtworkLabel, createTextNode} from "./htmlConstructsAPI.js";

const api = new ArtAPI();
let totalPrice;


document.addEventListener('DOMContentLoaded', async() => {
    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click',);
    if (!localStorage.getItem('cart'))  else {
        await createContent();
        await buttonEvent();
    }
});

// Constructs content in DOM
async function createContent() {
    let cart = await JSON.parse(localStorage.getItem('cart'));
    let countOfItems = cart.length;
    let i = 0;
    totalPrice= 0;
    for (let item of cart) {
        let toDisplay;
        if (! await localStorage.getItem(item.objectID)){
            toDisplay = await api.getObjectById(item.objectID);
            localStorage.setItem(''+item.objectID, JSON.stringify(item));
        }
        item.cartID = i;
        const image = createContainer("", "img", "cart-thumb",
            [["src", toDisplay["primaryImageSmall"]], ["alt", toDisplay["objectName"]], ["id", `preview-${i}`]]);
        let museumLabel = createArtworkLabel(toDisplay);
        let frameDes = document.createElement("span");
        frameDes.className = "frame-description";
        frameDes.innerText = getFrameDescription(item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);

        museumLabel.appendChild(document.createElement("br"));
        museumLabel.appendChild(document.createElement("br"));

        museumLabel.appendChild(frameDes);

        let price = createTextNode(calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth).toFixed(2), "span", "", [["id", `price ${i}`]]);
        let cartPrice = createContainer("", "div", "cart-price", []);
        cartPrice.innerText = "€";
        cartPrice.appendChild(price);

        let rmvButton = document.createElement("button");
        rmvButton.className = "cart-remove";

        museumLabel.appendChild(cartPrice);
        museumLabel.appendChild(rmvButton);
        const cart = document.getElementById('cart');

        // DONE: Fix href-query for config (mat is optional)
        const linkToCart = item.matWidth !== 0 ? createContainer([image], "a", "", [["href", `config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameWidth=${item.frameWidth}&frameStyle=${item.frameStyle}&matWidth=${item.matWidth}&matColor=${item.matColor}`]])
            ;
        const imagePreview = createContainer([linkToCart], "div", "cart-preview", [["id", `preview-container-${i}`]]);
        const cartItem = createContainer([imagePreview, museumLabel], "div", "cart-item");
        cart.prepend(cartItem);

        image.addEventListener('load', () => {
            render(image, imagePreview, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
        });
        i++;
        totalPrice+= calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    //Show total Price
    totalPrice = totalPrice.toFixed(2);
    const totalP = document.getElementById('price-total');
    totalP.innerHTML = `${totalPrice}`;

    //Show correct number of items:
    const cartLink = document.getElementById('cart-link');
    cartLink.innerHTML = 'Cart ('+`${countOfItems}`+')';
}
// gets specific frame-description of an artwork
function getFrameDescription(printSize, frameStyle, frameWidth, matColor, matWidth) {
    return (printSize === 'S' ? 'Small ' : printSize === 'M'  : 'Large ')
        + (`print in a ${frameWidth / 10} cm ${frameStyle} frame`) + (matWidth ? ` with a ${matWidth / 10} cm ${matColor} mat` ) + '.';
}
async function buttonEvent() {
    let buttons = document.querySelectorAll(".cart-remove");
    buttons.forEach(btn => btn.addEventListener('click', ));
}

