export class LocalStorageUtil {
    static retrieve(localStorageKey) {
        if (!(localStorageKey in localStorage)) {
            return null;
        }
    }
    static store(key, value) {
        localStorage[key] = JSON.stringify(value);
    }
}
