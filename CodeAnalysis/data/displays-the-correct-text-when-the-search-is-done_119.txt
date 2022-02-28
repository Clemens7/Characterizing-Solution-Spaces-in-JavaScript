class MetObject {
    
}


urlParams = new URLSearchParams(window.location.search);
queryParam = urlParams.get("q");


var artCount;
var metObjectIds;
var metObjects


if (queryParam != null) {
    document.addEventListener('DOMContentLoaded', event => {
        const h2 = document.getElementById('search-info');
        h2.innerHTML = `Searching for “${queryParam}”...`;
    });
    searchArt();
}



async function searchArt() {

    const url = "https://collectionapi.metmuseum.org/public/collection/v1/search";

    var cachedResponse = localStorage.getItem(queryParam);
    if (cachedResponse) 


    const fetchPromise = fetch(url + "?q=" + queryParam + "&hasImages=true", {
        method: 'GET',
        cache: 'no-cache'
    });

    fetchPromise.then(response => {
        return response.json();
    }).then(response => {

        console.log(response);
        localStorage.setItem(queryParam, JSON.stringify(response));
        
        updateSearchInfo(Math.min(response.total, 100));
        retrieveArtfromIds(response.objectIDs.slice(0, 100));
        
        


    });

}







function updateSearchInfo(totalCount) {



    const h2 = document.getElementById('search-info');

    var artwork;
    if (totalCount == 1) 
    else {
        artwork = "artworks";
    }

    h2.innerHTML = `Found ${totalCount} ${artwork} for “${queryParam}”`;


}
