export class ArtmartDocumentContainer {
    constructor(containerId = 'searchResults') {
        this.container = document.getElementById(containerId);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = "";
    }

    addSearchResultToDom(artmart) {
        this.container.appendChild(createSearchResult(artmart));


        function createSearchResult(artmart) {
            const thumbContainer = document.createElement('div');
            thumbContainer.className = 'thumb';

            const linkToObject = document.createElement('a');
            linkToObject.href = `config.html?objectID=${artmart.objectID}`
            linkToObject.id = artmart.objectID;

            const image = document.createElement('img');
            image.src = artmart.primaryImageSmall;
            image.alt = artmart.objectName;
            image.id = artmart.objectID;

            const labelContainer = document.createElement('div');
            labelContainer.className = 'museum-label';

            const artist = document.createElement('span');
            artist.className = 'artist';
            artist.innerText = artmart.artistDisplayName;

            const title = document.createElement('span');
            title.className = 'title';
            title.innerText = artmart.title;

            const date = document.createElement('span');
            date.className = 'date';
            date.innerText = ", " + artmart.objectDate;

            labelContainer.appendChild(artist);
            labelContainer.appendChild(title);
            labelContainer.appendChild(date);
            
            linkToObject.appendChild(image);
            thumbContainer.appendChild(linkToObject);
            
            thumbContainer.appendChild(labelContainer);

            return thumbContainer;
        }
    }

}