export function retrieveJson(key) {
    if (key in localStorage) {
        return JSON.parse(localStorage[key]);
    }
}
export async function retrieveJsonAsync(key) {
    return Promise.resolve().then(function() {
        if (key in localStorage) {
            return JSON.parse(localStorage[key]);
        }
    })
}
export function storeJson(key, value) {
    localStorage[key] = JSON.stringify(value);
}