import { retrieveObject, storeObject } from "./artmart-cache.js";

class ArtmartAPI {
    constructor(){
        this.metMuseumEndpoint = "https://collectionapi.metmuseum.org/public/collection/v1";
        this.artmartEndpoint = "https://web-engineering.big.tuwien.ac.at/s20/a2";
    }
    
    /**
     * @param {string} q search term
     */
    async search(q){
        try{
            const response = this._basicRequest(`${this.metMuseumEndpoint}/search?q=${q}&hasImages=true`);
            return response;
        }}

    /**
     * @param {number} objectID object id
     */
    

    /**
     * 
     * @param {array<number>} objectIDs array of object ids
     */
    

    

    async _basicRequest(url){
            let response = await fetch(url);}

    

}

const artmartAPI = new ArtmartAPI();
window.artmartAPI = artmartAPI;
export default artmartAPI;