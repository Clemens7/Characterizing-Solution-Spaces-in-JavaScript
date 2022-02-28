import { calculatePrice, render } from './frame.js'

/**
 * Executes functions on page load.
 */
function pageLoad() {
    storeConfiguration();
    setCartNumber();
    addItemsFromCart();
    const prices = calculateItemPrices(getCartStorage());
    setTotalCartPrice(prices);
    addOnclickEventHandlerToCheckout();
}

/**
 * Stores the configuration of the artwork including the objectID.
 */
function storeConfiguration() {
    const urlParams = new URLSearchParams(window.location.search);
    const objectID = urlParams.get('object-id');
    const matWidth = urlParams.get('matWidth');
    const frameWidth = urlParams.get('frameWidth');
    const frameStyle = urlParams.get('frameStyle');
    const matColor = urlParams.get('matColor');
    const printSize = urlParams.get('printSize');

    window.history.replaceState(
        {},
        '',
        `${window.location.pathname}${window.location.hash}`,
    );
    
    // if cart is not called from config page no storing of data needed
    if (!objectID ) return;
}

/**
 * Adds an div with the 'cart-item' class for every item in the shopping cart.
 */
function addItemsFromCart() {
    let cartStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    let cart = JSON.parse(cartStorage);

    if (cart == null || cart.length === 0) {
        insertEmptyCartMessage();
        disableCheckoutButton();
    }
}

/**
 * Create all items in the cart and append it to the section.
 *
 * @param cart contains all cart-items and their configurations
 */


/**
 * Creates an cart-item {HTMLElement} that contains its needed information
 *
 * @param item the cart-item to create
 * @returns 
 */



/**
 *
 * @returns {Promise<*>}
 */



/**
 *
 * @param item
 * @returns {string}
 */



/**
 * Appends all nodes of {childNodes} to {parentNode}.
 *
 * @param parentNode the future parent node of all {childNodes}
 * @param childNodes the nodes to append as childes to {parentNode}
 * @returns the {parentNode} with all appended {childNodes}
 */


/**
 * Creates an {HTMLElement}-node with the specified attributes.
 *
 * @param tagName of the {HTMLElement} to create
 * @param attributesObject contains the attributes and their values as key-value-pairs
 * @returns a {HTMLElement} with the specified attributes
 */


/**
 * Inserts a message indicating an empty shopping cart
 */
function insertEmptyCartMessage() {
    let cartSection = document.getElementById('cart');
    let cartItems = document.getElementsByClassName('cart-item');

    if (cartItems.length === 1)  else {
        for (let i = 0; i < cartItems.length; i++) 
    }
    cartSection.insertBefore(createEmptyCartMessageNode(), document.getElementById('cart-total'));
}

/**
 * Creates an div node containing the message indicating an empty shopping cart.
 * @returns {HTMLDivElement} containing a span that contains the "empty shopping cart"-message
 */
function createEmptyCartMessageNode() {
    let cartMessage = document.createElement('div');
    cartMessage.setAttribute('class', 'cart-item');

    let messageNode = document.createElement('span');
    messageNode.setAttribute('class', 'title');
    messageNode.innerText = 'There are no items in your shopping cart.';

    cartMessage.appendChild(messageNode);
    return cartMessage;
}

/**
 * Disables the button with the id 'checkout-button'.
 */
function disableCheckoutButton() {
    let checkoutButton = document.getElementById('checkout-button');
    checkoutButton.disabled = true;
}

/**
 *
 */




function calculateItemPrices(cart) {
    if (cart == null) return null;}

function setTotalCartPrice(prices) {
    let totalPrice = 0;
    for (let id in prices) }

function getCartStorage() {
    const cartStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cartStorage == null) 
    const cart = JSON.parse(cartStorage);
    if (cart.length == 0) return null;}



function addOnclickEventHandlerToCheckout() {
    const checkoutButton = document.getElementById('checkout-button');

    checkoutButton.addEventListener('click', );
}


pageLoad();