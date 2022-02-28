var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        
        
        function step(result) { result.done  : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import { artworkApi, searchApi } from './shared/index.js';
class SearchApiClient {
    constructor() {
        this.gallery = document.getElementById('gallery');
    }
    doSearch(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchInfo = document.getElementById('search-info');
            searchInfo.innerText = `Searching for “${query}”...`;
            const res = yield searchApi.fetchImages(query);) 
        });
    }
    
}
export const searchApiClient = new SearchApiClient();
const params = new URLSearchParams(document.location.search);
searchApiClient.doSearch((_b = (_a = params.get('q')) === null || _a === void 0  : _a.replace('+', ' ')) !== null && _b !== void 0 ? _b ).then();
//# sourceMappingURL=search.js.map