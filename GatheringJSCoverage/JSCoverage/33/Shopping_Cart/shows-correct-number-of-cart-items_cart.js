export function updateCartSize() {
    let cart  = JSON.parse(localStorage.getItem('cart'));

    if (cart && cart.length > 0)  else {
        document.getElementById("cart-link").innerHTML = "Cart";
    }
}