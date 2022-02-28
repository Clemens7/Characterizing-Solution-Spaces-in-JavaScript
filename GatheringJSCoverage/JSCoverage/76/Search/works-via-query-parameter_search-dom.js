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
    
    addArtworkToDocument(artwork){
        this.container.appendChild(createArtworkElements(artwork));
    
    
    function createArtworkElements(artwork){
        return DOM.container([
            DOM.setAttributes(DOM.container([
                
             DOM.setAttributes(document.createElement('img'), {src: artwork.imageSmall}),
            
                DOM.container([
                    DOM.textElement('span', artwork.artist, 'artist'),
                    DOM.textElement('span', artwork.title,'title'),document.createTextNode('\u002C ') ,
                    DOM.textElement('span', artwork.date, 'date')
                ]
            
            
            ,'div','museum-label')
            
            
            ], 'a'), {href: './config.html?objectID='+artwork.objectID, id:artwork.objectID})
       
        
        
        
        
        
        ],'div','thumb')
    }
    
    
    
        
    
    }
    
    
    
    
}