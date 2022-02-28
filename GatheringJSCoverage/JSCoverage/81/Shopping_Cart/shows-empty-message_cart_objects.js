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
        if (cart !== null) 
        if (!Array.isArray(this._frames)) {
            this._frames = [];
        }
    }

    

    

    

    count() {
        return this._frames.length;
    }

    get cartItems() {
        return [...this._frames];
    }
}

export const cart = new Cart();