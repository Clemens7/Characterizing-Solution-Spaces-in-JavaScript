var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        
        
        function step(result) { result.done  : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SearchApi {
    fetchImages(q) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (q === '') 
                const response = yield fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${q}&hasImages=true`);
            }
        });
    }
    
}
export const searchApi = new SearchApi();
//# sourceMappingURL=search-api.js.map