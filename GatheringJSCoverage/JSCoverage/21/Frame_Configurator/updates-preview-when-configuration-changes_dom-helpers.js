import * as DOM from './dom-helpers.js';
import { FramedPicture, calculateTotalCartPrice, cartIsEmpty } from './config.js';
import { FrameConfiguration } from './config.js';
import { render } from './frame.js';

export function appendImageLabel(searchResult, container) {
    const label = document.createElement('div');
    label.setAttribute('class', 'museum-label');
    label.innerHTML =   `<span class="artist">${searchResult.artistDisplayName}</span>
                          <span class="title">${searchResult.title}</span>,
                          <span class="date">${searchResult.objectDate}</span>`;
    container.appendChild(label);
}

export class CartDocumentContainer {
    

    
    

    

    
}

export class SearchResultDocumentContainer {
    

    

    
}
