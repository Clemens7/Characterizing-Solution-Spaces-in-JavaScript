

export function retrieve(id) {
    const key = id;
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}

export 
