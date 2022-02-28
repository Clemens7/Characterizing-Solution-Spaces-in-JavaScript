import {getArtworkMetadata, retrieveIdsMatchingTerm, retrieveHighlights, getCartItems} from '../util.js';

const defaultSearchText = "Search our collection of more than 400,000 artworks.";

const resultGallery = document.getElementById("gallery");
const searchInfo = document.getElementById("search-info");
const cartNavLink = document.getElementById("cart-link");
const queryParameters = getQueryVariables();

initSearch();

function initSearch() {
    updateCartItemsCounter();
    searchArtworks();
}

function getQueryVariables(){
    const queryString = window.location.search;
    return new URLSearchParams(queryString);
}

function updateCartItemsCounter() {
    if(getCartItems().length > 0)else{
        cartNavLink.innerHTML = "Cart";
    }
}

function searchArtworks() {
    updateCartItemsCounter();

    let matchingIds;
    let validTerm = false;
    const searchTerm = queryParameters.get('q');

    if (searchTerm == undefined || searchTerm == "")  else {
        matchingIds = retrieveIdsMatchingTerm(searchTerm);
        validTerm = true;
        searchInfo.innerText = `Searching for “${searchTerm}”...`;
    }

    resultGallery.innerHTML = '';
    matchingIds.then();
}

