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
function create_gallery_item_from_json(met_obj, item_nr){
    // create the label elements
    let artist_node = document.createElement(TAG.SPAN);
    artist_node.setAttribute(ATTRIBUTE.CLASS, SPAN_CLASS.ARTIST);
    let artist_txt = document.createTextNode(met_obj.artistDisplayName);
    artist_node.appendChild(artist_txt);
    let title_node = document.createElement(TAG.SPAN);
    title_node.setAttribute(ATTRIBUTE.CLASS, SPAN_CLASS.TITLE);
    let title_txt = document.createTextNode(met_obj.title);
    title_node.appendChild(title_txt);
    let date_node = document.createElement(TAG.SPAN);
    date_node.setAttribute(ATTRIBUTE.CLASS, SPAN_CLASS.DATE);
    let date_txt = document.createTextNode(met_obj.objectDate);
    date_node.appendChild(date_txt);

    // create the label node
    let label_node = document.createElement(TAG.DIV);
    label_node.setAttribute(ATTRIBUTE.CLASS,DIV_CLASS.MUSEUM_LABEL);
    label_node.appendChild(artist_node);
    label_node.appendChild(title_node);
    label_node.appendChild(document.createTextNode(', '));
    label_node.appendChild(date_node);

    // create the image node
    let img_node = document.createElement(TAG.IMG);
    img_node.setAttribute(ATTRIBUTE.SRC, met_obj.primaryImageSmall);
    img_node.setAttribute(ATTRIBUTE.ALT, met_obj.title);
    img_node.setAttribute(ATTRIBUTE.ID, OBJ_IMG_ID + item_nr);

    // create the link node
    let a_node = document.createElement(TAG.A);
    a_node.setAttribute(ATTRIBUTE.HREF,CONF_LNK + '?objectID=' + met_obj.objectID);
    a_node.setAttribute(ATTRIBUTE.ID,LNK_ID + item_nr);
    a_node.appendChild(img_node);
    a_node.appendChild(label_node);

    // put it all together in a div node
    let thumb_node = document.createElement(TAG.DIV);
    thumb_node.setAttribute(ATTRIBUTE.CLASS, DIV_CLASS.THUMB);
    thumb_node.appendChild(a_node);

    return thumb_node;
}

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
                    .then((response) => {
                        return response.json();
                    }).then((data) => {
                      //stores data in localStorage if it does not already exist
                      let dataJSON = JSON.stringify(data);
                      localStorage.setItem(id, dataJSON);

                        // append gallery item
                        gallery.appendChild(create_gallery_item_from_json(data, item_nr));
                        item_nr++;
                });
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
