export class LocalStorageUtil {
    static retrieve(localStorageKey) {
        if (!(localStorageKey in localStorage)) 
        else {
            let value = localStorage[localStorageKey];
            return JSON.parse(value);
        }
    }
    static 
}
