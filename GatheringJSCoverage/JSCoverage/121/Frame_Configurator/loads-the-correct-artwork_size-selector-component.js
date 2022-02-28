import { allPrintSizes } from '../shared/model.js';
import { frameConfigStore } from '../shared/frame-config-store.js';
import { getPrintSizeDescription } from '../shared/model-utils.js';
import { AbstractRadioComponent } from './abstract-radio-component.js';
export class SizeSelectorComponent extends AbstractRadioComponent {
    constructor() {
        super('printSize', 'print-size');
    }
    getAllValues() {
        return allPrintSizes;
    }
    appendOption(radio, label) {
        this.appendChild(radio);
        this.appendChild(label);
    }
    renderLabel(value, label, config) {
        var _a, _b;
        const sizeName = getPrintSizeDescription(value);
        const [width, height] = (_b = (_a = frameConfigStore.printSizes) === null || _a === void 0 ? void 0 : _a[value]) !== null && _b !== void 0 ? _b : [0, 0];
        label.innerHTML = `${sizeName}<br>${width} &times; ${height} cm`;
        return (config === null || config === void 0  : config.printSize) === value;
    }
    
}
//# sourceMappingURL=size-selector-component.js.map