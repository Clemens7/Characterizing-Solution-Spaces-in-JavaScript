export function retrieve(searchTermKey) {
    if (localStorage[searchTermKey]) else{
        return null;
    }
}

export function store(searchTermKey, artworks) {
    if (!localStorage[searchTermKey]) {
        console.log("storing: " + searchTermKey);
        localStorage[searchTermKey] = JSON.stringify(artworks);
    }
}