export function updateCartSize() {
    let cart  = JSON.parse(localStorage.getItem('cart'));

    if (cart )  else {
        document.getElementById("cart-link").innerHTML = "Cart";
    }
}