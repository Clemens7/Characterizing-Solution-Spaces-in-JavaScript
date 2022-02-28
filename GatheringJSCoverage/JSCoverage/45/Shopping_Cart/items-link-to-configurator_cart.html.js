
    import * as Frame from './frame.js';

    let total = 0;

    //Function returns appropriate String for the abbreviations S, M, L
    function getLabelText(item){
      let text;
      let size;
      if(item.printSize==="S"){
        size = "Small";
      }else if(item.printSize==="M"){
        size = "Medium";
      }else{
        size = "Large";
      }

      if (item.matWidth > 0){

        text = size + " print in a " + (item.frameWidth)/10 + " cm " + item.frameStyle + " frame with a " + (item.matWidth)/10 + " cm " + item.matColor + " mat.";

      }
      return text;
    }


    //Function creates and appends HTML content of one item in the Cart
    function itemToHtml(item, ur, ar, ti, da, cont){
      const outerContainer = document.createElement('div');
      outerContainer.className = "cart-item";
      cont.appendChild(outerContainer);
      const preview = document.createElement('div');
      preview.className = "cart-preview";
      const link = document.createElement('a'); //Link for redirection to the corresponding config page
      link.href = "config.html?objectID=" + item.objectID + "&printSize=" + item.printSize + "&frameStyle=" + item.frameStyle + "&frameWidth=" + item.frameWidth + "&matColor=" + item.matColor + "&matWidth=" + item.matWidth;
      const img = document.createElement('img');
      img.src = ur; //always Small?
      preview.appendChild(link);
      link.appendChild(img);
      outerContainer.appendChild(preview);
      Frame.render(img, preview, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
      const label = document.createElement('div');
      label.className = "museum-label";
      const innerLabel = document.createElement('div');
      const artist = document.createElement('span');
      artist.className ="artist";
      artist.innerText = ar;
      const title = document.createElement('span');
      title.className ="title";
      title.innerText = ti + ', ';
      const date = document.createElement('span');
      date.className ="date";
      date.innerText = da;
      const br = document.createElement('br');
      const frame_description = document.createElement('span');
      frame_description.className ="frame-description";
      frame_description.innerText = getLabelText(item);
      innerLabel.appendChild(artist);
      innerLabel.appendChild(title);
      innerLabel.appendChild(date);
      innerLabel.appendChild(br);
      innerLabel.appendChild(br);
      innerLabel.appendChild(frame_description);
      label.appendChild(innerLabel);
      const priceLabel = document.createElement('div');
      priceLabel.className ="cart-price";
      priceLabel.innerText ="€ ";
      const price = document.createElement('span');
      // calculate the object price and add it to the total price:
      let itemPrice = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
      total += itemPrice;
      price.innerText = itemPrice.toFixed(2);
      priceLabel.appendChild(price);
      label.appendChild(priceLabel);
      const button = document.createElement('button');
      button.className = "cart-remove";
      button.addEventListener("click", );
      label.appendChild(button);
      outerContainer.appendChild(label);
    }

    //Function shows the content of the local Storage (Cart)
    function showArtWorks(container){
      const key = 'cart';
      if (key in localStorage) {
        console.log(`Retrieving ${key} from local storage`);
        if (localStorage[key] === "" || localStorage[key] === "[]")  else {
          // In case there is something in the cart
          let objects = JSON.parse(localStorage[key]);
          console.log(`Found ${objects.length} item(s) in shopping cart.`);
          // Cart button shows number of items in parentheses
          document.querySelector('#cart-link').innerHTML = "Cart (" + objects.length + ")";
          const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
          // Reversing the items in case, that the newest is at the and in order to display the last add as first on page
          let revObjects = objects.reverse();
          let fetches = [];
          // We iterate through the cart and show the items on the site
          for(let item of revObjects){
            if (item.objectID in localStorage) else{
              // If the objectID is not present in the cache, we collect the data from the museum API
              let objectUrl = url + item.objectID;
              fetches.push(
                fetch(objectUrl)
                      .then(response => {
                        return response.json()
                      })
                      .then(data => {
                        // Working with JSON data here
                        itemToHtml(item, data.primaryImageSmall, data.artistDisplayName, data.title, data.objectDate, container);
                        localStorage[item.objectID] = JSON.stringify(data);
                      })
                      .catch()
              );
            }
          }

          Promise.all(fetches).then(function() {
            // gets the cart-total (total sum and button) back to the end of the page:
            let cartTotal = container.children[0];
            container.removeChild(cartTotal);
            container.appendChild(cartTotal);
            // print the total: 
            document.querySelector('#price-total').innerHTML = total.toFixed(2);
            document.getElementById("checkout-button").disabled = false;
          });
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

  