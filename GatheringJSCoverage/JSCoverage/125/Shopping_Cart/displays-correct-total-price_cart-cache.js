// Local storage key
const LS_CART_KEY = 'cart';

/*
 * Classes
 */

export class CartEntry {
    
}

/*
 * Functions
 */

export function getCartContent() {
    const jsonCartContent = localStorage.getItem(LS_CART_KEY);
    const cartContent = jsonCartContent ? JSON.parse(jsonCartContent) ;
    let missingUUID = false;
    for (const item of cartContent) {
        if (missingUUID |= item.entryUUID == null) {
            item.entryUUID = uuidv4();
        }
    }
    if (missingUUID) {
        localStorage.setItem(LS_CART_KEY, JSON.stringify(cartContent));
    }
    return cartContent;
}

export 

export 

export 

/*
 * Helper functions
 */

export function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
