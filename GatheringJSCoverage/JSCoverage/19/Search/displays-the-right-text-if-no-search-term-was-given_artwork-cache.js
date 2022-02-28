export function retrieve(id) {
    if (id in localStorage) 
}

export function store(artworkObject) {
    const key = artworkObject.objectID;
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(artworkObject);
}