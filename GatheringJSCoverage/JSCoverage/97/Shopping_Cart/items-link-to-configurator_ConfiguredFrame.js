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
    
    get id() {
        return this._id;
    }
    get objectID() {
        return this._objectID;
    }
    get printSize() {
        return this._printSize;
    }
    get frameStyle() {
        return this._frameStyle;
    }
    get frameWidth() {
        return this._frameWidth;
    }
    get matColor() {
        return this._matColor;
    }
    get matWidth() {
        return this._matWidth;
    }
    static createFromPlainObject(frame) {
        // Plain object is expected to contain all required properties in the right types.
        return new ConfiguredFrame(frame.id, frame.objectID, frame.printSize, frame.frameStyle, frame.frameWidth, frame.matColor, frame.matWidth);
    }
    getFrameDescription() {
        let frameDescription = `${this.getVerbosePrintSize()} print in a ${this.frameWidth / 10} cm ${this.frameStyle} frame`;
        if (this.matWidth === 0) 
        else {
            return frameDescription + ` with a ${this.matWidth / 10} cm ${this.matColor} mat.`;
        }
    }
    getVerbosePrintSize() {
        let verbosePrintSize = null;
        switch (this.printSize) {
            case 'S':
                verbosePrintSize = 'Small';
                break;
            case 'M':
                verbosePrintSize = 'Medium';
                break;
            case 'L':
                verbosePrintSize = 'Large';
                break;
        }
        return verbosePrintSize;
    }
    /**
     * Generate a configurator URl which includes all configuration paramters
     * @returns the url to the configurator page
     */
    getConfiguratorURL() {
        return `config.html?id=${this.id}&objectID=${this.objectID}&printSize=${this.printSize}&frameStyle=${this.frameStyle}&frameWidth=${this.frameWidth}&matColor=${this.matColor}&matWidth=${this.matWidth}`;
    }
    // noinspection JSUnusedGlobalSymbols TS 13.04.2020: This is used by JSON.stringify.
    /**
     * Overwrite toJSON().
     * This needs to be done to remove the underscore prefixes from field names;
     */
    
}
