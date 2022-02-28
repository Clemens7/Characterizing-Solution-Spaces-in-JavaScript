import * as Frame from './frame.js';
import API from "./APIRequests.js"
import Cart from "./ShoppingCart.js"

const configElements = {
    frameWidthSlider: document.getElementsByName("frameWidthR")[0],
    frameWidhtInput: document.getElementsByName("frameWidth")[0],
    matWidthSlider: document.getElementsByName("matWidth")[0],
    matWidthInput: document.getElementsByName("matWidthR")[0],
    frameStyleInputs: document.querySelectorAll(".frame-style-item > input"),
    matStyleInputs: document.querySelectorAll(".mat-color-item > input"),
    frameSizeInputs: document.querySelectorAll(".segmented > input"),
    previewImage: document.getElementById("preview-image"),
    previewContainer: document.getElementById("preview-container"),
    artistText: document.getElementsByClassName("artist")[0],
    titleText: document.getElementsByClassName("title")[0],
    sLabel: document.getElementById("print-size-s-label"),
    mLabel: document.getElementById("print-size-m-label"),
    lLabel: document.getElementById("print-size-l-label"),
    totalSize: document.getElementById("total-size"),
    price: document.getElementById("price"),
    buyButton: document.getElementsByClassName("buy")[0]
}

const defaults = {
    objectID: null,
    frameStyle: "natural",
    printSize: "M",
    frameWidth: 40,
    matColor: "mint",
    matWidth: 55
}

class QueryBoundValue {

    get value() {
        return this.__value
    }

    set value(val) {
        if (this.__validator)
            this.__value = this.__validator.validate(val)
        else
            this.__value = val
        this.__changeListener.forEach(elem => elem())
    }


    constructor(name, validator) {
        this.name = name
        this.__value = undefined
        this.__validator = validator
        this.__changeListener = []
    }

    addListener(func) {
        this.__changeListener.push(func)
    }
}


class ValidRange {

    constructor(start, end, increment) {
        this.start = start
        this.end = end
        this.increment = increment
    }

    /*
    // clamps the value into the specified range
    clamped(num) {
        if (num < this.start)
            return this.start
        else if (num > this.end)
            return this.end
        // when a number is entered we want to see if it is in a valid increment
        // to do that we subtract the integer part from floating point part
        // round to the nearest float and see how often our incremnet fits into the floating point part
        // we multiply the floored number with our increment by the calculated integer amount, this way
        // we get 4.9 if the user enters 4.89
        const floored = Math.floor(num)
        const significant = Math.fround(num - floored)
        const difference = significant / this.increment
        const closestInteger = Math.round(difference)
        // difference should now be really close to the next integer
        console.log("floor", floored, "sign", significant, "diff", difference, "closest int", closestInteger)
        return floored + this.increment * closestInteger
    }
    */

    clamped(num) {
        if (num < this.start)
            
        else if (num > this.end)
            

        var tempNumb = num * (1/this.increment)
        if (Number.isInteger(tempNumb)) {
            return num
        }
    }

    validate(value) {
        if (value === null || value === undefined)
            
        else
            return this.clamped(parseInt(value))
    }
}


class SetValidator {
    constructor(allowedValues) {
        this.__allowedValues = allowedValues
    }

    validate(value) {
        if (this.__allowedValues.indexOf(value) == -1)
            
        return value
    }
}


class Configurator {


    constructor() {
        // retrive all elements that will be used by the frame configurator

        this.objectID = new QueryBoundValue("objectID")
        this.printSize = new QueryBoundValue("printSize", new SetValidator(["M", "S", "L"]))
        this.frameStyle = new QueryBoundValue("frameStyle", new SetValidator(["natural", "classic", "shabby", "elegant"]))
        this.frameWidth = new QueryBoundValue("frameWidth", new ValidRange(20, 50, 1))
        this.matColor = new QueryBoundValue("matColor", new SetValidator(["mint", "ivory", "wine", "indigo", "coal"]))
        this.matWidth = new QueryBoundValue("matWidth", new ValidRange(0, 100, 1))

        this.__printSizes = null
        this.__cart = new Cart()

        // initalize image loader 
        this.__loader = new ImageLoader(configElements.previewImage)

        // get the initial params
        this.__params = new URLSearchParams(window.location.search)

        this.all = [this.objectID, this.printSize, this.frameStyle, this.frameWidth, this.matColor, this.matWidth].map(e => {
            const urlParam = this.__params.get(e.name)
            // get url value or default if not set
            if (urlParam === undefined || urlParam === null) {
                e.value = defaults[e.name]
            } else {
                e.value = this.__params.get(e.name)
            }
            // add listeners so that the url updates when changes are mad
            e.addListener(() => {
                this.__params.set(e.name, e.value)  // update the query param when value changes
                this.__updateParams()
                // we have changed something so we should call render
                this.__rerender()
                // we need to recalc price and final size
                this.__recalcSizeAndPrice()
            })
            return e    // return the element ie mapping onto itself
        })

        this.__handleImageLoad()
        this.__setup()
        this.__cart.updateHeader()
    }

