import { CartItem } from "./CartItem.js";

export 

export 

export 

export function getAll() {
    return JSON.parse(localStorage.getItem("cart")) }

export 

export function cartItemDescription(cartItem) {
    let description = "";
    switch (cartItem.printSize) {
        case 'S':
            description += "Small";
            break;
        case 'M':
            description += "Medium";
            break;
        case 'L':
            description += "Large";
            break;
        
    }
    if(cartItem.matWidth > 0) description += " print in a " + (cartItem.frameWidth / 10 ) + " cm " + cartItem.frameStyle + " frame with a " + (cartItem.matWidth / 10) + " cm " + cartItem.matColor + " mat.";

    return description;
}

export 