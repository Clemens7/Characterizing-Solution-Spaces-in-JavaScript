export class Serializable {
    
}
export var PrintSize;
(function (PrintSize) {
    PrintSize["S"] = "S";
    PrintSize["M"] = "M";
    PrintSize["L"] = "L";
})(PrintSize || (PrintSize = {}));
export var FrameStyle;
(function (FrameStyle) {
    FrameStyle["classic"] = "classic";
    FrameStyle["natural"] = "natural";
    FrameStyle["shabby"] = "shabby";
    FrameStyle["elegant"] = "elegant";
})(FrameStyle || (FrameStyle = {}));
export var MatColor;
(function (MatColor) {
    MatColor["ivory"] = "ivory";
    MatColor["mint"] = "mint";
    MatColor["wine"] = "wine";
    MatColor["indigo"] = "ingigo";
    MatColor["coal"] = "coal";
})(MatColor || (MatColor = {}));
[];
[];
export class FrameConfiguration extends Serializable {
    
    
    
    
    
    
    
    
    
}
/**
 * Calculates the possible print sizes for an image.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @returns A dictionary with fitting sizes for small, medium and large prints.
 *          The keys are 'S', 'M' and 'L' and the entries are two-element arrays [w,h] of width and height.
 */
export 
/**
 * Renders an image within a given square container as a print of a certain size, with a frame and a mat.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @param container The object that contains the Image.
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matColor The color of the mat, as a string.
 * @param matWidth The width of the mat, in millimeters.
 */
export 
/**
 * Returns the price of a given frame configuration in euros,
 * as a floating point number rounded to two decimal places.
 *
 * For small prints, each frame has a base cost of 30€, plus
 * the wood cost per centimeter of width: 1€ per centimeter for
 * a classic frame, 80¢ for a natural frame, 90¢ for a shabby
 * frame and 85¢ for an elegant frame. One centimeter of mat
 * costs 5¢. Medium prints are twice the price of small prints
 * and large prints are three-and-a-half times the price.
 *
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 */
export 
