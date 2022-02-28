import {addToCache, getCache} from "./cartStorage.js";

let formId = document.getElementById('search-form');


document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    var searchQuery = params.get('q');
    const currentlyDisplaying = document.getElementById('gallery');
    currentlyDisplaying.innerHTML = '';
    if (!searchQuery || searchQuery === "") 
    document.getElementById('search').value = searchQuery;
    respondToSearchRequest(searchQuery);
});

formId.addEventListener('submit', );

function respondToSearchRequest(searchQuery) {
    if (searchQuery === "")  else {
        document.getElementById('search-info').innerText = `Searching for “${searchQuery}”...`;
        var parsedSearchTerm = searchQuery.split(' ').join('+');
        const inLocalStorage = checkLocalStorage(parsedSearchTerm);
        if (!inLocalStorage) {
            performSearchRequest(parsedSearchTerm);
        }
    }
}



function getFromLocalStorage(searchTerm) {
    const storageData = localStorage.getItem(searchTerm);
    if (storageData === "" || storageData === "[null]") 
    return JSON.parse(storageData);
}

function checkLocalStorage(searchTerm) {
    const localStorageData = getFromLocalStorage(searchTerm);
    if (!Array.isArray(localStorageData)) {
        localStorage.setItem(searchTerm, "[]");
        return false;
    }
}






function displaySearchResultInfo(number, searchTerm) {
    const parsedSearchTerm = searchTerm.split('+').join(' ');
    if (number == 1)  else {
        document.getElementById("search-info").innerText = `Found ${number} artworks for “${parsedSearchTerm}”`;
    }
}



async function performSearchRequest(searchTerm) {
    const getFrom = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}&hasImages=true`;
    const respondHTTP = await fetch(getFrom);
    const rawResponse = await respondHTTP.json();
    if (rawResponse.total > 100)  else {
        if (rawResponse.total > 0)  else {
            displaySearchResultInfo(rawResponse.total, searchTerm);
        }
    }
}









