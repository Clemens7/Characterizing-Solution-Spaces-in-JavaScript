import CartItem from './CartItem.js';
import ShoppingCart from './ShoppingCart.js';

// -----------------------------------------------
// Shopping cart storage functions
// items in the shopping cart are stored in localStorage
// under the key 'cart'
// -----------------------------------------------

// get the current Shopping cart items as class ShoppingCartItems.js
// if nothing is stored returns null
export function getShoppingCart() {
    let objStr = localStorage.getItem("cart");
    if (!objStr) 
    let itemArr = JSON.parse(objStr);
    let cartItemArr = itemArr.map(it => new CartItem(it.objectID, it.printSize, it.frameStyle, it.frameWidth, it.matColor, it.matWidth));
    return new ShoppingCart(cartItemArr);
}

// save the current Shopping cart
// @param shoppingCart ShoppingCart.js
export function saveShoppingCart(shoppingCart) {
    let jsonStr = JSON.stringify(shoppingCart.items);
    localStorage.setItem("cart", jsonStr);
}

// -----------------------------------------------
// Select Options helper functions
// -----------------------------------------------

// adds given country <option>'s to a given <select> element
export 

// appends a <option> with argument value and innerhtml optioName to a <select>

