

    import * as Frame from './frame.js';

    function reset_shopping_cart(){
      document.getElementById("checkout-button").onclick = ;
      document.getElementById("checkout-button").disabled = false;
      document.getElementById("price-total").innerText = "0";
      document.querySelectorAll(".cart-item").forEach();
      document.getElementById('cart-link').innerText = `Cart`;

      if (!('cart' in localStorage) || localStorage.cart === "" || localStorage.cart === "[]") else {
        document.getElementById('cart-link').innerText = `Cart (${JSON.parse(localStorage.cart).length})`;
      }
    }

    

    async function fill_shopping_cart(){

      const cart_container = document.getElementById("cart");

      if ("cart" in localStorage && localStorage.cart !== "") {
        const my_cart = JSON.parse(localStorage.cart);
        for (let c of my_cart) {
          let cart_preview = build_cart_preview(c.objectID);
          let museum_label = build_museum_label(c.objectID);
          let cart_item = build_cart_item(cart_preview, museum_label);

          // loads the additional parameters from API and inserts them in dom obj
          let price_value = Frame.calculatePrice(c.printSize, c.frameStyle, c.frameWidth, c.matWidth);
          let description = calculate_description(c.printSize, c.frameStyle, c.frameWidth / 10, c.matWidth / 10, c.matColor);
          let href = `config.html?objectID=${c.objectID}&printSize=${c.printSize}&frameStyle=${c.frameStyle}&frameWidth=${c.frameWidth}&matWidth=${c.matWidth}&matColor=${c.matColor}`;
          await fill_cart_item_with_content(cart_item, c.objectID, price_value, description, href, c);
          // always insert at beginning
          cart_container.insertBefore(cart_item, cart_container.firstChild);
        }
      }

    }

    function calculate_description(print, frame, frame_width, mat_width, color){
      let description = "";
      if (print === "M") else if (print === "S"){
        description = "Small";
      } else if (print === "L"){
        description = "Large";
      }

      description = description+" print in a " + frame_width + " cm " + frame + " frame";
      console.log(mat_width);
      if (mat_width !== 0){
        description = description + " with a " + mat_width + " cm " + color + " mat.";
      }

      return description;
    }

    async function fill_cart_item_with_content(cart_item, objectID, price_value, description, href, c) {

      if (!('cachedMeta' in localStorage) || localStorage.cachedMeta == "")
      {
        localStorage.cachedMeta = "{}";
      }
      let cachedMeta = JSON.parse(localStorage.cachedMeta);

      console.log(cachedMeta);
      if (!(''+objectID in cachedMeta))
      {
        const response = await (await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)).json();
        cachedMeta[''+objectID] = {
          "objectID" : response.objectID,
          "primaryImageSmall" : response.primaryImageSmall,
          "title": response.title,
          "artistDisplayName" : response.artistDisplayName,
          "objectDate" : response.objectDate
        };

        localStorage.cachedMeta = JSON.stringify(cachedMeta);
      }

      let response = cachedMeta[''+objectID];


      // set image src and alt
      console.log(cart_item);
      cart_item.querySelector("#preview-" + objectID).src = response.primaryImageSmall;
      cart_item.querySelector("#preview-" + objectID).alt = "Image of " + response.title;

      let artist_span = cart_item.lastChild.firstChild.firstChild;
      artist_span.textContent = response.artistDisplayName;
      let title_span = artist_span.nextSibling;
      title_span.textContent = response.title;
      let date_span = title_span.nextSibling.nextSibling;
      date_span.textContent = response.objectDate;

      let description_span = date_span.nextSibling.nextSibling;
      description_span.textContent = description;

      cart_item.querySelector("#price-" + objectID).textContent = price_value;

      //update total price
      document.getElementById("price-total").innerText = ''+((parseFloat(document.getElementById("price-total").innerText) + price_value).toFixed(2));
      //add button onclick with id and price info
      cart_item.querySelector(".cart-remove").onclick = ;
      //add missing params to config link
      cart_item.firstChild.firstChild.href = href;

      let img_obj = cart_item.querySelector("#preview-" + c.objectID);
      img_obj.onload = function() { Frame.render(img_obj,
              cart_item.querySelector("#preview-container-" + c.objectID),
              c.printSize,
              c.frameStyle,
              c.frameWidth,
              c.matColor,
              c.matWidth) }


    }




    function build_cart_item(cart_preview, museum_label){
      let cart_item = document.createElement("div");
      cart_item.setAttribute("class", "cart-item");
      cart_item.appendChild(cart_preview);
      cart_item.appendChild(museum_label);

      return cart_item;
    }
    function build_museum_label(id){
      let div_outer = document.createElement("div");
      div_outer.setAttribute("class", "museum-label");

      let div_inner_spans = document.createElement("div");
      let span_artist = document.createElement("span");
      span_artist.setAttribute("class", "artist");
      let span_title = document.createElement("span");
      span_title.setAttribute("class", "title");
      let span_date = document.createElement("span");
      span_date.setAttribute("class", "date");

      let br = document.createElement("br");

      let frame_description = document.createElement("span");
      frame_description.setAttribute("class", "frame-description");

      let div_inner_price = document.createElement("div");
      div_inner_price.setAttribute("class", "cart-price");
      div_inner_price.innerText = "€ ";

      let span_price = document.createElement("span");
      span_price.setAttribute("id", "price-"+id);
      span_price.innerText = "0";

      let button = document.createElement("button");
      button.setAttribute("class", "cart-remove");

      div_outer.appendChild(div_inner_spans);
      div_outer.appendChild(div_inner_price);
      div_outer.appendChild(button);

      div_inner_spans.appendChild(span_artist);
      div_inner_spans.appendChild(span_title);
      div_inner_spans.appendChild(span_date);
      div_inner_spans.appendChild(br);
      div_inner_spans.appendChild(frame_description);

      div_inner_price.appendChild(span_price);

      span_title.insertAdjacentText('afterend', ', ');

      return div_outer;
    }
    function build_cart_preview(id){
      let div = document.createElement("div");
      div.setAttribute("class", "cart-preview");
      div.setAttribute("id", "preview-container-"+id);

      let a = document.createElement("a");
      a.setAttribute("href", "config.html?objectID="+id);

      let img = document.createElement("img");
      img.setAttribute("class", "cart-thumb");
      img.setAttribute("src", "");
      img.setAttribute("id", "preview-"+id);
      img.setAttribute("alt", "");

      div.appendChild(a);
      a.appendChild(img);

      return div;
    }

    window.onload = function(){
      reset_shopping_cart();
      fill_shopping_cart();
    };

  