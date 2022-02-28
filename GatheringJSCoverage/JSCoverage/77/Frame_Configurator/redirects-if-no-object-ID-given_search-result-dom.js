import { Picture } from './datastructures.js';
import * as DOM from './dom-helper.js';

/**
 * class to make it easier to print the artwork to the screen
 */
export class ResultDocumentContainer {
    constructor(containerID = 'gallery') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    /**
     * cleares the screen of any artwork
     */
    clear() {
        this.container.innerHTML = '';
    }

    /**
     * adds a new artwork to the screen
     * 
     * @param result a new artwork which shall be represented
     */
    
}
