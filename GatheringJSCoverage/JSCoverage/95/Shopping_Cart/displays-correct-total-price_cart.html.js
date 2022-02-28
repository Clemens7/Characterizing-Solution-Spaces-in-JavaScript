
    import * as Cart from './cart.js';
    import * as Frame from './frame.js';
    import * as API from './art-api.js';

    Cart.updateCartString();

    let cartElement = document.getElementById('cart');
    let cartItemElement = document.querySelector('.cart-item');
    let checkoutButton = document.getElementById('checkout-button');
    let totalElement = document.getElementById('price-total');

    if (Cart.getItems().length == 0)  else {
      checkoutButton.disabled = false;
    }

    (async () => {
      const items = Cart.getItems();
      console.log("Items:");
      console.log(items);
      let totalPrice = 0;
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        console.log("obj #" + index);
        const obj = await API.retrieveObject(item.objectID);
        console.log(obj);

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        let printText = "";
        switch (item.printSize) {
          case "S":
            printText = "Small print";
            break;
          
          case "L":
            printText = "Large print";
            break;
        }

        let descText = `in a ${item.frameWidth / 10} cm ${item.frameStyle} frame`;
        let matText = '';
        if (item.matWidth > 0) { 
          matText = ` with a ${item.matWidth / 10} cm ${item.matColor} mat.`;
        }
        
      
      itemDiv.innerHTML = `
          <div class="cart-preview" id="preview-container-${index}">
            <a href="config.html?${new URLSearchParams(item)}">
              <img class="cart-thumb" src="${obj.primaryImageSmall}" id="preview-${index}">
            </a>
          </div>
          <div class="museum-label">
            <div>
              <span class="artist">${obj.artistDisplayName}</span>
              <span class="title">${obj.title}</span>,
              <span class="date">${obj.objectDate}</span>
              <br><br>
              <span class="frame-description">${printText} ${descText}${matText}</span>
            </div>
            <div class="cart-price">€ <span id="price-${index}">0</span></div>
            <button class="cart-remove" onclick="removeItem(${index});"></button>
          </div>`;
      cartElement.insertBefore(itemDiv, cartElement.firstChild);

      const previewImg = document.getElementById("preview-" + index);
      const container = document.getElementById("preview-container-" + index);
      Frame.render(previewImg, container, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);

      const price = Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
      document.getElementById("price-" + index).innerHTML = `${price.toFixed(2)}`;
      totalPrice += price;
    }
      document.getElementById("price-total").innerHTML = `${totalPrice.toFixed(2)}`;
    }) ();

    window.removeItem = 
  