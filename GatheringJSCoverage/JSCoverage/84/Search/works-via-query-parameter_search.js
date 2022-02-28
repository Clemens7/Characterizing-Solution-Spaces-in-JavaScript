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
        if (queryVal != null && queryVal != "") {
            this.updateSearchText("Searching for &ldquo;" + queryVal + "&rdquo;...")

            this.handleObjectSearch(queryVal)
        }
    }

    async handleObjectSearch(searchQuery) {
        const resJSON = await API.search(searchQuery)
        
        this.processObjectIDs(resJSON.objectIDs)
        this.updateSearchText("Found " + resJSON.total + " " + (resJSON.total == 1  : "artworks") + " for &ldquo;" + searchQuery+"&rdquo;")
    }

    

    async processObjectIDs(objectIDs) {
        // Loop for total amount of results but not more than 100 times
        for (var i = 0; i < objectIDs.length && i < 100; i++) {
            this.updateGallery(await this.getObjectInfo(objectIDs[i]))
        }
    }
    async getObjectInfo(objectID) {
        const objectInfoJSON = await API.getObject(objectID)
        return new SearchObject(objectInfoJSON)
    }

    updateGallery(searchObject) {
        document.getElementById("gallery").appendChild(searchObject.toHTMLNode())
    }

    updateSearchText(text) {
        document.getElementById("search-info").innerHTML = text;
    }
}

class SearchObject {
    objectID
    primaryImageSmall
    artistDisplayName
    title
    objectDate

    constructor(objectInfoJSON) {
        this.objectID = objectInfoJSON.objectID
        this.primaryImageSmall = objectInfoJSON.primaryImageSmall
        this.artistDisplayName = objectInfoJSON.artistDisplayName
        this.title = objectInfoJSON.title
        this.objectDate = objectInfoJSON.objectDate
    }

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
    toHTMLNode() {
        // Create all necessary elements: 

        var thumbDiv = document.createElement('div')
        thumbDiv.setAttribute("class", "thumb")

        var configLink = document.createElement("a")
        // TODO: check if this works
        configLink.setAttribute("href", window.location.origin+"/config.html?objectID="+this.objectID)
        configLink.setAttribute("id", "object-"+this.objectID)

        var objectImage = document.createElement("img")
        objectImage.setAttribute("src", this.primaryImageSmall)
        // TODO: check this
        objectImage.setAttribute("alt", this.artistDisplayName)
        objectImage.setAttribute("id", "object-image-"+this.objectID)

        var museumLabelDiv = document.createElement("div")
        museumLabelDiv.setAttribute("class", "museum-label")

        var artistSpan = document.createElement("span")
        artistSpan.setAttribute("class", "artist")
        artistSpan.innerHTML = this.artistDisplayName

        var titleSpan = document.createElement("span")
        titleSpan.setAttribute("class", "title")
        titleSpan.innerHTML = this.title + ", "

        var dateSpan = document.createElement("span")
        dateSpan.setAttribute("class", "date")
        dateSpan.innerHTML = this.objectDate

        // Reconstruct the structure

        museumLabelDiv.appendChild(artistSpan)
        museumLabelDiv.appendChild(titleSpan)
        museumLabelDiv.appendChild(dateSpan)

        configLink.appendChild(objectImage)
        configLink.appendChild(museumLabelDiv)

        thumbDiv.appendChild(configLink)

        return thumbDiv
    }
}

new Search();