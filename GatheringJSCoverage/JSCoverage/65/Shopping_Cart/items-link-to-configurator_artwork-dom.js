import { Artwork } from './Artwork.js';
import * as DOM from './dom-helpers.js';
import {setAttributes} from "./dom-helpers.js";
import {setAttributeClass} from "./dom-helpers.js";
import {cartItemDescription} from "./cart.js";
import {calculatePrice, render} from "./frame.js";

export class ArtworkDocumentContainer {
    

    

}

export 

export function createArtworkImage(artwork) {
    const img = new Image()
    img.src = artwork.primaryImageSmall
    img.alt = artwork.title
    return img
}

export 

export 

export class SearchTextContainer {
    

    
    

    

    
}

export class CartItemContainer {
    constructor(containerID='cart') {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }

    

    addItemToCart(artwork, cartItem, index) {
        console.log(cartItem);
        this.container.prepend(setAttributeClass(CreateCartItem(artwork, cartItem, index), "cart-item"));


        function CreateCartItem(artwork, cartItem, index) {
            const el = document.createElement('div')
            const cartPreviewContainer = document.createElement('div')
            cartPreviewContainer.classList.add('cart-preview')
            cartPreviewContainer.append(CreateCartItemImageContainer(artwork, cartItem, cartPreviewContainer))
                el.classList.add('cart-item')
                el.append(
                    cartPreviewContainer,
                    DOM.setAttributeClass(createMuseumLabel(artwork, cartItem, index), 'museum-label')
                )
            return el     
        }

        function CreateCartItemImageContainer(artwork, cartItem, container) {
            console.log(artwork)
            const img = createArtworkImage(artwork, cartItem)
            img.classList.add('cart-thumb')
            const aEl = document.createElement('a')
            aEl.href = "/config.html?objectID=" + cartItem.objectID + "&printSize=" + cartItem.printSize
                        + "&frameStyle=" + cartItem.frameStyle + "&frameWidth=" + cartItem.frameWidth + "&matColor=" + cartItem.matColor + "&matWidth=" + cartItem.matWidth
            img.addEventListener('load', () => { render(img, container, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth / 10, cartItem.matColor, cartItem.matWidth / 10)
                aEl.append(img)
            })
            return aEl
        }



        function createMuseumLabel(artwork, cartItem, index) {
            return DOM.container( [
                createCartItemDescription(artwork.artistDisplayName, artwork.title, artwork.objectDate, cartItem),
                DOM.textElementRandom(DOM.setAttributeClass(createCartItemPrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth), 'cart-price'), '€'),
                DOM.setAttributeClass(createCartItemButton(index))
            ])
        }

        function createCartItemDescription(artist, title, date, cartItem) {
            return DOM.container([
                DOM.setAttributeClass(DOM.textElement('span', artist),"artist"),
                DOM.setAttributeClass(DOM.textElement('span', title + ", "), "title"),
                DOM.setAttributeClass(DOM.textElement('span', date), "date"),
                DOM.textElement('br'),
                DOM.textElement('br'),
                DOM.setAttributeClass(DOM.textElement('span', cartItemDescription(cartItem)), "frame-description")
            ])
        }

        function createCartItemPrice(printSize, frameStyle, frameWidth, matWidth) {
            return DOM.container( [
                DOM.setAttributes(DOM.textElement('span', calculatePrice(printSize, frameStyle, frameWidth, matWidth)), {id: 'price-0'})
            ])
        }

        function createCartItemButton(index) {
            return DOM.setAttributes(DOM.setAttributeClass(document.createElement('button'), 'cart-remove'), { id: index});
        }
    }
}