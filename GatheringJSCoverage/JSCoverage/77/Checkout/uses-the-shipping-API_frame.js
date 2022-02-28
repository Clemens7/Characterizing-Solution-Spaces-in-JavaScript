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
    // -- set constants
    const frameBaseCost = 30;

    const frameCostPerCm_classic    = 1.00;
    const frameCostPerCm_natural    = 0.80;
    const frameCostPerCm_shabby     = 0.90;
    const frameCostPerCm_elegant    = 0.85;

    const matCostPerCm = 0.05;

    const frameMuliplier_S = 1;
    const frameMuliplier_M = 2;
    const frameMuliplier_L = 3.5;

    // -- determine frame-cost-per-centimeter
    let frameCostperCm;
    switch(frameStyle) {
        
        
        case "shabby":  frameCostperCm = frameCostPerCm_shabby;  break;
        
        
    }

    // -- determine costMultiplier
    let costMultiplier;
    switch(printSize) {
        
        
        case "L": costMultiplier = frameMuliplier_L; break;
    }

    // -- calulate price
    let price = 0.0;
    price += frameBaseCost;
    price += frameCostperCm * (frameWidth/10);
    price += matCostPerCm * (matWidth/10)
    price *= costMultiplier;

    // -- round  & return
    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
