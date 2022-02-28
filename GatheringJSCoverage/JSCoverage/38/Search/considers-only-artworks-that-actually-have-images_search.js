import { requestById } from './museumAPI.js';
import { search } from './museumAPI.js';

document.addEventListener('DOMContentLoaded', async event => {
    let params = (new URL(document.location)).searchParams;
    let query = params.get("q");
    var searchInfo = document.getElementById("search-info");

    //Search using the API
    if (query != null) {
        searchInfo.innerHTML = "Searching for “" + query + "”..."

        let results = await search(query);) 
    }});







