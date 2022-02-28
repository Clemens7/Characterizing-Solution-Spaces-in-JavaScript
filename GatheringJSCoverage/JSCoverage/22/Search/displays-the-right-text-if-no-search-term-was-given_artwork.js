export class Artwork {
    
}

export class ArtworkContainer {
    constructor(id='gallery') {
        this.container = document.getElementById(id);
        if(!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    

}