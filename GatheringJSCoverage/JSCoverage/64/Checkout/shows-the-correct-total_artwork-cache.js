export function retrieve(key) {
    if(key in localStorage) {
        return JSON.parse(localStorage[key]);
    }
}

export 