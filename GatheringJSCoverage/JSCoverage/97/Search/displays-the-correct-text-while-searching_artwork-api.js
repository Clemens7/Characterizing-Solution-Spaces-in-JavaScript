var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Artwork } from "./model/artwork.js";
import * as ArtworkCache from "./repository/artwork-cache.js";
const searchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search";
const objectUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
/**
 * Searches for artworks for the given searchText.
 * @param searchText The text to search for.
 * @returns a promise for a number array of artwork IDs that can then be used to get the Artwork data with getArtwork.
 */
export function search(searchText) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = encodeURI(searchUrl + `?q=${searchText.trim().replace("+", " ")}&hasImages=true`);
        console.log(`Search api url: ${url}`);
        let ret = [];
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            if (!data.objectIDs) 
            let count = 0;
            data.objectIDs.map((objid) => {
                if (count < 100) {
                    ret.push(objid);
                }
                count++;
            });
            return ret;
        }});
}
/**
 * Retrieves the data of an artwork given its ID from the API.
 * @param artworkId The ID of the artwork to fetch the data for.
 * @returns The promise for an Artwork or null if the data could not be retrieved.
 */
export function getArtwork(artworkId) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${objectUrl}${artworkId}`;
        const artwork = ArtworkCache.retrieve(artworkId);
        if (artwork) 
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            if (data) {
                // ignore with no image
                if (!data.primaryImageSmall) 
                const newArtwork = new Artwork(data);
                ArtworkCache.store(newArtwork);
                return newArtwork;
            }});
}
