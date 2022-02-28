// window.onload = function () {
//     search();
// };

class artElement {
    
}

document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    console.log('q' + params.get('q'));
    const searchTerm = params.get('q');

    updateCart();

    if(!searchTerm) else {
        changeSearchInfo(`Searching for “${searchTerm}”...`);
        searchForParams(searchTerm);
    }
})



async function searchForParams(searchTerm){
    let resp = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`)
    resp = await resp.json();

    if (resp.objectIDs != null) {

        const elements = resp.objectIDs;
        //let urls = [];
        let elementCounter = elements.length;
        if(elementCounter>100)
        for (let i = 0; i < elementCounter; i++) {
            loadElementById(elements[i], i).then(
                result => {
                    createArtworkElement(result, i);
                }
            )
        }
        // for (let i = 0; i < elementCounter; i++) {
        //     console.log(elements[i]);
        //     urls.push(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${elements[i]}`);
        // }
        // let requests = urls.map(urls => fetch(urls));
        // console.log("mapped urls")
        // let counter = 0;
        // Promise.all(requests)
        //     .then(responses => Promise.all(responses.map(r => r.json())))
        //     .then(responses => responses.forEach(element => {
        //             console.log(element);
        //             createArtworkElement(element, counter);
        //         })
        //
        //         // return responses;
        //     )
        if (elements.length != 1) {
            changeSearchInfo(`Found ${elements.length} artworks for “${searchTerm}”`);
        }
    }
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
    if(locallyStoredElement!=null){
        return locallyStoredElement;
    }}

function changeSearchInfo(newInfo) {
    document.getElementById("search-info").innerText=newInfo;
}



function loadElementFromLocalStorageById(objectId) {
    if (objectId in localStorage) {
        return JSON.parse(localStorage[objectId]);
    }
}

function updateCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart 
}