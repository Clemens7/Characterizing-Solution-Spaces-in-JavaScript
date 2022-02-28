import {getPrintSizes, render, calculatePrice} from "./frame.js";

export class ResultContainer {
    

    

    
}

export class ConfigImage{

    

    

    
}

export class DisplayCart {
    constructor() {
        this.displayCart = document.getElementById("cart")
    }

    clear() {
        this.displayCart.innerHTML = "";
    }

    addArtwork(artwork, price, frameDescription, item, count) {
        const cartItem = document.createElement('div');
        cartItem.classList.add("cart-item");
        cartItem.id = `cart-item-${count}`;

        const cartPreviewContainer = document.createElement('div');
        cartPreviewContainer.classList.add("cart-preview");
        cartPreviewContainer.id = `cart-preview-${artwork.id}`;

        const configLink = document.createElement('a');
        configLink.href = `config.html?objectID=${artwork.id}&printSize=${item.printSize}&frameStyle=${item.frameStyle}&frameWidth=${item.frameWidth}&matColor=${item.matColor}&matWidth=${item.matWidth}`;

        const img = document.createElement('img');
        img.classList.add("cart-thumb");
        img.id = `preview-${artwork.id}`;
        img.src = artwork.image;
        img.alt = `Picture of artwork ${artwork.title}`;

        configLink.appendChild(img);
        cartPreviewContainer.appendChild(configLink);

        cartItem.appendChild(cartPreviewContainer);

        const label = document.createElement('div');
        label.classList.add("museum-label");

        const labelContainer = document.createElement('div');

        const artist = document.createElement('span');
        artist.classList.add("artist");
        artist.innerText = artwork.artist;

        const title = document.createElement('span');
        title.classList.add("title");
        title.innerText = artwork.title;

        const date = document.createElement('span');
        date.classList.add("date");
        date.innerText = artwork.date;

        const br = document.createElement('br');

        const description = document.createElement('span');
        description.classList.add("frame-description");
        description.innerText = frameDescription;

        const cartPrice = document.createElement('div');
        cartPrice.classList.add("cart-price");
        cartPrice.innerText = "€ ";

        const itemPrice = document.createElement('span');
        itemPrice.id = `price-${artwork.id}`;
        itemPrice.innerText = price;

        const removeItem = document.createElement('button');
        removeItem.classList.add("cart-remove");
        removeItem.type = "button";
        removeItem.id = count;
        removeItem.onclick = ;

        labelContainer.appendChild(artist);
        labelContainer.appendChild(title);
        labelContainer.append(', ');
        labelContainer.appendChild(date);
        labelContainer.appendChild(br);
        labelContainer.appendChild(br);
        labelContainer.appendChild(description);

        cartPrice.appendChild(itemPrice);

        label.appendChild(labelContainer);
        label.appendChild(cartPrice);
        label.appendChild(removeItem );

        cartItem.appendChild(label);
        this.displayCart.appendChild(cartItem);

        render(img, cartPreviewContainer, item.printSize, item.frameStyle, item.frameWidth, item.matColor, item.matWidth,false);
    }

    addTotalPrice(cartEmpty) {
        const totalPriceContainer = document.createElement('div');
        totalPriceContainer.classList.add("cart-total");

        const totalPriceText = document.createElement('div');
        totalPriceText.classList.add("price");
        totalPriceText.innerText = "Total: € ";

        const totalPrice = document.createElement('span');
        totalPrice.id = "price-total";
        totalPrice.innerText = 0;

        const checkoutButton = document.createElement('button');
        checkoutButton.type = "button";
        checkoutButton.id = "checkout-button";
        checkoutButton.innerText = "Checkout";
        if (cartEmpty) 

        totalPriceText.appendChild(totalPrice);
        totalPriceContainer.appendChild(totalPriceText);
        totalPriceContainer.appendChild(checkoutButton);

        this.displayCart.appendChild(totalPriceContainer);

        document.getElementById('checkout-button').addEventListener("click", );
    }
}





