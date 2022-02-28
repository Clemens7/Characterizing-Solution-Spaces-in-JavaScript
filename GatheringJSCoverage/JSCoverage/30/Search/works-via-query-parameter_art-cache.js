export function retrieve(searchName) {
    const key = searchName;
    if(key in localStorage) 
}

export async function store(searchName, artObject) {
    const key = searchName;
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(artObject);
}
