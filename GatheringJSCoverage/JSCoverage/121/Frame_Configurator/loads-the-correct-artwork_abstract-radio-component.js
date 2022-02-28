import { frameConfigStore } from '../shared/frame-config-store.js';
export class AbstractRadioComponent extends HTMLDivElement {
    constructor(name, idPrefix) {
        super();
        this.name = name;
        this.idPrefix = idPrefix;
        this.innerHTML = '';
        const radios = {};
        const labels = {};
        this.getAllValues().forEach((value) => {
            radios[value] = this.createRadio(value);
            labels[value] = this.createLabel(value, radios[value]);
            this.appendOption(radios[value], labels[value]);
        });
        this.radios = radios;
        this.labels = labels;
        frameConfigStore.getAndWatch(this.update.bind(this));
    }
    update(config) {
        this.getAllValues().forEach((size) => this.updateSize(size, config));
    }
    createRadio(value) {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = this.name;
        radio.id = `${this.idPrefix}-${value.toLowerCase()}`;
        radio.value = value;
        radio.addEventListener('input', , { passive: true });
        return radio;
    }
    createLabel(value, radio) {
        const label = document.createElement('label');
        label.htmlFor = radio.id;
        label.id = `${this.idPrefix}-${value.toLowerCase()}-label`;
        return label;
    }
    updateSize(value, config) {
        const label = this.labels[value];
        const radio = this.radios[value];
        radio.checked = this.renderLabel(value, label, config);
    }
}
//# sourceMappingURL=abstract-radio-component.js.map