export function read(objectID) {
    const key = objectID;
    if(key in localStorage) {
        console.log(`Reading ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}

export 