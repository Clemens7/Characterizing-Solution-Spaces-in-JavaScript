import { getPrintSizes, render, calculatePrice } from "./frame.js";

import { fetchObject } from "./search.js";

class Configurator {
    objectID;
    previewImage;
    previewContainer;
    imageLabel;
    query;
    printSize;
    frameStyle;
    frameWidth;
    matColor;
    matWidth;

    constructor() {
        this.previewImage = document.getElementById("preview-image");
        this.previewContainer = document.getElementById("preview-container");
        this.imageLabel = document.getElementById("image-label");
        this.checkParameters();
        this.initializeListeners();
        fetchObject(this.query).then(
            (result) => {
                if (result.objectID === undefined) 
                //console.log({ "result": result });
                this.objectID = result.objectID;
                this.previewImage.onload = () => {
                    this.updateControls();
                    this.initPrintSize();
                }
                this.previewImage.src = result.primaryImageSmall;
                this.imageLabel.innerHTML = `
                    <span class="artist">${result.artistDisplayName}</span>
                    <span class="title">${result.title}</span>, 
                    <span class="date">${result.objectDate}</span>`;
            }
        );
    }

    checkParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        this.query = urlParams.get("objectID");
        if (this.query == null) 
        this.setPrintSize(urlParams.get("printSize"));
        this.setFrameStyle(urlParams.get("frameStyle"));
        this.setFrameWidth(urlParams.get("frameWidth") / 10);
        this.setMatColor(urlParams.get("matColor"));
        this.setMatWidth(urlParams.get("matWidth") / 10);
    }

    updateControls() {
        this.setPrintSize(this.printSize);
        this.setFrameStyle(this.frameStyle);
        this.setFrameWidth(this.frameWidth);
        this.setMatColor(this.matColor);
        this.setMatWidth(this.matWidth);
        this.render();
    }

    initializeListeners() {
        document.getElementsByName("matWidth")[0].onchange = (e) => {
            this.setMatWidth(e.target.value);
            this.render();
        }
        document.getElementsByName("matWidthR")[0].oninput = 
        document.getElementsByName("frameWidth")[0].onchange = 
        document.getElementsByName("frameWidthR")[0].oninput = 

        for (let radio of document.getElementsByName("printSize")) {
            radio.onchange = 
        }

        for (let radio of document.getElementsByName("frameStyle")) {
            radio.onchange = 
        }

        for (let radio of document.getElementsByName("matColor")) {
            radio.onchange = 
        }
    }

    setMatWidth(value) {
        value = Math.round(parseFloat(value) * 10) / 10;
        const input = document.getElementsByName("matWidth")[0];
        const range = document.getElementsByName("matWidthR")[0];
        const max = parseInt(range.max);
        const min = parseInt(range.min);
        
        if (isNaN(value)) 

        if (value > max)  else if (value < min)  else {
            this.matWidth = value;
        }

        range.value = this.matWidth;
        input.value = this.matWidth;
    }

    initPrintSize() {
        this.printSizes = getPrintSizes(this.previewImage);
        document.getElementById("print-size-s-label").innerHTML = `Small<br>${this.printSizes['S'][0]} × ${this.printSizes['S'][1]} cm`;
        document.getElementById("print-size-m-label").innerHTML = `Medium<br>${this.printSizes['M'][0]} × ${this.printSizes['M'][1]} cm`;
        document.getElementById("print-size-l-label").innerHTML = `Large<br>${this.printSizes['L'][0]} × ${this.printSizes['L'][1]} cm`;
    }

    setPrintSize(value) {
        if (['S', 'M', 'L'].includes(value)) {
            document.querySelector(`input[name="printSize"][value="${value}"]`).checked = true;
        } else {
            this.printSize = document.querySelector(`input[name="printSize"]:checked`).value;
        }
    }

    setMatColor(value) {
        if (["ivory", "mint", "wine", "indigo", "coal"].includes(value)) {
            document.querySelector(`input[name="matColor"][value="${value}"]`).checked = true;
        } else {
            this.matColor = document.querySelector(`input[name="matColor"]:checked`).value;
        }
    }

    setFrameStyle(value) {
        if (["classic", "natural", "shabby", "elegant"].includes(value)) {
            document.querySelector(`input[name="frameStyle"][value="${value}"]`).checked = true;
        } else {
            this.frameStyle = document.querySelector(`input[name="frameStyle"]:checked`).value;
        }
    }

    setFrameWidth(value) {
        value = Math.round(parseFloat(value) * 10) / 10;
        const input = document.getElementsByName("frameWidth")[0];
        const range = document.getElementsByName("frameWidthR")[0];
        const max = parseInt(range.max);
        const min = parseInt(range.min);

        if (isNaN(value)) 

        if (value > max)  else if (value < min) {
            this.frameWidth = min;
        } else {
            this.frameWidth = value;
        }

        range.value = this.frameWidth;
        input.value = this.frameWidth;
    }

    render() {
        render(this.previewImage, this.previewContainer, this.printSize, this.frameStyle, this.frameWidth * 10, this.matColor, this.matWidth * 10);
        this.updatePrice();
        this.updateTotalSize();
    }

    updatePrice() {
        document.getElementById("price").innerText = "€ " + calculatePrice(this.printSize, this.frameStyle, this.frameWidth * 10, this.matWidth * 10).toFixed(2);
    }

    updateTotalSize() {
        let sizes = getPrintSizes(this.previewImage)[this.printSize];
        let width = sizes[0] + 2 * (this.frameWidth + this.matWidth);
        let height = sizes[1] + 2 * (this.frameWidth + this.matWidth);
        document.getElementById("total-size").innerText = `${width} × ${height} cm`;
    }

    
}







async function cartCount() {

    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]");
    }

    /* show number of items in cart */
    const cart = JSON.parse(localStorage.getItem("cart"));
    let itemCount = cart.length;
	
	if (itemCount < 1) {
		document.getElementById("cart-link").innerText = 'Cart';
	}
}

export { Configurator, addToCart, cartCount }