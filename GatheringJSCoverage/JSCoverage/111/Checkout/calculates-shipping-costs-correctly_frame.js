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
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 */
export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 30.0 + 0.005 * matWidth;

    switch (frameStyle) {
        case 'classic': price += 0.1 * frameWidth; break;
        case 'natural': price += 0.08 * frameWidth; break;
        
        
    }

    switch (printSize) {
        
        case 'M': price *= 2; break;
        case 'L': price *= 3.5; break;
    }

    return (Math.round((price + Number.EPSILON) * 100) / 100);
}

/**
 * Returns the total price of a given cart, rounded to two digits.
 *
 * @param cartItems The cart to be calculated.
 * @returns {string} Cart total as a string.
 */
export 

/**
 * Returns a textual description of a frame.
 *
 * @param cartItem The item which has a frame.
 * @returns {string} The textual description.
 */
export 
