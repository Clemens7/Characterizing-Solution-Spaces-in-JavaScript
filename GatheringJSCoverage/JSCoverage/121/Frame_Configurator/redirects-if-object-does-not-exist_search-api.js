var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class SearchApi {
    fetchImages(q) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (q === '') {
                    const highlightsFile = yield fetch('highlights.json');
                    if (highlightsFile.status !== 200) 
                    const res = yield highlightsFile.json();
                    return {
                        total: res.highlights.length,
                        objectIDs: res.highlights,
                    };
                }
            }
        });
    }
    
}
export const searchApi = new SearchApi();
//# sourceMappingURL=search-api.js.map