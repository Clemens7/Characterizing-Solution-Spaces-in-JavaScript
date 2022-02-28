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
 * @param {string} printSize The size of the print, either 'S', 'M' or 'L'.
 * @param {string} frameStyle The type of frame, as a string.
 * @param {number} frameWidth The width of the frame, in millimeters.
 * @param {number} matWidth The width of the mat, in millimeters.
 * @returns {number} price as floating point number depending on arguments
 */
export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    const basePriceSmallPrint = 30.0; // For small prints, each frame has a base cost of 30 euro
    const baseMatCosts = 0.05; // One centimeter of mat costs 5 cents
    // frame wood costs per centimer depends on frame style:
    const baseFrameCosts = {'classic': 1, 'natural': 0.8, 'shabby': 0.9, 'elegant': 0.85};
    // Medium prints are twice the price of small prints, large prints are three-and-a-half times the price
    const printSizeMultiFactor = {'S': 1, 'M': 2, 'L': 3.5}; 

    const frameCosts = baseFrameCosts[frameStyle] * frameWidth / 10;
    const matCosts = baseMatCosts * matWidth / 10;
    const price = (basePriceSmallPrint + frameCosts + matCosts) * printSizeMultiFactor[printSize];

    return Math.round((price + Number.EPSILON) * 100) / 100;
}

export 