import { getArtwork } from './met-api.js';
const baseURI = 'https://collectionapi.metmuseum.org';
const form = document.querySelector('.search-form');

let urlParams = new URLSearchParams(window.location.search);
let q = urlParams.get('q');

window.onload= () => {
    cartSize();

    if(q != null)  else {
        loadHighlights();
    }


    
}

function loadHighlights() {
    let hl = fetch('./highlights.json').then(hl => hl.json());
    hl.then(x => getObjectsData({objectIDs: x.highlights}))
}

form.addEventListener('submit', )





function getObjectsData(data) {
    let objectIds = data.objectIDs.slice(0,100);
    let promises = objectIds.map(x => getArtwork(x));
    Promise.all(promises).then()
}



//Change to better version


function cartSize(){
    let storage = localStorage.getItem("cart");
    if(storage != null)
}