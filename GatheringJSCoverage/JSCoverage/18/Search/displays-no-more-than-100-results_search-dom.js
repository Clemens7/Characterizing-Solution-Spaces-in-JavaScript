
export class PictureDocumentContainer {
    constructor(containerID='gallery') {
        this.container = document.getElementById(containerID);
        if(!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    addPictureToDocument(picture) {
        this.container.appendChild(createPictureElements(picture));

        function createPictureElements(picture) {
            const thumbObject = document.createElement('div');
            thumbObject.setAttribute('class', 'thumb');

            const aObject = document.createElement('a');
            aObject.setAttribute('id', `object-${picture.objectID}`);

            const imgObject = document.createElement('img');
            imgObject.setAttribute('id', `object-image-${picture.objectID}`);

            const museumObject = document.createElement('div');
            museumObject.setAttribute('class', 'museum-label');

            const artistObject = document.createElement('span');
            artistObject.setAttribute('class', 'artist');
            const titleObject = document.createElement('span');
            titleObject.setAttribute('class', 'title');
            const dateObject = document.createElement('span');
            dateObject.setAttribute('class', 'date');

            //hierarchie aufbauen
            museumObject.appendChild(artistObject);
            museumObject.appendChild(titleObject);
            museumObject.appendChild(dateObject);

            aObject.appendChild(imgObject);
            aObject.appendChild(museumObject);

            thumbObject.appendChild(aObject);

            // Inhalt füllen
            artistObject.innerText = `${picture.artistDisplayName}`;
            titleObject.innerText = `${picture.title}, `;
            dateObject.innerText = picture.objectDate;

            imgObject.src = picture.primaryImageSmall;
            imgObject.alt = `Artwork ${picture.title} of ${picture.artistDisplayName}`;

            aObject.href =`config.html?objectID=${picture.objectID}`;

            return thumbObject;

        }    

    }
}
