export class GalleryDocumentContainer {
    constructor(containerID = "gallery") {
        this.container = document.getElementById(containerID);
        if (!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    addArtworkToDocument(artwork) {
        function parseLabel() {
            let div_museum_label = document.createElement('div');
            div_museum_label.setAttribute('class','museum-label');

            let artist_span=document.createElement('span');
            artist_span.setAttribute('class','artist');
            artist_span.innerText=artwork.artist;
            let title_span=document.createElement('span');
            title_span.setAttribute('class','title');
            title_span.innerText=artwork.title + ', ';
            let date_span=document.createElement('span');
            date_span.setAttribute('class','date');
            date_span.innerText=artwork.date;

            div_museum_label.appendChild(artist_span);
            div_museum_label.appendChild(title_span);
            div_museum_label.appendChild(date_span);

            return div_museum_label;
        }

        function parseImage() {
            let image = document.createElement('img');
            image.setAttribute('alt','');
            image.setAttribute('id','object-image-0');
            image.setAttribute('src',artwork.image)
            return image;
        }

        let thumb_div = document.createElement('div');
        thumb_div.setAttribute('class','thumb');
        thumb_div.onclick = ;
        let link = document.createElement('a');
        link.setAttribute('id','object-0');
        link.setAttribute('href', 'config.html');
        link.appendChild(parseImage());
        link.appendChild(parseLabel());
        thumb_div.appendChild(link);
        this.container.appendChild(thumb_div);
    }

}
