import {addToCache, getCache} from "./cartStorage.js";

let formId = document.getElementById('search-form');


document.addEventListener('DOMContentLoaded', event => {
    const params = (new URL(document.location)).searchParams;
    var searchQuery = params.get('q');
    const currentlyDisplaying = document.getElementById('gallery');
    currentlyDisplaying.innerHTML = '';
    if (!searchQuery ) {
        return useHighlights();
    }});

formId.addEventListener('submit', );










function useHighlights() {
    //const inLocalStorage = checkLocalStorage("NoSearchTerm");
    const inLocalStorage=false;
    if (!inLocalStorage) {
        console.log("Highlights");
        getHighlightsFromJson();
    }
}





function getHighlightsFromJson(callback) {
    const request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open('GET', "http://127.0.0.1:8080/highlights.json", true);
    request.onreadystatechange = ;
    request.send();
}











