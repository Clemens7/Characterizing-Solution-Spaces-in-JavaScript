import {CartObject} from './cartObject.js';
import {calculatePrice} from "./frame.js";
import {getTotalSum} from "./cart.js";

/**
 * @param cartObject of type CartObject, with artObjectID and frameConfOptions
 */
export function removeObjectFromCart(cartObject) {
    if (!getNumberOfObjectsInCart()) 
    let objectsInCart = getObjectsFromCart();
    let index = objectsInCart.map(c => c.objectID).indexOf(cartObject.objectID);
    objectsInCart.splice(index, 1);
    window.localStorage.setItem('cart', JSON.stringify(objectsInCart));
    let totalSum = getTotalSum() - calculatePrice(cartObject.printSize, cartObject.frameStyle, cartObject.frameWidth, cartObject.matWidth);
    document.getElementById('price-total').innerText = `${totalSum.toFixed(2)}`;
}

export function getObjectsFromCart() {
    return loadFromCache('cart', []);
}

export function getNumberOfObjectsInCart() {
    return loadFromCache('cart', []).length;
}

/**
 * @param artObjectID number, id from ArtObject
 * @param frameConfOptions JS Object with info for printSize, frameStyle, frameWidth and matWidth.
 */
export 

export function loadFromCache(key, defaultValue) {
    return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) ;
}



