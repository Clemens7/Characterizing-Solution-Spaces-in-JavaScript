var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getObject } from "./met-api.js";
import { calculatePrice, getPrintSizes, render } from "./frame.js";
import { setCurrentCartCount } from "./cart-count.js";
export const SIZES = ['S', 'M', 'L'];
export const FRAME_STYLES = ['classic', 'natural', 'shabby', 'elegant'];
export const MAT_COLORS = ['ivory', 'mint', 'wine', 'indigo', 'coal'];
/**
 * Connects the values of an input field of type 'number' and one of type 'range'.
 * Checks for the number input if the provided value is valid and only adjusts the value if it is.
 *
 * @param idNumber the ID of the 'number' type input field
 * @param idRange the ID of the 'range' type input field
 */
function connectInputForms(idNumber, idRange) {
    const input1 = document.getElementById(idNumber);
    const input2 = document.getElementById(idRange);
    if (input1 === null || !(input1 instanceof HTMLInputElement)) 
    else if (input2 === null || !(input2 instanceof HTMLInputElement)) 
    else {
        input1.addEventListener("change", );
        input2.addEventListener("change", );
    }
}
/**
 * Use the values of the given parameter objectBody
 * and create the preview-image with the provided values
 * @param objectBody of the image with the related values
 */
function setImageValues(objectBody) {
    let previewImage = document.getElementById("preview-image");
    let imageLabel = document.getElementById("image-label");
    if (previewImage === null || !(previewImage instanceof HTMLImageElement)) 
    else {
        previewImage.onload = () => {
            updatePage();
        };
        previewImage.src = objectBody.primaryImageSmall;
        const artistSpan = document.createElement('span');
        artistSpan.className = "artist";
        artistSpan.innerText = objectBody.artistDisplayName;
        const titleSpan = document.createElement('span');
        titleSpan.className = "title";
        titleSpan.textContent = objectBody.title;
        const dateSpan = document.createElement('span');
        dateSpan.className = "date";
        dateSpan.textContent = objectBody.objectDate;
        imageLabel.appendChild(artistSpan);
        imageLabel.appendChild(titleSpan);
        imageLabel.append(", ");
        imageLabel.appendChild(dateSpan);
    }
}
/**
 * Helper function that checks if a query parameter with ObjectID is provided.
 * If not, or there exists no entry in the API for the ObjectID, redirect to the search page.
 * A list of valid ObjectIDs is provided in highlights.json.
 */
function fetchConfigImage() {
    return __awaiter(this, void 0, void 0, function* () {
        const params = (new URL(document.location.toString())).searchParams;
        const objectQuery = params.get('objectID');
        if (objectQuery === null || objectQuery.length === 0) 
        // load the object for the given id
        const artObject = yield getObject(objectQuery);
        // check if there exists an object and if it has a picture
        if (!artObject || artObject.primaryImageSmall.length == 0) 
        const configImageObject = {
            objectID: artObject.objectID,
            primaryImageSmall: artObject.primaryImageSmall,
            title: artObject.title,
            artistDisplayName: artObject.artistDisplayName,
            objectDate: artObject.objectDate
        };
        setImageValues(artObject);
        //add image object to cache
        localStorage.setItem("configImage", JSON.stringify(configImageObject));
    });
}
/**
 * Takes a URLSearchParams object and optionally initializes the form with all parameters contained in it.
 * Possible parameters are 'printSize', 'frameWidth', 'frameStyle', 'matWidth' and 'matColor'.
 *
 * @param params a URLSearchParams object
 */
function initWithQueryParams(params) {
    let size = params.get("printSize");
    if (size !== null && SIZES.indexOf(size.toUpperCase()) > -1) {
        let button = document.getElementById(`print-size-${size.toLowerCase()}`);
        if (button !== null && button instanceof HTMLInputElement)
            button.checked = true;
    }
    let frameWidth = params.get("frameWidth");
    if (frameWidth !== null) {
        // width is specified in millimeters
        let width = parseInt(frameWidth);
        if (width < 20)
             // specified via the given tests
        if (width <= 50 && width >= 20) {
            let input1 = document.getElementById(`frameWidthInputNumber`);
            if (input1 !== null && input1 instanceof HTMLInputElement)
                input1.value = (width / 10.0).toString();
            let input2 = document.getElementById(`frameWidthInputRange`);
            if (input2 !== null && input2 instanceof HTMLInputElement)
                input2.value = (width / 10.0).toString();
        }
    }
    let frameStyle = params.get("frameStyle");
    if (frameStyle !== null && FRAME_STYLES.indexOf(frameStyle.toLowerCase()) > -1) {
        let button = document.getElementById(`frame-style-${frameStyle.toLowerCase()}`);
        if (button !== null && button instanceof HTMLInputElement)
            button.checked = true;
    }
    let matWidth = params.get("matWidth");
    if (matWidth !== null) {
        // width is specified in millimeters
        let width = parseInt(matWidth);
        if (width < 0)
             // specified via the given tests
        if (width <= 100 && width >= 0) {
            let input1 = document.getElementById(`matWidthInputNumber`);
            if (input1 !== null && input1 instanceof HTMLInputElement)
                input1.value = (width / 10.0).toString();
            let input2 = document.getElementById(`matWidthInputRange`);
            if (input2 !== null && input2 instanceof HTMLInputElement)
                input2.value = (width / 10.0).toString();
        }
    }
    let matColor = params.get("matColor");
    if (matColor !== null && MAT_COLORS.indexOf(matColor.toLowerCase()) > -1) {
        let button = document.getElementById(`mat-color-${matColor.toLowerCase()}`);
        if (button !== null && button instanceof HTMLInputElement)
            button.checked = true;
    }
}
/**
 * adds the event listener responsible for changing image size, price and print size
 */
