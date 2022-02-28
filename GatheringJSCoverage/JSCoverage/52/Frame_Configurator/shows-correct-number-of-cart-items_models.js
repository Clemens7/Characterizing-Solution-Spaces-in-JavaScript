/**
 * @summary Artwork class, containing all information used for displaying.
 */
export class Artwork {
  /**
   *
   * @param {Number} id ObjectID of artwork
   * @param {String} title Title of artwork
   * @param {String} artist Name of the artworks artist
   * @param {String} date Date of the artwork
   * @param {String} img Img Src of the artwork
   */
  
}


/**
 * @summary Configuration class for the Frame Configurator
 */
export class FrameConfig {

  /**
   * @param {Number} objectID
   * @param {String} printSize
   * @param {String} frameStyle
   * @param {Number} frameWidth
   * @param {String} matColor
   * @param {Number} matWidth
   */
  constructor(objectID, printSize, frameStyle, frameWidth, matColor, matWidth) {
    this.objectID = objectID;
    this.printSize = printSize;
    this.frameStyle = frameStyle;
    this.frameWidth = frameWidth;
    this.matColor = matColor;
    this.matWidth = matWidth;
  }
}
