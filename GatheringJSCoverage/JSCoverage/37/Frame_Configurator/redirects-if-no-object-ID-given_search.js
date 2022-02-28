async function performSearch() {
    //avoid '+' trap from test-case

    let search = document.getElementById("search");
    search.onchange = 

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");

    let updateTitle = !!query;
    let title = document.getElementById("search-info");

    if (updateTitle) 

    const searchResults = await fetchArtworks(query);
    const resultCount = searchResults.objectIDs.length;
    searchResults.objectIDs = searchResults.objectIDs.splice(0, 100); // discard all but 100 results

    if (updateTitle) 

    const gallery = document.getElementById("gallery");

    for (let objectID of searchResults.objectIDs) {
        fetchObject(objectID).then();
        // if we wanted to keep the order and load the images sequentially:
        // let object = await(fetchObject(objectID));
        // gallery.appendChild(createObejctDOMElement(object));
    }

    /* show number of items in cart */
	const cart = JSON.parse(localStorage.getItem("cart"));
	const itemCount = cart.length;
	if (itemCount < 1) {
		document.getElementById("cart-link").innerText = 'Cart';
	}
}









async function fetchObject(objectId) {
    const cachedObject = await localStorage.getItem(objectId.toString());
    if (cachedObject) 

    const url = new URL(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
    return await fetch(url)
    .then()
    .then()
}



function fetchHighlights() {
    return fetch("highlights.json")
    .then(response => response.json())
    .then(response => {
        return {total: response.highlights.length,
                objectIDs: response.highlights}
    });
}


async function fetchArtworks(query) {
    return query  : fetchHighlights();
}

export { performSearch, getObjectURL, getArtistName, fetchObject}
