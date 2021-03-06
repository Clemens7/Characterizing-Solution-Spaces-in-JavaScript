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
                    if (json.total === 0) 
                    console.log('Objects highlight');
                    console.log(objectIDs);

                    if(objectIDs !== null && objectIDs.length > 100)
                        objectIDs = objectIDs.slice(0,100);

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
            if (cached !== undefined && cached !== null)  else {
                var requestItem = new XMLHttpRequest();
                requestItem.open("GET", requestUrl + 'objects/' + item, false);
                requestItem.send(null);
                var json = JSON.parse(requestItem.responseText);
                localStorage.setItem('object' + item, JSON.stringify(json));
                searchItems.push(new SearchItem(item, json.primaryImageSmall, json.artistDisplayName, json.title, json.objectDate));
                checkAllLoaded();


                /*fetch(requestUrl + 'objects/' + item).then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                                localStorage.setItem('object' + item, JSON.stringify(json));
                                //json = JSON.parse(json);
                                searchItems.push(new SearchItem(item, json.primaryImageSmall, json.artistDisplayName, json.title, json.objectDate));
                                checkAllLoaded();
                            }
                        )
                    }
                });*/
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
    if(query !== null && query !== '') {
        if (total <= count) {
            localStorage.setItem("test", total + " " + count + " " + objectIDs + " ye")
            count = 0;
            if(objectIDs === null || objectIDs === undefined || objectIDs.length === null || objectIDs.length === undefined || objectIDs.length === 0) else if (objectIDs.length === 1)  else {
                searchInfo.innerHTML = 'Found ' + objectIDs.length + ' artworks for “' + query + '”';
            }
        }
    }
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
    if(localStorage.getItem("cart") !== null) 
    if (items.length > 0) 
}
