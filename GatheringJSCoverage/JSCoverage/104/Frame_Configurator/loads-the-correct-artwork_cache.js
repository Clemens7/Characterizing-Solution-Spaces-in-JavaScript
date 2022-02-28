export function retrieve(key) {
    
    if(key in localStorage) 
}

export function store(key, artwork) {
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(artwork);
}

export 