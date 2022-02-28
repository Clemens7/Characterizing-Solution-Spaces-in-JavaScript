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
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.https://tuwel.tuwien.ac.at/mod/forum/discuss.php?d=170557
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 */
export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let sizeFactor;
    switch (printSize) {
        case 'S':
            sizeFactor = 1;
            break;
        case 'M':
            sizeFactor = 2;
            break;
        
    }
    let woodFactor;
    switch (frameStyle) {
        case 'classic':
            woodFactor = 1;
            break;
        case 'natural':
            woodFactor = 0.8;
            break;
        case 'shabby':
            woodFactor = 0.9;
            break;
        
    }
    let price = sizeFactor * (30 + woodFactor * (frameWidth/10) + (matWidth/10) * 0.05);
    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
