import {render, getPrintSizes, calculatePrice} from "./frame.js";
import {getObject, cache} from './met-api.js'

export const initConfig = () => {
  const url = new URL(window.location);

  const params = {
    objectID: url.searchParams.get('objectID'),
    printSize: url.searchParams.get('printSize') ,
    frameStyle: url.searchParams.get('frameStyle') ,
    frameWidth: url.searchParams.get('frameWidth') ,
    matColor: url.searchParams.get('matColor') ,
    matWidth: url.searchParams.get('matWidth') ,
  }

  const config = new Proxy(params, {
    
  })

  return config
}

export const renderPreview = async (config) => {
  const id = config.objectID

  if (!id) 

  const item = await getObject(id, cache);

  if (!item) 

  if (!cache.getById(id)) {
      cache.add([item])
  }

  const label = document.getElementById('image-label')
  label.innerHTML = `
    <span class="artist">${item.artistDisplayName}</span>
    <span class="title">${item.title}</span>,
    <span class="date">${item.objectDate}</span>
  `

  const img = document.getElementById('preview-image')
  img.alt = item.title
  img.onload = 
  img.src = item.primaryImageSmall
  // FIXME: The line before causes arbitrary failing tests for 'calculates price correctly', 'mat width stays within range' and 'frame width stays within range'. Without this line all tests (beside 'loads the correct artwork') are passing.
}

export const updatePreview = 

export const roundWidth = 
