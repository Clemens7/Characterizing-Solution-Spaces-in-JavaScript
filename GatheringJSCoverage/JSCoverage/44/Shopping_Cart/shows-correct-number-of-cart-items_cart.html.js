
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
      if (artworks == null || artworks.length == 0){
        results.innerHTML = `<p> There are no items in your shopping cart.</p>`;
        document.getElementById('checkout-button').disabled = true;
      }
    }

    

    

    function setTotalPrice() {
      let total = 0;
      for (let artwork in artworks)
      document.getElementById('price-total').innerHTML = total.toString();
    }

    

  