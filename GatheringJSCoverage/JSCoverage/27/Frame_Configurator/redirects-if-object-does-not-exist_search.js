import { Keywords } from './objectsArtwork.js';
import * as ArtworkCache from './artwork-cache.js';
import { writeNumberOfCartItems } from './global.js';

let searchKeywords = "";
let defaultPage = true;

var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('q') & urlParams.get('q') != "")  else {
    let var2 = fetch("highlights.json")
        .then(res => res.json())
        .then(data => {
            gallery.innerHTML = '';
            loadIds(data.highlights);
        }).catch();
}

writeNumberOfCartItems(document.getElementById('cart-link'));




async function loadIds(data) {
    if (data == null)  else {
        let promises = [];
        let numResults = data.length > 100  : data.length;
        for (let i = 0; i < numResults; i++) {
            promises.push(loadArtworkById(data[i], i));
        }
        return Promise.all(promises).then();
    }}

async function loadArtworkById(id, index) {
    //const urlartwork = 'https://cors-anywhere.herokuapp.com/' + `http://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
    const urlartwork = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
	
    let a = [];
    a.push("" + id);
    let rdata = ArtworkCache.retrieve(a);
    if (rdata)  else {
        let res = await fetch(urlartwork);}








  
  
