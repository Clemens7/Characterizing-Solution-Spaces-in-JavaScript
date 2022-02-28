import { FrameConfiguration, Serializable } from "./frame.js";
import { getObject } from "./metropolitan-api.js";
export class CartItem extends Serializable {
    
    
    
    
    
}
export class Cart {
    constructor() {
        this._items = [];
        this.loadSession();
    }
    get size() {
        return this._items.length;
    }
    get isEmpty() {
        return this._items.length == 0;
    }
    
    
    
    
    get getTotalPrice() {
        let total = 0;
        this._items.forEach();
        return total;
    }
    loadSession() {
        let storage = localStorage.getItem('cart');
        var json = storage == null || storage.length == 0  : storage;
        var cart = JSON.parse(json);
        for (let item of cart) 
    }
}
