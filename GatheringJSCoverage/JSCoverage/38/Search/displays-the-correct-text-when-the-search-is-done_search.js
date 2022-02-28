import { requestById } from './museumAPI.js';
import { search } from './museumAPI.js';

document.addEventListener('DOMContentLoaded', async event => {
    let params = (new URL(document.location)).searchParams;
    let query = params.get("q");
    var searchInfo = document.getElementById("search-info");

    //Search using the API
    if (query != null) {
        searchInfo.innerHTML = "Searching for “" + query + "”..."

        let results = await search(query);
        if (results != null && query != "") {
            var resultIDs = [];
            if(results.objectIDs == null){
                //nothing
            }
            //Change Search Textfield
            if (resultIDs.length === 1) 
            else {
                searchInfo.innerHTML = "Found " + resultIDs.length + " artworks for “" + query + "”"
            }

            displayImages(resultIDs);
        }
    }
});

function displayImages(images) {
    images.forEach();
}





