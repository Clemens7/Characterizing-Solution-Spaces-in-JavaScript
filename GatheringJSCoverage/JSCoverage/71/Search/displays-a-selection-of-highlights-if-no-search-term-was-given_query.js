import {loadCartSize} from "./cart.js";

loadCartSize();

const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', query);

document.addEventListener('DOMContentLoaded', event => {
    query3();
});



function query3() {
    const params = (new URL(document.location)).searchParams;
    const qQuery = params.get('q');

    if (!qQuery) {
        readFile(`highlights.json`)
            .then(highlights => highlights.forEach(id => getObject(id)
                .then(data => drawObject(data))));
        return;
    }}



async function readFile(path) {
    let readFile = await fetch(path);
    let text = await readFile.json();
    return text.highlights;
}

async function getObject(id) {
    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    let data = await response.json();
    return data;
}





function drawObject(data) {
    let imageUrl = data.primaryImageSmall;
    let objectId = data.objectID;
    let title = data.title;
    let artistName = data.artistDisplayName;
    let objectDate = data.objectDate;

    let thumb = document.createElement('div');
    thumb.className = 'thumb';
    let a = document.createElement('a');
    a.href = imageUrl;
    a.id = `object-${objectId}`

    thumb.appendChild(a);

    let img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;
    img.id = `object-image-${objectId}`;

    a.appendChild(img);

    let museumLabel = document.createElement('div');
    museumLabel.className = 'museum-label';

    let artistSpan = document.createElement('span');
    artistSpan.className = 'artist';
    artistSpan.innerText = artistName;
    let titleSpan = document.createElement('span');
    titleSpan.className = 'title';
    titleSpan.innerText = title + ',';
    let dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    dateSpan.innerText = objectDate;

    a.appendChild(museumLabel);

    museumLabel.appendChild(artistSpan);
    museumLabel.appendChild(titleSpan);
    museumLabel.appendChild(dateSpan);


    let gallery = document.getElementById('gallery');
    gallery.appendChild(thumb);
}