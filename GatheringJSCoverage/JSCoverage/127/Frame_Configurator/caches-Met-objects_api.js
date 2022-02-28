import * as metObjCache from './metObjCache.js';
import {HTTP} from "./http.js";
export class API {

    

    

    async getById(id) {
        let metObj = metObjCache.retrieve(id);
        if(metObj) {
            return metObj;
        }}

    
}
