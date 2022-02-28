import {FrameConfig} from "./frameconfig.js";

export const STORAGE_KEY = "cart";

export const retrieveCart = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export const insertItemInCart = 

export const removeIndexInCart = (index) => {
    let cart = retrieveCart();
    if (!cart)
    cart.splice(index,1);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(cart));
}

export const retrieveIndexInCart = 

