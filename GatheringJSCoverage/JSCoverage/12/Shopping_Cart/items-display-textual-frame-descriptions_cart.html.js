

  import {getObject, cache} from './met-api.js'
  import {render} from "./frame.js";
  import {calculatePrice} from "./frame.js";

  let cart = JSON.parse(localStorage.getItem('cart')) ;

  if (!cart.length) else {
    showAll()
    document.getElementById('cart-link').innerHTML = `Cart (${cart.length})`
  }

  async function showAll() {
    cart.forEach(async (item, index) => {

      const itemAPI = await getObject(item.objectID, cache)

      if (!cache.getById(item.objectID)) {
        cache.add([itemAPI])
      }

      document.querySelector('.cart-total').insertAdjacentHTML('beforebegin', `
        <div class="cart-item" id="cart-item-${index}">
          <div class="cart-preview">
            <div class="thumb">
              <a href="/config.html?${new URLSearchParams(item)}" id="object-${item.objectID}">
              </a>
            </div>
          </div>
          <div class="museum-label">
            <div>
              <span class="artist">${itemAPI.artistDisplayName}</span>
              <span class="title">${itemAPI.title},</span>
              <span class="date">${itemAPI.objectDate}</span>
              <br><br>
              <span class="frame-description">${getDescription(item)}</span>
            </div>
          <div class="cart-price">€ <span>${getItemPrice(item)}</span></div>
          <button class="cart-remove" data-index="${index}"></button>
          </div>
        </div>
      `)

      const img = document.createElement('img')
      img.className = 'cart-thumb'
      img.alt = itemAPI.title
      img.id = `object-image-${item.objectID}`
      img.onload = () => render(
        img,
        document.getElementById(`object-${item.objectID}`),
        item.printSize,
        item.frameStyle,
        item.frameWidth,
        item.matColor,
        item.matWidth
      )
      img.src = itemAPI.primaryImageSmall

      document.querySelector(`#cart-item-${index} a`).appendChild(img)

      document.querySelector(`#cart-item-${index} .cart-remove`)
        .addEventListener('click', )
    })
  }

  function getDescription(item) {
    let size = '';
    switch (item.printSize) {
      case 'S':
        size = 'Small'
        break;
      
      case 'L':
        size = 'Large'
        break;
    }

    let frameWidth = item.frameWidth
    let frameStyle = item.frameStyle
    let matWidth = item.matWidth

    return (matWidth === 0)
      ? `${size} print in a ${frameWidth / 10} cm ${frameStyle} frame.`
      : `${size} print in a ${frameWidth / 10} cm ${frameStyle} frame with a ${matWidth / 10} cm ${item.matColor} mat.`
  }

  const getItemPrice = (item) => calculatePrice(
    item.printSize,
    item.frameStyle,
    item.frameWidth,
    item.matWidth
  )

  let total = cart.reduce((total, item) =>   total + getItemPrice(item), 0)
  document.getElementById("price-total").innerHTML = total.toFixed(2)

  document.getElementById('checkout-button')
    .addEventListener('click', )

