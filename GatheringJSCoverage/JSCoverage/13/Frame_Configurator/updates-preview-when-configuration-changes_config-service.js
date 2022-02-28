import { FrameStyle, MatColor, PrintSize, getPrintSizes, calculatePrice, render } from "./frame.js";
import { CartItem } from "./cart-service.js";
var QueryParamTypes;
(function (QueryParamTypes) {
    QueryParamTypes[QueryParamTypes["objectID"] = 0] = "objectID";
    QueryParamTypes[QueryParamTypes["printSize"] = 1] = "printSize";
    QueryParamTypes[QueryParamTypes["frameStyle"] = 2] = "frameStyle";
    QueryParamTypes[QueryParamTypes["frameWidth"] = 3] = "frameWidth";
    QueryParamTypes[QueryParamTypes["matColor"] = 4] = "matColor";
    QueryParamTypes[QueryParamTypes["matWidth"] = 5] = "matWidth";
})(QueryParamTypes || (QueryParamTypes = {}));
export var Site;
(function (Site) {
    Site["cart"] = "cart.html";
    Site["search"] = "search.html";
    Site["config"] = "config.html";
    Site["checkout"] = "checkout.html";
})(Site || (Site = {}));
class RangeTextRadioConfig {
    constructor(rangeSlider, numberInput, radioInputs) {
        this._rangeSlider = null;
        this._numberInput = null;
        this._radioInputs = null;
        this._rangeSlider = rangeSlider;
        this._numberInput = numberInput;
        this._radioInputs = radioInputs;
        this.addEventHandler();
    }
    
    
    get width() {
        return this._numberInput.value;
    }
    
    
    get selectedRadioInput() {
        let selectedRadioInput = null;
        for (let radioInput of this._radioInputs) {
            if (radioInput.checked) {
                selectedRadioInput = radioInput;
            }
        }
        return selectedRadioInput;
    }
    
    addEventHandler() {
        this._rangeSlider.oninput = ;
        this._numberInput.onchange = () => { this.valueSetter(this._rangeSlider, this._numberInput); };
        for (let radioInput of this._radioInputs) {
            radioInput.onchange = () => { Updater.update(); };
        }
    }
    valueSetter(objectToBeSet, changedObject) {
        let max = Number(objectToBeSet.max);
        let min = Number(objectToBeSet.min);
        let changedValue = Math.round(Number(changedObject.value) * 10) / 10;
        if (changedValue <= min) 
        else if (changedValue >= max) 
        else {
            objectToBeSet.value = changedValue.toString();
            changedObject.value = changedValue.toString();
        }
        Updater.update();
    }
}
export class FrameConfig extends RangeTextRadioConfig {
    constructor() {
        let rangeSlider = document.querySelector("#config-form > fieldset:nth-child(3) > input[type=range]");
        let numberInput = document.querySelector("#config-form > fieldset:nth-child(3) > div > div > input[type=number]");
        let frameStyleDiv = document.getElementsByClassName("frame-style-row")[0];
        let frameStyleInputs = frameStyleDiv.getElementsByTagName("input");
        super(rangeSlider, numberInput, frameStyleInputs);
    }
    
    get selectedStyle() {
        let selectedInput = super.selectedRadioInput;
        if (selectedInput == null) 
        else {
            return FrameStyle[selectedInput.value];
        }
    }
}
export class MatConfig extends RangeTextRadioConfig {
    constructor() {
        let rangeSlider = document.querySelector("#config-form > fieldset:nth-child(5) > input[type=range]");
        let numberInput = document.querySelector("#config-form > fieldset:nth-child(5) > div > div > input[type=number]");
        let matColorDiv = document.getElementsByClassName("mat-color-row")[0];
        let matColorInputs = matColorDiv.getElementsByTagName("input");
        super(rangeSlider, numberInput, matColorInputs);
    }
    
    get selectedColor() {
        let selectedInput = super.selectedRadioInput;
        if (selectedInput == null) 
        else {
            return MatColor[selectedInput.value];
        }
    }
}
export class PrintSizeConfig {
    constructor() {
        this._printSizeInputs = null;
        let printSizeDiv = document.getElementsByClassName("segmented")[0];
        this._printSizeInputs = printSizeDiv.getElementsByTagName("input");
        this.addEventListeners();
    }
    
    get selectedPrintSizeInput() {
        let selectedPrintSizeInput = null;
        for (let printSizeInput of this._printSizeInputs) {
            if (printSizeInput.checked)
                selectedPrintSizeInput = printSizeInput;
        }
        return selectedPrintSizeInput;
    }
    get selectedPrintSize() {
        let selectedPrintSizeInput = this.selectedPrintSizeInput;
        if (selectedPrintSizeInput == null) 
        else {
            return PrintSize[selectedPrintSizeInput.value];
        }
    }
    
