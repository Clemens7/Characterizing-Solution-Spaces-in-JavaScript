//import {displayNoInCart} from "./config.js";
import {SearchItem} from "./SearchItem.js";

let objectIDs = [];
let searchItems = [];
let count = 0;
let total = 0;

const requestUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/';

const searchInfo = document.getElementById('search-info');

// display the number of items in the cart
displayNoInCart();

// get the term from the search-field
const query = new URLSearchParams(window.location.search).get('q');

if(query === null || query === '')  else {
    searchInfo.innerHTML = 'Searching for “' + query + '”...';
    createSearchList();
}



function createSearchList(){

    // Request the objectIDs from the museum API
    fetch(requestUrl + 'search?hasImages=true&q=' + query).then();
}







export function displayNoInCart() {
    let items = [];
    if(localStorage.getItem("cart") !== null) 
    if (items.length > 0) 
}
