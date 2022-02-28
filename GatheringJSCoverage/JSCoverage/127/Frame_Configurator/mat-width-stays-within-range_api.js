import * as metObjCache from './metObjCache.js';
import {HTTP} from "./http.js";
export class API {

    

    

    async getById(id) {
        let metObj = metObjCache.retrieve(id);
        if(metObj) 
        const response = await this.sendGetRequest(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
        if (response.status !== HTTP.OK) 
        metObjCache.store(id, response.body);
        return response.body;
    }

    sendGetRequest(url) {
        return new Promise(function (resolve) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => resolve({
                status: xhr.status,
                body: JSON.parse(xhr.response)
            });
            xhr.send();
        });
    }
}
