export function retrieve(objectID) {
    if(objectID in localStorage) {
        return JSON.parse(localStorage[objectID]);
    }
}

export function store(image) {
    const key = image.id;
    localStorage[key] = JSON.stringify(image);
}