
      import * as Frame from './frame.js';
      import * as Common from './common.js';

      function cloneAndSetup(element, artwork, nextId) {
        let imgUrl = artwork.primaryImageSmall;
        if (!imgUrl)  else {
          let artist = artwork.artistDisplayName;
          let title = artwork.title;
          let date = artwork.objectDate;

          // set up clone
          let original = document.getElementById("cart-item-template");
          let clone = original.cloneNode(true);
          let strId = `cart-item-${nextId}`;
          clone.id = strId;
          clone.setAttribute('dataid', element.objectID);
          clone.style.display = "flex";

          // insert clone
          let button = document.getElementsByClassName("cart-total")[0];
          document.getElementById("cart").insertBefore(clone, button);
          clone = document.getElementById(strId);
          let buttonClick = clone.childNodes[3].childNodes[5];
          buttonClick.id = nextId;

          // set data
          let container = clone.querySelector("div.cart-preview");
          container.id = `preview-container-${nextId}`;
          let link = container.querySelector("a");
          link.href = buildLink(element);
          let img = link.querySelector("img.cart-thumb");
          img.src = imgUrl;
          img.id = `preview-${nextId}`;
          Frame.render(img, container, element.printSize, element.frameStyle, element.frameWidth, element.matColor, element.matWidth);


          let label = clone.querySelector("div.museum-label");
          label.querySelector("div span.artist").innerHTML = artist;
          label.querySelector("div span.title").innerHTML = title;
          label.querySelector("div span.date").innerHTML = date;
          label.querySelector("div span.frame-description").innerHTML = buildDescription(element.printSize, element.frameWidth, element.frameStyle, element.matWidth, element.matColor);


          let elemPrice = label.querySelector("div.cart-price span");
          elemPrice.innerHTML = Frame.calculatePrice(element.printSize, element.frameStyle, element.frameWidth, element.matWidth);
          elemPrice.id = `price-${nextId}`;
        }
      }

      function initCart() {
        let cartItems = localStorage.getItem("cart");
        cartItems = JSON.parse(cartItems);
        if (cartItems === null)  else {
          calculateTotalPrice(cartItems);
          document.getElementById("cart-item-template").style.display = "none"; // hide template
          let counter = 0;
          cartItems.forEach(element => {
            let cachedArtWork = localStorage.getItem("met" + element.objectID);
            let nextId = counter++;
            if (cachedArtWork !== null)  else {
              fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${element.objectID}`)
                .then(response => response.json())
                .then(artwork => {
                  localStorage.setItem("met" + artwork.objectID, artwork.artistDisplayName + ";" + artwork.title + ";" + artwork.objectDate + ";" + artwork.primaryImageSmall);
                  cloneAndSetup(element, artwork, nextId);
                })
                .catch();
            }
          });
        }
      }
      function calculateTotalPrice(itemList) {
        let totalPrice = 0;
        for (const item of itemList) {
          totalPrice = totalPrice + Frame.calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        }
        document.getElementById("price-total").innerHTML = totalPrice;
      }
      function buildDescription(size, frameWidth, frameStyle, matWidth, matColor) {
        let desc;
        switch (size) {
          case "S":
            desc = "Small";
            break;
          
          case "L":
            desc = "Large";
            break;
        }
        desc += " print in a " + (frameWidth / 10) + " cm " + frameStyle + " frame"
        if (matWidth > 0) {
          desc += " with a " + (matWidth / 10) + " cm " + matColor + " mat"
        }
        desc += ".";
        return desc;
      }
      function buildLink(element) {
        let link = `/config.html?objectID=${element.objectID}`;
        if (element.printSize) {
          link += `&printSize=${element.printSize}`
        }
        if (element.frameStyle) {
          link += `&frameStyle=${element.frameStyle}`
        }
        if (element.frameWidth) {
          link += `&frameWidth=${element.frameWidth}`
        }
        if (element.matColor) {
          link += `&matColor=${element.matColor}`
        }
        if (element.matWidth) {
          link += `&matWidth=${element.matWidth}`
        }
        return link;
      }


      initCart();
      Common.setCartItemNumber();
      window.removeItem = removeItem;

      
    