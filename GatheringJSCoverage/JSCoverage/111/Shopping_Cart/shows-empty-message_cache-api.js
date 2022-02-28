export function retrieveJson(key) {
    if (key in localStorage) 
}
export async function retrieveJsonAsync(key) {
    return Promise.resolve().then(function() {
        if (key in localStorage)  else {
            return null;
        }
    })
}
export 