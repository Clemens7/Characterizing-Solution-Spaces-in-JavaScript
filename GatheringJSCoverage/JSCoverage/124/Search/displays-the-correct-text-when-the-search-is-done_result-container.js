import * as ElementCreator from './element-creator.js';

export class ResultContainer {
    constructor(id = 'gallery') {
        this.container = document.getElementById(id);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    
}