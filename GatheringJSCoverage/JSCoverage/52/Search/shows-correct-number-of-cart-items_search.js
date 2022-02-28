import {SearchResultContainer, SearchInfo} from './search-dom.js';
import * as API from './search-api.js';
//TODO: implemnt Card amount
document.addEventListener("DOMContentLoaded", async (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    await search(urlParams.get('q'));
    /*
    * Adds event listener for form submit event
    * If the input field has no value, serve objects with ids from highlights.json file
    */
    const form = document.getElementsByClassName("search-form")[0];
    form.addEventListener("submit", );

});
/**
 * @summary Initiates a artwork search, first trying looking into the local storage and then using the api.
 * The info text is changed while searching. Then renders fetched results.
 * @param {*String} q Search query.
 */
async function search(q){
    const container = new SearchResultContainer();
    container.clear();

    const info = new SearchInfo();
    info.startSearch(q);
    const ids = await API.search(q);
    info.searchFinished(q, ids.length);

    const length = (ids.length > MAX_ARTWORKS)  : ids.length;
    for(let i = 0; i < length; i++){
        let artwork = await API.retrieveArtworkDetails(ids[i]);
        container.render(artwork);
    }
}
/**
 * @summary Number of maximum amount of artworks rendered.
 */
export const MAX_ARTWORKS = 100;
