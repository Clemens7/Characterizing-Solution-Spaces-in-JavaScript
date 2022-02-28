export 


export function getCartProducts() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [];
    }
    return cart;
}

export function isCartEmpty() {
    const number = getCartProducts().length;
    console.log("cart items rn:" + number);
    return number < 1;
}


export 

export function countCart() {
    const cart = document.getElementById("cart-link");
    const count = getCartProducts().length;
    if (count > 0)  else {
        cart.innerHTML = `Cart`;
    }
}
