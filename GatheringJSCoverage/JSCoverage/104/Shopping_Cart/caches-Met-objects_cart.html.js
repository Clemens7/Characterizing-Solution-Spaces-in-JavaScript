
    import * as Cache from './cache.js'
    import * as Cart from './cart.js'
    import * as Frame from './frame.js'
    import * as Common from './common.js'

    //Cart.resetCart(Cache.store);
    //Cart.loadTestCart(Cache.store);

    let shoppingCart = Cache.retrieve('cart');
    let sp2 = document.getElementById("cart-total");
    let cart = document.getElementById('cart');

    showShoppingCart();

    async function showShoppingCart() {

      if (Common.getNumberOfObjectsInCart() == 0) 

      let count = 0;

      shoppingCart.forEach(product => {
        count += 1;
        //console.log(`Div ${product.objectID}`);
        createCartItemElem(product, count);
      });

      document.getElementById('checkout-button').disabled = false;
      document.getElementById('price-total').innerHTML = priceTotal();

    }

    function createCartItemElem(product, count) {
      const div = document.createElement('div');
      div.setAttribute("id", `cart-item-${product.objectID}-${count}`);
      div.setAttribute("class", "cart-item");

      cart.insertBefore(div, cart.firstChild);

      createCartElement(product, div, count);
    }

    async function createCartElement(product, div, count) {

      let artwork = Cache.retrieve(product.objectID)
      if (!artwork) 
      createArtworkProduct(artwork, product, div, count);
      return div;
    }

    

    function createArtworkProduct(artwork, product, div, count) {

      div.innerHTML =
        ` <div class="cart-preview" id='preview-container-${product.objectID}-${count}'>
            <a href='./config.html?objectID=${product.objectID}&printSize=${product.printSize}&frameStyle=${product.frameStyle}&frameWidth=${product.frameWidth}&matColor=${product.matColor}&matWidth=${product.matWidth}'>
              <img class="cart-thumb" src='${artwork.primaryImageSmall}' id='preview-${product.objectID}-${count}' alt="${artwork.title}">
            </a>
          </div>

        <div class="museum-label">
          <div class="gallery" id='gallery-${product.objectID}-${count}'>
            <span class="artist">${artwork.artistDisplayName}</span>
            <span class="title">${artwork.title}</span>,
            <span class="date">${artwork.objectDate} </span>
            <span class="frame-description">${getSize(product.printSize)} print in a ${product.frameWidth / 10} cm ${product.frameStyle} frame${matDescription(product)}. </span>
          </div>
          <div class="cart-price">€ <span id='price-${product.objectID}-${count}' ">${calculatePrice(product)}</span></div>
          <button id="button-${product.objectID}-${count}" class="cart-remove"></button>
        </div>
      `;

      let tempImg = document.getElementById(`preview-${product.objectID}-${count}`);

      let button = document.getElementById(`button-${product.objectID}-${count}`);
      button.onclick = ();

      render(product, count, tempImg);

      return div;
    }

    function matDescription(product) {
      if(product.matWidth == 0)  else {
          return ` with a ${product.matWidth / 10} cm ${product.matColor} mat`;
      }
    }

    document.getElementById("cart-link").innerHTML =
      "Cart (" + Common.getNumberOfObjectsInCart() + ")";

    

    function render(product, count, img) {
      let container = document.getElementById(`preview-container-${product.objectID}-${count}`);
      let printSize = product.printSize;
      let frameStyle = product.frameStyle;
      let matColor = product.matColor;
      let frameWidthInMM = product.frameWidth;
      let matWidthInMM = product.matWidth;

     

      Frame.render(img, container, printSize, frameStyle, frameWidthInMM, matColor, matWidthInMM);

    }

    function getSize(size) {
      switch (size) {
        case 'S':
          return 'Small';
        case 'M':
          return 'Medium';
        
        
      }
    }

    function calculatePrice(product) {
      let price = Frame.calculatePrice(product.printSize, product.frameStyle, product.frameWidth, product.matWidth);
      return price;
    }

    function priceTotal() {
      let price = 0.0;
      for (let product of shoppingCart) {
        var temp = calculatePrice(product) * 1;
        price += temp;
      }
      return price;
    }

  