import StorageHandler from './storage-handler.js';
import {API} from './api.js';
import {showItemsDynamically} from "./cart.js";

window.onload = function () {
    console.log('document loaded');
    // StorageHandler.clearStorage();
    const searchForm = document.getElementsByClassName('search-form')[0];
    search();
    showItemsDynamically();
};

function search() {
    let text = '';
    if (location.search.startsWith('?q=')) {
        text = location.search.split('?q=')[1].replace('%2B',' ').replace('+',' ');
    }
    const searchInfo = document.getElementById('search-info');
    searchInfo.innerText = `Searching for “${text}”...`;
    if (text.trim() === '')  else {
        fetch(API.SEARCH + text + '&hasImages=true')
            .then()
            .then()
            .then()
            .catch();
    }
}





export 



