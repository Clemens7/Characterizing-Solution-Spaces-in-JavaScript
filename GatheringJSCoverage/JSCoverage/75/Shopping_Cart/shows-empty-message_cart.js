
let artworks = JSON.parse(localStorage.getItem('cart'));
if (artworks === null) {
    let empty = [];
    localStorage.setItem('cart', JSON.stringify(empty));
}

artworks = JSON.parse(localStorage.getItem('cart'));


document.addEventListener('DOMContentLoaded', showCart);

async function showCart() {
    
    if (artworks.length === 0) {
        let section = document.getElementById('cart');
        section.innerHTML = "<h2>There are no items in your shopping cart.</h2>" +
            "      <div class=\"cart-total\">\n" +
            "        <div class=\"price\">Total: € <span id=\"price-total\">0</span></div>\n" +
            "        <button type=\"submit\" id=\"checkout-button\">Checkout</button>\n" +
            "      </div>";
        let button = document.getElementById('checkout-button');
        button.disabled = true;
    }
    for (let i = artworks.length - 1; i >= 0; i--) 
}




let header = document.getElementById('cart-link');
if (artworks.length === 0) {
    header.innerText = 'Cart'
}










//checkout button redirects to checkout site
let checkoutButton = document.getElementById("checkout-button");
checkoutButton.addEventListener("click", )




/**
 * Renders an image within a given square container as a print of a certain size, with a frame and a mat.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @param container The object that contains the Image.
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matColor The color of the mat, as a string.
 * @param matWidth The width of the mat, in millimeters.
 */



