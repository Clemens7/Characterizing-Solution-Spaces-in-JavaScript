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
                if (q === '') 
                const response = yield fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${q}&hasImages=true`);
                if (response.status !== 200) 
                const result = yield response.json();
                if (result) {
                    return this.formatSearchResult(result);
                }
            }
        });
    }
    formatSearchResult(res) {
        var _a;
        return {
            total: res.total,
            objectIDs: ((_a = res.objectIDs) !== null  : []).slice(0, 100),
        };
    }
}
export const searchApi = new SearchApi();
//# sourceMappingURL=search-api.js.map