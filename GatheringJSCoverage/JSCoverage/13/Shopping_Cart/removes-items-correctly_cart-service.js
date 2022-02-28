import { FrameConfiguration, Serializable } from "./frame.js";
import { getObject } from "./metropolitan-api.js";
export class CartItem extends Serializable {
    constructor() {
        super(...arguments);
        this._objectID = null;
        this._configuration = new FrameConfiguration;
    }
    fillFromJSON(jsonObj) {
        super.fillFromJSON(jsonObj);
        this.configuration.fillFromJSON(jsonObj);
    }
    get objectID() {
        return this._objectID;
    }
    get configuration() {
        return this._configuration;
    }
    get artworkInformation() {
        return getObject(this._objectID);
    }
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
    add(item) {
        this._items.push(item);
        this.updateSession();
    }
    remove(index) {
        this._items.splice(index, 1);
        this.updateSession();
    }
    getCartItem(index) {
        return this._items[index];
    }
    updateSession() {
        localStorage.setItem('cart', (((JSON.stringify(this._items, function (key, value) { return key == 'printSizes' || value == null ? undefined : value; }).split(",\"_").join(",\"")).split("{\"_").join("{\"")).split("\"configuration\":{").join(""))
            .split("}}").join("}"));
    }
    get getTotalPrice() {
        let total = 0;
        this._items.forEach(cartItem => {
            total = +(total + cartItem.configuration.price).toFixed(2);
        });
        return total;
    }
    loadSession() {
        let storage = localStorage.getItem('cart');
        var json = storage == null || storage.length == 0  : storage;
        var cart = JSON.parse(json);
        for (let item of cart) {
            var cartItem = new CartItem();
            cartItem.fillFromJSON(item);
            this.add(cartItem);
        }
    }
}
