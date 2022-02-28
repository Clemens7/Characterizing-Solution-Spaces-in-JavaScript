let cart = [];


export function retrieve() {
    if(!localStorage['cart'])
    return JSON.parse(localStorage['cart']);
}


export 
