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

export function appendDescription(el, artist, title, date) {
    console.log(artist)

    const aritstNameEl = document.createElement('b')
    const titleEl = document.createElement('i')
    const objectDateEl = document.createElement('span')

    aritstNameEl.textContent = artist
    titleEl.textContent = title + ", "
    objectDateEl.textContent = date

    el.append(
        aritstNameEl, 
        document.createElement('br'), 
        titleEl, 
        objectDateEl
    )
    return el
}

export class SearchTextContainer {
    

    
    

    

    
}

export class CartItemContainer {
    

    

    
}