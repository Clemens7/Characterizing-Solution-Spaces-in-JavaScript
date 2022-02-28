var __awaiter = (this ) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value ; }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); }  }
        
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getPrintSizes, render, calculatePrice } from './frame.js';
import { ShoppingCart } from "./classes.js";
class FrameConfigurator {
    constructor() {
        this.matWidth = 5.5;
        this.matColor = 'mint';
        this.frameWidth = 4;
        this.printSize = 'M';
        this.frameStyle = 'natural';
    }
    fetchObjectById() {
        return __awaiter(this, void 0, void 0, function* () {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('objectID')) {
                let localStorageObjects = JSON.parse(localStorage.getItem('objects')) || [];
                const objectID = Number.parseInt(urlParams.get('objectID'));
                let object = localStorageObjects.find();
                if (!object) {
                    const response = yield fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
                    const json = yield response.json();
                    if (response.status === 404 || !response.ok) 
                    object = json;
                    if (localStorageObjects) {
                        localStorageObjects.push(json);
                    }
                    localStorage.setItem('objects', JSON.stringify(localStorageObjects));
                }
                document.getElementById('image-label').innerHTML = `${object.title} - ${object.artistDisplayName} (${object.objectDate})`;
                this.imgContainer = document.getElementById('preview-container');
                this.previewImage = document.getElementById('preview-image');
                this.previewImage.src = object.primaryImageSmall;
                this.previewImage.style.opacity = '0';
                this.previewImage.onload = () => {
                    this.updateFramePreview();
                    this.previewImage.style.opacity = '1';
                };
            }
        });
    }
    presetFrameParametersByQueryParams() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('printSize')) 
        if (urlParams.has('frameWidth')) 
        if (urlParams.has('matColor')) 
        if (urlParams.has('frameStyle')) 
        if (urlParams.has('matWidth')) 
    }
    initHtmlElements() {
        this.frameWidthSliderElement = document.getElementById('frame-width-slider');
        this.frameWidthTextElement = document.getElementById('frame-width-text');
        this.matWidthSlider = document.getElementById('mat-width-slider');
        this.matWidthText = document.getElementById('mat-width-text');
    }
    initOnChangeListeners() {
        this.frameWidthSliderElement.addEventListener('change', );
        this.frameWidthTextElement.addEventListener('change', );
        this.matWidthSlider.addEventListener('change', );
        this.matWidthText.addEventListener('change', (event) => {
            this.onChangeMatWidth(event);
        });
        const matColorRadios = document.querySelectorAll('input[type=radio][name="matColor"]');
        matColorRadios.forEach((radio) => {
            radio.addEventListener('change', );
        });
        const printSizeRadios = document.querySelectorAll('input[type=radio][name="printSize"]');
        printSizeRadios.forEach((radio) => {
            radio.addEventListener('change', );
        });
        const frameStyleRadios = document.querySelectorAll('input[type=radio][name="frameStyle"]');
        frameStyleRadios.forEach((radio) => {
            radio.addEventListener('change', );
        });
    }
    
    onChangeMatWidth(event) {
        this.matWidth = Number.parseFloat(event.target.value);
        this.validateMatWidth();
        this.matWidthText.value = this.matWidth.toString();
        this.matWidthSlider.value = this.matWidth.toString();
        this.updateFramePreview();
    }
    validateMatWidth() {
        if (this.matWidth > 10) {
            this.matWidth = 10;
        }
        else if (this.matWidth < 0) {
            this.matWidth = 0;
        }
        this.matWidth = Math.round(this.matWidth * 10) / 10;
    }
    
    updateFramePreview() {
        this.updatePrintSizesAndPrize();
        render(this.previewImage, this.imgContainer, this.printSize, this.frameStyle, this.frameWidth, this.matColor, this.matWidth);
    }
    updatePrintSizesAndPrize() {
        const printSizes = getPrintSizes(this.previewImage);
        document.getElementById('print-size-s-label').innerHTML = `Small<br>${printSizes.S[0] / 10} x ${printSizes.S[1] / 10} cm`;
        document.getElementById('print-size-m-label').innerHTML = `Medium<br>${printSizes.M[0] / 10} x ${printSizes.M[1] / 10} cm`;
        document.getElementById('print-size-l-label').innerHTML = `Large<br>${printSizes.L[0] / 10} x ${printSizes.L[1] / 10} cm`;
        const totalPrintSize = [
            (printSizes[this.printSize][0] / 10 + this.frameWidth * 2 + this.matWidth * 2).toFixed(1),
            (printSizes[this.printSize][1] / 10 + this.frameWidth * 2 + this.matWidth * 2).toFixed(1),
        ];
        document.getElementById('total-size').innerHTML = `${totalPrintSize[0]} x ${totalPrintSize[1]} cm`;
        const totalPrice = calculatePrice(this.printSize, this.frameStyle, this.frameWidth, this.matWidth);
        document.getElementById('price').innerHTML = `€ ${totalPrice.toFixed(2)}`;
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    let frameConfigurator = new FrameConfigurator();
    frameConfigurator.initHtmlElements();
    frameConfigurator.presetFrameParametersByQueryParams();
    frameConfigurator.initOnChangeListeners();
    yield frameConfigurator.fetchObjectById();
    frameConfigurator.updatePrintSizesAndPrize();
    const shoppingCart = new ShoppingCart();
    shoppingCart.setShoppingCartLinkValue();
}))();
