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

    _runOnChangeEvents() {
        this._load();
        for(let event of this._onChangeEvents) {
           event();
        }
    }

    _load() {
        let cart = window.localStorage.getItem("cart");
        if (cart !== null) {
            this._frames = JSON.parse(cart);
        }
        if (!Array.isArray(this._frames)) 
    }

    _save() {
        window.localStorage.setItem("cart", JSON.stringify(this._frames));
        this._runOnChangeEvents();
    }

    

    remove(index) {
        this._frames.splice(index, 1);
        this._save();
    }

    count() {
        return this._frames.length;
    }

    get cartItems() {
        return [...this._frames];
    }
}

export const cart = new Cart();