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
            const promises = items.map((it, index) => this.fetchSingle(it, index));
            const renderedElements = yield Promise.all(promises);
            cartWrapper.innerHTML = ``;
            renderedElements.forEach((el) => cartWrapper.appendChild(el));
            if (promises.length === 0) 
            cartWrapper.appendChild(this.renderTotal());
        });
    }
    fetchSingle(cartItem, index) {
        return __awaiter(this, void 0, void 0, function* () {
            const artwork = yield artworkApi.getById(cartItem.objectID);
            const price = calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
            if (artwork) {
                return this.renderCartItem(cartItem, artwork, price, index);
            }
        });
    }
    renderCartItem(cartItem, artwork, price, index) {
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('cart-item');
        itemWrapper.appendChild(this.renderPreview(cartItem, artwork, index));
        itemWrapper.appendChild(this.renderLabel(cartItem, artwork, price, index));
        return itemWrapper;
    }
    renderPreview(cartItem, artwork, index) {
        const preview = document.createElement('div');
        preview.id = `preview-container-${index}`;
        preview.classList.add('cart-preview');
        const link = document.createElement('a');
        link.href = this.buildItemUrl('config', cartItem);
        const image = document.createElement('img');
        image.classList.add('cart-thumb');
        image.src = artwork.primaryImageSmall;
        image.id = `preview-${index}`;
        image.alt = 'artwork';
        link.appendChild(image);
        preview.appendChild(link);
        render(image, preview, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth);
        return preview;
    }
    buildItemUrl(page, cartItem) {
        const params = new URLSearchParams();
        Object.getOwnPropertyNames(cartItem).forEach((key) => {
            const descriptor = Object.getOwnPropertyDescriptor(cartItem, key);
            if (descriptor && descriptor.value) {
                params.append(key, descriptor.value.toString());
            }
        });
        return `/${page}.html?${params.toString()}`;
    }
    renderLabel(cartItem, artwork, price, index) {
        const label = document.createElement('div');
        label.classList.add('museum-label');
        label.innerHTML += renderArtworkLabel(cartItem, artwork);
        label.innerHTML += `<div class="cart-price">€ <span id="price-${index}">${price}</span></div>`;
        const button = document.createElement('button');
        button.type = 'button';
        button.id = `cart-remove-${index}`;
        button.classList.add('cart-remove');
        label.appendChild(button);
        button.addEventListener('click', );
        return label;
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