import { CartItem } from "./CartItem.js";

export 

export 

export 

export function getAll() {
    return JSON.parse(localStorage.getItem("cart")) }

export 

export 

export function diplayCartItems() {
    document.querySelector('#cart-link').textContent = `Cart (${getAll().length})`
}