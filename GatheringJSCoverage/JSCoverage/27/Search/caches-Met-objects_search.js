import { Keywords } from './objectsArtwork.js';
import * as ArtworkCache from './artwork-cache.js';
import { writeNumberOfCartItems } from './global.js';

let searchKeywords = "";
let defaultPage = true;

var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('q') & urlParams.get('q') != "") {
    defaultPage = false;
    const searchInput = urlParams.get('q');
    searchKeywords = searchInput.split(',');
    console.log(searchKeywords);
    document.getElementById("search-info").innerHTML = "Searching for “" + searchKeywords + "”...";
    searchArtwork(searchKeywords);
}

writeNumberOfCartItems(document.getElementById('cart-link'));

async function searchArtwork(searchKeywords) {
    console.log("Searched stuff are: " + searchKeywords);
    const searchResults = await retrieve(searchKeywords); //get results (all ids)
    const responseArtworkIDs = await searchResults.objectIDs;
    gallery.innerHTML = '';
    loadIds(responseArtworkIDs);
}


async function loadIds(data) {
    if (data == null)  else {
        let promises = [];
        let numResults = data.length > 100  : data.length;
        for (let i = 0; i < numResults; i++) {
            promises.push(loadArtworkById(data[i], i));
        }
        return Promise.all(promises).then(() => {
            console.log("done!!");
            if (!defaultPage) {
                let artworkWord = data.length == 1  : "artworks";
                document.getElementById("search-info").innerHTML = "Found " + data.length + " " + artworkWord + " for “" + searchKeywords + "”";
            }
        });
    }}

async function loadArtworkById(id, index) {
    //const urlartwork = 'https://cors-anywhere.herokuapp.com/' + `http://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
    const urlartwork = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
	
    let a = [];
    a.push("" + id);
    let rdata = ArtworkCache.retrieve(a);
    if (rdata) {
        addElement(rdata, index, id);
    }

}

function addElement(objectData, index, id) {
    var nodeDiv = document.createElement("DIV");
    nodeDiv.classList.add("thumb");
    var nodeA = document.createElement("A");
    var nodeImg = document.createElement("IMG");
    var nodeLabel = document.createElement("DIV");
    nodeLabel.classList.add("museum-label");
    var nodeArtist = document.createElement("SPAN");
    nodeArtist.classList.add("artist");
    var nodeTitle = document.createElement("SPAN");
    nodeTitle.classList.add("title");
    var nodeDate = document.createElement("SPAN");
    nodeDate.classList.add("date");

    nodeLabel.appendChild(nodeArtist);
    nodeLabel.appendChild(nodeTitle);
    var commaNode = document.createTextNode(", ");
    nodeLabel.appendChild(commaNode);
    nodeLabel.appendChild(nodeDate);
    nodeA.appendChild(nodeImg);
    nodeA.appendChild(nodeLabel);
    nodeDiv.appendChild(nodeA);

    nodeImg.setAttribute("src", "" + objectData.primaryImageSmall); //SLOW
    nodeA.setAttribute("id", "object-" + index);
    nodeImg.setAttribute("id", "object-image-" + index);
    nodeImg.setAttribute("alt", objectData.title);


    nodeA.setAttribute("href", "./config.html?objectID=" + id); //TODO

    var textnodeArtist = document.createTextNode(objectData.artistDisplayName);
    nodeArtist.appendChild(textnodeArtist);
    var textnodeTitle = document.createTextNode(objectData.title);
    nodeTitle.appendChild(textnodeTitle);
    var textnodeDate = document.createTextNode(objectData.objectDate);
    nodeDate.appendChild(textnodeDate);

    gallery.appendChild(nodeDiv);
}





async function retrieve(searchKeywords) {
    let artworks = ArtworkCache.retrieve(searchKeywords);
    if (artworks) {
      return artworks;
    }}
  
  
