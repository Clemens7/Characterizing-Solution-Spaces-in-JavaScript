import StorageHandler from './storage-handler.js';
import {getPrintSizes, calculatePrice, render} from "./frame.js";
import {} from "./config.js";
import {API} from "./api.js";
let IDs = [];

window.onload = ;







export function showItemsDynamically() {
    const cart = document.getElementById("cart-link");

    cart.innerText = "Cart (" + StorageHandler.getCartSize() + ")";

    return cart;
}













