export function retrieve(objectID) {
    if(objectID in localStorage) {
        return JSON.parse(localStorage[objectID]);
    }
}

export 