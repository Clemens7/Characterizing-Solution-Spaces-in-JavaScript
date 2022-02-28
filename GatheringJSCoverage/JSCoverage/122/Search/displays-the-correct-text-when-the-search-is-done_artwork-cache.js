
export function retrieve(keywords) {
    const key = getStorageKey(keywords);
    if(key in localStorage) {
        //console.log(`Retrieving ${key} from local storage`);
        //console.log(JSON.parse(localStorage[key]));
        return JSON.parse(localStorage[key]);
    }
}

export 

function getStorageKey(keywords) {
    return keywords ;
}
