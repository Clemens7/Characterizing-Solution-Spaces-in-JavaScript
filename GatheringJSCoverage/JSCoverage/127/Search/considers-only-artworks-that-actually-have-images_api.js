import * as metObjCache from './metObjCache.js';
import {HTTP} from "./http.js";
export class API {

    

    async searchByValue(value) {
        return this.sendGetRequest(`https://collectionapi.metmuseum.org/public/collection/v1/search${value}&hasImages=true`)
    }

    

    sendGetRequest(url) {
        return new Promise(function (resolve) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = ;
            xhr.send();
        });
    }
}
