const URL = 'https://collectionapi.metmuseum.org';
const SEARCH_API = '/public/collection/v1/search';
const GET_OBJECT_API = '/public/collection/v1/objects';
const CONFIG_SIDE = "/config.html";
const SEARCH_SIDE = "/search.html";
let SERVER_URL;
const CURRENT_URL = window.location.href;

const searchInfo = document.getElementById('search-info');
const gallery = document.getElementById('gallery');

let foundPictureAmount = 0;
let searchTerm = "";
let urlHasParam = false;

class Image {
    static HtmlNumber = 0;
    

    static 


    static 
}

async function getRequest(url, callback, callbackObject) {
    try {
        const response = await fetch(url);
        const rawData = await response.json();
        callback(rawData, callbackObject);
        return rawData;
    }}

function getSearchIDsSuccessCallback(response, localStorageKey) {
    gallery.innerText = null;
    if (response.total != undefined && response.objectIDs != null &&
        response.objectIDs.length && response.objectIDs.length > 0) {
        foundPictureAmount = response.objectIDs.length;

        if (response.objectIDs.length <= 1)  else {
            searchInfo.innerHTML = 'Found ' + foundPictureAmount + ' artworks for “' + searchTerm + '”';
        }

        localStorage["search:"+localStorageKey] = "";

        for (let i = 0; i < response.objectIDs.length && i < 100; i++) {
            let urlRequest = URL + GET_OBJECT_API + '/' + response.objectIDs[i];
            getRequest(urlRequest, getPictureObjectSuccessCallback, localStorageKey);
        }
    }
}





function init() {
    const shoppingCart = JSON.parse(localStorage.getItem('cart'));
    if(shoppingCart!==null )  else {
        document.getElementById('cart-link').innerHTML = "Cart (0)";
    }

    let newUrl = window.location.href;
    if (newUrl.indexOf('?') !== -1) {
        newUrl = newUrl.substring(0, newUrl.indexOf('?'));
    }
    SERVER_URL = newUrl.substring(0, newUrl.length - SEARCH_SIDE.length);


    let url = URL + SEARCH_API + '?hasImages=true';
    let q;
    /* const form = document.querySelector('form.search-form');--- ursprüngliche version inclusive versuche um fragwürdige Tests zu satisfyen
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (searchInput.value) {
                searchInput.style.border = '0px';
                searchTerm = searchInput.value.replace("+", " ");
                searchInfo.innerHTML = 'Searching for “' + searchTerm + '”...';
                getRequest(urlRequest + '&q=' + searchTerm, doNothing).then(
                    (response) => {
                        getSearchIDsSuccessCallback(response);
                        //debugger;
                        //return response.objectIDs;
                    })
            } else {
                searchInput.style.border = '1px solid red';
            }
        });*/

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlHasParam.toString() !== "") {
        urlHasParam = true;
    }
    if (urlParams.has('q')) {
        q = urlParams.get('q');
    }

    if (queryString !== '' && q != null && q !== '') {
        console.log('search with "' + q + '" as parameter');
        searchTerm = q;

        searchInfo.innerHTML = 'Searching for “' + searchTerm + '”...';

        const currentUrlRequest = url +'&' + 'q=' + q;

        if (localStorage["search:"+q] )  else {
            getRequest(currentUrlRequest, getSearchIDsSuccessCallback, q);
        }
    }
}

init();