/**
 * Calculates the possible print sizes for an image.
 *
 * @param img An Image object. Note: if the image is not fully loaded yet, results might be unexpected.
 * @returns A dictionary with fitting sizes for small, medium and large prints.
 *          The keys are 'S', 'M' and 'L' and the entries are two-element arrays [w,h] of width and height.
 */
export function getPrintSizes(img) {
    let S = [297, 297]; // A4
    let M = [420, 420]; // A3
    let L = [594, 594]; // A2

    const width = img.naturalWidth;
    const height = img.naturalHeight;

    if (height > width)  else {
        S[1] = Math.floor(height * S[0] / width);
        M[1] = Math.floor(height * M[0] / width);
        L[1] = Math.floor(height * L[0] / width);
    }

    return { S: S, M: M, L: L };
}

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
export function render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth) {
    const printSizes = getPrintSizes(img);
    const w = printSizes[printSize][0];
    const h = printSizes[printSize][1];
    //console.log(img.naturalHeight + "|container" + container.offsetHeight + "|matColor" + matColor);

    let x;
    if (w > h) {
        x = container.offsetWidth / (w + 2 * matWidth + 2 * frameWidth);
    } else {
        x = container.offsetHeight / (h + 2 * matWidth + 2 * frameWidth);
    }
    const frameImageSlices = {
        classic: 115,
        natural: 75,
        shabby: 120,
        elegant: 107
    };

    const matColors = {
        ivory: '#fffff0',
        mint: '#e0e6d4',
        wine: '#50222d',
        indigo: '#29434c',
        coal: '#333a3d',
    };

    img.style.boxSizing = 'border-box';
    img.width = (w + 2 * matWidth + 2 * frameWidth) * x;
    img.height = (h + 2 * matWidth + 2 * frameWidth) * x;
    img.style.borderImageSource = `url(frame-styles/${frameStyle}.jpg)`;
    img.style.borderImageSlice = frameImageSlices[frameStyle];
    img.style.borderWidth = `${frameWidth * x}px`;
    img.style.backgroundColor = matColors[matColor];
    img.style.padding = `${matWidth * x}px`;
}

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
    const basePrice = 30.0;
    const matPrice = 0.005;

    let price = 0.0;
    let sizeFactor = 1.0;
    let framePrice = 0.0;

    switch (frameStyle){
        case "classic":
            framePrice = 0.10;
            break;
        
        case "shabby":
            framePrice = 0.09;
            break;
        case "elegant":
            framePrice = 0.085;
            break;
    }

    switch (printSize) {
        case "S":
            sizeFactor = 1.0;
            break;
        case "M":
            sizeFactor = 2.0;
            break;
        case "L":
            sizeFactor = 3.5;
            break;
    }

    price = (basePrice + framePrice*frameWidth + matPrice*matWidth) * sizeFactor;
    return (Math.round((price + Number.EPSILON) * 100) / 100);
}

export function round(x, n)
{
    let a = Math.pow(10, n);
    return (Math.round(x * a) / a);
}
