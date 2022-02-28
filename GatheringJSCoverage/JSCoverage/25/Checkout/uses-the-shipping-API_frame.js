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

const frameSizeCosts = {
    S: 1,
    M: 2,
    L: 3.5
};
const frameStyleCosts = {
    classic: 1,
    natural: 0.8,
    shabby: 0.9,
    elegant: 0.85
};
/**
 * Returns the price of a given frame configuration in euros, 
 * as a floating point number rounded to two decimal places.
 * 
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 */
export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 0.0;
    const matPrice = 0.05; //5c
    if (!["S", "M", "L"].includes(printSize) || !["classic", "natural", "shabby", "elegant"].includes(frameStyle)
    || frameWidth < 20 || frameWidth > 50 || matWidth < 0 || matWidth > 100) 
    price = (30 + (frameWidth/10.0) * frameStyleCosts[frameStyle] + (matWidth/10.0) * matPrice) * frameSizeCosts[printSize];
    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
