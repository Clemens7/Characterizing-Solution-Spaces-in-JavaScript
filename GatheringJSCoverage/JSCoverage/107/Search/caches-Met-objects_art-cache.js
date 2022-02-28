export 


export function retrieveFromStorage(queryElems) {
    const key = queryElems.join(' ');
    if (key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        return JSON.parse(localStorage[key]);
    }
}