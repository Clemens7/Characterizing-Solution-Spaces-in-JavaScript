import * as Frame from './frame.js';
import * as Cache from './picture-storage.js';
/**
 * Default values of the customizable values in the frame configurator.
 */
let objectQuery;
let printSizeQuery = "M";
let frameStyleQuery = "natural";
let frameWidthQuery = 40;
let matColorQuery = "mint";
let matWidthQuery = 55;

/**
 * Selector for each radio button section to add eventlistener.
 */
const printSizeRadios = document.querySelectorAll('input[type=radio][name="printSize"]');
const frameStyleRadios = document.querySelectorAll('input[type=radio][name="frameStyle"]');
const matColorRadios = document.querySelectorAll('input[type=radio][name="matColor"]');

/**
 * Set the object ID of a image in the frame configurator.
 *
 * @param objectID Id of the object.
 */
export function setObjectID(objectID){
    objectQuery = parseInt(objectID);
}

/**
 * Set the print size of a image in the frame configurator.
 *
 * @param printSize Type of the print.
 */
export function setPrintSize(printSize){
    printSizeQuery = printSize.toUpperCase();
    printSize = printSize.toLowerCase();
    const element = document.getElementById("print-size-"+printSize);
    if(typeof(element) != 'undefined' && element != null) {
        document.getElementById("print-size-"+printSize).checked = true;
    }
}

/**
 * Set the frame style of a image in the frame configurator.
 *
 * @param frameStyle Type of frame to be used.
 */
export function setFrameStyle(frameStyle){
    frameStyle = frameStyle.toLowerCase();
    frameStyleQuery = frameStyle;
    const element = document.getElementById("frame-style-"+frameStyle);
    if(typeof(element) != 'undefined' && element != null){
        document.getElementById("frame-style-"+frameStyle).checked = true;
    }
}

/**
 * Set the frame width of a image in the frame configurator.
 *
 * @param frameWidth Number of the frame width in mm.
 */
export function setFrameWidth(frameWidth){
    // Parse string to number, truncate to 1 decimal and parse back to number
    frameWidth = parseFloat(frameWidth);
    frameWidth = parseFloat(frameWidth.toFixed(1));
    if(frameWidth < 20) 
    if(frameWidth > 50) 
    frameWidthQuery = frameWidth;
    if(frameWidth >= 20 && frameWidth <= 50) {
        document.getElementById("frameWidth").value = frameWidth/10;
        document.getElementById("frameWidthR").value = frameWidth/10;
    }
}

/**
 * Set the color of a image in the frame configurator.
 *
 * @param matColor Color to be used for the configuration.
 */
export function setMatColor(matColor){
    matColor = matColor.toLowerCase();
    matColorQuery = matColor;
    const element = document.getElementById("mat-color-"+matColor);
    if(typeof(element) != 'undefined' && element != null){
        document.getElementById("mat-color-"+matColor).checked = true;
    }
}

/**
 * Set the mat width of a image in the frame configurator.
 *
 * @param matWidth Number of the mat width to be used in mm.
 */
export function setMatWidth(matWidth){
    // Parse string to number, truncate to 1 decimal and parse back to number
    matWidth = parseFloat(matWidth);
    matWidth = parseFloat(matWidth.toFixed(1));
    if(matWidth < 0) 
    if(matWidth > 100) 
    matWidthQuery = matWidth;
    if(matWidth >= 0 && matWidth <= 100) {
        document.getElementById("matWidth").value = matWidth/10;
        document.getElementById("matWidthR").value = matWidth/10;
    }
}

/**
 * Connect sliders with their corresponding value field
 */
const frameWidthField = document.getElementById("frameWidth");
const frameWidthSlider = document.getElementById("frameWidthR");
const matWidthField = document.getElementById("matWidth");
const matWidthSlider = document.getElementById("matWidthR");

frameWidthField.addEventListener('change', );

frameWidthSlider.addEventListener('input', );

matWidthField.addEventListener('change', );

matWidthSlider.addEventListener('input', );

/**
 * Add an event listener to all radio buttons for print size.
 */
printSizeRadios.forEach(radio => radio.addEventListener('change', ));

/**
 * Store new print size and render image new.
 *
 * @param newValue Changed value of radio button group.
 */

/**
 * Add an event listener to all radio buttons for frame style.
 */
frameStyleRadios.forEach(radio => radio.addEventListener('change', ));

/**
 * Store new frame style and render image new.
 *
 * @param newValue Changed value of radio button group.
 */


/**
 * Add an event listener to all radio buttons for mat color
 */
matColorRadios.forEach(radio => radio.addEventListener('change', ));

/**
 * Store new mat color and render image new.
 *
 * @param newValue Changed value of radio button group.
 */


export function renderPreview(){
    if(document.getElementById('preview-image') != null) {
        Frame.render(document.getElementById('preview-image'), document.getElementById('preview-container'), printSizeQuery, frameStyleQuery, frameWidthQuery, matColorQuery, matWidthQuery);
    }
}


/**
 * Calculate and write the new sizes for each print size of an image
 */
export function calcPrintSizes(){
    const printSizes = Frame.getPrintSizes(document.getElementById('preview-image'));
    document.getElementById('print-size-s-label').innerHTML = "Small <br>" + (printSizes['S'][0])/10 + " x " + (printSizes['S'][1])/10 + " cm";
    document.getElementById('print-size-m-label').innerHTML = "Medium <br>" + (printSizes['M'][0])/10 +" x " + (printSizes['M'][1])/10 + " cm";
    document.getElementById('print-size-l-label').innerHTML = "Large <br>" + (printSizes['L'][0])/10 +" x " + (printSizes['L'][1])/10+ "cm";
}

export function setTotalSize() {
    const printSizes = Frame.getPrintSizes(document.getElementById('preview-image'));
    document.getElementById('total-size').innerText = (Math.round(((printSizes[printSizeQuery][0]) / 10 + frameWidthQuery / 10 + matWidthQuery / 10) * 10) / 10) + " x " + (Math.round(((printSizes[printSizeQuery][1]) / 10 + frameWidthQuery / 10 + matWidthQuery / 10) * 10) / 10) + " cm";
}

export function setPrice() {
   document.getElementById('price').innerText = "€ " + Frame.calculatePrice(printSizeQuery, frameStyleQuery, frameWidthQuery, matWidthQuery).toFixed(2);
}

/**
 * Store a new frame configuration in the cart 
 * 
 */

export 
