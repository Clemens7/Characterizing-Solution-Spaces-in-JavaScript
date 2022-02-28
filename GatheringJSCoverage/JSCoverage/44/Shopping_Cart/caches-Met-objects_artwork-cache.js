export function retrieve(searchTermKey) {
    if (localStorage[searchTermKey]) {
        console.log("retrieving: " + searchTermKey);
        return JSON.parse(localStorage[searchTermKey]);
    }
}

export 