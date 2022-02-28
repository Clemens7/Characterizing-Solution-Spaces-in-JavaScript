import {render, getPrintSizes, calculatePrice} from "./frame.js";
import {getObject, cache} from './met-api.js'

export const initConfig = () => {
  const url = new URL(window.location);

  const params = {
    objectID: url.searchParams.get('objectID'),
    printSize: url.searchParams.get('printSize') ||
      document.querySelector('input[name="printSize"]:checked').value,
    frameStyle: url.searchParams.get('frameStyle') ||
      document.querySelector('input[name="frameStyle"]:checked').value,
    frameWidth: url.searchParams.get('frameWidth') ||
      document.querySelector('input[name="frameWidth"]').value * 10,
    matColor: url.searchParams.get('matColor') ||
      document.querySelector('input[name="matColor"]:checked').value,
    matWidth: url.searchParams.get('matWidth') ||
      document.querySelector('input[name="matWidth"]').value * 10,
  }

  const config = new Proxy(params, {
    set(obj, prop, value, ) {
      if (prop === 'frameWidthR' || prop === 'matWidthR') 

      if (prop === 'frameWidth' || prop === 'matWidth') {
        value *= 10
      }

      if (prop === 'printSize') {
        const size = document.querySelector(`input[value="${value}"] + label span`)
        document.getElementById('total-size').innerText = size.innerText
      }

      obj[prop] = value
      updatePreview(document.getElementById('preview-image'), config)
      return true;
    }
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
  img.onload = () => {
    const sizes = getPrintSizes(img)
    Object.entries(sizes).forEach(([name, sizes]) => {
      document.querySelector(`input[value="${name}"] + label span`).innerHTML = `${sizes[0]} × ${sizes[1]} cm`
    });

    document.querySelector('input[name="printSize"]:checked').dispatchEvent(new Event('change'))

    updatePreview(img, config)
  }
  img.src = item.primaryImageSmall
  // FIXME: The line before causes arbitrary failing tests for 'calculates price correctly', 'mat width stays within range' and 'frame width stays within range'. Without this line all tests (beside 'loads the correct artwork') are passing.
}

export const updatePreview = (img, config) => {
  render(
    img,
    document.getElementById('preview-container'),
    config.printSize,
    config.frameStyle,
    config.frameWidth,
    config.matColor,
    config.matWidth
  );

  let subtotal = calculatePrice(
    config.printSize,
    config.frameStyle,
    config.frameWidth,
    config.matWidth
  );

  document.getElementById("price").innerHTML = '€ ' + subtotal.toFixed(2);
}

export const roundWidth = (value) => {
  value = parseFloat(parseFloat(value).toFixed(1))
  return Number.isInteger(value)  : value
}
