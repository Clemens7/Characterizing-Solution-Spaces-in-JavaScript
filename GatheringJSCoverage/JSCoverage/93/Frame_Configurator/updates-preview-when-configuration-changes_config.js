import {calculatePrice, calculateTotalSize, getPrintSizes, render} from "./frame.js";
import * as cache from "./cache.js";
import {getObject} from "./metmuseum-collection-api.js";
import * as utils from "./dom-utils.js"

function RenderedImage() {
    this.urlParams = new URLSearchParams(window.location.search);
    this.container = null;
    this.printSize = 'M';
    this.frameStyle = 'natural';
    this.frameWidth = 40;
    this.matColor = 'mint';
    this.matWidth = 55;
    this.printSizes = {S: [0, 0], M: [0, 0], L: [0, 0]};
    this.img = null;
    this.apiResponse = null;

    if (this.urlParams.get("objectID")){
        this.objectID = parseInt(this.urlParams.get("objectID"));
    }

    if (!cache.get('cart'))cache.save('cart',[]);

    if (document.readyState === "interactive" ){
        this.updateControls().then(_ => {});
        this.updatePrice().then(_ => {});
        this.createEventListeners().then(_ => {});
    }

    const retrievedFromCache = cache.get("cache_"+this.objectID);
    if (!retrievedFromCache){
        getObject(this.objectID)
            .then((data) => {
                cache.save("cache_"+this.objectID.toString(), data);
                this.initialiseImg(data);})
            .catch();
    }
}

RenderedImage.prototype.initialiseImg = function(data){
    if (data.primaryImageSmall === undefined) 
    this.apiResponse = data;

    this.img = document.getElementById("preview-image");
    this.img.src = this.apiResponse.primaryImageSmall;
    this.img.onload = () => this.renderImg();
    if (document.readyState === "interactive" ){
    }
};
RenderedImage.prototype.renderImg = function(){
    this.container = document.getElementById('preview-container');
    render(this.img, this.container, this.printSize, this.frameStyle, this.frameWidth, this.matColor, this.matWidth);
    document.getElementById('image-label').innerHTML =
        `<strong>${this.apiResponse.artistDisplayName}</strong><br>${this.apiResponse.title} ca. ${this.apiResponse.objectDate}`;
    this.printSizes = getPrintSizes(this.img);
    this.updatePrintSize();
    this.updateTotalSize();
};

RenderedImage.prototype.updateControls = async function(){
    const CartItems = new utils.CartItemsElement;
    CartItems.update();
    document.getElementById("frameWidth").setAttribute('value',
        this.urlParams.get("frameWidth")  : (this.frameWidth/10).toString());
    document.getElementById("frameWidthR").setAttribute('value',
        this.urlParams.get("frameWidth")  : (this.frameWidth/10).toString());
    document.getElementById("matWidthR").setAttribute('value',
        this.urlParams.get("matWidth")  : (this.matWidth/10).toString());
    document.getElementById("matWidth").setAttribute('value',
        this.urlParams.get("matWidth")  : (this.matWidth/10).toString());
    document.getElementById(`print-size-${this.urlParams.get("printSize")  
        : this.printSize.toLowerCase()}`).checked = true;
    document.getElementById(`frame-style-${this.urlParams.get("frameStyle")  : 
        this.frameStyle}`).checked = true;
    document.getElementById(`mat-color-${this.urlParams.get("matColor")  : 
        this.matColor}`).checked = true;
};

RenderedImage.prototype.updatePrice = async function () {
    document.getElementById("price").innerText = "€ " +
        calculatePrice(this.printSize, this.frameStyle, this.frameWidth, this.matWidth).toFixed(2);
};

RenderedImage.prototype.updatePrintSize = function () {
    this.printSizes = getPrintSizes(this.img);
    document.getElementById("print-size-s-label").innerHTML =
        "Small<br>" + this.printSizes['S'][0] +" × " + this.printSizes['S'][1] +" cm";
    document.getElementById("print-size-m-label").innerHTML =
        "Medium<br>" + this.printSizes['M'][0] +" × " + this.printSizes['M'][1] +" cm";
    document.getElementById("print-size-l-label").innerHTML =
        "Large<br>" + this.printSizes['L'][0] +" × " + this.printSizes['L'][1] +" cm";
};

RenderedImage.prototype.updateTotalSize = function () {
    let sizeArray = calculateTotalSize(this.printSizes, this.printSize, this.frameWidth, this.matWidth);
    document.getElementById("total-size").innerText = `${sizeArray[0]} x ${sizeArray[1]} cm`;
};

RenderedImage.prototype.rerender = function () {
    render(this.img, this.container, this.printSize, this.frameStyle, this.frameWidth, this.matColor, this.matWidth);
    this.updatePrice().then(_ => {});
    this.updateTotalSize();
};

RenderedImage.prototype.checkInput = function(form, input, range) {
    if (form.reportValidity() && input.value !== "") {
        range.value = input.value;
        return true;
    }
    return false;
};

RenderedImage.prototype.invalidReset = function (form, input, range, min, max) {
    if (!form.checkValidity()) else if (input.value === "")
    return false;
};

RenderedImage.prototype.createEventListeners = async function(){
    const printSize = document.getElementsByName("printSize");
    for (let elements of printSize){
        elements.addEventListener("click", () => {this.printSize = elements.value; this.rerender();});
    }
    const frameStyle = document.getElementsByName("frameStyle");
    for (let elements of frameStyle){
        elements.addEventListener("click", () => {this.frameStyle = elements.value; this.rerender();})
    }
    const matColor = document.getElementsByName("matColor");
    for (let elements of matColor){
        elements.addEventListener("click", () => {this.matColor = elements.value; this.rerender();})
    }

    const slideMatWidth = document.getElementById("matWidthR");
    const fieldMatWidth = document.getElementById("matWidth");
    const form = document.getElementById("config-form");
    fieldMatWidth.addEventListener("input", () => {
        if (this.checkInput(form, fieldMatWidth, slideMatWidth)){
            this.matWidth = parseFloat(fieldMatWidth.value)*10;
            this.rerender();
        }
    });
    fieldMatWidth.addEventListener("focusout", () => {
        if (this.invalidReset(form, fieldMatWidth, slideMatWidth, fieldMatWidth.min, fieldMatWidth.max)) 
    });
    slideMatWidth.addEventListener("input", );

    const slideFrameWidth = document.getElementById("frameWidthR");
    const fieldFrameWidth = document.getElementById("frameWidth");
    fieldFrameWidth.addEventListener("input", () => {
        if (this.checkInput(form, fieldFrameWidth, slideFrameWidth)){
            this.frameWidth = parseFloat(fieldFrameWidth.value)*10;
            this.rerender();
        }
    });
    fieldFrameWidth.addEventListener("focusout", () => {
        if (this.invalidReset(form, fieldFrameWidth, slideFrameWidth, fieldFrameWidth.min, fieldFrameWidth.max)) 
    });
    slideFrameWidth.addEventListener("input", );

    document.getElementById("add-to-cart").addEventListener("click", );
};

RenderedImage.prototype.addToCartArray = ;
const renderedImage = new RenderedImage();
















