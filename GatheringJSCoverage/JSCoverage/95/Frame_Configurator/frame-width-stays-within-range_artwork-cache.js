export function store(objectID, object) {
    console.log(`Storing ${objectID} in local storage`);
    localStorage[objectID] = JSON.stringify(object);
}

export function retrieveStorage(objectID) {
    if (objectID in localStorage) 
}