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
        frameInputField.addEventListener("change", );

        const matInputField = document.getElementById("matColorOutputId");
        const matSlider = document.getElementById("matColorInputId");
        matSlider.addEventListener("input", );
        matInputField.addEventListener("change", )

    }
    return objectID;
}





function getNumOfItems() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) 
    return '';
}





function setImageLabel(paintingObject) {

    document.getElementById("image-label").innerHTML = "<b>" + paintingObject.artistDisplayName + "</b> <br> <i>" + paintingObject.title + ", " + paintingObject.objectDate + "</i>";
}


