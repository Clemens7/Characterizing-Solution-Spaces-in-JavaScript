import { Cart } from "./cart-service.js";
import { updateCartCount } from "./header.js";
var cart = new Cart;
initCart();
function initCart() {
    let cartNode = document.getElementById("cart");
    for (var i = 0; i < cart.size; i++) {
        cartNode.insertBefore(createHTMLCartItem(i), cartNode.firstChild);
    }
    document.getElementById("price-total").innerText = `${Number(cart.getTotalPrice).toFixed(2)}`;
    updateCheckoutButton();
}
/*
display the usual artwork information (title, artist, date) and a textual description of the configuration.
*/
function createHTMLCartItem(index) {
    var item = cart.getCartItem(index);
    let cartitem = createHTMLElement("div", "cart-item");
    //description of the item
    item.artworkInformation.then(object => {
        //preview
        let divpreview = createHTMLElement("div", "cart-preview", undefined, `preview-container-${index}`);
        let link = createHTMLElement("a");
        link.href = `/config.html?objectID=${item.objectID}&printSize=${item.configuration.printSize}&frameStyle=${item.configuration.frameStyle}&frameWidth=${item.configuration.frameWidth}&matColor=${item.configuration.matColor}&matWidth=${item.configuration.matWidth}`;
        let image = createHTMLElement("img", "cart-thumb", undefined, `preview-${index}`);
        image.alt = "";
        image.src = object.image;
        link.appendChild(image);
        divpreview.appendChild(link);
        cartitem.appendChild(divpreview);
        //museum label
        let divmuseum = createHTMLElement("div", "museum-label");
        let divdescription = createHTMLElement("div");
        divdescription.appendChild(createHTMLElement("span", "artist", object.artist));
        divdescription.appendChild(createHTMLElement("span", "title", object.title));
        divdescription.appendChild(document.createTextNode(", "));
        divdescription.appendChild(createHTMLElement("span", "date", object.date));
        divdescription.appendChild(createHTMLElement("br"));
        divdescription.appendChild(createHTMLElement("br"));
        divdescription.appendChild(createHTMLElement("span", "frame-description", generateCartItemDescription(item.configuration)));
        divmuseum.appendChild(divdescription);
        //item price
        let divprice = createHTMLElement("div", "cart-price", "€ ");
        divprice.appendChild(createHTMLElement("span", undefined, `${Number(item.configuration.price).toFixed(2)}`, `price-${index}`));
        divmuseum.appendChild(divprice);
        //remove button
        let buttonremove = createHTMLElement("button", "cart-remove");
        buttonremove.type = "button";
        buttonremove.addEventListener("click", updateCart);
        divmuseum.appendChild(buttonremove);
        cartitem.appendChild(divmuseum);
        cart.getCartItem(index).configuration.loadImage(document.getElementById(`preview-${index}`), document.getElementById(`preview-container-${index}`));
    });
    return cartitem;
}

function updateCheckoutButton() {
    var checkoutbutton = document.getElementById("checkout-button");
    if (cart.isEmpty) 
    else {
        checkoutbutton.disabled = false;
        checkoutbutton.addEventListener("click", );
        document.getElementById("empty").remove();
    }
}
function createHTMLElement(elementName, className, inputText, id) {
    let element = document.createElement(elementName);
    if (className)
        element.className = className;
    if (id)
        element.id = id;
    if (inputText && inputText != null)
        element.innerText = inputText;
    return element;
}
function generateCartItemDescription(fd) {
    if (fd.matWidth == 0) 
    else {
        return `${fd.printSizeasString} print in a ${fd.frameWidth / 10} cm ${fd.frameStyle} frame with a ${fd.matWidth / 10} cm ${fd.matColor} mat.`;
    }
}

