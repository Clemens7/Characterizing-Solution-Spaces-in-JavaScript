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
export 