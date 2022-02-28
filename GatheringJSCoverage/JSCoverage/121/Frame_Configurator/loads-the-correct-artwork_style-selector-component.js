import { allFrameStyles } from '../shared/model.js';
import { frameConfigStore } from '../shared/frame-config-store.js';
import { getFrameStyleDescription } from '../shared/model-utils.js';
import { AbstractRadioComponent } from './abstract-radio-component.js';
export class StyleSelectorComponent extends AbstractRadioComponent {
    constructor() {
        super('frameStyle', 'frame-style');
    }
    getAllValues() {
        return allFrameStyles;
    }
    appendOption(radio, label) {
        const wrapper = document.createElement('div');
        wrapper.classList.add(`${this.idPrefix}-item`);
        wrapper.appendChild(radio);
        wrapper.appendChild(label);
        this.appendChild(wrapper);
    }
    renderLabel(value, label, config) {
        if (!label.hasChildNodes()) {
            const image = document.createElement('img');
            image.src = `${this.idPrefix}s/${value}-thumb.png`;
            const description = getFrameStyleDescription(value);
            label.appendChild(image);
            label.append(description);
        }
        return (config === null || config === void 0  : config.frameStyle) === value;
    }
    
}
//# sourceMappingURL=style-selector-component.js.map