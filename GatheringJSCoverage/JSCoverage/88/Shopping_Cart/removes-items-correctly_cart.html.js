
    import {calculatePrice, render} from "./frame.js";
    import {saveShoppingCart, getShoppingCart} from "./Util.js";
    import CartItem from "./CartItem.js";
    import ShoppingCart from "./ShoppingCart.js";

/*    let cart = [ { "objectID": 39799,
                  "printSize": 'M',
                  "frameStyle": 'classic',
                  "frameWidth": 4,
                  "matColor": 'red',
                  "matWidth": 5},
                { "objectID": 437853,
                  "printSize": 'L',
                  "frameStyle": 'shabby',
                  "frameWidth": 3,
                  "matColor": 'red',
                  "matWidth": 5},
                { "objectID": 436535,
                  "printSize": 'L',
                  "frameStyle": 'natural',
                  "frameWidth": 5,
                  "matColor": 'red',
                  "matWidth": 6},
                { "objectID": 634108,
                  "printSize": 'M',
                  "frameStyle": 'classic',
                  "frameWidth": 3,
                  "matColor": 'red',
                  "matWidth": 2},
                { "objectID": 435882,
                  "printSize": 'L',
                  "frameStyle": 'elegant',
                  "frameWidth": 6,
                  "matColor": 'red',
                  "matWidth": 7},
                { "objectID": 459054,
                  "printSize": 'M',
                  "frameStyle": 'classic',
                  "frameWidth": 4,
                  "matColor": 'red',
                  "matWidth": 5}
            ];
    localStorage.setItem("cart", JSON.stringify(cart));*/

    let shoppingCart = getShoppingCart();
    //shoppingCart.items.reverse();

    let items = document.getElementById('cart');

    if((localStorage.getItem('cart') != null && shoppingCart.getSize() > 0)) {
      document.getElementById('cart-link').innerText = 'Cart (' + shoppingCart.getSize() + ')';

      let artist = '';
      let title = '';
      let date = '';
      let price = 0;
      let totalPrice = shoppingCart.getSubTotal();
      totalPrice = totalPrice.toFixed(2);
      let description = '';
      for (let i = 0; i < shoppingCart.getSize(); i++) {
        let cartItem = new CartItem(
                shoppingCart.getCartItem(i).objectID,
                shoppingCart.getCartItem(i).printSize,
                shoppingCart.getCartItem(i).frameStyle,
                shoppingCart.getCartItem(i).frameWidth,
                shoppingCart.getCartItem(i).matColor,
                shoppingCart.getCartItem(i).matWidth);

        let configParams = '?objectID=' + cartItem.objectID +
                '&printSize=' + cartItem.printSize + '&frameWidth' + cartItem.frameWidth +
                '&frameStyle=' + cartItem.frameStyle + '&matColor=' + cartItem.matColor +
                '&matWidth=' + cartItem.matWidth;
        /*configUrlParam.set('objectID', cartItem.objectID);
        configUrlParam.set('printsize', cartItem.printSize);
        configUrlParam.set('frameStyle', cartItem.frameStyle);
        configUrlParam.set('frameWidth', cartItem.frameWidth);
        configUrlParam.set('matColor', cartItem.matColor);
        configUrlParam.set('matWidth', cartItem.matWidth);
        console.log(configUrlParam);*/
        //console.log(cartItem);

        /**
         <div class="cart-item">
         <div class="cart-preview" id="preview-container-0">
         <a href="">
         <img class="cart-thumb" src="" id="preview-0" alt="">
         </a>
         </div>
         </div>
         */

        let item = document.createElement('div');
        item.setAttribute('class', 'cart-item');
        items.appendChild(item);

        let imgContainer = document.createElement('div');
        imgContainer.setAttribute('class', 'cart-preview');
        imgContainer.setAttribute('id', 'preview-container-' + (i+1));
        item.appendChild(imgContainer);

        let configURL = 'config.html';
        let href = document.createElement('a');
        href.setAttribute('href', configURL + configParams);
        /*href.addEventListener('click', function () {
          window.location.href = configURL;
        })*/
        imgContainer.appendChild(href);

        let request = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
                + cartItem.objectID;

        let img = document.createElement('img');
        img.setAttribute('class', 'cart-thumb');
        img.setAttribute('id', 'preview-' + (i+1));
        href.appendChild(img);

        let response = fetch(request).then(async function (data) {
          if (data.status === 200) {
            //console.log("next step ready to go")
            data = await data.json();

            artist = data.artistDisplayName;
            title = data.title;
            date = data.objectDate;
            price = cartItem.getPrice();
            description = setDescription(cartItem);

            img.setAttribute('src', data.primaryImageSmall);
            img.setAttribute('alt', title);

            img.addEventListener('load', function () {
              render(img, imgContainer, cartItem.printSize,
                      cartItem.frameStyle, cartItem.frameWidth,
                      cartItem.matColor, cartItem.matWidth);

              /**
               *
               <div class="museum-label">
               <div>
               <span class="artist"></span>
               <span class="title"></span>,
               <span class="date"></span>
               <br><br>
               <span class="frame-description"></span>
               </div>
               <div class="cart-price">€ <span id="price-0">0</span></div>
               <button class="cart-remove"></button>
               </div>
               */
              let museum = document.createElement('div');
              museum.setAttribute('class', 'museum-label');
              item.appendChild(museum);

              let labels = document.createElement('div');
              museum.appendChild(labels);

              let artistSpan = document.createElement('span');
              artistSpan.setAttribute('class', 'artist');
              artistSpan.innerText = artist;
              let titleSpan = document.createElement('span');
              titleSpan.setAttribute('class', 'title');
              titleSpan.innerText = title + ', ';
              let dateSpan = document.createElement('span');
              dateSpan.setAttribute('class', 'date');
              dateSpan.innerText = date;
              let descriptionSpan = document.createElement('span');
              descriptionSpan.setAttribute('class', 'frame-description');
              descriptionSpan.innerText = description;

              labels.appendChild(artistSpan);
              labels.appendChild(titleSpan);
              labels.appendChild(dateSpan);
              labels.appendChild(document.createElement('br'));
              labels.appendChild(document.createElement('br'));
              labels.appendChild(descriptionSpan);

              let imgPrice = document.createElement('div');
              imgPrice.setAttribute('class', 'cart-price');
              imgPrice.innerText = '€ ';
              museum.appendChild(imgPrice);

              let imgp = document.createElement('span');
              imgp.setAttribute('id', 'price-' + (i+1));
              imgp.innerText = price;
              imgPrice.appendChild(imgp);

              let remove = document.createElement('button');
              remove.setAttribute('class', 'cart-remove');
              remove.addEventListener('click', function () {
                shoppingCart.removeCartItem(cartItem);
                saveShoppingCart(shoppingCart);
              });
              museum.appendChild(remove);

            });

          }
        });

      }

      //when localstorage is not empty display total price and checkout button
      let cartTotal = setCartTotal(true);
      items.appendChild(cartTotal);
    }

    function setCartTotal(notEmpty){

      let cartTotal = document.createElement('div');
      cartTotal.setAttribute('class', 'cart-total');
      //items.appendChild(cartTotal);

      let priceTotal = document.createElement('div');
      priceTotal.setAttribute('class', 'price');
      priceTotal.innerText = 'Total: € ';
      cartTotal.appendChild(priceTotal);

      let priceTotalResult = document.createElement('span');
      priceTotalResult.setAttribute('id', 'price-total');
      priceTotalResult.innerText = 0;
      priceTotal.appendChild(priceTotalResult);

      let checkout = document.createElement('button');
      checkout.setAttribute('type', 'button');
      checkout.setAttribute('id', 'checkout-button');
      checkout.innerText = 'Checkout';

      cartTotal.appendChild(checkout);

      if(!notEmpty)else{
        priceTotalResult.innerText = shoppingCart.getSubTotal().toFixed(2);
        checkout.addEventListener('click', );
      }
      return cartTotal;
    }

    function setDescription(cartItem){

      let s;
      let fw = (cartItem.frameWidth / 10) + ' cm ' + cartItem.frameStyle + ' frame';
      let mw;

      if(cartItem.printSize == 'L'){
        s = 'Large print in a ';
      }
      if(cartItem.printSize == 'M'){
        s = 'Medium print in a ';
      }
      if(cartItem.printSize == 'S'){
        s = 'Small print in a ';
      }

      if(cartItem.matWidth != null){
        mw = ' with a ' + (cartItem.matWidth / 10) + ' cm ' + cartItem.matColor + ' mat';
      }

      return s + fw + mw + '.';
    }

  