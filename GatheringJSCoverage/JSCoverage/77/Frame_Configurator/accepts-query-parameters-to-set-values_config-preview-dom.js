import { Picture } from './datastructures.js';
import * as DOM from './dom-helper.js';

export class PreviewContainer {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    // sets the preview image.
    // image should be of class Picture
    set(image) {
        const imageHTML = DOM.setAttributes(
            document.createElement('img'), 
            {src: image.image_small, id:"preview-image"}
        );

        const labelHTML =  DOM.setAttributes(
            DOM.container([
                DOM.textElement('span', image.artist, "artist"),
                DOM.textElement('span', image.title, "title"),
                DOM.textElement('span', image.date, "date")
            ], 'div', "museum-label"),
            {id: "image-label"}
        );

        this.container.appendChild(imageHTML);
        this.container.appendChild(labelHTML);
    }
}
