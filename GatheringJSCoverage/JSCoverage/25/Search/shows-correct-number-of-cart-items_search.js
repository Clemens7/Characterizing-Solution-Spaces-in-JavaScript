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

if(query === null ) {
    initSearch();
}

function initSearch(){
    fetch("./highlights.json").then(response => {
        if (response.ok) {
            response.json().then(json => {
                objectIDs = json.highlights;
                getObjectsFromAPI();
                createItemsFromTemplate(searchItems);
                }
            )
        }
    });
}



function getObjectsFromAPI(){
    if (objectIDs === null || objectIDs === undefined) else {
        total = objectIDs.length;

        objectIDs.forEach(item => {
            let cached = localStorage.getItem('object' + item);
            if (cached !== undefined && cached !== null) {
                var json = JSON.parse(cached);
                searchItems.push(new SearchItem(item, json.primaryImageSmall, json.artistDisplayName, json.title, json.objectDate));
                checkAllLoaded();
            }


            /*var requestItem = new XMLHttpRequest();
            requestItem.open("GET", requestUrl + 'objects/' + item, false);
            requestItem.send(null);
            var json = JSON.parse(requestItem.responseText);
            searchItems.push(new SearchItem(item, json.primaryImageSmall, json.artistDisplayName, json.title, json.objectDate));*/
        });
    }
}

function checkAllLoaded(){
    count++;
    if(query !== null ) 
}

function createItemsFromTemplate(items){
    let template = "";
    var index = 0;

    items.forEach(item => {
        template += `
            <div class="thumb">
                <a href=${"config.html?objectID=" + item.objectID} id=${"object-" + index}>
                    <img src=${item.source} alt="" id=${"object-image-" + index}>
                    <div class="museum-label">
                        <span class="artist">${item.artist}</span>
                        <span class="title">${item.title}</span>,
                        <span class="date">${item.date}</span>
                </div>
                </a>
            </div>`
        index++;
    });
    document.getElementById('gallery').insertAdjacentHTML('afterbegin', template);

}

export function displayNoInCart() {
    let items = [];
    if(localStorage.getItem("cart") !== null) {
        items = JSON.parse(localStorage.getItem("cart"));
    }
    if (items.length > 0) 
}
