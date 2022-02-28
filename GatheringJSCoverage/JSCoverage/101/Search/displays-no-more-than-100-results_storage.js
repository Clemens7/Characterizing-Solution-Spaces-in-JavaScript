export 

export 

export 

export function getCartItemCount() {    
    return JSON.parse(window.localStorage.getItem('cart')).length;
}