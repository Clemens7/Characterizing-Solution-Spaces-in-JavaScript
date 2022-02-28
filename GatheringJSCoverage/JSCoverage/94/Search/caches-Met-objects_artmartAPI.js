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
    async getObject(objectID){
        const retrievedObject = retrieveObject(objectID);
        
        if(retrievedObject){
            return retrievedObject;
        }}

    /**
     * 
     * @param {array<number>} objectIDs array of object ids
     */
    

    

    async _basicRequest(url){
            let response = await fetch(url);
            response = await response.json();
            return response;
    }

    

}

const artmartAPI = new ArtmartAPI();
window.artmartAPI = artmartAPI;
export default artmartAPI;