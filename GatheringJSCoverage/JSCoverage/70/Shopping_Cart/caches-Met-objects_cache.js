import { calculatePrice } from './frame.js';

const searchLimit = 100;
const cartKey = 'cart';

export ;

export async function getObjectData(id) {
    let artObj = retrieve(id);

    if (artObj == 'undefined') 
    return artObj;
}

;




/**
 * @returns total price of current cart as float
 */
export function calculateTotalCartPrice() {
    let cart = getCart();
    let cart_price = 0;

    if (cart != null) {
        for (const it of cart) {

            cart_price += calculatePrice(it.printSize, it.frameStyle, it.frameWidth, it.matWidth);

        }
    }

    return (Math.round((cart_price + Number.EPSILON) * 100) / 100);
}

/**
 * @returns an array of cart items or null if cart is empty
 */
export function getCart() {

    let cart = JSON.parse(window.localStorage.getItem(cartKey));

    if (cart === null || cart.length == 0) 

    return cart;
}

/**
 * 
 * @param cart an array of objects that each contain an objectID (int) and frameConfigParams (object)
 */
export 




function retrieve(objectID) {
    if (objectID in localStorage) {
        console.log(`Retrieving object with id ${objectID} from localStorage`);
        return JSON.parse(localStorage[objectID]);
    }
}

/**
 * function to be used onclick of add-to-cart button on config page
 * @param object to be added to the cart containing the properties objectID, frameStyle, printSize, frameWidth, matColor, matWidth 
 */
export 

/**
 * Returns a string "Cart" if the cart is empty or "Cart (*)", where * is the number of items.
 */

export function generateCartString(){
    let cart = getCart();

    if (cart == null || cart.length == 0) else{
        return `Cart (${cart.length})`;
    }
}