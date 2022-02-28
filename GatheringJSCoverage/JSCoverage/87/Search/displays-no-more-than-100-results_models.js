export class Cart {
    constructor(items) {
        this.items = items;
    }

    

    
}

export class Item {
    
}

export class Destination {
    
}

/* Only store the array to comply with tests */
export function retrieveCart(){
    const cachedItems = window.localStorage.getItem('cart');
    if (cachedItems != null)  else {
        const cart = new Cart([]);
        store('cart', cart.items);
        return cart;
    }

}

export function store(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
    return value;
}
