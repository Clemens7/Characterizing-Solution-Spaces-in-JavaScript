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
        if (objects) {
            return JSON.parse(objects);
        }
    }}

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
    if (objects) {

        if (objectIds.length === 1)  else {
            objectIds = objectIds.slice(0, 100);
            searchLabel.innerText = `Found ${objectIds.length} artworks for “${qQuery}”`;
        }
        objects.forEach();

    }
}





async function search(query) {
    let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`);
    let data = await response.json();
    return data.objectIDs;
}



