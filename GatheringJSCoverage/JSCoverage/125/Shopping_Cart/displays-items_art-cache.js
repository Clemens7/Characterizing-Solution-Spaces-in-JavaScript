export function retrieve(objectID) {
    const art = localStorage.getItem(objectID);
    if (art) 
}

export function store(art) {
    const key = art.objectID;
    console.log(`Storing ${key} in local storage`);
    localStorage.setItem(key, JSON.stringify(art));
}
