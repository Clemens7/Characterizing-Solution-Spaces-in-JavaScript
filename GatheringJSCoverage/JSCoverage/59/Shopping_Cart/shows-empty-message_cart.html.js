
        import * as Frame from './frame.js';

        let cartItems = JSON.parse(localStorage.getItem('cart'));
        if (!cartItems) {
            cartItems = [];
        }

        const cartNav = document.getElementById("cart-link");
        if (cartItems.length > 0) 

        const cartSection = document.getElementById('cart');
        if (!cartSection) 
        cartSection.innerHTML = '';

        let priceTotal = 0;

        for (let index = 0; index < cartItems.length; index++) 

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

        if(cartItems.length == 0){
            const cartEmptyContainer = document.createElement('div');
            cartEmptyContainer.setAttribute('class', 'cart-item');
            const cartEmptyMessage = document.createElement('span');
            cartEmptyMessage.innerText = 'There are no items in your shopping cart.';
            cartEmptyContainer.appendChild(cartEmptyMessage);
            cartSection.insertBefore(cartEmptyContainer, cartSection.firstChild);
            document.getElementById('checkout-button').disabled = true;
        }

        ;

        ;

        window.removeItem = 

        window.procede = 

    