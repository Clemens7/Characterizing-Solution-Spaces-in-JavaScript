
import * as DOM from './dom-helpers.js';

export class ArtDocumentContainer {
    constructor(containerID='gallery') {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    addArtToDocument(art) {
        this.container.appendChild(createArtElements(art));

        function createArtElements(art) {
            let divContainer = DOM.container([
                createThumbnailUrlContainer(art)
            ],'div');

            divContainer.setAttribute('class', 'thumb');
            return divContainer;
        }

        function createThumbnailUrlContainer(art) {
            return DOM.setAttributes(DOM.container([
                DOM.setAttributes(document.createElement('img'), {src: art.thumbnail ,alt: '', id: 'object-image-'+ art.objectID}),
                createLabelContainer(art.artist, art.title, art.date)
            ], 'a'), {href: art.url, id: 'object-' + art.objectID});
        } 

        function createLabelContainer(artist, title, date){
            let artistSpan = DOM.textElement('span', art.artist);
            artistSpan.setAttribute('class', 'artist');
            let titleSpan = DOM.textElement('span', art.title + ', ');
            titleSpan.setAttribute('class', 'title');
            let dateSpan = DOM.textElement('span', art.date);
            dateSpan.setAttribute('class', 'date');
            let labelContainer = DOM.container([
                artistSpan,
                titleSpan,
                dateSpan
            ]);
            labelContainer.setAttribute('class', 'museum-label');
            return labelContainer;
            
        }

    }
}