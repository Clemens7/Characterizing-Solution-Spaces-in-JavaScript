const metApiBaseURL = "https://collectionapi.metmuseum.org/public/collection/v1";






function setSearchInfoString(searchResponse) {
    if (searchTerm == null) 

    let total = searchResponse.total;
    let artworksString;
    if (total == 1)  else {
        artworksString = "artworks";
    }

    document.getElementById('search-info').innerHTML = `Found ${total} ${artworksString} for “${searchTerm}”`;
}

async function metApiSearchForTerm(q) {
    let objectIDs;
    if (searchTerm != null) {
        let searchInfo = document.getElementById('search-info');
        searchInfo.innerHTML = `Searching for “${searchTerm}”...`;

        let requestURL = `${metApiBaseURL}/search?q=${q}&hasImages=true`;

        objectIDs = fetch(requestURL)
            .then(response => response.json()) 
            .then(json => {
                setSearchInfoString(json);
                return json;
            })
            .then(json => json.objectIDs);

    }

    objectIDs
        .then(objectIDs => objectIDs.slice(0, 100))
        .then()
        .catch(err => console.log(err));
}

setCartNumber();
let urlParams = new URLSearchParams(window.location.search);
let searchTerm = urlParams.get('q');

metApiSearchForTerm(searchTerm);
