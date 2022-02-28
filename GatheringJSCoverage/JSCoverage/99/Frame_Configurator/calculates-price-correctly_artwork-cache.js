export function read(objectID) {
    const key = objectID;
    if(key in localStorage) 
}

export function write(objectID, artwork) {
    const key = objectID;
    console.log(`Writing ${key} to local storage`);
    localStorage[key] = JSON.stringify(artwork);
}