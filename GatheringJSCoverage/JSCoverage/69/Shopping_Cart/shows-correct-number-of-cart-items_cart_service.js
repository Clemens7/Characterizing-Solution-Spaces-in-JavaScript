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

    

    

    get isEmpty() {
        return this._cart.length === 0;
    }

    contains = ;

    add = ;

    remove = ;

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

    writeCart = ;

    indexOf = ;
}

export default new CartService();

export class CartItem {
    
}
