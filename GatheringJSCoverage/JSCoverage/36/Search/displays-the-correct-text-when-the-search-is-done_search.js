import * as DOM from './dom-helper.js';

export class SearchDocumentContainer {
    constructor(containerID = 'gallery') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    
}