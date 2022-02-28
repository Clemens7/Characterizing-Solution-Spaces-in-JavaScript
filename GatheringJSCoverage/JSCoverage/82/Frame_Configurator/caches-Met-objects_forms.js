import { clamp } from './configutils.js';

export class BoundForm {
  
  constructor(element) {
    this.element = element;
    this.fieldsets = new Map();
    const fieldsets = element.querySelectorAll('fieldset[data-type]');
    for (const fieldset of fieldsets) {
      const key = fieldset.getAttribute('data-key') ;
      const type = fieldset.getAttribute('data-type');
      let wrapper;
      switch (type) {
        case 'radio':
          wrapper = new RadioFieldset(this, fieldset);
          break;
        case 'number+range':
          wrapper = new NumberRangeFieldset(this, fieldset);
          break;
        
      }
      this.fieldsets.set(key, wrapper);
    }
  }
  
  
  
  getValue() {
    const result = {};
    for (const [key, fieldset] of this.fieldsets) {
      result[key] = fieldset.getValue();
    }
    return result;
  }
}

class Fieldset {
  
  constructor(form, element) {
    this.form = form;
    this.element = element;
  }
  
}

class RadioFieldset extends Fieldset {
  
  constructor(form, element) {
    super(form, element);
    this.options = new Map();
    for (const radioInput of element.querySelectorAll('input[type="radio"]')) {
      const value = radioInput.value;
      this.options.set(value, radioInput);
    }
  }
  
  
  
  getValue() {
    for (const [value, input] of this.options) {
      if (input.checked) {
        return value;
      }
    }}
  
}

class NumberRangeFieldset extends Fieldset {
  
  constructor(form, element) {
    super(form, element);
    this.numberInput = element.querySelector('input[type="number"]');
    this.rangeInput = element.querySelector('input[type="range"]');
    this.constraints = Object.fromEntries(['min', 'max', 'step'].map(c => [c, +this.numberInput.getAttribute(c)]));
    element.addEventListener('input', );
    element.addEventListener('change', );
  }
  
  
  
  getValue() {
    return +this.numberInput.value;
  }
  
  
  
}
