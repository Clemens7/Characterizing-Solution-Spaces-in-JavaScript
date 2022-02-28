import { render, getPrintSizes, calculatePrice } from './frame.js'
import { addToCart, diplayCartItems } from './cart.js'
import { getObjectCached } from './artwork-api.js'
import { appendDescription, createArtworkImage } from './artwork-dom.js'

let printSizes, selectedPrintSize, frameStyle, frameWidth, matColor, matWidth, objectId

window.addEventListener('load', async () => {
    diplayCartItems()    

    const [url, params] = window.location.href.split('?')
    const urlParams = new URLSearchParams(params);
    objectId = urlParams.get('objectID');
    selectedPrintSize = urlParams.get('printSize')
    frameStyle = urlParams.get('frameStyle')
    frameWidth = urlParams.get('frameWidth')
    matColor = urlParams.get('matColor')
    matWidth = urlParams.get('matWidth')

    updateInputs()

    console.log(objectId)

    if(objectId == null) 
    await loadImage(objectId);
	
	const frameSlider = document.querySelector("#frameSlider")
	const frameInput = document.querySelector("#frameInput")
	
	frameSlider.addEventListener("change",  )
	
	frameInput.addEventListener("change", () => {
        frameInput.value = Math.round(Math.min(Math.max(frameInput.value, 2), 5) * 10)/10
        frameSlider.value = Math.round(Math.min(Math.max(frameInput.value, 2), 5) * 10)/10
	} )
	
	const matSlider = document.querySelector("#matSlider")
	const matInput = document.querySelector("#matInput")
	
	matSlider.addEventListener("change",  )
	
	matInput.addEventListener("change", () => {
        matInput.value = Math.round(Math.min(Math.max(matInput.value, 0), 10) * 10)/10
		matSlider.value = Math.round(Math.min(Math.max(matInput.value, 0), 10) * 10)/10
	} )
	
	document.querySelector('#config-form').addEventListener("change", () => {
		updatePreview()
    } )

    document.querySelector('#config-form').addEventListener("submit", onAddToCart, false)
	
	
})


function updatePreview(){
	 //print size, frame width, frame style, mat width, mat color
	
	const printSize = document.querySelector('#config-form').printSize.value 
	const frameWidth = document.querySelector('#config-form').frameWidth.value 
	const frameStyle = document.querySelector('#config-form').frameStyle.value 
	const matColor = document.querySelector('#config-form').matColor.value  
	const matWidth = document.querySelector('#config-form').matWidth.value 
	const img = document.querySelector('#preview-image')
	const container = document.querySelector('#preview-container')

    const price = document.querySelector('#price')
	
	render(img, container, printSize, frameStyle, frameWidth, matColor, matWidth)
	
	const total = document.querySelector('#total-size')
	
	const totalWidth = printSizes[printSize][0]+frameWidth*2+matWidth*2
	const totalHeight = printSizes[printSize][1]+frameWidth*2+matWidth*2
	
	total.textContent = `${Math.round(totalWidth)} x ${Math.round(totalHeight)} cm`

    price.innerHTML = '€ ' + calculatePrice(printSize, frameStyle, frameWidth, matWidth).toLocaleString(undefined, {minimumFractionDigits: 2})
}



function updateInputs() {
    if(selectedPrintSize != null) 
    if(frameWidth != null) 

    if(matColor != null) 

    if(matWidth != null) 
	
	if(frameStyle != null) 
    
}

async function loadImage(objectId) {
    let responseBody
    try {
        responseBody = await getObjectCached(objectId)
    } 
    const image = createArtworkImage(responseBody)

    const previewImageEl = document.querySelector('#preview-image')
    const previewLabelEl = document.querySelector('#image-label')

    previewImageEl.src = responseBody.primaryImageSmall
    previewImageEl.alt = responseBody.title

    appendDescription(previewLabelEl, responseBody.artistDisplayName, responseBody.title, responseBody.objectDate)

    image.addEventListener('load', () => {
        printSizes = getPrintSizes(image)

        const slabelEL = document.querySelector('#print-size-s-label')
        slabelEL.lastChild.textContent = printSizeToString(printSizes.S)
        const mlabelEl = document.querySelector('#print-size-m-label')
        mlabelEl.lastChild.textContent = printSizeToString(printSizes.M)
        const llabelEl = document.querySelector('#print-size-l-label')
        llabelEl.lastChild.textContent = printSizeToString(printSizes.L)
		
		updatePreview()
    })
}

function printSizeToString(printSize) {
    return `${printSize[0]} x ${printSize[1]} cm`
}

