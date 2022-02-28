import * as ElementCreator from './element-creator.js';

export class ResultContainer {
    constructor(id = 'gallery') {
        this.container = document.getElementById(id);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    addResultItemtoContainer(resultItem) {
        function createResultElement(resultItem) {
            const artist = ElementCreator.create_TextElement('span', resultItem.artistDisplayName, {}, 'artist');
            const title = ElementCreator.create_TextElement('span', resultItem.title+', ', {}, 'title');
            const date = ElementCreator.create_TextElement('span', resultItem.objectDate, {}, 'date');

            const descriptionElem = ElementCreator.create_Container([artist, title, date], 'div', ['museum-label'], {});
            const imgElem = ElementCreator.create_LinkElement({
                src: resultItem.primaryImageSmall, alt: resultItem.title,
                id: 'object-image-' + resultItem.objectID
            }, 'img', []);

            const aElem = ElementCreator.create_Container([imgElem, descriptionElem], 'a', [], { href: 'config.html?objectID=' + resultItem.objectID, id: 'object-' + resultItem.objectID });

            const mainElem = ElementCreator.create_Container([aElem],'div', ['thumb'], {});

            return mainElem;



        }
        this.container.appendChild(createResultElement(resultItem));
    }
}