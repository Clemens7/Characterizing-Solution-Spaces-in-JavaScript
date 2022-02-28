const STORAGE_KEY = 'cart';

class CartService {

    _cart;
    _callbacks = {};
    _lastCallbackId = 0;

    constructor() {
        const cart = this.fetchCart();
        if (cart === null)  else {
            this._cart = cart;
        }
    }

    get cart() {
        return JSON.parse(JSON.stringify(this._cart)); // since we already read it this way from local storage, we can use this to deep copy cart objects to avoid side effects
    }

    get length() {
        return this._cart.length;
    }

    get isEmpty() {
        return this._cart.length === 0;
    }

    contains = ;

    add = ;

    remove = (cartItem) => {
        const index = this.indexOf(cartItem);
        if (index === -1) 
        this._cart.splice(index, 1);
        this.writeCart();
        for (let entry of Object.values(this._callbacks)) {
            entry(this);
        }
    };

    addCallback = (callback) => {
        const id = ++this._lastCallbackId;
        this._callbacks[id] = callback;
        callback(this);
        return id;
    };

    removeCallback = ;

    fetchCart = () => {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    };

    writeCart = () => {
        return window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this._cart));
    };

    indexOf = (cartItem) => {
        for (let i = 0; i < this._cart.length; i++) {
            if (cartItem.objectID === this._cart[i].objectID &&
                cartItem.printSize === this._cart[i].printSize &&
                cartItem.frameWidth === this._cart[i].frameWidth &&
                cartItem.frameStyle === this._cart[i].frameStyle &&
                cartItem.matWidth === this._cart[i].matWidth &&
                cartItem.matColor === this._cart[i].matColor) {
                return i;
            }
        }};
}

export default new CartService();

export class CartItem {
    
}
