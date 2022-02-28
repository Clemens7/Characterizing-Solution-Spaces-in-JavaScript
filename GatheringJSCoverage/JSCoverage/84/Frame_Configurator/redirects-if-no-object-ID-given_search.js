import API from "./APIRequests.js"
import Cart from "./ShoppingCart.js"


class Search {

    // This is called as soon as the search opens
    constructor() {
        this.cart = new Cart()
        this.cart.updateHeader()
        // Get the params, if there are nay
        var urlParams = new URLSearchParams(window.location.search)
        // If there are any urlParams, to the api request for searching
        var queryVal = urlParams.get("q")
        // check there was no query or the query is empty
        if (queryVal != null )  else {
            this.handleLocalHightlights()
        }
    }

    

    async handleLocalHightlights() {
        const resJSON = await API.getLocalJSON("./highlights.json")
        this.processObjectIDs(resJSON.highlights)
    }

    async processObjectIDs(objectIDs) {
        // Loop for total amount of results but not more than 100 times
        for (var i = 0; i < objectIDs.length && i < 100; i++) {
            this.updateGallery(await this.getObjectInfo(objectIDs[i])}
    async getObjectInfo(objectID) {
        const objectInfoJSON = await API.getObject(objectID)}

    

    
}

class SearchObject {
    

    

    /**
     * Returns following Structure as a DOM-Node with it's attributes: 
     * 
     * <div class="thumb">
        <a href="" id="object-0">
          <img src="" alt="" id="object-image-0">
          <div class="museum-label">
            <span class="artist"></span>
            <span class="title"></span>,
            <span class="date"></span>
          </div>
        </a>
      </div>

     */
    
}

new Search();