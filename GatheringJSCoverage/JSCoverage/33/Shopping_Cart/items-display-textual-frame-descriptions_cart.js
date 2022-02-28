export function updateCartSize() {
    let cart  = JSON.parse(localStorage.getItem('cart'));

    if (cart && cart.length > 0) {
        document.getElementById("cart-link").innerHTML = "Cart (" + cart.length + ")";
    }
}