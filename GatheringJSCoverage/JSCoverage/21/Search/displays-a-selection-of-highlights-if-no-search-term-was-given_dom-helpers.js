import * as DOM from './dom-helpers.js';
import { FramedPicture, calculateTotalCartPrice, cartIsEmpty } from './config.js';
import { FrameConfiguration } from './config.js';
import { render } from './frame.js';

export 

export class CartDocumentContainer {
    

    
    

    

    
}

export class SearchResultDocumentContainer {
    constructor(containerID='gallery') {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }

    

    addSearchResultToDocument(searchResult) {
        this.container.appendChild(createSearchResultElement(searchResult));

        function createSearchResultElement(searchResult) {
            const thumb = document.createElement('div');
            const configLink = './config.html?objectID=' + searchResult.objectID;
            thumb.setAttribute('class', 'thumb');
            thumb.innerHTML =   `<a href="${configLink}" id="object-${searchResult.objectID}">
                                    <img src="${searchResult.primaryImageSmall}" alt="${searchResult.title}" id="${searchResult.objectID}">
                                    <div class="museum-label">
                                        <span class="artist">${searchResult.artistDisplayName}</span>
                                        <span class="title">${searchResult.title}</span>,
                                        <span class="date">${searchResult.objectDate}</span>
                                    </div>
                                </a>`;
            return thumb;
        }
    }
}
