import * as Frame from "./frame.js";

export function setImage(parameters) {
    const printSize = parameters.printSize;
    const frameStyle = parameters.frameStyle;
    const frameWidth = parameters.frameWidth;
    const matColor = parameters.matColor;
    const matWidth = parameters.matWidth;
    const image_link = parameters.image;

    var paintingcontainer = document.getElementById("preview-container");
    try {
        var img = document.getElementById("preview-image");
        img.src = image_link;
        Frame.render(img, paintingcontainer, printSize, frameStyle, frameWidth, matColor, matWidth);
    } 

}

export function setPrintSize(printSize) {
    document.getElementById(`print-size-${printSize.toLowerCase()}`).checked = true;
}

export function setFrameStyle(frameStyle) {
    document.getElementById(`frame-style-${frameStyle.toLowerCase()}`).click();
}

export function setPrintMeasurements(img) {
    let sizes = Frame.getPrintSizes(img);
    document.getElementById('print-size-s-label').innerHTML = `Small<br>${sizes.S[0]} × ${sizes.S[1]} cm`;
    document.getElementById('print-size-m-label').innerHTML = `Medium<br>${sizes.M[0]} × ${sizes.M[1]} cm`;
    document.getElementById('print-size-l-label').innerHTML = `Large<br>${sizes.L[0]} × ${sizes.L[1]} cm`;
}

export function setFrameWidth(width) {
    width = Math.round((width*10))/10;
    width = Math.max(2, width);
    width = Math.min(5, width);
    document.getElementById('frame-width-number').value = width;
    document.getElementById('frame-width-range').value = width;
}

export function setMatColor(matColor) {
    document.getElementById(`mat-color-${matColor.toLowerCase()}`).checked = true;
}

export function setMatWidth(width) {
    width = Math.round((width*10))/10;
    width = Math.max(0, width);
    width = Math.min(10, width);
    document.getElementById('mat-width-number').value = width;
    document.getElementById('mat-width-range').value = width;
}