    static setLabelById(id, text, printsize) {
        let printLabel = document.getElementById(id);
        let width = printsize[0] / 10;
        let height = printsize[1] / 10;
        printLabel.innerHTML = `${text}<br>${width} x ${height} cm`;
    }
    addEventListeners() {
        for (let printSizeInput of this._printSizeInputs) {
            printSizeInput.onchange = () => { Updater.update(); };
        }
    }
}
export class PreviewImage {
    constructor() {
        this._image = null;
        this._container = null;
        this._image = document.getElementById("preview-image");
        this._image.addEventListener("load", this.imageLoadedHandler);
        this._container = document.getElementById("preview-container");
    }
    get image() {
        return this._image;
    }
    get container() {
        return this._container;
    }
    set src(src) {
        this._image.src = src;
    }
    set alt(alt) {
        this._image.alt = alt;
    }
    imageLoadedHandler() {
        if (this.src == "" || this.src == "null" || this.src == null)
            
        let printsizes = getPrintSizes(this);
        PrintSizeConfig.setLabelById("print-size-s-label", "Small", printsizes.S);
        PrintSizeConfig.setLabelById("print-size-m-label", "Medium", printsizes.M);
        PrintSizeConfig.setLabelById("print-size-l-label", "Large", printsizes.L);
        Updater.update();
    }
    setMuseumLabel(title, artist, date) {
        let imageLabel = document.getElementById("image-label");
        let artistSpan = document.createElement("span");
        artistSpan.innerHTML = artist.bold();
        artistSpan.appendChild(document.createElement("br"));
        let titleSpan = document.createElement("span");
        titleSpan.innerHTML = title.italics();
        titleSpan.innerHTML += ", ca. " + date;
        imageLabel.appendChild(artistSpan);
        imageLabel.appendChild(titleSpan);
    }
}
export class QueryParams {
    constructor() {
        this._urlSearchParams = new URLSearchParams(window.location.search);
        this._queryParams = {};
        this.setParams();
    }
    setParams() {
        for (let key in QueryParamTypes) {
            if (this._urlSearchParams.has(key)) {
                this._queryParams[key] = this._urlSearchParams.get(key);
            }
        }
    }
    getQueryParam(key) {
        if (key in this._queryParams) {
            return this._queryParams[key];
        }
    }
    setHTMLElements(frameConfig, matConfig, printSizeConfig, addToCartButton) {
        for (let key in this._queryParams) {
            let value = this._queryParams[key];
            switch (key) {
                
                
                
                
                
                case "objectID":
                    addToCartButton.objectID = value;
                    break;
                
            }
        }
    }
}
export class AddToCartButton {
    constructor() {
        this._button = null;
        this._button = document.querySelector("#config-form > fieldset:nth-child(7) > button");
        this._button.addEventListener("click", this.buttonClickHandler);
    }
    
    
    set objectID(objectID) {
        this._button.dataset["objectID"] = objectID;
    }
}
export class Updater {
    constructor(matConfig, frameConfig, printSizeConfig, previewImage, cart) {
        Updater._matConfig = matConfig;
        Updater._frameConfig = frameConfig;
        Updater._printSizeConfig = printSizeConfig;
        Updater._previewImage = previewImage;
        Updater._priceSpan = document.getElementById("price");
        Updater._totalSizeSpan = document.getElementById("total-size");
        Updater._cart = cart;
    }
    static update() {
        let data = this.calculateData();
        this.updatePrice(data.price);
        this.updateTotalSize(data.totalSize);
        let image = Updater._previewImage.image;
        let container = Updater._previewImage.container;
        render(image, container, data.printSize, data.frameStyle, data.frameWidth, data.matColor, data.matWidth);
    }
    static calculateData() {
        let _printSize = Updater._printSizeConfig.selectedPrintSize;
        let _frameWidth = Number(Updater._frameConfig.width) * 10;
        let _frameStyle = Updater._frameConfig.selectedStyle;
        let _matWidth = Number(Updater._matConfig.width) * 10;
        let _matColor = Updater._matConfig.selectedColor;
        let _price = calculatePrice(_printSize, _frameStyle, _frameWidth, _matWidth).toFixed(2);
        let printSizes = getPrintSizes(Updater._previewImage.image);
        let selectedPrintSize = printSizes[Updater._printSizeConfig.selectedPrintSize];
        let matAndFrameWidth = Number(Updater._matConfig.width) + Number(Updater._frameConfig.width);
        let totalWidth = (selectedPrintSize[0] / 10 + matAndFrameWidth).toFixed(1);
        let totalHeight = (selectedPrintSize[1] / 10 + matAndFrameWidth).toFixed(1);
        let _totalSize = [totalWidth, totalHeight];
        let data = {
            printSize: _printSize,
            frameWidth: _frameWidth,
            frameStyle: _frameStyle,
            matWidth: _matWidth,
            matColor: _matColor,
            price: _price,
            totalSize: _totalSize
        };
        return data;
    }
    static 
    static updatePrice(value) {
        Updater._priceSpan.innerHTML = "€ " + value;
    }
    static updateTotalSize(totalSize) {
        Updater._totalSizeSpan.innerHTML = `${totalSize[0]} x ${totalSize[1]} cm`;
    }
}
Updater._matConfig = null;
Updater._frameConfig = null;
Updater._printSizeConfig = null;
Updater._previewImage = null;
Updater._priceSpan = null;
Updater._totalSizeSpan = null;
Updater._cart = null;
