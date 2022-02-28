function  refreshConfig() {

    document.getElementById("frame-style-natural").onchange = ;

    document.getElementById("frame-style-elegant").onchange = ;

    document.getElementById("frame-style-shabby").onchange = ;

    document.getElementById("frame-style-classic").onchange = ;

    document.getElementById("mat-color-indigo").onchange = ;

    document.getElementById("mat-color-ivory").onchange = ;

    document.getElementById("mat-color-mint").onchange = ;

    document.getElementById("mat-color-wine").onchange = ;

    document.getElementById("mat-color-coal").onchange = ;

    document.getElementById("print-size-s").onchange = ;


    document.getElementById("print-size-m").onchange = ;

    document.getElementById("print-size-l").onchange = ;

}


/**
 * this function calcs the size of an image exkl. frame and mat.
 */
function calc_size_image() {
    let preview = document.getElementById("preview-image");
    const IMAGE_SIZE_S = document.getElementById("print-size-s-label");
    const IMAGE_SIZE_M = document.getElementById("print-size-m-label");
    const IMAGE_SIZE_L = document.getElementById("print-size-l-label");

    const br = document.createElement('br');
    const printSizes = getPrintSizes(preview);

    IMAGE_SIZE_S.innerText = "Small";
    IMAGE_SIZE_S.append(br);
    IMAGE_SIZE_S.innerText += (printSizes["S"][0] / 10) + ` × ` + (printSizes["S"][1] / 10) + ` cm`;

    IMAGE_SIZE_M.innerText = "Medium";
    IMAGE_SIZE_M.append(br);
    IMAGE_SIZE_M.innerText += (printSizes["M"][0] / 10) + ` × ` + (printSizes["M"][1] / 10) + ` cm`;

    IMAGE_SIZE_L.innerText = "Large";
    IMAGE_SIZE_L.append(br);
    IMAGE_SIZE_L.innerText += (printSizes["L"][0] / 10) + ` × ` + (printSizes["L"][1] / 10) + ` cm`;

}

/**
 * this functions generates the descriptions of an artwork.
 * Moreover it is available in each class where it is import.
 * @param artist
 * @param title
 * @param date
 */
export function createImageLabel(artist,title,date) {

    const spanArtist = document.createElement("span");
    spanArtist.setAttribute("class", "artist");

    const spanTitle = document.createElement("span");
    spanTitle.setAttribute("class","title");

    const spanComma = document.createElement("span");

    const spanDate = document.createElement("span");
    spanDate.setAttribute("class", "date");

    document.getElementById("image-label").appendChild(spanArtist);
    document.getElementById("image-label").appendChild(spanTitle);
    document.getElementById("image-label").appendChild(spanComma);
    document.getElementById("image-label").appendChild(spanDate);

    spanArtist.innerText = artist;
    spanTitle.innerText = title;
    spanComma.innerText = ",";
    spanDate.innerText = date;

}


/**
 * this function updates all elements in the config.
 */
export function updateConfig() {
    let preview = document.getElementById("preview-image");
    let container = document.getElementById("preview-container");

    let form = document.getElementById('config-form');
    let printSize = form['printSize'].value;
    let frameStyle = form['frameStyle'].value;
    let frameWidth = form['frameWidth'].value * 10;
    let matColor = form['matColor'].value;
    let matWidth = form['matWidth'].value * 10;

    const printSizes = getPrintSizes(preview);
    const totalWidth = printSizes[printSize][0] + 2 * frameWidth + 2 * matWidth;
    const totalHeight = printSizes[printSize][1] + 2 * frameWidth + 2 * matWidth;

    document.getElementById('total-size').innerHTML = `${totalWidth / 10} × ${totalHeight / 10} cm`;

    render(preview, container, printSize, frameStyle, frameWidth, matColor, matWidth);

    const price = calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2);

    document.getElementById('price').innerHTML = `€ ${price}`;

    calc_size_image();
    refreshConfig();
}


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
    const frame = {
        'classic': 1.0,
        'natural': 0.8,
        'shabby': 0.9,
        'elegant': 0.85
    };

    const sizeMultiplier = {
        'S': 1,
        'M': 2,
        'L': 3.5
    };
    const price = (30 + frame[frameStyle] * (frameWidth / 10) + 0.05 * (matWidth / 10)) * sizeMultiplier[printSize];
    return (Math.round((price + Number.EPSILON) * 100) / 100);
}
