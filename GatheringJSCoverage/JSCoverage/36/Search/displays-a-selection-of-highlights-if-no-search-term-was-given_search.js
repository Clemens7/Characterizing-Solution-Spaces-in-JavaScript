import * as DOM from './dom-helper.js';

export class SearchDocumentContainer {
    constructor(containerID = 'gallery') {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    addArtworkToDocument(artwork) {
        this.container.appendChild(createArtworkElements(artwork));

        function createArtworkElements(artwork) {
            let elem = DOM.container([createAContainer(artwork)], 'div');
            elem.className = 'thumb';
            return elem;
        }

        function createAContainer(artwork) {
            let a = DOM.container([
                createImgContainer(artwork),
                createLabelContainer(artwork)
            ], 'a');

            DOM.setAttributes(a, {href: `${DOM.CONFIG_URL}?objectID=${artwork.objectID}`});
            DOM.setAttributes(a, {id: artwork.objectID});
            return a;
        }

        function createImgContainer(artwork) {
            let img = document.createElement('img');
            DOM.setAttributes(img, {src: artwork.imgUrl});
            DOM.setAttributes(img, {alt: artwork.title});
            DOM.setAttributes(img, {id: artwork.objectID});
            return img;
        }

        function createLabelContainer(artwork) {
            let artist = DOM.textElement('span', artwork.artist);
            artist.className = 'artist';

            let title = DOM.textElement('span', `${artwork.title},`);
            title.className = 'title';

            let date = DOM.textElement('span', ` ${artwork.date}`);
            date.className = 'date';

            let label = DOM.container([artist, title, date], 'div');
            label.className = 'museum-label';

            return label;
        }
    }
}