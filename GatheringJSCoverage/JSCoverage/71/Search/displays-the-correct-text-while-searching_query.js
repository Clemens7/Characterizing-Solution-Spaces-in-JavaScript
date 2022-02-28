import {loadCartSize} from "./cart.js";

loadCartSize();

const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', query);

document.addEventListener('DOMContentLoaded', event => {
    query3();
});

async function retrieveFromStorage(objectIds) {
    if (objectIds && objectIds.length > 0) {
        let ids = objectIds.join(',');
        let objects = localStorage.getItem(ids);
        if (objects) 
    }
}

function query3() {
    const params = (new URL(document.location)).searchParams;
    const qQuery = params.get('q');

    if (!qQuery) 

    let searchLabel = document.getElementById('search-info');
    qQuery.replace("+", " ");

    searchLabel.innerHTML = `Searching for “${qQuery}”...`;

    search(qQuery).then(objectIds => handleSearchResponse(objectIds, qQuery));

}

async function handleSearchResponse(objectIds, qQuery) {
    let objects = await retrieveFromStorage(objectIds);
    let searchLabel = document.getElementById('search-info');
    if (objects)  else {
        let result = [];

        if (!objectIds || objectIds.length === 0 || objectIds === "")  else if (objectIds.length === 1)  else {
            console.log("hallo3");
            objectIds = objectIds.slice(0, 100);
            searchLabel.innerText = `Found ${objectIds.length} artworks for “${qQuery}”`;
        }

        objectIds.forEach(id => getObject(id).then(data => drawObject(data))
            .then(data => result.push(data)));

        let ids = objectIds.join(',');
        localStorage.setItem(ids, JSON.stringify(result));
    }
}



async function getObject(id) {
    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    let data = await response.json();
    return data;
}

async function search(query) {
    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`);
    let data = await response.json();
    return data.objectIDs;
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