import { CartDisplayController } from './cart-display-component.js';
import { SizeSelectorComponent } from './size-selector-component.js';
import { StyleSelectorComponent } from './style-selector-component.js';
import { ColorSelectorComponent } from './color-selector-component.js';
import { FrameSliderSelectorComponent } from './frame-slider-selector-component.js';
import { MatWidthSliderSelectorComponent } from './mat-width-slider-selector-component.js';
export * from './cart-display-component.js';
customElements.define('shopping-cart-display', CartDisplayController, { extends: 'a' });
customElements.define('size-selector', SizeSelectorComponent, { extends: 'div' });
customElements.define('style-selector', StyleSelectorComponent, { extends: 'div' });
customElements.define('color-selector', ColorSelectorComponent, { extends: 'div' });
customElements.define('frame-slider-selector', FrameSliderSelectorComponent, { extends: 'div' });
customElements.define('mat-width-slider-selector', MatWidthSliderSelectorComponent, { extends: 'div' });
//# sourceMappingURL=index.js.map