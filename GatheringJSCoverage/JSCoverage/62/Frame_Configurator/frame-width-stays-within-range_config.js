import * as DAL from "./DAL.js";
import * as frame from "./frame.js";

var objectID;
document.addEventListener('DOMContentLoaded', event => {
    document.getElementById("cart-link").innerText = `Cart${getNumOfItems()}`;
    loadConfig();

    const form = document.getElementById("config-form");
    form.addEventListener('submit', );
});

async function loadConfig() {
    const params = (new URL(document.location)).searchParams;
    console.log(params);
    objectID = params.get('objectID');
    const printSize = params.get('printSize');
    const frameStyle = params.get('frameStyle');
    const frameWidth = params.get('frameWidth');
    const matColor = params.get('matColor');
    const matWidth = params.get('matWidth');

    const form = document.getElementById("config-form");

    if (printSize) 
    if (frameStyle) 
    if (frameWidth) 
    if (matColor) 
    if (matWidth) 

    if (objectID) {
        let paintingObject = await DAL.getPicture(+objectID);

        console.log(paintingObject);
        if (paintingObject.message) 
        const img = document.getElementById("preview-image");
        img.src = paintingObject.primaryImage;

        setImageLabel(paintingObject);
        img.onload = render;

        // Renders page dynamically based on input
        const inputArray = document.querySelectorAll("input[type='radio']");
        inputArray.forEach(function (input) {
            input.addEventListener("input", render);
        });

        // Event listener for sliders
        //connect sliders and corresponding input fields
        const frameInputField = document.getElementById("frameOutputId");
        const frameSlider = document.getElementById("frameInputId");
        frameSlider.addEventListener("input", );
        frameInputField.addEventListener("change", function () {
            let help=+Number.parseFloat(frameInputField.value).toFixed(1);
            if (help < frameSlider.min) {
                help = frameSlider.min;
            }
            if (help > frameSlider.max) {
                help = frameSlider.max;
            }
            frameSlider.value = help;
            frameInputField.value=help;
            render();
        });

        const matInputField = document.getElementById("matColorOutputId");
        const matSlider = document.getElementById("matColorInputId");
        matSlider.addEventListener("input", );
        matInputField.addEventListener("change", )

    }
    return objectID;
}

function render() {
    const form = document.getElementById("config-form");
    const img = document.getElementById("preview-image");
    const imgContainer = document.getElementById("preview-container");
    const printSize = form.elements["printSize"].value;
    const frameWidth = form.elements["frameWidth"].value;
    const frameStyle = form.elements["frameStyle"].value;
    const matColor = form.elements["matColor"].value;
    const matWidth = form.elements["matWidth"].value;
    console.log(printSize);
    setPrintSizes(img);
    frame.render(img, imgContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
    calculateTotalSize(img, printSize, frameWidth, matWidth);
    calculateTotalPrice(printSize, frameStyle, frameWidth, matWidth);
}

function setPrintSizes(img) {
    var labels = document.getElementsByTagName('LABEL');
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor !== '') {
            var elem = document.getElementById(labels[i].htmlFor);
            if (elem)
                elem.label = labels[i];
        }
    }
    const printSizes = frame.getPrintSizes(img);
    const printSizesOfPainting = document.getElementsByName('printSize');
    printSizesOfPainting[0].label.innerHTML = "Small <br>" + printSizes.S[0] + " × " + printSizes.S[1] + " cm";
    printSizesOfPainting[1].label.innerHTML = "Medium <br>" + printSizes.M[0] + " × " + printSizes.M[1] + " cm";
    printSizesOfPainting[2].label.innerHTML = "Large <br>" + printSizes.L[0] + " × " + printSizes.L[1] + " cm";

}

function getNumOfItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) 
    return '';
}

function calculateTotalSize(img, printSize, frameWidth, matWidth) {
    const printSizes = frame.getPrintSizes(img);
    var decorationWidth = (parseFloat(frameWidth) + parseFloat(matWidth));
    var totalWidth = printSizes[printSize][0] + decorationWidth;
    var totalHeight = printSizes[printSize][1] + decorationWidth;
    document.getElementById("total-size").innerHTML = totalWidth + " × " + totalHeight + " cm";
}

function calculateTotalPrice(printSize, frameStyle, frameWidth, matWidth) {
    frameWidth = frameWidth * 10;
    matWidth = matWidth * 10;
    const totalPrice = frame.calculatePrice(printSize, frameStyle, frameWidth, matWidth)
    document.getElementById("price").innerHTML = "€ " + totalPrice.toFixed(2);
}

function setImageLabel(paintingObject) {

    document.getElementById("image-label").innerHTML = "<b>" + paintingObject.artistDisplayName + "</b> <br> <i>" + paintingObject.title + ", " + paintingObject.objectDate + "</i>";
}


