export class Cart {
    constructor(items) {
        this.items = items;
    }

    

    deleteItem(itemIndex){
        if  (itemIndex >= 0) {
            this.items.splice(itemIndex, 1);
            store('cart', this.items);
        }
    }
}

export class Item {
    
}

export class Destination {
    
}

/* Only store the array to comply with tests */
export function retrieveCart(){
    const cachedItems = window.localStorage.getItem('cart');
    if (cachedItems != null) {
        return new Cart(JSON.parse(cachedItems));
    }

}

export function store(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
    return value;
}
