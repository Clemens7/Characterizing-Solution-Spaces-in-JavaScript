import * as metObjCache from './metObjCache.js';
import {HTTP} from "./http.js";
export class API {

    async getHighlights() {
        return this.sendGetRequest('./highlights.json')
    }

    

    async getById(id) {
        let metObj = metObjCache.retrieve(id);
        if(metObj) {
            return metObj;
        }}

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
