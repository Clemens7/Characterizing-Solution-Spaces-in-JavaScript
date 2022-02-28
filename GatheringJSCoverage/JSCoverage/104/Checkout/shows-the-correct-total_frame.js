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

const price_classic = 100;
const price_natural = 80;
const price_shabby = 90;
const price_elegant = 85;
const price_mat = 5;

const base_small = 3000;
const base_medium = 2 * base_small;
const base_large = 3.5 * base_small;

/**
 * Returns the price of a given frame configuration in euros, 
 * as a floating point number rounded to two decimal places.
 * 
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeter.
 * @param matWidth The width of the mat, in millimeter.
 * @param shipping Shippingcosts in Eurocents.
 * @returns price in Euro.
 */
export function calculatePrice (printSize, frameStyle, frameWidth, matWidth) {
    let price = 0.00; //price of a small print
    let matPrice = 0.05 * (matWidth/10);

    let woodPrice = 1.00; //price of a classic frame per centimeter;

    if (frameStyle === "shabby") {
        woodPrice = 0.90;
    } else if (frameStyle === "elegant")  else if (frameStyle === "natural") {
        woodPrice = 0.80;
    }
    woodPrice *= frameWidth/10;

    price += (30 + woodPrice + matPrice); //price for a small size

    if (printSize === 'M') {
        price *= 2.00;
    } else if (printSize === 'L') 

    return 1*(Math.round((price + Number.EPSILON) * 100) / 100);
}
