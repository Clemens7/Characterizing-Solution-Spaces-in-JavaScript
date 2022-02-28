// import { Thumb } from "./thumb.js"
import * as DOM from '../dom-helpers.js';

export class ThumbDocumentContainer {
    constructor(containerID = 'gallery') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }
    clear() {
        this.container.innerHTML = '';
    }
    addThumbToDocument(thumb) {
        this.container.appendChild(createThumbElement(thumb));

        function createThumbElement(thumb) {
            let div = DOM.container([createFormConfigLinkContainer(thumb)], 'div');
            return DOM.addCSSClass(div, ["thumb"]);
        }

        function createFormConfigLinkContainer(thumb) {
            let a = DOM.container([
                createImage(thumb),
                createMuseumLabel(thumb.artistDisplayName, thumb.title, thumb.objectDate)
            ], 'a');
            return DOM.setAttributes(a, { href: thumb.frameConfigHref, id: "object-" + thumb.objectID })
        }

        function createImage(thumb) {
            return DOM.setAttributes(document.createElement('img'), { src: thumb.primaryImage, alt: thumb.title, id: "object-image-" + thumb.objectID });
        }

        function createMuseumLabel(artistDisplayName, title, objectDate) {
            let div = DOM.container([
                DOM.addCSSClass(DOM.textElement('span', artistDisplayName), ["artist"]),
                DOM.addCSSClass(DOM.textElement('span', title), ["title"]),
                document.createTextNode(", "),
                DOM.addCSSClass(DOM.textElement('span', objectDate), ["date"])
            ]);
            DOM.addCSSClass(div, ["museum-label"]);
            return div;
        }
    }
}
