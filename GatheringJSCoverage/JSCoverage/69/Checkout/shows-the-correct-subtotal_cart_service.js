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

    

    get isEmpty() {
        return this._cart.length === 0;
    }

    contains = ;

    add = ;

    remove = ;

    addCallback = ;

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
