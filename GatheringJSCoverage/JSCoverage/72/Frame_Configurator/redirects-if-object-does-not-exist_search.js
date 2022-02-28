const metApiBaseURL = "https://collectionapi.metmuseum.org/public/collection/v1";



function metApiSearchForObjectID(objectID) {
    let localStorageQuery = localStorage.getItem(`object-${objectID}`);

    if (localStorageQuery == null) {
        fetch(`${metApiBaseURL}/objects/${objectID}`)
            .then(response => response.json())
            .then()
            .then()
            .catch();

    }
}




async function metApiSearchForTerm(q) {
    let objectIDs;
    if (searchTerm != null)  else {
        objectIDs = fetch('./highlights.json')
            .then(response => response.json())
            .then(json => json.highlights);
    }

    objectIDs
        .then(objectIDs => objectIDs.slice(0, 100))
        .then(objectIDs => {
            objectIDs.map(id => {
                metApiSearchForObjectID(id);
            })
        })
        .catch();
}

setCartNumber();
let urlParams = new URLSearchParams(window.location.search);
let searchTerm = urlParams.get('q');

metApiSearchForTerm(searchTerm);
