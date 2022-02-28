async function performSearch() {
    //avoid '+' trap from test-case

    let search = document.getElementById("search");
    search.onchange = 

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");

    let updateTitle = !!query;
    let title = document.getElementById("search-info");

    if (updateTitle) title.innerText = `Searching for “${query}”...`;

    const searchResults = await fetchArtworks(query);
    const resultCount = searchResults.objectIDs.length;
    searchResults.objectIDs = searchResults.objectIDs.splice(0, 100); // discard all but 100 results

    if (updateTitle) title.innerText = `Found ${resultCount} artwork${resultCount == 1  : "s"} for “${query}”`;

    const gallery = document.getElementById("gallery");

    for (let objectID of searchResults.objectIDs) 

    /* show number of items in cart */
	const cart = JSON.parse(localStorage.getItem("cart"));
	const itemCount = cart.length;
	if (itemCount < 1) {
		document.getElementById("cart-link").innerText = 'Cart';
	}
}











function fetchMuseumApi(query) {
    const url = new URL('https://collectionapi.metmuseum.org/public/collection/v1/search');
    const params = {'q': query, 'hasImages': true};
    url.search = new URLSearchParams(params).toString();
    return fetch(url)
    .then(response => response.json())
    .then(response => {
        if (!response.objectIDs) response.objectIDs = [];
        return response;
    })
}




async function fetchArtworks(query) {
    return query ? fetchMuseumApi(query) ;
}

export { performSearch, getObjectURL, getArtistName, fetchObject}
