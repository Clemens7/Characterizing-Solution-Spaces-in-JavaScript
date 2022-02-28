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
    Promise.all(promises).then(x => displayResults(x))
}

function displayResults(data) {
    let container = document.getElementById('gallery');
    container.innerHTML = "";
    data.map(element => {
        container.appendChild(createResultElement(element));
    });
}

//Change to better version
function createResultElement(element) {

    console.log(element)

    let thumb = document.createElement('div');
    thumb.className = "thumb";

    let a = document.createElement('a');
    
    console.log(element.objectID);
    a.id = "object-" + element.objectID;

    let img = document.createElement('img');
    
    img.id = "object-image-" +  element.objectID;
    img.src = element.primaryImageSmall;
    //Add alt
    img.alt = "";

    let label = document.createElement('div');
    label.className = "museum-label";

    let artist = document.createElement('span');
    artist.className = "artist";
    artist.innerHTML = element.artistDisplayName;

    let title = document.createElement('span');
    title.className = "title";
    title.innerHTML = element.title;

    let date = document.createElement('span');
    date.className = date;
    date.innerHTML = ", " + element.objectDate;

    a.appendChild(img);

    label.appendChild(artist);
    label.appendChild(title);
    label.appendChild(date);

    a.appendChild(label);
    a.href = "http://localhost:3333/config.html?objectID=" + element.objectID;
    thumb.appendChild(a);
    return thumb;
}

function cartSize(){
    let storage = localStorage.getItem("cart");
    if(storage != null)
}