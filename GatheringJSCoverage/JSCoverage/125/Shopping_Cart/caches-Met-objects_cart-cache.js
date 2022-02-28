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
        if (missingUUID |= item.entryUUID == null) 
    }
    if (missingUUID) 
    return cartContent;
}

export 

export 

export 

/*
 * Helper functions
 */

export 
