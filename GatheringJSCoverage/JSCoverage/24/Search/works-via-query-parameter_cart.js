import { loadObject } from "./artworkApi.js";
import { render, calculatePrice } from "./frame.js"

export function getItems() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

export 

export 

export function renderCart() {
    document.getElementById('cart-link').innerText = `Cart (${getItems().length})`;
}



export 

