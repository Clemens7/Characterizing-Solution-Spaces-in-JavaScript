const SEARCH_RESULT_KEY = "searchResult/";
const SEARCH_OBJECT_KEY = "searchObject/";

export function saveObjectWithId(id, searchResult) {
    localStorage.setItem(SEARCH_OBJECT_KEY + id, JSON.stringify(searchResult));
}

export function getObjectWithId(id) {
    const localStoreItem = localStorage.getItem(SEARCH_OBJECT_KEY + id);
    if (localStoreItem !== null)  else {
        return null;
    }
}

export function saveSearchResult(searchQuery, result) {
    localStorage.setItem(SEARCH_RESULT_KEY + searchQuery, JSON.stringify(result));
}

export function getSearchResult(searchQuery) {
    const localStoreItem = localStorage.getItem(SEARCH_RESULT_KEY + searchQuery);
    if (localStoreItem !== null)  else {
        return null;
    }
}
