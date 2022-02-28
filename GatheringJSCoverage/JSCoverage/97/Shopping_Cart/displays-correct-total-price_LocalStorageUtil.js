export class LocalStorageUtil {
    static retrieve(localStorageKey) {
        if (!(localStorageKey in localStorage)) {
            return null;
        }
        else {
            let value = localStorage[localStorageKey];
            return JSON.parse(value);
        }
    }
    static store(key, value) {
        localStorage[key] = JSON.stringify(value);
    }
}
