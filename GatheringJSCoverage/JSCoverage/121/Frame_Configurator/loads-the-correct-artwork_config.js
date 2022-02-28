var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { artworkApi } from './shared/artwork-api.js';
import { frameConfigStore } from './shared/frame-config-store.js';
import { cartStore } from './shared/cart-store.js';
import { calculatePrice, render } from './frame.js';
import { renderArtworkLabel } from './shared/model-utils.js';
import './components/index.js';
class ConfigClient {
    constructor() {
        this.previewImage = document.getElementById('preview-image');
        this.previewContainer = document.getElementById('preview-container');
        this.labelContainer = document.getElementById('image-label');
        this.price = document.getElementById('price');
        this.artwork = null;
        frameConfigStore.getAndWatch((state) => this.update(state));
    }
    renderArtwork(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.artwork = yield artworkApi.getById(id);
            if (this.artwork) {
                this.previewImage.addEventListener('load', () => frameConfigStore.bindImage(this.previewImage));
                this.previewImage.src = this.artwork.primaryImageSmall;
            }
        });
    }
    
    update(state) {
        if (this.artwork) {
            render(this.previewImage, this.previewContainer, state.printSize, state.frameStyle, state.frameWidth, state.matColor, state.matWidth);
        }
        this.labelContainer.innerHTML = renderArtworkLabel(state, this.artwork);
        this.price.innerHTML = `€ ${calculatePrice(frameConfigStore.printSize, frameConfigStore.frameStyle, frameConfigStore.frameWidth, frameConfigStore.matWidth).toFixed(2)}`;
    }
    
}
const params = new URLSearchParams(document.location.search);
const configClient = new ConfigClient();
if (params.has('objectID')) {
    const id = Number.parseInt((_a = params.get('objectID')) !== null && _a !== void 0 ? _a , 10);
    configClient.renderArtwork(id).then();
}
const addToCartButton = document.getElementById('buy');
addToCartButton.addEventListener('click', configClient.addToCart);
//# sourceMappingURL=config.js.map