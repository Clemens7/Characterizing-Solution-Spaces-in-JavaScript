import { render, getPrintSizes, calculatePrice } from './frame.js';

const PRINT_SIZE_LITERAL = 'printSize';
const FRAME_STYLE_LITERAL = 'frameStyle';
const MAT_COLOR_LITERAL = 'matColor';
const MAT_WIDTH_LITERAL = 'matWidth';
const FRAME_WIDTH_LITERAL = 'frameWidth';



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

document.getElementById('preview-image').addEventListener('load', );
