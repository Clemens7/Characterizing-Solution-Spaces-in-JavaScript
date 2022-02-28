export function retrieve(objectID) {
    if(objectID in localStorage) 
}

export function store(image) {
    const key = image.id;
    localStorage[key] = JSON.stringify(image);
}