import {getPrintSizes, render, calculatePrice} from "./frame.js";

export class ResultContainer {
    constructor() {
        this.resultContainer = document.getElementById('gallery');
    }

    clear() {
        this.resultContainer.innerHTML = '';
    }

    addArtwork(artwork) {
        const label = document.createElement('div');
        label.classList.add("museum-label");

        const artist = document.createElement('span');
        artist.classList.add("artist");
        artist.innerText = artwork.artist;

        const title = document.createElement('span');
        title.classList.add("title");
        title.innerText = artwork.title;
       
        const date = document.createElement('span');
        date.classList.add("date");
        date.innerText = artwork.date;
        
        label.appendChild(artist);
        label.appendChild(title);
        label.append(', ');
        label.appendChild(date);

        const image = document.createElement('img');
        image.src = artwork.image;
        image.alt = `Picture of artwork ${artwork.title}`
        image.id = `object-image-${artwork.id}`

        const link = document.createElement('a');
        link.id = `object-${artwork.id}`;
        link.href = `config.html?objectID=${artwork.id}`;
        link.appendChild(image);
        link.appendChild(label);

        const thumb = document.createElement('div');
        thumb.classList.add("thumb");
        thumb.appendChild(link);
        
        this.resultContainer.appendChild(thumb);
    }
}

export class ConfigImage{

    

    

    
}

export class DisplayCart {
    

    

    

    
}





