export function retrieve(key) {
    if(key in localStorage) 
}

export function store(key, value) {
    localStorage[key] = JSON.stringify(value);
}