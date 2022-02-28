import * as fr from './frame.js'
import * as ac from './artwork-cache.js'
import * as NavigationBar from './navigation-bar.js';

const itemTemplate = {
    cartItem: '<div class="cart-item"></div>',
    preview: '<div class="cart-preview"></div>',
    link: '<a href=""></a>',
    img: '<img class="cart-thumb" src="" id="preview-" alt="">',
}

export 





/**
 * creates a html element for cart entry
 * @param item the html element should be created from
 */



window.onload = function () {

    displayCart();

    //TODO:remove following is just for testing!
    async function displayCart() {
        await NavigationBar.displayCartSize();
        let cart = await getCart();
        if (cart.length !== 0)  else {
            let emptyCartMessage = '<h3>There are no items in your shopping cart.</h3>';
            //get cart container
            let cartContainer = document.getElementById('cart');
            //create html message
            let elem = document.createElement('h3');
            elem.innerHTML = emptyCartMessage;
            //add message above checkout button/total price
            cartContainer.prepend(elem);
            //disable checkout Button according to a2
            document.getElementById('checkout-button').disabled = true;
        }

        /**
         * ADDED FROM DIANA - TESTING
         */
        displayTotalCosts();
    }
};


/**
 * appends an item to the page/document
 * @param item that has to be appended
 */




/**
 * adds a valid item consisting of the given parameters to the cart
 * @param objectID of the item to add
 * @param printSize of the item to add
 * @param frameStyle of the item to add
 * @param frameWidth of the item to add
 * @param matColor of the item to add
 * @param matWidth of the item to add
 * @returns true if the item was added successfully, otherwise false;
 */
export 


/**
 * removes item with given objectID from cart
 * @param objectID of the element that should be removed
 */


/**
 * returns list of current cart items if there are any, otherwise returns empty list
 * @returns {CartItem[]|{}}
 */
export async function getCart() {
    let cart = localStorage.getItem('cart');
    //return empty list if no cart items are stored
    if (cart === null) 
    //convert objects from type any to type CartItem before returning them
    cart = await JSON.parse(cart);
    cart = cart.map();
    return cart;
}

/**
 * stores current cart to local storage
 * @param cart that should be saved
 */


/*===================================================DIANA'S CODE===================================================*/


/**
 * gets size of cart
 * @returns {number} size of cart
 */
export async function cartSize() {
    const cart = await getCart();
    return cart.length;
}

/*
async function displayCart() {
    displayTotalCosts();
}
*/

/**
 * gets total cost
 */
export async function getTotalCosts() {
    const cart = await getCart();
    let item;
    let totalCosts = 0;
    console.log('cartSIZE');
    console.log(cart.length);
    for (let i = 0; i < cart.length; i++) 
    return totalCosts.toFixed(2);
}

async function displayTotalCosts() {
    const totalCosts = await getTotalCosts();
    let htmlTemplateElementCart = document.getElementById('price-total');
    if (totalCosts > 0) 
}



/*===================================================DIANA'S CODE END==================================================*/
/**
 * encapsulates cart item params
 */
class CartItem {
    
}

/**
 * encapsulates artworks
 */
class Artwork {
    
}

