
    import { getArtById } from './apiCalls.js'
    import { render, calculatePrice } from './frame.js'
    import { store, retrieve } from './metCache.js'

    const urlParams = new URLSearchParams(window.location.search);
    const sizeString = { 'S': 'Small', 'M': 'Medium', 'L': 'Large' };
    let price = 0;
    let cart = [];


    const removeItem = ;


    const appendCartItem = async (cartItem, itemIndex) => {
      let artObject = retrieve(cartItem.objectID);
      if (!artObject) 
      console.log('cartItem', cartItem);
      const printText = sizeString[cartItem.printSize] + ' print';
      const frameText = `in a ${cartItem.frameWidth / 10}&nbsp;cm ${cartItem.frameStyle} frame`;
      const matText = cartItem.matWidth > 0 ? ` with a ${cartItem.matWidth / 10}&nbsp;cm ${cartItem.matColor} mat.` ;
      // Create html element
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.id = `cart-item-${cartItem.objectID}`;
      itemDiv.innerHTML = `
        <div class="cart-preview" id="preview-container-${itemIndex}">
          <a href="config.html?${new URLSearchParams(cartItem)}">
            <img class="cart-thumb" src="${artObject.primaryImageSmall}" id="preview-${itemIndex}" alt="${artObject.title}">
          </a>
        </div>
        <div class="museum-label">
          <div>
            <span class="artist">${artObject.artistDisplayName}</span>
            <span class="title">${artObject.title}</span>,
            <span class="date">${artObject.objectDate}</span>
            <br><br>
            <span class="frame-description">${printText} ${frameText}${matText}</span>
          </div>
          <div class="cart-price">€ <span id="price-${itemIndex}">${calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth).toFixed(2)}</span></div>
          <button class="cart-remove" id="remove-btn-${itemIndex}"></button>
        </div>`;
      cartElem.insertBefore(itemDiv, cartElem.firstChild);
      document.getElementById(`remove-btn-${itemIndex}`).onclick = ;
      const artImage = document.getElementById(`preview-${itemIndex}`);
      artImage.onload = () => {
        // Fit image in container
        render(
                document.getElementById(`preview-${itemIndex}`),
                document.getElementById(`preview-container-${itemIndex}`),
                cartItem.printSize,
                cartItem.frameStyle,
                cartItem.frameWidth,
                cartItem.matColor,
                cartItem.matWidth
        )
      }
    };

    const cartElem = document.getElementById("cart");

    document.addEventListener('DOMContentLoaded', async e => {
      cart = JSON.parse(localStorage.getItem('cart'));
      console.log('cart', cart);

      if (!cart || !Array.isArray(cart))  else {
        document.getElementById('cart-link').innerHTML = `Cart (${cart.length})`;
        cart.forEach((cartItem, i) => {
          price += calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
          appendCartItem(cartItem, i);
        });
        document.getElementById("price-total").innerHTML = `${price}`;
      }
      document.getElementById('checkout-button').addEventListener('click', )
    })
  