import { artService } from "./artService.js";
import { cache } from "./cache.js";
import * as domHelper from "./dom-helper.js"
import * as frame from "./frame.js";


const frameWidth = document.getElementById("frameWidth");
const frameWidthR = document.getElementById("frameWidthR");
const matWidth = document.getElementById("matWidth");
const matWidthR = document.getElementById("matWidthR");
const frameStyleRadios = document.getElementsByName("frameStyle");
let selectedFrameStyle = "natural";
const matColorRadios = document.getElementsByName("matColor");
let selectedMatColor = "mint";
const printSizeRadios = document.getElementsByName("printSize");
let selectedPrintSize = "M";
const previewImage = document.getElementById("preview-image");
const previewContainer = document.getElementById("preview-container");
const previewImageLabel = document.getElementById("image-label");
 const price = document.getElementById("price");
 const totalSize = document.getElementById("total-size");
 const addToCartButton = document.getElementById("buy");


function addEventListeners(){
    frameWidth.addEventListener("change", , false)
    frameWidthR.addEventListener("input", , false)

    matWidth.addEventListener("change", function(event){
        matWidth.value = checkMatSize(event.target.value);
        matWidthR.value = event.target.value;
        renderImage();
    }, false)
    matWidthR.addEventListener("input", , false)


    frameStyleRadios.forEach(
        frameStyle => frameStyle.addEventListener("input", , false)
    );

    matColorRadios.forEach(
        matColor => matColor.addEventListener("input", , false)
    );

    printSizeRadios.forEach(
        printSize => printSize.addEventListener("input", , false)
    );

    previewImage.addEventListener("load", function(){
        setSizes(previewImage);
        renderImage();
    }, false);

    addToCartButton.addEventListener("click", )
} 




function checkMatSize(size){
    const LOWER_BOUND = 0;
    const UPPER_BOUND = 10;

    if(size < LOWER_BOUND)
        
    else if(size > UPPER_BOUND)
        

    size = Math.round(size*10)/10;

    if(size%1 != 0)
        size = Number(size).toFixed(1);

    return size;
}

function renderImage(){
   frame.render(previewImage, previewContainer, selectedPrintSize, selectedFrameStyle, frameWidth.value*10, selectedMatColor, matWidth.value*10)
   price.innerText = "€ " + frame.calculatePrice(selectedPrintSize, selectedFrameStyle, frameWidth.value*10, matWidth.value*10).toFixed(2);
   calculateTotalSize();
}

function calculateTotalSize(){
    const sizes = frame.getPrintSizes(previewImage);

    let totalWidth = 2 * frameWidth.value + 2 * matWidth.value;
    let totalHeight = 2 * frameWidth.value + 2 * matWidth.value;
    
    totalWidth +=  sizes[selectedPrintSize][0]/10;
    totalHeight +=  sizes[selectedPrintSize][1]/10;

    totalWidth = (Math.round((totalWidth + Number.EPSILON) * 100) / 100);
    totalHeight = (Math.round((totalHeight + Number.EPSILON) * 100) / 100);

    totalSize.innerHTML = totalWidth + " × " + totalHeight + " cm";
}

function setSizes(){
    const sizes = frame.getPrintSizes(previewImage);

    document.getElementById("print-size-s-label").innerHTML = "Small<br>" + sizes.S[0]/10 +" × " + sizes.S[1]/10 + " cm";
    document.getElementById("print-size-m-label").innerHTML = "Medium<br>" + sizes.M[0]/10 +" × " + sizes.M[1]/10 + " cm";
    document.getElementById("print-size-l-label").innerHTML = "Large<br>" + sizes.L[0]/10 +" × " + sizes.L[1]/10 + " cm";
}

async function loadImage(objectID){
    const image = await artService.getArtObject(objectID);
    
    if(!image.objectID)
    

    domHelper.setAttributes(previewImage, {
        "src": image.imgUrl, 
        "title": image.title,
        "alt": image.title});
    previewImage.dataset.objectid = image.objectID;

    
    createImageDescription(image);
};

function createImageDescription(artObject){

    const artist = document.createElement('span');
    artist.setAttribute('class', 'artist');
    artist.innerText = artObject.artist;

    const title = document.createElement('span');
    title.setAttribute('class', 'title');
    title.innerText = artObject.title;

    const date = document.createElement('span');
    date.setAttribute('class', 'date');
    date.innerText = artObject.date;

    previewImageLabel.appendChild(artist);
    previewImageLabel.appendChild(title);
    previewImageLabel.append(' , ');
    previewImageLabel.appendChild(date);

};



function setQueryParams(){
    const params = artService.getQueryParams("objectID", "printSize", "frameWidth", "frameStyle", "matWidth", "matColor");


    for(let param in params){
        if(params[param])
            params[param] = params[param].toLowerCase() 
    }

    if(params.printSize)

    if(params.frameWidth)

    if(params.matWidth)

    if(params.frameStyle)

    if(params.matColor)

    loadImage(params.objectID);
}

setQueryParams();

addEventListeners();
