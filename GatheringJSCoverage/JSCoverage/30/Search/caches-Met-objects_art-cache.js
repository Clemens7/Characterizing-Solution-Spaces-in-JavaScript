export function retrieve(searchName) {
    const key = searchName;
    if(key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}

export 
