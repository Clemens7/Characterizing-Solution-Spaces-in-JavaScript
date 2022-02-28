import { Artwork} from './search-result.js';
import * as DOM from './dom-helpers.js';

export class ArtworkContainer {
    constructor(containerID='gallery') {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }
    clear() {
        this.container.innerHTML ='';
    }
    
    
    
    
    
    
}