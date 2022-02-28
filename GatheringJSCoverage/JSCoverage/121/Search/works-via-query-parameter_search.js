var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            const res = yield searchApi.fetchImages(query);
            if (res) {
                const plural = res.total === 1  : 'artworks';
                searchInfo.innerText = `Found ${res.total} ${plural} for “${query}”`;
                const promises = res.objectIDs.map(this.fetchSingle.bind(this));
                yield Promise.all(promises);
            }
            if (!res || query === '') 
        });
    }
    fetchSingle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.gallery) 
            const artwork = yield artworkApi.getById(id);
            this.gallery.innerHTML +=
                `<div class="thumb">
                <a href="./config.html?objectID=${id}" id="object-${id}">
                    <img src="${artwork === null || artwork === void 0  : artwork.primaryImageSmall}" alt="artwork" id="object-image-${id}">
                    <div class="museum-label">
                        <span class="artist">${artwork === null || artwork === void 0  : artwork.artistDisplayName}</span>
                        <span class="title">${artwork === null || artwork === void 0  : artwork.title}</span>,
                        <span class="date">${artwork === null || artwork === void 0  : artwork.objectDate}</span>
                    </div>
                </a>
            </div>`;
        });
    }
}
export const searchApiClient = new SearchApiClient();
const params = new URLSearchParams(document.location.search);
searchApiClient.doSearch((_b = (_a = params.get('q')) === null || _a === void 0  : _a.replace('+', ' ')) !== null && _b !== void 0 ? _b ).then();
//# sourceMappingURL=search.js.map