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
    async getObject(objectID){
        const retrievedObject = retrieveObject(objectID);
        
        if(retrievedObject)

        try{
            const url = `${this.metMuseumEndpoint}/objects/${objectID}`
            const response = await this._basicRequest(url);
            storeObject(response);
            return response;
        }}

    /**
     * 
     * @param {array<number>} objectIDs array of object ids
     */
    async getObjects(objectIDs){
        const response = await Promise.all(objectIDs.map(id=>this.getObject(id)));}

    

    async _basicRequest(url){
            let response = await fetch(url);
            response = await response.json();
            return response;
    }

    

}

const artmartAPI = new ArtmartAPI();
window.artmartAPI = artmartAPI;
export default artmartAPI;