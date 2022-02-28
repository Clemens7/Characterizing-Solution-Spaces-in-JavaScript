
    import {Picture} from './picture.js';
    import * as FrameHelper from './frame.js';
    import * as DOMHelper from './dom-helpers.js';
    import * as PictureAPI from './picture-api.js';
    import * as Storage from './picture-storage.js';
    import * as CartHelper from './cart.js';
    const sizeDict = {
        S: "Small",
        M: "Medium",
        L: "Large"
    };

    document.getElementById("cart-link").innerText = CartHelper.getCartString();

    let checkout_button = document.getElementById("checkout-button");
      checkout_button.addEventListener("click", );

    let cart = null;
    if ("cart" in window.localStorage) {
      cart = Storage.get("cart");
    }

    if (!cart) 

    let total_price = 0.0;

    if(cart){
    for (let i=0; i<cart.length; i++) {
      let elem = cart[i];
      let frame_desc = sizeDict[elem.printSize] + " print in a " + (parseFloat(elem.frameWidth)/10.0) + " cm " + elem.frameStyle + " frame";
      if (parseFloat(elem.matWidth) > 0) {
        frame_desc += " with a " + (parseFloat(elem.matWidth)/10.0) + " cm " + elem.matColor + " mat";
      }
      frame_desc += ".";
      let objID = elem.objectID;
      let url = "config.html?objectID="+objID+"&printSize="+elem.printSize+"&frameWidth="+elem.frameWidth+"&frameStyle="+elem.frameStyle+"&matWidth="+elem.matWidth+"&matColor="+elem.matColor;
      
      

      let price_elem = DOMHelper.setClassList(DOMHelper.innerTextElement("€ ", "div"), ["cart-price"]);
      price_elem.appendChild(DOMHelper.setAttributes(DOMHelper.innerTextElement("0", "span"), {id: "price-"+i}));

      let artist = DOMHelper.innerTextElement("", "span");
      artist.id = "picture-artist-"+i;
      let title = DOMHelper.innerTextElement("" + ", ", "span");
      title.id = "picture-title-"+i;
      let date = DOMHelper.innerTextElement("", "span");
      date.id = "picture-date-"+i;
      let container1 = DOMHelper.container([
                           DOMHelper.setClassList(artist, ["artist"]),
                           DOMHelper.setClassList(title, ["title"]),
                           DOMHelper.setClassList(date, ["date"]),
                           document.createElement("br"),
                           document.createElement("br"),
                           DOMHelper.setClassList(DOMHelper.innerTextElement(frame_desc, "span"), ["frame-description"])
                       ], "div");
      let delete_button = document.createElement("button");
      delete_button.addEventListener("click", );
      let container2 = DOMHelper.setClassList(DOMHelper.container([
                                                  container1,
                                                  price_elem,
                                                  DOMHelper.setClassList(delete_button, ["cart-remove"])
                                              ], "div"),
                                              ["museum-label"]);
      let image = document.createElement("img");
      image.className = "cart-thumb";
      image.id = "preview-"+i;
      let link = DOMHelper.container([image], "a");
      link.href = url;
      let container3 = DOMHelper.container([link], "div");
      container3.className = "cart-preview";
      container3.id = "preview-container-"+i;
      let final = DOMHelper.container([container3, container2], "div");
      final.className = "cart-item";
      document.getElementById("cart").appendChild(final);

      let frame_price = FrameHelper.calculatePrice(elem.printSize, elem.frameStyle, elem.frameWidth, elem.matWidth);
      if (frame_price) {
        total_price += frame_price;
        document.getElementById("price-"+i).innerText = frame_price.toFixed(2);
      }

      let cart_elem = document.getElementById("cart");
      cart_elem.insertBefore(final, cart_elem.firstChild);

      //TODO: set href to config
      if(PictureAPI.retrieve_picture(objID) !== null) {
        PictureAPI.retrieve_picture(objID).then((picture) => {
          document.getElementById("picture-artist-"+i).innerText = picture.artist;
          document.getElementById("picture-title-"+i).innerText = picture.title+", ";
          document.getElementById("picture-date-"+i).innerText = picture.date;
          document.getElementById("preview-"+i).src = picture.imageURLSmall;
          document.getElementById("preview-"+i).alt = picture.title;
          let current_image = document.getElementById("preview-"+i);
          let image_container = document.getElementById("preview-container-"+i);
          FrameHelper.render(current_image, image_container, elem.printSize, elem.frameStyle, elem.frameWidth, elem.matColor, elem.matWidth);
        });
      }
    }
    }

    document.getElementById("price-total").innerText = total_price.toFixed(2);
  