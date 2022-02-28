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
    }).then();

}








