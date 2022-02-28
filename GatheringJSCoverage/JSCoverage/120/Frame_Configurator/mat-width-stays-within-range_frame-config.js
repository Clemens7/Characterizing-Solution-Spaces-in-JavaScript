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
export 

/**
 * Set the frame style of a image in the frame configurator.
 *
 * @param frameStyle Type of frame to be used.
 */
export 

/**
 * Set the frame width of a image in the frame configurator.
 *
 * @param frameWidth Number of the frame width in mm.
 */
export 

/**
 * Set the color of a image in the frame configurator.
 *
 * @param matColor Color to be used for the configuration.
 */
export 

/**
 * Set the mat width of a image in the frame configurator.
 *
 * @param matWidth Number of the mat width to be used in mm.
 */
export 

/**
 * Connect sliders with their corresponding value field
 */
const frameWidthField = document.getElementById("frameWidth");
const frameWidthSlider = document.getElementById("frameWidthR");
const matWidthField = document.getElementById("matWidth");
const matWidthSlider = document.getElementById("matWidthR");

frameWidthField.addEventListener('change', );

frameWidthSlider.addEventListener('input', );

matWidthField.addEventListener('change', function() {
    let matWidth = matWidthField.value;
    if(matWidth < 0) matWidth = 0;
    if(matWidth > 10) matWidth = 10;
    matWidth = parseFloat(matWidth);
    matWidth = parseFloat(matWidth.toFixed(1));
    document.getElementById("matWidthR").value = matWidth;
    document.getElementById("matWidth").value = matWidth;
    matWidthQuery = matWidth*10;
    setTotalSize();
    setPrice();
    renderPreview();
});

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
