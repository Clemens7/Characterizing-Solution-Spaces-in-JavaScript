// window.onload = function () {
//     search();
// };

class artElement {
    constructor(objectId, artistDisplayName, title, objectDate, primaryImageSmall) {
        this.objectId = objectId;
        this.artistDisplayName = artistDisplayName;
        this.title = title;
        this.objectDate = objectDate;
        this.primaryImageSmall = primaryImageSmall;
    }
}

document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    console.log('q' + params.get('q'));
    const searchTerm = params.get('q');

    updateCart();

    if(!searchTerm) {
        searchForHighlights();
    }
})

function searchForHighlights() {
    let counter = 0;
    fetch('highlights.json').then(
        resp => resp.json().then(
            resp => {
                resp.highlights.forEach(
                    resp => loadElementById(resp,counter).then(
                        resp => createArtworkElement(resp, counter++))
                    );
            }));
}



function createArtworkElement(element, counter){

    let anchor = document.createElement("a");
    //anchor.href = element.linkResource; //TODO: Link zu Frameconfig
    anchor.id = "object-" + counter;

    let imgEle = document.createElement("img");
    imgEle.src = element.primaryImageSmall;
    imgEle.alt = element.title + " from " + element.artistDisplayName;
    imgEle.id = "object-image-" + (counter++);
    imgEle.onclick = ;
    anchor.appendChild(imgEle);

    let museumLabel = document.createElement('div');
    // museumLabel.class = "museum-label";
    museumLabel.setAttribute('class', 'museum-label');

    let artist = document.createElement('span');
    // artist.class = "artist";
    artist.setAttribute('class', 'artist');
    artist.textContent = element.artistDisplayName;
    museumLabel.appendChild(artist);
    let title = document.createElement('span');
    // artist.class = "title";
    title.setAttribute('class', 'title');
    title.textContent = element.title;
    museumLabel.appendChild(title);
    let date = document.createElement('span');
    // artist.class = "date";
    date.setAttribute('class', 'date');
    date.textContent = element.objectDate;
    museumLabel.appendChild(date);
    let comma = document.createTextNode(", ");
    date.parentNode.insertBefore(comma, date);

    anchor.appendChild(museumLabel);

    let thumb = document.createElement('div');
    // thumb.class = "thumb";
    thumb.setAttribute('class', 'thumb');
    thumb.appendChild(anchor);
    let gallery = document.getElementsByClassName("gallery");
    gallery.item(0).appendChild(thumb);
}

async function loadElementById(objectId, number) {
    let locallyStoredElement = loadElementFromLocalStorageById(objectId);
    console.log(locallyStoredElement);
    if(locallyStoredElement!=null)
    let resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
    resp = await resp.json();
    console.log(resp);
    let elem = new artElement(resp.objectID, resp.artistDisplayName, resp.title, resp.objectDate, resp.primaryImageSmall);
    store(elem);
    return elem;
}



function store(elem) {
    console.log("storing" + elem.objectId);
    localStorage[elem.objectId] = JSON.stringify(elem);
}

function loadElementFromLocalStorageById(objectId) {
    if (objectId in localStorage) 
}

function updateCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart 
}