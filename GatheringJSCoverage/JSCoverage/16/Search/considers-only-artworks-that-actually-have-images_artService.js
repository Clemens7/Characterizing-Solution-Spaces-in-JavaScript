import { cache } from "./cache.js";

class ArtService {

    constructor() {
        this.museumUrl = "https://collectionapi.metmuseum.org/public/collection/v1";
        this.shippingUrl = "https://web-engineering.big.tuwien.ac.at/s20/a2";
    }

    /**
     * @returns an array of ShippingInfo objects
     */
    getShipping = 

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
    search = async function (q) {
        const endpoint = "/search";
        const params = `?hasImages=true&q=${q}`;

        try {
            const response = await fetch(this.museumUrl + endpoint + params);;
        }}

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
    getQueryParams = function (...params) {
        const searchParams = (new URL(document.location)).searchParams;
        let paramObject = {};
        for (let param of params) {
            const queryItem = searchParams.get(param);
            paramObject[param] = queryItem;
        }
        return paramObject;
    }

}

export class ShippingInfo {
    
}

export class ArtObject {
    // objectID, primaryImageSmall, artistDisplayName, title, objectDate
    
}

export const artService = new ArtService();