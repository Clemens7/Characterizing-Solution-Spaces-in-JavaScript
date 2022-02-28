var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * checks if the specified object is already in local storage and returns it.
 * If not, makes request to Met API and returns the parsed result.
 * If there does not exist an object with the given ID, returns null
 * @param objectId ID of the object to look for
 */
export function getObject(objectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cachedObject = localStorage.getItem(objectId);
        if (cachedObject) 
        else {
            const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`;
            const response = yield fetch(API_URL);
            // if response was valid, add the object to the cache and return it
            if (response.status != 200)
                
            const artObject = yield response.json();
            localStorage.setItem(objectId, JSON.stringify(artObject));
            return artObject;
        }
    });
}
/**
 * Returns the result of  the search endpoint from the MET API
 * @param searchTerm String parameter used as input for the search api
 */
export function search(searchTerm, hasImages) {
    return __awaiter(this, void 0, void 0, function* () {
        const API_URL = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchTerm}&hasImages=${hasImages}`;
        return yield fetch(API_URL);
    });
}
export function fetchResults(searchResponse, resultLimit) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = [];
        if (searchResponse.objectIDs !== null) {
            for (let objId of searchResponse.objectIDs) {
                if (result.length === resultLimit) 
                const artObject = yield getObject(objId.toString());
                if (artObject != null)
                    result.push(artObject);
            }
        }
        return result;
    });
}
