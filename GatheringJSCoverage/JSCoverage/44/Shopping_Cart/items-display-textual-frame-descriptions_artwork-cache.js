export function retrieve(searchTermKey) {
    if (localStorage[searchTermKey]) {
        console.log("retrieving: " + searchTermKey);
        return JSON.parse(localStorage[searchTermKey]);
    }
}

export function store(searchTermKey, artworks) {
    if (!localStorage[searchTermKey]) {
        console.log("storing: " + searchTermKey);
        localStorage[searchTermKey] = JSON.stringify(artworks);
    }
}