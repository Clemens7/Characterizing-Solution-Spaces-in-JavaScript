

    import { render } from '/frame.js';
    import { calculatePrice } from '/frame.js';

    var totalPrice = 0;
    var container = document.getElementById("cart");

    if ( localStorage.getItem("cart") == null || localStorage.getItem("cart") == "[null]" )  else {

      var items = getLocalStorage('cart');
      document.getElementById("cart-count").innerText = " (" + items.length + ")";
      document.getElementById("checkout-button").setAttribute("disabled", "false");

      items.forEach(function(item, index) {
        var data;

        if (item.objectID in localStorage)  else {
          data = httpGetById("https://collectionapi.metmuseum.org/public/collection/v1/objects/", item.objectID);
          localStorage[item.objectID] = JSON.stringify(data);
        }

        let price = calculatePrice(item.printSize, item.frameStyle, item.frameWidth, item.matWidth);
        totalPrice += price;

        var cart_item = document.createElement("div");
        cart_item.className = "cart-item";
        container.prepend(cart_item);

        var cart_preview = document.createElement("div");
        cart_preview.id = "preview-container-" + index;
        cart_preview.className = "cart-preview";

        var image_link = document.createElement("a");
        image_link.href = "config.html?objectID=" + item.objectID
                + "&printSize=" + item.printSize
                + "&frameStyle=" + item.frameStyle
                + "&frameWidth=" + item.frameWidth
                + "&matColor=" + item.matColor
                + "&matWidth=" + item.matWidth;

        var img = new Image();
        img.className = "cart-thumb";
        img.id = "preview-" + index;
        img.src = data["primaryImageSmall"];
        img.addEventListener('load', function () {
          render(img, cart_preview, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth);
        }, false);

        image_link.appendChild(img);
        cart_preview.appendChild(image_link);
        cart_item.appendChild(cart_preview);

        var museum_label = document.createElement("div");
        museum_label.className = "museum-label";

        var extra_div = document.createElement("div");
        var br = document.createElement("br");
        var span_artist = document.createElement("span");
        span_artist.className = "artist";
        span_artist.innerText = data["artistDisplayName"];
        var span_title = document.createElement("span");
        span_title.className = "title";
        span_title.innerText = data["title"];
        var span_date = document.createElement("span");
        span_date.className = "date";
        span_date.innerText = ", " + data["objectDate"];
        var span_description = document.createElement("span");
        span_description.className = "frame-description";
        span_description.innerText = setDescription(item.printSize, item.frameStyle, item.frameWidth / 10, item.matColor, item.matWidth / 10);
        extra_div.appendChild(span_artist);
        extra_div.appendChild(span_title);
        extra_div.appendChild(span_date);
        extra_div.appendChild(br);
        extra_div.appendChild(br);
        extra_div.appendChild(span_description);
        museum_label.appendChild(extra_div);

        var cart_price = document.createElement("div");
        cart_price.className = "cart-price";
        cart_price.innerHTML = "€ <span id='price-" + index + "'>" + price + "</span>";
        museum_label.appendChild(cart_price);

        var cart_remove = document.createElement("button");
        cart_remove.className = "cart-remove";
        cart_remove.setAttribute("onclick", "deleteCartItem('" + index + "')");
        museum_label.appendChild(cart_remove);

        cart_item.appendChild(museum_label);

        document.getElementById("price-total").innerHTML = totalPrice;
      });
    }



  