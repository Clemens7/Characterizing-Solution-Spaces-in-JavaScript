export class Artwork {
    
}

export class ArtworkContainer {
    constructor(id='gallery') {
        this.container = document.getElementById(id);
        if(!this.container) 
    }

    clear() {
        this.container.innerHTML = '';
    }

    createArtworkContainer(artwork) {
        /* <div class="thumb">
        <a href="" id="object-0">
          <img src="" alt="" id="object-image-0">
          <div class="museum-label">
            <span class="artist"></span>
            <span class="title"></span>,
            <span class="date"></span>
          </div>
        </a>
      </div> */

        let thumb = document.createElement('div');
        thumb.className = 'thumb';
        let a = document.createElement('a');
        a.href = `config.html?objectID=${artwork.id}`;
        a.id = `object-${artwork.id}`;
        thumb.appendChild(a);

        let img = document.createElement('img');
        img.src = artwork.image;
        img.id = `object-image-${artwork.id}`;
        a.appendChild(img);

        let museumlabel = document.createElement('div');
        museumlabel.className = 'museum-label';

        let artist = document.createElement('span');
        artist.className = 'artist';
        artist.textContent = artwork.artist;

        let title = document.createElement('span');
        title.className = 'title';
        title.textContent = artwork.title;
        title.append(', ');

        let date = document.createElement('span');
        date.className = 'date';
        date.textContent = artwork.date;

        museumlabel.appendChild(artist);
        museumlabel.appendChild(title);
        museumlabel.appendChild(date);

        a.appendChild(museumlabel);

        this.container.appendChild(thumb);

    }

}