
    import * as frame from './frame.js';

    function getDescription(product) {
      let string = '';

      if (product.printSize == 'L') string = 'Large';
      if (product.printSize == 'M') 
      if (product.printSize == 'S') string = 'Small';

      string += ' print in a ' + (product.frameWidth / 10) + ' cm ' + product.frameStyle + ' frame';
      if (product.matWidth && product.matWidth > 0) {
        string += ' with a ' + (product.matWidth / 10) + ' cm ' + product.matColor + ' mat';
      }

      return string + '.';
    }

    async function displayCart(cartData) {
      if (cartData.length == 0)  else {

        let html = '';
        let totalPrice = 0.0;
        for (const product of cartData) {
          let data = await getObject(product.objectID);

          let artist = data.artistDisplayName;
          let title = data.title;
          let date = data.objectDate;
          let image = data.primaryImageSmall;
          let description = getDescription(product);
          let price = frame.calculatePrice(product.printSize, product.frameStyle, product.frameWidth, product.matWidth);
          totalPrice += price;

          html += '<div class="cart-item">';

          html += '<div class="cart-preview" id="preview-container-' + product.objectID + '">';
          html += '<a href="config.html?objectID=' + product.objectID + '&printSize=' + product.printSize + '&frameStyle=' + product.frameStyle + '&frameWidth=' + product.frameWidth + '&matColor=' + product.matColor + '&matWidth=' + product.matWidth + '">';
          html += '<img class="cart-thumb" src="' + image + '" id="preview-' + product.objectID + '" alt="Image of ' + title + '">';
          html += '</a>';
          html += '</div>';

          html += '<div class="museum-label">';
          html += '<div>';
          html += '<span class="artist">' + artist + '</span>';
          html += '<span class="title">' + title + '</span>, ';
          html += '<span class="date">' + date + '</span>';
          html += '<br><br>';
          html += '<span class="frame-description">' + description + '</span>';
          html += '</div>';

          html += '<div class="cart-price">€ <span id="price-' + product.objectID + '">' + price.toFixed(2) + '</span></div>';
          html += '<button class="cart-remove" onclick="removeProductFromCart(' + product.objectID + ')"></button>';
          html += '</div>';

          html += '</div>';

        }

        html += '<div class="cart-total">';
        html += '<label class="price"> Total: € <span id="price-total">' + totalPrice.toFixed(2) + '</span></label>';
        html += '<a href="checkout.html"><button type="button" class="checkout-button" id="checkout-button">Checkout</button></a>';
        html += '</div>';

        document.getElementById('cart').innerHTML = html;

        cartData.map(product => {
          frame.render(
            document.getElementById('preview-' + product.objectID),
            document.getElementById('preview-container-' + product.objectID),
            product.printSize, product.frameStyle, product.frameWidth, product.matColor, product.matWidth
          );
        });
      }
    }

    
    window.removeProductFromCart = removeProductFromCart;


    let cartData = getCartData();
    console.log(cartData);
    updateNavigationText(cartData);
    displayCart(cartData);

  