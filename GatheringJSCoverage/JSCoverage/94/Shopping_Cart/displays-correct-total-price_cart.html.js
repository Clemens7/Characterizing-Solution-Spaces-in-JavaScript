
    import artmartAPI from "./artmartAPI.js";
    import {retrieveCart, removeFromCart} from "./artmart-cache.js";
    import {render, calculatePrice} from "./frame.js";
    
    var cartSection;
    var cartTotal;
    var itemTemplate;

    document.addEventListener('DOMContentLoaded', async (event) => 
    {
      cartSection = document.getElementById("cart");
      cartTotal = document.getElementById("cart-total");
      itemTemplate = document.getElementById("preview-container-0").parentNode;
      cartSection.removeChild(itemTemplate);
      document.getElementById("checkout-button").disabled = true;
      await loadCart();
    });

    document.getElementById("checkout-button").addEventListener("click", );

    async function displayItem(item)
    {
      var artObject = await artmartAPI.getObject(item['objectID']);

      var cartItem = itemTemplate.cloneNode(true);
      var imageContainer = cartItem.getElementsByTagName("div")["preview-container-0"];
      var imageLink = imageContainer.getElementsByTagName("a")[0];
      var imageElement = imageContainer.getElementsByTagName("img")["preview-0"];

      imageElement.src = artObject.primaryImageSmall;
      imageElement.alt = artObject.title;

      imageLink.href = `./config.html?objectID=${item.objectID}&printSize=${item.printSize}&frameStyle=${item.frameStyle}&frameWidth=${item.frameWidth}&matColor=${item.matColor}&matWidth=${item.matWidth}`;

      var spans = cartItem.getElementsByTagName("span");
      spans[0].innerHTML = artObject.artistDisplayName;   // author
      spans[1].innerHTML = artObject.title;               // title
      spans[2].innerHTML = artObject.objectDate;          // date
      spans[3].innerHTML = (
        `
        ${item.printSize === "S" ? "Small" : (item.printSize === "L" ? "Large" )} print in a
        ${item.frameWidth/10} cm ${item.frameStyle} frame${item.matWidth > 0 ? ` with a ${item.matWidth/10} cm ${item.matColor} mat.` }
        `);                                                 // frame-description
      spans["price-0"].innerHTML = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
      cartItem.id = `cart-item-${artObject.objectID}`;
      spans["price-0"].id = `price-${artObject.objectID}`;
      imageElement.id = `preview-${artObject.objectID}`;
      imageLink.id = `preview-link-${artObject.objectID}`;

      cartItem.getElementsByTagName("button")[0].addEventListener("click", );

      cartSection.insertBefore(cartItem, cartTotal);

      imageElement.onload = function() 
      {
        render(imageElement, imageContainer, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
      };
    }

    async function loadCart()
    {
      const cart = retrieveCart();
      if( cart !==undefined && cart.length > 0)
      {
        document.getElementById("checkout-button").disabled = false;
        document.getElementById("cart-link").innerText = "Cart ("+ cart.length + ")";
        for (var i = cart.length-1; i >= 0; i--)
        {
          var item = cart[i];
          await displayItem(item);
        }
        updatePrice();
      }
    }

    

    

    function updatePrice()
    {
      const cart = retrieveCart();
      var totalPrice = 0;
      for (var item of cart)
      {
        totalPrice += calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
      }
      if(cart.length > 0) {
        document.getElementById("price-total").innerHTML = totalPrice;
      }
    }

    
  