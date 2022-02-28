export class ShoppingCartItem {
  
  /**
   * Constructs a new shopping cart item
   * @constructor
   * @param {number} objectID The unique Object ID for an artwork object Format: 0-9 integer
   * @param {string} printSize print size type in {S, M, L}
   * @param {string} frameStyle frame style in {classic, natural, shabby, elegant}
   * @param {number} frameWidth frame width in millimeters interval [2, 5] double steps of 0.1
   * @param {number} matWidth mat width in millimeters interval [0, 10] double steps of 0.1
   * @param {string} matColor mat color in {ivory, mint, wine, indigo, coal}
   */
  constructor (objectID, printSize, frameStyle, frameWidth, matWidth, matColor) {
    this.objectID = objectID;
    this.printSize = printSize;
    this.frameStyle = frameStyle;
    this.frameWidth = frameWidth;
    this.matWidth = matWidth;
    this.matColor = matColor;
  }
}
