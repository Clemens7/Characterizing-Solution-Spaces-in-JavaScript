
        import * as Cart from './cart.js';
        import * as MetMuseum from './met_museum.js';
        import * as Frame from './frame.js';

        Cart.countProducts();

        const elementCart = document.getElementById("cart");

        if(Cart.isEmpty())else{
            document.getElementById('checkout-button').disabled = false;
        }

        (async() =>{
            let totalPrice = 0;
            const cartItems = Cart.getCartItems();
            for(let index = 0; index < cartItems.length; index++){
                const product = cartItems[index];
                const obj = await MetMuseum.getObject(product.objectID);

                const newItem = document.createElement("div");
                newItem.classList.add("cart-item");
                const toPrintSize = {'S':'Small', 'M':'Medium', 'L':'Large'};
                const printText = toPrintSize[product.printSize] + ' print';
                const frameText = 'in a ' + product.frameWidth/10 + ' cm ' + product.frameStyle + ' frame';
                var matText = '';
                if(product.matWidth>0){
                    matText=' with a ' + product.matWidth/10 + ' cm ' + product.matColor + ' mat.';
                }else{
                    matText='.';
                }
                newItem.innerHTML=`
                    <div class="cart-preview" id="preview-container-${index}">
                        <a href="config.html?${new URLSearchParams(product)}">
                            <img class="cart-thumb" src="${obj.primaryImageSmall}" id="preview-${index}" alt="${obj.title}">
                        </a>
                    </div>
                    <div class="museum-label">
                        <div>
                            <span class="artist">${obj.artistDisplayName}</span>
                            <span class="title">${obj.title}</span>,
                            <span class="date">${obj.objectDate}</span>
                            <br><br>
                            <span class="frame-description">${printText} ${frameText}${matText}</span>
                        </div>
                        <div class="cart-price">€ <span id="price-${index}">0</span></div>
                        <button class="cart-remove" onclick="removeItem(${index});"></button>
                    </div>`;
                    elementCart.insertBefore(newItem, elementCart.firstChild);

                    const imagePreview = document.getElementById("preview-" + index);
                    const containerPreview = document.getElementById("preview-container-" + index);
                    Frame.render(imagePreview, containerPreview,product.printSize, product.frameStyle, product.frameWidth, product.matColor, product.matWidth);
                    const price = Frame.calculatePrice(product.printSize, product.frameStyle, product.frameWidth,product.matWidth);

                    totalPrice = totalPrice + price;
                    document.getElementById("price-" + index).innerHTML = price.toFixed(2);
            }
            document.getElementById("price-total").innerHTML = totalPrice.toFixed(2);
        })();

        window.removeItem = 
    