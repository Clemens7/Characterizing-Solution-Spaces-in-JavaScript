/**
 * js script for the search page
 * @type {{DATE: "24.4.2020", ARTIST: "Maximilian Ernst", TITLE: "search.js"}}
 */
// enums for the search page
const SPAN_CLASS = {
    ARTIST : 'artist',
    TITLE : 'title',
    DATE : 'date'
};
const DIV_CLASS = {
    MUSEUM_LABEL : 'museum-label',
    THUMB : 'thumb'
};
const ATTRIBUTE = {
    CLASS: 'class',
    ID: 'id',
    ALT: 'alt',
    SRC: 'src',
    HREF: 'href'
};
const TAG = {
    DIV : 'div',
    SPAN : 'span',
    IMG : 'img',
    A : 'a'
};

//Constants for API and ENDPOINTS
const MET_API_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/';
const OBJECT_EP = 'objects/';
const SEARCH_EP = 'search';

// id of the gallery div
const GALLERY_ID = 'gallery';
// id of the gallery item div
const OBJ_IMG_ID = 'object-image-';
// id of the link to the config site
const LNK_ID = 'object-';
// base url to the config page
const CONF_LNK = './config.html';
// the search parameter key
const SEARCH_PARAM = '?q=';
// id of the search info header
const SEARCH_INFO = 'search-info';

/**
 * Creates a gallery item with image and label from the metropolitan object, gotten through the Metropolitan object
 * endpoint and returns it.
 *
 * @param met_obj a JSON Object returned from the Object-Endpoint of the Metropolitan API
 * @param item_nr the number of this item (how many items where already created?)
 * @returns {HTMLDivElement} the gallery element, ready to be appended.
 */


/**
 * Adds the highlight art into the gallery as gallery items.
 *
 * @returns {Promise<void>}
 */


/**
 * Creates the url for the Metropolitan API search call, with the given query. Note: Only searches for objects with
 * images. The url will look like this: <br>
 * <code>
 *     https://collectionapi.metmuseum.org/public/collection/v1/?q={query}&hasImages=true
 * </code>
 *
 *
 * @param query the string to be searched for
 * @returns {string} the url for the API call
 */
function create_search_url(query){
    let api_base = MET_API_BASE_URL + SEARCH_EP;
    let params = "?q=" + query + "&hasImages=true";
    return api_base + params;
}

/**
 * Searches for art using the Metropolitan search endpoint and then loads the results into the gallery using the
 * Metropolitan object endpoint.
 *
 * @param search_query the string to be searched for
 */
function search(search_query){
    // set search info and create api url
    let search_info = document.getElementById(SEARCH_INFO);
    search_info.textContent = 'Searching for “' + search_query + '”...';
    //add the gallery items to this element
    let gallery = document.getElementById(GALLERY_ID);
    const url = create_search_url(search_query);

    // search for art using the query
    fetch(url).then((response) => {
            return response.json();
        }).then();
}

/**
 * Initializes the web page and checks if there are any parameters set in the <code>window.location.href</code> or if
 * there are any items set in the <code>localStorage</code>.
 *
 * @returns {Promise<void>} nothing
 */
async function init(){
    //shows number of items in shopping cart
    let itemsInCart = JSON.parse(localStorage.getItem('cart'));
    if (localStorage.getItem('cart') !== null ) 
    // parse url params
    const href = unescape(window.location.href).replace('+', ' ');
    const query = href.split(SEARCH_PARAM);

    if(query.length === 1)  else if (query.length > 1) {
        // the query parameter was given
        const search_query = query[1];
        if (search_query.length === 0) else {
            // search for query param
            search(search_query);
        }
    }
}

//init on page load
window.addEventListener("load", init);
