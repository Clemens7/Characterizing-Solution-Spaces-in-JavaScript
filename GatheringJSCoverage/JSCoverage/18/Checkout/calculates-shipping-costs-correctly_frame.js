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
    let price = 0.0;

    var frameCMWidth = frameWidth/10;
    var matCMWidth = matWidth/10;

    let baseS = 30.00;

    let small = 30.00;
    let medium = 2;
    let large = 3.5;

    // in cents
    let woodPerCentimeterClassic = 1.00;
    let woodPerCentimeterNatural = 0.80;
    let woodPerCentimeterShabby = 0.90;
    let woodPerCentimeterElegant= 0.85;

    let matPerCentimeter = 0.05;


    price = small+(matCMWidth*matPerCentimeter);
        if(frameStyle === "classic"){
            price += (frameCMWidth*woodPerCentimeterClassic);
        }
        else if(frameStyle === "natural"){
            price += (frameCMWidth*woodPerCentimeterNatural);
        }
    
        if(printSize === "M"){
            price *= medium;
        }
        else if(printSize === "L"){
            price *= large;
        }
    
    const result =  (Math.round((price + Number.EPSILON) * 100) / 100);
    return result;
}

