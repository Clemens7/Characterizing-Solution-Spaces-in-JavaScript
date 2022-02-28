/*
run on import
*/
if (!location.href.split('\/').includes("checkout.html")) {
    updateCartCount();
}

/**
 * adds an artowork including a frame configuration to the cart
 * 
 * @param objectID objectID of the artwork
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 * @param matColor The color of the mat, as a string.
 */
export 

/**
 * Check if cart exists and is not empty
 * 
 */
export function cartExistsAndNotEmpty() {
    //return !(!window.localStorage.getItem('cart') || (JSON.parse(window.localStorage.getItem('cart'))).length == 0 || typeof (JSON.parse(window.localStorage.getItem('cart'))) !== "object");
    return window.localStorage.getItem('cart') ;
}

/**
 * removes an artowork from the cart
 * 
 * @param objectID ArtmartID of the artwork
 */
export 

/**
 * returns an Array containing the items in the cart.
 */
export function getCart() {
    return JSON.parse(localStorage.getItem('cart'))
}

export function updateCartCount() {
    if (getCart() != null) 
}

/**
 * Build frame description string
 *
 * @param cartItem object from carts localstore
 */
export 

