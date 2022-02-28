
export function retrieve(keywords) {
    const key = getStorageKey(keywords);
    if(key in localStorage) 
}

export function store(keywords, art) {
    const key = getStorageKey(keywords);
    //console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(art);
}

function getStorageKey(keywords) {
    return keywords ;
}
