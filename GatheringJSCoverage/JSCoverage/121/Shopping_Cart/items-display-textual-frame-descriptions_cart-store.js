import { calculatePrice } from '../frame.js';
export class CartStore {
    constructor() {
        this.state = [];
        this.listeners = [];
        this.state = this.readState();
    }
    get mayCheckout() {
        return this.state.length > 0;
    }
    get totalPrice() {
        return this.state.reduce((total, item) => {
            const price = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
            return total + price;
        }, 0);
    }
    getAndWatch(listener) {
        this.listeners.push(listener);
        listener(this.state);
    }
    
    
    readState() {
        var _a;
        const cachedCart = (_a = localStorage.getItem('cart')) !== null && _a !== void 0 ? _a ;
        return JSON.parse(cachedCart);
    }
    
}
export const cartStore = new CartStore();
//# sourceMappingURL=cart-store.js.map