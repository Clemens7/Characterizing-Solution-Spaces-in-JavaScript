import { getArtwork } from './met-api.js';
const baseURI = 'https://collectionapi.metmuseum.org';
const form = document.querySelector('.search-form');

let urlParams = new URLSearchParams(window.location.search);
let q = urlParams.get('q');

window.onload= () => {
    cartSize();

    if(q != null) {
        getSearchData(q).then( )
    }


    
}



form.addEventListener('submit', )



async function getSearchData(params) {
    document.getElementById('search-info').innerHTML = "Searching for “" + params + "”..."
    let response = await fetch(baseURI + '/public/collection/v1/search?hasImages=true&q=' + params);}





//Change to better version


function cartSize(){
    let storage = localStorage.getItem("cart");
    if(storage != null)
}