export function retrieveJson(key) {
    if (key in localStorage) 
}
export 
export function storeJson(key, value) {
    localStorage[key] = JSON.stringify(value);
}