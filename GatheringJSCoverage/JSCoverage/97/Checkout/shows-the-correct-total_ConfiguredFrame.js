export class ConfiguredFrame {
    constructor(id, objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
        this._id = id;
        this._objectID = objectID;
        this._printSize = printSize;
        this._frameStyle = frameStyle;
        this._frameWidth = frameWidth;
        this._matColor = matColor;
        this._matWidth = matWidth;
    }
    
    
    
    
    
    
    
    
    static createFromPlainObject(frame) {
        // Plain object is expected to contain all required properties in the right types.
        return new ConfiguredFrame(frame.id, frame.objectID, frame.printSize, frame.frameStyle, frame.frameWidth, frame.matColor, frame.matWidth);
    }
    
    
    /**
     * Generate a configurator URl which includes all configuration paramters
     * @returns the url to the configurator page
     */
    
    // noinspection JSUnusedGlobalSymbols TS 13.04.2020: This is used by JSON.stringify.
    /**
     * Overwrite toJSON().
     * This needs to be done to remove the underscore prefixes from field names;
     */
    
}
