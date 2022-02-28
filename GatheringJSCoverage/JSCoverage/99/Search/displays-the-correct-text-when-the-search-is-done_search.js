import { getArtwork } from './met-api.js';
const baseURI = 'https://collectionapi.metmuseum.org';
const form = document.querySelector('.search-form');

let urlParams = new URLSearchParams(window.location.search);
let q = urlParams.get('q');

window.onload= () => {
    cartSize();

    if(q != null) {
        getSearchData(q).then( data => {
            processSearchData(data);
            getObjectsData(data);
        })
    }


    
}



form.addEventListener('submit', )

function processSearchData(data) {
    if(data.total == 1)  else {
        document.getElementById('search-info').innerHTML = "Found " + data.total + " artworks for “" + q +  "”";
    }
}

async function getSearchData(params) {
    document.getElementById('search-info').innerHTML = "Searching for “" + params + "”..."
    let response = await fetch(baseURI + '/public/collection/v1/search?hasImages=true&q=' + params);
    return await response.json();
}

function getObjectsData(data) {
    let objectIds = data.objectIDs.slice(0,100);
    let promises = objectIds.map();
    Promise.all(promises).then()
}



//Change to better version


function cartSize(){
    let storage = localStorage.getItem("cart");
    if(storage != null)
}