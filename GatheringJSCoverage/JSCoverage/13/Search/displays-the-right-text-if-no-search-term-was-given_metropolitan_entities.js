import { Serializable } from "./frame.js";
export class MetropolitanObject extends Serializable {
    constructor() {
        super(...arguments);
        this._objectID = null;
        this._title = null;
        this._artistDisplayName = null;
        this._objectDate = null;
        this._primaryImageSmall = null;
        this._message = null;
    }
    
    
    
    
    
    
}
export class MetropolitanSearchResponseObject extends Serializable {
    
    
    
}
