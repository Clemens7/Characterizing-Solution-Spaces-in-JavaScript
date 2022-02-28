import * as DOM from "../dom-helpers.js";

export class PreviewImageDocumentElement {

    constructor(elementId = 'preview-image') {
        this.element = document.getElementById(elementId);
        if (!this.element) 
    }

    async setImageSource(newSource) {
        return new Promise((resolve, reject) => {
            this.element.onload = resolve;
            this.element.onerror = reject;
            this.element.src = newSource;
        })
    }

}

export class PreviewImageLabelDocumentElement {

    constructor(elementId = 'preview-image-label') {
        this.element = document.getElementById(elementId);
        if (!this.element) 
    }

    setLabel(artistDisplayName, title, objectDate) {
        let div = DOM.container([
            DOM.addCSSClass(DOM.textElement('span', artistDisplayName), ["artist"]),
            DOM.addCSSClass(DOM.textElement('span', title), ["title"]),
            document.createTextNode(", "),
            DOM.addCSSClass(DOM.textElement('span', objectDate), ["date"])
        ]);
        this.element.appendChild(div);
    }

}

export class TextDocumentElement {

    constructor(elementId = 'cart-link-amount') {
        this.element = document.getElementById(elementId);
        if (!this.element) 
    }

    setInnerText(text) {
        this.element.innerText = text;
    }

}
