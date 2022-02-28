const cart = "cart";

export function displayCartCount(){
    let count = JSON.parse(window.localStorage[cart]).length;
    if(count > 0)else{
        document.getElementById('cart-link').innerHTML = 'Cart';
    }
}