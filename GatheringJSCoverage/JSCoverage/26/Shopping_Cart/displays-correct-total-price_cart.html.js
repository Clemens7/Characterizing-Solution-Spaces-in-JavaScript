
      import * as frame from "./frame.js";
      import * as cart from "./cart.js";
      import { retrieveArtworkInformation } from "./artwork.js"

      document.querySelector('#checkout-button').onclick = 
      
      const parent = document.querySelector('.cart');
      let shoppingCart;



      if (cart.cartExistsAndNotEmpty()) {
        shoppingCart = cart.getCart()
        document.querySelector('.cart-empty').style.display = 'none';

        //Use the local storage key cart to store the shopping cart, which should be represented as a JSON array of objects containing an objectID and the frame configuration parameters, but nothing more. In particular, the shopping cart should not contain artwork metadata or the calculated price of each item.
        let template = document.querySelector('#template_cart_item');
        for (let i = 0; i < shoppingCart.length; i++) {
          createCartItem(template, shoppingCart[i]);
        }

        //destroy template in the end
        template.parentNode.removeChild(template);
        //Show the price of each item, as well as the sum total.
        setTotalPrice(calculateTotal());
      }

      

      function setTotalPrice(price){
        document.querySelector('#price-total').innerHTML = price.toFixed(2);
      }

      

      //Allow the user to remove items from the cart by clicking on the circled "x".
      

      function calculateTotal(){
        const prices = document.querySelectorAll('.cart-price>span');
        let total = 0;
        for (let i = 0; i < prices.length; i++) {
          total+=parseFloat(prices[i].innerHTML);
        }
        return total;
      }

      //For each item in the cart, display a preview of the artwork in its configured frame. Use the helper functions in frame.js. The preview image should link to the corresponding frame configurator page.
      function createCartItem(template, cartItem){
        let clone = template.cloneNode(true); //deep clone
        clone.id = ""+cartItem.objectID;
        clone.querySelector('.cart-preview').id = "preview-"+cartItem.objectID;
        clone.querySelector('.cart-thumb').id = "img-"+cartItem.objectID;
        clone.className = 'cart-item';
        clone.querySelector('.cart-remove').onclick = ;

        let img = clone.querySelector('.cart-thumb');
        img.onload = function() { frame.render(clone.querySelector('.cart-thumb'), clone.querySelector('.cart-preview'), cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth); }

        clone.querySelector('.frame-description').innerHTML = cart.buildFrameDescription(cartItem);        

        const params = new URLSearchParams({"objectID": cartItem.objectID, "printSize": cartItem.printSize, "frameStyle": cartItem.frameStyle, "frameWidth": cartItem.frameWidth, "matColor": cartItem.matColor, "matWidth": cartItem.matWidth});
        clone.querySelector('.cart-preview a').href = "config.html?"+params.toString();


        let price = frame.calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth)
        clone.querySelector('.cart-price>span').innerHTML = price;

        
        const artwork = retrieveArtworkInformation(cartItem.objectID).then(artwork => {
          //For each item in the cart, display the usual artwork information (title, artist, date) and a textual description of the configuration. 
          img.alt = artwork.artist+" - "+artwork.title;
          img.src = artwork.img
          clone.querySelector('.frame-description').innerHTML = cart.buildFrameDescription(cartItem);
          clone.querySelector('.artist').innerHTML = artwork.artist;
          clone.querySelector('.title').innerHTML = artwork.title
          clone.querySelector('.date').innerHTML = artwork.date
        });

        //Display the most recently added item on top.
        parent.insertBefore(clone, parent.firstChild);
      }
    