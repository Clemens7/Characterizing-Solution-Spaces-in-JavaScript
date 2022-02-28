var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { artworkApi, cartStore } from './shared/index.js';
import { calculatePrice, render } from './frame.js';
import { renderArtworkLabel } from './shared/model-utils.js';
class CartClient {
    renderCart(items) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartWrapper = document.getElementById('cart');
            const promises = items.map();
            const renderedElements = yield Promise.all(promises);
            cartWrapper.innerHTML = ``;
            renderedElements.forEach();
            if (promises.length === 0) {
                cartWrapper.innerHTML += `<div>There are no items in your shopping cart.</div>`;
            }
            cartWrapper.appendChild(this.renderTotal());
        });
    }
    
    
    
    
    
    renderTotal() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('cart-total');
        const priceString = cartStore.totalPrice.toString();
        wrapper.innerHTML = `<div class="price">Total: € <span id="price-total">${priceString}</span></div>`;
        const button = document.createElement('button');
        button.type = 'button';
        button.id = 'checkout-button';
        button.textContent = 'Checkout';
        button.disabled = !cartStore.mayCheckout;
        button.addEventListener('click', );
        wrapper.appendChild(button);
        return wrapper;
    }
    
}
export const cartClient = new CartClient();
cartStore.getAndWatch((state) => cartClient.renderCart(state));
//# sourceMappingURL=cart.js.map