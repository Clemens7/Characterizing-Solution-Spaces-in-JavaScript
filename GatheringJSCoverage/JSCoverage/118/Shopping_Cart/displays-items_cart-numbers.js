export function updateCartItemsNumber() {
    let cart = [];
    if (localStorage.getItem("cart") !== null) {
        cart = localStorage.getItem("cart");
        cart = JSON.parse(cart);
    }
    if (cart.length > 0) {
        document.getElementById('cart-link').innerHTML = "Cart (" + cart.length + ")";
    }
}
