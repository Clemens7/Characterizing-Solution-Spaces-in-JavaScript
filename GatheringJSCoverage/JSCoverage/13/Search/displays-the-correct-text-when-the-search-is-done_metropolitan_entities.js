import { Serializable } from "./frame.js";
export class MetropolitanObject extends Serializable {
    
    
    
    
    
    
    
}
export class MetropolitanSearchResponseObject extends Serializable {
    constructor() {
        super(...arguments);
        this._total = null;
        this._objectIDs = null;
    }
    
    get objectIDs() {
        return this._objectIDs;
    }
}
