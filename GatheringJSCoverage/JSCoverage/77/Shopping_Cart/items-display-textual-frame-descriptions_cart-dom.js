import * as DOM from './dom-helper.js';

export class PreviewContainer {
    constructor(containerID) {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    


    // sets the preview image.
    // image should be of class Picture
    set(image) {
        const cartHTML = DOM.setAttributes(DOM.container([
            DOM.setAttributes(
                DOM.container([
                    DOM.container([DOM.setAttributes(document.createElement('img'), {
                        src: image.image_small,
                        id: "preview-" + image.id,
                        alt: "Go back to Frame-Configurator"
                    })], 'a')
                ], 'div', "cart-preview"),
                {id: "preview-container-" + image.id}),
            DOM.setAttributes(
                DOM.container([
                    DOM.textElement('span', image.artist, "artist"),
                    DOM.textElement('span', image.title + ", ", "title"),
                    DOM.textElement('span', image.date, "date"),
                    DOM.textElement('br', '', ''),
                    DOM.setAttributes(
                        DOM.textElement('span', '', "frame-description"), {id: "frame-description-" + image.id}
                    ),
                    DOM.container([
                        DOM.setAttributes(DOM.textElement('span', '', "price"), {id: "price-" + image.id})], 'div', "cart-price"),
                    DOM.setAttributes(
                        DOM.textElement('button', '', "cart-remove"), { type: "button"}),
                ], 'div', "museum-label"))], 'div', "cart-item"), {id: "cart-item-" + image.id});

        if(this.container.getElementsByClassName("cart-item").item(0)){
            this.container.insertBefore(cartHTML, document.getElementsByClassName("cart-item").item(0));
        }else {
            this.container.insertBefore(cartHTML, document.getElementsByClassName("cart-total").item(0));
        }
        document.getElementById("preview-" + image.id).setAttribute("class", "cart-thumb");
    }
}