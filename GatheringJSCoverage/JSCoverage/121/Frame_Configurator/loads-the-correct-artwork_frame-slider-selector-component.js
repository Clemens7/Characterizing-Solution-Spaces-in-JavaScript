import { frameConfigStore } from '../shared/frame-config-store.js';
import { cmToMm, mmToCm } from '../shared/model-utils.js';
export class FrameSliderSelectorComponent extends HTMLDivElement {
    constructor() {
        super();
        const frameWrapper = document.createElement('div');
        frameWrapper.innerHTML += '<label>Frame</label>';
        const frameWrapper2 = document.createElement('div');
        frameWrapper2.appendChild(this.createNumberInput());
        frameWrapper2.appendChild(this.createPostfix());
        frameWrapper.appendChild(frameWrapper2);
        frameWrapper.className = 'config-row';
        this.appendChild(frameWrapper);
        this.appendChild(this.createRange());
        frameConfigStore.getAndWatch(this.update.bind(this));
    }
    
    createPostfix() {
        const postfix = document.createElement('span');
        postfix.innerText = 'cm';
        return postfix;
    }
    createNumberInput() {
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.name = 'frameWidth';
        numberInput.id = 'frameWidth';
        numberInput.min = '2';
        numberInput.max = '5';
        numberInput.step = '0.1';
        numberInput.value = this.displayFrameWidthFrom(frameConfigStore);
        numberInput.addEventListener('change', );
        return numberInput;
    }
    createRange() {
        const range = document.createElement('input');
        range.type = 'range';
        range.name = 'frameWidthR';
        range.id = 'frameWidthR';
        range.min = '2';
        range.max = '5';
        range.step = '0.1';
        range.value = this.displayFrameWidthFrom(frameConfigStore);
        range.addEventListener('change', );
        return range;
    }
    displayFrameWidthFrom(config) {
        return mmToCm(config.frameWidth).toString();
    }
    update(config) {
        const frameWidthInput = document.getElementById('frameWidth');
        frameWidthInput.value = this.displayFrameWidthFrom(config);
        const frameWidthSlider = document.getElementById('frameWidthR');
        frameWidthSlider.value = this.displayFrameWidthFrom(config);
    }
}
//# sourceMappingURL=frame-slider-selector-component.js.map