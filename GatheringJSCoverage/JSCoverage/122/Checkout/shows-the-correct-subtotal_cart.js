import * as fr from './frame.js'
import * as ac from './artwork-cache.js'
import * as NavigationBar from './navigation-bar.js';

const itemTemplate = {
    cartItem: '<div class="cart-item"></div>',
    preview: '<div class="cart-preview"></div>',
    link: '<a href=""></a>',
    img: '<img class="cart-thumb" src="" id="preview-" alt="">',
}

export function createNodeFromHTMLString(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}





/**
 * creates a html element for cart entry
 * @param item the html element should be created from
 */



window.onload = ;


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
    cart = cart.map(item => {
        return new CartItem(item['objectID'],
            item['printSize'],
            item['frameStyle'],
            item['frameWidth'],
            item['matColor'],
            item['matWidth']);
    });
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
    for (let i = 0; i < cart.length; i++) {
        item = cart[i];
        console.log('=========');
        console.log('ITEM');
        console.log(item);
        console.log('=========');
        console.log('ITEM costs');
        console.log(getCost(item));
        console.log('=========');
        console.log('CURR TOTAL COSTS');
        totalCosts += parseFloat(getCost(item));
        console.log(totalCosts);
    }
    return totalCosts.toFixed(2);
}



function getCost(item) {
    return fr.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
}

/*===================================================DIANA'S CODE END==================================================*/
/**
 * encapsulates cart item params
 */
class CartItem {
    constructor(objectID, printSize, frameStyle,
                frameWidth, matColor, matWidth) {
        this.objectID = objectID;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
    }
}

/**
 * encapsulates artworks
 */
class Artwork {
    
}

