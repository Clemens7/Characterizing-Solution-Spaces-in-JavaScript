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


export 
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

    function getFrameStyle(frameStyle) {
        const wcClassic = 1.0;
        const wcNatural = 0.80;
        const wcShabby = 0.90;
        const wcElegant = 0.85;

        switch (frameStyle) {
            case 'natural':
                return wcNatural;
            case 'classic':
                return wcClassic;
            case 'shabby':
                return wcShabby;
            
            
        }

    }

    const baseCost = 30.0;
    const matCost = 0.05;
    const style = getFrameStyle(frameStyle);
    let price = 0.0;
    if (style) {
        switch (printSize) {
            case 'S':
                price = baseCost + frameWidth * style + (matCost ? matCost * matWidth );
                break;
            case 'M':
                price = 2 * (baseCost + frameWidth * style + (matCost ? matCost * matWidth ));
                break;
            
            

        }
    }
    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
