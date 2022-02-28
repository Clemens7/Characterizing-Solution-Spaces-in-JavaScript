import {render, calculatePrice} from "./frame.js";
import {displayCartItems, getConfigMessage} from "./util.js";

window.onload = async function() {
    await renderCart();
};

async function renderCart() {
    displayCartItems();
    displayTotal();

    let cart = JSON.parse(localStorage.getItem("cart"));

    if(cart != null && cart.length > 0)  else {
        let msgNode = getEmptyCartMsgNode();
        let cartNode = document.getElementById("cart");
        cartNode.replaceChild(msgNode, cartNode.children.item(0));

        disableCheckoutButton(cartNode);
    }

}

/**
 * Creates the node for the "There are no items in your shopping cart." message
 */
function getEmptyCartMsgNode() {
    let newDiv = document.createElement("div");
    let newSpan = document.createElement("span");
    let txt = document.createTextNode("There are no items in your shopping cart.");
    newSpan.appendChild(txt);
    return newDiv.appendChild(newSpan);
}

/**
 * Disables the checkout button
 * @param cartNode is the node with id cart
 */
function disableCheckoutButton(cartNode) {
    cartNode.children.item(1).children.item(1).disabled = true;
}

/**
 * Renders all cart items
 * @param cart
 * @returns {Promise<void>}
 */



/**
 * Renders the preview image of a cart item
 * @param configuration
 * @param cartItem
 */


/**
 * Creates a new cart item in cart
 * @param cart
 * @param data
 * @param i
 * @param config
 */


/**
 * Set cart item values in children nodes
 * @param node is the museum label node
 * @param artistDisplayName
 * @param title
 * @param objectDate
 * @param frameDescription
 */


/**
 *
 * @param object is the cart item
 */


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
        for (let index = 0; index < cartLength; index++) 
    }
    return subtotal.toFixed(2);
}

/**
 * Removes the cart item from the local storage and updates the displayed items.
 */


/**
 * Calls all functions that add event listeners.
 */


// ********************* Event Listeners ****************************
/**
 * Subscribes to the submit event of the checkout button and redirects to the checkout page.
 */


/**
 * Subscribes to the submit event of the delete button.
 */



/**
 * Creates new cart item node
 * @returns {HTMLDivElement}
 */
