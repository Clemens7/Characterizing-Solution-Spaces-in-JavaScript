export class Frame {
    
}

class Cart {

    constructor() {
        this._onChangeEvents = [];
        this._load();
        window.addEventListener('storage', );
    }

    addOnChangeEvent(event) {
        this._onChangeEvents.push(event);
    }

    

    _load() {
        let cart = window.localStorage.getItem("cart");
        if (cart !== null) {
            this._frames = JSON.parse(cart);
        }
        if (!Array.isArray(this._frames)) 
    }

    

    

    

    count() {
        return this._frames.length;
    }

    
}

export const cart = new Cart();