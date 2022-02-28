var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    
    return new (P || (P = Promise))(function (resolve, reject) {
        
        
        function step(result) { result.done ? resolve(result.value) ; }
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
        if (cachedObject) {
            return JSON.parse(cachedObject);
        }
    });
}
/**
 * Returns the result of  the search endpoint from the MET API
 * @param searchTerm String parameter used as input for the search api
 */
export 
export 
