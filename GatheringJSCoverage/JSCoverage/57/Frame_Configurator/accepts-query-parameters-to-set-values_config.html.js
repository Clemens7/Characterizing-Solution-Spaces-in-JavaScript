
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

    const updatePreview = 

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

    const restrictValues = (value, min, max) => Math.round(Math.min(Math.max(value, min), max) * 10) / 10

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

    if (queryPrintSize) {
      const pSSelector = document.getElementById(`print-size-${queryPrintSize.toLowerCase()}`)
      if (pSSelector) {
        pSSelector.checked = true
      }
      printSize = queryPrintSize
    }
    if (queryFrameWidth) {
      const value = restrictValues(queryFrameWidth / 10, document.getElementById('frame-width-slider').min, document.getElementById('frame-width-slider').max)
      document.getElementById('frame-width-input').value = `${value}`
      document.getElementById('frame-width-slider').value = `${value}`
      frameWidth = value
    }
    if (queryMatWidth) {
      const value = restrictValues(queryMatWidth / 10 , document.getElementById('frame-mat-slider').min, document.getElementById('frame-mat-slider').max)
      document.getElementById('frame-mat-slider').value = `${value}`
      document.getElementById('frame-mat-input').value = `${value}`
      matWidth = value
    }
    if (queryFrameStyle) {
      const fSSelector = document.getElementById(`frame-style-${queryFrameStyle.toLowerCase()}`)
      if (fSSelector) {
        fSSelector.checked = true
      }
      frameStyle = queryFrameStyle
    }
    if (queryMatColor) {
      const mCSelector = document.getElementById(`mat-color-${queryMatColor.toLowerCase()}`)
      if (mCSelector) {
        mCSelector.checked = true
      }
      matColor = queryMatColor
    }

    // Add met to cart
    document.getElementById('add-to-cart').addEventListener('click', )
  