    async __handleImageLoad() {
        try {
            const loader = await this.__loader.load(this.objectID.value)
            configElements.titleText.innerHTML = loader.title
            configElements.artistText.innerHTML = loader.artist
            // we want to update the Small, Medium and Large lables
            const size = loader.sizes
            this.__printSizes = size
            const lab = (s) => (s[0] / 10) + " × " + (s[1] / 10) + " cm"
    
            configElements.sLabel.innerHTML = "Small <br> " + lab(size.S)
            configElements.mLabel.innerHTML = "Medium <br> " + lab(size.M)
            configElements.lLabel.innerHTML = "Large <br> " + lab(size.L)
            this.__rerender()
            this.__recalcSizeAndPrice()
        } 
    }

    __recalcSizeAndPrice() {
        const selectedSize = this.__printSizes[this.printSize.value]
        const sum = parseInt(this.frameWidth.value) + parseInt(this.matWidth.value)
        const width = parseInt(selectedSize[0]) + sum
        const height = parseInt(selectedSize[1]) + sum
        configElements.totalSize.innerHTML = `${width / 10} × ${height / 10} cm`
        configElements.price.innerHTML = "€ " + Frame.calculatePrice(this.printSize.value, this.frameStyle.value, this.frameWidth.value, this.matWidth.value).toFixed(2)
    }

    __setup() {
        this.__setupSlider(this.frameWidth, configElements.frameWidthSlider, configElements.frameWidhtInput, new ValidRange(2, 5, 0.1))
        this.__setupSlider(this.matWidth, configElements.matWidthSlider, configElements.matWidthInput, new ValidRange(0, 10, 0.1))
        this.__setupRadios(configElements.frameStyleInputs, this.frameStyle)
        this.__setupRadios(configElements.matStyleInputs, this.matColor)
        this.__setupRadios(configElements.frameSizeInputs, this.printSize)
        configElements.buyButton.onclick = 
    }

    __rerender() {
        Frame.render(
            configElements.previewImage,
            configElements.previewContainer,
            this.printSize.value,
            this.frameStyle.value,
            this.frameWidth.value,
            this.matColor.value,
            this.matWidth.value
        )
    }

    __updateParams() {
        // see https://stackoverflow.com/questions/5546207/how-to-set-querystring-with-javascript
        window.history.replaceState({}, '', `${location.pathname}?${this.__params.toString()}`);
    }

    __setupSlider(param, sliderElem, inputElem, validRange) {
        // we set initial values here
        const val = validRange.clamped(param.value / 10)
        sliderElem.value = val
        inputElem.value = val
        sliderElem.oninput = () => {
            inputElem.value = sliderElem.value
        }
        inputElem.oninput = () => {
            sliderElem.value = inputElem.value
        }
        // check values on change
        [inputElem, sliderElem].forEach(e => {
            e.onchange = () => {
                e.value = validRange.clamped(e.value)
                param.value = e.value * 10
            }
        })
    }
    __setupRadios(elements, prop) {
        elements.forEach(elem => {
            if (elem.value === prop.value) {
                elem.checked = true
            } else {
                elem.checked = false
            }
            elem.onchange = () => {
                prop.value = elem.value
            }
        })
    }
}

// this class should be reusable in the search as well
class ImageLoader {

    get artist() {
        return this.__currentJSON.artistDisplayName 
    }

    get title() {
        return (this.__currentJSON.title ) + (" ca " + this.__currentJSON.objectDate)
    }

    get sizes() {
        return Frame.getPrintSizes(this.__imgElement)
    }

    constructor(imgElem) {
        this.__imgElement = imgElem
        this.__currentJSON = null
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.addEventListener('load', _ => resolve(img))
          img.addEventListener('error', )
          img.src = url
        })
      }

    async load(objectID) {
        if (objectID === null) 
        const objJSON = await API.getObject(objectID)
        if (!objJSON)
            
        const imageURL = objJSON.primaryImageSmall
        this.__currentJSON = objJSON
        const image = await this.loadImage(imageURL)
        this.__imgElement.src = image.src
        return this
    }


}


const conf = new Configurator()
