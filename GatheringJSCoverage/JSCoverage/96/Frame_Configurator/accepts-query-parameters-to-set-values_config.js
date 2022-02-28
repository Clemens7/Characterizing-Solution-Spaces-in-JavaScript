import { getPrintSizes, render, calculatePrice } from '../../frame.js';
import { getQueryVariables, addCartItem, getCartItems, getArtworkMetadata } from '../util.js';

const queryParameters = getQueryVariables();

const previewImage = document.getElementById("preview-image");
const INPUT_LIST = {
    sizeList: document.getElementsByName('printSize'),
    submitButton: document.getElementById("submitButton"),
    frame: {
        input: document.getElementById("frameWidth"),
        range: document.getElementById("frameWidthR"),
        list: document.getElementsByName('frameStyle')
    },
    material: {
        input: document.getElementById("matWidth"),
        range: document.getElementById("matWidthR"),
        list: document.getElementsByName('matColor')
    }
};

var config = {
    objectID: 123,
    image: {},
    size: "S",
    frame: {
        width: 0.0,
        style: "natural"
    },
    material: {
        width: 0.0,
        color: "wine"
    }
}

initConfig();
initEventListener();

function initConfig() {
    initValues();
    setPreview(queryParameters.objectID);
    updatePrice();
}

function initValues() {
    if (queryParameters.printSize) {
        if (queryParameters.printSize == "S") 
        if (queryParameters.printSize == "M") {
            document.getElementById("print-size-m").checked = true;
        }
        if (queryParameters.printSize == "L") 
    }

    if (queryParameters.frameStyle) {
        if (queryParameters.frameStyle == "natural") 
        if (queryParameters.frameStyle == "classic") 
        if (queryParameters.frameStyle == "shabby") {
            document.getElementById("frame-style-shabby").checked = true;
        }
        if (queryParameters.frameStyle == "elegant") 
    }

    if (queryParameters.matColor) {
        if (queryParameters.matColor == "ivory") 
        if (queryParameters.matColor == "mint") {
            document.getElementById("mat-color-mint").checked = true;
        }
        if (queryParameters.matColor == "wine") 
        if (queryParameters.matColor == "indigo") 
        if (queryParameters.matColor == "coal") 
    }

    if (queryParameters.frameWidth) {
        var value = queryParameters.frameWidth / 10;
        if (value < 2)  else if (value > 5) 
        value = Math.round(value * 10) / 10;
        INPUT_LIST.frame.input.value = value;
        INPUT_LIST.frame.range.value = value;
    }

    if (queryParameters.matWidth) {
        var value = queryParameters.matWidth / 10;
        if (value < 0)  else if (value > 10) 
        value = Math.round(value * 10) / 10;
        INPUT_LIST.material.input.value = value;
        INPUT_LIST.material.range.value = value;
    }

    config = {
        objectID: queryParameters.objectID,
        image: document.getElementById("preview-image"),
        size: document.querySelector('input[name="printSize"]:checked').value,
        frame: {
            width: document.getElementById("frameWidth").value,
            style: document.querySelector('input[name="frameStyle"]:checked').value
        },
        material: {
            width: document.getElementById("matWidth").value,
            color: document.querySelector('input[name="matColor"]:checked').value
        }
    }

    document.getElementById("cart-link").innerHTML = "Cart (" + getCartItems().length + ")";
}

function setPreview(id) {
    getArtworkMetadata(id).then(function (data) {
        setLabel(data);
        config.image.onload = function () {
            paintImage();
            setPrintSizes();
        };
        config.image.src = data.primaryImageSmall;
    }, );
}

function paintImage() {
    render(config.image, document.getElementById("preview-container"), config.size, config.frame.style, config.frame.width, config.material.color, config.material.width);
}

function setLabel(data) {
    document.getElementById("previewArtist").innerHTML = data.artistDisplayName;
    document.getElementById("previewTitle").innerHTML = data.title;
    document.getElementById("previewYear").innerHTML = data.objectDate;
}

function setPrintSizes() {
    var sizes = getPrintSizes(config.image);
    document.getElementById("print-size-s-label").innerHTML = "Small <br>" + sizes.S[0] + " × " + sizes.S[1] + " cm"
    document.getElementById("print-size-m-label").innerHTML = "Medium <br>" + sizes.M[0] + " × " + sizes.M[1] + " cm"
    document.getElementById("print-size-l-label").innerHTML = "Large <br>" + sizes.L[0] + " × " + sizes.L[1] + " cm"
}

function updatePrice() {
    document.getElementById("price").innerHTML = "€ " + calculatePrice(config.size, config.frame.style, config.frame.width, config.material.width).toFixed(2);;
}

function initEventListener() {
    INPUT_LIST.frame.input.addEventListener("change", );
    INPUT_LIST.frame.range.addEventListener("change", );

    INPUT_LIST.material.input.addEventListener("change", );
    INPUT_LIST.material.range.addEventListener("change", );

    INPUT_LIST.sizeList.forEach(element => {
        element.addEventListener("change", );
    });

    INPUT_LIST.frame.list.forEach(element => {
        element.addEventListener("change", );
    });

    INPUT_LIST.material.list.forEach(element => {
        element.addEventListener("change", );
    });

    document.querySelectorAll('input').forEach(element => {
        element.addEventListener("change", );
    });

    INPUT_LIST.submitButton.addEventListener("click", );
}

