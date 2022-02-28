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
    /*

    Implement a function in frame.js to calculate the price of a particular frame configuration. 
    For small prints, each frame has a base cost of 30€, 
        plus the wood cost per centimeter of width: 1€ per centimeter for a classic frame, 
        80¢ for a natural frame, 
        90¢ for a shabby frame and 
        85¢ for an elegant frame. 
        One centimeter of mat costs 5¢. 
        Medium prints are twice the price of small prints and large prints are three-and-a-half times the price.
    */
    // convert to cm
    frameWidth /= 10;
    matWidth /= 10;

    //calc price for frame
    switch (frameStyle) {
        case 'classic':
            price += frameWidth * 1.0
            break;
        
        case 'shabby':
            price += frameWidth * 0.9;
            break;;
        case 'elegant':
            price += frameWidth * 0.85;
            break;;
    }

    //calc the mat
    price += matWidth * 0.05;


    switch (printSize) {
        case 'S':
            price *= 1;
            break;
        case 'M':
            price *= 2;
            break;
        case 'L':
            price *= 3.5;
            break;
    }
    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
