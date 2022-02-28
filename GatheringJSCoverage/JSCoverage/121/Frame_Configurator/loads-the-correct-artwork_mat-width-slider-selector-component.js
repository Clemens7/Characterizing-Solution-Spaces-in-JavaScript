import { frameConfigStore } from '../shared/frame-config-store.js';
import { cmToMm, mmToCm } from '../shared/model-utils.js';
export class MatWidthSliderSelectorComponent extends HTMLDivElement {
    constructor() {
        super();
        const matWrapper = document.createElement('div');
        matWrapper.innerHTML += '<label>Mat</label>';
        const matWrapper2 = document.createElement('div');
        matWrapper2.appendChild(this.createNumberInput());
        matWrapper2.appendChild(this.createPostfix());
        matWrapper.appendChild(matWrapper2);
        matWrapper.className = 'config-row';
        this.appendChild(matWrapper);
        this.appendChild(this.createRange());
        frameConfigStore.getAndWatch(this.update.bind(this));
    }
    createPostfix() {
        const postfix = document.createElement('span');
        postfix.innerText = 'cm';
        return postfix;
    }
    
    update(config) {
        const matWidthInput = document.getElementById('matWidth');
        matWidthInput.value = this.displayMatWidthFrom(config);
        const matWidthSlider = document.getElementById('matWidthR');
        matWidthSlider.value = this.displayMatWidthFrom(config);
    }
    createNumberInput() {
        const numberInput = document.createElement('input');
        numberInput.type = 'number';
        numberInput.name = 'matWidth';
        numberInput.id = 'matWidth';
        numberInput.min = '0';
        numberInput.max = '10';
        numberInput.step = '0.1';
        numberInput.value = this.displayMatWidthFrom(frameConfigStore);
        numberInput.addEventListener('change', );
        return numberInput;
    }
    displayMatWidthFrom(config) {
        return mmToCm(config.matWidth).toString();
    }
    createRange() {
        const range = document.createElement('input');
        range.type = 'range';
        range.name = 'matWidthR';
        range.id = 'matWidthR';
        range.min = '0';
        range.max = '10';
        range.step = '0.1';
        range.value = this.displayMatWidthFrom(frameConfigStore);
        range.addEventListener('change', );
        return range;
    }
}
//# sourceMappingURL=mat-width-slider-selector-component.js.map