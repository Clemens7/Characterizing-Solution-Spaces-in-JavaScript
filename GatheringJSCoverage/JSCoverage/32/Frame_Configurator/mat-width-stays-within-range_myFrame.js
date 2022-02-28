import {getPrintSizes, render, calculatePrice} from  "./frame.js";

var objectID;
var printSize;
var frameStyle;
var frameWidth;
var frameWidthR;
var matColor;
var matWidth;
var matWidthR;

window.onload = function () {
    main();
};

class item {
    
}
class Art {
    constructor(id, artist, title, date, url) {
        this.id = id;
        this.artist = artist;
        this.title = title;
        this.date = date;
        this.url = url;
    }
}



async function getArt(objectID){
    const response = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID);
    const object = await response.json();

    return new Art(objectID, object.artistDisplayName, object.title, object.objectDate, object.primaryImageSmall);
}

async function main(){
    const url = new URLSearchParams(window.location.search);
    const preview_image = document.getElementById("preview-image");
    const image_label = document.getElementById("image-label");
    const form = document.getElementById("config-form");
    const art_container = document.getElementById("preview-container");
    const slider_frame = document.getElementById("frameWidthR");
    const frame = document.getElementById("frameWidth");
    const slider_mat = document.getElementById("matWidthR");
    const mat = document.getElementById("matWidth");
    const button = document.getElementById("add-to-cart");

    form.addEventListener("submit", )

    const cartInfo = document.getElementById("cart-link");

    //cart items
    let cart = window.localStorage.getItem("cart");
    if(cart === null) cart = "[]";

    let json = JSON.parse(cart);
    cartInfo.innerText = "Cart (" + json.length + ")";

    let sizes;

    objectID = url.get("object-id");
    if (objectID == null ) {
        //window.location.href = "./search.html?q=";
    }
    printSize = url.get("printSize");
    if (printSize == null ) {
        printSize = "M";
    }
    frameStyle = url.get("frameStyle");
    if (frameStyle == null ) {
        frameStyle = "classic";
    }
    frameWidth = url.get("frameWidth");
    if (frameWidth == null ) {
        frameWidth = 2;
    }
    frameWidthR = url.get("frameWidthR");
    if (frameWidthR == null ) {
        frameWidthR = 2;
    }
    matColor = url.get("matColor");
    if (matColor == null ) {
        matColor = "ivory";
    }
    matWidth = url.get("matWidth");
    if (matWidth == null ) {
        matWidth = 1;
    }
    matWidthR = url.get("matWidthR");
    if (matWidthR == null ) {
        matWidthR = 1;
    }

    setValues();

    slider_frame.addEventListener("change", );
    frame.addEventListener("keyup", );
    slider_mat.addEventListener("change", );
    mat.addEventListener("keyup", event => {
        slider_mat.value = mat.value;
        matWidth = mat.value;
        matWidthR = mat.value;
        redoRender(sizes, art_container, preview_image);
    });
    form.addEventListener("change", event => {
        redoRender(sizes, art_container, preview_image);
    });
    document.getElementById("mat-color-div").addEventListener("change", );
    document.getElementById("frame-style-div").addEventListener("change", );
    document.getElementById("segmented-div").addEventListener("change", );
    button.onclick = ;
    let art = await getArt(objectID);
    preview_image.src = art.url;
    image_label.innerHTML =
        "            <span class=\"artist\">" + art.artist + "</span>\n" +
        "            <span class=\"title\">" + art.title + "</span>,\n" +
        "            <span class=\"date\">" + art.date +"</span>\n";
    render(preview_image, art_container, printSize, frameStyle, frameWidth*10, matColor, matWidth*10);
    sizes = getPrintSizes(preview_image);
    document.getElementById("print-size-s-label").innerHTML = "Small<br>"+ sizes.S[0] + " × " + sizes.S[1];
    document.getElementById("print-size-m-label").innerHTML = "Medium<br>"+ sizes.M[0] + " × " + sizes.M[1];
    document.getElementById("print-size-l-label").innerHTML = "Large<br>"+ sizes.L[0] + " × " + sizes.L[1];
    document.getElementById("price").innerText = "€ " + calculatePrice(printSize, frameStyle, frameWidth*10, matWidth*10);
    setTotalSize(sizes);
}

function setValues() {
    document.getElementById("object-id").value = objectID;
    document.getElementById("print-size-" + printSize.toLowerCase()).checked = true;
    document.getElementById("frame-style-" + frameStyle.toLowerCase()).checked = true;
    document.getElementById("frameWidth").value = frameWidth;
    document.getElementById("frameWidthR").value = frameWidthR;
    document.getElementById("mat-color-" + matColor.toLowerCase()).checked = true;
    document.getElementById("matWidth").value = matWidth;
    document.getElementById("matWidthR").value = matWidthR;

}

function setTotalSize(sizes) {
    let totalSizeX = parseFloat(matWidth)*2 + parseFloat(frameWidth)*2;
    let totalSizeY = parseFloat(matWidth)*2 + parseFloat(frameWidth)*2;
    if (document.getElementById("print-size-s").checked)  else if (document.getElementById("print-size-m").checked) {
        totalSizeX += parseFloat(sizes.M[0]);
        totalSizeY += parseFloat(sizes.M[1]);
    }
    document.getElementById("total-size").innerHTML = totalSizeX + " × " + totalSizeY + " cm";
}

function redoRender(sizes, art_container, preview_image) {
    if (document.getElementById("print-size-s").checked)  else if (document.getElementById("print-size-m").checked) {
        printSize = "M";
    }
    if (document.getElementById("frame-style-classic").checked) {
        frameStyle = "classic";
    }
    if (document.getElementById("mat-color-ivory").checked) {
        matColor = "ivory";
    }
    document.getElementById("price").innerText = "€ " + calculatePrice(printSize, frameStyle, frameWidth*10, matWidth*10);
    render(preview_image, art_container, printSize, frameStyle, frameWidth*10, matColor, matWidth*10);
    setTotalSize(sizes);
}