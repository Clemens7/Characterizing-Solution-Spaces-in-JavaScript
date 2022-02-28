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
 * @param changeDom true if dom should be changed
 */
export function render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth, changeDom) {
    const printSizes = getPrintSizes(img);

    const w = printSizes[printSize][0];
    const h = printSizes[printSize][1];
    let x;
    if (w > h)  else {
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
    if(changeDom === true){
        document.getElementById("print-size-s-label").innerText = "Small \n"+ printSizes.S[1] + " x " +printSizes.S[0];
        document.getElementById("print-size-m-label").innerText = "Medium \n"+ printSizes.M[1] + " x " +printSizes.M[0];
        document.getElementById("print-size-l-label").innerText = "Large \n"+ printSizes.L[1] + " x " +printSizes.L[0];
        document.getElementById("total-size").innerText = printSizes[printSize][1] + frameWidth / 2 + matWidth / 2 + " x " + (printSizes[printSize][0] + frameWidth / 2 + matWidth / 2);
        document.getElementById("price").innerText = "€ " + calculatePrice(printSize,frameStyle,frameWidth,matWidth).toFixed(2);
    }

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
    let price = 30;
    if(frameStyle === 'classic')else if(frameStyle ==='natural'){
        price += frameWidth*0.8;
    }
    price += matWidth*0.05;
    if(printSize === 'M'){
        price = price*2;
    }
    // TODO: implement this function
    price = Math.round(price*100) / 100;
    return parseFloat(price.toFixed(2));
}
