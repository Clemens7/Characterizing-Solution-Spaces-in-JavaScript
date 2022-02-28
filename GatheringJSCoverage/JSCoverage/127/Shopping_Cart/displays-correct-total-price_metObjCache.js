

export function retrieve(id) {
    const key = id;
    if(key in localStorage) 
}

export function store(id, metObj) {
    const key = id;
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(metObj);
}
