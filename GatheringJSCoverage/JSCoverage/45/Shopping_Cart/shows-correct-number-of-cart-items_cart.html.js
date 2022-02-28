
    import * as Frame from './frame.js';

    let total = 0;

    //Function returns appropriate String for the abbreviations S, M, L
    


    //Function creates and appends HTML content of one item in the Cart
    

    //Function shows the content of the local Storage (Cart)
    function showArtWorks(container){
      const key = 'cart';
      if (key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        if (localStorage[key] === "" || localStorage[key] === "[]") {
          // In case of empty cart, following text is displayed
          const emptyCart = document.createElement('h2');
          emptyCart.innerText = "There are no items in your shopping cart.";
          container.appendChild(emptyCart);
          // Checkout button is disabled
          document.getElementById("checkout-button").disabled = true;
          // And Cart button does not show any number nor parentheses
          document.querySelector('#cart-link').innerHTML = "Cart";
          // removes the "Total: € 0.00" if no items are in the shopping cart:
          document.getElementsByClassName('price')[0].innerHTML = '';
          // gets the cart-total (total sum and button) back to the end of the page:
          let cartTotal = container.children[0];
          container.removeChild(cartTotal);
          container.appendChild(cartTotal);
        }
      }

    }

    // Class establishes link to the container in the document and fills the content with data from localStorage
    class ArtWorksContainer {
      constructor(containerID = 'cart') {
        this.container = document.getElementById(containerID);
        if (!this.container) 

        //For debugging - store JSON in local storage
        // For pictures put 50 or 75  - better
        /*var jtext =  '[' +
                '{ "objectID": 726968 , "printSize":"S",' +
                '"frameStyle":"classic" , "frameWidth": 40,' +
                '"matColor":"ivory" , "matWidth": 50 },' +
                '{ "objectID": 742769 , "printSize":"S",' +
                '"frameStyle":"classic" , "frameWidth": 40,' +
                '"matColor":"ivory" , "matWidth": 50 } ,' +
                '{ "objectID":  823328, "printSize":"S",' +
                '"frameStyle":"classic" , "frameWidth": 40,' +
                '"matColor":"ivory" , "matWidth": 50 }]';
        var key = "cart";
        localStorage[key] = jtext;
        */
        //End of debugging prelude


        showArtWorks(this.container);
      }
    }

    new ArtWorksContainer();


    // removes an item from the cart:
    

    document.getElementById('checkout-button').addEventListener('click', );

  