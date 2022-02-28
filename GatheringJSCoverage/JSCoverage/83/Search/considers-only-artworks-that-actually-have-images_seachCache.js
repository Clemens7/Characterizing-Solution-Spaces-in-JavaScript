const SEARCH_RESULT_KEY = "searchResult/";
const SEARCH_OBJECT_KEY = "searchObject/";

export 

export 

export 

export function getSearchResult(searchQuery) {
    const localStoreItem = localStorage.getItem(SEARCH_RESULT_KEY + searchQuery);
    if (localStoreItem !== null)  else {
        return null;
    }
}
