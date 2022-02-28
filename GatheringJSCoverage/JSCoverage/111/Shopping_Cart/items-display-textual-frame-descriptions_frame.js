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

    if (h > w) {
        S[0] = Math.floor(w * S[1] / h);
        M[0] = Math.floor(w * M[1] / h);
        L[0] = Math.floor(w * L[1] / h);
    } else {
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
    let price = 30.0 + 0.005 * matWidth;

    switch (frameStyle) {
        case 'classic': price += 0.1 * frameWidth; break;
        
        case 'shabby': price += 0.09 * frameWidth; break;
        
    }

    switch (printSize) {
        case 'S': price *= 1; break;
        
        case 'L': price *= 3.5; break;
    }

    return (Math.round((price + Number.EPSILON) * 100) / 100);
}

/**
 * Returns the total price of a given cart, rounded to two digits.
 *
 * @param cartItems The cart to be calculated.
 * @returns {string} Cart total as a string.
 */
export function calculateCartPrice(cartItems) {
    let total = 0;

    for (let item of cartItems) {
        total += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }

    return total.toFixed(2);
}

/**
 * Returns a textual description of a frame.
 *
 * @param cartItem The item which has a frame.
 * @returns {string} The textual description.
 */
export function describeFrame(cartItem) {

    let description = "";

    switch (cartItem.printSize) {
        case 'S': description = "Small print "; break;
        
        case 'L': description = "Large print "; break;
    }

    description += `in a ${cartItem.frameWidth/10} cm ${cartItem.frameStyle} frame`;

    if (cartItem.matWidth != 0) {
        description += ` with a ${cartItem.matWidth/10} cm ${cartItem.matColor} mat`;
    }

    description += ".";

    return description;
}
