var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        
        
        function step(result) { result.done  : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * checks if the specified object is already in local storage and returns it.
 * If not, makes request to Met API and returns the parsed result.
 * If there does not exist an object with the given ID, returns null
 * @param objectId ID of the object to look for
 */
export 
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
export 
