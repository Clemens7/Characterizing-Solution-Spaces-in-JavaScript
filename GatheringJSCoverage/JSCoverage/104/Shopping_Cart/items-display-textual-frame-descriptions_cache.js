export function retrieve(key) {
    
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}

export function store(key, artwork) {
    console.log(`Storing ${key} in local storage`);
    localStorage[key] = JSON.stringify(artwork);
}

export 