export class Cart {
    constructor(items) {
        this.items = items;
    }

    

    
}

export class Item {
    
}

export class Destination {
    constructor(country, displayName, cost) {
        this.country = country;
        this.displayName = displayName;
        this.cost = cost;
    }
}

/* Only store the array to comply with tests */
export function retrieveCart(){
    const cachedItems = window.localStorage.getItem('cart');
    if (cachedItems != null) {
        return new Cart(JSON.parse(cachedItems));
    }

}

export 
