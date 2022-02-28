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
    addResultToDocument(result) {
        this.container.appendChild(createResultElement(result));

        function createResultElement(result) {
            return DOM.container([
                DOM.setAttributes(DOM.container([
                    DOM.setAttributes(document.createElement('img'), { src: result.image_small }),
                    DOM.container([
                        DOM.textElement('span', result.artist, 'artist'),
                        DOM.textElement('span', `${result.title}, `, 'title'),
                        DOM.textElement('span', result.date, 'date')
                    ], 'div', 'museum-label'),
                ], 'a'), { id: `object-${result.id}`, href: `./config.html?objectID=${result.id}` })
            ], 'div', 'thumb');
        }
    }
}
