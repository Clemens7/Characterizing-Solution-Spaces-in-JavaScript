import {render} from "./frame.js";
import {calculatePrice} from "./frame.js";

let cart = JSON.parse(localStorage.getItem("cart"));
let itemJSON;
let totalP = 0;

// cart-item from HTML is replaced
document.getElementById("cart-item-0").remove();

if (cart != null) {
    displayCart(cart.length);
}

async function displayCart(cart_length) {

    // display correct number of cart items
    if (localStorage.getItem("cart") !== null) {
        document.getElementById("cart-link").innerText = `Cart (${cart_length})`;
    }

    let cart_total = document.getElementById("cart-total");

    for (let i = 0; i < cart_length; i++) {

        // create HTML structure
        let cart_item = document.createElement("div");
        cart_item.setAttribute("class", "cart-item");
        cart_item.setAttribute("id", `cart-item-${i}`);
        let cart_preview = document.createElement("div");
        cart_preview.setAttribute("class", "cart-preview");
        cart_preview.setAttribute("id", "cart-preview-container");
        let a = document.createElement("a");
        let c = JSON.parse(localStorage.getItem('cart'))
        let id = (c[i].objectID);
        a.setAttribute("href", "./config.html?objectID=" + id);
        a.addEventListener('click', );
        let img = document.createElement("img");
        img.setAttribute("class", "cart-thumb");
        img.setAttribute("id", `cart-preview-${i}`);
        let source = (localStorage.getItem('cart'));
        img.setAttribute("src", " ");

        let museum_label = document.createElement("div");
        museum_label.setAttribute("class", "museum-label");
        let label = document.createElement("div");
        let artist = document.createElement("span");
        artist.setAttribute("class", "artist");
        let title = document.createElement("span");
        title.setAttribute("class", "title");
        let date = document.createElement("span");
        date.setAttribute("class", "date");
        let br1 = document.createElement("br");
        let br2 = document.createElement("br");
        let frame_description = document.createElement("span");
        frame_description.setAttribute("class", "frame-description");
        let cart_price = document.createElement("div");
        cart_price.setAttribute("class", "cart-price");
        let price = document.createElement("span");
        let button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("class", "cart-remove");
        button.addEventListener("click", );

        // create DOM
        cart_item.appendChild(cart_preview);
        cart_preview.appendChild(a);
        a.appendChild(img);
        cart_item.appendChild(museum_label);
        museum_label.appendChild(label);
        label.appendChild(artist);
        label.appendChild(title);
        label.append(", ");
        label.appendChild(date);
        label.appendChild(br1);
        label.appendChild(br2);
        label.appendChild(frame_description);
        museum_label.appendChild(cart_price);
        cart_price.append("€ ");
        cart_price.appendChild(price);
        museum_label.appendChild(button);

        // get cart item out of cart
        let cartItem = cart[i];

        // check cache before fetch
        if (localStorage.getItem(cartItem.objectID))  else {
            let item = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${cartItem.objectID}`);
            itemJSON = await item.json();
            localStorage.setItem(cartItem.objectID, JSON.stringify(itemJSON));
        }

        // get data and fill data into corresponding elements

        let idJSON = JSON.parse(localStorage.getItem('cart'))[i];
        let idid = idJSON.objectID;
        let idJSONparsed = localStorage.getItem(idid);
        let idJSONdoubleparsed = JSON.parse(idJSONparsed)
        img.src = idJSONdoubleparsed.primaryImageSmall;
        img.alt = "Chosen Image with Frame and Mat";
        let cart_thumb = document.getElementsByClassName('cart-thumb');

        let artistText = itemJSON.artistDisplayName;
        let titleText = itemJSON.title;
        let dateText = itemJSON.objectDate;
        artist.innerText = artistText;
        title.innerText = titleText;
        date.innerText = dateText;

        let size = cartItem.printSize;
        if (size === 'S') {
            size = 'Small';
        } else if (size === 'M')  else if (size === 'L') {
            size = 'Large';
        }

        if (cartItem.matWidth != 0) {
            frame_description.innerText =
                `${size} print in a ${cartItem.frameWidth / 10} cm ${cartItem.frameStyle} frame with a ${cartItem.matWidth / 10} cm ${cartItem.matColor} mat.`;
        } else {
            frame_description.innerText =
                `${size} print in a ${cartItem.frameWidth / 10} cm ${cartItem.frameStyle} frame.`;
        }

        let p = calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
        totalP = totalP + p;
        price.innerText = `${p}`;

        // append cart item to correct place (in cart, before total)
        document.getElementById("cart").insertBefore(cart_item, cart_total);

        //sets id to objectID
        cart_item.setAttribute("id", itemJSON.objectID)

    }
    for (let j = 0; j < cart_length; j++) {
        let img = document.getElementById('cart-preview-' + j);
        let cartItem = cart[j];
        let height = document.getElementById('cart-preview-container').offsetHeight;
        let width = document.getElementById('cart-preview-container').offsetWidth;
        document.getElementById('cart-preview-' + j).height = height;
        document.getElementById('cart-preview-' + j).width = width;
        render(img, img.parentElement, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth);
    }


    // total price of cart
    document.getElementById("price-total").innerText = `${totalP}`;

}

export 

//removes the item at the corresponding index




//updates total


//updates number of items in cart, disables checkout-button if empty

