export function retrieve(searchTermKey) {
    if (localStorage[searchTermKey]) else{
        return null;
    }
}

export 