const SEARCH_RESULT_KEY = "searchResult/";
const SEARCH_OBJECT_KEY = "searchObject/";

export 

export function getObjectWithId(id) {
    const localStoreItem = localStorage.getItem(SEARCH_OBJECT_KEY + id);
    if (localStoreItem !== null) {
        return JSON.parse(localStoreItem)
    }
}

export 

export 
