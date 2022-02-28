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
    return window.localStorage.getItem('cart') && (JSON.parse(window.localStorage.getItem('cart'))).length != 0 && typeof (JSON.parse(window.localStorage.getItem('cart'))) === "object";
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
    if (getCart() != null) {
        document.getElementById('cart-link').innerText = `Cart (${getCart().length})`;
    }
}

/**
 * Build frame description string
 *
 * @param cartItem object from carts localstore
 */
export function buildFrameDescription(cartItem) {
    //The description should be like "Medium print in a 3.3 cm natural frame with a 1.7 cm mint mat." or "Small print in a 5 cm classic frame." (if the mat has width 0).
    var ret = "";
    switch (cartItem.printSize) {
        case "S":
            ret += "Small"
            break;
        case "M":
            ret += "Medium"
            break;
        
    }
    ret += " print in a "

    // 20 <= frameWidth <= 50
    ret += "" + cartItem.frameWidth / 10 + " cm " + cartItem.frameStyle + " frame";
    // 0<= matWidth <= 100
    if (cartItem.matWidth > 0) {
        ret += " with a ";
        if (cartItem.matWidth < 10) {
            ret += "0." + cartItem.matWidth + " mm ";
        } else {
            ret += "" + cartItem.matWidth / 10 + " cm ";
        }
        ret += cartItem.matColor + " mat"
    }
    ret += "."
    return ret;
}

