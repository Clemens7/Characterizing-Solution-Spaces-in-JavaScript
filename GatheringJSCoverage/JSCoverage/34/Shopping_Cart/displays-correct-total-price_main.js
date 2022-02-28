const cart = "cart";

export function displayCartCount(){
    let count = JSON.parse(window.localStorage[cart]).length;
    if(count > 0){
        document.getElementById('cart-link').innerHTML = `Cart (${count})`;
    }
}