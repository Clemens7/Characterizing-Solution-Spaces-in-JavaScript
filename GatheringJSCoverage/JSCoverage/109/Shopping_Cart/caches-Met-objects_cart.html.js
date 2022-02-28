
        import {Artwork} from './artwork.js';
        import * as Frame from './frame.js';
        import * as CartHelper from './cartHelper.js';
        import * as Cache from './artwork-cache.js';

      

        async function getArtwork(cartItem,i) {
            let artwork = Cache.retrieve(cartItem.objectID);

            //if the artwork is not in the cache, load it from the API and store it in the cache
            if (!artwork) 
            addCartToDocument(cartItem, artwork,i);
        }

        function addCartToDocument(cartItem, artwork,i) {
            const cartContainer = document.getElementById('cart');
            const price = Frame.calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
            
            let configURL = `config.html?objectID=${artwork.objectID}&printSize=${cartItem.printSize}&frameStyle=${cartItem.frameStyle}&frameWidth=${cartItem.frameWidth}`;
            let description;
            if (cartItem.printSize === 'S') {
                description = "Small";
            } else if (cartItem.printSize === 'M') {
                description = "Medium";
            }
            const frameWidthText = (+cartItem.frameWidth) / 10;
            description += ` print in a ${frameWidthText} cm ${cartItem.frameStyle} frame`;
            if (cartItem.matWidth > 0) {
                let matWidthText;
                configURL += `&matColor=${cartItem.matColor}&matWidth=${cartItem.matWidth}`;
                matWidthText = (+cartItem.matWidth) / 10;
                description += ` with a ${matWidthText} cm ${cartItem.matColor} mat.`
            }

            cartContainer.innerHTML +=
                `<div class="cart-item">
                <div class="cart-preview" id="preview-container-${i}">
                  <a href="${configURL}">
                      <img class="cart-thumb" src="${artwork.primaryImageSmall}" id="preview-${i}" alt="">
                  </a>
                </div>
                <div class="museum-label">
                  <div>
                    <span class="artist">${artwork.artistDisplayName}</span>
                    <span class="title">${artwork.title}</span>,
                    <span class="date">${artwork.objectDate}</span>
                    <br><br>
                    <span class="frame-description">${description}</span>
                  </div>
                  <div class="cart-price">€ <span id="price-${i}">${price}</span></div>
                  <button class="cart-remove"></button>
                </div>
              </div>
                `;
               
            const image = document.getElementById(`preview-${i}`);
            Frame.render(image, document.getElementById(`preview-container-${i}`), cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth);
        }

        async function fillCart() {
            const cartContainer = document.getElementById('cart');
            if (!localStorage.getItem('cart')) 
            let i = 0;
            const cartItems = JSON.parse(localStorage.getItem('cart'));
            for (let cartItem of cartItems) {
                await getArtwork(cartItem,i);
                i++;
            }

            cartContainer.innerHTML += `
            <div class="cart-total">
                <div class="price">Total: € <span id="price-total">0</span></div>
                <button type="button" id="checkout-button" onclick="window.location.href='checkout.html';">Checkout</button>
            </div>
      `;

            CartHelper.getCartItemNumber();
            CartHelper.calculateTotalPrice();
            for (let buttons of document.getElementsByClassName('cart-remove')) {
                buttons.addEventListener("click", );
            }
        }

        fillCart();

        

    