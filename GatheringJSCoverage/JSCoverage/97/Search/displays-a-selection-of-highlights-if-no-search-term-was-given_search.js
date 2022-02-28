var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as ArtworkApi from "./artwork-api.js"; // use .js even tough webstorm may complain as it won't work otherwise after compilation
import { SearchDom } from "./search-dom.js";
const searchDom = new SearchDom();
/**
 * Parses an array of artworks IDs, fetches the artwork data from the API and populates the gallery.
 * Also sets the heading after completion if a searchText was provided.
 * @param artworkIDs a list of artworks IDs to fetch and populate.
 * @param searchText the searched text used to set the heading after completion.
 */
function parseArtworkIDs(artworkIDs, searchText) {
    let promises = [];
    // get all the artworks
    for (let artworkId of artworkIDs) {
        promises.push(ArtworkApi.getArtwork(artworkId));
    }
    // wait for all the artworks to return from the api call
    Promise.all(promises).then((artworks) => {
        // Set the heading if a search text was provided
        if (searchText) 
        document.body.style.cursor = "default";
        // clear gallery an populate it with new data
        searchDom.clearContainer();
        for (let artwork of artworks) {
            if (artwork) {
                searchDom.addArtworkToContainer(artwork);
            }
        }
    });
}
/**
 * Searches the artworks with the given searchText string and populates the gallery afterwards.
 * @param searchText The text to search for.
 */

document.addEventListener('DOMContentLoaded', (event) => __awaiter(void 0, void 0, void 0, function* () {
    //ingredients
    const params = (new URL(document.location.href)).searchParams;
    const searchQuery = params.get('q');
    // if no query was provided, load the ids from the highlights.json and load the object data of these.
    if (!searchQuery) {
        try {
            const result = yield fetch("res/highlights.json");
            const data = yield result.json();
            let artworkIDs = [];
            data.highlights.map((highlight) => artworkIDs.push(highlight));
            parseArtworkIDs(artworkIDs);
        }
        
        return;
    }
}));
const searchInput = document.getElementById("search");
const searchForm = document.getElementsByClassName("search-form")[0];
searchForm.addEventListener("submit", );
