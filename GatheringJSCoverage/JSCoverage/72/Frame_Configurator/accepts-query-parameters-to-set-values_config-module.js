import { render, getPrintSizes, calculatePrice } from './frame.js';

const PRINT_SIZE_LITERAL = 'printSize';
const FRAME_STYLE_LITERAL = 'frameStyle';
const MAT_COLOR_LITERAL = 'matColor';
const MAT_WIDTH_LITERAL = 'matWidth';
const FRAME_WIDTH_LITERAL = 'frameWidth';

function changeTriggered() {

    let printSize;
    document.getElementsByName(PRINT_SIZE_LITERAL).forEach(e => {
        if (e.checked) {
            printSize = e.value;
        }
    });
    let frameStyle;
    document.getElementsByName(FRAME_STYLE_LITERAL).forEach(e => {
        if (e.checked) {
            frameStyle = e.value;
        }
    });
    let matColor;
    document.getElementsByName(MAT_COLOR_LITERAL).forEach(e => {
        if (e.checked) {
            matColor = e.value;
        }
    });
    const matWidth = document.getElementById(MAT_WIDTH_LITERAL).value;
    const frameWidth = document.getElementById(FRAME_WIDTH_LITERAL).value;

    const img = document.getElementById('preview-image');
    const imageContainer = document.getElementById('preview-container');
    render(img, imageContainer, printSize, frameStyle, frameWidth * 10, matColor, matWidth * 10);

    const printSizes = getPrintSizes(img);
    document.getElementById('print-size-s-label').innerHTML = `Small<br>${printSizes['S'][0]} x ${printSizes['S'][1]} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${printSizes['M'][0]} x ${printSizes['M'][1]} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${printSizes['L'][0]} x ${printSizes['L'][1]} cm`;

    const totalBorderWidth = 2 * (+frameWidth + +matWidth);
    document.getElementById('total-size').innerHTML = `Large <br> ${printSizes[printSize][0] + totalBorderWidth} x ${printSizes[printSize][1] + totalBorderWidth} cm`;
    document.getElementById('price').innerHTML = `€ ${calculatePrice(printSize, frameStyle, frameWidth * 10, matWidth * 10).toFixed(2)}`
}

let printSizeItems = document.getElementsByName(PRINT_SIZE_LITERAL);
printSizeItems.forEach(e => e.addEventListener('change', ));
let frameStyleItems = document.getElementsByName(FRAME_STYLE_LITERAL);
frameStyleItems.forEach(e => e.addEventListener('change', ));
let matColorItems = document.getElementsByName(MAT_COLOR_LITERAL);
matColorItems.forEach(e => e.addEventListener('change', ));
document.getElementById(MAT_WIDTH_LITERAL).addEventListener('change', );
document.getElementById(`${MAT_WIDTH_LITERAL}R`).addEventListener('change', );
document.getElementById(FRAME_WIDTH_LITERAL).addEventListener('change', );
document.getElementById(`${FRAME_WIDTH_LITERAL}R`).addEventListener('change', );

document.getElementById('preview-image').addEventListener('load', e => changeTriggered());
