const metApiBaseURL = "https://collectionapi.metmuseum.org/public/collection/v1";








async function metApiSearchForTerm(q) {
    let objectIDs;
    if (searchTerm != null) {
        let searchInfo = document.getElementById('search-info');
        searchInfo.innerHTML = `Searching for “${searchTerm}”...`;

        let requestURL = `${metApiBaseURL}/search?q=${q}&hasImages=true`;

        objectIDs = fetch(requestURL)
            .then() 
            .then()
            .then();

    }

    objectIDs
        .then()
        .then()
        .catch();
}

setCartNumber();
let urlParams = new URLSearchParams(window.location.search);
let searchTerm = urlParams.get('q');

metApiSearchForTerm(searchTerm);
