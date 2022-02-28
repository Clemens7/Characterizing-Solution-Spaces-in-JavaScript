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

    addArtworkToGallery(artwork) {
        this.container.appendChild(createArtworkElements(artwork));

        function createArtworkElements(artwork) {
            return DOM.container([
                DOM.container([
                    DOM.imageElement(artwork.image, artwork.title),
                    DOM.container([
                        DOM.textElement("span", artwork.artist, "artist"),
                        DOM.textElement("span", `${artwork.name}, `, "title"),
                        DOM.textElement("span", artwork.date, "date")
                    ], "div", "museum-label")
                ], "a",null,null,`config.html?objectID=${artwork.id}`)
            ], "div", "thumb");
        }
    }
}

