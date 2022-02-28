
    import { getArtById } from './apiCalls.js'
    import { render, getPrintSizes, calculatePrice } from './frame.js'
    import { store, retrieve } from './metCache.js'

    const urlParams = new URLSearchParams(window.location.search);
    const objectID = urlParams.get('objectID')
    const redirectToSearch = 

    let printSize = 'M'
    let frameStyle = 'natural'
    let frameWidth = 4
    let matColor = 'mint'
    let matWidth = 5.5

    const updatePreview = () => {
      render(document.getElementById('preview-image'), document.getElementById('preview-container'), printSize, frameStyle, frameWidth, matColor, matWidth)
      const sizes = getPrintSizes(document.getElementById('preview-image'))
      document.querySelector('#print-size-s-label span').innerHTML = `${sizes.S[0]} × ${sizes.S[1]} cm`
      document.querySelector('#print-size-m-label span').innerHTML = `${sizes.M[0]} × ${sizes.M[1]} cm`
      document.querySelector('#print-size-l-label span').innerHTML = `${sizes.L[0]} × ${sizes.L[1]} cm`
      document.getElementById('total-size').innerHTML = `${sizes.L[0] + frameWidth * 2 + matWidth * 2} × ${sizes.L[1] + frameWidth * 2 + matWidth * 2} cm`
      document.getElementById('price').innerHTML = `€ ${calculatePrice(printSize, frameStyle, frameWidth, matWidth).toFixed(2)}`
    }

    if (objectID) {
      // perform request only after dom is loaded
      document.addEventListener('DOMContentLoaded', async e => {
        const cart = JSON.parse(window.localStorage.getItem('cart'))
        if (cart ) 

        let artObject = retrieve(objectID)
        if (!artObject) {
          // No cached response
          artObject = await getArtById(objectID)
          store(objectID, artObject)
        }
        

        if (artObject.message) 

        const artImage = document.getElementById('preview-image')
        artImage.onload = updatePreview

        if (artObject.primaryImageSmall) {
          artImage.src = artObject.primaryImageSmall;
        }
        document.getElementById('image-label').innerHTML = `
          <span class="artist">${artObject.artistDisplayName}</span>
          <span class="title">${artObject.title}</span>,
          <span class="date">${artObject.objectDate}</span>
        `
      })
    }

    const restrictValues = 

    // Connect sliders with inputs
    document.getElementById('frame-width-input').addEventListener('change', )
    document.getElementById('frame-width-slider').addEventListener('change', )
    document.getElementById('frame-mat-input').addEventListener('change', )
    document.getElementById('frame-mat-slider').addEventListener('change', )
    // Add other event listeners
    const printSizeSelectors = document.querySelectorAll('input[name="printSize"]')
    for (const selector of printSizeSelectors) {
      selector.addEventListener('change', )
    }
    const frameStyleSelectors = document.querySelectorAll('input[name="frameStyle"]')
    for (const selector of frameStyleSelectors) {
      selector.addEventListener('change', )
    }
    const matColorSelectors = document.querySelectorAll('input[name="matColor"]')
    for (const selector of matColorSelectors) {
      selector.addEventListener('change', )
    }

    // Pre set params
    const queryPrintSize = urlParams.get('printSize')
    const queryFrameWidth = urlParams.get('frameWidth')
    const queryMatWidth = urlParams.get('matWidth')
    const queryFrameStyle = urlParams.get('frameStyle')
    const queryMatColor = urlParams.get('matColor')

    if (queryPrintSize) 
    if (queryFrameWidth) 
    if (queryMatWidth) 
    if (queryFrameStyle) 
    if (queryMatColor) 

    // Add met to cart
    document.getElementById('add-to-cart').addEventListener('click', )
  