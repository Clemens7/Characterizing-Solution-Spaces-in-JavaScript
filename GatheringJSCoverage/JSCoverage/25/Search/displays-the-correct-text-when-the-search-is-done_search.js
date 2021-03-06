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
    fetch(requestUrl + 'search?hasImages=true&q=' + query).then(response => {
        if (response.ok) {
            console.log('TEST fetch Search');
            response.json().then(json => { 
                    objectIDs = json.objectIDs;
                    if (json.total === 0) objectIDs = null
                    console.log('Objects highlight');
                    console.log(objectIDs);

                    if(objectIDs !== null )
                        

                    getObjectsFromAPI();
                    createItemsFromTemplate(searchItems);
                }
            )
        }
    });
}

function getObjectsFromAPI(){
    if (objectIDs === null ){
        total = 0;
        checkAllLoaded();
    }
}

function checkAllLoaded(){
    count++;
    if(query !== null && query !== '') {
        if (total <= count) {
            localStorage.setItem("test", total + " " + count + " " + objectIDs + " ye")
            count = 0;
            if(objectIDs === null ){
                localStorage.setItem("test1", " yelj")
                searchInfo.innerHTML = 'Found 0 artworks for “' + query + '”';
            }
        }
    }
}

function createItemsFromTemplate(items){
    let template = "";
    var index = 0;

    items.forEach();
    document.getElementById('gallery').insertAdjacentHTML('afterbegin', template);

}

export function displayNoInCart() {
    let items = [];
    if(localStorage.getItem("cart") !== null) 
    if (items.length > 0) 
}
