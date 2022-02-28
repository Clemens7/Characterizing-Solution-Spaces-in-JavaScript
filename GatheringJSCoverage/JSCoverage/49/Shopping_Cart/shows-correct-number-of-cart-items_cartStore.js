import {CartObject} from './cartObject.js';
import {calculatePrice} from "./frame.js";
import {getTotalSum} from "./cart.js";

/**
 * @param cartObject of type CartObject, with artObjectID and frameConfOptions
 */
export 

export 

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



