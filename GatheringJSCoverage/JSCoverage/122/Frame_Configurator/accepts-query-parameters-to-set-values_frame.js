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

    const w = img.naturalWidth;
    const h = img.naturalHeight;
    console.log(`natW: ${w}`);
    console.log(`natH: ${h}`);

    if (h > w)  else {
        S[1] = Math.floor(h * S[0] / w);
        M[1] = Math.floor(h * M[0] / w);
        L[1] = Math.floor(h * L[0] / w);
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
    console.log(`${printSize} *W: ${w}`);
    console.log(`${printSize} *H: ${h}`);

    console.log('frameWidth: ' + frameWidth);
    console.log('printSize: ' + printSize);
    //console.log('frameStyle: ' + frameStyle);
    console.log('matColor: ' + matColor);
    console.log('MatWidth: '+ matWidth);


    let x;
    if (w > h) {
        x = container.offsetWidth / (w + 2 * matWidth + 2 * frameWidth);
    }
    console.log(`offsetWidth: ${x}`);

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
    console.log(`IMG HEIGHT: ${img.height} for matWdth: ${matWidth}, frameWidth: ${frameWidth}, x: ${x}`);
    console.log(`IMG WIDTH: ${img.width}`);
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
 * Implement a function in frame.js to calculate the price of a particular frame configuration.
 * For small prints, each frame has a base cost of 30€, plus the wood cost per centimeter of width:
 * 1€ per centimeter for a classic frame, 80¢ for a natural frame,
 * 90¢ for a shabby frame and
 * 85¢ for an elegant frame.
 * One centimeter of mat costs 5¢. Medium prints are twice the price of small prints and
 * large prints are three-and-a-half times the price.
 *
 * @param printSize The size of the print, either 'S', 'M' or 'L'.
 * @param frameStyle The type of frame, as a string.
 * @param frameWidth The width of the frame, in millimeters.
 * @param matWidth The width of the mat, in millimeters.
 */
export function calculatePrice(printSize, frameStyle, frameWidth, matWidth) {
    let price = 30.0;

    if (frameStyle === 'classic')  else if (frameStyle === 'natural')  else if (frameStyle === 'shabby') {
        price += frameWidth/10 * 0.9;
    }

    price += matWidth/10 * 0.05;

    if (printSize === 'M') {
        price = price * 2;
    }

    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
