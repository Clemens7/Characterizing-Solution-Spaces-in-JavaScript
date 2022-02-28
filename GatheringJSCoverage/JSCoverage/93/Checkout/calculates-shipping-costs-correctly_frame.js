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
    let price = 30.0;
    if (frameStyle === 'classic'){
        price += frameWidth/10;
    }else if (frameStyle === 'natural'){
        price += frameWidth/10*0.8;
    }
    price += matWidth/10*0.05;
    if (printSize === 'M'){
        price *=2;
    }else if (printSize === 'L'){
        price *=3.5;
    }
    return Math.round((price + Number.EPSILON) * 100)/100;
}

/**
 *
 * @param printSizes array with sizes in cm of the different types [S,M,L]
 * @param printSize current size chosen in the configurator [S,M,L]
 * @param frameWidth current frameWidth selected
 * @param matWidth current matWidth selected
 * @returns number[] two-element arrays [w,h] of total width and total height
 */
export 
