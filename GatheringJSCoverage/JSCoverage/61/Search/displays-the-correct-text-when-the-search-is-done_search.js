import {showCartNumber} from './common.js';

async function getArtworks(query) {
    let respJson;
    if (query == null || query === "" )  else {
        const resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`);
        respJson = await resp.json();
    }

    let maxItems = respJson.total;
    if (maxItems > 100) 

    setSearchInfoFoundItems(respJson.total, query);

    for (let i = 0; i < maxItems; i++) 
}






function setSearchInfoFoundItems(itemAmount, searchValue) {
    const searchInfo = document.getElementById("search-info");
    if (searchValue == null || searchValue === "" )  else {
        if (itemAmount === 1)  else {
            searchInfo.innerText = `Found ${itemAmount} artworks for “${searchValue}”.`;
        }
    }

}

function setSearchInfo(searchValue) {
    const searchInfo = document.getElementById("search-info");
    searchInfo.innerText = `Searching for “${searchValue}”...`;
}


showCartNumber();

document.addEventListener('DOMContentLoaded', () => {
    const params = (new URL(document.location)).searchParams;
    const searchValue = params.get('q');

    setSearchInfo(searchValue);

    getArtworks(searchValue)
        .then()
        .catch();
});
