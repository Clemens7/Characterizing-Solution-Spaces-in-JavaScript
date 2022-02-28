
    import {calculatePrice} from "./frame.js";
    import * as GalleryAPI from "./searchAPI.js";
    import {showNumItems} from "./common.js";
    import {render} from "./frame.js";
    import * as GalleryCache from "./artwork-cache.js"

    // Dieser Part ist nur zum Testen von Cart, solange Frame Config noch
    // keine Bilder einspeichert; Muss zum Testen auskommentiert werden!
    //let cart = [];
    //192770
    //472562
    // 436529
    /*let cart = [{objectID: 823328, printSize: 'L', frameWidth: 27, frameStyle: 'classic', matWidth: 31, matColor: 'indigo'},
      {objectID: 436529, printSize: 'S', frameWidth: 20, frameStyle: 'shabby', matWidth: 0},];
    localStorage.setItem("cart", JSON.stringify(cart));*/

    let artworks = JSON.parse(localStorage.getItem("cart"));

    setUp();

    function setUp(){
      document.getElementById('cart-link').innerHTML = 'Cart' + showNumItems();
      showArtworks();
      setTotalPrice();

      const form = document.getElementById('cart');
      form.addEventListener("submit", removeElement, false)
    }

    async function showArtworks() {
      const results = document.getElementById('cart');
      results.innerHTML = '';
      if (artworks == null || artworks.length == 0)
      else{
        let artwork;

        for (var i = artworks.length-1; i >= 0; i--) {
          artwork = artworks[i];
          results.appendChild(await createArtworkElement(artwork));
        }
      }
    }

    async function createArtworkElement(artwork) {
      let artworkInformation;
      let isInCache = false;

      // Aus Cache Laden
      artworkInformation = searchInCache();

      function searchInCache() {
        let ls = localStorage;
        for (let i = 0; i < ls.length; i++) {
          let curCache = GalleryCache.retrieve(ls.key(i));  //JSON.parse(ls.getItem(ls.key(i)));
          for (let j = 0; j < curCache.length; j++) {
            let item = curCache[j];
            if (item.id == artwork.objectID){
              console.log(item.id + " is in cache");
              isInCache = true;
              return item;
            }
          }
        }}

      if (!isInCache)

      let divElement = document.createElement('div');
      divElement.setAttribute('class', 'cart-item')

      let img_temp = new Image(artworkInformation.image);
      img_temp. style.boxSizing;
      render(img_temp, document.createElement('div'), artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matColor, artwork.matWidth);
      divElement.innerHTML =
              `<div class="cart-preview" id="preview-container-${artwork.objectID}">
                  <a href="config.html?objectID=${artwork.objectID}&printSize=${artwork.printSize}&frameStyle=${artwork.frameStyle}&frameWidth=${artwork.frameWidth}&matColor=${artwork.matColor}&matWidth=${artwork.matWidth}">
                    <img class="cart-thumb" src="${artworkInformation.image}" id="preview-${artwork.objectID}" alt="" width = 250px, height = 250px,
                    style="box-sizing: ${img_temp.style.boxSizing}; border-image-source: url(${"frame-styles/"+artwork.frameStyle+".jpg"}); border-image-slice: ${img_temp.style.borderImageSlice};  border-image-repeat: stretch; border-width: 20px; background-color: ${img_temp.style.backgroundColor}; padding: 10px">
                  </a>
                </div>
                <div class="museum-label">
                  <div>
                    <span class="artist">${artworkInformation.artist}</span>
                    <span class="title">${artworkInformation.title}</span>,
                    <span class="date">${artworkInformation.date}</span>
                    <br><br>
                    <span class="frame-description">${writeText(artwork)} </span>
                  </div>
                  <div class="cart-price">€ <span id="price-${artwork.objectID}">${calculatePrice(artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matWidth)}</span></div>
                  <form id = "remove-form${artwork.objectID}">
                    <button type="submit" class="cart-remove" id="cart-remove"></button>
                  </form>
                </div>`;
      return divElement;
    }

    function writeText(artwork){
      var text = "";
      if (artwork.printSize === 'L')
      else if (artwork.printSize === 'M'){
        text += "Medium";
      }
      else if (artwork.printSize === 'S'){
        text += "Small";
      }
      text += " print in a " + artwork.frameWidth/10 + " cm " + artwork.frameStyle + " frame";
      if (artwork.matWidth != 0){
        text += " with a " + artwork.matWidth/10 + " cm " + artwork.matColor + " mat";
      }
      text += ".";
      return text;
    }

    function setTotalPrice() {
      let total = 0;
      for (let artwork in artworks){
        total += calculatePrice(artwork.printSize, artwork.frameStyle, artwork.frameWidth, artwork.matWidth);
      }
      document.getElementById('price-total').innerHTML = total.toString();
    }

    

  