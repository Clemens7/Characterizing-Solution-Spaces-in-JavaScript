async function performSearch() {
    //avoid '+' trap from test-case

    let search = document.getElementById("search");
    search.onchange = 

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");

    let updateTitle = !!query;
    let title = document.getElementById("search-info");

    if (updateTitle) title.innerText = `Searching for “${query}”...`;

    const searchResults = await fetchArtworks(query);}











function fetchMuseumApi(query) {
    const url = new URL('https://collectionapi.metmuseum.org/public/collection/v1/search');
    const params = {'q': query, 'hasImages': true};
    url.search = new URLSearchParams(params).toString();
    return fetch(url)
    .then()
    .then()
}




async function fetchArtworks(query) {
    return query ? fetchMuseumApi(query) ;
}

export { performSearch, getObjectURL, getArtistName, fetchObject}
