const STORAGE_KEY = 'cart';

class CartService {

    _cart;
    _callbacks = {};
    _lastCallbackId = 0;

    constructor() {
        const cart = this.fetchCart();
        if (cart === null) {
            this._cart = [];
        }
    }

    

    get length() {
        return this._cart.length;
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
