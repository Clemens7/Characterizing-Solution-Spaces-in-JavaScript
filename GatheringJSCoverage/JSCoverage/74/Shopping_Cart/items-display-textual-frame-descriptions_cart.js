import {render, calculatePrice} from "./frame.js";
import {displayCartItems, getConfigMessage} from "./util.js";

window.onload = async function() {
    await renderCart();
};

async function renderCart() {
    displayCartItems();
    displayTotal();

    let cart = JSON.parse(localStorage.getItem("cart"));

    if(cart != null && cart.length > 0) {
        await renderAllCartItems(cart);
    }

}

/**
 * Creates the node for the "There are no items in your shopping cart." message
 */


/**
 * Disables the checkout button
 * @param cartNode is the node with id cart
 */


/**
 * Renders all cart items
 * @param cart
 * @returns {Promise<void>}
 */
async function renderAllCartItems(cart){

    let config = [];

    for (let i = 0; i < cart.length; i++) {

        let data = localStorage.getItem(cart[i]);

        // load from cache
        if (data != null )  else {
            let resp = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + cart[i].objectID)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    createCartItem(cart, data, i, config);
                });
         }

    }
    addEventListeners();

}


/**
 * Renders the preview image of a cart item
 * @param configuration
 * @param cartItem
 */
function renderCartItem(configuration, cartItem) {
    configuration.image.onload = function() {
        render(configuration.image, configuration.container, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth);
    }
}

/**
 * Creates a new cart item in cart
 * @param cart
 * @param data
 * @param i
 * @param config
 */
function createCartItem(cart, data, i, config) {
    //create a new cart item node
    let cartItem = document.getElementsByClassName("cart-item")[0];
    let newCartItem = createCartItemNode();

    // set picture
    let previewContainerNode = newCartItem.children.item(0);
    let previewNode = newCartItem.children.item(0).children.item(0).children.item(0);
    previewNode.setAttribute("src", data.primaryImageSmall);
    previewNode.setAttribute("alt", data.title);

    config.push({'image': previewNode, 'container': previewContainerNode});
    config[i].image.src = data.primaryImageSmall;
    renderCartItem(config[i], cart[i]);

    //link image to config page
    let configParams = new URLSearchParams((cart[i]));
    let configURL = '/config.html?' + configParams.toString();
    let aNode = newCartItem.children.item(0).children.item(0);
    aNode.setAttribute("href", configURL);

    //set museum labels
    let museumLabelsNode = newCartItem.children.item(1).children.item(0).children;
    let frameDescription = getConfigMessage(cart[i]);
    setCartItemNodes(museumLabelsNode, data.artistDisplayName, data.title, data.objectDate, frameDescription);

    // set price
    let price = getPrice(cart[i]);
    let priceNode = newCartItem.children.item(1).children.item(1);
    priceNode.textContent = "€ " + price;

    //insert new cart item node into cart node, above the cart total node
    let cartNode = document.getElementById("cart");
    let cartTotal = document.getElementsByClassName("cart-total")[0];
    cartNode.insertBefore(newCartItem, cartItem);

    //edge case: delete very first cart item
    if(i === 0) {
        cartNode.removeChild(cartItem);
    }
}

/**
 * Set cart item values in children nodes
 * @param node is the museum label node
 * @param artistDisplayName
 * @param title
 * @param objectDate
 * @param frameDescription
 */
function setCartItemNodes(node, artistDisplayName, title, objectDate, frameDescription) {
    node.item(0).textContent = artistDisplayName;
    node.item(1).textContent = title;
    node.item(2).textContent = ", " + objectDate;
    node.item(5).textContent = frameDescription;
}

/**
 *
 * @param object is the cart item
 */
function getPrice(object) {
    return calculatePrice(object.printSize, object.frameStyle, object.frameWidth, object.matWidth);
}

/**
 * Updates the DOM to display the correct subtotal of all shopping cart items.
 */
function displayTotal(){
    let subtotalElement = document.getElementById('price-total');
    subtotalElement.innerText = calculateTotal();
}

/**
 * Calculates the subtotal of all items in the shopping cart.
 * @returns The subtotal of all items.
 */
function calculateTotal(){
    let cart = JSON.parse (localStorage.getItem('cart'));
    let subtotal = 0;

    if (cart !== null){
        let cartLength = cart.length;
        for (let index = 0; index < cartLength; index++) {
            const item = cart[index];
            subtotal += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        }
    }
    return subtotal.toFixed(2);
}

/**
 * Removes the cart item from the local storage and updates the displayed items.
 */


/**
 * Calls all functions that add event listeners.
 */
function addEventListeners (){
    addOnSubmitClickEvent();
    addOnDeleteClickEvent();
}

// ********************* Event Listeners ****************************
/**
 * Subscribes to the submit event of the checkout button and redirects to the checkout page.
 */
function addOnSubmitClickEvent (){
    let btnCheckout = document.getElementById ('checkout-button');
    btnCheckout.addEventListener('click', );
}

/**
 * Subscribes to the submit event of the delete button.
 */
function addOnDeleteClickEvent() {
    let btnDelete = document.getElementsByClassName("cart-remove");

    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener('click', )
    }
}


/**
 * Creates new cart item node
 * @returns {HTMLDivElement}
 */
function createCartItemNode() {
    let cartItemNode = document.createElement("div");
    cartItemNode.classList.add("cart-item");

    let cartPreviewNode = document.createElement("div");
    cartPreviewNode.classList.add("cart-preview");
    cartPreviewNode.setAttribute("id", "preview-container-0");

    cartItemNode.appendChild(cartPreviewNode);

    let aNode = document.createElement("a");
    aNode.setAttribute("href", "");

    cartPreviewNode.appendChild(aNode);

    let imgNode = document.createElement("img");
    imgNode.classList.add("cart-thumb");
    imgNode.setAttribute("src", "");
    imgNode.setAttribute("id", "preview-0");
    imgNode.setAttribute("alt", "");

    aNode.appendChild(imgNode);

    let museumLabelNode = document.createElement("div")
    museumLabelNode.classList.add("museum-label");

    cartItemNode.appendChild(museumLabelNode);

    let divNode = document.createElement("div");
    let span1 = document.createElement("span");
    span1.classList.add("artist");
    divNode.appendChild(span1);

    let span2 = document.createElement("span");
    span2.classList.add("title");
    divNode.appendChild(span2);

    let span3 = document.createElement("span");
    span3.classList.add("date");
    divNode.appendChild(span3);

    let brNode = document.createElement("br");
    divNode.appendChild(brNode);
    let brNode2 = document.createElement("br");
    divNode.appendChild(brNode2);

    let span4 = document.createElement("span");
    span4.classList.add("frame-description");
    divNode.appendChild(span4);

    museumLabelNode.appendChild(divNode);

    let cartPriceNode = document.createElement("div");
    cartPriceNode.classList.add("cart-price");

    museumLabelNode.appendChild(cartPriceNode);

    let spanNode = document.createElement("span");
    spanNode.setAttribute("id", "price-0");
    cartPriceNode.appendChild(spanNode);

    let btnNode = document.createElement("button");
    btnNode.classList.add("cart-remove");
    btnNode.setAttribute("type", "button");
    museumLabelNode.appendChild(btnNode);

    return cartItemNode;
}