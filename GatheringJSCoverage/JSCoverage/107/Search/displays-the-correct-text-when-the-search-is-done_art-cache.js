export function store(queryElems, ImagesandTotal) {
    const key = queryElems.join(' ');
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(ImagesandTotal);
}


export function retrieveFromStorage(queryElems) {
    const key = queryElems.join(' ');
    if (key in localStorage) 
}