import { cache } from "./cache.js";

class ArtService {

    constructor() {
        this.museumUrl = "https://collectionapi.metmuseum.org/public/collection/v1";
        this.shippingUrl = "https://web-engineering.big.tuwien.ac.at/s20/a2";
    }

    /**
     * @returns an array of ShippingInfo objects
     */
    getShipping = async function () {
        const endpoint = "/shipping";

        try {
            const response = await fetch(this.shippingUrl + endpoint);
            const jsonData = await response.json();
            return jsonData.destinations.map(d => new ShippingInfo(d.country, d.displayName, d.cost));
        }}

    /**
     * Gets an object with a given objectID
     * @param objectID id of the object to search for
     * @returns an ArtObject if found
     */
    getArtObject = 

    /**
     * This function can be used if it's wanted to load objects individually, 
     * e.g. to display already loaded objects while others are still pending
     * @param objectIDs an array of objectIDs to get
     * @returns an array of Promises, each resolving in an artObject
     */
    getArtObjectPromises = 
    
    /**
     * Gets artObjects based of an array of objectIDs
     * @param objectIDs an array of objectIDs
     * @returns an ArtObject array
     */
    getArtObjects = 

    /**
     * Searches for an object via a search query
     * @param q the search query
     * @returns an array of objectIDs
     */
    search = 

    /**
     * @returns highlight object promises from highlights.json
     */
    getHighlightObjectPromises = 

    /**
     * Get query parameters of the current Url with simple string method-parameters
     * Example call: getQueryParams("q", "test")        // to get the params: q, test
     * Example return: {
     *                      q: "ValueOfQ",
     *                      test: "ValueOfTest"
     *                  }
     * Values can be null!
     * 
     * @param params one or more strings containing the names of parameters to get
     * @returns an object with the param-name as key and the param-value as its value
     */
    getQueryParams = 

}

export class ShippingInfo {
    constructor(country, displayName, cost) {
        this.country = country;
        this.displayName = displayName;
        this.cost = cost;
    }
}

export class ArtObject {
    // objectID, primaryImageSmall, artistDisplayName, title, objectDate
    
}

export const artService = new ArtService();