import * as ElementCreator from './element-creator.js';
import * as Frame from './frame.js';

export class CartContainer {
    constructor(id = "cart") {
        this.container = document.getElementById(id);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    
}