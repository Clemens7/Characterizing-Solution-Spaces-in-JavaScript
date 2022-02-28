import { allMatColors } from '../shared/model.js';
import { frameConfigStore } from '../shared/frame-config-store.js';
import { getMaterialColorDescription } from '../shared/model-utils.js';
import { AbstractRadioComponent } from './abstract-radio-component.js';
export class ColorSelectorComponent extends AbstractRadioComponent {
    constructor() {
        super('matColor', 'mat-color');
    }
    getAllValues() {
        return allMatColors;
    }
    appendOption(radio, label) {
        const wrapper = document.createElement('div');
        wrapper.classList.add(`${this.idPrefix}-item`);
        wrapper.appendChild(radio);
        wrapper.appendChild(label);
        this.appendChild(wrapper);
    }
    renderLabel(value, label, config) {
        label.innerText = getMaterialColorDescription(value);
        return (config === null || config === void 0  : config.matColor) === value;
    }
    
}
//# sourceMappingURL=color-selector-component.js.map