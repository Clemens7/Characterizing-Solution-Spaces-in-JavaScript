
        import * as Frame from './frame.js';

        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if (!cartItems) 

        const cartNav = document.getElementById("cart-link");
        if (cartItems.length > 0) {
            cartNav.innerHTML = `Cart (${cartItems.length})`;
        }

        const cartSection = document.getElementById('cart');
        if (!cartSection) 
        cartSection.innerHTML = '';

        let priceTotal = 0;

        for (let index = 0; index < cartItems.length; index++) {
            const item = cartItems[index];
            cartSection.insertBefore(createItemElements(item, index), cartSection.firstChild);
        }

        const cartTotalContainer = document.createElement('div');
        cartTotalContainer.setAttribute('class', 'cart-total');

        const priceTotalContainer = document.createElement('div');
        priceTotalContainer.setAttribute('class', 'price');
        priceTotalContainer.innerText = 'Total: € ';

        const priceTotalSpan = document.createElement('span');
        priceTotalSpan.setAttribute('id', 'price-total');
        priceTotalSpan.innerText = priceTotal;

        priceTotalContainer.appendChild(priceTotalSpan);

        const checkoutBtn = document.createElement('button');
        checkoutBtn.setAttribute('type', 'button');
        checkoutBtn.setAttribute('id', 'checkout-button');
        checkoutBtn.setAttribute('onclick', 'procede()')
        checkoutBtn.innerText = 'Checkout';

        cartTotalContainer.appendChild(priceTotalContainer);
        cartTotalContainer.appendChild(checkoutBtn);
        cartSection.appendChild(cartTotalContainer);

        if(cartItems.length == 0)

        function createItemElements(cartItem, index) {
            const cartItemContainer = document.createElement('div');
            cartItemContainer.setAttribute('class', 'cart-item');

            getObjectById(cartItem.objectID).then(function(artObject){

                const cartPreviewContainer = document.createElement('div');
                cartPreviewContainer.setAttribute('class', 'cart-preview');
                cartPreviewContainer.setAttribute('id', `preview-container-${index}`)

                const link = document.createElement('a');
                link.setAttribute('href', `./config.html?${new URLSearchParams(cartItem)}`);


                const image = document.createElement('img');
                image.setAttribute('class', 'art-thumb');
                image.setAttribute('id', `preview-${index}`);
                image.setAttribute('src', `${artObject.primaryImageSmall}`);
                image.setAttribute('alt', `${artObject.title}`);

                link.appendChild(image);
                cartPreviewContainer.appendChild(link);

                const labelContainer = document.createElement('div');
                labelContainer.setAttribute('class', 'museum-label');

                const spanContainer = document.createElement('div');
                const artistSpan = document.createElement('span');
                artistSpan.setAttribute('class', 'artist');
                artistSpan.innerText = artObject.artistDisplayName;
                spanContainer.appendChild(artistSpan);
                const titleSpan = document.createElement('span');
                titleSpan.setAttribute('class', 'title');
                titleSpan.innerText = `${artObject.title}, `;
                spanContainer.appendChild(titleSpan);
                const dateSpan = document.createElement('span');
                dateSpan.setAttribute('class', 'date');
                dateSpan.innerText = artObject.objectDate;
                spanContainer.appendChild(dateSpan);
                const lineBreak = document.createElement('br');
                spanContainer.appendChild(lineBreak);
                const frameSpan = document.createElement('span');
                frameSpan.setAttribute('class', 'frame-description');
                const sizes = {'S': 'Small', 'M': 'Medium', 'L': 'Large'};
                const frameDesc = sizes[cartItem.printSize] + ` print in a ${cartItem.frameWidth / 10} cm ` + cartItem.frameStyle + " frame";
                const matDesc = cartItem.matWidth > 0 ?  ` with a ${cartItem.matWidth / 10} cm ` + cartItem.matColor + " mat." ;
                frameSpan.innerText = frameDesc + matDesc;
                spanContainer.appendChild(frameSpan);

                const priceContainer = document.createElement('div');
                priceContainer.setAttribute('class', 'cart-price');
                const priceSpan = document.createElement('span');
                priceSpan.setAttribute('id', `price-${index}`);
                priceContainer.appendChild(priceSpan);

                const itemPrice = Frame.calculatePrice(cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matWidth);
                priceSpan.innerText = "€ " + itemPrice.toFixed(2);
                priceTotal += itemPrice;

                document.getElementById('price-total').innerText = priceTotal;

                const removeBtn = document.createElement('button');
                removeBtn.setAttribute('class', 'cart-remove');
                removeBtn.setAttribute('onclick', `removeItem(${index})`)

                labelContainer.appendChild(spanContainer);
                labelContainer.appendChild(priceContainer);
                labelContainer.appendChild(removeBtn);
                cartItemContainer.appendChild(cartPreviewContainer);
                cartItemContainer.appendChild(labelContainer);


                let previewContainer = document.getElementById(`preview-container-${index}`);
                let previewImage = document.getElementById(`preview-${index}`)
                Frame.render(previewImage, previewContainer, cartItem.printSize, cartItem.frameStyle, cartItem.frameWidth, cartItem.matColor, cartItem.matWidth);
            })

            return cartItemContainer;
        };

        async function getObjectById(id){
            let artwork = JSON.parse(localStorage.getItem(id));
            if(!artwork)
            return artwork;
        };

        window.removeItem = 

        window.procede = 

    