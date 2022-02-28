export function clearGallery() {
    const gallery = document.getElementById('gallery')
    gallery.innerText = '';
}

export function addImageToGallery(image) {
    const gallery = document.getElementById('gallery')
    gallery.appendChild(createImageContainer(image));
}

function createImageContainer(image) {
    const thumb = document.createElement('div');
    thumb.setAttribute('class', 'thumb');

    const anchor = createAnchorContainer(image);
    thumb.appendChild(anchor);

    const label = createLabelContainer(image);
    thumb.appendChild(label);

    return thumb;
}

function createAnchorContainer(image) {
    const a = document.createElement('a');
    a.setAttribute('href', `config.html?objectID=${image.id}`);
    a.setAttribute('id', 'object--1');

    const img = document.createElement('img');
    img.setAttribute('src', image.url);
    img.setAttribute('id', 'object-image--1');
    img.setAttribute('alt', image.title);
    a.appendChild(img);
    return a;
}

function createLabelContainer(image) {
    const label = document.createElement('div');
    label.setAttribute('class', 'museum-label');

    const artist = document.createElement('span');
    artist.setAttribute('class', 'artist');
    artist.innerText = image.artist;
    label.appendChild(artist);

    const title = document.createElement('span');
    title.setAttribute('class', 'title');
    title.innerText = image.title;
    label.appendChild(title);

    const date = document.createElement('span');
    date.setAttribute('class', 'date');
    date.innerText = `, ${image.date}`;
    label.appendChild(date);

    return label;
}


/*
Template:

<div class="thumb">
    <a href="" id="object--1">
     <img src="" alt="" id="object-image--1">
        <div class="museum-label">
            <span class="artist"></span>
            <span class="title"></span>,
            <span class="date"></span>
        </div>
    </a>
</div>
 */