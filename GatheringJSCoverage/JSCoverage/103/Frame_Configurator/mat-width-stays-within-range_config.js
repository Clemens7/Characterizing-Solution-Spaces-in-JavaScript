import {render, getPrintSizes, calculatePrice} from './frame.js'
import {findObject} from './general.js'
import {saveToCart, countCart} from "./cart-helpers.js";

countCart();


window.onload = onLoad;
let artObj;
let form;

async function onLoad() {

    let urlParams = new URLSearchParams(window.location.search);
    let objectID = urlParams.get("objectID");
    console.log("objectID ", objectID)

    if(objectID == null || objectID === "")
    

    
    let printSize = urlParams.get("printSize");
    let frameStyle = urlParams.get("frameStyle");
    let frameWidth = urlParams.get("frameWidth");
    let matColor = urlParams.get("matColor");
    let matWidth = urlParams.get("matWidth");

   

    form = document.querySelector("#config-form");
    form.printSize.value = printSize || form.printSize.value;

    
    form.frameWidth.value = clamp(frameWidth/10,2,5) ;
    form.frameWidthR.value = form.frameWidth.value;

    form.matWidth.value =  clamp(matWidth/10,0,10)  || form.matWidth.value;
    form.matWidthR.value = form.matWidth.value;

    form.frameStyle.value = frameStyle || form.frameStyle.value;
    form.matColor.value = matColor || form.matColor.value;

    form.matWidth.onchange = form.matWidthR.onchange = (event) => {
        form.matWidthR.value = clamp(event.target.value,0,10);
        form.matWidth.value = form.matWidthR.value;
   
    }

    form.frameWidth.onchange = form.frameWidthR.onchange = 

    form.onsubmit = formSubmit;
    try {
        artObj = await findObject(objectID);
        console.log(artObj);
     
        document.querySelector("#image-label").innerHTML = "<b>" + artObj.artistDisplayName + "</b><br><i>" + artObj.title + "</i>, " + artObj.objectDate;
        console.log(artObj);
        reRender();
        form.onchange = reRender;
    } 
}

function reRender() {

    let container = document.querySelector("#preview-container");
    let img = document.querySelector("#preview-image");

    img.src = artObj.primaryImageSmall;
    console.log(artObj.primaryImageSmall);

    let printSizes = getPrintSizes(img);
    setPrintSizes(img, printSizes);

    let price = calculatePrice(form.printSize.value,
        form.frameStyle.value,
        form.frameWidth.value,
        form.matWidth.value);

    setPrice(price);
    setTotalSize(printSizes[form.printSize.value], form.matWidth.value, form.frameWidth.value)

    render(img,
        container,
        form.printSize.value,
        form.frameStyle.value,
        form.frameWidth.value * 10,
        form.matColor.value,
        form.matWidth.value * 10);
}


function setPrintSizes(img, printSizes) {

    document.querySelector("#print-size-s-label").innerHTML =
        `Small<br> ${printSizes.S[0] / 10} × ${printSizes.S[1] / 10} cm`;
    document.querySelector("#print-size-m-label").innerHTML =
        `Medium<br> ${printSizes.M[0] / 10} × ${printSizes.M[1] / 10} cm`;
    document.querySelector("#print-size-l-label").innerHTML =
        `Large<br> ${printSizes.L[0] / 10} × ${printSizes.L[1] / 10} cm`;

}


function setPrice(price) {
    document.querySelector("#price").innerHTML = "€ " + price.toFixed(2);
}

function setTotalSize(size, matWidth, frameWidth) {
    matWidth = parseFloat(matWidth) * 10;
    frameWidth = parseFloat(frameWidth) * 10;

    let height = size[0] + matWidth + frameWidth;
    let width = size[1] + matWidth + frameWidth;
    document.querySelector("#total-size").innerHTML = height / 10 + " &times; " + width / 10 + " cm";
}



window.clamp = clamp
function clamp(val, min ,max)
{
    return Math.min(Math.max(val,min),max);
}
