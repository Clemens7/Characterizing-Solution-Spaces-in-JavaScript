import {Painting} from "./painting.js";
import * as DOM from './dom_helper.js';

export class ArtworkDocumentContainer {

    constructor(containerID = 'gallery') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    
}

