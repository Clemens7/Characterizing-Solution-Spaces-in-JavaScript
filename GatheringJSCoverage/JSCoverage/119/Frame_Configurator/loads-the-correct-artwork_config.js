import { getPrintSizes, render, calculatePrice } from "./frame.js";

var urlParams = new URLSearchParams(window.location.search);
const objectID = document.querySelector("input[id='object-id']");
const image = document.getElementById("preview-image");
const container = document.getElementById("preview-container");
var frameWidth, frameWidthR, matWidth, matWidthR, printSize, frameStyle, matColor;

if (urlParams.get("object-id") == null && urlParams.get("printSize") != null) 

document.addEventListener('DOMContentLoaded', (event) => {



    if (urlParams.get("objectID") != null) {
        InitWithObjectID();
        retrieveArtfromId(objectID.value)
    }

    totalPrice(printSize.value, frameStyle.value, frameWidth.value, matWidth.value);

    const configurator = document.querySelector("section.configurator");
    console.log(configurator);

    configurator.onchange = ;

    console.log("!!!!!!!!!" + printSize.value);

}
);

function InitWithObjectID() {

    objectID.value = urlParams.get("objectID");
    frameWidth = document.querySelector("input[name='frameWidth']");
    frameWidthR = document.querySelector("input[name='frameWidthR']");
    matWidth = document.querySelector("input[name='matWidth']");
    matWidthR = document.querySelector("input[name='matWidthR']");
    printSize = document.querySelector("input[name = 'printSize']:checked");
    frameStyle = document.querySelector("input[name = 'frameStyle']:checked");
    matColor = document.querySelector("input[name = 'matColor']:checked");

}





function retrieveArtfromId(id) {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    console.log(id);

    var cachedResponse = localStorage.getItem(id);
    if (cachedResponse) 


    else {
        const fetchPromise = fetch(url + id, {
            method: 'GET'
            //cache: 'only-if-cached'
        });

        fetchPromise.then(response => {
            return response.json();
        }).then(response => {
            console.log(response);
            localStorage.setItem(id, JSON.stringify(response));
            if (response.message == "Not Found" || response.message == "ObjectID not found") 
            processResponseFromID(response);
        });
    }
}

function processResponseFromID(response) {

    var imageURL = response.primaryImageSmall;


    image.src = imageURL;

    //image.src = imageURL;

    render(image, container, 'M', 'natural', 40, "mint", 4);

    console.log(getPrintSizes(image));
    var dict = getPrintSizes(image);

    var sizeS = dict['S'];
    var sizeSW = sizeS[0];
    var sizeSH = sizeS[1];
    var sizeM = dict['M'];
    var sizeMW = sizeM[0];
    var sizeMH = sizeM[1];
    var sizeL = dict['L'];
    var sizeLW = sizeL[0];
    var sizeLH = sizeL[1];

    const divSizeS = document.getElementById("print-size-s-label");
    const divSizeM = document.getElementById("print-size-m-label");
    const divSizeL = document.getElementById("print-size-l-label");

    divSizeS.innerHTML =
        `Small<br>${sizeSW / 10} x ${sizeSH / 10} cm`
    divSizeM.innerHTML =
        `Medium<br>${sizeMW / 10} x ${sizeMH / 10} cm`
    divSizeL.innerHTML =
        `Large<br>${sizeLW / 10} x ${sizeLH / 10} cm`

    var totalSizeW = sizeMW;
    var totalSizeH = sizeMH;

    const totalSize = document.getElementById("total-size");

    totalSize.innerHTML =
        `
            ${(totalSizeW / 10) + 8 + 0.8} x ${(totalSizeH / 10) + 8 + 0.8} cm
            `

    var artist = response.artistDisplayName;
    var title = response.title;
    var date = response.objectDate;

    /*if (artist == null) {
        window.location.replace("search.html");
    };*/

    const div = document.getElementById("image-label")

    div.innerHTML =
        `
            <div><b>${artist}</b></div>
            <div><i>${title}</i>, ${date}</div>
            `

    totalPrice("M", "natural", 4, 0.4);

}






export 

function totalPrice(printSize, frameStyle, frameWidth, matWidth) {

    var price = calculatePrice(printSize, frameStyle, frameWidth, matWidth);
    //console.log(price);

    const div = document.getElementById('price');

    div.innerHTML =
        `€ ${price}`

}