function addConfigEventListeners() {
    const inputElements = document.getElementsByTagName("input");
    for (let element of inputElements) {
        element.addEventListener("change", updatePage);
    }
    let addToCartButton = document.getElementById('config-form');
    addToCartButton.addEventListener("submit", );
}
function getCurrentValues() {
    const params = (new URL(document.location.toString())).searchParams;
    let objectID = params.get('objectID');
    let printSize = 'S';
    let frameStyle = 'classic';
    let frameWidth = 0;
    let matWidth = 0;
    let matColor = "";
    for (let size of SIZES) {
        let sizeInput = document.getElementById(`print-size-${size.toLowerCase()}`);
        if (sizeInput !== null && sizeInput instanceof HTMLInputElement && sizeInput.checked == true) {
            printSize = size;
            break;
        }
    }
    for (let style of FRAME_STYLES) {
        let styleInput = document.getElementById(`frame-style-${style}`);
        if (styleInput !== null && styleInput instanceof HTMLInputElement && styleInput.checked == true) {
            frameStyle = style;
            break;
        }
    }
    let frameWithInput = document.getElementById(`frameWidthInputNumber`);
    if (frameWithInput !== null && frameWithInput instanceof HTMLInputElement) {
        frameWidth = Number(frameWithInput.value);
    }
    let matWidthInput = document.getElementById(`matWidthInputNumber`);
    if (matWidthInput !== null && matWidthInput instanceof HTMLInputElement) {
        matWidth = Number(matWidthInput.value);
    }
    for (let color of MAT_COLORS) {
        let colorInput = document.getElementById(`mat-color-${color}`);
        if (colorInput !== null && colorInput instanceof HTMLInputElement && colorInput.checked == true) {
            matColor = color;
            break;
        }
    }
    return {
        objectID: objectID,
        printSize: printSize,
        frameStyle: frameStyle,
        frameWidth: frameWidth,
        // @ts-ignore
        matColor: matColor,
        matWidth: matWidth
    };
}
function updatePage() {
    const cartObject = getCurrentValues();
    //getImage and container
    let image = document.getElementById("preview-image");
    let imageContainer = document.getElementById("preview-container");
    // render preview
    // @ts-ignore
    render(image, imageContainer, cartObject.printSize, cartObject.frameStyle, cartObject.frameWidth, cartObject.matColor, cartObject.matWidth);
    //update size values
    let printSizes = getPrintSizes(image);
    // @ts-ignore
    let printWidth = printSizes[cartObject.printSize][0];
    // @ts-ignore
    let printHeight = printSizes[cartObject.printSize][1];
    for (let size of SIZES) {
        let relevantLabel = document.getElementById(`print-size-${size.toLowerCase()}-label`);
        relevantLabel.innerHTML = `${size == "S" ? "Small" : size == "M" ? "Medium" : "Large"}<br>${printSizes[size][0]} &times; ${printSizes[size][1]} cm`;
    }
    //update-price
    let priceDisplay = document.getElementById("price");
    //@ts-ignore
    priceDisplay.innerText = "€ " + calculatePrice(cartObject.printSize, cartObject.frameStyle, cartObject.frameWidth, cartObject.matWidth).toFixed(2);
    // update height x width
    let totalSize = document.getElementById('total-size');
    const totalHeight = printHeight + cartObject.frameWidth + cartObject.matWidth;
    const totalWidth = printWidth + cartObject.frameWidth + cartObject.matWidth;
    totalSize.innerText = `${totalWidth} x ${totalHeight}`;
}
/**
 * Requests the values of the current config page.
 * Checks if there are already carts in the localStorage
 * If not it will save a list with the current cart object to the localStorage
 * otherwise it will add the current cart object to the list.
 * Then the user will directed to the cart page.
 */

connectInputForms("matWidthInputNumber", "matWidthInputRange");
connectInputForms("frameWidthInputNumber", "frameWidthInputRange");
fetchConfigImage();
initWithQueryParams(new URLSearchParams(window.location.search));
addConfigEventListeners();
setCurrentCartCount();
