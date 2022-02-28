import { Serializable } from "./frame.js";
export class Destination extends Serializable {
    constructor() {
        super(...arguments);
        this._objectID = null;
        this._country = null;
        this._displayName = null;
        this._cost = null;
    }
    
    get country() {
        return this._country;
    }
    get displayName() {
        return this._displayName;
    }
    
}
