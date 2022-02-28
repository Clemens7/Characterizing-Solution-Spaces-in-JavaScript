import { cartStore } from '../shared/cart-store.js';
export class CartDisplayController extends HTMLAnchorElement {
    constructor() {
        super();
        cartStore.getAndWatch(this.update.bind(this));
    }
    update(values) {
        this.innerText = `Cart (${values.length})`;
    }
}
//# sourceMappingURL=cart-display-component.js.map