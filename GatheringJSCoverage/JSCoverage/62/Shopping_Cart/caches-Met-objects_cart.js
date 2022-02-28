import * as DAL from "./DAL.js";
import * as frame from "./frame.js";

loadCart();

window.document.getElementById("cart-link").innerText = `Cart${getNumOfItems()}`;

window.document.getElementById("checkout-button").addEventListener("click", );

async function loadCart() {
  let artworks = JSON.parse(window.localStorage.getItem("cart"));
  let priceTotal = 0;
  const itemContainer = document.getElementById("cart");

  if (artworks) {
    for (let i in artworks) {
      let data = await DAL.getPicture(artworks[i].objectID);
      itemContainer.insertBefore(
        createCartItem(i, data, artworks[i]),
        itemContainer.firstChild
      );
      // Add to price total
      priceTotal += frame.calculatePrice(artworks[i].printSize,
        artworks[i].frameStyle,
        artworks[i].frameWidth,
        artworks[i].matWidth);

      let img = document.getElementById("preview-"+i);
      if (img.complete)  else {
        img.addEventListener("load", () => renderArtwork(i, artworks[i]));
      }
    }

    // Set total price
    document.getElementById("price-total").innerHTML = priceTotal;

    const removeButtons = document.getElementsByClassName("cart-remove");
    for (let removeButton of removeButtons) {
      removeButton.addEventListener("click", removeCartItem);
    }

  }
}

/**
 * @returns String of form '(n)' where n is the number of items in the cart if n > 0
 *          Empty string otherwise
 */
function getNumOfItems() {
  const cartItems = JSON.parse(window.localStorage.getItem('cart'));
  if (cartItems && cartItems.length > 0) {
    return ` (${cartItems.length})`
  }}





function createCartItem(itemNum, itemData, artwork) {
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";
  cartItem.innerHTML = `<div class="cart-preview" id="preview-container-${itemNum}">
        <a href="./config.html?objectID=${itemData.objectID}&printSize=${artwork.printSize}&frameStyle=${artwork.frameStyle}&frameWidth=${artwork.frameWidth}&matColor=${artwork.matColor}&matWidth=${artwork.matWidth}">
        <img class="cart-thumb" src="${
          itemData.primaryImageSmall
        }" id="preview-${itemNum}" alt="">
        </a>
    </div>
    <div class="museum-label">
        <div>
            <span class="artist">${itemData.artistDisplayName}</span>
            <span class="title">${itemData.title}</span>,
            <span class="date">${itemData.objectDate}</span>
            <br><br>
            <span class="frame-description">${getFrameDescription(
              artwork
            )}</span>
        </div>
        <div class="cart-price">€ <span id="price-${itemNum}">${frame.calculatePrice(artwork.printSize,
          artwork.frameStyle, artwork.frameWidth, artwork.matWidth)}</span></div>
            <button class="cart-remove" id="${itemData.objectID}"></button>
    </div>`;
  return cartItem;
}

function getFrameDescription(artwork) {
  const printSizes = {
    S: "Small",
    M: "Medium",
    L: "Large",
  };

  const printSize = printSizes[artwork.printSize];
  const matWidth = artwork.matWidth / 10;
  const matColor = artwork.matColor;
  const frameWidth = artwork.frameWidth / 10;
  const frameStyle = artwork.frameStyle;
  if (matWidth > 0) {
    return `${printSize} print in a ${frameWidth} cm ${frameStyle} frame with a ${matWidth} cm ${matColor} mat.`;
  }
}

function renderArtwork(itemNum, artwork) {
  const img = document.getElementById(`preview-${itemNum}`);
  const container = img.parentElement.parentElement;
  const printSize = artwork.printSize;
  const frameStyle = artwork.frameStyle;
  const frameWidth = artwork.frameWidth;
  const matColor = artwork.matColor;
  const matWidth = artwork.matWidth;

  frame.render(
    img,
    container,
    printSize,
    frameStyle,
    frameWidth,
    matColor,
    matWidth
  );
}
