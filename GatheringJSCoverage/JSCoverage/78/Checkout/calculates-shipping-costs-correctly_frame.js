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

export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    const sizeFactor = {
        'S': 1,
        'M': 2,
        'L': 3.5
    };
    const baseCost = {
        'classic': 1,
        'natural': 0.8,
        'shabby': 0.9,
        'elegant': 0.85,
    };
    
    return Math.round((((baseCost[frameStyle] * (frameWidth / 10) + 0.05 * (matWidth / 10) + 30) * sizeFactor[printSize]) ) * 100) / 100;
}
