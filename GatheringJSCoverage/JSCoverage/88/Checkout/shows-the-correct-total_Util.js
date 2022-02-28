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
export 

// -----------------------------------------------
// Select Options helper functions
// -----------------------------------------------

// adds given country <option>'s to a given <select> element
export function addSelectCountryOptions(selectElement, countries) {
    let country;
    for (country of countries) {
        addSelectOption(selectElement, country.country, country.displayName)
    }
}

// appends a <option> with argument value and innerhtml optioName to a <select>
function addSelectOption(selectElement, optionValue, optionName) {
    const option = document.createElement('option');
    option.setAttribute('value', optionValue);
    option.innerText = optionName;
    selectElement.appendChild(option);
}
