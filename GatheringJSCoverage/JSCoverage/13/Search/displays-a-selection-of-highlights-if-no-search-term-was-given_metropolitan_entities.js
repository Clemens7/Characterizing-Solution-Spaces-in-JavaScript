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
    get objectID() {
        return this._objectID;
    }
    get title() {
        return this._title;
    }
    get artist() {
        return this._artistDisplayName;
    }
    get date() {
        return this._objectDate;
    }
    get image() {
        return this._primaryImageSmall;
    }
    
}
export class MetropolitanSearchResponseObject extends Serializable {
    
    
    
}
