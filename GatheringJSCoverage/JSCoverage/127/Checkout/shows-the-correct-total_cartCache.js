import {CartObj} from './cartObj.js';

const KEY = 'cart';
let cart = [];

export function retrieve() {
    if(KEY in localStorage) {
        //console.log(`Retrieving ${KEY} from local storage`);
        let response = JSON.parse(localStorage[KEY]);
        //console.log(`Retrieved ${response[0].objectID} from local storage`);
        let newArray = [];
        for (let cartObj of response){
            newArray.push(new CartObj(cartObj.objectID, cartObj.printSize,
                cartObj.frameStyle, cartObj.frameWidth, cartObj.matColor,
                cartObj.matWidth));
        }
        return newArray;
    }
}

/*
export function addObjToCart(cartObj) {
    if (cartObj===undefined || !cartObj){
        return;
    }
    cart.push(cartObj);
    store();
}*/

export 

export 




/*

import * as Cart from './cartCache.js';


Example for adding cartObj to cart:
Cart.addToCart(123456, 'm', 'woody', 500, 'green', 500);
Cart.addToCart(5654561, 'l', 'allen', 200, 'blue', 500);
 */

/*
Example how to use items from Cart
let currentCart = Cart.retrieve();
console.log(`length of currentcart: ${currentCart.length}`);
console.log(`response from reading cart: ${currentCart[0].objectID}`);
console.log(`response from reading cart: ${currentCart[1].objectID}`);
 */
