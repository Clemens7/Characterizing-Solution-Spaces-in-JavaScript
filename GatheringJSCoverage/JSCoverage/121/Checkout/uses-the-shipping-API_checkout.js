var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cartStore } from './shared/index.js';
class CheckoutClient {
    constructor() {
        this.dash = '&mdash;';
        this.country = document.getElementById('country');
        this.priceSubtotal = document.getElementById('price-subtotal');
        this.priceShipping = document.getElementById('price-shipping');
        this.priceTotal = document.getElementById('price-total');
        this.shippingFees = [];
        this.links = [
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'https://www.youtube.com/watch?v=Fexsxz8nLVw&feature=youtu.be&t=6',
            'https://www.youtube.com/watch?v=xzfG7zApLT0 ',
            'https://youtu.be/3lY6At7wTOU?t=734',
            'https://www.youtube.com/watch?v=3lY6At7wTOU&feature=youtu.be&t=643'
        ];
    }
    
    
    loadCountriesAndShippingCosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('https://web-engineering.big.tuwien.ac.at/s20/a2/shipping');
                if (response.status !== 200) 
                const dest = yield response.json();
                return dest.destinations;
            }
        });
    }
    showPrice(index) {
        const subtotal = cartStore.totalPrice;
        const shipping = this.shippingFees[index];
        if (shipping != null) {
            const total = subtotal + shipping;
            this.priceShipping.innerText = shipping.toFixed(2);
            this.priceTotal.innerText = total.toFixed(2);
        }
        else {
            this.priceShipping.innerHTML = this.dash;
            this.priceTotal.innerHTML = this.dash;
        }
        this.priceSubtotal.innerHTML = subtotal.toFixed(2);
    }
    checkoutLoad() {
        if (cartStore.mayCheckout) {
            const payButton = document.getElementById('pay-button');
            payButton.disabled = false;
            payButton.addEventListener('click', );
            this.loadCountriesAndShippingCosts().then(destination => {
                if (destination != null) {
                    const options = destination.map((dest, i) => {
                        const optionElement = document.createElement('option');
                        optionElement.value = dest.country;
                        optionElement.innerText = dest.displayName;
                        this.shippingFees[i] = Number.parseFloat((dest.cost / 100).toFixed(2));
                        return optionElement;
                    });
                    this.country.append(...options);
                    this.country.addEventListener('change', );
                }
                this.showPrice(0);
            });
            this.showPrice(0);
        }
    }
}
const checkoutClient = new CheckoutClient();
checkoutClient.checkoutLoad();
//# sourceMappingURL=checkout.js.map