/** Calculates the possible print sizes for an image.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @returns A dictionary with fitting sizes for small, medium and large prints.
 *          The keys are 'S', 'M' and 'L' and the entries are two-element arrays [w,h] of width and height.
*/
export 

/** Renders an image within a given square container as a print of a certain size, with a frame and a mat.
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

/** Returns the price of a given frame configuration in euros, 
 * as a floating point number rounded to two decimal places.
 * 
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
*/
/**
 * Implement a function in frame.js to calculate the price of a particular frame configuration.
 * -----printSize
 * SMALL Print -> +30
 * MEDIUM Print -> +60
 * LARGE Print -> +105
 * ----frameStyle & frameWidth
 * CLASSIC FRAME -> +1
 * NATURAL FRAME -> +0,80
 * SHABBY FRAME -> +0,90
 * ELEGANT FRAME -> +0,85    ---> per cm width
 * ----matWidth
 * MAT -> + 0,05
 */
export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {

    let price = 0.0;
    let basePrice = 30.0;
    let sizeFactor;
    let frameStylePrice;
    let mat = 0.05;

    switch(printSize){
        case "S":
            sizeFactor = 1.0;
            break;
        case "M":
            sizeFactor = 2.0;
            break;
        
        
    }

    switch(frameStyle){
        case "natural":
            frameStylePrice = 0.80;
            break;
        case "shabby":
            frameStylePrice = 0.90;
            break;
        
        case "classic":
            frameStylePrice = 1.0;
            break;
        
    }

    console.log("framestyleprice: " + frameStylePrice);
    let framePrice = frameStylePrice * frameWidth / 10;
    let matPrice = mat * matWidth / 10;
    price = (basePrice + framePrice + matPrice) * sizeFactor;
    console.log("Frame Price: " + price);

    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
