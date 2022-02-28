import { render, calculatePrice, getPrintSizes } from "./frame.js"


const fetchImage = (objectID) => {
    return fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
        .then(res => {
            if (res.status !== 200) 
            return res.json()
        })
}

const setParam = (key, value) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(key, value)
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?${searchParams}`;
    window.history.pushState({ path: newurl }, '', newurl);
}

const urlParams = new URLSearchParams(window.location.search)
const objectID = urlParams.get("objectID")

const startFrameConfig = (data) => {
    {
        console.log(data);
        localStorage[data.objectID] = JSON.stringify(data)

        const frameNumber = document.querySelector("#frame-width-number")
        const priceContainer = document.querySelector("#price")
        const frameSlider = document.querySelector("#frame-width-slider")
        const matNumber = document.querySelector("#mat-number")
        const printSizes = document.getElementsByName("printSize")
        const printSizesLabels = document.querySelectorAll(".segmented > label")
        const frameStyles = document.getElementsByName("frameStyle")
        const matColors = document.getElementsByName("matColor")
        const matSlider = document.querySelector("#mat-slider")
        const form = document.querySelector("form")

        if (!objectID) 

        // SET CART ITEM QUANTITY AND DISPLAY IF GREATER THAN 0
        const cart = JSON.parse(localStorage.getItem("cart"))

        if (cart) 

        //STATE
        const urlParams = new URLSearchParams(window.location.search)
        let frameWidth = urlParams.get("frameWidth")
        let matWidth = urlParams.get("matWidth")
        let printSize = urlParams.get("printSize")
        let frameStyle = urlParams.get("frameStyle")
        let matColor = urlParams.get("matColor")
        let sizes = {}

        if (!frameWidth) {
            frameWidth = frameNumber.value
            setParam("frameWidth", frameNumber.value)
        }

        if (!matWidth) {
            matWidth = matNumber.value
            setParam("matWidth", matNumber.value)
        }


        if (printSize) 

        if (frameStyle) 

        if (matColor) 

        if (frameWidth) {
            frameNumber.value = frameWidth
            frameSlider.value = frameWidth
        }

        if (matWidth) {
            matNumber.value = matWidth
            matSlider.value = matWidth
        }

        //frame size
        printSizes.forEach(p => {
            if (p.checked) {
                setParam("printSize", p.value)
                printSize = p.value
            }
            p.addEventListener("click", )
        })

        frameStyles.forEach(p => {
            if (p.checked) {
                setParam("frameStyle", p.value)
                frameStyle = p.value
            }
            p.addEventListener("click", )
        })

        matColors.forEach(p => {
            if (p.checked) {
                setParam("matColor", p.value)
                matColor = p.value
            }
            p.addEventListener("click", )
        })

        const renderPrice = (printSize, frameStyle, frameWidth, matWidth) => {
            let price = calculatePrice(printSize, frameStyle, frameWidth, matWidth)
            priceContainer.textContent = "€ " + price.toFixed(2)
        }

        const setPrintSize = (sizes) => {
            printSizesLabels.forEach((p, idx) => {
                p.innerHTML = p.innerHTML.replace(/0 × 0/g, `${Object.values(sizes)[idx][0] / 10} × ${Object.values(sizes)[idx][1] / 10}`)
            })
        }

        const renderSize = (sizes, printSize, matWidth, frameWidth) => {
            const total = document.querySelector("#total-size")
            total.textContent = `${(sizes[printSize][0] / 10) + parseInt(frameWidth) + + parseInt(matWidth)} × ${(sizes[printSize][1] / 10) + parseInt(frameWidth) + parseInt(matWidth)} cm`
        }

        //get image on page
        const previewImage = document.querySelector("#preview-image")
        const imageContainer = document.querySelector("#preview-container")
        const imageLabel = document.querySelector("#image-label")


        frameNumber.addEventListener("change", () => {
            let width = (Number(frameNumber.value).toFixed(1) * 100) / 100
            console.log(width);
            if (width > 5) {
                width = 5;
                frameNumber.value = width
            }
            if (width < 2) {
                width = 2;
                frameNumber.value = width
            }
            frameSlider.value = width;
            frameNumber.value = width;
            frameWidth = width
            setParam("frameWidth", width)
            render(previewImage, imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth)
            renderPrice(printSize, frameStyle, frameWidth, matWidth)
            renderSize(sizes, printSize, matWidth, frameWidth)
        })

        frameSlider.addEventListener("change", )

        matNumber.addEventListener("change", )

        matSlider.addEventListener("change", )

        form.addEventListener("submit", )

        previewImage.src = data.primaryImageSmall
        render(previewImage, imageContainer, printSize, frameStyle, frameWidth, matColor, matWidth)
        renderPrice(printSize, frameStyle, frameWidth, matWidth)
        sizes = getPrintSizes(previewImage)
        setPrintSize(sizes)
        renderSize(sizes, printSize, matWidth, frameWidth)

        imageLabel.innerHTML = `<strong>${data.artistDisplayName}</strong> <br> ${data.title}, ${data.objectDate}`
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const cachedImage = JSON.parse(localStorage.getItem(objectID))
    if (cachedImage)  else {
        fetchImage(objectID).then(data => startFrameConfig(data))
    }
})
