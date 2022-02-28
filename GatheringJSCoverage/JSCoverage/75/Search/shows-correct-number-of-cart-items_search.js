const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search");
const gallery = document.getElementById("gallery");
const urlParams = new URLSearchParams(location.search);
const query = urlParams.get('q');
const searchText = document.getElementById('search-info');

var resultCount = 0;
var highlights = [39799, 459055, 437853, 435809, 436535, 360018, 634108, 459080, 435882, 271890, 459054, 436105];

let storage = window.localStorage;


document.addEventListener('DOMContentLoaded', handleQuery(query));

class Artwork{
    
}

async function handleQuery(query){
    if(query != null) else {
        for(var id of highlights){
            retrieveArtworkObject(id);
        }
    }
}



async function retrieveArtworkObject(objectId){
    if(storage.getItem("artObj" + objectId) != null){
        let artObj = storage.getItem("artObj" + objectId);
        addImageToHtml(JSON.parse(artObj));
        return;
    }}

function addImageToHtml(artwork){
    const artworkContainer = document.createElement('div')
    artworkContainer.className = "thumb";

    const artworkReference = document.createElement('a');
    artworkReference.id = "object-" + artwork.id;
    artworkReference.href = "config.html?objectID="+artwork.id;   //TODO

    const artworkImage = document.createElement('img');
    artworkImage.id = "object-image-" + artwork.id;
    artworkImage.src = artwork.image;
    artworkImage.alt = artwork.primaryImageSmall;

    const innerArtworkContainer = document.createElement('div')
    innerArtworkContainer.className = "museum-label";

    const artist = document.createElement('span')
    artist.className = "artist";
    artist.innerText = artwork.artistName;

    const title = document.createElement('span')
    title.className = "title";
    title.innerText = artwork.title;

    const date = document.createElement('span')
    date.className = "date";
    date.innerText = ", " + artwork.date;

    //Create child relations
    artworkContainer.appendChild(artworkReference);

    artworkReference.appendChild(artworkImage);
    artworkReference.appendChild(innerArtworkContainer);

    innerArtworkContainer.appendChild(artist);
    innerArtworkContainer.appendChild(title);
    innerArtworkContainer.appendChild(date);

    //Add to global html
    gallery.appendChild(artworkContainer);
}
//cart header
artworksTest = JSON.parse(localStorage.getItem('cart'));

if (artworksTest == null) 

let cartLink = document.getElementById('cart-link');
artworks = JSON.parse(localStorage.getItem('cart'));
if (artworks.length !== 0)  else {
    cartLink.innerText = 'Cart'
}
