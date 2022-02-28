var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ArtworkApi {
    getById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.getFromCacheById(id)) !== null  : this.fetchById(id);
        });
    }
    getCacheKey(id) {
        return `cached-artwork-${id}`;
    }
    getFromCacheById(id) {
        var _a;
        const cachedString = (_a = localStorage.getItem(this.getCacheKey(id))) !== null  : 'null';
        return JSON.parse(cachedString);
    }
    fetchById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                if (response.status !== 200) 
                const artwork = yield response.json();
                if (artwork) {
                    localStorage.setItem(this.getCacheKey(id), JSON.stringify(artwork));
                }
                return artwork;
            }
        });
    }
}
export const artworkApi = new ArtworkApi();
//# sourceMappingURL=artwork-api.js.map