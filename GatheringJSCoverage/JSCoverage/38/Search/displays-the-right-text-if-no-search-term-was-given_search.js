import { requestById } from './museumAPI.js';
import { search } from './museumAPI.js';

document.addEventListener('DOMContentLoaded', async event => {
    let params = (new URL(document.location)).searchParams;
    let query = params.get("q");
    var searchInfo = document.getElementById("search-info");

    //Search using the API
    if (query != null) 
    //Load Highlights if no query is given
    else {
        let response = await fetch('./highlights.json');

        if (response.ok) {
            let json = await response.json();
            displayImages(json.highlights);
        }
    }
});

function displayImages(images) {
    images.forEach(id => {
        var cached = cacheLoad(id);
        if (cached) 
        else {
            requestById(id).then(())
        }
    });
}





function cacheLoad(key) {
    if (key in localStorage) 
}