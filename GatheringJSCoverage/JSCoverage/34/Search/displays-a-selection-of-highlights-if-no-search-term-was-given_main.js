const cart = "cart";

export function displayCartCount(){
    let count = JSON.parse(window.localStorage[cart]).length;
    if(count > 0)
}