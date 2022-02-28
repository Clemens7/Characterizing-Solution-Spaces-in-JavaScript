import artCollectionService from './services/art_collection_service.js';
import { getPrintSizes, render, calculatePrice } from './frame.js';
import cartService from "./services/cart_service.js";
import { CartItem } from "./services/cart_service.js";

class Config {

    _framePreview;
    _totalSizeContainer;
    _totalSizes = { S: [0, 0], M: [0, 0], L: [0, 0] };
    _priceContainer;

    _objectId;
    _printSize;
    _frameWidth;
    _frameStyle;
    _matWidth;
    _matColor;

    constructor() {
        const cartLink = document.getElementById('cart-link');
        if (cartLink && cartService.length !== 0) 

        const configForm = document.getElementById('config-form');
        if (configForm) {
            configForm.addEventListener('submit', this.onSubmit);
        }

        this._totalSizeContainer = document.getElementById('total-size');
        this._priceContainer = document.getElementById('price');

        const searchParams = new URL(window.location.href).searchParams;
        this._printSize = searchParams.get('printSize') !== null  : 'M';
        this._frameWidth = searchParams.get('frameWidth') !== null  : 40;
        this._frameStyle = searchParams.get('frameStyle') !== null  : 'natural';
        this._matWidth = searchParams.get('matWidth') !== null  : 50;
        this._matColor = searchParams.get('matColor') !== null  : 'mint';

        this._framePreview = new FramePreview('preview-image', 'preview-container', (sizes) => {
            this._totalSizes = sizes;
            this.updateFrame();
            this.updateTotalSize();
            this.updatePrice();
            for (let entry of [{ size: 'S', id: 'print-size-s-label' }, { size: 'M', id: 'print-size-m-label' }, { size: 'L', id: 'print-size-l-label' }]) {
                const printSizeTextNode = document.getElementById(entry.id).lastChild;
                if (printSizeTextNode) {
                    printSizeTextNode.nodeValue = `${this._totalSizes[entry.size][0] / 10} × ${this._totalSizes[entry.size][1] / 10} cm`;
                }
            }
        });
        new RadioInput('printSize', (printSize) => { this._printSize = printSize; this.updateFrame(); this.updateTotalSize(); this.updatePrice(); }, this._printSize);
        new RangeNumberInput('frameWidthNumberInput', 'frameWidthRangeInput', (frameWidth) => { this._frameWidth = frameWidth * 10; this.updateFrame(); this.updateTotalSize(); this.updatePrice(); }, this._frameWidth / 10, (value) => value < 2  : (value > 5  : Math.round(parseFloat(value) * 10) / 10));
        new RadioInput('frameStyle', (frameStyle) => { this._frameStyle = frameStyle; this.updateFrame(); this.updatePrice(); }, this._frameStyle);
        new RangeNumberInput('matWidthNumberInput', 'matWidthRangeInput', (matWidth) => { this._matWidth = matWidth * 10; this.updateFrame(); this.updateTotalSize(); this.updatePrice(); }, this._matWidth / 10, (value) => value < 0 ? 0 : (value > 10 ? 10 : Math.round(parseFloat(value) * 10) / 10));
        new RadioInput('matColor', (matColor) => { this._matColor = matColor; this.updateFrame(); }, this._matColor);

        this._objectId = parseInt(searchParams.get('objectID'));
        if (!this._objectId)  else {
            this.fetchObject(this._objectId);
        }
    }

    fetchObject = (objectId) => {
        artCollectionService.fetchObject(objectId).then((value) => {
            if (value.message ) 
            this._framePreview.objectData = value;
        });
    };

    updateFrame = () => {
        this._framePreview.updateFrame(this._printSize, this._frameStyle, this._frameWidth, this._matColor, this._matWidth);
    };

    updateTotalSize = () => {
        if (this._totalSizeContainer) {
            const matPlusFrame = (this._matWidth + this._frameWidth) * 2;
            this._totalSizeContainer.innerText = `${(this._totalSizes[this._printSize][0] + matPlusFrame) / 10} × ${(this._totalSizes[this._printSize][1] + matPlusFrame) / 10} cm`;
        }
    };

    updatePrice = () => {
        if (this._priceContainer) {
            this._priceContainer.innerText = `€ ${calculatePrice(this._printSize, this._frameStyle, this._frameWidth, this._matWidth).toFixed(2)}`;
        }
    };

    onSubmit = ;
}

class FramePreview {

    _image;
    _imageContainer;
    _imageLoaded = false;
    _onLoad;

    constructor(imageId, imageContainerId, onLoad) {
        this._image = document.getElementById(imageId);
        this._image.style.display = 'none';
        this._imageContainer = document.getElementById(imageContainerId);
        this._onLoad = onLoad;
    }

    set objectData(value) {
        if (this._image) {
            this._image.onload = () => {
                this._imageLoaded = true;
                if (this._onLoad) {
                    this._onLoad(getPrintSizes(this._image));
                }
            };
            this._image.src = value.primaryImageSmall;
            const imageLabel = document.getElementById('image-label');
            if (imageLabel) {
                imageLabel.innerHTML = `<span class="artist">${ value.artistDisplayName }</span><span class="title">${ value.title }</span>, <span class="date">${ value.objectDate }</span>`; // innerHTML since only set once
            }
        }
    }

    updateFrame = (printSize, frameStyle, frameWidth, matColor, matWidth) => {
        if (this._imageLoaded && this._image && this._imageContainer) {
            render(this._image, this._imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth);
            this._image.style.display = 'block';
        }
    }
}

class RangeNumberInput {

    _value;
    _inputNumber;
    _inputRange;
    _onChange;
    _correct;

    constructor(inputNumberId, inputRangeId, onChange, value = 0, correct = ) {
        this._inputNumber = document.getElementById(inputNumberId);
        this._inputRange = document.getElementById(inputRangeId);
        this._onChange = onChange;
        this._correct = correct;
        if (this._inputNumber) {
            this._inputNumber.addEventListener('change', this.onChange);
        }
        if (this._inputRange) {
            this._inputRange.addEventListener('input', this.onChange);
        }
        this.value = value;
    }

    set value(value) {
        value = this._correct(value);
        this._value = parseFloat(value);
        if (this._inputNumber) {
            this._inputNumber.value = this._value; // changes UI -> influences looks
            this._inputNumber.setAttribute('value', this._value); // changes value attribute -> tested against
        }
        if (this._inputRange) {
            this._inputRange.value = this._value;
            this._inputRange.setAttribute('value', this._value);
        }
        if (this._onChange) {
            this._onChange(this._value);
        }
    }

    onChange = (event) => {
        this.value = event.target.value;
    };
}

class RadioInput {

    _value;
    _inputs = [];
    _onChange;

    constructor(radioGroupName, onChange, value = 0) {
        const inputs = document.getElementsByName(radioGroupName);
        for (let input of inputs) {
            this._inputs.push(input);
            input.addEventListener('change', this.onChange);
        }
        this._onChange = onChange;
        this.value = value;
    }

    set value(value) {
        this._value = value;
        for (let input of this._inputs) {
            if (input.value === this._value) {
                input.checked = true;
                break; // seems like radio button checked previously is unchecked automatically
            }
        }
        if (this._onChange) {
            this._onChange(value);
        }
    }

    onChange = ;
}

new Config();
