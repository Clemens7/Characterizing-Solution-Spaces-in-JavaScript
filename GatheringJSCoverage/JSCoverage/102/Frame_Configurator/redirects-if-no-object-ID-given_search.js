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
async function show_highlights() {
    // fetch ids from json file
    fetch('highlights.json')
        .then((response) => {
            return response.json();
        }).then((highlights) => {
            return highlights.highlights;
        }).then((ids) => {
            //add the gallery items to this element
            let gallery = document.getElementById(GALLERY_ID);

            // fetch art data from api for each highlight
            let item_nr = 0;
            for (const id of ids) {
              //check if the item already exists in localStorage
              if (localStorage.getItem(id) == null) {
                fetch(MET_API_BASE_URL + OBJECT_EP + id)
                    .then().then();
              }
            }
        });
}

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


/**
 * Searches for art using the Metropolitan search endpoint and then loads the results into the gallery using the
 * Metropolitan object endpoint.
 *
 * @param search_query the string to be searched for
 */


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

    if(query.length === 1) {
        // no parameter was given
        await show_highlights();
    }
}

//init on page load
window.addEventListener("load", init);
