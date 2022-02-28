import { calculatePrice } from  './frame.js';
export function getCartItemNumber(){
    let text;
    let counter = 0;
    if (!localStorage.getItem('cart'))
    else {
        for (let i of JSON.parse(localStorage.getItem('cart'))){
            counter++;
        }
        text = `Cart (${counter})`;
    }

    document.getElementById("cart-link").innerHTML = text;
}

export function calculateTotalPrice() {
    let price = 0;
    if (!localStorage.getItem('cart'))
    else {
        for (let i of JSON.parse(localStorage.getItem('cart'))){
            price+=calculatePrice(i.printSize, i.frameStyle, i.frameWidth, i.matWidth);
        }
    }
    price = (Math.round((price + Number.EPSILON) * 100) / 100);
    document.getElementById('price-total').innerHTML = price;
}

export 