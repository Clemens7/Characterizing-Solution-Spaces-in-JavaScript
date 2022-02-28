export class Configuration {
    constructor(objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
        // The object id of the configured artwork
        this.objectID = objectID;

        // The size of the print, either 'S', 'M' or 'L'
        this.printSize = printSize;

        // The type of frame, as a string
        this.frameStyle = frameStyle;

        // The width of the frame, in millimeters
        this.frameWidth = frameWidth;

        // The color of the mat, as a string
        this.matColor = matColor;

        // The width of the mat, in millimeters
        this.matWidth = matWidth;
    }

    
}