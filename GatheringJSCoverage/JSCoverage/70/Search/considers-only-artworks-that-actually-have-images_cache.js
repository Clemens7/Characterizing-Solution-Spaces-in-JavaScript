import { calculatePrice } from './frame.js';

const searchLimit = 100;
const cartKey = 'cart';

export async function searchArt(queryString) {
    let searchObj = retrieve(queryString);

    if (searchObj == 'undefined') {
        searchObj = await apiSearch(queryString);};

export 

async function apiSearch(queryString) {
    console.log(`Retrieving objects associated with ${queryString} from external API`);
    const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${queryString}&hasImages=true`);};




/**
 * @returns total price of current cart as float
 */
export 

/**
 * @returns an array of cart items or null if cart is empty
 */
export function getCart() {

    let cart = JSON.parse(window.localStorage.getItem(cartKey));

    if (cart === null ) {
        return null;
    }}

/**
 * 
 * @param cart an array of objects that each contain an objectID (int) and frameConfigParams (object)
 */
export 




function retrieve(objectID) {
    if (objectID in localStorage)  else {
        return 'undefined';
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

    if (cart == null ){
        return "Cart";
    }
}