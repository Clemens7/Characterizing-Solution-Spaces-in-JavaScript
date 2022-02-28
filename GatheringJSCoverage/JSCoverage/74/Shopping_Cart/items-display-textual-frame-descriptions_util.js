/**
 * Displays the number of cart items in the header.
 */
export function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (cart !== null){
       let numCartItems = Object.values(cart).length;
       let elementCartLink = document.getElementById('cart-link');
       elementCartLink.innerText = `Cart (${numCartItems})`;
    }  
}

/**
 * Construct frame description from set options
 */
export function getConfigMessage(object) {
    let msg = "";
    switch (object.printSize) {
        case ('S'):
            msg = "Small ";
            break;
        
        case('L'):
            msg = "Large ";
            break;
        
    }

    msg += "print in a " + object.frameWidth/10 + " cm " + object.frameStyle + " frame";

    if(object.matWidth > 0) {
        msg += " with a " + object.matWidth/10 + " cm " + object.matColor + " mat";
    }

    msg += ".";

    return msg;
}