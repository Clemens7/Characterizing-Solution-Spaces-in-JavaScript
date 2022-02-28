import { retrieveObject, storeObject } from "./artmart-cache.js";

class ArtmartAPI {
    constructor(){
        this.metMuseumEndpoint = "https://collectionapi.metmuseum.org/public/collection/v1";
        this.artmartEndpoint = "https://web-engineering.big.tuwien.ac.at/s20/a2";
    }
    
    /**
     * @param {string} q search term
     */
    

    /**
     * @param {number} objectID object id
     */
    

    /**
     * 
     * @param {array<number>} objectIDs array of object ids
     */
    

    async getShipping(){
        try{
            const response = await this._basicRequest(`${this.artmartEndpoint}/shipping`);
            return response;
        }}

    async _basicRequest(url){
            let response = await fetch(url);
            response = await response.json();
            return response;
    }

    

}

const artmartAPI = new ArtmartAPI();
window.artmartAPI = artmartAPI;
export default artmartAPI;