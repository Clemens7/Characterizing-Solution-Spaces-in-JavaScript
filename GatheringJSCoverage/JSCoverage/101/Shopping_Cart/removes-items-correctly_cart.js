import * as Storage from './helper/storage.js'
import * as DomBuilder from './helper/dom-builder.js';
import * as ArtworkCach from './helper/artwork-cache.js';
import * as FrameConfigurator from '../frame.js';
import * as ArtworkAPI from './helper/met-museum-api.js';


async function updateCart() {
  var cart = Storage.getCart();
  const cartContainer = new CartContainer();
  cartContainer.clear();

  if (cart == null)  else {
    cartContainer.displayCartAmount(cart.length);
    for (let item of cart) {
      await cartContainer.addItemToCart(item);
    }
    cartContainer.updatePrice(cart);
  }
}

window.addEventListener("load", async function() {
  await updateCart();
});

document.getElementById("checkout-button").addEventListener("click", );


class CartContainer {
  constructor(results) {
    this.cartContainer = document.getElementById("cart");
    if (!this.cartContainer) 
    this.cartLink = document.getElementById("cart-link");
    if (!this.cartLink) 
    this.priceTotal = document.getElementById("price-total");
    if (!this.priceTotal) 
  }
  clear() {
    this.cartContainer.querySelectorAll('.cart-item').forEach(e => e.remove());
    document.getElementById('checkout-button').disabled = false;
  }

  updatePrice(cart) {
    let price = 0;
    for (let item of cart) {
      console.log(item);
      price += FrameConfigurator.calculatePrice(
        item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
    }
    this.priceTotal.innerHTML = price.toFixed(2);
  }

  displayCartAmount(amount) {
    if (amount > 0) {
      this.cartLink.innerHTML = `Cart (${amount})`
    }
  }

  

  async addItemToCart(cartItem) {
    console.log(`Adding ${cartItem.objectID} to cart`);
    const artwork = await ArtworkAPI.retrieveUsingObjectID(cartItem.objectID);

    let cartItemContainer = DomBuilder.container("div", [
      createCartPreviewContainer(), createMuseumLabelContainer()
    ]);
    cartItemContainer.setAttribute("class", "cart-item");

    this.cartContainer.insertBefore(cartItemContainer, this.cartContainer.firstChild);
    return cartItemContainer;


    function createCartPreviewContainer() {
      let imgCardThumb = document.createElement('img');
      imgCardThumb.setAttribute("class", "cart-thumb");
      imgCardThumb.setAttribute("src", artwork.primaryImageSmall);
      imgCardThumb.setAttribute("id", `preview-${cartItem.objectID}`);
      imgCardThumb.setAttribute("alt", artwork.title);

      let aContainer = DomBuilder.container("a", [imgCardThumb]);
      aContainer.setAttribute("href", `./config.html?objectID=${cartItem.objectID}&printSize=${cartItem.printSize}&frameStyle=${cartItem.frameStyle}&frameWidth=${cartItem.frameWidth}&matColor=${cartItem.matColor}&matWidth=${cartItem.matWidth}`);
      let divPreview = DomBuilder.container("div", [aContainer]);
      divPreview.setAttribute("class", "cart-preview");
      divPreview.setAttribute("class", `preview-container-${cartItem.objectID}`);

      imgCardThumb.addEventListener("load", function() {
        FrameConfigurator.render(imgCardThumb, divPreview, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth / 10, cartItem.matColor, cartItem.matWidth / 10);
      });

      return divPreview;
    }

    function createMuseumLabelContainer() {
      let spanArtist = DomBuilder.createTextElement("span", artwork.artistDisplayName);
      spanArtist.setAttribute("class", "artist");
      let spanTitle = DomBuilder.createTextElement("span", artwork.title);
      spanTitle.setAttribute("class", "title");
      let spanDate = DomBuilder.createTextElement("span", ", " + artwork.objectDate);
      spanDate.setAttribute("class", "date");
      let spanFrame = DomBuilder.createTextElement("span", frameDescription());
      spanFrame.setAttribute("class", "frame-description");
      let divContainer = DomBuilder.container('div', [
        spanArtist,
        spanTitle,
        spanDate,
        document.createElement("br"),
        document.createElement("br"),
        spanFrame
      ]);

      let spanPrice = DomBuilder.createTextElement("span", FrameConfigurator.calculatePrice(
        cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth).toFixed(2));
      spanPrice.setAttribute("id", `price-${cartItem.objectID}`);
      let divPrice = DomBuilder.container('div', [spanPrice], `€ `);
      divPrice.setAttribute("class", "cart-price");

      let buttonRemove = document.createElement("button");
      buttonRemove.setAttribute("class", "cart-remove");
      buttonRemove.addEventListener("click", function() {
        Storage.removeFromCart(cartItem.objectID);
        updateCart();
      });

      let divMuseumLabel = DomBuilder.container('div', [divContainer, divPrice, buttonRemove]);
      divMuseumLabel.setAttribute("class", "museum-label");

      return divMuseumLabel;
    }

    function frameDescription() {
      let desc = "";
      switch (cartItem.printSize) {
        case "S":
          desc += "Small ";
          break;
        case "M":
          desc += "Medium ";
          break;
        case "L":
          desc += "Large ";
          break;
        
      }
      desc += `print in a ${Math.round(cartItem.frameWidth)/10} cm ${cartItem.frameStyle} frame`;
      if (cartItem.matWidth > 0 && cartItem.matColor) {
        desc += ` with a ${Math.round(cartItem.matWidth)/10} cm ${cartItem.matColor} mat`;
      }
      desc += `.`;
      return desc;
    }

  }
}